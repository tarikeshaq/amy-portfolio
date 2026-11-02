import type { NextConfig } from "next";

// Fully static site: `next build` emits plain HTML/CSS/JS into `out/`.
// See docs/adr/0003-nextjs-static-export.md.
const nextConfig: NextConfig = {
  output: "export",
  // Images are pre-optimised by scripts/optimize-images.mjs; there is no
  // image server in a static export.
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
