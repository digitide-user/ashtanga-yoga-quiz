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
