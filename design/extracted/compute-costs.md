# Case study: compute costs — content & layout outline

- **Figma frame:** `V2 Case study: new feature`, node `3058:1633`, file `4Ib6tw9S9Db1VKo6OWtzsF`, 1440 × 10547.
- **Page title:** "Cutting compute costs by 30% by redesigning AI responses around common tasks"
- **Visual reference:** [`design/screenshots/case-study-compute-costs.png`](../screenshots/case-study-compute-costs.png)
- **Page background:** `#EAE6F0` (Background). Cards and panels: `#FAFAFA` (Background 2).
- **Text colour:** everything is `#320E3B` (Dark accent) unless noted. Highlight boxes are `#320E3B` with `#D8DFAF` (Light accent 2) text.

## Grid and margins observed (at 1440)

- **Narrative column:** left-aligned at **x = 60** (frames use `padding-inline: 60px`). Headings are 922–1015 px wide and body text 877–935 px wide, so roughly 60 → 1075, with the right side of the page left empty.
- **Centred column:** the summary block (603 px wide, x = 418.5) and the summary image (784 px, x = 328) are centred on the page.
- **Two-column rows:** they start at x = 60 and use 464 + 48 + 596 or 535 + 25/85 + 577 (see below).
- **Hero:** the title sits at x = 20. A 1108 px wide visual panel runs to the right edge (x 328–1436).
- **Vertical rhythm:** there are three repeating gaps.
  - **336 px** between major chapters.
  - **168 px** between sections inside a chapter.
  - **48 px** between a section's text and its visual.
- **Line height:** Figma reports `lineHeight: 100` for every style, which renders as `line-height: normal` (≈1.2). Measured line boxes: 80px → 97px, 40px → 48px, 24px → 30px, 20px → 25px, 12px → 15px.

## Type scale (each distinct text style once)

| Name (Figma style) | Family / weight | Size | Letter-spacing | Colour | Used for |
|---|---|---|---|---|---|
| Header | Inter Medium (500) | 80px | -6.4px (-8%) | #320E3B | page title |
| Subheader | Inter Medium (500) | 40px | -3.2px (-8%) | #320E3B (or #D8DFAF in highlight box) | section headings, "Summary" |
| Subheader 2 | Source Serif Pro SemiBold (600) | 24px | 0 | #320E3B; black in stats card; #EAE6F0 in teaser | summary row labels, quoted prompts, "Stats", stat values, teaser title |
| Body | Source Serif Pro Regular (400) | 20px | 0 | #320E3B; #EAE6F0 in teaser | paragraphs, before/after captions, "See next project" |
| Diagram | Inter Medium (500) | 12px | -0.96px (-8%) | #320E3B; black in stats card; #EAE6F0 in teaser | meta lines, summary values, eyebrow labels ("Before"/"After"), image captions, stat labels |
| Diagram Bold | Inter Bold (700) | 12px | -0.96px | #320E3B | "AI Product design " (hero meta, first line only) |
| Nav (shared chrome) | Inter Medium (500) | 24px | -1.92px (-8%) | #D8DFAF on #320E3B | top nav |

---

## Shared chrome

- **Top nav** (instance `3101:10022`, 1440 × 101, y = 0) is overlaid on the hero, top-right: `padding: 36px 24px`, items right-aligned. **Active item: WORK** (`#D8DFAF` background, `#320E3B` text). HOME, ABOUT, RESUME and CONTACT use `#D8DFAF` text on the `#320E3B` bar. The nav overlaps the top-right of the hero panel.
- **Footer** (instance `3151:10203`, 1440 × 644, y = 9903 to 10547) is the standard orchid + "Find me on Linkedin" / "Email me" / "Designed and built by Amy Zeng © 2026" footer. It starts at y = 9903, which is **120 px above the bottom of the next-project teaser** (teaser ends y = 10023), so the orchid overlaps the teaser's bottom-left and is drawn on top of it.

---

## Blocks (top → bottom)

