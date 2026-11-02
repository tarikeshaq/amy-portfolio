# 0002. Snapshot Figma into the repo; ship UI mockups as images

- Status: Accepted
- Date: 2026-11-01

## Context
The design lives in Figma. Figma MCP asset URLs expire after 7 days, and
reviewers may not have Figma access. The case studies (~10k px tall each)
contain many product-UI mockups (charts, chat panels, cards) built from
hundreds of tiny Figma layers. They are illustrations of the product, not
interactive parts of the portfolio.

## Decision
We will keep a snapshot of the design in `design/` (frame screenshots, layer
dumps, source images, 2x exports of mockup visuals). We will render all prose
and headings as real HTML text. Product-UI mockups will be exported from Figma
as 2x PNGs and shipped as images.

## Alternatives considered
- Rebuild each mockup in HTML/CSS: thousands of absolutely positioned nodes,
  brittle at mobile widths, no user benefit; the mockups are pictures of another product.
- Ship whole sections as images: text would not be selectable, searchable or
  accessible, and wouldn't reflow on mobile.
- Reference Figma at build time: URLs expire and builds would need Figma credentials.

## Consequences
The repo carries tens of MB of images. Editing a mockup means re-exporting it
from Figma. Every mockup image needs meaningful `alt` text.
