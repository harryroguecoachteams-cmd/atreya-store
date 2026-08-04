// Pulls product data for the site straight from Amazon's SP-API instead of
// scraping amazon.in.
//
// Why: the old scraper reads the public detail page, and Amazon now serves a
// "Click the button below to continue shopping" bot interstitial after a modest
// number of requests, which yields zero images, zero specs and zero bullets
// without failing loudly. SP-API is our own listing data, needs no scraping,
// and cannot be rate-limited into silently returning nothing.
//
// Writes: public/products/<asin>.jpg (+ _2.._5) and a JSON blob this repo's
// generator consumes.
//
// Run: node scripts/fetch-catalog-spapi.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const APLUS = 'E:/atreya/listing/atreya-aplus';
const IMG_DIR = join(ROOT, 'public', 'products');
const OUT = join(ROOT, 'src', 'data', 'catalog-raw.json');

process.chdir(APLUS);                       // so dotenv + ./src/auth resolve
const { config } = await import(`file://${APLUS}/node_modules/dotenv/lib/main.js`);
config();
const { getAccessToken, spClient } = await import(`file://${APLUS}/src/auth.js`);

const MP = process.env.MARKETPLACE_ID;
const SELLER = process.env.SELLER_ID || 'A2YEFZP86DTGZC';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// House style: no em or en dashes anywhere in site copy.
const clean = (s) =>
  String(s ?? '')
    .replace(/\s*[—–]\s*/g, ' - ')
    .replace(/[‎‏​]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const val = (attr, key) => {
  const a = attr?.[key];
  if (!Array.isArray(a) || !a.length) return null;
  return a[0].value ?? null;
};

function dimensions(attr) {
  const d = attr?.item_dimensions?.[0] ?? attr?.item_display_dimensions?.[0];
  if (!d) return null;
  const bit = (k) => (d[k]?.value != null ? `${d[k].value}` : null);
  const unit = d.length?.unit || d.width?.unit || 'centimeters';
  const parts = [bit('length'), bit('width'), bit('height')].filter(Boolean);
  if (!parts.length) return null;
  const short = unit.startsWith('cent') ? 'cm' : unit;
  return `${parts.join(' x ')} ${short}`;
}

function weight(attr) {
  const w = attr?.item_weight?.[0];
  if (!w?.value) return null;
  const u = w.unit === 'grams' ? 'g' : w.unit;
  return `${w.value} ${u}`;
}

// Only the specs worth showing on a product page, in display order.
function specsFrom(attr) {
  const out = [];
  const push = (label, value) => { if (value) out.push({ label, value: clean(value) }); };
  push('Material', val(attr, 'material') || val(attr, 'fabric_type'));
  push('Colour', val(attr, 'color'));
  push('Product Dimensions', dimensions(attr));
  push('Item Weight', weight(attr));
  push('Number of Items', val(attr, 'number_of_items'));
  push('Included Components', val(attr, 'included_components'));
  push('Style', val(attr, 'style'));
  push('Pattern', val(attr, 'pattern'));
  push('Theme', val(attr, 'theme'));
  push('Occasion', val(attr, 'occasion_type'));
  push('Country of Origin', val(attr, 'country_of_origin') === 'IN' ? 'India' : val(attr, 'country_of_origin'));
  return out;
}

async function download(url, path) {
  // SP-API hands back the raw CDN url; ask for a sensible display size.
  const sized = url.replace(/\.(jpg|png)$/i, '._SL800_.$1');
  for (let i = 1; i <= 4; i++) {
    try {
      const res = await fetch(sized);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      writeFileSync(path, Buffer.from(await res.arrayBuffer()));
      return true;
    } catch (e) {
      if (i === 4) { console.log(`      image failed: ${e.message}`); return false; }
      await sleep(1200 * i);
    }
  }
}

const asins = process.argv.slice(2);
if (!asins.length) {
  console.error('usage: node scripts/fetch-catalog-spapi.mjs <ASIN> [<ASIN> ...]');
  process.exit(1);
}

mkdirSync(IMG_DIR, { recursive: true });
const sp = spClient(await getAccessToken());
const existing = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {};

for (const asin of asins) {
  process.stdout.write(`${asin} `);
  try {
    const r = await sp.get(`/catalog/2022-04-01/items/${asin}`, {
      params: { marketplaceIds: MP, includedData: 'images,attributes,summaries' },
    });
    const attr = r.data.attributes || {};
    const block = (r.data.images || []).find((i) => i.marketplaceId === MP) || (r.data.images || [])[0];

    // Largest render of each variant, MAIN first, then PT01.. in order.
    const best = new Map();
    for (const img of block?.images || []) {
      const v = img.variant || 'MAIN';
      const cur = best.get(v);
      if (!cur || img.width * img.height > cur.width * cur.height) best.set(v, img);
    }
    const order = [...best.keys()].sort((a, b) => (a === 'MAIN' ? -1 : b === 'MAIN' ? 1 : a.localeCompare(b)));

    const files = [];
    for (const [i, v] of order.slice(0, 5).entries()) {
      const name = i === 0 ? `${asin}.jpg` : `${asin}_${i + 1}.jpg`;
      if (await download(best.get(v).link, join(IMG_DIR, name))) files.push(`/products/${name}`);
    }

    existing[asin] = {
      asin,
      fullName: clean(val(attr, 'item_name')),
      description: clean(val(attr, 'product_description')),
      bullets: (attr.bullet_point || []).map((b) => clean(b.value)).filter(Boolean).slice(0, 6),
      specs: specsFrom(attr),
      images: files,
      image: files[0] ?? null,
    };
    console.log(`ok  ${files.length} img  ${existing[asin].bullets.length} bullets  ${existing[asin].specs.length} specs`);
  } catch (e) {
    console.log(`FAILED ${e.response ? JSON.stringify(e.response.data).slice(0, 140) : e.message}`);
  }
  await sleep(400);
}

// Re-read immediately before writing and merge, so two runs against different
// ASIN sets cannot clobber each other. Running the whole catalogue as two
// parallel invocations otherwise silently drops whichever finished first.
const onDisk = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {};
const merged = { ...onDisk, ...existing };
writeFileSync(OUT, JSON.stringify(merged, null, 1));
console.log(`\nwrote ${OUT} (${Object.keys(merged).length} products)`);
