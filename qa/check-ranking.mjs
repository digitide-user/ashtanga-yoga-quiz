import puppeteer from 'puppeteer';

const BASE = process.env.BASE_URL || 'https://ashtanga-yoga-quiz.onrender.com';
const consoleLogs = [];
const netLogs = [];

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Collect [RANK] logs
  page.on('console', msg => {
    const text = msg.text();
    if (/\[RANK/.test(text)) consoleLogs.push(text);
  });

  // Collect Supabase REST calls
  page.on('response', res => {
    try {
      const url = res.url();
      const method = res.request().method();
      const status = res.status();
      if (/supabase\.co\/rest\/v1\/scores/.test(url)) {
        netLogs.push(`${status} ${method} ${url}`);
      }
    } catch (_) {}
  });

  // Go to site
  await page.goto(BASE, { waitUntil: 'networkidle2', timeout: 60000 }).catch(()=>{});

  // Wait for supabase globals (best-effort)
  await page.waitForFunction(
    () => window.supabase && window.SUPABASE_URL && window.SUPABASE_ANON_KEY,
    { timeout: 15000 }
  ).catch(()=>{});

  // Open ranking UI
  await page.waitForTimeout(1000);
  await page.evaluate(() => {
    const btn = document.querySelector('#viewRankingBtn,[data-action="open-ranking"]');
    if (btn) btn.click();
  });

  // Allow network to happen
  await page.waitForTimeout(5000);

  // Emit required blocks
  console.log('--- [RANK LOGS] ---');
  consoleLogs.forEach(l => console.log(l));
  console.log('--- [GET RANKINGS] ---');
  netLogs.forEach(l => console.log(l));

  await browser.close();

  // Gate: require at least one 200 to /rest/v1/scores
  if (!netLogs.some(l => /200/.test(l))) process.exitCode = 1;
})();
