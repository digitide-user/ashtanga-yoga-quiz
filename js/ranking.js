/* js/ranking.js ー ファイル全置き換え推奨 */

// --- Supabase client (singleton) ---
const __SB__ =
  window.__SB__ ||
  (window.__SB__ =
    window.supabase?.createClient?.(window.SUPABASE_URL, window.SUPABASE_ANON_KEY));

function ready() {
  if (!__SB__) console.warn("[RANK] supabase client not ready");
  return !!__SB__;
}

// --- GET: 上位スコアを取得 ---
async function getTop(limit = window.RANKING_TOP_LIMIT || 10) {
  if (!ready()) return [];
  const { data, error } = await __SB__
    .from("scores")
    .select("name, score, total_questions, percentage, time_spent, created_at")
    .order("percentage", { ascending: false })
    .order("time_spent", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.warn("[RANK] GET fail", error);
    return [];
  }
  console.log("[RANK] GET ok:", data?.length ?? 0);
  return data ?? [];
}

// --- POST: スコア送信（本来の公開API）---
async function submitScore({ name, score, total_questions, time_spent }) {
  if (!ready()) return false;
  try {
    name = (typeof name === 'string' && name.trim()) ||
           (localStorage.getItem('yogaquiz_name') || localStorage.getItem('yogaquiz_username') || '').trim() ||
           'ゲスト';
  } catch (_) {}
  const { error } = await __SB__
    .from("scores")
    .insert([{ name, score, total_questions, time_spent }]);
  if (error) {
    console.warn("[RANK] POST fail", error);
    return false;
  }
  console.log("[RANK] POST ok");
  return true;
}

// --- 互換用エイリアス（旧 quiz.js が addScore を呼ぶ場合に備える）---
async function addScore(args) {
  return submitScore(args);
}

// ブラウザ公開
window.rankingSystem = Object.assign({}, window.rankingSystem, {
  getTop,
  submitScore,
  addScore,
});

// --- Safe wrapper to ensure API exposure (keeps existing if present) ---
(function ensureRankingAPI(){
  try {
    const sb = (window.supabase && window.SUPABASE_URL && window.SUPABASE_ANON_KEY)
      ? window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY)
      : null;

    if (typeof window.getTop !== 'function') {
      window.getTop = async function getTop(limit = (window.RANKING_TOP_LIMIT || 10)) {
        if (!sb) throw new Error('supabase client not ready');
        const { data, error } = await sb
          .from('scores')
          .select('name, score, total_questions, percentage, time_spent, created_at')
          .order('percentage', { ascending: false })
          .order('time_spent', { ascending: true })
          .order('created_at', { ascending: false })
          .limit(limit);
        if (error) throw error;
        console.log('[RANK] GET ok:', data?.length ?? 0);
        return data ?? [];
      };
    }

    if (typeof window.submitScore !== 'function') {
      window.submitScore = async function submitScore({ name, score, total_questions, time_spent }) {
        if (!sb) throw new Error('supabase client not ready');
        try {
          name = (typeof name === 'string' && name.trim()) ||
                 (localStorage.getItem('yogaquiz_name') || localStorage.getItem('yogaquiz_username') || '').trim() ||
                 'ゲスト';
        } catch (_) {}
        const { error } = await sb.from('scores').insert([{ name, score, total_questions, time_spent }]);
        if (error) throw error;
        console.log('[RANK] POST ok (ranking.js)');
        return true;
      };
    }

    window.rankingSystem = Object.assign({}, window.rankingSystem, {
      getTop: window.getTop,
      submitScore: window.submitScore,
    });
  } catch (e) {
    console.warn('[RANK] expose API skipped:', e);
  }
})();

// FORCE (targeted): keep #open-ranking-btn visible; observe only the button itself
document.addEventListener('DOMContentLoaded', function () {
  function show(btn) {
    if (!btn) return;
    btn.removeAttribute('hidden');
    btn.classList && btn.classList.remove('hidden', 'invisible');
    if (btn.style) {
      btn.style.setProperty('display', 'inline-flex', 'important');
      btn.style.setProperty('visibility', 'visible', 'important');
      btn.style.setProperty('opacity', '1', 'important');
    }
    if (!btn.dataset.bound) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (typeof openRankingOverlay === 'function') openRankingOverlay();
      }, { passive: false });
      btn.dataset.bound = '1';
    }
  }

  function attachObserver(btn) {
    try {
      // 1) ボタン自身の属性変化（hidden/style/class）を監視して即座に可視化
      const moBtn = new MutationObserver(() => show(btn));
      moBtn.observe(btn, { attributes: true, attributeFilter: ['hidden', 'style', 'class'] });

      // 2) 親直下での付け外しにも追従（再挿入時に再show）
      if (btn.parentNode) {
        const moParent = new MutationObserver(() => {
          const b = document.getElementById('open-ranking-btn');
          if (b) show(b);
        });
        moParent.observe(btn.parentNode, { childList: true, subtree: false });
      }
    } catch (e) { /* fail-open */ }
  }

  // ボタンが後から生成されるケースに備えて、一定時間だけ探索
  var tries = 0;
  var finder = setInterval(function () {
    var btn = document.getElementById('open-ranking-btn');
    if (btn) {
      clearInterval(finder);
      show(btn);
      attachObserver(btn);
    }
    if (++tries > 60) clearInterval(finder); // 最大約60秒探索
  }, 1000);
});
