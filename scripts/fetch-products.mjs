// Parses the Amazon Active Listings report, downloads each product's main
// image from its amazon.in listing, and generates src/data/products.ts.
// Run: node scripts/fetch-products.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
// Merchant listings report, the source of price and MRP. Regenerate before any
// catalogue refresh: `node list-listings.js` in E:/atreya/listing/atreya-aplus
// writes all_listings.tsv in this exact schema, then copy it here with the new
// date. The old July report predated the entire gajra, garland and pooja aasan
// range, so every new product was invisible to this script.
const REPORT = 'E:/atreya/Active+Listings+Report_08-05-2026.txt';
const IMG_DIR = join(ROOT, 'public', 'products');
const OUT = join(ROOT, 'src', 'data', 'products.ts');

// Curated catalog: display name + category per ASIN. Price and MRP come from
// the listings report; copy, specs and images come from catalog-raw.json.
//
// Only BUYABLE listings belong here. A listing that is DISCOVERABLE but not
// BUYABLE still renders a detail page, so linking to it sends a shopper to a
// page with no buy box. Check with:
//   node live-listing-state.js --all   (in E:/atreya/listing/atreya-aplus)
//
// Held out as not buyable on 2026-08-05:
//   B09QJV7VXZ  Golden Jingle Bells (24)  offer paused after cancelled orders
//   B09Y3J9PSQ  Sunflower Heads (20)      no sellable stock set
// Both return to the site automatically once reactivated in Seller Central.
// Older dead listings: B09MNTPWCL, B09TZ32SND, B09MNSR7RT.
const CATALOG = [
  // specOverrides: correct known-wrong attributes in the Amazon listing backend.
  { asin: 'B0GG5BVR7R', shortName: 'Crochet Evil Eye Hanging Charm', category: 'Crochet', specOverrides: { Colour: 'Blue' } },
  { asin: 'B0GDXXM3PR', shortName: 'Mini Crochet Hearts (Set of 12)', category: 'Crochet' },
  { asin: 'B0GC6KJCSC', shortName: 'Mini Crochet Hearts (Set of 6, Multicolor)', category: 'Crochet' },
  { asin: 'B0G95YC1T9', shortName: 'Crochet Heart Ornaments (Set of 12, Red)', category: 'Crochet' },
  { asin: 'B0GDY7RSXY', shortName: 'Crochet Cherry Keychain', category: 'Crochet' },
  { asin: 'B0GDY4D9FN', shortName: 'Crochet Heart Keychain with Flower', category: 'Crochet' },
  { asin: 'B0GDV4HTRJ', shortName: 'Crochet Rose Gajra / Hair Parandi (Pair)', category: 'Crochet' },
  { asin: 'B0GDY833NN', shortName: 'Crochet Popcorn-Stitch Scrunchie', category: 'Crochet' },
  { asin: 'B0B8XR4XNW', shortName: 'Silver Hanging Bells 2.5" (Pack of 48)', category: 'Festive Décor' },
  { asin: 'B0B8XRDHPW', shortName: 'Silver Hanging Bells 2.5" (Pack of 12)', category: 'Festive Décor' },
  { asin: 'B09QJVDNFW', shortName: 'Golden Jingle Bells 2.5" (Pack of 48)', category: 'Festive Décor' },
  { asin: 'B09Y2B4XHL', shortName: 'Jasmine Door Toran (Set of 4)', category: 'Festive Décor' },
  // Garlands and ladis hang like the toran and bells, so they share that shelf.
  { asin: 'B0HC4FD2F4', shortName: 'White Flower Ladi 5 ft (Pack of 4)', category: 'Festive Décor' },
  { asin: 'B0HCCGJKQ4', shortName: 'Red and White Mogra Garland 2.5 ft (Pack of 4)', category: 'Festive Décor' },
  { asin: 'B0HCPKG6HW', shortName: 'Multicolor Pom Pom Garland 5 ft (Pack of 4)', category: 'Festive Décor' },
  { asin: 'B0B8XR4W5P', shortName: 'Silver Hanging Bells 2.5" (Pack of 24)', category: 'Festive Décor' },

  // Worn on the body, so none of the old shelves fitted. "Gajras" is the word
  // an Indian shopper actually types.
  { asin: 'B0HC48P47S', shortName: 'Artificial Jasmine Bun Gajra (Pack of 3)', category: 'Gajras' },
  { asin: 'B0HC479QXR', shortName: 'Yellow Rose and Jasmine Hand Gajra (Pack of 2)', category: 'Gajras' },
  { asin: 'B0HC49L3MP', shortName: 'Red Rose and Pearl Hand Gajra (Single)', category: 'Gajras' },
  { asin: 'B0HC4DHXNK', shortName: 'Red Rose and Pearl Hand Gajra (Pack of 5)', category: 'Gajras' },

  // A devotional seat for an idol or kalash, not decor. Shoppers filtering for
  // puja articles would look under neither Festive nor Home.
  { asin: 'B0HB16BLTK', shortName: 'Lotus Pooja Aasan 24.5 cm (Cream)', category: 'Pooja Essentials' },
  { asin: 'B0HB4N2JSH', shortName: 'Lotus Pooja Aasan 24.5 cm (Rani Pink)', category: 'Pooja Essentials' },

  { asin: 'B0CMDJR8QM', shortName: 'Eternal Love Rose Bouquet (Red)', category: 'Artificial Flowers' },
  { asin: 'B0CMDK5J4T', shortName: 'Eternal Love Rose Bouquet (Pink)', category: 'Artificial Flowers' },
  { asin: 'B0CMDJBYZ4', shortName: 'Eternal Love Rose Bouquet (Yellow)', category: 'Artificial Flowers' },
  // "Artificial" is load bearing in this name: the listing sells loose mogra
  // buds for gajra making and the word must never be dropped from the tile.
  { asin: 'B0HC44WKBT', shortName: 'White Artificial Mogra Flowers (50 g Pack)', category: 'Artificial Flowers' },
  { asin: 'B0GDY75WHT', shortName: 'Wooden Floor Vase with Brass Work', category: 'Home Décor' },
  { asin: 'B09Y29QS4V', shortName: 'White Pearl Beads 6mm (1000 pcs)', category: 'Craft Supplies' },
];