### 1. Hero — page title + meta (overlaps the hero visual)
- **Type:** page title + meta list
- **Node:** `3058:1635` (in group `Hero` `3101:10049`)
- **Layout:** x = 20, width 715, y = 51 to 628. Flex column with a 16 px gap between the title and the meta list. The meta list is a column with an 8 px gap. Left-aligned. **The title is layered on top of the hero visual (block 2)**: it overlaps the panel from x 328 to 735 and y 51 to 536.
- **Copy:**
  - Title (Header, 80px, 5 lines at 715 px):
    `Cutting compute costs by 30% by redesigning AI responses around common tasks` (Figma has a trailing space)
  - Meta (Diagram 12px):
    1. **`AI Product design `**: Inter **Bold**, with a trailing space in Figma
    2. `Role: lead product designer`: Inter Medium
    3. `Team: product manager, data scientist, 2 engineers, policy consultant`: Inter Medium, fixed width 299 px (wraps after "policy")

### 2. Hero visual — bubble chart + Gantt chart composite
- **Type:** image (hero visual panel)
- **File:** `design/assets/compute-costs/01-hero-bubble-and-gantt-charts@2x.png` (2216 × 1444)
- **Source nodes:** panel `3058:1634` (the `#FAFAFA` panel holding the Gantt rows `3060:2150`) plus bubble chart `3060:3339`. These are **two sibling layers in the Hero group, with no single parent that excludes the title**. I composited them: the bubble chart, rendered from a transparent PDF export, is placed at panel offset (60, 36).
- **Displayed:** 1108 × 722 at x = 328, y = 0, running flush to the right edge (x 1436). The top nav sits over its top-right corner and the title over its left part.
- **Alt:** "PolicyCopilot visualisations: a bubble chart of policies plotted by approval date (2014 to present) against relevancy, with bubbles sized and coloured by funding and issuing body and a detail card open for the West Africa Pilot Community-based Natural Resources & Wildlife Management Project; below it, a Gantt timeline of six Kenyan youth-employment policies (Kenya Vision 2030, National Youth Employment Action Plan, Youth Development Policy, TVET Act, National Youth Policy, National Employment Policy) from 2004 to present."

### 3. Intro paragraph
- **Type:** body paragraph (lede)
- **Node:** `3058:1654`
- **Layout:** x = 328, width 933, y = 726 (4 px below the hero panel), left-aligned. It aligns with the panel's left edge, not with the x = 60 column.
- **Copy (Body 20px):**
  `PolicyCopilot is a tool used by policy-makers to diagnose policy problems. The tool included an AI chat that helped users retrieve evidence from a curated knowledge base.`

### 4. Summary table
- **Type:** summary table (heading + 3 label/value rows)
- **Node:** `3058:1642` → inner `3107:10106`
- **Layout:** centred column, x = 418.5, width 603, y = 944 to 1154. **Gap from the previous block: 168.** Column with a 24 px gap between the heading and the rows. Rows are stacked with a 24 px gap. Each row is a flex row (`align-items: center`, gap 12) of a label (fixed width 120) and a value (single line, `nowrap`).
- **Copy:**
  - Heading (Subheader 40px): `Summary`
  - Rows (label: Subheader 2, Source Serif Pro SemiBold 24 · value: Diagram, Inter Medium 12):
    | Label | Value |
    |---|---|
    | `Context` | `A new partnership would bring 100+ users we couldn't afford to support at current compute costs` |
    | `Approach` | `Users were expensive because answers didn't fit their task, so they kept asking follow-ups` |
    | `Outcome` | `Compute cost per task fell [30%], and we supported the partnership within budget` (**literal square brackets** in Figma, no special styling) |
  - The apostrophes are straight (`'`) in Figma.

