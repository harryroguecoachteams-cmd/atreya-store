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

size_mb = os.path.getsize(OUT) / (1024 * 1024)
html = sum(1 for n in names if n.endswith(".html"))
print(f"{OUT}\n{len(names)} files, {html} html, {size_mb:.1f} MB, 0 backslash entries")
