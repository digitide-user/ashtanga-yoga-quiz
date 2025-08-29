// Headless QA: Supabase ランキングの起動ログと /rest/v1/scores 通信を検証
import fs from 'node:fs';
import puppeteer from 'puppeteer';

const BASE = process.env.BASE_URL || 'https://ashtanga-yoga-quiz.onrender.com';

const rankLogs = [];
const getReqs = [];

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  page.on('console', (msg) => {
    const t = msg.text();
    if (t.includes('[RANK')) rankLogs.push(t);
  });

  page.on('response', async (res) => {
    try {
      const url = res.url();
      if (url.includes('/rest/v1/scores')) {
        getReqs.push(`${res.status()} ${url}`);
      }
    } catch {}
  });

  await page.goto(BASE, { waitUntil: 'networkidle2', timeout: 60000 });

  const sel = '#viewRankingBtn, [data-action="open-ranking"]';
  try {
    await page.waitForSelector(sel, { timeout: 15000 });
    await page.click(sel);
    await page.waitForNetworkIdle({ idleTime: 1000, timeout: 20000 });
  } catch {
    // クリック不可でもログで判定可能
  }

  let out = '';
  out += '--- [RANK LOGS] ---\n';
  out += (rankLogs.length ? rankLogs.join('\n') : '(no [RANK] logs captured)') + '\n';
  out += '--- [GET RANKINGS] ---\n';
  out += (getReqs.length ? getReqs.join('\n') : '(no /rest/v1/scores requests captured)') + '\n';

  fs.writeFileSync('qa_output.txt', out, 'utf8');
  console.log(out);

  // 合否: /rest/v1/scores の 200 が1件以上
  const pass = getReqs.some((l) => l.startsWith('200 '));
  if (!pass) process.exitCode = 1;

  await browser.close();
})().catch((err) => {
  const out = `--- [RANK LOGS] ---\n(launcher error)\n${String(err)}\n--- [GET RANKINGS] ---\n(none)\n`;
  try { fs.writeFileSync('qa_output.txt', out, 'utf8'); } catch {}
  console.log(out);
  process.exit(1);
});
