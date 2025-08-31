// ===== Production Guard: block any QA/autoboot leftovers (hard) =====
;(() => {
  try {
    // 明示的に無効化
    try { window.QA_AUTOBOOT = false } catch {}

    const isQaSrc = (src) => /qa-?autoboot|\/qa_|[?&]qa[_-]?/i.test(src || "");
    const isDebugButton = (el) => {
      if (!el) return false;
      const txt = (el.textContent || el.innerText || "").trim();
      if (el.classList?.contains('open-ranking-btn')) return false; // 本物は残す
      return (
        txt === 'クイズを始める' ||
        txt === '詳細ランキングを見る'
      );
    };

    // 既存の残骸を片付け
    const purge = () => {
      try {
        document.querySelectorAll('script').forEach(s => {
          const src = s.getAttribute('src') || "";
          if (isQaSrc(src)) s.remove();
        });
        document.querySelectorAll('button, a, div').forEach(n => {
          if (isDebugButton(n)) n.remove();
        });
      } catch {}
    };

    // 将来の再挿入を監視して即ブロック
    const mo = new MutationObserver((recs) => {
      for (const r of recs) {
        for (const n of r.addedNodes) {
          try {
            if (n.nodeType !== 1) continue;
            if (n.tagName === 'SCRIPT' && isQaSrc(n.getAttribute('src'))) { n.remove(); continue; }
            if (isDebugButton(n)) { n.remove(); continue; }
            // 子孫にも残骸がないか軽くチェック
            if (n.querySelectorAll) {
              n.querySelectorAll('script,button,a,div').forEach(m => {
                if (m.tagName === 'SCRIPT' && isQaSrc(m.getAttribute('src'))) m.remove();
                else if (isDebugButton(m)) m.remove();
              });
            }
          } catch {}
        }
      }
    });
    if (document.body) mo.observe(document.body, { childList: true, subtree: true });
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', purge, { once: true });
    } else {
      purge();
    }

    // qa-autoboot 由来のエラーのノイズは握りつぶす
    window.addEventListener('error', (e) => {
      if (isQaSrc(e?.filename || "")) { e.preventDefault?.(); return false; }
    }, true);
  } catch {}
})();

