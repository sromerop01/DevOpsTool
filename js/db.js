/*
 * Simulated database on top of Chrome's localStorage.
 *
 * Each collection is stored under its own key as a JSON array of records with
 * the same structure as data/<collection>.json, which provides its initial data:
 *   devops.categories <- data/categories.json  { id, name, color }
 *   devops.tools      <- data/tools.json       { id, name, logo, description, pricingModel, categoryId }
 *   devops.practices  <- data/practices.json   { id, name, description, image }
 *   devops.usages     <- data/usages.json      { id, toolId, practiceId, description }
 *
 * Pages never read or write localStorage directly: they wait for DB.ready and use window.DB.
 * Form rules (empty fields, repeated names) are validated by each page, not here.
 */
(function () {
  'use strict';

  var COLLECTIONS = {
    categories: { key: 'devops.categories', prefix: 'category-' },
    tools: { key: 'devops.tools', prefix: 'tool-' },
    practices: { key: 'devops.practices', prefix: 'practice-' },
    usages: { key: 'devops.usages', prefix: 'usage-' }
  };
  var NAMES = Object.keys(COLLECTIONS);

  // data/ sits next to js/, so resolve it from this script's URL instead of the page's.
  var DATA_URL = document.currentScript
    ? new URL('../data/', document.currentScript.src)
    : new URL('data/', location.href);

  function spec(collection) {
    if (!Object.prototype.hasOwnProperty.call(COLLECTIONS, collection)) {
      throw new Error('DB: unknown collection "' + collection + '". Use one of: ' + NAMES.join(', ') + '.');
    }
    return COLLECTIONS[collection];
  }

  // The stored array, or null when the key is missing or does not hold a JSON array.
  function readStored(collection) {
    var raw = localStorage.getItem(spec(collection).key);
    if (raw === null) return null;
    try {
      var value = JSON.parse(raw);
      return Array.isArray(value) ? value : null;
    } catch (error) {
      return null;
    }
  }

  // Every call parses storage again, so callers always get their own copy.
  function read(collection) {
    var records = readStored(collection);
    if (records === null) {
      throw new Error('DB: "' + collection + '" is not loaded. Wait for DB.ready before using DB.');
    }
    return records;
  }

  function write(collection, records) {
    localStorage.setItem(spec(collection).key, JSON.stringify(records));
  }

  function fetchInitial(collection) {
    var file = 'data/' + collection + '.json';
    return fetch(new URL(collection + '.json', DATA_URL), { cache: 'no-cache' })
      .then(function (response) {
        if (!response.ok) throw new Error('DB: ' + file + ' answered HTTP ' + response.status + '.');
        return response.json();
      })
      .then(function (records) {
        if (!Array.isArray(records)) throw new Error('DB: ' + file + ' must contain a JSON array.');
        return records;
      });
  }

  // Fetches every file before writing, so a failed load never leaves storage half replaced.
  function loadInitial(collections) {
    return Promise.all(collections.map(fetchInitial)).then(function (results) {
      collections.forEach(function (collection, i) {
        write(collection, results[i]);
      });
    });
  }

  function indexOfId(records, id) {
    for (var i = 0; i < records.length; i++) {
      if (records[i].id === id) return i;
    }
    return -1;
  }

  function randomChars(length) {
    var alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
    var out = '';
    for (var i = 0; i < length; i++) {
      out += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return out;
  }

  function hasId(record) {
    return record.id !== undefined && record.id !== null && record.id !== '';
  }

  // Resolves once the four keys exist, loading from data/ only the ones that are missing or invalid.
  var ready = new Promise(function (resolve) {
    resolve(loadInitial(NAMES.filter(function (collection) {
      return readStored(collection) === null;
    })));
  });
  // Each page decides how to report a failed load; this only avoids an "Uncaught (in promise)".
  ready.catch(function () {});

  window.DB = {
    PRICING_MODELS: Object.freeze([
      Object.freeze({ code: 'OS', label: 'Open source' }),
      Object.freeze({ code: 'FR', label: 'Free' }),
      Object.freeze({ code: 'FM', label: 'Freemium' }),
      Object.freeze({ code: 'PA', label: 'Paid' }),
      Object.freeze({ code: 'EN', label: 'Enterprise' })
    ]),

    ready: ready,

    getAll: function (collection) {
      return read(collection);
    },

    getById: function (collection, id) {
      var records = read(collection);
      var i = indexOfId(records, id);
      return i === -1 ? null : records[i];
    },

    // Assigns "<prefix><base-36 timestamp><4 random chars>" when the record brings no id.
    add: function (collection, record) {
      if (!record || typeof record !== 'object' || Array.isArray(record)) {
        throw new Error('DB.add: the record must be an object.');
      }
      var records = read(collection);
      var stored = Object.assign({ id: null }, record); // keeps "id" as the first field
      if (!hasId(record)) {
        stored.id = spec(collection).prefix + Date.now().toString(36) + randomChars(4);
      } else if (indexOfId(records, stored.id) !== -1) {
        throw new Error('DB.add: ' + collection + ' already has a record with id "' + stored.id + '".');
      }
      records.push(stored);
      write(collection, records);
      return stored;
    },

    // Merges the changes into the record. The id never changes, so references stay valid.
    update: function (collection, id, changes) {
      var records = read(collection);
      var i = indexOfId(records, id);
      if (i === -1) {
        throw new Error('DB.update: ' + collection + ' has no record with id "' + id + '".');
      }
      var updated = Object.assign({}, records[i], changes, { id: records[i].id });
      records[i] = updated;
      write(collection, records);
      return updated;
    },

    // Same format as the files in data/: 2-space indentation and a final newline.
    download: function (collection) {
      var text = JSON.stringify(read(collection), null, 2) + '\n';
      var url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
      var link = document.createElement('a');
      link.href = url;
      link.download = collection + '.json';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    },

    // Replaces the four keys with the content of data/. If a file can't be loaded, nothing changes.
    reset: function () {
      return loadInitial(NAMES);
    }
  };
})();
