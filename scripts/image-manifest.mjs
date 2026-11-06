// Per-page image entries, kept separate from the shared ones in optimize-images.mjs.
// Crops are derived from each Figma image fill: a fill drawn at w%/h% with offset
// left%/top% inside a WxH box shows source pixels starting at (-left*W, -top*H) * scale,
// where scale = sourceWidth / (w*W). Box sizes and node ids are noted per entry.
/** @type {Array<[string, string, number, { crop?: { left: number, top: number, width: number, height: number }, mask?: string, rotate?: number }?]>} */
export const entries = [
  // --- About (3081:3736) ---
  // 3081:3757 IMG_0687, 327x583 window. Top set to Amy's reference crop (shows more of the room above her).
  ["about/IMG_0687.jpg", "about/portrait", 654, { crop: { left: 1, top: 486, width: 1421, height: 2534 } }],
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

  // --- Case studies: 2x Figma exports (opaque, page background baked in). See design/extracted/<slug>.md ---
  ["compute-costs/01-hero-bubble-and-gantt-charts@2x.png", "work/compute-costs/01-hero-bubble-and-gantt-charts", 2216],
  ["compute-costs/02-summary-kenya-gantt-chart@2x.png", "work/compute-costs/02-summary-kenya-gantt-chart", 1568],
  ["compute-costs/03-three-task-cards@2x.png", "work/compute-costs/03-three-task-cards", 2038],
  ["compute-costs/04-sample-chat-four-turns@2x.png", "work/compute-costs/04-sample-chat-four-turns", 1192],
  ["compute-costs/05-cost-value-quadrant@2x.png", "work/compute-costs/05-cost-value-quadrant", 2418],
  ["compute-costs/06-before-text-chat-kenya-timeline@2x.png", "work/compute-costs/06-before-text-chat-kenya-timeline", 814],
  ["compute-costs/07-after-kenya-gantt-chart@2x.png", "work/compute-costs/07-after-kenya-gantt-chart", 1154],
  ["compute-costs/08-before-text-chat-west-africa-conservation@2x.png", "work/compute-costs/08-before-text-chat-west-africa-conservation", 814],
  ["compute-costs/09-after-west-africa-bubble-chart@2x.png", "work/compute-costs/09-after-west-africa-bubble-chart", 1154],
  ["compute-costs/10-next-project-thought-partner-chat@2x.png", "work/compute-costs/10-next-project-thought-partner-chat", 1520],
  ["thought-partner/01-hero-thought-partner-chat@2x.png", "work/thought-partner/01-hero-thought-partner-chat", 1634],
  ["thought-partner/02-citation-format-examples@2x.png", "work/thought-partner/02-citation-format-examples", 1096],
  ["thought-partner/03-chatbot-citations-before@2x.png", "work/thought-partner/03-chatbot-citations-before", 1252],
  ["thought-partner/04-knowledge-base-disclaimer@2x.png", "work/thought-partner/04-knowledge-base-disclaimer", 1342],
  ["thought-partner/05-trust-levers-diagram@2x.png", "work/thought-partner/05-trust-levers-diagram", 2880],
  ["thought-partner/06-stage-1-problem-statement@2x.png", "work/thought-partner/06-stage-1-problem-statement", 976],
  ["thought-partner/07-stage-2-root-cause-questions@2x.png", "work/thought-partner/07-stage-2-root-cause-questions", 1110],
  ["thought-partner/08-escape-hatch-comparison@2x.png", "work/thought-partner/08-escape-hatch-comparison", 2640],
  ["thought-partner/09-pov-less-context-panel@2x.png", "work/thought-partner/09-pov-less-context-panel", 1008],
  ["thought-partner/10-pov-more-context-panel@2x.png", "work/thought-partner/10-pov-more-context-panel", 1008],
  ["thought-partner/11-next-project-compute-costs@2x.png", "work/thought-partner/11-next-project-compute-costs", 1520],
];
