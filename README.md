# atreya.store

Brand + catalogue website for **Atreya** — handmade crochet keepsakes, festive décor and
artificial flowers. Every product links to its live listing on Amazon.in (no on-site checkout).

Built with React 19, Vite, TypeScript, Tailwind CSS v4 and React Router.

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
```

## Updating the product catalogue

Products are generated from the Amazon **Active Listings Report**:

1. Download a fresh report from Seller Central and save it as
   `E:/atreya/Active+Listings+Report_*.txt` (update `REPORT` in the script).
2. Add/remove entries in the `CATALOG` array in `scripts/fetch-products.mjs`
   (ASIN, display name, category).
3. Run `node scripts/fetch-products.mjs` — it downloads each product's main image
   from its Amazon listing into `public/products/` and regenerates `src/data/products.ts`.

Contact details (WhatsApp number, email) live in `src/config.ts`.

## Production build: run all five steps, in this order

```bash
node scripts/fetch-products.mjs   # products.ts + the base sitemap URL list
npm run build                     # outputs dist/
node scripts/prerender.mjs        # a static snapshot per route, for crawlers
node scripts/sitemap.mjs          # stamps lastmod + image entries into the sitemap
python scripts/makezip.py         # builds the upload zip, and asserts the above ran
```

`npm run preview` smoke-tests the built site locally.

**Commit `sitemap-state.json`.** It stores a content hash per URL, and it is the
only reason `lastmod` reflects real changes instead of the build clock. Lose it
and the next deploy re-dates all 39 pages, which is the signal Google learns to
ignore.

## Deploying to Namecheap cPanel

The site is plain static files served by Apache from the `atreya.store` addon-domain
document root (`/home/<user>/atreya.store`).

1. Run the five build steps above.
2. Upload `E:/atreya/atreya-store-dist.zip` (built by `makezip.py`, which already
   contains the hidden `.htaccess`).
3. cPanel → File Manager → open the `atreya.store` folder → Upload the zip →
   Extract **over the top**. Do not delete the folder contents first: deleting
   opens a window where every URL 404s, and extracting over the top does not.
   Turn on **Settings → Show Hidden Files** or you will never see `.htaccess`.
4. The files must sit directly in the document root:

```
/atreya.store/index.html
/atreya.store/assets/
/atreya.store/products/
/atreya.store/.htaccess
/atreya.store/robots.txt
/atreya.store/sitemap.xml
```

`.htaccess` handles React Router deep links (e.g. `/shop`) by rewriting to `index.html`.
Once SSL shows active in cPanel → SSL/TLS Status, enable **Force HTTPS Redirect** for the domain.

⚠️ **Never put a `%{DOCUMENT_ROOT}` filesystem test in `.htaccess`.** It does not
resolve to this addon domain's document root on this host. A rule that used one
to detect delisted products 404'd all 33 product and collection URLs live on
2026-08-05. Delisted ASINs are an explicit list returning 410 Gone instead.
