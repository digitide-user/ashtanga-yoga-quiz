// qa/check-ranking.mjs
import puppeteer from "puppeteer";

const BASE = process.env.BASE_URL || "https://ashtanga-yoga-quiz.onrender.com";

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(60000);

  const rankLines = [];
  const reqLines = [];

  // Capture ALL console logs and keep lines that include [RANK] / [RANK QA]
  page.on("console", msg => {
    const txt = msg.text?.() || String(msg);
    // Stream everything so the runner sees progress; filter later for RANK lines
    console.log(txt);
    if (/\[RANK( QA)?\]/.test(txt)) rankLines.push(txt);
  });

  // Capture any Supabase REST calls
  page.on("response", async (res) => {
    try {
      const url = res.url();
      if (url.includes("/rest/v1/scores")) {
        const req = res.request();
        const method = req.method();
        const status = res.status();
        reqLines.push(`${method} ${status} ${url}`);
        console.log(`[QA] CAPTURE ${method} ${status} ${url}`);
      }
    } catch {}
  });

  let forced = false;
  try {
    // 1) Open site
    console.log(`[QA] opening ${BASE}`);
    await page.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });

    // 2) Dump config from the page (this also emits a [RANK QA] line)
    await page.evaluate(() => {
      const info = {
        strict: !!window.STRICT_ONLINE_RANKING,
        enable: !!window.ENABLE_ONLINE_RANKING,
        supabaseUrl: window.SUPABASE_URL,
        anonKey: typeof window.SUPABASE_ANON_KEY === "string" ? `len=${window.SUPABASE_ANON_KEY.length}` : null,
        hasRankingSystem: !!window.rankingSystem,
        hasBtn: !!document.querySelector('#viewRankingBtn,[data-action="open-ranking"]'),
      };
      console.log("[RANK QA] config " + JSON.stringify(info));
    });

    // 3) Try to open the rankings UI by clicking or calling the method
    const opened = await page.evaluate(async () => {
      const btn = document.querySelector('#viewRankingBtn,[data-action="open-ranking"]');
      if (btn) { btn.click(); return "clicked"; }
      if (window.rankingSystem && typeof window.rankingSystem.showOnlineRankings === "function") {
        window.rankingSystem.showOnlineRankings("allTime", 5);
        return "called";
      }
      return "none";
    });
    console.log(`[QA] open-ranking attempt: ${opened}`);

    // 4) Give the page time to issue requests; then, if none, force a GET via fetch()
    await page.waitForTimeout(2500);
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
      await page.waitForTimeout(1500);
    }
  } catch (e) {
    console.log(`[QA] ERROR ${e?.message || e}`);
  } finally {
    // Print compact sections so workflow can pick them up
    console.log("\n--- [RANK LOGS] ---");
    if (rankLines.length === 0) console.log("(no [RANK] logs captured)");
    else rankLines.slice(-40).forEach(l => console.log(l));

    console.log("--- [GET RANKINGS] ---");
    if (reqLines.length === 0 && !forced) console.log("(no /rest/v1/scores requests captured)");
    reqLines.slice(-20).forEach(l => console.log(l));

    await browser.close();
  }
})();
