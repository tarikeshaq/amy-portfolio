import type { CSSProperties, ReactNode } from "react";

/**
 * Free-form Figma composition that scales with its width.
 *
 * At `lg` and up, the canvas is a 1440-wide coordinate space: pieces are
 * absolutely positioned using Figma px converted to container-query units
 * (1440px == 100cqw), so the whole composition scales exactly like the design.
 * Below `lg`, the canvas is a normal 2-column grid and pieces flow in DOM order
 * (use `className` on a piece for mobile `order-*` / `col-span-*`).
 *
 * `height` is the canvas height in Figma px; pieces may overflow it (e.g. to
 * overlap the next block, as in the design).
 */
export function Collage({
  height,
  clip = false,
  className = "",
  children,
}: {
  height: number;
  clip?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{ "--collage-ar": `1440 / ${height}` } as CSSProperties}
      className={`@container relative grid grid-cols-2 items-start gap-4 px-5 lg:block lg:aspect-(--collage-ar) lg:px-0 ${
        clip ? "overflow-hidden" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

/** Figma px -> container-query units inside a 1440-wide canvas. */
export const fpx = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;

export function Piece({
  x,
  y,
  w,
  className = "",
  children,
}: {
  /** Figma px from the canvas's left/top edge (may be negative). */
  x: number;
  y: number;
  w: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{ "--px": fpx(x), "--py": fpx(y), "--pw": fpx(w) } as CSSProperties}
      className={`relative lg:absolute lg:top-(--py) lg:left-(--px) lg:w-(--pw) ${className}`}
    >
      {children}
    </div>
  );
}

/** Body text sized like Figma's 20px Body inside a collage (scales with the canvas on desktop). */
export const collageBody = "text-body lg:text-[1.3889cqw]";
