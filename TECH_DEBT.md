# Tech debt

Shortcuts taken on purpose. Each entry: what, why, and what "fixed" looks like.

- **Placeholder contact links** (`lib/site.ts`): `email`, `linkedin` and `resume`
  are placeholders; there's no `public/resume.pdf` yet. Fixed: real values from
  Amy, the resume PDF in `public/`, and a test that the RESUME link resolves.
- **Mobile layouts are interpreted, not designed.** Figma only has 1440px frames.
  Fixed: Amy reviews the 390px screenshots (or adds mobile frames) and we adjust.
