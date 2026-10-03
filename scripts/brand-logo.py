"""Builds the Atreya lotus wordmark as clean vector art from the source PNG.

The source (brand/atreya-lotus-wordmark-source.png) is a generated image: the
word runs top to bottom and the letters carry blotchy halos. This turns it to
read left to right, traces the letters, the lotus petals and the bud as three
separate layers, and writes:

  public/brand/atreya-wordmark.svg        full colour, for light backgrounds
  public/brand/atreya-wordmark-light.svg  cream letters, for the ink footer
  public/favicon.svg                      the lotus alone on an ink tile

Rasters (png, ico, share card) are rendered from these SVGs by
scripts/brand-rasters.mjs, so there is one source of truth for the shapes.
Run: python scripts/brand-logo.py
"""
import os
import cv2
import numpy as np
import potrace
from PIL import Image

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
SRC = os.path.join(ROOT, 'brand', 'atreya-lotus-wordmark-source.png')
OUT = os.path.join(ROOT, 'public', 'brand')
UP = 3  # trace at 3x so curves come out smooth

BG = np.array([254, 253, 249.0])  # the source's off-white

im = Image.open(SRC).convert('RGB').rotate(90, expand=True)  # read left to right
px = np.asarray(im).astype(float)
ink = (BG - px).clip(0).max(2)  # how far each pixel sits from the background

# Connected shapes, ordered left to right: the swash A, T, R, E, Y, A, then the
# bud and three petals, told apart by colour (the bud is gold, petals are rose).
n, lab, stats, _ = cv2.connectedComponentsWithStats((ink > 35).astype(np.uint8), 8)
letters, petals, bud = [], [], []
for i in range(1, n):
    if stats[i, cv2.CC_STAT_AREA] < 30:
        continue
    core = px[(lab == i) & (ink > 90)]
    r, g, b = np.median(core, 0)
    if r > 150 and r - g > 50 and b > 80:
        petals.append(i)
    elif r > 150:
        bud.append(i)
    else:
        letters.append(i)
assert len(letters) == 6 and len(petals) == 3 and len(bud) == 1, (letters, petals, bud)

ys, xs = np.where(np.isin(lab, letters + petals + bud))
PAD = 2
x0, y0 = xs.min() - PAD, ys.min() - PAD
x1, y1 = xs.max() + PAD + 1, ys.max() + PAD + 1
W, H = x1 - x0, y1 - y0


def layer(ids, thresh):
    """Smooth binary mask for the given shapes, at UP x scale."""
    region = cv2.dilate(np.isin(lab, ids).astype(np.uint8), np.ones((5, 5), np.uint8)) > 0
    soft = np.where(region, ink, 0)[y0:y1, x0:x1]
    soft = cv2.resize(soft, (W * UP, H * UP), interpolation=cv2.INTER_CUBIC)
    soft = cv2.GaussianBlur(soft, (0, 0), 1.1 * UP / 3)
    return soft > thresh


def trace(mask):
    bm = potrace.Bitmap(~mask)  # potracer traces the False pixels
    curves = bm.trace(turdsize=12 * UP, alphamax=1.0, opticurve=True, opttolerance=0.2)
    f = lambda p: f'{p.x / UP:.2f} {p.y / UP:.2f}'
    d = []
    for c in curves:
        d.append(f'M{f(c.start_point)}')
        for s in c.segments:
            if s.is_corner:
                d.append(f'L{f(s.c)}L{f(s.end_point)}')
            else:
                d.append(f'C{f(s.c1)} {f(s.c2)} {f(s.end_point)}')
        d.append('Z')
    return ''.join(d)


LETTERS = trace(layer(letters, 80))
PETALS = trace(layer(petals, 60))
BUD = trace(layer(bud, 85))

# Bronze that runs gold at the swash and settles into a deep brown, as in the
# source, without its blotches.
BRONZE = [(0, '#9a6d2b'), (0.17, '#7a5221'), (0.3, '#54391c'), (0.62, '#5a3c1c'), (1, '#43301b')]
CREAM = [(0, '#e9c98a'), (0.22, '#f3e6cf'), (1, '#faf6ef')]
ROSE, GOLD = '#c98a6f', '#b98330'


def svg(stops, gid, view=None, title='Atreya'):
    vx, vy, vw, vh = view or (0, 0, W, H)
    grad = ''.join(f'<stop offset="{o}" stop-color="{c}"/>' for o, c in stops)
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{vw}" height="{vh}" viewBox="{vx} {vy} {vw} {vh}" role="img">'
        f'<title>{title}</title>'
        f'<defs><linearGradient id="{gid}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="{W}" y2="0">{grad}</linearGradient></defs>'
        f'<path fill="url(#{gid})" fill-rule="evenodd" d="{LETTERS}"/>'
        f'<path fill="{ROSE}" d="{PETALS}"/>'
        f'<path fill="{GOLD}" d="{BUD}"/>'
        '</svg>\n'
    )


os.makedirs(OUT, exist_ok=True)
with open(os.path.join(OUT, 'atreya-wordmark.svg'), 'w', encoding='utf-8') as fh:
    fh.write(svg(BRONZE, 'g'))
with open(os.path.join(OUT, 'atreya-wordmark-light.svg'), 'w', encoding='utf-8') as fh:
    fh.write(svg(CREAM, 'g'))

def bounds(ids):
    sel = np.isin(lab[ys, xs], ids)
    return xs[sel].min() - x0, xs[sel].max() + 1 - x0, ys[sel].min() - y0, ys[sel].max() + 1 - y0


def square(ids, fill):
    """viewBox and backing tile that centre the given shapes with a margin."""
    bx0, bx1, by0, by1 = bounds(ids)
    side = max(bx1 - bx0, by1 - by0) * (1 + 2 * fill)
    vx, vy = (bx0 + bx1 - side) / 2, (by0 + by1 - side) / 2
    return f'{vx:.1f} {vy:.1f} {side:.1f} {side:.1f}', (vx, vy, side), (bx0, bx1)


# Favicon: the lotus alone on an ink tile. The A's hairlines vanish at tab
# size, the lotus still reads as a rose and gold flower at 16px.
vb, (vx, vy, side), _ = square(petals + bud, 0.2)
fav = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}">'
    f'<rect x="{vx:.1f}" y="{vy:.1f}" width="{side:.1f}" height="{side:.1f}" rx="{side * 0.18:.1f}" fill="#2a2018"/>'
    f'<path fill="#d99a7e" d="{PETALS}"/>'
    f'<path fill="#e2a345" d="{BUD}"/>'
    '</svg>\n'
)
with open(os.path.join(ROOT, 'public', 'favicon.svg'), 'w', encoding='utf-8') as fh:
    fh.write(fav)

print(f'wordmark {W}x{H}, letters {len(LETTERS)} chars, petals {len(PETALS)}, bud {len(BUD)}')
