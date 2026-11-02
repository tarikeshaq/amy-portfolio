# Case study: thought partner — content & layout outline

Source: Figma `4Ib6tw9S9Db1VKo6OWtzsF`, frame **"Case study: iterate"** (`3058:1236`), 1440 × 10010.
Visual reference: `design/screenshots/case-study-thought-partner.png`.
All copy below was taken from the Figma text layers (design context), not from the render.

## Page header facts

- **Page background:** `#EAE6F0` (token *Background*). Frame has no other full-bleed fills.
- **Content column:** almost everything is left-aligned at **x = 60** (60px left margin; the
  section frames use `px-60`). Text measures used: 852, 857, 1052, 1084 and 1294px.
  Exceptions:
  - Hero title block at x = 40.
  - Hero panel + intro paragraph at x = 351.
  - Summary block centred at x = 259 (922 wide).
  - Stage 2 column at x = 536.
  - Trust-levers diagram is full-bleed (x = 0, 1440 wide).
  - "Next project" card centred at x = 324 (792 wide).
- **Vertical rhythm:** major sections are separated by **336px**; sub-sections inside a section
  by **168px**; heading → content by **48px**; heading → body paragraph by **12px**.
- **Colours:**
  - Text is `#000000` unless noted. Hero title + intro are *Dark accent* `#320E3B`.
  - Highlight boxes: `#320E3B` background with `#D8DFAF` (*Light accent 2*) text.
  - Annotation tags: `#D8DFAF` background with `#320E3B` text.
  - Cards / panels: `#FAFAFA` (*Background 2*).
- **All image exports are opaque PNGs @2x.** Wherever a visual has transparent gaps, the export
  is filled with the page bg `#EAE6F0`, so the images sit seamlessly on the page.

### Type scale (Figma text styles)

All styles have `line-height: normal`; Figma's reference code emits `leading-[normal]`, while
the style metadata reads "lineHeight 100".

| Name | Family / weight | Size | Letter-spacing | Used for |
|---|---|---|---|---|
| **Header** | Inter Medium (500) | 80px | -8% (-6.4px) | Page title |
| **Subheader** | Inter Medium (500) | 40px | -8% (-3.2px) | Section headings, highlight boxes |
| **Subheader 2** | Source Serif Pro SemiBold (600) | 24px | 0 | Summary row labels, "Other stats", stat values, next-project title |
| **Body** | Source Serif Pro Regular (400) | 20px | 0 | Paragraphs, "SOLUTION" eyebrow, "See next project" |
| **Diagram** | Inter Medium (500) | 12px | -8% (-0.96px) | Small labels, meta lines, summary body, stat captions, annotation tags |

Inline variants also appear:
- Inter Bold 12px, -0.96px (hero "AI product design")
- Inter Medium Italic 40px (inline emphasis in a heading)
- Source Serif Pro Bold 20px (inline emphasis in body)
- underline in Body

## Shared chrome (built once, not outlined here)

- **Top nav** — instance `3101:10034` at x 0, y 0, 1440 × 101, overlaying the top of the hero.
  The active item is **WORK** (light-green highlight behind "WORK"); HOME, ABOUT, RESUME and
  CONTACT are inactive.
- **Footer** — instance `3151:10191` at x 0, y ≈ 9366, 1440 × 644, ending at the bottom of the
  frame. It contains the orchid image, "Find me on Linkedin", "Email me" and the "Designed and
  built by…" line. Its top ~120px **overlaps the bottom of the "See next project" card**: the
  orchid rises behind and in front of the card area (see block 25).

---

## Blocks (top → bottom)

Coordinates are absolute in the 1440 frame. "Gap" means the space from the bottom of the
previous block.

### Section A — Hero (y 0–776)

**1. Hero visual panel (background + image)** — image
- Panel: `3058:1237`, a `#FAFAFA` rectangle at x 351, y 0, 1108 × 722. It bleeds 19px past the
  right edge of the frame and starts behind the nav.
