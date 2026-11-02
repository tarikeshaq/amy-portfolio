# Design snapshot

Frozen copy of the Figma source so the build can be reviewed without Figma access.
Source: Figma file `4Ib6tw9S9Db1VKo6OWtzsF`, section **"[For babe] Final Portfolio"** (node `3197:12285`),
snapshotted 2026-11-01.

The site never imports from this directory. Assets used at runtime are copied
(and optimised) into `public/`.

| Path | What |
|---|---|
| `screenshots/` | 1:1 renders of each 1440px-wide desktop frame — the visual target. |
| `context/` | Raw Figma design-context / layer-tree dumps for the large frames. |
| `assets/<page>/` | Source images and 2x exports of UI-mockup visuals, per page. |
| `extracted/` | Per-page copy + layout outlines derived from the Figma layers. |

## Frames

| Page | Figma node | Screenshot |
|---|---|---|
| Home | `3081:3777` | [home.png](screenshots/home.png) |
| About | `3081:3736` | [about.png](screenshots/about.png) |
| Case study: compute costs (`V2 Case study: new feature`) | `3058:1633` | [case-study-compute-costs.png](screenshots/case-study-compute-costs.png) |
| Case study: thought partner (`Case study: iterate`) | `3058:1236` | [case-study-thought-partner.png](screenshots/case-study-thought-partner.png) |
| Components (top nav variants, footer) | `3197:12283` | [components.png](screenshots/components.png) |

## Design tokens (from Figma styles)

| Token | Value |
|---|---|
| Background | `#EAE6F0` |
| Dark accent | `#320E3B` |
| Light accent | `#C5D86D` |
| Light accent 2 | `#D8DFAF` |
| Default text | `#3E3E3D` |
| Header | Inter Medium 80px, letter-spacing -8% |
| Body | Source Serif Pro Regular 20px |
