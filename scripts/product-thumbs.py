"""400px WebP thumbnails for every product image the site renders.

Product cards, the chapter strips on the home page and the gallery thumbnails
show these photos at roughly 100 to 300 CSS px, but the source files are 800px
JPEGs, so a shop page was pulling about 450 KB more than it displays
(Lighthouse "properly size images"). The cards now ask for the thumbnail first
and only fall back to the 800px JPEG on wide or dense screens.

Run AFTER scripts/fetch-products.mjs (it reads products.ts):
    python scripts/product-thumbs.py
Writes public/products/400/<name>.webp. Existing thumbnails newer than their
source are skipped.
"""
import os
import re
from PIL import Image

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
PUB = os.path.join(ROOT, 'public', 'products')
OUT = os.path.join(PUB, '400')

with open(os.path.join(ROOT, 'src', 'data', 'products.ts'), encoding='utf-8') as fh:
    used = sorted(set(re.findall(r'"/products/([^"/]+)\.jpg"', fh.read())))
assert used, 'no product images parsed from products.ts'

os.makedirs(OUT, exist_ok=True)
made = 0
for stem in used:
    src = os.path.join(PUB, stem + '.jpg')
    dst = os.path.join(OUT, stem + '.webp')
    if os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(src):
        continue
    im = Image.open(src).convert('RGB')
    if im.width > 400:
        im = im.resize((400, round(im.height * 400 / im.width)), Image.LANCZOS)
    im.save(dst, 'WEBP', quality=80, method=6)
    made += 1
print(f'{made} thumbnails written, {len(used)} in use')
