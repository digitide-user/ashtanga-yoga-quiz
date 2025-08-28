import puppeteer from 'puppeteer';

const BASE = process.env.BASE_URL || 'https://ashtanga-yoga-quiz.onrender.com';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const rankLogs = [];
  page.on('console', (msg) => {
    const text = msg.text();
    if (text.includes('[RANK')) rankLogs.push(text);
  });
  const reqs = [];
  page.on('requestfinished', async (req) => {
    try {
      const url = req.url();
      if (url.includes('action=getRankings')) {
        const res = req.response();
        reqs.push({ url, status: res ? res.status() : -1 });
      }
    } catch {}
  });

  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 30000 });

  // クリック試行
  try {
    const btn = await page.$('#viewRankingBtn');
    if (btn) {
      await btn.click();
    } else {
      const alt = await page.$('[data-action="open-ranking"]');
      if (alt) await alt.click();
    }
    await page.waitForTimeout(1500);
  } catch {}

  // ダンプ
  console.log('--- [RANK LOGS] ---');
  for (const l of rankLogs) console.log(l);
  console.log('--- [GET RANKINGS] ---');
  for (const r of reqs) console.log(r.status, r.url);

  await browser.close();
})().catch((e) => { console.error('[QA] error', e); process.exit(1); });
