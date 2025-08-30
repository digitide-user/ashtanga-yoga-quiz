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

  // querySelector: 無ければ stub を返す（#id の時はその id を使う）
  const origQS = document.querySelector.bind(document);
  document.querySelector = function (sel) {
    const el = origQS(sel);
    if (el) return el;
    const stub = document.createElement('div');
    if (sel && sel.startsWith('#')) {
      stub.id = sel.slice(1);
    } else {
      stub.setAttribute('data-compat-selector', sel || '');
    }
    document.body.appendChild(stub);
    console.warn('[compat] injected stub for selector:', sel);
    return stub;
  };

  // querySelectorAll: 無ければ空 NodeList 風オブジェクトを返す
  const origQSA = document.querySelectorAll.bind(document);
  document.querySelectorAll = function (sel) {
    const list = origQSA(sel);
    if (list && list.length) return list;
    const arr = [];
    arr.forEach = Array.prototype.forEach;
    console.warn('[compat] empty NodeList for selector:', sel);
    return arr;
  };
})();
