// Click-through test of client-side navigation on a served build.
// Direct loads alone once missed a bug that blanked the page on every in-app
// click, so this drives the SPA the way a shopper does.
// Usage: node scripts/_clickthrough.mjs [baseUrl]   (default: local vite preview)
import { spawn, execSync } from 'node:child_process';
import puppeteer from 'puppeteer-core';

const base = process.argv[2];
const PORT = 4181;
const server = base ? null : spawn('npx.cmd', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { cwd: 'E:/atreya/atreya-store', stdio: 'ignore', shell: true });
const BASE = base || `http://localhost:${PORT}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const steps = [];
try {
  if (!base) for (let i = 0; i < 30; i++) { try { if ((await fetch(BASE)).ok) break; } catch {} await sleep(1000); }
  const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new' });
  for (const width of [1440, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900 });
    const errs = [];
    page.on('pageerror', (e) => errs.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });

    const state = async (label) => {
      await sleep(700);
      const s = await page.evaluate(() => ({
        path: location.pathname + location.search,
        h1: document.querySelector('h1')?.textContent?.trim().slice(0, 60) ?? null,
        textLen: document.querySelector('main')?.innerText.length ?? 0,
      }));
      const ok = Boolean(s.h1) && s.textLen > 200;
      steps.push(`${width} ${ok ? 'OK  ' : 'FAIL'} ${label.padEnd(26)} ${s.path}  h1="${s.h1}"`);
      return ok;
    };
    const click = async (selector) => {
      await page.waitForSelector(selector, { visible: true, timeout: 10000 });
      await page.click(selector);
    };

    // Direct loads first: each one hydrates a prerendered snapshot, and React
    // logs a console error if the snapshot and the client render disagree.
    for (const path of ['/product/B0HF4PXH7S', '/collections/gajras', '/diwali-gifting', '/shop', '/about']) {
      await page.goto(BASE + path, { waitUntil: 'networkidle0' });
      await state(`direct ${path}`.slice(0, 26));
    }
    await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
    await state('home (direct load)');
    await click('a.btn-solid[href="/shop"]');
    await state('-> shop (hero button)');
    if (width > 1000) await click('header nav a[href="/collections/door-hangings"]');
    else { await click('button[aria-label="Open menu"]'); await click('header nav:last-of-type a[href="/collections/door-hangings"]'); }
    await state('-> door hangings (nav)');
    await click('#pieces article h3 a');
    await state('-> product (card)');
    await click('nav[aria-label="Breadcrumb"] a[href^="/collections/"]');
    await state('-> collection (breadcrumb)');
    await page.goBack();
    await state('back -> product');
    await click('a[aria-label="Atreya, home"]');
    await state('-> home (wordmark)');
    // Bestsellers tabs: a client-side filter on the hydrated home page.
    await page.evaluate(() => [...document.querySelectorAll('#popular button')].find((b) => b.textContent === 'Gajras').click());
    await sleep(300);
    const tabOk = await page.evaluate(() => {
      const cats = [...document.querySelectorAll('#popular article p.text-gold')].map((p) => p.textContent);
      return cats.length > 0 && cats.every((c) => c === 'Gajras');
    });
    steps.push(`${width} ${tabOk ? 'OK  ' : 'FAIL'} bestsellers tab Gajras`);
    await click('main ul li a[href="/collections/pooja-essentials"]');
    await state('-> pooja (category circle)');
    await click('footer a[href="/diwali-gifting"]');
    await state('-> diwali (footer)');
    await click('footer a[href="/about"]');
    await state('-> about');
    steps.push(`${width} console/page errors: ${errs.length ? errs.join(' | ') : 'none'}`);
    await page.close();
  }
  await browser.close();
} finally {
  if (server) try { execSync(`taskkill /F /T /PID ${server.pid}`, { stdio: 'ignore' }); } catch {}
}
console.log(steps.join('\n'));
if (steps.some((s) => s.includes('FAIL'))) process.exit(1);
