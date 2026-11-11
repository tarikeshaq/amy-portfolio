import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

/*
 * Building blocks for the case-study pages. Props take raw Figma measurements
 * (px at the 1440 frame) so pages read like the outlines in design/extracted/.
 *
 * - Text widths are converted to `em` of the element's own font size, so lines
 *   break in the same places as Figma at any viewport width.
 * - Image widths cap at their Figma width and shrink with the column.
 * - Multi-column layouts only apply from `lg`; below that everything stacks.
 */

/** Figma content column: 60px side margins at 1440 (content box 1320px). */
export const COLUMN = 1320;
const pad = "px-[clamp(1.25rem,4.17vw,3.75rem)]";
const bleed = "-mx-[clamp(1.25rem,4.17vw,3.75rem)]";

/** Figma px width -> max-width in em for text set at `fontPx`. */
const em = (px: number, fontPx: number) => `${(px / fontPx).toFixed(3)}em`;
/** Figma px -> % of a parent `of` px wide. */
const pct = (px: number, of = COLUMN) => `${((px / of) * 100).toFixed(3)}%`;

/** Vertical rhythm from the case-study frames (336 / 168 / 96 / 48 px at 1440). */
export const space = {
  chapter: "mt-[clamp(6rem,23.33vw,21rem)]",
  section: "mt-[clamp(4rem,11.67vw,10.5rem)]",
  double: "mt-[clamp(2.5rem,6.67vw,6rem)]",
  content: "mt-[clamp(1.75rem,3.33vw,3rem)]",
} as const;
type Space = keyof typeof space;

/** Padded content column (x = 60 in Figma). */
export function Column({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`${pad} ${className}`}>{children}</div>;
}

/** Wrapper that applies one step of the vertical rhythm. */
export function Block({
  space: s,
  className = "",
  children,
}: {
  space?: Space;
  className?: string;
  children: ReactNode;
}) {
  return <div className={`${s ? space[s] : ""} ${className}`}>{children}</div>;
}

// ---------------------------------------------------------------- text

