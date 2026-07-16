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
  { asin: 'B0GG5BVR7R', shortName: 'Crochet Evil Eye Hanging Charm', category: 'Crochet' },
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

async function imageUrlFor(asin) {
  const res = await fetchRetry(`https://www.amazon.in/dp/${asin}`);
  const html = await res.text();
  const hiRes = html.match(/"hiRes":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/);
  if (hiRes) return hiRes[1];
  const large = html.match(/"large":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/);
  if (large) return large[1];
  const landing = html.match(/id="landingImage"[^>]*src="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/);
  return landing ? landing[1] : null;
}

mkdirSync(IMG_DIR, { recursive: true });
const products = [];
for (const item of CATALOG) {
  const f = byAsin.get(item.asin);
  if (!f) { console.error(`MISSING in report: ${item.asin}`); continue; }
  const price = Math.round(parseFloat(f[col('price')]));
  const mrp = Math.round(parseFloat(f[col('maximum-retail-price')])) || null;
  const desc = (f[col('item-description')] || '').replace(/\s+/g, ' ').trim();
  const imgPath = join(IMG_DIR, `${item.asin}.jpg`);

  if (!existsSync(imgPath)) {
    try {
      const url = await imageUrlFor(item.asin);
      if (url) {
        // Cap at 800px for the web; media-amazon supports size suffixes.
        const sized = url.replace(/\._[^.]*_\.jpg/, '._SL800_.jpg');
        const img = await fetchRetry(sized);
        writeFileSync(imgPath, Buffer.from(await img.arrayBuffer()));
        console.log(`img OK  ${item.asin} ${item.shortName}`);
      } else {
        console.error(`img MISS ${item.asin} — no image found in page`);
      }
      await sleep(1500);
    } catch (e) {
      console.error(`img FAIL ${item.asin}: ${e.message}`);
    }
  } else {
    console.log(`img cached ${item.asin}`);
  }

  products.push({
    asin: item.asin,
    name: item.shortName,
    fullName: (f[col('item-name')] || '').trim(),
    description: desc,
    category: item.category,
    price,
    mrp: mrp && mrp > price ? mrp : null,
    image: existsSync(imgPath) ? `/products/${item.asin}.jpg` : null,
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
  amazonUrl: string;
}

export const CATEGORIES = ${JSON.stringify([...new Set(products.map((p) => p.category))])} as const;

export const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};
`;
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, ts);
console.log(`\nWrote ${products.length} products → src/data/products.ts`);
console.log(`Images: ${products.filter((p) => p.image).length}/${products.length}`);
