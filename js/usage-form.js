/*
 * Reusable usage form: window.UsageForm.mount(container, options).
 *
 *   options = {
 *     mode: "create" | "edit",
 *     usage: { ...the record to edit, only in "edit" },
 *     onSaved: function (record) {},   // after DB.add / DB.update
 *     onCancel: function () {}         // "edit" only
 *   }
 *
 * "create": button "Save usage"; every field is required and the form is cleared after saving.
 * "edit":   buttons "Save changes" and "Cancel"; the repeated-pair rule doesn't count the usage
 *           being edited.
 *
 * The form applies the rules of CLAUDE.md (db.js doesn't): a tool has a single usage per practice,
 * and the description has 600 characters or fewer. Without tools or practices there is nothing to
 * relate, so an .empty-state with links to register them takes the place of the form.
 * Wait for DB.ready before calling mount.
 */
(function () {
  'use strict';

  var MAX_DESCRIPTION = 600;

  var TEXT = {
    tool: 'DevOps tool',
    toolPlaceholder: 'Select a DevOps tool',
    practice: 'Practice',
    practicePlaceholder: 'Select a practice',
    description: 'Description',
    descriptionHint: 'Explain how the tool supports this practice in terms of DevOps culture. Up to 600 characters.',
    required: '(required)',
    saveUsage: 'Save usage',
    saveChanges: 'Save changes',
    cancel: 'Cancel',
    duplicate: 'This tool already has a usage in this practice.',
    updateIt: 'Update it',
    storageFull: 'The browser storage is full. Use a smaller image or restore the initial data.',
    empty: 'Register at least one DevOps tool and one practice before registering a usage.',
    registerTool: 'Register a tool',
    registerPractice: 'Register a practice',
    errors: {
      toolEmpty: 'Select a DevOps tool.',
      practiceEmpty: 'Select a practice.',
      descriptionEmpty: 'Describe the usage.',
      descriptionLong: 'Use 600 characters or fewer.'
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
  function field(id, labelText, hintText, control) {
    var label = el('label', { 'class': 'field__label', 'for': id });
    label.appendChild(document.createTextNode(labelText + ' '));
    label.appendChild(el('span', { 'class': 'field__required', text: TEXT.required }));
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

  function byName(a, b) {
    return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }) || a.name.localeCompare(b.name);
  }

  function isQuotaError(error) {
    return !!error && (error.name === 'QuotaExceededError' ||
      error.name === 'NS_ERROR_DOM_QUOTA_REACHED' || error.code === 22 || error.code === 1014);
  }

  function emptyState() {
    return el('div', { 'class': 'empty-state' }, [
      el('p', { text: TEXT.empty }),
      el('p', {}, [el('a', { href: 'register-tool.html', text: TEXT.registerTool })]),
      el('p', {}, [el('a', { href: 'register-practice.html', text: TEXT.registerPractice })])
    ]);
  }

  // ---------- Validation on blur, without moving what is being clicked ----------

  // Validating a field when it loses the focus can show or hide its error, which moves every field
  // below it. When the focus leaves because the mouse was pressed on another control, that control
  // would move under the pointer: a click on a button would end outside it and be lost, and the menu
  // of a select (or the file picker) would open while the field jumps. So, while a mouse button is
  // down, the blur validation waits:
  //   - for a select or a file input, until a value is chosen or the user leaves it;
  //   - for anything else, until the click is over.
  var pointerDown = false;
  var afterClick = [];

  document.addEventListener('pointerdown', function () { pointerDown = true; }, true);
  ['pointerup', 'pointercancel'].forEach(function (type) {
    document.addEventListener(type, function () {
      pointerDown = false;
      // After the click event, which the browser dispatches right after pointerup.
      setTimeout(function () {
        var checks = afterClick;
        afterClick = [];
        checks.forEach(function (check) { check(); });
      }, 0);
    }, true);
  });

  function opensPicker(element) {
    return !!element && (element.tagName === 'SELECT' || (element.tagName === 'INPUT' && element.type === 'file'));
  }

  // Runs check once, when target is done (value chosen, picker closed, focus gone or a key pressed).
  function whenDone(target, check) {
    var types = ['change', 'cancel', 'blur', 'keydown'];
    function run() {
      types.forEach(function (type) { target.removeEventListener(type, run); });
      check();
    }
    types.forEach(function (type) { target.addEventListener(type, run); });
  }

  function validateOnBlur(event, check) {
    if (!document.hasFocus()) return; // the whole window lost the focus, for example a file picker
    if (!pointerDown) check();
    else if (opensPicker(event.relatedTarget)) whenDone(event.relatedTarget, check);
    else afterClick.push(check);
  }

  // ---------- The form ----------

  function mount(container, options) {
    options = options || {};
    var editing = options.mode === 'edit';
    var usage = editing ? options.usage : null;
    if (editing && !usage) throw new Error('UsageForm.mount: "edit" mode needs options.usage.');
    var onSaved = typeof options.onSaved === 'function' ? options.onSaved : function () {};
    var onCancel = typeof options.onCancel === 'function' ? options.onCancel : function () {};

    var tools = DB.getAll('tools').sort(byName);
    var practices = DB.getAll('practices').sort(byName);
    container.textContent = '';
    if (!tools.length || !practices.length) {
      container.appendChild(emptyState());
      return null;
    }

    var toolSelect = el('select', { 'class': 'input' }, [option('', TEXT.toolPlaceholder)]);
    tools.forEach(function (tool) { toolSelect.appendChild(option(tool.id, tool.name)); });
    var tool = field('toolId', TEXT.tool, null, toolSelect);
    // Only in the page while a tool or a practice is chosen (no empty image boxes).
    var toolLogo = el('img', { 'class': 'choice-logo', width: 48, height: 48, alt: '' });

    var practiceSelect = el('select', { 'class': 'input' }, [option('', TEXT.practicePlaceholder)]);
    practices.forEach(function (practice) { practiceSelect.appendChild(option(practice.id, practice.name)); });
    var practice = field('practiceId', TEXT.practice, null, practiceSelect);
    var practiceThumbnail = el('img', { 'class': 'choice-thumbnail', width: 160, alt: '' });

    var description = field('description', TEXT.description, TEXT.descriptionHint,
      el('textarea', { 'class': 'input', rows: 6 }));

    var actions = el('div', { 'class': 'actions' }, [
      el('button', { 'class': 'btn btn--primary', type: 'submit', text: editing ? TEXT.saveChanges : TEXT.saveUsage })
    ]);
    if (editing) {
      var cancel = el('button', { 'class': 'btn btn--secondary', type: 'button', text: TEXT.cancel });
      cancel.addEventListener('click', function () { onCancel(); });
      actions.appendChild(cancel);
    }

    // Above the form: the repeated pair (with a link to the existing usage) and the full storage.
    var pairAlert = el('div', { 'class': 'notice notice--error', role: 'alert' });
    var storageAlert = el('div', { 'class': 'notice notice--error', role: 'alert' });
    var form = el('form', { 'class': 'form', novalidate: true },
      [tool.wrapper, practice.wrapper, description.wrapper, actions]);

    // ---------- Chosen tool logo and practice thumbnail ----------

    function showChoices() {
      var chosenTool = toolSelect.value && DB.getById('tools', toolSelect.value);
      if (chosenTool) {
        toolLogo.src = chosenTool.logo;
        toolLogo.alt = chosenTool.name + ' logo';
        tool.wrapper.appendChild(toolLogo);
      } else {
        toolLogo.remove();
      }
      var chosenPractice = practiceSelect.value && DB.getById('practices', practiceSelect.value);
      if (chosenPractice) {
        practiceThumbnail.src = chosenPractice.image;
        practiceThumbnail.alt = chosenPractice.name + ' Essence diagram';
        practice.wrapper.appendChild(practiceThumbnail);
      } else {
        practiceThumbnail.remove();
      }
    }

    // ---------- Validation ----------

    var rules = [
      { field: tool, check: function () { return toolSelect.value ? '' : TEXT.errors.toolEmpty; } },
      { field: practice, check: function () { return practiceSelect.value ? '' : TEXT.errors.practiceEmpty; } },
      {
        field: description,
        check: function () {
          var value = description.control.value.trim();
          if (!value) return TEXT.errors.descriptionEmpty;
          return value.length > MAX_DESCRIPTION ? TEXT.errors.descriptionLong : '';
        }
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

    // The usage that already relates the chosen tool and practice, if any (not the one being edited).
    function existingPair() {
      if (!toolSelect.value || !practiceSelect.value) return null;
      return DB.getAll('usages').filter(function (other) {
        return other.toolId === toolSelect.value && other.practiceId === practiceSelect.value &&
          !(editing && other.id === usage.id);
      })[0] || null;
    }

    function checkPair() {
      var existing = existingPair();
      pairAlert.textContent = '';
      if (existing) {
        // One span: .notice is a flex row, and a bare text node and link would become two columns.
        var message = el('span');
        message.appendChild(document.createTextNode(TEXT.duplicate + ' '));
        message.appendChild(el('a', { href: 'update-usage.html?id=' + encodeURIComponent(existing.id), text: TEXT.updateIt }));
        pairAlert.appendChild(message);
      }
      return !existing;
    }

    // Blur checks that wait for a click (validateOnBlur) belong to one round; sending or
    // clearing the form starts a new round, so a late check never marks a field it no longer applies to.
    var checksRound = 0;

    rules.forEach(function (rule) {
      var control = rule.field.control;
      control.addEventListener('blur', function (event) {
        var round = checksRound;
        validateOnBlur(event, function () {
          if (round === checksRound) validate(rule); // skipped if the form was sent or cleared meanwhile
        });
      });
      // Once a field shows an error, check it again as it changes so the error goes away when fixed.
      var recheck = function () {
        if (control.getAttribute('aria-invalid') === 'true') validate(rule);
      };
      control.addEventListener('input', recheck);
      control.addEventListener('change', recheck);
    });

    // Choosing a tool or a practice updates its picture and tells right away if the pair is taken.
    [toolSelect, practiceSelect].forEach(function (select) {
      select.addEventListener('change', function () {
        showChoices();
        checkPair();
      });
    });

    // ---------- Fill (edit), reset (create) and submit ----------

    function fill() {
      if (editing) {
        toolSelect.value = usage.toolId || '';
        practiceSelect.value = usage.practiceId || '';
        description.control.value = usage.description || '';
      }
      showChoices();
    }

    function reset() {
      checksRound++;
      form.reset();
      rules.forEach(function (rule) { show(rule.field, ''); });
      pairAlert.textContent = '';
      fill();
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      checksRound++; // sending checks every field, so a blur check still waiting is no longer needed
      storageAlert.textContent = '';
      var firstInvalid = null;
      rules.forEach(function (rule) {
        if (!validate(rule) && !firstInvalid) firstInvalid = rule.field.control;
      });
      var pairFree = checkPair();
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }
      if (!pairFree) {
        toolSelect.focus(); // the alert above the form is announced and holds the link
        return;
      }

      var record = {
        toolId: toolSelect.value,
        practiceId: practiceSelect.value,
        description: description.control.value.trim()
      };

      var saved;
      try {
        saved = editing ? DB.update('usages', usage.id, record) : DB.add('usages', record);
      } catch (error) {
        if (!isQuotaError(error)) throw error;
        storageAlert.textContent = TEXT.storageFull; // the form keeps what was chosen and typed
        return;
      }

      if (editing) {
        usage = saved;
      } else {
        reset();
        toolSelect.focus();
      }
      onSaved(saved);
    });

    fill();
    container.appendChild(pairAlert);
    container.appendChild(storageAlert);
    container.appendChild(form);
    return form;
  }

  window.UsageForm = { mount: mount };
})();
