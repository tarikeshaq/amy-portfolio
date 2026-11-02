# amy-portfolio — agent briefing

Static portfolio site for Amy (product designer), built from the Figma file
[`4Ib6tw9S9Db1VKo6OWtzsF`](https://www.figma.com/design/4Ib6tw9S9Db1VKo6OWtzsF/Untitled),
section **"[For babe] Final Portfolio"** (node `3197:12285`).

Keep this file short. Detail lives in [`docs/`](docs/README.md).

## Where things are

- `docs/` — canonical documentation. Start at [`docs/README.md`](docs/README.md).
- `docs/adr/` — Architecture Decision Records. Check here before reversing a pattern.
- `design/` — snapshot of the Figma source (screenshots, design context, raw assets). Reference only; the site never imports from here.
- `TECH_DEBT.md` — known shortcuts. Add to it in the same commit as the shortcut.

## Workflow

- Version control is **jj** (colocated with git). Never run raw `git`. Conventional commits (`type(scope): subject`).
- Mini-milestones: each commit builds and passes tests. Push often.
- New decision a future reader might "fix" by mistake → new ADR in `docs/adr/` in the same commit.
- Update the matching `docs/` page in the same change as the code.
- UI changes are verified visually (screenshots at desktop and mobile widths), not just by tests.
