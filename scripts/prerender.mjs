// Prerenders every route of the built site (dist/) into static HTML snapshots
// so search engines and social crawlers get real content without running JS.
// Run AFTER `npm run build`: node scripts/prerender.mjs
import { spawn, execSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
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
const collectionsTs = readFileSync(join(ROOT, 'src', 'data', 'collections.ts'), 'utf8');
const slugs = [...collectionsTs.matchAll(/^\s*slug: '([a-z0-9-]+)',$/gm)].map((m) => m[1]);
if (!slugs.length) throw new Error('no collection slugs parsed from collections.ts');
// '/' goes LAST: its snapshot overwrites dist/index.html, which is also the SPA
// shell vite preview serves for every other route. Rendered first, every later
// snapshot was built on top of the home page's markup and inherited its stamp.
const ROUTES = [
  ['/shop', 'shop.html'],
  ['/diwali-gifting', 'diwali-gifting.html'],
  ...slugs.map((s) => [`/collections/${s}`, `collections/${s}.html`]),
  ['/about', 'about.html'],
  ['/contact', 'contact.html'],
  ['/shipping-returns', 'shipping-returns.html'],
  ['/privacy', 'privacy.html'],
  ['/this-page-does-not-exist', '404.html'],
  ...asins.map((a) => [`/product/${a}`, `product/${a}.html`]),
  ['/', 'index.html'],
];

// Preload the two latin font files the first screen needs. The home page LCP
// element is the hero h1, set in Cormorant, so without this the browser finds
// the font only after parsing the CSS and the headline paints late (Lighthouse
// mobile, 2026-10-03: LCP 3.2 s on the h1). Names are content hashed per build,
// so they are looked up in dist/assets rather than hard coded.
const FONT_FILES = readdirSync(join(DIST, 'assets')).filter((f) =>
  /^(cormorant-garamond-latin-wght-normal|jost-latin-wght-normal)-.*\.woff2$/.test(f));
if (FONT_FILES.length !== 2) throw new Error(`expected 2 latin font files in dist/assets, found ${FONT_FILES.length}`);
const PRELOADS = FONT_FILES.map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`).join('');

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
    // React renders "{count} pieces" as two adjacent text nodes. Serialising
    // the DOM merges them into one, and hydrateRoot then reports a text
    // mismatch (error #418) and throws the whole page away. React's own server
    // renderer separates adjacent text with an empty comment, which hydration
    // skips over; do the same here before the snapshot is taken.
    await page.evaluate(() => {
      const walk = (el) => {
        for (const n of [...el.childNodes]) {
          if (n.nodeType === Node.TEXT_NODE && n.nextSibling?.nodeType === Node.TEXT_NODE) n.after(document.createComment(' '));
          else if (n.nodeType === Node.ELEMENT_NODE) walk(n);
        }
      };
      walk(document.getElementById('root'));
    });
    let html = await page.content();
    // The stamp tells main.tsx this markup belongs to this path, so it can
    // hydrate it rather than re-render from scratch.
    html = html
      .replace(/<meta name="x-prerendered"[^>]*>/g, '')
      .replace(/<link rel="preload"[^>]*as="font"[^>]*>/g, '')
      .replace('</head>', `${PRELOADS}<meta name="x-prerendered" content="${route}"></head>`);
    if (out === '404.html') {
      // The probe URL is meaningless as a canonical; a 404 should not carry one.
      html = html.replace(/<link rel="canonical"[^>]*>/, '').replace(/<meta property="og:url"[^>]*>/, '');
    }
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
