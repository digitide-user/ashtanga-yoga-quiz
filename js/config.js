(function () {
  // 既定値（未定義なら設定）
  try {
    window.ENABLE_ONLINE_RANKING ??= true;
    window.STRICT_ONLINE_RANKING ??= true;
    window.RANKING_API_URL ??= 'https://script.google.com/macros/s/AKfycbx3ecFodPRt3BWmslQEULFlJJYJ4Dh1FIZczKB8m6IxUpUjkLObnjPoS2fB-ZJ27oQHew/exec';
    window.RANKING_SHARED_KEY ??= '8f2c9a7b3d6e1f0a4c5b7d9e2f3a6c1b';
  } catch (e) {
    if (typeof window.ENABLE_ONLINE_RANKING === 'undefined') window.ENABLE_ONLINE_RANKING = true;
    if (typeof window.STRICT_ONLINE_RANKING === 'undefined') window.STRICT_ONLINE_RANKING = true;
    if (!window.RANKING_API_URL) window.RANKING_API_URL = 'https://script.google.com/macros/s/AKfycbx3ecFodPRt3BWmslQEULFlJJYJ4Dh1FIZczKB8m6IxUpUjkLObnjPoS2fB-ZJ27oQHew/exec';
    if (!window.RANKING_SHARED_KEY) window.RANKING_SHARED_KEY = '8f2c9a7b3d6e1f0a4c5b7d9e2f3a6c1b';
  }

  // ★本番URLを1か所だけ記載（必ず /exec で終わること）
  var GAS_EXEC_URL = 'https://script.google.com/macros/s/AKfycbx3ecFodPRt3BWmslQEULFlJJYJ4Dh1FIZczKB8m6IxUpUjkLObnjPoS2fB-ZJ27oQHew/exec';
  // 共有キー（GAS側と同一のものを設定）
  var SHARED_KEY = '8f2c9a7b3d6e1f0a4c5b7d9e2f3a6c1b';

  // メタタグ > window > 既定値 の順で決定（ページ単位での上書きも可能）
  var metaApi = document.querySelector('meta[name="ranking-api-url"]')?.content;
  var enableOnlineDefault = (location.hostname !== 'localhost' && location.protocol.startsWith('http'));

  window.ENABLE_ONLINE_RANKING = (typeof window.ENABLE_ONLINE_RANKING === 'boolean')
    ? window.ENABLE_ONLINE_RANKING
    : enableOnlineDefault;

  window.RANKING_API_URL = window.RANKING_API_URL || metaApi || GAS_EXEC_URL;
  window.RANKING_SHARED_KEY = window.RANKING_SHARED_KEY || SHARED_KEY;
})();