- Image: `design/assets/thought-partner/01-hero-thought-partner-chat@2x.png`
  - Source node `3155:10345`. Displayed at x 642, y 0, **817 × 663**; its right 19px is clipped
    by the frame.
  - The mockup has its own `#FAFAFA` background with a rounded bottom-left corner, sits inside
    the panel, and is cropped at the top: the chat continues above y = 0.
- alt: "PolicyCopilot chat in progress. The AI has proposed a problem statement about youth
  underemployment in Pakistan, the user has replied 'Yes that captures it', and the AI now
  asks 'What do you think are the root causes of the issue?' with two user-entered answers
  (education-skills mismatch; population growth), an 'Add another' row, and Skip / Submit
  answers buttons."

**2. Page title + meta** — page title (`3058:1238`)
- Position: x 40, y 101, w 715; vertical stack with a 16px gap.
- It sits **on top of** the hero panel and partly overlaps the chat image (title glyphs run to
  about x 735, the chat starts at x 642).
- Title `3058:1239`: Header style (Inter Medium 80, -6.4px), colour `#320E3B`, 715 wide (4 lines
  at 1440):
  > Turning an AI black box into a thought partner: drop-off from 70% to 20%
- Meta stack `3058:1240` (8px gap, 12px, -0.96px, black, nowrap):
  - `AI product design` — **Inter Bold**
  - `Role: lead product designer` — Inter Medium
  - `Team: ML engineer, policy consultant, product manager` — Inter Medium

**3. Intro paragraph** — body paragraph (`3058:1263`)
- Position: x 351, y 726, w 933. Gap: 4px below the panel. Body style, colour `#320E3B`.
  > PolicyCopilot is a tool used by policy-makers to diagnose policy problems. The tool included an AI chat that helped users retrieve evidence from a curated knowledge base.

### Section B — Summary (y 944–1154)

**4. Summary table** — summary table (`3058:1245`)
- Position: x 259, y 944, w 922 (centred). Gap: 168px.
- Vertical stack with a 24px gap:
  - heading `Summary`: Subheader (Inter Medium 40, -3.2px, black)
  - then the rows, also 24px apart
- Each row (`3058:1248` / `1251` / `1254`):
  - flex row, 12px gap, items centred
  - label: Subheader 2 (Source Serif Pro SemiBold 24), fixed width 120px
  - value: Diagram style (Inter Medium 12, -0.96px), fills the remaining ~790px

| Label | Value (verbatim) |
|---|---|
| Context | 70% of usability testing participants dropped off our AI chatbot because they didn't trust the sources it selected, even though its citations matched the academic papers they trust. |
| Approach | Showed that a disclaimer about source vetting didn't help, then redesigned the chatbot into a guided flow where users define the problem and root causes that drive which evidence is selected. |
| Outcome | Drop-off fell from 70% to 20%. Shipped on time for the funder demo that secured $1M. |

### Section C — Problem (y 1490–2673)

**5. Section heading** — section heading (`3058:1258`)
- x 60, y 1490, w 1294. Gap: 336px. Subheader, black.
  > Our AI chatbot offered the same citation information as academic papers that users trust

**6. Two-column text + image row** — two-column row (`3058:1265`)
- y 1634, gap 48px. Columns at x 60 (w 548) and x 728 (w 626), with a 120px column gap and
  items aligned to the top.
- Each column: Body paragraph, then 12px, then the image.
- **Left column** (`3058:1266`):
  - Body text `3058:1267` (548 wide):
    > Users told us in-text citations and a full reference list are what make research credible...
  - Image: `design/assets/thought-partner/02-citation-format-examples@2x.png`
    - Source node `3058:1266`, cropped to remove its 62px heading paragraph; the paragraph
      above is live text.
    - Displayed at x 60, y 1696, **548 × 156**.
    - Two white rounded cards (radius 8, padding 8). Green `#D8DFAF` tags with arrow pointers
      read "In-text citation" and "Reference list".
    - alt: "Two excerpts from an academic paper on Pakistan's education and workforce. A
      paragraph ends with the in-text citation '(World Bank data, 2019)' highlighted and
      tagged 'In-text citation'. A numbered reference list has entry 32 'Nomura, S., 2019.
      Pakistan-Skills Assessment for Economic Growth' highlighted and tagged 'Reference
      list'."
