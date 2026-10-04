// Viewport-only (above the fold) screenshots plus a full-page one, against a
// served URL. Usage: node scripts/_fold.mjs <baseUrl> <outPrefix> [routes] [widths]
import puppeteer from 'puppeteer-core';
const [base, out, routesArg = '/', widthsArg = '1440,390'] = process.argv.slice(2);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new' });
const page = await browser.newPage();
const errs = [];
page.on('pageerror', (e) => errs.push(e.message));
page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
page.on('response', (res) => { if (res.status() >= 400) errs.push(`${res.status()} ${res.url()}`); });
for (const w of widthsArg.split(',').map(Number)) {
  const h = w > 800 ? 900 : 844;
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  for (const r of routesArg.split(',')) {
    await page.goto(base + r, { waitUntil: 'networkidle0', timeout: 60000 });
    await sleep(800);
    const tag = r.replace(/[^a-z0-9]+/gi, '_');
    await page.screenshot({ path: `${out}_fold${tag}_${w}.png` });
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } });
    await page.evaluate(() => Promise.all([...document.images].map((i) => { i.loading = 'eager'; return i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }); })));
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(600);
    const sw = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth, document.body.scrollHeight]);
    await page.screenshot({ path: `${out}_full${tag}_${w}.png`, fullPage: true });
    console.log(r, w, 'scrollWidth/inner/height', sw.join('/'));
  }
}
console.log('errors:', errs.length ? errs : 'none');
await browser.close();
