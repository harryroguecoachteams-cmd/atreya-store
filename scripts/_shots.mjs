import { spawn, execSync } from 'node:child_process';
import puppeteer from 'puppeteer-core';
const OUT = 'C:/Users/hp/AppData/Local/Temp/claude/C--Users-hp/7ef905cf-9e37-4cf7-8454-462b5da75f63/scratchpad/';
const PORT = 4180;
const routes = (process.argv[2] || '/').split(',');
const widths = (process.argv[3] || '1440,390').split(',').map(Number);
const server = spawn('npx.cmd', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { cwd: 'E:/atreya/atreya-store', stdio: 'ignore', shell: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
try {
  for (let i = 0; i < 30; i++) { try { if ((await fetch(`http://localhost:${PORT}/`)).ok) break; } catch {} await sleep(1000); }
  const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new' });
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  page.on('response', (res) => { if (res.status() >= 400) errs.push(`${res.status()} ${res.url()}`); });
  for (const w of widths) {
    await page.setViewport({ width: w, height: w > 800 ? 900 : 844, deviceScaleFactor: 1 });
    for (const r of routes) {
      await page.goto(`http://localhost:${PORT}${r}`, { waitUntil: 'networkidle0', timeout: 60000 });
      // trigger lazy images
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 150)); } });
      await page.evaluate(() => Promise.all([...document.images].map((i) => { i.loading = 'eager'; return i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }); })));
      await page.evaluate(() => window.scrollTo(0, 0));
      await sleep(1000);
      const broken = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src));
      if (broken.length) console.log('BROKEN', r, broken);
      const sw = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
      const name = `${OUT}shot_${r.replace(/[^a-z0-9]+/gi, '_')}_${w}.png`;
      await page.screenshot({ path: name, fullPage: true });
      console.log(name, 'scrollWidth', sw.join('/'));
    }
  }
  console.log('errors:', errs.length ? errs : 'none');
  await browser.close();
} finally { try { execSync(`taskkill /F /T /PID ${server.pid}`, { stdio: 'ignore' }); } catch {} }
