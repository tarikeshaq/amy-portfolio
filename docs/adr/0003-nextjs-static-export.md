# 0003. Next.js static export with Tailwind; Playwright for tests

- Status: Accepted
- Date: 2026-11-01

## Context
A personal portfolio: four pages, no backend, no user data. The owner wants a
local `npm` workflow now and an easy deploy later (Vercel was suggested). The
design is a fixed 1440px desktop Figma file and must also work on phones.

## Decision
We will use **Next.js 16 (App Router) with `output: "export"`**, TypeScript, and
**Tailwind CSS v4** with the Figma styles as `@theme` tokens. `next build`
emits plain static files in `out/`.

- Images are pre-optimised to WebP by `scripts/optimize-images.mjs` (sharp) and
  imported statically, so Next knows their dimensions; `images.unoptimized` is on
  because a static export has no image server.
- Fonts come from `next/font/google`, self-hosted at build time. Figma uses Source
  Serif Pro, which Google Fonts now ships as **Source Serif 4**.
- Type sizes use `clamp()` so they hit the Figma px values at 1440px and scale
  down on phones (`text-display`, `text-title`, `text-label`, `text-body` in `app/globals.css`).
- Tests are **Playwright** end-to-end checks against the served `out/` directory:
  every route renders, has no console errors, no horizontal overflow, and every
  image loads, at desktop (1440), tablet (1024, the collage breakpoint) and mobile (iPhone 13) sizes.

## Alternatives considered
- **Astro / Eleventy**: excellent for static sites, but Next is what the owner
  named, is the default web stack in this account, and deploys to Vercel with zero config.
- **Next.js with a server (default output)**: nothing here needs one; static
  output can be hosted anywhere (Vercel, GitHub Pages, GCS) and can't break at runtime.
- **next/image default loader**: not available in a static export; a third-party
  image CDN is unnecessary for ~40 images.
- **Unit tests (Vitest)**: there is almost no logic; the risk is layout and
  broken assets, which only a browser test catches.

## Consequences
- No server features: redirects, headers, middleware, and API routes are off the
  table unless we drop `output: "export"` (new ADR).
- Re-exporting an image from Figma means re-running `npm run images`.
- Next 16 differs from older Next; agents must read `node_modules/next/dist/docs/` first (see AGENTS.md).
