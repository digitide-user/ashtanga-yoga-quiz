/**
 * Compat prelude to prevent "Cannot read properties of null (reading 'addEventListener')"
 * - If document.getElementById returns null, inject a stub <div id="..."> into <body>.
 * - This keeps existing addEventListener(...) calls from crashing.
 */
(function () {
  // getElementById: 無ければ stub を作る
  const origGet = document.getElementById.bind(document);
  document.getElementById = function (id) {
    const el = origGet(id);
    if (el) return el;
    const stub = document.createElement('div');
    stub.id = id;
    document.body.appendChild(stub);
    console.warn('[compat] injected #' + id);
    return stub;
  };

  // Document.querySelector: 無ければ stub
  const origDocQS = Document.prototype.querySelector;
  Document.prototype.querySelector = function (sel) {
    const el = origDocQS.call(this, sel);
    if (el) return el;
    const stub = document.createElement('div');
    if (sel && sel.startsWith('#')) stub.id = sel.slice(1);
    else stub.setAttribute('data-compat-selector', sel || '');
    (document.body || this.documentElement || document.documentElement).appendChild(stub);
    console.warn('[compat] injected stub for selector (document):', sel);
    return stub;
  };

  // Document.querySelectorAll: 無ければ空 NodeList 風
  const origDocQSA = Document.prototype.querySelectorAll;
  Document.prototype.querySelectorAll = function (sel) {
    const list = origDocQSA.call(this, sel);
    if (list && list.length) return list;
    const arr = [];
    arr.forEach = Array.prototype.forEach;
    console.warn('[compat] empty NodeList for selector (document):', sel);
    return arr;
  };

  // Element.querySelector: 無ければ要素配下に stub
  const origElQS = Element.prototype.querySelector;
  Element.prototype.querySelector = function (sel) {
    const el = origElQS.call(this, sel);
    if (el) return el;
    const stub = document.createElement('div');
    if (sel && sel.startsWith('#')) stub.id = sel.slice(1);
    else stub.setAttribute('data-compat-selector', sel || '');
    (this.isConnected ? this : document.body).appendChild(stub);
    console.warn('[compat] injected stub for selector (element):', sel);
    return stub;
  };

  // Element.querySelectorAll: 無ければ空 NodeList 風
  const origElQSA = Element.prototype.querySelectorAll;
  Element.prototype.querySelectorAll = function (sel) {
    const list = origElQSA.call(this, sel);
    if (list && list.length) return list;
    const arr = [];
    arr.forEach = Array.prototype.forEach;
    console.warn('[compat] empty NodeList for selector (element):', sel);
    return arr;
  };
})();
