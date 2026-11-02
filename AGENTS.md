# amy-portfolio — agent briefing

Static portfolio site for Amy Zeng (AI product designer), built from the Figma file
[`4Ib6tw9S9Db1VKo6OWtzsF`](https://www.figma.com/design/4Ib6tw9S9Db1VKo6OWtzsF/Untitled),
section **"[For babe] Final Portfolio"** (node `3197:12285`).

Keep this file short. Detail lives in [`docs/`](docs/README.md).

## Stack
Next.js 16 static export + Tailwind v4 + Playwright ([ADR 0003](docs/adr/0003-nextjs-static-export.md)).
**This Next version has breaking changes vs. older training data: read the relevant guide in
`node_modules/next/dist/docs/` before writing Next code.**

## Where things are
- `docs/`: canonical documentation. Start at [`docs/README.md`](docs/README.md); commands in [`docs/development.md`](docs/development.md).
- `docs/adr/`: Architecture Decision Records. Check here before reversing a pattern.
- `design/`: snapshot of the Figma source (screenshots, layer dumps, raw assets). Reference only; never imported.
- `TECH_DEBT.md`: known shortcuts. Add to it in the same commit as the shortcut.

## Workflow
- **Green check before every commit:** `npm run check` (lint, typecheck, build, e2e).
- Version control is **jj** (colocated with git). Never run raw `git`. Conventional commits (`type(scope): subject`).
  Repo-local `snapshot.max-new-file-size` is 10 MiB for design assets.
- Mini-milestones: each commit builds and passes tests. Push often.
- New page → add it to `e2e/routes.ts`.
- UI changes are verified visually against `design/screenshots/` at 1440 and 390 widths
  (`scripts/shoot.mjs`, `scripts/compare.mjs`, `scripts/measure.mjs`), not just by tests.
- New decision a future reader might "fix" by mistake → new ADR in `docs/adr/` in the same commit.
- Update the matching `docs/` page and `docs/worklog.md` in the same change as the code.