// Product copy, specs and gallery, fetched from SP-API by
// scripts/fetch-catalog-spapi.mjs. Run that first whenever the catalogue changes.
const RAW_PATH = join(ROOT, 'src', 'data', 'catalog-raw.json');
if (!existsSync(RAW_PATH)) {
  console.error('src/data/catalog-raw.json is missing. Run:\n  node scripts/fetch-catalog-spapi.mjs <ASIN>...');
  process.exit(1);
}
const CATALOG_RAW = JSON.parse(readFileSync(RAW_PATH, 'utf8'));

const rows = readFileSync(REPORT, 'utf8').split('\n').filter(Boolean);
const header = rows[0].split('\t');
const col = (name) => header.indexOf(name);
// An ASIN can carry more than one SKU (B09QJVDNFW has an Active one at 529 and
// an Inactive duplicate at 699). Take the ACTIVE row, otherwise the displayed
// price depends on the row order in the report, which is not a guarantee.
const byAsin = new Map();
const iStatus = col('status');
for (const line of rows.slice(1)) {
  const f = line.split('\t');
  const asin = f[col('asin1')];
  if (!asin) continue;
  const active = iStatus >= 0 && (f[iStatus] || '').trim().toLowerCase() === 'active';
  const held = byAsin.get(asin);
  if (!held) byAsin.set(asin, { row: f, active });
  else if (active && !held.active) byAsin.set(asin, { row: f, active });
}
for (const [asin, v] of byAsin) byAsin.set(asin, v.row);

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchRetry(url, opts = {}, tries = 5) {
  for (let i = 1; i <= tries; i++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-IN,en;q=0.9' }, ...opts });
      if (res.ok) return res;
      throw new Error(`HTTP ${res.status}`);
    } catch (e) {
      if (i === tries) throw e;
      await sleep(2000 * i);
    }
  }
}

