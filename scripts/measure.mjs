#!/usr/bin/env node
// Prints the document-space top/left/size of elements matching selectors, to compare
// against Figma frame coordinates. Needs `npm run preview` running.
//
//   node scripts/measure.mjs /about/ "h1" "main img" ...      (WIDTH=1440 by default)
import { chromium } from "@playwright/test";

const [path = "/", ...selectors] = process.argv.slice(2);
const width = Number(process.env.WIDTH ?? 1440);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 900 } });
await page.goto((process.env.BASE_URL ?? "http://localhost:4173") + path, { waitUntil: "networkidle" });
const rows = await page.evaluate((sels) => {
  const out = [];
  for (const sel of sels)
    document.querySelectorAll(sel).forEach((el, i) => {
      const r = el.getBoundingClientRect();
      const text = (el.textContent ?? "").trim().slice(0, 40) || el.getAttribute("alt")?.slice(0, 40) || "";
      out.push(`${sel}[${i}]`.padEnd(28) + `x=${Math.round(r.left + scrollX)} y=${Math.round(r.top + scrollY)} w=${Math.round(r.width)} h=${Math.round(r.height)}  ${text}`);
    });
  out.push(`document height ${document.documentElement.scrollHeight}`);
  return out;
}, selectors);
console.log(rows.join("\n"));
await browser.close();
