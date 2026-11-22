"""Builds the About portrait from the original studio photo (src/assets/portfolio/me.png).

The photo was shot on a light grey backdrop, which sat as a bright block on the dark page.
This cuts the backdrop out, puts the subject on the site's charcoal with a soft cool light
behind the head, grades it gently and crops it to 4:5 (head to crossed arms), then writes
the 320/640 px AVIF + WebP files About.jsx imports. The face itself is not retouched.

    python scripts/portrait/grade.py          (needs Pillow with AVIF and numpy)
"""
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ASSETS = os.path.join(os.path.dirname(__file__), "..", "..", "src", "assets", "portfolio")
SRC = os.path.join(ASSETS, "me.png")
img = Image.open(SRC).convert("RGB")
W, H = img.size
I = np.asarray(img).astype(np.float32)

# 1. Model the studio backdrop (a smooth grey gradient) from pixels that are surely backdrop
yy, xx = np.mgrid[0:H, 0:W]
sure = (yy < 150) | (xx < 70) | ((xx > 770) & (yy < 1150))
def basis(x, y):
    x = x / W; y = y / H
    return np.stack([np.ones_like(x), x, y, x * x, y * y, x * y], -1)
A = basis(xx[sure].astype(np.float32), yy[sure].astype(np.float32))
B = np.zeros_like(I)
full = basis(xx.astype(np.float32), yy.astype(np.float32)).reshape(-1, 6)
for c in range(3):
    coef, *_ = np.linalg.lstsq(A, I[..., c][sure], rcond=None)
    B[..., c] = (full @ coef).reshape(H, W)

# Distance from the backdrop, split in two: how much darker (hair, suit; the backdrop's
# own soft shadow is only slightly darker) and how much more coloured (skin, the shirt)
lum = lambda a: a @ np.array([0.299, 0.587, 0.114], np.float32)
dl = lum(B) - lum(I)
chroma = lambda a: a - lum(a)[..., None]
dc = np.sqrt(((chroma(I) - chroma(B)) ** 2).sum(-1))
ramp = np.maximum(np.clip((dl - 28) / 70, 0, 1), np.clip((dc - 7) / 14, 0, 1))
ramp = np.maximum(ramp, np.clip((-dl - 25) / 30, 0, 1))  # brighter than the backdrop

# Backdrop = backdrop-like pixels connected to the frame edge (keeps the light shirt)
bglike = Image.fromarray(((ramp < 0.95) * 255).astype(np.uint8)).copy()
for seed in [(0, 0), (W - 1, 0), (0, H // 2), (W - 1, H // 2), (W // 2, 0)]:
    if bglike.getpixel(seed) == 255:
        ImageDraw.floodfill(bglike, seed, 128)
conn = np.asarray(bglike) == 128
conn = np.asarray(Image.fromarray((conn * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3))) > 0

alpha = np.ones((H, W), np.float32)
alpha[conn] = ramp[conn]
# The light shirt collar touches the backdrop at the neck and leaks into it: the neck and
# collar are always the subject
neck = Image.new("L", (W, H), 0)
ImageDraw.Draw(neck).polygon([(398, 466), (420, 446), (505, 432), (522, 462), (540, 560), (342, 560), (358, 515)], fill=255)
alpha[np.asarray(neck) > 0] = 1
# Choke the edge a little (kills the light fringe), then soften it
alpha = np.clip((alpha - 0.2) / 0.8, 0, 1)
alpha = np.asarray(Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.1))).astype(np.float32) / 255

# 3. Remove the grey spill from edge pixels
a3 = np.clip(alpha, 1e-3, 1)[..., None]
F = np.clip((I - (1 - a3) * B) / a3, 0, 255)
F = np.where(alpha[..., None] > 0.02, F, I)

# 4. Gentle grade on the subject: a soft S-curve, a touch cooler in the shadows
x = F / 255
x = x + 0.10 * (x - x * x) * (2 * x - 1) * -1  # mild S (lifts nothing, deepens shadows a bit)
x = np.clip((x - 0.5) * 1.06 + 0.5, 0, 1)
x[..., 2] = np.clip(x[..., 2] + 0.012 * (1 - x[..., 2]), 0, 1)
F = x * 255

# 5. New backdrop: the site's dark charcoal, with a soft cool light behind the head
cx, cy = 0.52 * W, 0.30 * H
r = np.sqrt(((xx - cx) / (0.55 * W)) ** 2 + ((yy - cy) / (0.55 * H)) ** 2)
glow = np.clip(1 - r, 0, 1) ** 1.6
base = np.array([17, 17, 20], np.float32)
lift = np.array([44, 50, 60], np.float32)
BG = base + glow[..., None] * (lift - base)
rng = np.random.default_rng(7)
BG = BG + rng.normal(0, 1.6, (H, W, 1))

out = F * alpha[..., None] + BG * (1 - alpha[..., None])
out = Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))

# 6. Tighter 4:5 crop: head to crossed arms, face larger in the frame
cw, ch = 576, 720
x0, y0 = 430 - cw // 2, 120
crop = out.crop((x0, y0, x0 + cw, y0 + ch))
for w in (640, 320):
    im = crop.resize((w, w * 5 // 4), Image.LANCZOS).filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2))
    name = os.path.join(ASSETS, f"mehdi-aichouch-portrait-{w}")
    im.save(name + ".webp", quality=82, method=6)
    im.save(name + ".avif", quality=62)
    print(name, "written")
