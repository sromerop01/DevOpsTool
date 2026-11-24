/*
 * Reusable DevOps tool form: window.ToolForm.mount(container, options).
 *
 *   options = {
 *     mode: "create" | "edit",
 *     tool: { ...the record to edit, only in "edit" },
 *     onSaved: function (record) {},   // after DB.add / DB.update
 *     onCancel: function () {}         // "edit" only
 *   }
 *
 * "create": button "Save tool"; every field is required and the form is cleared after saving.
 * "edit":   buttons "Save changes" and "Cancel"; the logo is optional (the current one is kept)
 *           and the repeated-name rule doesn't count the tool being edited.
 *
 * The form applies the rules of CLAUDE.md (db.js doesn't): unique name ignoring case and
 * surrounding spaces, description of 300 characters or fewer, and the logo saved as a
 * 128 × 128 px PNG data URL. Wait for DB.ready before calling mount.
 */
(function () {
  'use strict';

  var LOGO_SIZE = 128;
  var MAX_DESCRIPTION = 300;
  var IMAGE_TYPES = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp'];
  var IMAGE_EXTENSIONS = /\.(svg|png|jpe?g|webp)$/i;

  var TEXT = {
    name: 'Name',
    logo: 'Logo',
    logoHint: 'SVG, PNG, JPG or WebP. It is resized to 128 × 128 px.',
    description: 'Description',
    descriptionHint: 'Up to 300 characters.',
    pricingModel: 'Pricing model',
    pricingPlaceholder: 'Select a pricing model',
    category: 'Category',
    categoryPlaceholder: 'Select a category',
    required: '(required)',
    saveTool: 'Save tool',
    saveChanges: 'Save changes',
    cancel: 'Cancel',
    newLogoAlt: 'Preview of the selected logo',
    currentLogoAlt: 'Current logo',
    storageFull: 'The browser storage is full. Use a smaller image or restore the initial data.',
    errors: {
      nameEmpty: 'Enter the tool name.',
      nameTaken: 'A tool with this name already exists.',
      logoEmpty: 'Upload the tool logo.',
      logoInvalid: 'Use an SVG, PNG, JPG or WebP image.',
      descriptionEmpty: 'Enter a description.',
      descriptionLong: 'Use 300 characters or fewer.',
      pricingEmpty: 'Select a pricing model.',
      categoryEmpty: 'Select a category.'
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

  function option(value, text) {
    return el('option', { value: value, text: text });
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

  // ---------- Logo: any SVG/PNG/JPG/WebP -> 128 × 128 PNG data URL ----------

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

  // An SVG without width and height has no reliable intrinsic size in the browser,
  // so its proportion comes from the viewBox. Returns null when there is none.
  function svgViewBox(dataUrl) {
    try {
      var comma = dataUrl.indexOf(',');
      var meta = dataUrl.slice(0, comma);
      var body = dataUrl.slice(comma + 1);
      var text = /;base64/i.test(meta) ? atob(body) : decodeURIComponent(body);
      var root = /<svg\b[^>]*>/i.exec(text);
      var match = root && /viewBox\s*=\s*["']\s*[-\d.e]+[\s,]+[-\d.e]+[\s,]+([\d.e]+)[\s,]+([\d.e]+)/i.exec(root[0]);
      if (match && parseFloat(match[1]) > 0 && parseFloat(match[2]) > 0) {
        return { width: parseFloat(match[1]), height: parseFloat(match[2]) };
      }
    } catch (error) { /* not readable as text: use the image size */ }
    return null;
  }

  function isSvg(file) {
    return file.type === 'image/svg+xml' || /\.svg$/i.test(file.name);
  }

  // Contained, centered and on a transparent background. Rejects when the browser can't read it.
  function toLogo(file) {
    var acceptable = IMAGE_TYPES.indexOf(file.type) !== -1 || IMAGE_EXTENSIONS.test(file.name);
    if (!acceptable) return Promise.reject(new Error('Unsupported image type.'));
    var dataUrl;
    return readAsDataURL(file)
      .then(function (result) { dataUrl = result; return loadImage(result); })
      .then(function (image) {
        var box = isSvg(file) ? svgViewBox(dataUrl) : null;
        var width = box ? box.width : image.naturalWidth;
        var height = box ? box.height : image.naturalHeight;
        if (!width || !height) {
          width = 1;
          height = 1;
        }
        var scale = Math.min(LOGO_SIZE / width, LOGO_SIZE / height);
        var drawWidth = width * scale;
        var drawHeight = height * scale;
        var canvas = document.createElement('canvas');
        canvas.width = LOGO_SIZE;
        canvas.height = LOGO_SIZE;
        var context = canvas.getContext('2d');
        context.imageSmoothingQuality = 'high';
        context.drawImage(image, (LOGO_SIZE - drawWidth) / 2, (LOGO_SIZE - drawHeight) / 2, drawWidth, drawHeight);
        return canvas.toDataURL('image/png'); // throws if the image taints the canvas
      });
  }

  // ---------- The form ----------

  function mount(container, options) {
    options = options || {};
    var editing = options.mode === 'edit';
    var tool = editing ? options.tool : null;
    if (editing && !tool) throw new Error('ToolForm.mount: "edit" mode needs options.tool.');
    var onSaved = typeof options.onSaved === 'function' ? options.onSaved : function () {};
    var onCancel = typeof options.onCancel === 'function' ? options.onCancel : function () {};

    // Logo state: the PNG made from the chosen file, and whether its file could be read.
    var newLogo = null;
    var logoState = 'none'; // 'none' | 'pending' | 'ready' | 'invalid'
    var logoJob = Promise.resolve();
    var logoRequest = 0;

    var name = field('name', TEXT.name, true, null,
      el('input', { 'class': 'input', type: 'text', autocomplete: 'off' }));

    var logoInput = el('input', { 'class': 'input', type: 'file', accept: '.svg,.png,.jpg,.jpeg,.webp' });
    var logo = field('logo', TEXT.logo, !editing, TEXT.logoHint, logoInput);
    // Only in the page while there is a logo to show: .image-preview sets display: block,
    // which would override the hidden attribute and leave an empty bordered box.
    var preview = el('img', { 'class': 'image-preview', width: LOGO_SIZE, height: LOGO_SIZE, alt: '' });

    var description = field('description', TEXT.description, true, TEXT.descriptionHint,
      el('textarea', { 'class': 'input', rows: 4 }));

    var pricingSelect = el('select', { 'class': 'input' }, [option('', TEXT.pricingPlaceholder)]);
    DB.PRICING_MODELS.forEach(function (model) {
      pricingSelect.appendChild(option(model.code, model.label + ' (' + model.code + ')'));
    });
    var pricing = field('pricingModel', TEXT.pricingModel, true, null, pricingSelect);

    var categorySelect = el('select', { 'class': 'input' }, [option('', TEXT.categoryPlaceholder)]);
    DB.getAll('categories').forEach(function (category) {
      categorySelect.appendChild(option(category.id, category.name));
    });
    var category = field('categoryId', TEXT.category, true, null, categorySelect);

    var actions = el('div', { 'class': 'actions' }, [
      el('button', { 'class': 'btn btn--primary', type: 'submit', text: editing ? TEXT.saveChanges : TEXT.saveTool })
    ]);
    if (editing) {
      var cancel = el('button', { 'class': 'btn btn--secondary', type: 'button', text: TEXT.cancel });
      cancel.addEventListener('click', function () { onCancel(); });
      actions.appendChild(cancel);
    }

    var storageAlert = el('div', { 'class': 'notice notice--error', role: 'alert' });
    var form = el('form', { 'class': 'form', novalidate: true },
      [name.wrapper, logo.wrapper, description.wrapper, pricing.wrapper, category.wrapper, actions]);

    // ---------- Validation: each returns the error text, or '' when the field is valid ----------

    var rules = [
      {
        field: name,
        check: function () {
          var value = normalizeName(name.control.value);
          if (!value) return TEXT.errors.nameEmpty;
          var taken = DB.getAll('tools').some(function (other) {
            return normalizeName(other.name) === value && !(editing && other.id === tool.id);
          });
          return taken ? TEXT.errors.nameTaken : '';
        }
      },
      {
        field: logo,
        check: function () {
          if (logoState === 'invalid') return TEXT.errors.logoInvalid;
          if (logoState === 'none' && !editing) return TEXT.errors.logoEmpty;
          return '';
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
        field: pricing,
        check: function () { return pricing.control.value ? '' : TEXT.errors.pricingEmpty; }
      },
      {
        field: category,
        check: function () { return category.control.value ? '' : TEXT.errors.categoryEmpty; }
      }
    ];

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
      // (for example, while the file picker of the logo is open).
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

    // ---------- Logo selection and preview ----------

    function showPreview(src, alt) {
      if (src) {
        preview.src = src;
        preview.alt = alt;
        logo.wrapper.appendChild(preview);
      } else {
        preview.removeAttribute('src');
        preview.alt = '';
        preview.remove();
      }
    }

    function showCurrentLogo() {
      showPreview(editing ? tool.logo : '', TEXT.currentLogoAlt);
    }

    logoInput.addEventListener('change', function () {
      var file = logoInput.files && logoInput.files[0];
      var request = ++logoRequest;
      newLogo = null;
      if (!file) {
        logoState = 'none';
        showCurrentLogo();
        if (logoInput.getAttribute('aria-invalid') === 'true') validate(rules[1]);
        return;
      }
      logoState = 'pending';
      logoJob = toLogo(file).then(function (png) {
        if (request !== logoRequest) return; // a newer file was chosen meanwhile
        newLogo = png;
        logoState = 'ready';
        showPreview(png, TEXT.newLogoAlt);
        validate(rules[1]);
      }, function () {
        if (request !== logoRequest) return;
        logoState = 'invalid';
        showCurrentLogo();
        validate(rules[1]);
      });
    });

    // ---------- Fill (edit), reset (create) and submit ----------

    function fill() {
      if (editing) {
        name.control.value = tool.name || '';
        description.control.value = tool.description || '';
        pricing.control.value = tool.pricingModel || '';
        category.control.value = tool.categoryId || '';
      }
      showCurrentLogo();
    }

    function reset() {
      form.reset();
      logoRequest++;
      newLogo = null;
      logoState = 'none';
      rules.forEach(function (rule) { show(rule.field, ''); });
      fill();
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      storageAlert.textContent = '';
      // A logo that is still being processed must finish before the form is checked.
      logoJob.then(function () {
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
          logo: newLogo || (editing ? tool.logo : ''),
          description: description.control.value.trim(),
          pricingModel: pricing.control.value,
          categoryId: category.control.value
        };

        var saved;
        try {
          saved = editing ? DB.update('tools', tool.id, record) : DB.add('tools', record);
        } catch (error) {
          if (!isQuotaError(error)) throw error;
          storageAlert.textContent = TEXT.storageFull; // the form keeps what was typed
          return;
        }

        if (editing) {
          tool = saved;
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

  window.ToolForm = { mount: mount };
})();