- **Right column** (`3058:1280`):
  - Body text `3058:1281` (626 wide):
    > ... our chatbot already gave them both in the same format so the lack of trust sat somewhere else
  - Image: `design/assets/thought-partner/03-chatbot-citations-before@2x.png`
    - Source node `3058:1282`: a `#FAFAFA` card, radius 8, padding 8, wrapping the
      screenshot.
    - Displayed at x 728, y 1696, **626 × 359**.
    - alt: "The original PolicyCopilot 'Thought Partner' chat. An AI response about
      Pakistan's youth unemployment carries superscript in-text citations, a 'Citations (3)'
      button sits top-right, a 'Youth Unemployment Rate (ages 15–24) — Pakistan' chart card
      follows, and a disclaimer below the 'Describe the problem you're working on…' input
      lists the curated sources."

**7. Section heading with italic span** — section heading (`3058:1257`)
- x 60, y 2103, w 1052. Gap: 48px. Subheader, black.
- Mixed styling: *not trusting the selected sources* is **Inter Medium Italic**. The curly
  quotes stay upright and are typed into the copy.
  > but 7/10 of usability testing participants mentioned “*not trusting the selected sources*” in our AI chatbot, leading to high drop offs

**8. Heading + highlight box** — section heading followed by a highlighted callout (`3058:2003`)
- x 60, y 2367, w 1084. Gap: 168px.
- Heading `3058:1259`: Subheader, black. The layer has a trailing space after "disclaimer.".
  > Users asked us to explain how sources were vetted so I added a disclaimer.
- Callout `3058:2002`: sits directly below with **0 gap**.
  - Dark `#320E3B` box hugging the text: 360 × 48, no padding, no radius.
  - Text is Subheader in `#D8DFAF`, nowrap.
  > Drop-off did not move

**9. Image + caption row** — image with side caption (`3101:10070`)
- y 2559, gap 48px. Flex row, 9px gap, **items aligned to the bottom**.
- Image: `design/assets/thought-partner/04-knowledge-base-disclaimer@2x.png`
  - Source node `3058:1284`. Displayed at x 60, y 2559, **671 × 114**.
  - A `#FAFAFA` card (551 wide) with a green "Knowledge base disclaimers" tag hanging off its
    right edge.
  - alt: "Close-up of the chat input 'Describe the problem you're working on…' with the newly
    added disclaimer under it: '100+ curated sources - top institutions (WHO, ILO, UN
    agencies) and peer-reviewed journals (The Lancet, BMJ). Vetted for credibility and
    recency, updated quarterly.' A tag points to it reading 'Knowledge base disclaimers'."
- Caption `3058:1262`: Body, black, w 478, at x 740, bottom-aligned with the image
  (y 2623–2673).
  > After a week live, drop-off went from 70% to 65% across 42 sessions (no meaningful change)

### Section D — Exploring trust (y 3009–4507)

**10. Section heading + lead paragraph** — heading + body (`3101:10072`)
- x 60, y 3009, w 852. Gap: 336px. 12px between the heading and the paragraph.
- Heading `3058:1260`: Subheader, black.
  - The layer is two identical-style spans split at "product" / ". To start…", which just
    renders as one sentence.
  - It wraps naturally after "product." at 852px.
  > I needed to make structural changes to the product. To start, I explored what levers cultivated trust
- Body `3058:1264` (y 3117):
  > I mapped how people decide to trust in general, then how policymakers do specifically.

**11. Trust-levers diagram** — full-bleed diagram image
- Image: `design/assets/thought-partner/05-trust-levers-diagram@2x.png`
  - Source node `3151:10338`; the frame clips `Group 5`, whose outer ellipse is 1480 wide.
  - Displayed at x 0, y 3190, **1440 × 943** (full bleed). Gap: 48px.
- The image contains:
  - two nested `#320E3B` outline ellipses (the outer one is clipped at the left and right edges)
  - two dark pill labels
  - four white cards, each with a green "Why this works" footer
