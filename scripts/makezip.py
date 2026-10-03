r"""Builds the cPanel upload archive from dist/.

Run AFTER `npm run build && node scripts/prerender.mjs`:
    python scripts/makezip.py

Why not tar or Compress-Archive:
  * bsdtar is not installed on this machine and `tar --format=zip` is unsupported.
  * PowerShell's Compress-Archive writes BACKSLASH path separators. Linux unzip
    does not treat those as directories, so the whole tree lands as files named
    "assets\index-abc.js" in the docroot and every asset 404s.
So: zipfile, forward slashes forced, and a hard assert before the file ships.
"""
import os
import sys
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(ROOT, "dist")
OUT = os.path.join(os.path.dirname(ROOT), "atreya-store-dist.zip")

if not os.path.isdir(DIST):
    sys.exit("dist/ not found: run npm run build first")

# public/products also holds the 2000px Amazon listing uploads (ATR-...jpg and
# friends, around 30 MB) because the image-hosting branch is cut from this
# repo. The site never shows them, so they are pruned from dist/ here, before
# the zip and before deploy_cpanel.py uploads the folder. Only files that
# products.ts references survive. Checked 2026-10-03: no live listing points
# at atreya.store for an image, so nothing outside the site needs them.
import re

with open(os.path.join(ROOT, "src", "data", "products.ts"), encoding="utf-8") as fh:
    used = set(re.findall(r'"/products/([^"]+)"', fh.read()))
assert used, "no product images parsed from products.ts"
pdir = os.path.join(DIST, "products")
tdir = os.path.join(pdir, "400")
thumbs = {u[:-4] + ".webp" for u in used}
pruned = 0
for name in os.listdir(pdir):
    if os.path.isfile(os.path.join(pdir, name)) and name not in used:
        os.remove(os.path.join(pdir, name))
        pruned += 1
for name in os.listdir(tdir):
    if name not in thumbs:
        os.remove(os.path.join(tdir, name))
        pruned += 1
missing = [u for u in used if not os.path.exists(os.path.join(pdir, u))]
assert not missing, f"products.ts references images that are not in dist: {missing[:5]}"
nothumb = [t for t in thumbs if not os.path.exists(os.path.join(tdir, t))]
assert not nothumb, f"thumbnails missing, run python scripts/product-thumbs.py: {nothumb[:5]}"
print(f"pruned {pruned} unreferenced files from dist/products, kept {len(used)}")

names = []
with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as z:
    for folder, _dirs, files in os.walk(DIST):
        for name in files:
            full = os.path.join(folder, name)
            arc = os.path.relpath(full, DIST).replace(os.sep, "/")
            z.write(full, arc)
            names.append(arc)

backslashed = [n for n in names if "\\" in n]
assert not backslashed, f"backslash entries would break Linux unzip: {backslashed[:5]}"

# A stray archive inside dist/ (someone zipping a subfolder to upload it
# separately) doubles the payload and ships junk to the docroot.
nested = [n for n in names if n.endswith((".zip", ".tar", ".gz", ".rar"))]
assert not nested, f"archive files inside dist/, delete them first: {nested}"

# .htaccess drives SPA routing, the 404 status and the cache headers. A zip
# without it deploys a site that soft-404s everything and never busts cache.
assert ".htaccess" in names, ".htaccess missing from the archive"
assert "sitemap.xml" in names, "sitemap.xml missing from the archive"
assert "index.html" in names, "index.html missing from the archive"

# The sitemap in public/ has no lastmod: those dates are stamped by
# scripts/sitemap.mjs after prerender. If they are missing, that step was
# skipped and this build would ship a sitemap with no freshness signal.
with open(os.path.join(DIST, "sitemap.xml"), encoding="utf-8") as fh:
    sitemap = fh.read()
assert "<lastmod>" in sitemap, "sitemap has no lastmod: run node scripts/sitemap.mjs after prerender"

size_mb = os.path.getsize(OUT) / (1024 * 1024)
html = sum(1 for n in names if n.endswith(".html"))
print(f"{OUT}\n{len(names)} files, {html} html, {size_mb:.1f} MB, 0 backslash entries")
