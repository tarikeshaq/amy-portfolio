# Work log

Newest first. One entry per milestone.

## 2026-11-01 — Polish

- Favicon (`app/icon.svg`), styled 404 page, project README.
- E2E: case-study navigation loop, nav WORK anchor, 404 page (60 tests across desktop/tablet/mobile).
- Committed the Next.js agent-rules block that `next dev` appends to AGENTS.md.

## 2026-11-01 — Case studies

- Shared blocks in `components/case-study.tsx` take raw Figma measurements
  (text widths become `em`, image widths cap at Figma px, columns keep proportions).
- Both case studies built from `design/extracted/*.md`; desktop positions track
  Figma to within ~35px over 10,000px (drift is serif line-wrapping, see TECH_DEBT).
- Phones: dense diagrams scroll sideways; the escape-hatch comparison swaps to
  separate panels with live-text annotations ([ADR 0004](adr/0004-responsive-strategy-for-desktop-only-design.md)).
- Footer overlaps the "See next project" card by 120px as in Figma (`<Footer overlap />`).
- `scripts/shoot.mjs` now forces lazy images to load before capturing.

## 2026-11-01 — About page

- `Collage`/`Piece` components: at `lg`+ a 1440-wide coordinate canvas using
  container-query units (1 Figma px = 1/14.4 cqw), so free-form compositions scale
  exactly; below `lg` pieces flow into a 2-column grid.
- About images reproduce Figma's fill crops, the SVG mask on the tray and the
  -35.5° rotation on the black cat in the image pipeline (`scripts/image-manifest.mjs`).
- Desktop positions match Figma to within 1px (`scripts/measure.mjs`).

## 2026-11-01 — Case-study extraction

- Outlines with verbatim copy, typography and layout for both case studies in
  `design/extracted/`, plus 2x exports of every mockup in `design/assets/<slug>/`.
- Possible copy typos found in the design are listed at the end of each outline;
  copy is kept verbatim until Amy confirms.

## 2026-11-01 — Next.js scaffold, shared chrome, home page

- Next.js 16 static export + Tailwind v4 ([ADR 0003](adr/0003-nextjs-static-export.md)).
- Design tokens + fluid type scale in `app/globals.css`; fonts Inter + Source Serif 4.
- `TopNav` (fixed, active state per route) and `Footer` (orchid + sage band + links).
- Home page matched to Figma: element positions within ~2px of the 1440 frame.
- Image pipeline `scripts/optimize-images.mjs`: Figma node exports flatten
  transparency, so the stick figure and footer orchid use raw fills cropped like Figma's.
- Playwright e2e on the built `out/`: render, console errors, overflow, images, active nav (desktop + mobile).
- Stub pages for About and both case studies so links resolve; filled in next.
- Visual-check helpers: `scripts/shoot.mjs`, `compare.mjs`, `measure.mjs`.

## 2026-11-01 — Design snapshot

- Downloaded 1:1 screenshots of all five frames, raw layer dumps for the case
  studies, source photos (About), hero/footer art and 2x exports of the
  home-page work-card visuals into `design/`.
- ADR [0002](adr/0002-figma-snapshot-and-mockups-as-images.md): mockups ship as images, copy as HTML.

## 2026-11-01 — Repo bootstrap

- Created private repo `tarikeshaq/amy-portfolio` (jj, colocated git).
- Added `AGENTS.md`/`CLAUDE.md`, `docs/` with ADR template, `TECH_DEBT.md`.