### 5. Summary image — Kenya Gantt chart
- **Type:** image (product UI screenshot in a card)
- **File:** `design/assets/compute-costs/02-summary-kenya-gantt-chart@2x.png` (1568 × 956)
- **Source node:** `3058:1679`, a `#FAFAFA` card (radius 10.86, padding 10.86) wrapping a raw screenshot fill `3058:1680` "F3 gantt demo 1".
- **Displayed:** 784 × 478, centred at x = 328, y = 1202. **Gap: 48.**
- **Alt:** "PolicyCopilot Gantt chart titled 'Youth unemployment in Kenya', with filters for issuing body (Government of Kenya, Ministry of Labour and Human Resource Development, Ministry of Youth Affairs, Parliament of Kenya, Ministry of Youth Affairs and Sports) and policy status, showing six policies as coloured bars across 2004 to present."
- **Note:** the raw screenshot includes a mouse cursor.

---

### 6. Section — problem framing
- **Type:** section heading + body paragraph
- **Node:** `3101:10052`
- **Layout:** x = 60, width 1015, y = 2016 to 2149. Column with a 12 px gap. **Gap: 336** (from the summary image bottom at 1680).
- **Copy:**
  - H2 (Subheader 40px): `A partnership bringing 100+ new users would have pushed compute costs over budget`
  - Body (20px): `I worked with our engineering team to lower costs without making the product worse`

### 7. Section — heading with highlighted tail
- **Type:** section heading with highlight-box span + body paragraph
- **Node:** `3101:10053` (heading frame `3192:12281`)
- **Layout:** x = 60, y = 2317 to 2523. **Gap: 168.** The heading text is 1015 wide. The highlight span sits on its own line **directly beneath it (0 gap)**. Then a 12 px gap to the body, which is 933 wide.
- **Copy:**
  - H2 (Subheader 40px): `Making each answer less detailed was cheaper but would have backfired because`
  - **Highlight box** (separate line, `#320E3B` background hugging the text, 620 × 48, no padding; text `#D8DFAF`, Subheader 40px): `thinner answers drive more follow-ups`
  - Body (20px): `If answers got thinner, we'd lose the savings in volume while degrading the experience. Before cutting anything, I wanted to understand why users sent so many messages.`

### 8. Section — task analysis
- **Type:** section heading + body paragraph
- **Node:** `3101:10054`
- **Layout:** x = 60, width 933, y = 2691 to 2849. Column with a 12 px gap. **Gap: 168.**
- **Copy:**
  - H2 (40px): `2/3 of messages came from 3 tasks where users had to piece text answers together themselves`
  - Body (20px): `With our data scientist, I analyzed 90 chat sessions and tagged each by what the user was trying to accomplish.`

### 9. Image — three task cards
- **Type:** image (composed group of 3 staggered cards)
- **File:** `design/assets/compute-costs/03-three-task-cards@2x.png` (2038 × 1158)
- **Source node:** `Group 8` `3101:10055`
- **Displayed:** 1019 × 579 at x ≈ 58, y ≈ 2895. The node is 1015 × 575 at (60, 2897); the export adds 2 px on each side for the card strokes. **Gap: 48.**
- Each card is `#FAFAFA` with a thick `#320E3B` border and three grey-green chat-bubble questions inside. The text in the cards is baked into the image: "Task 1 / Mapping stakeholders / Who is involved and how they connect", "Task 2 / Understanding current policies / What is active now and how it overlaps", "Task 3 / Reviewing past policies / What has been tried and when".
- **Alt:** "Three staggered cards showing the three common tasks: Task 1, Mapping stakeholders (who is involved and how they connect); Task 2, Understanding current policies (what is active now and how it overlaps); Task 3, Reviewing past policies (what has been tried and when). Each card lists three example user questions as chat bubbles, such as 'Who are the key funders in this area who I may be able to get funding from?'"

