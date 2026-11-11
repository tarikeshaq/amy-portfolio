#!/usr/bin/env python3
# Squares off rounded-rectangle corners baked into flat UI screenshots (case-study images).
# One-off tool, not part of the build. Needs: pip install pillow numpy scipy
#   python3 scripts/square-corners.py in.png out.png [debug.png]   (PHOTOS=1 for images with photos)
"""Square off rounded-rectangle corners in flat UI raster images.
usage: square.py in.png out.png [debug.png]"""
import sys, numpy as np
from PIL import Image
from scipy import ndimage

DIAG = []
import os
PHOTOS = bool(os.environ.get('PHOTOS'))  # image contains photos: also require flat surroundings
TOL = 14          # colour distance counted as "same colour"
MIN_W, MIN_H = 24, 12
MIN_PIX = 200     # dominant-colour threshold

def corners(M, y0, y1, x0, x1):
    """Yield (name, r) for each rounded corner of component mask M (bbox inclusive)."""
    h, w = y1 - y0 + 1, x1 - x0 + 1
    top, bot = M[y0, x0:x1 + 1], M[y1, x0:x1 + 1]
    lef, rig = M[y0:y1 + 1, x0], M[y0:y1 + 1, x1]
    def first(a):
        i = np.argmax(a); return int(i) if a[i] else None
    out = {}
    spec = {"tl": (top, lef), "tr": (top[::-1], rig), "bl": (bot, lef[::-1]), "br": (bot[::-1], rig[::-1])}
    for name, (row, col) in spec.items():
        rr, rc = first(row), first(col)
        if not rr or not rc: continue            # square (0) or empty edge
        r = max(rr, rc)
        if r < 4 or r > min(w, h) / 2 + 2: continue
        if abs(rr - rc) > max(2, 0.35 * r): continue
        # true arcs cross the diagonal ~0.29r in; chamfers/arrow tips cross at ~0.5r
        if r >= 6:
            t = 0
            while t < r:
                yy = y0 + t if name[0] == "t" else y1 - t
                xx = x0 + t if name[1] == "l" else x1 - t
                if M[yy, xx]: break
                t += 1
            if not 0.12 * r <= t <= 0.40 * r + 1: continue
        out[name] = r; DIAG.append((r, t if r >= 6 else None))
    if not out: return {}
    # straight-edge check: a rounded rect has real straight runs between its corners
    def straight(a, ra, rb):
        seg = a[ra:len(a) - rb]
        return len(seg), (seg.mean() if len(seg) else 0)
    def ok_side(a, ra, rb):
        n, f = straight(a, ra, rb); return n, f
    g = lambda k: out.get(k, 0)
    nt, ft = ok_side(top, g("tl"), g("tr")); nb, fb = ok_side(bot, g("bl"), g("br"))
    nl, fl = ok_side(lef, g("tl"), g("bl")); nr, fr = ok_side(rig, g("tr"), g("br"))
    if max(nt, nb, nl, nr) < 6: return {}       # circles / ellipses
    # glyph counters (inside o, d, e...) are small and mostly curved: require long straight sides
    if not (min(w, h) >= 26 or (w >= 24 and h >= 12 and w >= 1.3 * h)): return {}
    pill = max(out.values()) >= 0.3 * h
    if max(top.sum(), bot.sum()) < 0.6 * w: return {}
    if not pill and max(lef.sum(), rig.sum()) < 0.4 * h: return {}
    for k in list(out):
        hs = (nt, ft) if k[0] == "t" else (nb, fb)
        vs = (nl, fl) if k[1] == "l" else (nr, fr)
        # the edges meeting at this corner must be solid where they exist
        if (hs[0] >= 3 and hs[1] < 0.9) or (vs[0] >= 3 and vs[1] < 0.9): del out[k]
    return out

