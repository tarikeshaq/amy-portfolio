"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

type Item = { label: string; href: string; isActive?: (path: string) => boolean; file?: boolean; mail?: boolean };

const items: Item[] = [
  { label: "HOME", href: "/", isActive: (p) => p === "/" },
  { label: "WORK", href: "/#work", isActive: (p) => p.startsWith("/work/") },
  { label: "ABOUT", href: "/about/", isActive: (p) => p.startsWith("/about") },
  { label: "RESUME", href: site.resume, file: true },
  { label: "CONTACT", href: `mailto:${site.email}`, mail: true },
];

/**
 * Figma "Top nav" (3101:9889 + variants): a plum bar pinned top-right over the
 * page content; the current section is inverted (sage background, plum text).
 */
export function TopNav() {
  const pathname = usePathname();
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-end px-4 py-5 sm:px-6 sm:py-9">
      <nav aria-label="Main" className="pointer-events-auto">
        <ul className="flex items-center gap-[clamp(0.5rem,0.2rem+0.9vw,1.5rem)] bg-plum">
          {items.map(({ label, href, isActive, file, mail }) => {
            const active = isActive?.(pathname) ?? false;
            const className = `text-label block transition-colors ${
              active ? "bg-sage text-plum" : "text-sage hover:bg-sage hover:text-plum"
            } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum`;
            return (
              <li key={label}>
                {file ? (
                  // A document, not a route: plain anchor so Next doesn't prefetch it.
                  <a href={href} target="_blank" rel="noopener" className={className}>
                    {label}
                  </a>
                ) : mail ? (
                  // Opens the visitor's mail app rather than navigating.
                  <a href={href} className={className}>
                    {label}
                  </a>
                ) : (
                  <Link href={href} aria-current={active ? "page" : undefined} className={className}>
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
