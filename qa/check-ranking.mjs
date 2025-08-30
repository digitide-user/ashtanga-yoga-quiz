import puppeteer from "puppeteer";
const BASE = process.env.BASE_URL || "https://ashtanga-yoga-quiz.onrender.com";
const sleep = (ms) => new Promise(r=>setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox","--disable-setuid-sandbox","--disable-dev-shm-usage"],
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(60000);

  const rankLines = [];
  const reqLines = [];

  page.on("console", msg => {
    const txt = (typeof msg.text === 'function') ? msg.text() : String(msg);
    console.log(txt);
    if (/\[RANK( QA)?\]/.test(txt)) rankLines.push(txt);
  });
  page.on("response", async (res) => {
    try {
      const url = res.url();
      if (url.includes("/rest/v1/scores")) {
        const method = res.request().method();
        reqLines.push(`${method} ${res.status()} ${url}`);
        console.log(`[QA] CAPTURE ${method} ${res.status()} ${url}`);
      }
    } catch {}
  });

  let forced = false;
  try {
    const base = BASE.replace(/\/$/, '');
    let url = `${base}/?qa_bust=${Date.now()}&qa_insert=1`;
    console.log(`[QA] opening ${url}`);
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

    await page.evaluate(() => {
      const info = {
        strict: !!window.STRICT_ONLINE_RANKING,
        enable: !!window.ENABLE_ONLINE_RANKING,
        anonKey: !!window.SUPABASE_ANON_KEY ? `len=${window.SUPABASE_ANON_KEY.length}` : null,
        hasRankingSystem: !!window.rankingSystem,
        hasBtn: !!document.querySelector('#viewRankingBtn,[data-action="open-ranking"]'),
      };
      console.log("[RANK QA] config " + JSON.stringify(info));
    });

    const opened = await page.evaluate(() => {
      const btn = document.querySelector('#viewRankingBtn,[data-action="open-ranking"]');
      if (btn) { btn.click(); return "clicked"; }
      if (window.rankingSystem && typeof window.rankingSystem.open === "function") {
        window.rankingSystem.open("allTime", 5);
        return "called";
      }
      return "none";
    });
    console.log(`[QA] open-ranking attempt: ${opened}`);

    await sleep(2500);

    if (reqLines.length === 0) {
      forced = true;
      await page.evaluate(async () => {
        if (window.SUPABASE_URL && window.SUPABASE_ANON_KEY) {
          const url = `${window.SUPABASE_URL}/rest/v1/scores?select=id&limit=1`;
          const res = await fetch(url, {
            headers: {
              apikey: window.SUPABASE_ANON_KEY,
              Authorization: `Bearer ${window.SUPABASE_ANON_KEY}`,
            },
          });
          console.log(`[RANK QA] forced GET ${res.status} ${url}`);
        } else {
          console.log("[RANK QA] forced GET skipped (missing SUPABASE config)");
        }
      });
      await sleep(1200);
    }
  } catch (e) {
    console.log(`[QA] ERROR ${e?.message || e}`);
  } finally {
    console.log("\n--- [RANK LOGS] ---");
    if (rankLines.length === 0) console.log("(no [RANK] logs captured)");
    else rankLines.slice(-40).forEach(l => console.log(l));

    console.log("--- [GET RANKINGS] ---");
    if (reqLines.length === 0 && !forced) console.log("(no /rest/v1/scores requests captured)");
    reqLines.slice(-20).forEach(l => console.log(l));

    await browser.close();
  }
})();