(function () {
  console.log('[RANK] ranking.js loaded (supabase)');

  // 本番安定化: QA autoboot は常に無効
  try { window.QA_AUTOBOOT = false; } catch(_) {}

  // Fallbacks if inline config was stripped by cache/CDN
  window.ENABLE_ONLINE_RANKING ??= true;
  window.STRICT_ONLINE_RANKING ??= true;
  window.SUPABASE_URL ??= "https://utpcwlxxmgzkcrwfbiav.supabase.co";
  window.SUPABASE_ANON_KEY ??= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0cGN3bHh4bWd6a2Nyd2ZiaWF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MTYzNTgsImV4cCI6MjA3MTk5MjM1OH0.lCGFzl0pExl3uqsSh4h0jrPsmtowQ9618q4lZyxX4o4";

  function ensureModal(rows) {
    let m = document.getElementById('rankingModal');
    if (!m) {
      m = document.createElement('div');
      m.id = 'rankingModal';
      m.style.position = 'fixed';
      m.style.inset = '0';
      m.style.background = 'rgba(0,0,0,.55)';
      m.style.display = 'flex';
      m.style.alignItems = 'center';
      m.style.justifyContent = 'center';
      m.innerHTML = `
        <div style="background:#fff;max-width:640px;width:90%;padding:16px;border-radius:12px;">
          <h3>オンラインランキング</h3>
          <div id="rankingBody" style="max-height:60vh;overflow:auto;"></div>
          <button id="closeRanking" class="btn">閉じる</button>
        </div>`;
      document.body.appendChild(m);
      m.querySelector('#closeRanking').onclick = () => (m.style.display = 'none');
    }
    const body = m.querySelector('#rankingBody');
    body.innerHTML = rows && rows.length
      ? `<ol>${rows.map(r=>`<li>${r.name ?? '匿名'} — ${r.score}/${r.total_questions} (${r.percentage}%) ${r.time_spent ?? '-'}s</li>`).join('')}</ol>`
      : '<p>データがありません。</p>';
    m.style.display = 'flex';
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const strict = !!window.STRICT_ONLINE_RANKING;
    const enable = !!window.ENABLE_ONLINE_RANKING;

    if (!enable) {
      console.log('[RANK] disabled by config');
      return;
    }
    if (!window.SUPABASE_URL || !window.SUPABASE_ANON_KEY || typeof supabase === 'undefined') {
      console.error('[RANK] supabase config/lib missing');
      if (strict) alert('オンラインランキング設定が欠落しています。');
      return;
    }

    console.log('[RANK] ONLINE ONLY mode enabled (supabase)');
    const sb = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY, { auth: { persistSession: false } });

    window.rankingSystem = {
      async submitScore(scoreData) {
        const payload = { ...scoreData, created_at: new Date().toISOString() };
        const { error } = await sb.from('scores').insert([payload]);
        if (error) throw error;
        return true;
      },
      async open(period='allTime', limit=50) {
        const since = (() => {
          const d = new Date();
          if (period==='daily') d.setDate(d.getDate()-1);
          else if (period==='weekly') d.setDate(d.getDate()-7);
          else if (period==='monthly') d.setMonth(d.getMonth()-1);
          else return null;
          return d.toISOString();
        })();
        let q = sb.from('scores')
          .select('name,score,total_questions,percentage,time_spent,created_at')
          .order('score',{ascending:false})
          .order('percentage',{ascending:false})
          .order('time_spent',{ascending:true})
          .limit(limit);
        if (since) q = q.gte('created_at', since);
        const { data, error } = await q;
        if (error) throw error;
        ensureModal(data || []);
      }
    };

    const bind = () => {
      const btn = document.querySelector('#open-ranking-btn,[data-role="open-ranking"]');
      if (btn && !btn.dataset.rankingBound) {
        btn.dataset.rankingBound = '1';
        btn.addEventListener('click', () => window.rankingSystem.open('allTime', 50));
        console.log('[RANK] bind open-ranking button');
      }
    };
    bind();
    new MutationObserver(bind).observe(document.documentElement, { childList:true, subtree:true });

    try { await sb.from('scores').select('id').limit(1); } catch {}
  });

  // --- [RANK] unified submitScore API (Supabase insert) ---
  window.rankingSystem = window.rankingSystem || {};
  window.rankingSystem.__submittedOnce = false;
  window.rankingSystem.submitScore = async function(entry){
    // entry: { name, score, totalQuestions, percentage, timeSpent }
    const payload = {
      name: (entry && entry.name) || '匿名',
      score: Number(entry && entry.score || 0),
      total_questions: Number(entry && entry.totalQuestions || 10),
      percentage: Number(entry && entry.percentage || 0),
      time_spent: Number(entry && entry.timeSpent || 0)
    };
    try {
      if (window.supabase && window.SUPABASE_URL && window.SUPABASE_ANON_KEY) {
        const sbc = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY, { auth:{ persistSession:false }});
        const { data, error, status } = await sbc.from('scores').insert([payload]).select().single();
        if (error) throw new Error(error.message || ('insert error ' + status));
        console.log('[RANK] INSERT ok (sb-js)', data);
        return data;
      }
      // REST フォールバック（QA用のCAPTUREログ付き）
      const base = (window.SUPABASE_URL||'').replace(/\/$,'');
      const url = base + '/rest/v1/scores';
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Prefer': 'return=representation',
          apikey: window.SUPABASE_ANON_KEY,
          Authorization: `Bearer ${window.SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify([payload])
      });
      console.log(`[QA] CAPTURE POST ${res.status} ${url}`);
      if (!res.ok) throw new Error('REST insert failed: ' + res.status);
      const data = await res.json();
      console.log('[RANK] INSERT ok (rest)', data && data[0]);
      return data && data[0];
    } catch (e) {
      console.error('[RANK] INSERT fail', e);
      throw e;
    } finally {
      window.rankingSystem.__submittedOnce = true;
    }
  };

  // QA 強制挿入は完全無効化（本番安定化）
})();
// ===== Production hardening for QA leftovers =====
// 1) Never allow QA autoboot in production
try { window.QA_AUTOBOOT = false; } catch (_) {}
// 2) Remove any debug buttons that QA may have injected (Japanese labels)
function __cleanupQaButtons() {
  try {
    const labels = new Set(["クイズを始める", "詳細ランキングを見る"]);
    document.querySelectorAll('button').forEach(b => {
      const t = (b.textContent || b.innerText || "").trim();
      if (labels.has(t)) b.remove();
    });
  } catch (_) {}
}
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", __cleanupQaButtons, { once:true });
  } else {
    setTimeout(__cleanupQaButtons, 0);
  }
  // 3) Ignore errors bubbling from any qa-autoboot bundle/chunk
  window.addEventListener("error", function(e){
    try {
      if (String(e?.filename || "").includes("qa-autoboot")) {
        e.preventDefault?.();
        return false;
      }
    } catch(_) {}
  }, true);
}
// >>> BEGIN: production lock against QA autoboot <<<
;(function(){
  try {
    // Never run QA in production
    try { window.QA_AUTOBOOT = false; } catch(_) {}
    const BLOCK = /qa-?autoboot|qa_|\bautoboot\b/i;
    // Block script injections that look like QA loaders
    const _append = Element.prototype.appendChild;
    Element.prototype.appendChild = function(node){
      try{
        if (node && node.tagName === 'SCRIPT'){
          const src = (node.src || node.getAttribute?.('src') || '');
          if (BLOCK.test(src)){ console.warn('[RANK] blocked QA script:', src); return node; }
        }
      }catch(_) {}
      return _append.call(this, node);
    };
    // Purge already-inserted QA scripts / debug buttons
    const purge = () => {
      try {
        document.querySelectorAll('script[src*="qa-autoboot"],script[src*="qa_"]').forEach(s=>s.remove());
        const labels = new Set(['クイズを始める','詳細ランキングを見る']);
        document.querySelectorAll('button').forEach(b=>{
          const t=(b.textContent||b.innerText||'').trim();
          if (labels.has(t) && !b.classList.contains('open-ranking-btn')) b.remove();
        });
      } catch(_) {}
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', purge, {once:true}); else setTimeout(purge,0);
    // Hide console noise from any surviving qa-autoboot file
    window.addEventListener('error', (e)=>{
      if (String(e?.filename||'').includes('qa-autoboot')) { e.preventDefault?.(); return false; }
    }, true);
  } catch(_) {}
})();
// <<< END: production lock against QA autoboot <<<

// === expose Supabase ranking API to window.rankingSystem (append-only) ===
(() => {
  const sb = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);

  // define getTop if missing
  async function getTop(limit = (window.RANKING_TOP_LIMIT || 10)) {
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
  }

  // keep existing submitScore if already defined; otherwise define it
  const submitScore =
    (window.rankingSystem && window.rankingSystem.submitScore) ||
    (async function submitScore({ name, score, total_questions, time_spent }) {
      const { error } = await sb.from('scores').insert([{ name, score, total_questions, time_spent }]);
      if (error) throw error;
      console.log('[RANK] POST ok');
      return true;
    });

  window.rankingSystem = Object.assign({}, window.rankingSystem, { getTop, submitScore });
})();
