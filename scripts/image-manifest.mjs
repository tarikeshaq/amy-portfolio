// Per-page image entries, kept separate from the shared ones in optimize-images.mjs.
// Crops are derived from each Figma image fill: a fill drawn at w%/h% with offset
// left%/top% inside a WxH box shows source pixels starting at (-left*W, -top*H) * scale,
// where scale = sourceWidth / (w*W). Box sizes and node ids are noted per entry.
/** @type {Array<[string, string, number, { crop?: { left: number, top: number, width: number, height: number }, mask?: string, rotate?: number }?]>} */
export const entries = [
  // --- About (3081:3736) ---
  // 3081:3757 IMG_0687, 739x787 fill box, shown through a 327x583 bottom-aligned window.
  ["about/IMG_0687.jpg", "about/portrait", 654, { crop: { left: 1, top: 887, width: 1421, height: 2534 } }],
  // 3081:3747/3748/3749: object-cover in 285x379, no crop needed.
  ["about/IMG_4337.jpg", "about/jewelry-1", 570],
  ["about/IMG_4543.jpg", "about/jewelry-2", 570],
  ["about/IMG_4485.jpg", "about/jewelry-3", 570],
  // 3081:3750 IMG_4356 ring, 884x944 box.
  ["about/IMG_4356.png", "about/ring", 1020, { crop: { left: 65, top: 0, width: 955, height: 1020 } }],
  // 3081:3737 IMG_5268, 275x423 box.
  ["about/IMG_5268.png", "about/vintage-vase", 550, { crop: { left: 410, top: 0, width: 2662, height: 4096 } }],
  // 3081:3755 IMG_5118, 379x383 box, alpha-masked by an SVG blob.
  ["about/IMG_5118.png", "about/vintage-tray", 758, {
    crop: { left: 580, top: 1652, width: 1873, height: 1894 },
    mask: "about/IMG_5118-mask.svg",
  }],
  // 3081:3767 IMG_5203, 182x295 box.
  ["about/IMG_5203.png", "about/vintage-chair", 364, { crop: { left: 383, top: 617, width: 441, height: 715 } }],
  // 3081:3739 3E201385, 565x751 box.
  ["about/3E201385.jpg", "about/beach", 1130, { crop: { left: 347, top: 1375, width: 2390, height: 3176 } }],
  // 3081:3751 IMG_9243, 249x471 box.
  ["about/IMG_9243.png", "about/cat-orange", 498, { crop: { left: 581, top: 1069, width: 1461, height: 2763 } }],
  // 3081:3752 IMG_5202, 559x564 box rotated -35.5deg (bounding box 782.6x783.8).
  ["about/IMG_5202.png", "about/cat-black", 1066, { crop: { left: 0, top: 175, width: 759, height: 766 }, rotate: -35.5 }],
];