- All the annotation copy is baked in. Text inside, for reference and alt:
  - Pill: "How do policy-makers decide to trust something?"
    - Card "Backing from a reputable journal": logos for UNESCO, World Health Organization, a
      UN body, UNHCR. "Why this works: Journals do rigorous vetting, users trust that process"
    - Card "Transparency into methodology": a dense methodology footnote. "Why this works:
      Users feel more at ease when they can verify the steps taken to get to a result"
  - Pill: "How do people decide to trust something?"
    - Card "Authorship": "Agency to adjust the variables that go into producing the outputs".
      Includes a Wealthsimple risk-level picker, captioned "Example from Wealthsimple". "Why
      this works: Users trust the output because they trust the inputs"
    - Card "Human in the loop (HITL)": "Adding a verification step requiring explicit human
      confirmation". Includes a Claude Code "This command requires approval / Do you want to
      proceed?" prompt, captioned "Example from Claude Code". "Why this works: The user keeps
      final authority and feel like they are in control"
- alt: "Nested-ellipse diagram of trust levers. The inner ellipse, 'How do people decide to
  trust something?', holds Authorship (example: Wealthsimple's risk-level picker — users trust
  the output because they trust the inputs) and Human in the loop (example: Claude Code's
  approval prompt — the user keeps final authority). The outer ellipse, 'How do policy-makers
  decide to trust something?', adds Backing from a reputable journal (UNESCO, WHO, UNHCR
  logos — journals do rigorous vetting) and Transparency into methodology (a methodology
  footnote — users can verify the steps taken)."

**12. Insight paragraph + heading** — body paragraph then section heading (`3101:10074`)
- x 60, y 4301. Gap: 168px. 12px between the two.
- Body `3058:2000` (w 762), Body style. **Bold** span (Source Serif Pro Bold): *person’s trust*
  (curly apostrophe).
  > I realized our existing solutions had only considered gaining trust from only policy-makers but had not considered how to gain a **person’s trust** in general
- Heading `3058:1345` (w 737, y 4363), Subheader, black:
  > The solution needed to include users in determining the inputs that went into the results and give them veto power

### Section E — Solution (y 4843–7589)

**13. Eyebrow + section heading** — label/eyebrow + heading (`3058:1346`)
- x 60, y 4843. Gap: 336px. 4px between the eyebrow and the heading.
- Eyebrow `3058:1347`: Body style (Source Serif Pro Regular 20). Uppercase as typed.
  > SOLUTION
- Heading `3058:1348` (w 857): Subheader.
  > The redesign turns one question into a two-stage flow where users steer which evidence is selected

**14. Stage 1 text** — small label + body (`3058:1359`)
- x 60, y 5016, w 609. Gap: 48px. 4px between the label and the body.
- Label `3058:1360`: Diagram style (Inter Medium 12, -0.96px).
  > Stage 1: Defining the problem
- Body `3058:1361`:
  > The AI asks scoping questions and drafts a problem statement. The user confirms or corrects it, and only then does the evidence check run against it

**15. Stage 1 image** — image
- Image: `design/assets/thought-partner/06-stage-1-problem-statement@2x.png`
  - Source node `3058:1365`.
  - Displayed at x 60, y 5158, **488 × 181**. Gap: 48px.
- alt: "Stage 1 UI. A 'Problem statement' card reads 'The sector pattern sharpens the
  disconnect…' and 'Here's the problem as I understand it: in Bangladesh, child labour among
  5–17 year olds has stayed roughly flat nationally over the past decade…' with an 'Edit
  problem statement' button. Below it, an 'Evidence check' note cites ILO & UNICEF (2021) and
  Thévenon & Edmonds (2019), and a dark green 'Generate mindmap' button."

**16. Stage 2 text** — small label + body (`3058:1362`)
- x **536**, y 5331, w 555. Staggered right column.
- The Stage 2 frame starts 8px *above* the bottom of the Stage 1 image (frames overlap by 8px;
  no visual collision).
- Label `3058:1363`: Diagram style.
  > Stage 2: Diagnosing root causes
