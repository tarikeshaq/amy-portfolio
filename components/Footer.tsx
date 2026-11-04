import orchid from "@/assets/images/footer-orchid.webp";
import { site } from "@/lib/site";

/**
 * Figma "Footer" (3151:10190). Desktop: 1440x644 composition, orchid on the left
 * half, blurred sage band along the bottom 29%, links over the band from 49% across.
 * Mobile: orchid then links, same band behind.
 */
export function Footer({ overlap = false }: { overlap?: boolean }) {
  // `overlap`: case studies pull the footer 120px up so the orchid overlaps the
  // bottom of the "See next project" card, as in Figma. The empty parts of the
  // footer box must not swallow clicks on the card underneath.
  return (
    <footer
      id="contact"
      className={`pointer-events-none relative md:aspect-[1440/644] ${
        overlap ? "-mt-[clamp(3rem,8.33vw,7.5rem)]" : "mt-[clamp(5rem,11.7vw,10.5rem)]"
      }`}
    >
      {/* Sage band (blur 25px in Figma). */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[45%] bg-sage blur-[25px] md:top-[71.12%] md:h-auto" />
      {/* Sideways camera-motion blur. An SVG rather than an <img> so the blur is measured in
          image pixels and looks the same strength at every screen size. */}
      <svg
        aria-hidden
        viewBox={`0 0 ${orchid.width} ${orchid.height}`}
        className="relative w-[80%] overflow-visible md:absolute md:top-0 md:left-0 md:w-[52.43%]"
      >
        <filter
          id="footer-orchid-motion-blur"
          filterUnits="userSpaceOnUse"
          x={-60}
          y={0}
          width={orchid.width + 120}
          height={orchid.height}
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="2.5 0" />
        </filter>
        <image
          href={orchid.src}
          width={orchid.width}
          height={orchid.height}
          filter="url(#footer-orchid-motion-blur)"
        />
      </svg>
      <div className="pointer-events-auto relative flex flex-col items-start gap-[clamp(1.5rem,3.3vw,3rem)] px-5 pt-4 pb-8 md:absolute md:top-[65.53%] md:right-[1.67%] md:left-[49.17%] md:p-0 md:py-6">
        <ul className="flex flex-col items-start gap-[clamp(0.75rem,1.7vw,1.5rem)]">
          <li>
            <a href={site.linkedin} className="text-label block bg-plum text-lime hover:underline">
              Find me on Linkedin
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="text-label block bg-plum text-lime hover:underline">
              Email me
            </a>
          </li>
        </ul>
        <p className="text-body text-ink">Designed and built by Amy Zeng © 2026</p>
      </div>
    </footer>
  );
}
