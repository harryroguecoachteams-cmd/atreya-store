"""Square 192px crops of the story photos used as category circles on the home
page (shown at 72 to 92 px, so 192 covers 2x screens). Cropped from the 600px
story files, so run it after scripts/story-images.py. Writes
public/story/<name>-sq192.webp. The names must match CIRCLES in src/components/Hero.tsx."""
import os
from PIL import Image

STORY = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'story')
NAMES = ['col-gajras', 'col-hair-2', 'col-festive', 'col-door-2', 'ch-mandir',
         'col-crochet', 'col-flowers', 'col-kids', 'col-travel', 'col-craft']

for name in NAMES:
    im = Image.open(os.path.join(STORY, f'{name}-600.webp')).convert('RGB')
    s = min(im.size)
    left, top = (im.width - s) // 2, (im.height - s) // 2
    im = im.crop((left, top, left + s, top + s)).resize((192, 192), Image.LANCZOS)
    out = os.path.join(STORY, f'{name}-sq192.webp')
    im.save(out, 'WEBP', quality=78, method=6)
    print(f'{name:14} {os.path.getsize(out):6} B')