- Body `3058:1364`:
  > The user inputs their ideas on root causes or brings their own research and the system compares each against the evidence

**17. Stage 2 image** — image
- Image: `design/assets/thought-partner/07-stage-2-root-cause-questions@2x.png`
  - Source node `3058:1376`.
  - Displayed at x 536, y 5448, **555 × 299**. Gap: 48px.
- alt: "Stage 2 UI. The user's message 'Yes, that's right. The growth-out-of-poverty story isn't
  translating into kids out of work' sits above a follow-up question card, 'What do you think
  is driving this at that scale?' (Question 1/2). It lists suggested causes — Household income
  smoothing; School quality and its perceived returns; Children taking on caregiving roles at
  home — plus an 'Add another' row, and Skip / Next question buttons."
- Layout note: blocks 14–17 form a two-column **staggered** layout.
  - Left: Stage 1 text + image (x 60).
  - Right: Stage 2 text + image (x 536), starting where the left column ends.
  - On narrow screens, stack them in order 14 → 15 → 16 → 17.

**18. Edge-case heading + highlight box** — section heading + highlighted callout (`3058:2004`)
- x 60, y 5915, w 857. Gap: 168px. 4px between the heading and the box.
- Heading `3058:1351`: Subheader, black, **two explicit paragraphs** (hard line break after the
  colon; the layer has a trailing space after "Edge case:"):
  > Edge case:
  > Some users didn't have the context to answer key questions
- Callout `3058:1352`:
  - Dark `#320E3B` box, full width 857, 192 tall, no padding.
  - Text is Subheader in `#D8DFAF`, with two explicit paragraphs (trailing space after
    "I decided:").
  > I decided:
  > to build an escape hatch because forcing an answer risked losing users and letting them guess risked a misleading output

**19. Escape-hatch comparison** — composed visual (two chat panels + annotations), ONE image
- Image: `design/assets/thought-partner/08-escape-hatch-comparison@2x.png`
  - Source node `3103:10078` ("Group 9").
  - Displayed at x 60, y 6351, **1320 × 1238**. Gap: 96px.
- Internal layout, for reference:
  - Left panel: x 60, w 504, label at top.
  - Annotation tags: x 564, at y 6558 / 6776 / 6959.
  - Right panel: x 876, w 504, 1211 tall.
  - Green note box: x 418, y 7307.
- Baked-in text, all in Diagram style:
  - Labels: "POV: user with less context (escape hatch user)" / "POV: user with more context
    (for comparison)"
  - Tags: "When users take the escape hatch..." / "...the AI scopes the problem more
    broadly..." / "...and returns a more generalized response"
  - Green note (`3058:1358`): "It draws on the same vetted evidence, so less input means less
    specificity, never less rigour. The AI doesn't fill gaps with guesses about the user's
    situation"
- Ambiguity: the note box reads like a takeaway. It is styled as an annotation (`#D8DFAF`, 12px)
  and sits between the panels, so it can't be cropped out cleanly. It is therefore **baked into
  the image**. If you'd rather render it as live text, use the copy above.
- alt: "Side-by-side PolicyCopilot conversations on youth unemployment in Pakistan.
  - Left, a user with less context skips the scoping questions (each marked 'Skipped'). The AI
    then writes a broader one-line problem statement and returns a shorter, generalized
    response listing possible drivers (low-productivity job growth, weak worker protections,
    shock-driven youth scarring) with three references.
  - Right, a user who answers the questions gets a detailed problem statement and a much
    longer, evidence-by-driver response with twelve references.
  - Annotations: when users take the escape hatch, the AI scopes the problem more broadly and
    returns a more generalized response. It draws on the same vetted evidence, so there is
    less specificity but never less rigour."