def process(src, dst, dbg=None):
    im = Image.open(src).convert("RGB"); a = np.asarray(im).astype(np.int16)
    H, W, _ = a.shape
    q = a // 8   # bucket colours so slightly noisy fills still count as one colour
    flat = (q[..., 0].astype(np.int32) << 16) | (q[..., 1].astype(np.int32) << 8) | q[..., 2]
    vals, counts = np.unique(flat, return_counts=True)
    dom = vals[counts >= MIN_PIX]
    out = a.copy(); changed = np.zeros((H, W), bool); n = 0; fills = []
    taken = np.zeros((H, W), bool)
    for v in dom[np.argsort(-counts[counts >= MIN_PIX])]:
        sel = flat == v
        c = np.median(a[sel], axis=0).astype(np.int16)
        M0 = np.abs(a - c).max(-1) <= TOL
        pass
        for variant, M in (("raw", M0), ("open", ndimage.binary_opening(M0, np.ones((9, 9), bool))),
                           ("dil", ndimage.binary_dilation(M0, np.ones((3, 3), bool)))):
          lab, k = ndimage.label(M, np.ones((3, 3), bool))
          for i, sl in enumerate(ndimage.find_objects(lab), 1):
            if sl is None: continue
            y0, y1, x0, x1 = sl[0].start, sl[0].stop - 1, sl[1].start, sl[1].stop - 1
            if x1 - x0 + 1 < MIN_W or y1 - y0 + 1 < MIN_H: continue
            C = lab == i
            if min(x1 - x0, y1 - y0) + 1 < 26:
                # small shapes (tags, buttons) must sit on one flat background; pieces of
                # fill trapped between letters don't
                fy0, fy1, fx0, fx1 = max(y0 - 2, 0), min(y1 + 3, H), max(x0 - 2, 0), min(x1 + 3, W)
                fr = np.ones((fy1 - fy0, fx1 - fx0), bool)
                fr[y0 - fy0:y1 - fy0 + 1, x0 - fx0:x1 - fx0 + 1] = False
                F = a[fy0:fy1, fx0:fx1][fr]
                if len(F):
                    mode = np.median(F, axis=0)
                    if (np.abs(F - mode).max(-1) <= 12).mean() < 0.85 or np.abs(mode - c).max() <= 14: continue
            # flat UI fills are one exact colour; photos/sketches are noisy
            mad = np.median(np.abs(a[C] - c).max(-1))
            solid = C[y0:y1 + 1, x0:x1 + 1].mean()
            if PHOTOS and (mad > 3 or (mad > 1 and solid < 0.6)): continue
            for name, r in corners(C, y0, y1, x0, x1).items():
                R = r + 1
                pts = []
                for dy in range(R):
                    for dx in range(R):
                        y = y0 + dy if name[0] == "t" else y1 - dy
                        x = x0 + dx if name[1] == "l" else x1 - dx
                        if not (0 <= y < H and 0 <= x < W) or C[y, x]: continue
                        rs = C[y, x0:x + 1] if name[1] == "l" else C[y, x:x1 + 1]
                        cs = C[y0:y + 1, x] if name[0] == "t" else C[y:y1 + 1, x]
                        if not rs.any() and not cs.any():
                            pts.append((y, x))
                if not pts: continue
                # just outside the corner must be flat (page, panel or border), not a photo
                cy = y0 if name[0] == "t" else y1; cx = x0 if name[1] == "l" else x1
                sy, sx = (-1 if name[0] == "t" else 1), (1 if name[1] == "l" else -1)
                m = max(2, r // 2); strip = []
                for t in range(m):
                    yy, xx = cy - sy, cx + sx * t
                    if 0 <= yy < H and 0 <= xx < W: strip.append(a[yy, xx])
                    yy, xx = cy + (1 if name[0] == "t" else -1) * t, cx - sx
                    if 0 <= yy < H and 0 <= xx < W: strip.append(a[yy, xx])
                if strip and PHOTOS:
                    st = np.array(strip)
                    if (st.max(0) - st.min(0)).max() > 20: continue
                cy = y0 if name[0] == "t" else y1; cx = x0 if name[1] == "l" else x1
                sy, sx = (1 if name[0] == "t" else -1), (1 if name[1] == "l" else -1)
                P = lambda dy, dx: (cy + sy * dy, cx + sx * dx)
                def inside(dy, dx):
                    y, x = P(dy, dx); return 0 <= y < H and 0 <= x < W
                th = tv = 0
                while inside(th, R + 2) and C[P(th, R + 2)] and th < 8: th += 1
                while inside(R + 2, tv) and C[P(R + 2, tv)] and tv < 8: tv += 1
                ring = C[y0:y1 + 1, x0:x1 + 1].mean() < 0.35   # an outline, not a filled shape
                thin = ring and 0 < th <= 4 and 0 < tv <= 4 and inside(R + 2, R + 2) and not C[P(R + 2, R + 2)]
                if variant == "dil" and not thin: continue
                if thin:
                    # thin outline: erase the arc, then run both straight edges into the corner
                    # inside colour: sampled just inside each straight edge, away from the corner
                    samp = [a[P(th + 1, R + 2 + j)] for j in range(3) if inside(th + 1, R + 2 + j)] + \
                           [a[P(R + 2 + j, tv + 1)] for j in range(3) if inside(R + 2 + j, tv + 1)]
                    ic = np.median(np.array(samp), axis=0).astype(np.int16); oc = a[cy, cx]; ps = set(pts)
                    yA, yB = sorted((cy, cy + sy * R)); xA, xB = sorted((cx, cx + sx * R))
                    yA, xA = max(yA - 1, 0), max(xA - 1, 0)
                    Cn = ndimage.binary_dilation(C[yA:yB + 2, xA:xB + 2])   # the arc and its soft edge
                    for dy in range(R + 1):
                        for dx in range(R + 1):
                            if not inside(dy, dx): continue
                            y, x = P(dy, dx)
                            if (y, x) in ps: out[y, x] = oc
                            elif Cn[y - yA, x - xA]: out[y, x] = ic
                            else: continue
                            changed[y, x] = True
                    rc_ = np.median(a[C & M0], axis=0) if (C & M0).any() else c
                    dist = lambda u, v: np.abs(u.astype(int) - v.astype(int)).max()
                    lineish = lambda v: dist(v, rc_) < min(dist(v, oc), dist(v, ic))
                    hp = [a[P(dy, R + 1)] if inside(dy, R + 1) else oc for dy in range(th)]
                    vp = [a[P(R + 1, dx)] if inside(R + 1, dx) else oc for dx in range(tv)]
                    # each line runs into the corner as far as the other line's outer edge
                    ov = next((i for i, v in enumerate(vp) if lineish(v)), 0)
                    oh = next((i for i, v in enumerate(hp) if lineish(v)), 0)
                    for dy, v in enumerate(hp):
                        if not lineish(v): continue
                        for dx in range(ov, R + 1):
                            if inside(dy, dx): out[P(dy, dx)] = v
                    for dx, v in enumerate(vp):
                        if not lineish(v): continue
                        for dy in range(oh, R + 1):
                            if inside(dy, dx): out[P(dy, dx)] = v
                else:
                    cc = np.median(a[C], axis=0).astype(np.int16)  # this shape's own colour
                    for (y, x) in pts:
                        fills.append((y, x, cc))   # solid shapes are painted last, over outlines
                n += 1
    for (y, x, cc) in fills:
        out[y, x] = cc; changed[y, x] = True
    Image.fromarray(out.astype(np.uint8)).save(dst, optimize=True)
    if dbg:
        d = (out * 0.35 + 165).astype(np.uint8); d[changed] = (255, 0, 0)
        d = ndimage.binary_dilation(changed, iterations=3)
        v = (out * 0.45 + 140).astype(np.uint8); v[d] = (255, 0, 0)
        Image.fromarray(v).save(dbg)
    return n

if __name__ == "__main__":
    print(process(*sys.argv[1:]), "corners", sys.argv[1])
