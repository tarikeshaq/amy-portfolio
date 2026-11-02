# 0004. Responsive strategy for a desktop-only design

- Status: Accepted
- Date: 2026-11-01

## Context
Figma has only 1440px frames. The site must work on phones and tablets without a
mobile design, and stay faithful to the desktop design at 1440. The pages mix
three kinds of layout: flowing text sections, free-form collages (About, case-study
heroes), and dense product mockups exported as images (ADR 0002).

## Decision
We will apply one rule per kind of layout:

1. **Type** uses `clamp()` utilities (`text-display`, `text-subheading`, …) that hit the
   Figma px size at 1440 and shrink to a readable minimum.
2. **Text measures** are Figma widths converted to `em` of the element's own font size
   (`H2 w={…}`, `P w={…}`), so line breaks track Figma at any viewport width.
3. **Flowing sections** keep Figma's vertical rhythm (336 / 168 / 96 / 48px) as
   `clamp()` margins; multi-column rows (`Columns`) keep Figma proportions from `lg`
   up and stack below it.
4. **Free-form compositions** (`Collage`/`Piece`) use Figma coordinates in
   container-query units from `lg` up, so they scale as a unit; below `lg` they
   become a 2-column grid with per-piece ordering.
5. **Dense diagrams** that would be illegible when shrunk (`Figure scrollMin`) scroll
   horizontally on small screens with a "scroll sideways" hint, instead of shrinking.
6. **Composite mockups** with a phone-friendly decomposition available (escape-hatch
   comparison) swap to the individual panels with their annotations as live text
   below `md`.

## Alternatives considered
- **Scale the whole 1440 page down** (CSS transform / viewport meta): pixel-perfect,
  but text becomes unreadable on phones and the page is not accessible.
- **Fixed px widths with breakpoints per page**: many magic numbers, and line breaks
  drift from Figma at every width.
- **Shrink all images to fit**: product mockups become unreadable at 390px.

## Consequences
- Desktop layout is faithful (positions within a few px of Figma; residual drift
  comes from the Source Serif 4 substitution).
- Mobile layouts are our interpretation and should be reviewed by the designer.
- The 1024px Playwright project exists because that is where collages switch layout.
