"""Lifestyle photos for the story sections of the site.

Source = the live Amazon listing gallery, pulled to E:/atreya/store/v3/catalog by
E:/atreya/listing/atreya-aplus/_store_pull_images_v3.js. Only frames with NO text
on them are used here (the listing infographics are kept off the site).
Writes public/story/<name>-1200.webp and <name>-600.webp for srcset.
Run: python scripts/story-images.py
"""
import os
from PIL import Image, ImageChops

CAT = 'E:/atreya/store/v3/catalog'
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'story')

STORY = {
    # hero triptych
    'hero-bun': 'B0HFBN6VKM/PT02',
    # the toran sits in the middle third, so it survives the portrait crop
    'hero-mandir': 'B0HJ8Z86C8/PT06',
    'hero-girl': 'B0HF9XYGT7/PT03',
    # home chapters
    'ch-hair': 'B0HC479QXR/PT05',
    'ch-hair-2': 'B0HGFLGL4V/PT01',
    'ch-mandir': 'B0HF4N37JD/PT03',
    'ch-mandir-2': 'B0HF9ZSQY3/PT01',
    'ch-door': 'B0HFPM5MZB/PT03',
    'ch-door-2': 'B0HJ8S6WZZ/PT01',
    'ch-gifts': 'B0GDXXM3PR/PT03',
    'ch-gifts-2': 'B0HGF9GXPP/PT01',
    # craft band
    'craft-aasan': 'B0HB4N2JSH/PT01',
    'craft-crochet': 'B0GC6KJCSC/PT02',
    # weddings and events band
    'bulk-garlands': 'B0HCCGJKQ4/PT02',
    # collection banners and category tiles
    'col-gajras': 'B0HGFMB8JJ/PT01',
    'col-hair': 'B0HD2V6K1M/PT04',
    'col-hair-2': 'B0HGFJRY4C/PT01',
    'col-festive': 'B0HFQDY4K3/PT03',
    'col-door': 'B0HJ8HKMWC/PT05',
    'col-door-2': 'B0HFQMDHJX/PT03',
    'col-pooja': 'B0HB4N2JSH/PT03',
    'col-pooja-2': 'B0HGFGMKDY/PT03',
    'col-flowers': 'B0HC44WKBT/PT03',
    'col-crochet': 'B0GC6KJCSC/PT01',
    'col-kids': 'B0HF9XYGT7/PT04',
    'col-travel': 'B0HFPS29NW/PT03',
    'col-craft': 'B09Y29QS4V/PT01',
    # Diwali gifting page and the seasonal band on the home page
    'diwali-mandir': 'B0HJ8S6WZZ/PT06',
    'diwali-door': 'B0HJ8P8NBY/PT01',
    'diwali-gift': 'B0HB4N2JSH/PT04',
}



def trim(img, tol=18):
    """Cut the uniform near-white frame some listing photos carry. Only when it
    is a real frame (over 1.5% on a side), never into the subject."""
    bg = Image.new('RGB', img.size, (255, 255, 255))
    diff = ImageChops.difference(img, bg).convert('L').point(lambda v: 255 if v > tol else 0)
    box = diff.getbbox()
    if not box:
        return img
    w, h = img.size
    if box[0] > w * 0.015 or box[1] > h * 0.015 or w - box[2] > w * 0.015 or h - box[3] > h * 0.015:
        return img.crop(box)
    return img


os.makedirs(OUT, exist_ok=True)
for name, key in STORY.items():
    src = trim(Image.open(os.path.join(CAT, key + '.jpg')).convert('RGB'))
    for w in (1200, 600):
        im = src.copy()
        if im.width > w:
            im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        im.save(os.path.join(OUT, f'{name}-{w}.webp'), 'WEBP', quality=80, method=6)
    print(f'{name:16} {key:18} {src.size}')