### 10. Two-column row — interview insight + sample chat
- **Type:** two-column text + image row
- **Node:** `3103:10090`
- **Layout:** y = 3640 to 4505. **Gap: 168** (from the task cards at 3472). Left column x = 60, width 464. Right column x = 572, width 596. Column gap 48. Both columns are top-aligned.
- **Left column** (`3192:12278`, a statement with a highlighted tail):
  - Statement (Subheader 40px, width 464, 5 lines): `In 12 user interviews I led, users described asking follow-ups to retrieve dates, reformat lists, or find which policies overlapped`
  - **Highlight box** (directly beneath, 0 gap; `#320E3B` background spanning the full 464 width, 3 lines, 144 tall; text `#D8DFAF`, Subheader 40px): `The answers had the information but not the shape they needed`
- **Right column** (`3060:2053`):
  - Caption / eyebrow (Diagram 12px, at the top, then a 4 px gap): `Sample: Getting the data to the correct “shape” took 4 turns` (curly quotes around "shape")
  - **Image:** `design/assets/compute-costs/04-sample-chat-four-turns@2x.png` (1192 × 1693)
    - Source node: `3058:1683`, a `#FAFAFA` chat panel.
    - Displayed 596 × 846 at x = 572, y = 3659.
    - **Alt:** "Chat transcript in which a user needs four messages to get a usable answer: 'Show me policy timeline for youth unemployment in Kenya' returns long prose paragraphs; 'Can you list them in order by year?' returns a bulleted list; 'Which of these were running at the same time from 2023 and 2024?' returns two lists for 2023 and 2024; 'Which ones are still active as of 2026?' returns another list."

---

### 11. Section — per-message vs per-task cost
- **Type:** section heading + 2 body paragraphs
- **Node:** `3101:10057`
- **Layout:** x = 60, width 935, y = 4841 to 5061. Column with a 12 px gap. **Gap: 336** (from 4505).
- **Copy:**
  - H2 (40px): `Visual answers cost more per message but less per task because one visual replaced on average 2-4 follow-ups` ("2-4" uses a hyphen)
  - Body (20px): `Measured per message, visual answers looked like the wrong direction. Measured per completed task, they were cheaper.` (Figma has a trailing space)
  - Body (20px): `Users also told us visuals were easier to skim and made patterns visible faster. Some said visuals were a reason to choose PolicyCopilot over a general-purpose AI tool.`

### 12. Section — prioritisation
- **Type:** section heading + body paragraph
- **Node:** `3101:10058`
- **Layout:** x = 60, width 933, y = 5229 to 5362. Column with a 12 px gap. **Gap: 168.**
- **Copy:**
  - H2 (40px): `Showing high-value visuals by default and offering costly ones on request kept spending in check`
  - Body (20px): `With an engineer, I plotted each candidate content type by user value and expected compute cost:`

### 13. Image — cost / value quadrant
- **Type:** image (diagram: 2×2 quadrant with sketch cards)
- **File:** `design/assets/compute-costs/05-cost-value-quadrant@2x.png` (2418 × 1160)
- **Source nodes:** this is a composite of three nodes, because no single node contains all of them.
  - `Group 14` `3103:10091`: axes and six cards with photographed paper sketches.
  - The callout `3188:12275`: "These visuals were selected as the ones to build" (`#D8DFAF` pill, Inter Medium 12). It is a sibling of the group in frame `3103:10092`.
  - The hand-drawn green (`#C5D86D`-ish) circle `Vector 7` `3186:12274`. It is a **direct child of the page frame**, at (792, 5608), 350 × 276.
  - The circle overlay was rendered from a transparent PDF export.
- **Displayed:** 1209 × 580 at x = 60, y = 5410. **Gap: 48.** The node is 571 tall; the bottom "Low cost" axis dot overhangs by 9 px.
- **Text baked into the image:**
  - Axis labels: "High cost", "Low cost", "Low user value", "High user value".
  - Cards: "Venn diagram / Best for: stakeholders", "Scatter plot / Best for: current and past policies", "Flowchart / Best for: stakeholders", "Euclidian graph / Best for: stakeholders", "Bubble chart / Best for: current and past policies", "Gantt chart / Best for: current and past policies".
  - The callout.
