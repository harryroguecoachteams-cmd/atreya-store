// Prerenders every route of the built site (dist/) into static HTML snapshots
// so search engines and social crawlers get real content without running JS.
// Run AFTER `npm run build`: node scripts/prerender.mjs
import { spawn, execSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const PORT = 4174;
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

// Route → output file (relative to dist/). '/' overwrites the SPA shell.
const productsTs = readFileSync(join(ROOT, 'src', 'data', 'products.ts'), 'utf8');
const asins = [...productsTs.matchAll(/"asin": "([A-Z0-9]{10})"/g)].map((m) => m[1]);
const ROUTES = [
  ['/', 'index.html'],
  ['/shop', 'shop.html'],
  ['/about', 'about.html'],
  ['/contact', 'contact.html'],
  ['/privacy', 'privacy.html'],
  ['/this-page-does-not-exist', '404.html'],
  ...asins.map((a) => [`/product/${a}`, `product/${a}.html`]),
];

const server = spawn('npx.cmd', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
  cwd: ROOT,
  stdio: 'ignore',
  shell: true,
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function waitForServer() {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://localhost:${PORT}/`);
      if (res.ok) return;
    } catch { /* not up yet */ }
    await sleep(1000);
  }
  throw new Error('vite preview did not start');
}

try {
  await waitForServer();
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  const page = await browser.newPage();
  for (const [route, out] of ROUTES) {
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
    const html = await page.content();
    const file = join(DIST, out);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    console.log(`prerendered ${route} → ${out} (${Math.round(html.length / 1024)} KB)`);
  }
  await browser.close();
} finally {
  try { execSync(`taskkill /F /T /PID ${server.pid}`, { stdio: 'ignore' }); } catch { /* already gone */ }
}
console.log(`\nDone: ${ROUTES.length} routes prerendered.`);
