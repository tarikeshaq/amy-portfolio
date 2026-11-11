# Work log

Newest first. One entry per milestone.

## 2026-11-10 — Resume link

- RESUME in the top nav now opens Amy's resume on Google Drive in a new tab
  (`lib/site.ts`), replacing the placeholder `/resume.pdf`. Tech-debt entry removed.

## 2026-11-06 — About portrait crop

- The "As a designer" portrait now frames higher in the original photo, matching Amy's
  reference crop: same size on the page, with more of the room above her
  (`scripts/image-manifest.mjs`, `assets/images/about/portrait.webp`).

## 2026-11-06 — Matrix circle and About page trim

- Compute costs value/cost matrix: the green circle is baked into the image, so it was
  repainted to clear all text. New source `05-cost-value-quadrant-recircled@2x.png`; the
  Figma snapshot `05-cost-value-quadrant@2x.png` is kept untouched. The part of the Gantt
  sketch the old circle hid is a reconstruction, as the raw photo isn't in the repo.
- About page: removed the pets section and its three photos (horse, two cats). Their
  originals stay in `design/assets/about/`.

## 2026-11-04 — Footer orchid motion blur

- The footer orchid now has a sideways camera-motion blur: an SVG `feGaussianBlur`
  in `components/Footer.tsx`, blurring horizontally only. The hero orchid is unchanged.

## 2026-11-03 — Hand-drawn favicon

- Browser-tab icon is now Amy's hand-drawn face (`app/icon.png`, replacing `app/icon.svg`).
  Transparent background at Amy's request, so the black lines are hard to see on dark browser tabs.

## 2026-11-02 — Compute-costs outcome copy

- Removed the literal square brackets around "30%" in the Outcome row of the compute-costs case study.

## 2026-11-01 — LinkedIn link

- Footer "Find me on Linkedin" now points to Amy's profile (`site.linkedin` in `lib/site.ts`).

## 2026-11-01 — Contact opens email

- Real email address in `lib/site.ts`; the nav CONTACT link and footer "Email me"
  both open a `mailto:` to it (CONTACT previously scrolled to the footer).

## 2026-11-01 — Agent workflow for Amy

- `AGENTS.md` rewritten for an agent working with a designer: plain language, one
  request = one PR, preview link back, Amy merges ([ADR 0006](adr/0006-designer-driven-changes-via-agent-prs.md)).
- `docs/agent-playbook.md` (where-things-are map, recipes, checks, troubleshooting) and
  `docs/for-amy.md` (Amy's guide).
- `scripts/preview.mjs` finds the Vercel preview for a PR and writes it into the PR description.
- PR template; `.claude/settings.json` pre-approves routine commands, denies pushes to
  `main` / force-pushes, and asks before merging.
- Documented the Vercel Hobby limits on collaborator previews in `deployment.md`.

## 2026-11-01 — Deployment prep

- Hosting decision: Vercel via GitHub integration ([ADR 0005](adr/0005-host-on-vercel.md)); setup in [deployment.md](deployment.md).
- GitHub Actions `ci.yml` runs `npm run check` on PRs and pushes to `main`.
- `engines.node >= 20.9` (Next 16 minimum).

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
