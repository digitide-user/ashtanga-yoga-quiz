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

// --- POST: スコア送信（公開API）---
function toInt(v) { const n = Number(v); return Number.isFinite(n) ? Math.trunc(n) : null; }
async function submitScore(input) {
  if (!ready()) return false;
  const name = (
    (input?.name ?? input?.username ?? window.currentUser ?? 'ゲスト')
  ).toString().slice(0, 24);

  const score = toInt(input?.score ?? input?.points ?? window.currentScore);
  const total_questions = toInt(input?.total_questions ?? input?.totalQuestions ?? window.TOTAL_QUESTIONS ?? (Array.isArray(window.questions) ? window.questions.length : undefined));
  const time_spent = toInt(input?.time_spent ?? input?.timeSpent ?? window.timeSpent ?? window.elapsedSeconds ?? window.totalTimeSpent);

  if (score === null || total_questions === null || time_spent === null) {
    console.warn('[RANK] missing fields', { score, total_questions, time_spent });
    return false; // null は投げない
  }

  const { error } = await __SB__.from('scores').insert([{ name, score, total_questions, time_spent }]);
  if (error) { console.warn('[RANK] POST fail', error); return false; }
  console.log('[RANK] POST ok');
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
      window.submitScore = async function submitScoreCompat(input) {
        if (!sb) throw new Error('supabase client not ready');
        const name = (
          (input?.name ?? input?.username ?? window.currentUser ?? 'ゲスト')
        ).toString().slice(0, 24);
        const score = toInt(input?.score ?? input?.points ?? window.currentScore);
        const total_questions = toInt(input?.total_questions ?? input?.totalQuestions ?? window.TOTAL_QUESTIONS ?? (Array.isArray(window.questions) ? window.questions.length : undefined));
        const time_spent = toInt(input?.time_spent ?? input?.timeSpent ?? window.timeSpent ?? window.elapsedSeconds ?? window.totalTimeSpent);
        if (score === null || total_questions === null || time_spent === null) {
          console.warn('[RANK] missing fields', { score, total_questions, time_spent });
          return false;
        }
        const { error } = await sb.from('scores').insert([{ name, score, total_questions, time_spent }]);
        if (error) { console.warn('[RANK] POST fail', error); return false; }
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

// removed legacy FORCE/hotfix overlay hooks
