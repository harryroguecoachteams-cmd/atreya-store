"""Builds public/og-image.jpg, the 1200x630 card WhatsApp, Facebook and X show
when the home page is shared. Same line, type and triptych as the site hero.
Run: python scripts/og-image.py
"""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
FONTS = 'E:/atreya/store/v3/fonts'
CREAM, INK, SOFT, BRASS, BRONZE = (250, 246, 239), (42, 32, 24), (94, 79, 67), (176, 141, 63), (116, 80, 29)

def serif(size, italic=False):
    f = ImageFont.truetype(os.path.join(FONTS, 'CormorantGaramond-Italic[wght].ttf' if italic else 'CormorantGaramond[wght].ttf'), size)
    f.set_variation_by_name('Medium Italic' if italic else 'Medium')
    return f

def sans(size):
    f = ImageFont.truetype(os.path.join(FONTS, 'Jost[wght].ttf'), size)
    f.set_variation_by_name('Medium')
    return f

def cover(im, w, h, fy=0.45):
    sc = max(w / im.width, h / im.height)
    im = im.resize((round(im.width * sc), round(im.height * sc)), Image.LANCZOS)
    x = (im.width - w) // 2
    y = min(max(0, round(fy * im.height - h / 2)), im.height - h)
    return im.crop((x, y, x + w, y + h))

W, H = 1200, 630
img = Image.new('RGB', (W, H), CREAM)
d = ImageDraw.Draw(img)

# Triptych on the right
x0, gap, top = 560, 10, 40
pw = (W - 40 - x0 - 2 * gap) // 3
for i, (name, fy) in enumerate([('hero-bun', 0.42), ('hero-mandir', 0.5), ('hero-girl', 0.38)]):
    src = Image.open(os.path.join(ROOT, 'public', 'story', f'{name}-1200.webp')).convert('RGB')
    y = top + (24 if i == 1 else 0)
    img.paste(cover(src, pw, H - 2 * top - 24, fy), (x0 + i * (pw + gap), y))

# Words on the left, under the lotus wordmark (scripts/brand-rasters.mjs)
x = 60
logo = Image.open(os.path.join(ROOT, 'public', 'brand', 'atreya-wordmark.png'))
lw = 250
logo = logo.resize((lw, round(logo.height * lw / logo.width)), Image.LANCZOS)
img.paste(logo, (x - 6, 66), logo)
d.text((x, 150), 'Beautiful things', font=serif(66), fill=INK)
d.text((x, 222), 'for you and', font=serif(66), fill=INK)
d.text((x, 294), 'your home.', font=serif(66), fill=INK)
d.rectangle([x, 398, x + 70, 399], fill=BRASS)
d.text((x, 420), 'Handmade and handpicked in India.', font=serif(30, True), fill=SOFT)
d.text((x, 520), 'atreya.store', font=sans(17), fill=BRONZE)

img.save(os.path.join(ROOT, 'public', 'og-image.jpg'), quality=88)
print('wrote public/og-image.jpg')
