#!/usr/bin/env node
// Full-page screenshots of the built site at desktop (1440) and mobile (390) widths,
// for side-by-side comparison with design/screenshots/. Needs `npm run preview` running.
//
//   node scripts/shoot.mjs <out-dir> [path ...]      e.g. node scripts/shoot.mjs /tmp/shots / /about/
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const [outDir, ...paths] = process.argv.slice(2);
if (!outDir) throw new Error("usage: shoot.mjs <out-dir> [path ...]");
const base = process.env.BASE_URL ?? "http://localhost:4173";
const widths = { desktop: 1440, mobile: 390 };

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
for (const path of paths.length ? paths : ["/"]) {
  for (const [name, width] of Object.entries(widths)) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    await page.goto(base + path, { waitUntil: "networkidle" });
    // Load lazy images, then return to the top.
    await page.evaluate(async () => {
      document.querySelectorAll('img[loading="lazy"]').forEach((img) => (img.loading = "eager"));
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 100));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForFunction(() => [...document.images].every((img) => img.complete));
    await page.waitForLoadState("networkidle");
    const slug = path.replace(/^\/|\/$/g, "").replaceAll("/", "_") || "home";
    const file = `${outDir}/${slug}-${name}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log(file);
    await page.close();
  }
}
await browser.close();
