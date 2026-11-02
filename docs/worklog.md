# Work log

Newest first. One entry per milestone.

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
