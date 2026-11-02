#!/usr/bin/env node
// Converts design snapshot images (design/assets/**) into web-ready WebP files
// under assets/images/ (imported statically by pages). Outputs are committed; re-run after re-exporting from Figma.
//
//   node scripts/optimize-images.mjs            # all entries
//   node scripts/optimize-images.mjs about/     # only entries whose dest starts with "about/"
//
// Each entry: [source under design/assets, dest under assets/images (no ext), max width px, crop?].
// `crop` reproduces a Figma image-fill crop on the raw (transparent) source, because
// Figma node exports flatten transparency onto a background.
// Max width is ~2x the largest rendered width so images stay sharp on retina screens.
import { mkdir, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import sharp from "sharp";
import { entries as caseStudyEntries } from "./image-manifest.mjs";

const SRC = "design/assets";
const OUT = "assets/images";

/** @typedef {{ left: number, top: number, width: number, height: number }} Crop */
/** @type {Array<[string, string, number, Crop?]>} */
const entries = [
  // Figma 3109:10115: fill at w 106.89% / h 125.31%, offset -6.89% / -1.86% of a 755x644 box.
  ["components/footer-orchid.png", "footer-orchid", 1510, { left: 66, top: 15, width: 958, height: 817 }],
  ["home/hero-orchid-frame@2x.png", "home/hero-orchid", 1814],
  // Figma 3081:3781: fill at w 151.51% / h 169.85%, offset -18.07% / -69.8% of a 201x216 box.
  ["home/stickfigure.png", "home/stickfigure", 403, { left: 70, top: 289, width: 385, height: 414 }],
  ["home/work-compute-costs@2x.png", "home/work-compute-costs", 2312],
  ["home/work-thought-partner@2x.png", "home/work-thought-partner", 2312],
  ...caseStudyEntries,
];

const filter = process.argv[2] ?? "";
let count = 0;
for (const [src, dest, maxWidth, crop] of entries) {
  if (!dest.startsWith(filter)) continue;
  const out = join(OUT, `${dest}.webp`);
  await mkdir(dirname(out), { recursive: true });
  let img = sharp(join(SRC, src));
  if (crop) img = sharp(await img.extract(crop).toBuffer());
  const info = await img
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(out);
  const { size } = await stat(out);
  console.log(`${out}  ${info.width}x${info.height}  ${(size / 1024).toFixed(0)} KiB`);
  count++;
}
console.log(`${count} image(s) written`);