// House style: no em/en dashes anywhere in site copy.
const stripDashes = (s) => s.replace(/\s*[—–]\s*/g, ' - ');

const decode = (s) =>
  stripDashes(
    s
      .replace(/<[^>]+>/g, ' ')
      .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
      .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
      .replace(/[‎‏​]/g, ''),
  )
    .replace(/\s+/g, ' ')
    .trim();

// Spec labels worth showing on a product page, in display order.
const SPEC_LABELS = [
  'Material', 'Colour', 'Color', 'Product Dimensions', 'Item Weight', 'Net Quantity',
  'Number of Pieces', 'Included Components', 'Special Feature', 'Special Features',
  'Care Instructions', 'Occasion', 'Theme', 'Shape', 'Style', 'Pattern', 'Finish Type',
  'Mounting Type', 'Room Type', 'Country of Origin',
];

function parseSpecs(html) {
  const found = new Map();
  const add = (label, value) => {
    label = decode(label).replace(/[:‎‏]+$/, '').trim();
    value = decode(value);
    const canon = SPEC_LABELS.find((l) => l.toLowerCase() === label.toLowerCase());
    if (canon && value && !found.has(canon)) found.set(canon, value);
  };
  // Pattern 1: tech-spec / additional-info tables (th/td rows)
  for (const m of html.matchAll(/<th[^>]*class="[^"]*prodDetSectionEntry[^"]*"[^>]*>([\s\S]*?)<\/th>\s*<td[^>]*>([\s\S]*?)<\/td>/g)) {
    add(m[1], m[2]);
  }
  // Pattern 2: detail bullets ("<span class=a-text-bold>Label :</span><span>value</span>")
  for (const m of html.matchAll(/<span class="a-text-bold">([\s\S]*?)<\/span>\s*<span>([\s\S]*?)<\/span>/g)) {
    add(m[1], m[2]);
  }
  // Merge Colour/Color
  if (found.has('Color') && !found.has('Colour')) found.set('Colour', found.get('Color'));
  found.delete('Color');
  return SPEC_LABELS.filter((l) => l !== 'Color' && found.has(l)).map((label) => ({ label, value: found.get(label) }));
}

function parseBullets(html) {
  const section = html.match(/id="feature-bullets"[\s\S]*?<\/ul>/);
  if (!section) return [];
  return [...section[0].matchAll(/<span class="a-list-item">([\s\S]*?)<\/span>/g)]
    .map((m) => decode(m[1]))
    .filter((t) => t.length > 3 && !/^make sure this fits/i.test(t))
    .slice(0, 6);
}

