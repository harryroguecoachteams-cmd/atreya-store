// Rewrites dist/sitemap.xml with honest <lastmod> dates and image entries.
// Run AFTER prerender: node scripts/sitemap.mjs
//
// Why lastmod and not changefreq/priority: Google ignores changefreq and
// priority outright and has said so publicly. It does use lastmod, but only
// while it stays honest. Stamping every page with the build date on every
// deploy teaches Google the field is noise and it stops being read at all.
//
// So the date comes from the CONTENT, not the clock: each prerendered page is
// hashed, the hash is compared against sitemap-state.json, and lastmod only
// moves when the hash actually changed. A deploy that touches one product page
// bumps exactly one date.
//
// The hash is taken after stripping the two things that change on every build
// without any content changing:
//   * hashed asset filenames (index-A1b2C3.js differs each build)
//   * priceValidUntil in the Product schema (today + 1 year, so it moves daily)
// Without those strips every page would look modified on every single deploy,
// which is precisely the dishonest signal this is meant to avoid.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const STATE_PATH = join(ROOT, 'sitemap-state.json');
const SITE = 'https://atreya.store';

// Read the URL list from public/, write the finished sitemap to dist/. Reading
// dist/ would mean consuming this script's own output, and the second run would
// parse the rewritten format and find nothing.
const SOURCE = join(ROOT, 'public', 'sitemap.xml');
const OUT = join(DIST, 'sitemap.xml');
if (!existsSync(SOURCE)) {
  console.error('public/sitemap.xml missing. Run node scripts/fetch-products.mjs first.');
  process.exit(1);
}
if (!existsSync(DIST)) {
  console.error('dist/ missing. Run npm run build and node scripts/prerender.mjs first.');
  process.exit(1);
}

// The base sitemap from fetch-products.mjs is the source of the URL list, so
// this script can never invent or drop a URL. Parsed per <url> block rather
// than as one fixed line, so a formatting change upstream does not silently
// yield zero URLs.
const entries = [...readFileSync(SOURCE, 'utf8').matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
  loc: m[1].match(/<loc>([^<]+)<\/loc>/)?.[1],
  changefreq: m[1].match(/<changefreq>([^<]+)<\/changefreq>/)?.[1] ?? 'weekly',
  priority: m[1].match(/<priority>([^<]+)<\/priority>/)?.[1] ?? '0.5',
})).filter((e) => e.loc);
if (!entries.length) {
  console.error('parsed 0 URLs out of public/sitemap.xml, refusing to write an empty sitemap');
  process.exit(1);
}

/** Prerendered snapshot for a URL: / is index.html, /shop is shop.html. */
const snapshotFor = (loc) => {
  const path = loc.replace(SITE, '');
  return join(DIST, path === '/' ? 'index.html' : `${path.replace(/^\//, '')}.html`);
};

const normalise = (html) =>
  html
    .replace(/-[A-Za-z0-9_-]{8}\.(js|css)/g, '.$1')
    .replace(/"priceValidUntil":"\d{4}-\d{2}-\d{2}"/g, '"priceValidUntil":""');

const state = existsSync(STATE_PATH) ? JSON.parse(readFileSync(STATE_PATH, 'utf8')) : {};
const today = new Date().toISOString().slice(0, 10);
const next = {};
let changed = 0;
let missing = 0;

const xml = ['<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">'];

for (const e of entries) {
  const file = snapshotFor(e.loc);
  if (!existsSync(file)) {
    // A sitemap URL with no snapshot is a bug worth shouting about, not one to
    // paper over with today's date.
    console.error(`  NO SNAPSHOT for ${e.loc} (${file})`);
    missing++;
    continue;
  }
  const html = readFileSync(file, 'utf8');
  const hash = createHash('sha256').update(normalise(html)).digest('hex').slice(0, 16);
  const prior = state[e.loc];
  const lastmod = prior && prior.hash === hash ? prior.lastmod : today;
  if (!prior || prior.hash !== hash) changed++;
  next[e.loc] = { hash, lastmod };

  // Google supports exactly one image tag now: <image:loc>. image:title,
  // image:caption, image:geo_location and image:license were all deprecated in
  // 2022 and are ignored, so emitting them would be decoration. The alt text on
  // the page is what actually describes the image to Google.
  //
  // Only a product page claims its own photos. Every grid on the site renders
  // the same product thumbnails, so listing what a page merely displays would
  // claim one photo for six pages and leave Google to guess which one to send
  // image traffic to. A photo's landing page should be the page that sells it.
  const asin = e.loc.match(/\/product\/([A-Z0-9]{10})$/)?.[1];
  const images = asin
    ? [...new Set([...html.matchAll(/"(\/products\/[A-Za-z0-9_]+\.jpg)"/g)].map((m) => m[1]))]
        .filter((src) => src.startsWith(`/products/${asin}`))
    : [];
  xml.push(`  <url>`);
  xml.push(`    <loc>${e.loc}</loc>`);
  xml.push(`    <lastmod>${lastmod}</lastmod>`);
  xml.push(`    <changefreq>${e.changefreq}</changefreq>`);
  xml.push(`    <priority>${e.priority}</priority>`);
  for (const img of images) xml.push(`    <image:image><image:loc>${SITE}${img}</image:loc></image:image>`);
  xml.push(`  </url>`);
}
xml.push('</urlset>', '');

if (missing) {
  console.error(`\n${missing} sitemap URL(s) have no prerendered snapshot. Fix that before deploying.`);
  process.exit(1);
}

writeFileSync(OUT, xml.join('\n'));
writeFileSync(STATE_PATH, `${JSON.stringify(next, null, 2)}\n`);

const imageCount = xml.filter((l) => l.includes('<image:loc>')).length;
console.log(`Sitemap: ${entries.length} URLs, ${imageCount} images, ${changed} with a new lastmod (${today})`);
console.log(`State: sitemap-state.json (commit it, or every deploy re-dates the whole site)`);
