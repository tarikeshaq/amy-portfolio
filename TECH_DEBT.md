# Tech debt

Shortcuts taken on purpose. Each entry: what, why, and what "fixed" looks like.

- **Placeholder contact links** (`lib/site.ts`): `email`, `linkedin` and `resume`
  are placeholders; there's no `public/resume.pdf` yet. Fixed: real values from
  Amy, the resume PDF in `public/`, and a test that the RESUME link resolves.
- **Mobile layouts are interpreted, not designed.** Figma only has 1440px frames.
  Fixed: Amy reviews the 390px screenshots (or adds mobile frames) and we adjust.
- **Source Serif 4 instead of Source Serif Pro.** Figma's body font isn't on Google
  Fonts any more; its successor sets slightly wider, so body text wraps about a word
  earlier than in Figma. Fixed: self-host Source Serif Pro (license permits) if Amy
  wants exact wrapping.