/** Hero title + meta lines (first meta line is bold). Figma "Header" + "Diagram". */
export function HeroTitle({
  title,
  meta,
  metaWidth,
  titleClassName = "",
  metaClassName = "",
}: {
  title: string;
  meta: string[];
  /** Fixed width (Figma px) that makes a long meta line wrap. */
  metaWidth?: number;
  titleClassName?: string;
  metaClassName?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className={`text-display text-plum ${titleClassName}`}>{title}</h1>
      <ul className={`text-diagram flex flex-col gap-2 ${metaClassName}`}>
        {meta.map((line, i) => (
          <li
            key={line}
            className={i === 0 ? "font-bold" : ""}
            style={metaWidth && i > 0 ? { maxWidth: `${metaWidth}px` } : undefined}
          >
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Section heading, Figma "Subheader" 40px. `w` = Figma text box width. */
export function H2({ w, children, className = "" }: { w?: number; children: ReactNode; className?: string }) {
  return (
    <h2 className={`text-subheading ${className}`} style={w ? { maxWidth: em(w, 40) } : undefined}>
      {children}
    </h2>
  );
}

/** Body paragraph, Figma "Body" 20px; 12px below a heading by default. */
export function P({ w, children, className = "mt-3" }: { w?: number; children: ReactNode; className?: string }) {
  return (
    <p className={`text-body ${className}`} style={w ? { maxWidth: em(w, 20) } : undefined}>
      {children}
    </p>
  );
}

/**
 * Dark callout set in Subheader type (#320E3B box, #D8DFAF text). Sits directly
 * under its heading. `hug` boxes shrink to the text; otherwise the box takes `w`.
 */
export function Highlight({ w, hug = false, children }: { w?: number; hug?: boolean; children: ReactNode }) {
  const style: CSSProperties | undefined = !w
    ? undefined
    : hug
      ? { maxWidth: em(w, 40) }
      : { width: em(w, 40), maxWidth: "100%" };
  return (
    <p className={`text-subheading bg-plum text-sage ${hug ? "w-fit" : ""}`} style={style}>
      {children}
    </p>
  );
}

/** Small Inter 12px label ("Diagram" style): eyebrows, captions, stage labels. */
export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-diagram ${className}`}>{children}</p>;
}

/** Quoted user prompt above a before/after comparison (Subheader 2, 24px). */
export function Prompt({ children }: { children: ReactNode }) {
  return <p className="text-subheading-2">{children}</p>;
}

// ---------------------------------------------------------------- media

/**
 * Exported Figma mockup. `w` = displayed width at 1440.
 * `scrollMin`: on small screens keep the image at least this wide inside a
 * horizontal scroller instead of shrinking dense diagrams to illegibility.
 * `bleed`: full-bleed across the column's side padding (e.g. a 1440-wide diagram).
 */
export function Figure({
  src,
  alt,
  w,
  scrollMin,
  bleed: isBleed = false,
  className = "",
  imgClassName = "",
  priority = false,
}: {
  src: StaticImageData;
  alt: string;
  w: number;
  scrollMin?: number;
  bleed?: boolean;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  const image = (
    <Image
      src={src}
      alt={alt}
      priority={priority}
      sizes={`(min-width: 1440px) ${w}px, ${Math.round((w / 1440) * 100)}vw`}
      style={{ maxWidth: `${w}px`, ...(scrollMin ? ({ "--scroll-min": `${scrollMin}px` } as CSSProperties) : {}) }}
      className={`w-full ${scrollMin ? "min-w-(--scroll-min) lg:min-w-0" : ""} ${imgClassName}`}
    />
  );
  if (!scrollMin) return <figure className={`${isBleed ? bleed : ""} ${className}`}>{image}</figure>;
  return (
    <figure className={`${isBleed ? bleed : ""} ${className}`}>
      <div
        className={`overflow-x-auto lg:overflow-visible ${isBleed ? "" : "-mx-5 px-5 lg:mx-0 lg:px-0"}`}
        role="region"
        aria-label="Scrollable diagram"
        tabIndex={0}
      >
        {image}
      </div>
      <figcaption className={`text-diagram mt-2 lg:hidden ${isBleed ? "px-5" : ""}`}>
        Scroll sideways to see the full diagram →
      </figcaption>
    </figure>
  );
}

/**
 * A short screen recording that loops silently like a GIF, inside the same #FBFBFB
 * frame the screenshots have baked in (a band ~1.4% of the artifact's width).
 * `w` is the Figma width of the artifact, frame included; `src` is a URL under public/.
 */
export function FramedVideo({
  src,
  label,
  w,
  className = "",
}: {
  src: string;
  label: string;
  w: number;
  className?: string;
}) {
  return (
    <figure className={`w-full ${className}`} style={{ maxWidth: `${w}px` }}>
      {/* % padding is relative to the figure's width, so the band scales with it. */}
      <div className="bg-[#FBFBFB] p-[1.4%]">
        <video
          src={src}
          aria-label={label}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          // The recordings carry a 1px grey window outline at their edges (in some, only
          // partway through); trim ~2 source px so only the frame band shows there.
          className="block w-full [clip-path:inset(0.3%)]"
        />
      </div>
    </figure>
  );
}

/**
 * Side-by-side columns from `lg` up, stacked below. `cols` are Figma column widths,
 * `gap` the Figma gap; the row keeps those proportions and caps at their total width.
 */
export function Columns({
  cols,
  gap,
  align = "start",
  stackGap = "gap-y-10",
  children,
  className = "",
}: {
  cols: number[];
  gap: number;
  align?: "start" | "end";
  stackGap?: string;
  children: ReactNode;
  className?: string;
}) {
  const total = cols.reduce((a, b) => a + b, 0) + gap * (cols.length - 1);
  const style = {
    "--cols": cols.map((c) => `${c}fr`).join(" "),
    "--col-gap": pct(gap, total),
    "--row-max": pct(total),
  } as CSSProperties;
  return (
    <div
      style={style}
      className={`grid ${stackGap} lg:max-w-(--row-max) lg:grid-cols-(--cols) lg:gap-x-(--col-gap) ${
        align === "end" ? "lg:items-end" : "lg:items-start"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/** Shift a block right by `x` Figma px from the column's left edge, from `lg` up. */
export function Indent({ x, children }: { x: number; children: ReactNode }) {
  return (
    <div style={{ "--indent": pct(x) } as CSSProperties} className="lg:ml-(--indent)">
      {children}
    </div>
  );
}

// ---------------------------------------------------------------- composites

/** "Summary" block: heading + label/value rows, centred. `w` = Figma block width. */
export function Summary({
  w,
  rows,
  nowrap = false,
}: {
  w: number;
  rows: { label: string; value: string }[];
  /** Values are single-line in Figma (desktop only). */
  nowrap?: boolean;
}) {
  return (
    <section aria-label="Summary" className="mx-auto" style={{ maxWidth: `${w}px` }}>
      <h2 className="text-subheading">Summary</h2>
      <dl className="mt-6 flex flex-col gap-6">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <dt className="text-subheading-2 shrink-0 sm:w-[120px]">{label}</dt>
            <dd className={`text-diagram ${nowrap ? "lg:whitespace-nowrap" : ""}`}>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

type Side = {
  caption: ReactNode;
  captionWidth?: number;
  /** A screenshot, or the URL of a screen recording in public/videos/ (shown with <FramedVideo>). */
  src: StaticImageData | string;
  alt: string;
  w: number;
};

/** Prompt + Before/After columns (eyebrow, caption, image). */
export function BeforeAfter({
  prompt,
  before,
  after,
  cols,
  gap,
}: {
  prompt: ReactNode;
  before: Side;
  after: Side;
  cols: [number, number];
  gap: number;
}) {
  return (
    <div>
      <Prompt>{prompt}</Prompt>
      <Columns cols={cols} gap={gap} className="mt-8">
        {(
          [
            ["Before", before],
            ["After", after],
          ] as const
        ).map(([eyebrow, side]) => (
          <div key={eyebrow}>
            <Label>{eyebrow}</Label>
            <P w={side.captionWidth} className="mt-1">
              {side.caption}
            </P>
            {typeof side.src === "string" ? (
              <FramedVideo src={side.src} label={side.alt} w={side.w} className="mt-3" />
            ) : (
              <Figure src={side.src} alt={side.alt} w={side.w} className="mt-3" />
            )}
          </div>
        ))}
      </Columns>
    </div>
  );
}

/** "Stats" card: #FAFAFA panel with value pills over Diagram captions. */
export function Stats({
  title,
  items,
}: {
  title: string;
  items: { value: string; label: ReactNode; muted?: boolean; labelWidth?: number }[];
}) {
  return (
    <div className="w-fit max-w-full rounded-lg bg-panel px-6 py-6 text-black sm:px-9 sm:py-7">
      <p className="text-subheading-2">{title}</p>
      <ul className="mt-5 flex flex-wrap gap-x-[clamp(2rem,5.5vw,5rem)] gap-y-5">
        {items.map(({ value, label, muted, labelWidth }) => (
          <li key={value} className="flex flex-col items-start gap-1">
            <span className={`text-subheading-2 rounded-lg px-2 py-1 ${muted ? "bg-page" : "bg-sage"}`}>
              {/* Source Serif 4's arrow is much longer than the design's; set it in Inter. */}
              {value.split("→").flatMap((part, i) => (i === 0 ? [part] : [<span key={i} className="font-sans">→</span>, part]))}
            </span>
            <span className="text-diagram" style={labelWidth ? { maxWidth: `${labelWidth}px` } : undefined}>
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** "See next project" teaser card (792px, plum). Figma strokes sit inside the 16px padding, hence border-4 + p-3. */
export function NextProject({
  href,
  title,
  tag,
  src,
  alt,
}: {
  href: string;
  title: ReactNode;
  tag: string;
  src: StaticImageData;
  alt: string;
}) {
  return (
    <Link
      href={href}
      className="group mx-auto block max-w-[792px] rounded-lg border-4 border-plum bg-plum p-3 text-page transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum"
    >
      <p className="text-body">See next project</p>
      <p className="text-subheading-2 mt-5 group-hover:underline">{title}</p>
      <p className="text-diagram mt-1">{tag}</p>
      <Image src={src} alt={alt} sizes="(min-width: 792px) 760px, 90vw" className="mt-2 w-full rounded-[4px]" />
    </Link>
  );
}
