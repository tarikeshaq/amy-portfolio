# Tech debt

Shortcuts taken on purpose. Each entry: what, why, and what "fixed" looks like.

- **Placeholder resume link** (`lib/site.ts`): `resume` is a placeholder; there's
  no `public/resume.pdf` yet. Fixed: the resume PDF in `public/` and a test that
  the RESUME link resolves.
- **Mobile layouts are interpreted, not designed.** Figma only has 1440px frames.
  Fixed: Amy reviews the 390px screenshots (or adds mobile frames) and we adjust.
- **Source Serif 4 instead of Source Serif Pro.** Figma's body font isn't on Google
  Fonts any more; its successor sets slightly wider, so body text wraps about a word
  earlier than in Figma. Fixed: self-host Source Serif Pro (license permits) if Amy
  wants exact wrapping.
- **Possible copy typos kept verbatim.** The extraction flagged likely typos in the
  Figma copy (e.g. "trust from only policy-makers" with a doubled "only", "a weak
  signal that need", "fell [30%]" with literal brackets, "followup" vs "follow-ups").
  Full lists are at the end of `design/extracted/*.md`. Some are baked into
  images ("Euclidian graph", "feel like they are in control"). Fixed: Amy confirms
  each, we edit the page copy and re-export the affected images from Figma.