- **Optional mobile alternates.** These are the same panels without the tags or note; use them
  if the composed image is too small on phones, and put the tag/note copy above as live text.
  - `design/assets/thought-partner/09-pov-less-context-panel@2x.png`
    - Source node `3058:2009`, displayed **504 × 815**.
    - alt: "PolicyCopilot conversation where the user skips the scoping questions; the AI
      scopes the problem broadly and returns a generalized response with three references."
  - `design/assets/thought-partner/10-pov-more-context-panel@2x.png`
    - Source node `3058:2008`, displayed **504 × 1211**.
    - alt: "PolicyCopilot conversation where the user answers the scoping questions; the AI
      drafts a specific problem statement and returns a detailed, driver-by-driver evidence
      response with twelve references."
  - The POV labels (`3058:1355`, `3058:1356`) are not in 09/10. Render them as Diagram-style
    text above each panel:
    - "POV: user with less context (escape hatch user)"
    - "POV: user with more context (for comparison)"

### Section F — Results & learnings (y 7925–8613)

**20. Section heading** — section heading (`3058:1558`)
- x 60, y 7925, w 737. Gap: 336px. Subheader.
  > The new user experience helped secure a $1M funding round

**21. Stats card** — metric stats card (`3058:1559`), live text, no image
- x 60, y 8069, 679 × 193. Gap: 48px.
- Card: `#FAFAFA` background, radius 8, padding 28px vertical × 36px horizontal; vertical stack
  with a 20px gap.
- Title `3058:1560`: Subheader 2 (Source Serif Pro SemiBold 24), black.
  > Other stats
- Stats row `3058:1561`: flex, 80px gap, items aligned to the top.
- Each stat is a vertical stack with a 4px gap:
  - value pill: `#D8DFAF` background, radius 8, padding 4 × 8, Subheader 2 24px black
  - caption: Diagram style 12px black

| Value (pill) | Caption |
|---|---|
| `70% → 20%` (uses the → arrow character) | change in drop-off rate |
| `+22%` | longer sessions |
| `+66%` | sessions resulted in users using the AI’s evidence ⏎ (a proxy for trust) |

- The third caption is fixed at 235px wide, with a hard line break before "(a proxy for
  trust)", a trailing space before the break, and a curly apostrophe in "AI’s".

**22. Learning heading + paragraph** — section heading + body (`3060:2079`)
- x 60, y 8430, w 857. Gap: 168px. 12px between the heading and the paragraph.
- Heading `3060:2081`: Subheader (curly apostrophe in "Users’").
  > Users’ preferences are a weak signal that need to be tested
- Body `3060:2082`: Body style. The word **doing** is underlined (solid, from-font thickness).
  The layer has a trailing space.
  > Next time, I would dig deeper by not only hearing what users have to say but also observing what users are <u>doing</u>. Based on that, I would validate with quick prototypes first before implementing something.

### Section G — Next project + footer (y 8949–10010)

**23. "See next project" teaser card** — next-case-study teaser (`3100:8433`)
- x 324, y 8949, **792 × 537**, centred. Gap: 336px.
- Card: `#320E3B` background (sampled from the render), radius about 8px, padding 16.
- The whole card presumably links to the compute-costs case study.
- Text block `3100:8434` (x +16, y +16, w 760; 20px gap), all in `#EAE6F0`:
  - `3100:8435`: Body (Source Serif Pro Regular 20)
    > See next project
  - `3100:8437`: Subheader 2 (Source Serif Pro SemiBold 24), 760 wide, 2 lines. The layer has
    a trailing space.
    > Cutting compute costs by 30% by redesigning AI responses around common tasks
  - `3100:8438`: Diagram style, 4px below the title
    > AI product design
- Preview image (block 24) sits 8px below the text block.

**24. Teaser preview image** — image
- Image: `design/assets/thought-partner/11-next-project-compute-costs@2x.png`
  - Cropped from an export of card `3100:8433` to the `#FAFAFA` preview panel `3100:8439`
    (radius 4). No single node holds the panel and the mockup together: the mockup
    `3100:9689` overflows its own 528px frame.
  - Displayed at x 340, y 9097, **760 × 373**.
- alt: "Preview of the compute-costs case study: a funding-landscape dashboard for Kenya.
  - Filter chips for grant amount, issuing body and relevancy sit above a bubble chart of
    projects by approved date, with a detail card for 'West Africa Pilot Community-based
    Natural Resources & Wildlife Management Project'.
  - A Gantt-style timeline shows national policies from 2004 to the present: Kenya Vision
    2030, the Kenya National Youth Employment Action Plan, the Kenya Youth Development
    Policy, the Technical and Vocational Education and Training Act, the National Youth
    Policy and the National Employment Policy for Kenya."