- **Alt:** "Quadrant chart plotting six candidate visual types by user value (horizontal) and compute cost (vertical), each shown with a photo of its paper sketch: Venn diagram and scatter plot (low value), flowchart (low cost), Euclidian graph (high value, high cost), and bubble chart and Gantt chart (high value, low cost). A hand-drawn green circle surrounds the bubble chart and Gantt chart, with the note 'These visuals were selected as the ones to build'."

---

### 14. Section heading — before/after intro
- **Type:** section heading (no body)
- **Node:** `3058:1660`
- **Layout:** x = 60, width 1197, y = 6317 to 6413. **Gap: 336** (from the frame bottom at 5981; the image's bottom dot ends at 5990).
- **Copy (40px):** `Each visual answered questions users previously needed several follow-ups to answer` (wraps as "follow-" / "ups" at 1197 px)

### 15. Before/after comparison 1 — Kenya timeline
- **Type:** quoted prompt + before/after comparison (two columns, each an eyebrow + caption + image)
- **Node:** `3101:10062`
- **Layout:** y = 6509. **Gap: 96** (from the heading). Prompt, then 32 px, then columns at y = 6571. Before column: x = 60, width 535. After column: x = 680, width 577. **Column gap 85.** Inside each column: eyebrow, 4 px, caption, 12 px, image.
- **Copy:**
  - Quoted prompt (Subheader 2, Source Serif Pro SemiBold 24): `“Show me policy timeline for youth unemployment in Kenya”` (curly quotes)
  - Before eyebrow (Diagram 12px): `Before`
  - Before caption (Body 20px): `Text lists forced users to rebuild the timeline in their heads`
  - After eyebrow (Diagram 12px): `After`
  - After caption (Body 20px, width 549): `The Gantt chart makes order and overlap visible immediately`
- **Before image:** `design/assets/compute-costs/06-before-text-chat-kenya-timeline@2x.png` (814 × 1164)
  - Source node: `3058:1734`. Displayed 407 × 582 at x = 60, y = 6627.
  - **Alt:** "Before: a text-only chat about Kenyan youth unemployment policy, where the user asks four successive questions (the policy timeline, then listing by year, then which ran at the same time in 2023 and 2024, then which are still active as of 2026) and each answer is a paragraph or bulleted list."
- **After image:** `design/assets/compute-costs/07-after-kenya-gantt-chart@2x.png` (1154 × 704)
  - Source node: `3058:1677`, a `#FAFAFA` card wrapping the raw screenshot `3058:1678` "F3 gantt demo 1". Displayed 577 × 352 at x = 680, y = 6627.
  - **Alt:** "After: a single Gantt chart answer, 'Youth unemployment in Kenya', showing six policies as coloured bars from 2004 to present, so order and overlap are visible at a glance."
  - Note: the raw screenshot includes a mouse cursor.

### 16. Before/after comparison 2 — West Africa conservation
- **Type:** quoted prompt + before/after comparison (same component as block 15)
- **Node:** `3101:10066`
- **Layout:** y = 7305. **Gap: 96** (from the end of block 15 at 7209). Prompt, then 32 px, then columns at y = 7367. Before column: x = 60, width 535. After column: x = **620**, width 577. **Column gap 25.** This differs from the 85 in block 15; see Ambiguities. The captions are 2 lines, so the images start at y = 7448.
- **Copy:**
  - Quoted prompt (Subheader 2, 24px): `“What policies have impacted conservation in West Africa from 2016 onwards?”` (curly quotes)
  - Before eyebrow: `Before`
  - Before caption (20px): `Text responses did not reveal patterns and required a new followup question to obtain new information` ("followup" has no hyphen)
  - After eyebrow: `After`
  - After caption (20px, width 549): `Sizing bubbles by funding received showed which projects attract funders without users comparing figures`
- **Before image:** `design/assets/compute-costs/08-before-text-chat-west-africa-conservation@2x.png` (814 × 1388)
  - Source node: `3058:1752`. Displayed 407 × 694 at x = 60, y = 7448.
  - **Alt:** "Before: a text-only chat about West African conservation policy since 2016, where the user asks three successive questions (which policies, then how much funding each initiative obtained, then whether there are patterns in what gets funded) and receives long paragraphs each time."
- **After image:** `design/assets/compute-costs/09-after-west-africa-bubble-chart@2x.png` (1154 × 724)
  - Source node: `3058:1673`, a `#FAFAFA` card wrapping the raw screenshot `3058:1674` "F3 timeline demo V2 1". Displayed 577 × 362 at x = 620, y = 7448.
  - **Alt:** "After: a bubble chart titled 'Conservation in West Africa' plotting projects by approval date (2014 to 2026) and relevancy, with bubbles sized by funding and coloured by issuing body, plus filters for grant amount, issuing body and relevancy."
  - Note: the raw screenshot includes a mouse cursor.

---

### 17. Results — heading + stats card
- **Type:** section heading + metric stats card (3 stats)
- **Node:** `3101:10067`
- **Layout:** x = 60, y = 8477. **Gap: 336** (from the end of block 16 at 8141). Heading width 922, then a 48 px gap, then the stats card.
- **Copy:**
  - H2 (40px): `Cost per task dropped 30% while task completion held steady, so we could onboard all 100+ partnership users`
- **Stats card** (`3058:2033`):
  - Box: `#FAFAFA`, radius 8, padding 28 vertical × 36 horizontal, 631 × 178 at x = 60, y = 8621. Column with a 20 px gap.
  - Title (Source Serif Pro SemiBold 24, **black**): `Stats`
  - Stats: a row with an 80 px gap. Each stat is a column with a 4 px gap: a value pill above a label.
    - Pill: padding 4 × 8, radius 8, Source Serif Pro SemiBold 24, black.
    - Label: Inter Medium 12, -0.96px, black.
    | Value (pill bg) | Label |
    |---|---|
    | `-30%` (`#D8DFAF`) | `change in compute cost per task` |
    | `6 → 2` (`#D8DFAF`; real → arrow U+2192) | `average messages per task` (fixed width 140) |
    | `+45%` (`#EAE6F0`, i.e. the muted/negative stat) | `cost per message` ⏎ `(accepted trade-off)` (a line break, U+2028 in Figma) |

### 18. Reflection
- **Type:** section heading + body paragraph
- **Node:** `3101:10068`
- **Layout:** x = 60, y = 8967 to 9150. **Gap: 168** (from the stats card bottom at 8799). Heading width 922, body width 877, 12 px gap.
- **Copy:**
  - H2 (40px): `The cheapest AI answer is the one that finishes the task in the fewest turns`
  - Body (20px): `If I did this again, I'd measure task success from the beginning rather than relying on message count, since fewer messages can also mean users gave up. Next, I'd explore extending the approach to other task types.`

### 19. Next case study teaser
- **Type:** "next case study" teaser card (whole card is a link)
- **Node:** `3098:8392`, an `<a>` in Figma, linking to the thought-partner case study.
- **Layout:** centred, x = 324, width 792, y = 9486 to 10023. **Gap: 336** (from 9150).
  - Card: `#320E3B` background, 4 px `#320E3B` border, radius 8, padding 16, column with an 8 px gap.
  - Text block (`3098:8393`, width 760): column with a 20 px gap. The title group is a column with a 4 px gap. All text is `#EAE6F0`.
  - The footer overlaps the bottom 120 px of this card (see Shared chrome).
- **Copy:**
  - Eyebrow (Body, Source Serif Pro Regular 20): `See next project`
  - Title (Subheader 2, Source Serif Pro SemiBold 24, **explicit line break**):
    `Turning an AI black box into a thought partner:` ⏎ `drop-off from 70% to 20%`
  - Tag (Diagram, Inter Medium 12): `AI product design`
- **Image:** `design/assets/compute-costs/10-next-project-thought-partner-chat@2x.png` (1520 × 746)
  - Source node: `3098:8397` "Frame 13", a `#FAFAFA` panel with radius 4 and overflow clip.
  - Displayed 760 × 373 at x = 340, y = 9634.
  - Its 4 px corners are flattened onto `#EAE6F0` in the export, so give the `<img>` `border-radius: 4px`.
  - The user bubble is intentionally clipped at the right edge (as in Figma).
  - **Alt:** "Preview of the thought-partner case study: a PolicyCopilot chat where a user asks about youth unemployment in Pakistan and possible underemployment, and the assistant replies with clarifying questions, showing 'Question 1/3: Say more about what work looks like for young people who are counted as employed' with a typed answer and Skip / Next question buttons."

### 20. Footer (shared component, see above)
- y = 9903 to 10547.

---

## Image index

| # | File | Source node(s) | Displayed @1440 |
|---|---|---|---|
| 01 | `design/assets/compute-costs/01-hero-bubble-and-gantt-charts@2x.png` | `3058:1634` + `3060:3339` (composited) | 1108 × 722 |
| 02 | `design/assets/compute-costs/02-summary-kenya-gantt-chart@2x.png` | `3058:1679` | 784 × 478 |
| 03 | `design/assets/compute-costs/03-three-task-cards@2x.png` | `3101:10055` | 1019 × 579 |
| 04 | `design/assets/compute-costs/04-sample-chat-four-turns@2x.png` | `3058:1683` | 596 × 846 |
| 05 | `design/assets/compute-costs/05-cost-value-quadrant@2x.png` | `3103:10091` + `3188:12275` + `3186:12274` (composited) | 1209 × 580 |
| 06 | `design/assets/compute-costs/06-before-text-chat-kenya-timeline@2x.png` | `3058:1734` | 407 × 582 |
| 07 | `design/assets/compute-costs/07-after-kenya-gantt-chart@2x.png` | `3058:1677` | 577 × 352 |
| 08 | `design/assets/compute-costs/08-before-text-chat-west-africa-conservation@2x.png` | `3058:1752` | 407 × 694 |
| 09 | `design/assets/compute-costs/09-after-west-africa-bubble-chart@2x.png` | `3058:1673` | 577 × 362 |
| 10 | `design/assets/compute-costs/10-next-project-thought-partner-chat@2x.png` | `3098:8397` | 760 × 373 |

**About the exports:** the Figma exports flatten transparent areas onto `#EAE6F0`, which is the page background. Rounded card corners therefore blend correctly on the page; only image 10, which sits on the dark teaser card, needs a CSS `border-radius`.

## Ambiguities / notes for the builder

- **Overlapping hero:** the 80px title is layered over the left ~400 px of the hero panel (and the nav over its top-right). At narrower widths you will probably want to stack the title above the visual.
- **Composited images:** 01 and 05 are composites, because their pieces are siblings, or for the green circle a page-level layer, with no common parent that excludes narrative text.
- **Skipped layer:** an empty frame `3101:10046` (1108 × 206 at x 332, y 0) has no content.
- **Inconsistent column gaps:** the before/after columns are 85 px apart in comparison 1 and 25 px apart in comparison 2. That looks unintentional; pick one.
- **Possible copy issues, reported and not fixed:**
  - "Compute cost per task fell **[30%]**" has literal brackets, which may be a placeholder or a highlight that was never applied.
  - "Euclidian graph" (baked into image 05) is usually spelled "Euclidean".
  - "new **followup** question" vs "follow-ups" everywhere else.
  - Hero meta says "AI **P**roduct design" but the teaser tag says "AI **p**roduct design".
  - Trailing spaces on the title, on "AI Product design " and on the first paragraph of block 11.
- **Mouse cursors** appear in the raw product screenshots used in images 02, 07 and 09 (they are part of the source bitmaps).
- **Hero Gantt order:** the hero Gantt lists its rows in a different order from the summary/after Gantt screenshots. That is a design detail, not an error, but it is noted in case it matters.
