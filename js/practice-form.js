/*
 * Reusable practice form: window.PracticeForm.mount(container, options).
 *
 *   options = {
 *     mode: "create" | "edit",
 *     practice: { ...the record to edit, only in "edit" },
 *     onSaved: function (record) {},   // after DB.add / DB.update
 *     onCancel: function () {}         // "edit" only
 *   }
 *
 * "create": button "Save practice"; every field is required and the form is cleared after saving.
 * "edit":   buttons "Save changes" and "Cancel"; the Essence diagram is optional (the current one
 *           is kept) and the repeated-name rule doesn't count the practice being edited.
 *
 * The form applies the rules of CLAUDE.md (db.js doesn't): unique name ignoring case and
 * surrounding spaces, description of 300 characters or fewer, and the diagram saved as a WebP
 * data URL (quality 0.85) at most 1200 px wide. Wait for DB.ready before calling mount.
 */
(function () {
  'use strict';

  var MAX_WIDTH = 1200;
  var WEBP_QUALITY = 0.85;
  var MAX_DESCRIPTION = 300;
  var IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
  var IMAGE_EXTENSIONS = /\.(png|jpe?g|webp)$/i;

  var TEXT = {
    name: 'Name',
    description: 'Description',
    descriptionHint: 'Up to 300 characters.',
    image: 'Essence diagram',
    imageHint: 'PNG, JPG or WebP. It is resized to 1200 px wide.',
    required: '(required)',
    savePractice: 'Save practice',
    saveChanges: 'Save changes',
    cancel: 'Cancel',
    newImageAlt: 'Preview of the selected Essence diagram',
    currentImageAlt: 'Current Essence diagram',
    storageFull: 'The browser storage is full. Use a smaller image or restore the initial data.',
    errors: {
      nameEmpty: 'Enter the practice name.',
      nameTaken: 'A practice with this name already exists.',
      descriptionEmpty: 'Enter a description.',
      descriptionLong: 'Use 300 characters or fewer.',
      imageEmpty: 'Upload the Essence diagram.',
      imageInvalid: 'Use a PNG, JPG or WebP image.'
    }
  };

  // ---------- DOM helpers ----------

  function el(tag, attributes, children) {
    var node = document.createElement(tag);
    Object.keys(attributes || {}).forEach(function (name) {
      var value = attributes[name];
      if (value === false || value === null || value === undefined) return;
      if (name === 'text') node.textContent = value;
      else node.setAttribute(name, value === true ? '' : value);
    });
    (children || []).forEach(function (child) { node.appendChild(child); });
    return node;
  }

  // label + optional hint + control + error, linked with for / aria-describedby.
  function field(id, labelText, required, hintText, control) {
    var label = el('label', { 'class': 'field__label', 'for': id });
    label.appendChild(document.createTextNode(labelText));
    if (required) {
      label.appendChild(document.createTextNode(' '));
      label.appendChild(el('span', { 'class': 'field__required', text: TEXT.required }));
    }
    var describedBy = [];
    var children = [label];
    if (hintText) {
      children.push(el('p', { 'class': 'field__hint', id: id + '-hint', text: hintText }));
      describedBy.push(id + '-hint');
    }
    var error = el('p', { 'class': 'field__error', id: id + '-error' });
    describedBy.push(id + '-error');
    control.id = id;
    control.setAttribute('aria-describedby', describedBy.join(' '));
    children.push(control, error);
    return { wrapper: el('div', { 'class': 'field' }, children), control: control, error: error };
  }

  function normalizeName(name) {
    return String(name || '').trim().toLowerCase();
  }

  function isQuotaError(error) {
    return !!error && (error.name === 'QuotaExceededError' ||
      error.name === 'NS_ERROR_DOM_QUOTA_REACHED' || error.code === 22 || error.code === 1014);
  }

  // ---------- Diagram: PNG/JPG/WebP -> WebP data URL, at most 1200 px wide ----------

  function readAsDataURL(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () { resolve(reader.result); };
      reader.onerror = function () { reject(reader.error); };
      reader.readAsDataURL(file);
    });
  }

  function loadImage(src) {
    return new Promise(function (resolve, reject) {
      var image = new Image();
      image.onload = function () { resolve(image); };
      image.onerror = function () { reject(new Error('The image could not be decoded.')); };
      image.src = src;
    });
  }

  // Keeps the proportion and never enlarges an image narrower than 1200 px.
  function toDiagram(file) {
    var acceptable = IMAGE_TYPES.indexOf(file.type) !== -1 || IMAGE_EXTENSIONS.test(file.name);
    if (!acceptable) return Promise.reject(new Error('Unsupported image type.'));
    return readAsDataURL(file)
      .then(loadImage)
      .then(function (image) {
        if (!image.naturalWidth || !image.naturalHeight) throw new Error('The image has no size.');
        var scale = Math.min(1, MAX_WIDTH / image.naturalWidth);
        var canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        var context = canvas.getContext('2d');
        context.imageSmoothingQuality = 'high';
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL('image/webp', WEBP_QUALITY);
      });
  }

  // ---------- The form ----------

  function mount(container, options) {
    options = options || {};
    var editing = options.mode === 'edit';
    var practice = editing ? options.practice : null;
    if (editing && !practice) throw new Error('PracticeForm.mount: "edit" mode needs options.practice.');
    var onSaved = typeof options.onSaved === 'function' ? options.onSaved : function () {};
    var onCancel = typeof options.onCancel === 'function' ? options.onCancel : function () {};

    // Diagram state: the WebP made from the chosen file, and whether its file could be read.
    var newImage = null;
    var imageState = 'none'; // 'none' | 'pending' | 'ready' | 'invalid'
    var imageJob = Promise.resolve();
    var imageRequest = 0;

    var name = field('name', TEXT.name, true, null,
      el('input', { 'class': 'input', type: 'text', autocomplete: 'off' }));

    var description = field('description', TEXT.description, true, TEXT.descriptionHint,
      el('textarea', { 'class': 'input', rows: 4 }));

    var imageInput = el('input', { 'class': 'input', type: 'file', accept: '.png,.jpg,.jpeg,.webp' });
    var image = field('image', TEXT.image, !editing, TEXT.imageHint, imageInput);
    // Only in the page while there is a diagram to show: .image-preview sets display: block,
    // which would override the hidden attribute and leave an empty bordered box.
    var preview = el('img', { 'class': 'image-preview', alt: '' });

    var actions = el('div', { 'class': 'actions' }, [
      el('button', { 'class': 'btn btn--primary', type: 'submit', text: editing ? TEXT.saveChanges : TEXT.savePractice })
    ]);
    if (editing) {
      var cancel = el('button', { 'class': 'btn btn--secondary', type: 'button', text: TEXT.cancel });
      cancel.addEventListener('click', function () { onCancel(); });
      actions.appendChild(cancel);
    }

    var storageAlert = el('div', { 'class': 'notice notice--error', role: 'alert' });
    var form = el('form', { 'class': 'form', novalidate: true },
      [name.wrapper, description.wrapper, image.wrapper, actions]);

    // ---------- Validation: each returns the error text, or '' when the field is valid ----------

    var rules = [
      {
        field: name,
        check: function () {
          var value = normalizeName(name.control.value);
          if (!value) return TEXT.errors.nameEmpty;
          var taken = DB.getAll('practices').some(function (other) {
            return normalizeName(other.name) === value && !(editing && other.id === practice.id);
          });
          return taken ? TEXT.errors.nameTaken : '';
        }
      },
      {
        field: description,
        check: function () {
          var value = description.control.value.trim();
          if (!value) return TEXT.errors.descriptionEmpty;
          return value.length > MAX_DESCRIPTION ? TEXT.errors.descriptionLong : '';
        }
      },
      {
        field: image,
        check: function () {
          if (imageState === 'invalid') return TEXT.errors.imageInvalid;
          if (imageState === 'none' && !editing) return TEXT.errors.imageEmpty;
          return '';
        }
      }
    ];
    var imageRule = rules[2];

    function show(target, message) {
      target.error.textContent = message;
      if (message) target.control.setAttribute('aria-invalid', 'true');
      else target.control.removeAttribute('aria-invalid');
    }

    function validate(rule) {
      var message = rule.check();
      show(rule.field, message);
      return !message;
    }

    rules.forEach(function (rule) {
      var control = rule.field.control;
      // Validate when leaving the field, but not when the whole window loses focus
      // (for example, while the file picker of the diagram is open).
      control.addEventListener('blur', function () {
        if (document.hasFocus()) validate(rule);
      });
      // Once a field shows an error, check it again as it changes so the error goes away when fixed.
      var recheck = function () {
        if (control.getAttribute('aria-invalid') === 'true') validate(rule);
      };
      control.addEventListener('input', recheck);
      control.addEventListener('change', recheck);
    });

    // ---------- Diagram selection and preview ----------

    function showPreview(src, alt) {
      if (src) {
        preview.src = src;
        preview.alt = alt;
        image.wrapper.appendChild(preview);
      } else {
        preview.removeAttribute('src');
        preview.alt = '';
        preview.remove();
      }
    }

    function showCurrentImage() {
      showPreview(editing ? practice.image : '', TEXT.currentImageAlt);
    }

    imageInput.addEventListener('change', function () {
      var file = imageInput.files && imageInput.files[0];
      var request = ++imageRequest;
      newImage = null;
      if (!file) {
        imageState = 'none';
        showCurrentImage();
        if (imageInput.getAttribute('aria-invalid') === 'true') validate(imageRule);
        return;
      }
      imageState = 'pending';
      imageJob = toDiagram(file).then(function (webp) {
        if (request !== imageRequest) return; // a newer file was chosen meanwhile
        newImage = webp;
        imageState = 'ready';
        showPreview(webp, TEXT.newImageAlt);
        validate(imageRule);
      }, function () {
        if (request !== imageRequest) return;
        imageState = 'invalid';
        showCurrentImage();
        validate(imageRule);
      });
    });

    // ---------- Fill (edit), reset (create) and submit ----------

    function fill() {
      if (editing) {
        name.control.value = practice.name || '';
        description.control.value = practice.description || '';
      }
      showCurrentImage();
    }

    function reset() {
      form.reset();
      imageRequest++;
      newImage = null;
      imageState = 'none';
      rules.forEach(function (rule) { show(rule.field, ''); });
      fill();
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      storageAlert.textContent = '';
      // A diagram that is still being processed must finish before the form is checked.
      imageJob.then(function () {
        var firstInvalid = null;
        rules.forEach(function (rule) {
          if (!validate(rule) && !firstInvalid) firstInvalid = rule.field.control;
        });
        if (firstInvalid) {
          firstInvalid.focus();
          return;
        }

        var record = {
          name: name.control.value.trim(),
          description: description.control.value.trim(),
          image: newImage || (editing ? practice.image : '')
        };

        var saved;
        try {
          saved = editing ? DB.update('practices', practice.id, record) : DB.add('practices', record);
        } catch (error) {
          if (!isQuotaError(error)) throw error;
          storageAlert.textContent = TEXT.storageFull; // the form keeps what was typed
          return;
        }

        if (editing) {
          practice = saved;
        } else {
          reset();
          name.control.focus();
        }
        onSaved(saved);
      });
    });

    fill();
    container.textContent = '';
    container.appendChild(storageAlert);
    container.appendChild(form);
    return form;
  }

  window.PracticeForm = { mount: mount };
})();
