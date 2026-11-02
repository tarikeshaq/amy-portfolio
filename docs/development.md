# Development

## Prerequisites
Node 20+ (developed on 23) and npm. First run: `npm ci && npx playwright install chromium`.

## Commands

| Command | What |
|---|---|
| `npm run dev` | Dev server on http://localhost:3000 |
| `npm run build` | Static export into `out/` |
| `npm run preview` | Serve `out/` on http://localhost:4173 (what tests and scripts use) |
| `npm run check` | The green check: lint, typecheck, build, e2e. Run before every commit. |
| `npm run test:e2e` | Playwright only (starts `serve out` itself; build first) |
| `npm run images` | Regenerate `assets/images/` from `design/assets/` |

## Layout

```
app/                 routes (App Router): /, /about/, /work/<slug>/
components/          shared UI (TopNav, Footer, case-study blocks)
lib/site.ts          site facts: name, links, case-study list
assets/images/       optimised WebP, imported statically by pages (generated, committed)
design/              Figma snapshot (reference only, never imported)
scripts/             image pipeline + visual-check helpers
e2e/                 Playwright tests; e2e/routes.ts lists every page
```

## Adding or changing an image
1. Put the source in `design/assets/<page>/` (raw Figma fill if it has transparency;
   node exports flatten onto a background).
2. Add an entry in `scripts/optimize-images.mjs` (or `scripts/image-manifest.mjs`
   for case studies), with a `crop` when Figma crops the fill.
3. `npm run images`, then `import img from "@/assets/images/..."` and render with `next/image`.

## Checking a page against the design
With `npm run preview` running:

```bash
node scripts/shoot.mjs /tmp/shots /about/                    # full-page PNGs at 1440 and 390
node scripts/compare.mjs design/screenshots/about.png /tmp/shots/about-desktop.png /tmp/sbs.png
CROP_TOP=900 CROP_HEIGHT=1200 node scripts/compare.mjs ...   # zoom into a band
node scripts/measure.mjs /about/ h1 h2 "main img"             # element x/y/w/h vs Figma coordinates
```

Full-page screenshots draw the fixed nav at an odd offset; that's a capture
artifact, not a bug. Check the nav with a viewport screenshot.

## Responsive approach
Figma only has 1440px frames. At ≥768px (`md`) layouts follow Figma; below that,
side-by-side compositions stack and type scales down via `clamp()`. Mobile
layouts are our interpretation. See [TECH_DEBT.md](../TECH_DEBT.md).
