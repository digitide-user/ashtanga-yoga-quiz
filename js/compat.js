/**
 * Compat prelude to prevent "Cannot read properties of null (reading 'addEventListener')"
 * - If document.getElementById returns null, inject a stub <div id="..."> into <body>.
 * - This keeps existing addEventListener(...) calls from crashing.
 */
(function () {
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
})();
