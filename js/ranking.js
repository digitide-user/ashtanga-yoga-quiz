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