async function scrapeListing(asin) {
  const res = await fetchRetry(`https://www.amazon.in/dp/${asin}`);
  const html = await res.text();
  const gallery = [...new Set(
    [...html.matchAll(/"hiRes":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/g)].map((m) => m[1]),
  )];
  if (!gallery.length) {
    const large = html.match(/"large":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/);
    if (large) gallery.push(large[1]);
    const landing = html.match(/id="landingImage"[^>]*src="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/);
    if (!gallery.length && landing) gallery.push(landing[1]);
  }
  return { gallery: gallery.slice(0, 5), specs: parseSpecs(html), bullets: parseBullets(html) };
}

async function downloadImage(url, path) {
  const sized = url.replace(/\._[^.]*_\.jpg/, '._SL800_.jpg');
  const img = await fetchRetry(sized);
  writeFileSync(path, Buffer.from(await img.arrayBuffer()));
}

mkdirSync(IMG_DIR, { recursive: true });
const products = [];
for (const item of CATALOG) {
  const f = byAsin.get(item.asin);
  if (!f) { console.error(`MISSING in report: ${item.asin}`); continue; }
  const price = Math.round(parseFloat(f[col('price')]));
  const mrp = Math.round(parseFloat(f[col('maximum-retail-price')])) || null;
  const desc = stripDashes(f[col('item-description')] || '').replace(/\s+/g, ' ').trim();

  // Specs, bullets, gallery and the long description now come from SP-API via
  // scripts/fetch-catalog-spapi.mjs, not from scraping amazon.in. Amazon serves
  // a bot interstitial after a modest number of detail-page requests, and the
  // scraper degraded silently to zero specs and zero images when it hit one.
  const raw = CATALOG_RAW[item.asin];
  if (!raw) {
    console.error(`MISSING in catalog-raw.json: ${item.asin}. Run fetch-catalog-spapi.mjs first.`);
    continue;
  }
  const specs = raw.specs.map((s) => ({ ...s }));
  const bullets = raw.bullets;
  const images = raw.images.filter((rel) => existsSync(join(ROOT, 'public', rel.replace(/^\//, ''))));

  for (const [label, value] of Object.entries(item.specOverrides ?? {})) {
    const row = specs.find((s) => s.label === label);
    if (row) row.value = value;
    else specs.push({ label, value });
  }
  if (images.length !== raw.images.length) {
    console.error(`  ${item.asin}: ${raw.images.length - images.length} image file(s) missing on disk`);
  }
  console.log(`OK  ${item.asin} ${item.shortName} | ${images.length} imgs, ${specs.length} specs, ${bullets.length} bullets`);

  products.push({
    asin: item.asin,
    name: item.shortName,
    fullName: raw.fullName || stripDashes(f[col('item-name')] || '').replace(/\s+/g, ' ').trim(),
    description: raw.description || desc,
    category: item.category,
    price,
    mrp: mrp && mrp > price ? mrp : null,
    image: images[0] ?? null,
    images,
    specs,
    bullets,
    amazonUrl: `https://www.amazon.in/dp/${item.asin}`,
  });
}

const ts = `// Generated by scripts/fetch-products.mjs. Do not edit by hand.
export interface Product {
  asin: string;
  name: string;
  fullName: string;
  description: string;
  category: string;
  price: number;
  mrp: number | null;
  image: string | null;
  images: string[];
  specs: { label: string; value: string }[];
  bullets: string[];
  amazonUrl: string;
}

export const CATEGORIES = ${JSON.stringify([...new Set(products.map((p) => p.category))])} as const;

export const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};
`;
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, ts);
console.log(`\nWrote ${products.length} products → src/data/products.ts`);
console.log(`Images: ${products.filter((p) => p.image).length}/${products.length}`);

// The sitemap used to be hand maintained in public/, so it silently fell out of
// step with the catalogue: it still listed two delisted products and none of the
// eleven new ones. Generate it here instead, from the same array the site renders.
const SITE = 'https://atreya.store';
// Collection slugs come from src/data/collections.ts so the sitemap cannot drift
// from the routes. Parsed rather than imported because this is a plain .mjs
// script and collections.ts is TypeScript.
const collectionsTs = readFileSync(join(ROOT, 'src', 'data', 'collections.ts'), 'utf8');
const slugs = [...collectionsTs.matchAll(/^\s*slug: '([a-z0-9-]+)',$/gm)].map((m) => m[1]);
if (!slugs.length) console.error('WARNING: no collection slugs parsed, sitemap will miss them');
const urls = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/shop', changefreq: 'weekly', priority: '0.9' },
  ...slugs.map((s) => ({ loc: `/collections/${s}`, changefreq: 'weekly', priority: '0.9' })),
  { loc: '/about', changefreq: 'monthly', priority: '0.6' },
  { loc: '/contact', changefreq: 'monthly', priority: '0.6' },
  { loc: '/shipping-returns', changefreq: 'monthly', priority: '0.5' },
  { loc: '/privacy', changefreq: 'yearly', priority: '0.3' },
  ...products.map((p) => ({ loc: `/product/${p.asin}`, changefreq: 'weekly', priority: '0.8' })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE}${u.loc}</loc><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`;
writeFileSync(join(ROOT, 'public', 'sitemap.xml'), sitemap);
console.log(`Sitemap: ${urls.length} URLs → public/sitemap.xml`);
