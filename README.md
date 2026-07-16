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

## Production build

```bash
npm run build      # outputs dist/
npm run preview    # smoke-test the production build locally
```

## Deploying to Namecheap cPanel

The site is plain static files served by Apache from the `atreya.store` addon-domain
document root (`/home/<user>/atreya.store`).

1. `npm run build`
2. Zip the **contents** of `dist/` (including the hidden `.htaccess`).
3. cPanel → File Manager → open the `atreya.store` folder → Upload the zip → Extract.
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
