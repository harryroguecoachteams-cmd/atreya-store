// Parses the Amazon Active Listings report, downloads each product's main
// image from its amazon.in listing, and generates src/data/products.ts.
// Run: node scripts/fetch-products.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REPORT = 'E:/atreya/Active+Listings+Report_07-10-2026.txt';
const IMG_DIR = join(ROOT, 'public', 'products');
const OUT = join(ROOT, 'src', 'data', 'products.ts');

// Curated catalog: display name + category per ASIN. Everything else
// (price, MRP, description) comes from the listings report.
// Dead qty-0 listings (B09MNTPWCL, B09TZ32SND, B09MNSR7RT) are omitted.
const CATALOG = [
  // specOverrides: correct known-wrong attributes in the Amazon listing backend.
  { asin: 'B0GG5BVR7R', shortName: 'Crochet Evil Eye Hanging Charm', category: 'Crochet', specOverrides: { Colour: 'Blue' } },
  { asin: 'B0GDXXM3PR', shortName: 'Mini Crochet Hearts — Set of 12', category: 'Crochet' },
  { asin: 'B0GC6KJCSC', shortName: 'Mini Crochet Hearts — Set of 6 (Multicolor)', category: 'Crochet' },
  { asin: 'B0G95YC1T9', shortName: 'Crochet Heart Ornaments — Set of 12 (Red)', category: 'Crochet' },
  { asin: 'B0GDY7RSXY', shortName: 'Crochet Cherry Keychain', category: 'Crochet' },
  { asin: 'B0GDY4D9FN', shortName: 'Crochet Heart Keychain with Flower', category: 'Crochet' },
  { asin: 'B0GDV4HTRJ', shortName: 'Crochet Rose Gajra / Hair Parandi (Pair)', category: 'Crochet' },
  { asin: 'B0GDY833NN', shortName: 'Crochet Popcorn-Stitch Scrunchie', category: 'Crochet' },
  { asin: 'B0B8XR4XNW', shortName: 'Silver Hanging Bells — 2.5" (Pack of 48)', category: 'Festive Décor' },
  { asin: 'B0B8XRDHPW', shortName: 'Silver Hanging Bells — 2.5" (Pack of 12)', category: 'Festive Décor' },
  { asin: 'B09QJVDNFW', shortName: 'Golden Jingle Bells — 2.5" (Pack of 48)', category: 'Festive Décor' },
  { asin: 'B09QJV7VXZ', shortName: 'Golden Jingle Bells — 2.5" (Pack of 24)', category: 'Festive Décor' },
  { asin: 'B09Y2B4XHL', shortName: 'Jasmine Door Toran — Set of 4', category: 'Festive Décor' },
  { asin: 'B0CMDJR8QM', shortName: 'Eternal Love Rose Bouquet (Red)', category: 'Artificial Flowers' },
  { asin: 'B0CMDK5J4T', shortName: 'Eternal Love Rose Bouquet (Pink)', category: 'Artificial Flowers' },
  { asin: 'B0CMDJBYZ4', shortName: 'Eternal Love Rose Bouquet (Yellow)', category: 'Artificial Flowers' },
  { asin: 'B09Y3J9PSQ', shortName: 'Sunflower Heads — Pack of 20', category: 'Artificial Flowers' },
  { asin: 'B0GDY75WHT', shortName: 'Wooden Floor Vase with Brass Work', category: 'Home Décor' },
  { asin: 'B09Y29QS4V', shortName: 'White Pearl Beads 6mm — 1000 pcs', category: 'Craft Supplies' },
];

const rows = readFileSync(REPORT, 'utf8').split('\n').filter(Boolean);
const header = rows[0].split('\t');
const col = (name) => header.indexOf(name);
const byAsin = new Map();
for (const line of rows.slice(1)) {
  const f = line.split('\t');
  const asin = f[col('asin1')];
  if (asin && !byAsin.has(asin)) byAsin.set(asin, f);
}

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

const decode = (s) =>
  s
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
    .replace(/[‎‏​]/g, '')
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
  const desc = (f[col('item-description')] || '').replace(/\s+/g, ' ').trim();

  let specs = [];
  let bullets = [];
  const images = [];
  try {
    const listing = await scrapeListing(item.asin);
    specs = listing.specs;
    bullets = listing.bullets;
    for (const [label, value] of Object.entries(item.specOverrides ?? {})) {
      const row = specs.find((s) => s.label === label);
      if (row) row.value = value;
      else specs.push({ label, value });
    }
    for (let i = 0; i < listing.gallery.length; i++) {
      const file = i === 0 ? `${item.asin}.jpg` : `${item.asin}_${i + 1}.jpg`;
      const imgPath = join(IMG_DIR, file);
      if (!existsSync(imgPath)) {
        try {
          await downloadImage(listing.gallery[i], imgPath);
        } catch (e) {
          console.error(`img FAIL ${item.asin} #${i + 1}: ${e.message}`);
          continue;
        }
      }
      images.push(`/products/${file}`);
    }
    console.log(`OK  ${item.asin} ${item.shortName} — ${images.length} imgs, ${specs.length} specs, ${bullets.length} bullets`);
    await sleep(1500);
  } catch (e) {
    console.error(`PAGE FAIL ${item.asin}: ${e.message}`);
    const mainPath = join(IMG_DIR, `${item.asin}.jpg`);
    if (existsSync(mainPath)) images.push(`/products/${item.asin}.jpg`);
  }

  products.push({
    asin: item.asin,
    name: item.shortName,
    fullName: (f[col('item-name')] || '').trim(),
    description: desc,
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

const ts = `// Generated by scripts/fetch-products.mjs — do not edit by hand.
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
