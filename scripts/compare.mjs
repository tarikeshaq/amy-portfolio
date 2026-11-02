#!/usr/bin/env node
// Side-by-side image of the Figma render and a screenshot of the build, scaled to the
// same height, for eyeballing layout drift.
//
//   node scripts/compare.mjs design/screenshots/home.png /tmp/shots/home-desktop.png /tmp/home-sbs.png [height=2000]
//
// Optional crop of both inputs (in source px at 1440 width) to zoom into a band:
//   CROP_TOP=900 CROP_HEIGHT=1600 node scripts/compare.mjs ...
import sharp from "sharp";

const [a, b, out, h = "2000"] = process.argv.slice(2);
if (!out) throw new Error("usage: compare.mjs <design.png> <build.png> <out.png> [height]");
const top = Number(process.env.CROP_TOP ?? 0);
const cropH = process.env.CROP_HEIGHT ? Number(process.env.CROP_HEIGHT) : undefined;
const H = Number(h);

const load = async (file) => {
  let img = sharp(file);
  if (cropH) {
    const { width, height } = await img.metadata();
    img = sharp(await img.extract({ left: 0, top, width, height: Math.min(cropH, height - top) }).toBuffer());
  }
  return img.resize({ height: H }).png().toBuffer({ resolveWithObject: true });
};
const imgs = await Promise.all([load(a), load(b)]);
const gap = 16;
const width = imgs.reduce((s, i) => s + i.info.width, 0) + gap;
const [left, right] = imgs;
await sharp({ create: { width, height: H, channels: 3, background: "#ff00ff" } })
  .composite([
    { input: left.data, left: 0, top: 0 },
    { input: right.data, left: left.info.width + gap, top: 0 },
  ])
  .png()
  .toFile(out);
console.log(out);
