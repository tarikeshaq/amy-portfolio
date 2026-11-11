#!/usr/bin/env python3
# Squares the corners of specific flat shapes baked into case-study images, to match the
# radius-0 shapes in Amy's Figma (file 4Ib6tw9S9Db1VKo6OWtzsF, frames 3288:10914 and 3288:11326).
# One-off tool, not part of the build. Needs: pip install pillow numpy scipy
#
#   python3 scripts/square-corners.py        # rewrites the *-square@2x.png sources listed in JOBS
#
# Each job names a source, an output, and the shapes to square: every connected region of one
# fill colour (within an optional box) gets its rounded corners filled in. Only pixels that are a
# blend of the fill and the background are touched, so lines crossing a corner survive, and
# arrow tips (straight chamfers, not arcs) are left alone. `photos` squares the rounded corners
# of the photos inside each card of that fill colour by extending the photo's edge pixels.
import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = "design/assets"
PAGE = (234, 230, 240)    # #EAE6F0 page lavender
CARD = (250, 250, 250)    # #FAFAFA panel
SAGE = (216, 223, 175)    # #D8DFAF
WHITE = (255, 255, 255)

JOBS = [
    # compute-costs: the six sketch cards on the cost/value quadrant, and their photos.
    ("compute-costs/05-cost-value-quadrant-recircled@2x.png",
     "compute-costs/05-cost-value-quadrant-recircled-square@2x.png",
     [dict(fill=CARD, bg=PAGE, photos=True),
      dict(fill=SAGE, bg=PAGE)]),   # "These visuals were selected as the ones to build" note
    # thought-partner: the in-text citation and reference list boxes.
    ("thought-partner/02-citation-format-examples-square@2x.png",
     "thought-partner/02-citation-format-examples-square@2x.png",
     [dict(fill=WHITE, bg=PAGE)]),
    # thought-partner: the four lever cards (white top, sage "Why this works" bottom).
    ("thought-partner/05-trust-levers-diagram@2x.png",
     "thought-partner/05-trust-levers-diagram-square@2x.png",
     [dict(fill=CARD, bg=PAGE), dict(fill=SAGE, bg=PAGE)]),
    # thought-partner: the sage arrow labels, the caption box between the two panels, and
    # the two POV panels themselves.
    ("thought-partner/08-escape-hatch-comparison@2x.png",
     "thought-partner/08-escape-hatch-comparison-square@2x.png",
     [dict(fill=SAGE, bg=PAGE),
      dict(fill=CARD, bg=PAGE, box=(0, 0, 1010, 1690), min_w=500),
      dict(fill=CARD, bg=PAGE, box=(1630, 0, 2640, 2476), min_w=500)]),
]

R_MAX = 28   # largest corner radius to fill, in 2x pixels


def blend_mask(a, fill, bg, tol=7):
    """Pixels on the straight line between bg and fill colours (anti-aliased edge or background)."""
    f, b = np.array(fill, float), np.array(bg, float)
    d = f - b
    t = np.clip(((a - b) @ d) / (d @ d), 0, 1)
    resid = np.abs(a - (b + t[..., None] * d)).max(-1)
    return (resid <= tol) & (t < 0.97)


def arc_radius(C, y0, y1, x0, x1, corner):
    """Radius of a rounded corner of mask C, or 0 if square / not an arc (e.g. an arrow tip)."""
    sy = 1 if corner[0] == "t" else -1
    sx = 1 if corner[1] == "l" else -1
    cy = y0 if sy == 1 else y1
    cx = x0 if sx == 1 else x1
    if C[cy, cx]:
        return 0
    row = C[cy, cx::sx] if sx == 1 else C[cy, cx::-1]
    col = C[cy::sy, cx] if sy == 1 else C[cy::-1, cx]
    rr = int(np.argmax(row)) if row.any() else 0
    rc = int(np.argmax(col)) if col.any() else 0
    r = max(rr, rc)
    if r < 2 or r > R_MAX or abs(rr - rc) > max(2, 0.35 * r):
        return 0
    t = 0
    while t < r and not C[cy + sy * t, cx + sx * t]:
        t += 1
    # a circular arc crosses the diagonal ~0.29r in; a chamfer or arrow tip ~0.5r
    return r if r < 6 or t <= 0.4 * r + 1 else 0