**25. Footer** — shared component; y 9366–10010.
- It overlaps the bottom ~120px of the teaser card, so the orchid artwork visually overlaps
  the lower-left of the card.
- Check the stacking order against the render (around y 9300–9500): the orchid draws in front of
  the card's bottom-left corner.

---

## Image manifest

| # | File | Node | Display @1440 | Export px |
|---|---|---|---|---|
| 01 | `design/assets/thought-partner/01-hero-thought-partner-chat@2x.png` | `3155:10345` | 817 × 663 (19px clipped right) | 1634 × 1326 |
| 02 | `design/assets/thought-partner/02-citation-format-examples@2x.png` | `3058:1266` (cropped) | 548 × 156 | 1096 × 312 |
| 03 | `design/assets/thought-partner/03-chatbot-citations-before@2x.png` | `3058:1282` | 626 × 359 | 1252 × 718 |
| 04 | `design/assets/thought-partner/04-knowledge-base-disclaimer@2x.png` | `3058:1284` | 671 × 114 | 1342 × 228 |
| 05 | `design/assets/thought-partner/05-trust-levers-diagram@2x.png` | `3151:10338` | 1440 × 943 | 2880 × 1886 |
| 06 | `design/assets/thought-partner/06-stage-1-problem-statement@2x.png` | `3058:1365` | 488 × 181 | 976 × 362 |
| 07 | `design/assets/thought-partner/07-stage-2-root-cause-questions@2x.png` | `3058:1376` | 555 × 299 | 1110 × 599 |
| 08 | `design/assets/thought-partner/08-escape-hatch-comparison@2x.png` | `3103:10078` | 1320 × 1238 | 2640 × 2476 |
| 09 | `design/assets/thought-partner/09-pov-less-context-panel@2x.png` (optional alt) | `3058:2009` | 504 × 815 | 1008 × 1629 |
| 10 | `design/assets/thought-partner/10-pov-more-context-panel@2x.png` (optional alt) | `3058:2008` | 504 × 1211 | 1008 × 2422 |
| 11 | `design/assets/thought-partner/11-next-project-compute-costs@2x.png` | `3100:8433` (cropped to `3100:8439`) | 760 × 373 | 1520 × 746 |

## Notes / ambiguities

- **Copy that may be typos.** Reported only; the copy above is verbatim.
  - Block 12: "had only considered gaining trust from **only** policy-makers" — "only" appears
    twice.
  - Block 22: "a weak signal that **need** to be tested" — subject–verb agreement; "needs"?
  - Block 11 (baked into the image): "The user keeps final authority and **feel** like they are
    in control" — "feels"?
  - Block 24 (baked into the image): the mockup chip "Central Government (Central **Agencie**)"
    appears twice.
  - Inconsistent spellings across the page:
    - "policy-makers" (blocks 3, 12, diagram) vs "policymakers" (block 10)
    - "drop offs" (block 7) vs "drop-off" elsewhere
- **Trailing spaces** in text layers: 3058:1259, 3058:1351, 3058:1353, 3058:1573, 3060:2082,
  3100:8437. They are harmless; trim them.
- **Overlaps:**
  - The hero title (block 2) overlaps the hero chat image (block 1) by about 90px horizontally.
  - The Stage 1 and Stage 2 frames overlap by 8px vertically.
  - The footer overlaps the teaser card by about 120px.
  - The nav overlays the top of the hero panel.
- **Hidden layers skipped.** There are 26, all inside chat-mockup components: hidden "Summary"
  headers, "Comp" footers and "Frame 323" rows in the response components, plus one hidden
  category tag in the teaser mockup. None are narrative copy, and none appear in the exports.
- **Design-context quirk.** The fill of `3058:1283` ("[AI Trust] Citation Before 1") does not
  come through as an image URL in the design-context code, but the node export (03) renders it
  correctly.