def square_shapes(a, fill, bg, photos=False, box=None, min_w=40):
    H, W, _ = a.shape
    M = np.abs(a - np.array(fill)).max(-1) <= 3
    if box:
        keep = np.zeros_like(M)
        keep[box[1]:box[3], box[0]:box[2]] = True
        M &= keep
    lab, _ = ndimage.label(M)
    blend = blend_mask(a, fill, bg)
    out = a.copy()
    done = []
    for i, sl in enumerate(ndimage.find_objects(lab), 1):
        y0, y1, x0, x1 = sl[0].start, sl[0].stop - 1, sl[1].start, sl[1].stop - 1
        if x1 - x0 < min_w or y1 - y0 < 24:
            continue
        C = lab == i
        for corner in ("tl", "tr", "bl", "br"):
            r = arc_radius(C, y0, y1, x0, x1, corner)
            if not r:
                continue
            # only corners that sit on the page background (not inner cards' outlines)
            py, px = (y0 if corner[0] == "t" else y1), (x0 if corner[1] == "l" else x1)
            if np.abs(a[py, px] - np.array(bg)).max() > 6:
                continue
            ys = slice(y0, y0 + r + 1) if corner[0] == "t" else slice(y1 - r, y1 + 1)
            xs = slice(x0, x0 + r + 1) if corner[1] == "l" else slice(x1 - r, x1 + 1)
            sel = blend[ys, xs] & ~C[ys, xs]
            out[ys, xs][sel] = fill
            # the soft (anti-aliased) edge just outside the shape must also run into the corner
            sy = 1 if corner[0] == "t" else -1
            sx = 1 if corner[1] == "l" else -1
            cy, cx = (y0 if sy == 1 else y1), (x0 if sx == 1 else x1)
            ey, ex = cy - sy, cx - sx
            if 0 <= ey < H and 0 <= cx + sx * (r + 1) < W and blend[ey, cx + sx * (r + 1)]:
                for d in range(r + 1):
                    if blend[ey, cx + sx * d]:
                        out[ey, cx + sx * d] = a[ey, cx + sx * (r + 1)]
            if 0 <= ex < W and 0 <= cy + sy * (r + 1) < H and blend[cy + sy * (r + 1), ex]:
                for d in range(r + 1):
                    if blend[cy + sy * d, ex]:
                        out[cy + sy * d, ex] = a[cy + sy * (r + 1), ex]
            done.append((corner, r, x0, y0))
        if photos:
            square_photo(out, C, y0, y1, x0, x1, fill)
    return out, done


def square_photo(out, C, y0, y1, x0, x1, fill):
    """Square the rounded corners of the largest photo inside card C."""
    a = out[y0:y1 + 1, x0:x1 + 1]
    far = np.abs(a - np.array(fill)).max(-1) > 12
    far = ndimage.binary_closing(far, np.ones((7, 7), bool))
    lab, n = ndimage.label(far)
    if not n:
        return
    sizes = ndimage.sum(far, lab, range(1, n + 1))
    k = int(np.argmax(sizes)) + 1
    py, px = ndimage.find_objects(lab)[k - 1]
    py0, py1, px0, px1 = py.start, py.stop - 1, px.start, px.stop - 1
    if (py1 - py0) < 60 or (px1 - px0) < 60:
        return
    P = lab == k
    for corner in ("tl", "tr", "bl", "br"):
        r = arc_radius(P, py0, py1, px0, px1, corner)
        if not r:
            continue
        sy = 1 if corner[0] == "t" else -1
        sx = 1 if corner[1] == "l" else -1
        cy = py0 if sy == 1 else py1
        cx = px0 if sx == 1 else px1
        for dy in range(r + 1):
            for dx in range(r + 1):
                y, x = cy + sy * dy, cx + sx * dx
                if P[y, x] and np.abs(a[y, x] - np.array(fill)).max() > 12:
                    continue
                # copy from just past the corner along whichever edge is nearer
                if dy <= dx:
                    a[y, x] = a[cy + sy * (r + 1), x]
                else:
                    a[y, x] = a[y, cx + sx * (r + 1)]


def main():
    for src, dst, shapes in JOBS:
        a = np.asarray(Image.open(f"{ROOT}/{src}").convert("RGB")).astype(np.float64)
        report = []
        for s in shapes:
            a, done = square_shapes(a, **s)
            report += done
        Image.fromarray(np.round(a).astype(np.uint8)).save(f"{ROOT}/{dst}", optimize=True)
        print(dst, f"{len(report)} corners", sorted({r for _, r, _, _ in report}))


if __name__ == "__main__":
    main()
