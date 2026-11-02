import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import heroOrchid from "@/assets/images/home/hero-orchid.webp";
import stickfigure from "@/assets/images/home/stickfigure.webp";
import workComputeCosts from "@/assets/images/home/work-compute-costs.webp";
import workThoughtPartner from "@/assets/images/home/work-thought-partner.webp";
import { caseStudies, type CaseStudySlug } from "@/lib/site";

const previews: Record<CaseStudySlug, { src: StaticImageData; alt: string }> = {
  "compute-costs": {
    src: workComputeCosts,
    alt: "Two AI responses rendered as visuals: a bubble chart of conservation grants in West Africa and a timeline of youth-unemployment policies in Kenya.",
  },
  "thought-partner": {
    src: workThoughtPartner,
    alt: "An AI chat asking “What do you think are the root causes of the issue?” with the user’s answers, next to the problem statement it produced.",
  },
};

// Figma "Home page" (3081:3777).
export default function Home() {
  return (
    <>
      <main>
        {/* Hero (3163:7221): 865px tall at 1440, orchid at 30% opacity bleeding off the right edge. */}
        <section className="relative px-5 pt-[clamp(7.5rem,15.5vw,14rem)] pb-[clamp(2rem,13.4vw,12rem)]">
          <Image
            src={heroOrchid}
            alt=""
            priority
            sizes="63vw"
            className="pointer-events-none absolute top-0 right-0 -z-10 w-[max(62.96%,20rem)] select-none"
          />
          <h1 className="text-display flex items-center gap-[0.25em] text-plum">
            Hi! I’m Amy
            {/* Stick figure is 2.7em tall in Figma but must not push the next line down. */}
            <Image src={stickfigure} alt="" className="-my-[0.74em] h-[2.7em] w-auto" priority />
          </h1>
          <p className="text-display mt-[clamp(1.5rem,4.2vw,3.75rem)] max-w-[15.6em] text-plum">
            I design AI products that <br className="hidden md:inline" />
            <span className="underline decoration-from-font underline-offset-[0.12em]">users trust</span> and{" "}
            <br className="hidden md:inline" />
            <span className="underline decoration-from-font underline-offset-[0.12em]">
              want to integrate into their workflows
            </span>
          </p>
        </section>

        {/* Selected work (3081:3783). */}
        <section id="work" aria-labelledby="work-heading" className="mt-[clamp(5rem,11.7vw,10.5rem)] px-5">
          <h2 id="work-heading" className="text-display text-plum">
            Selected work
          </h2>
          <ul className="mt-[clamp(1.5rem,3.3vw,3rem)] flex flex-col gap-[clamp(5rem,11.7vw,10.5rem)]">
            {caseStudies.map(({ slug, title, tag }) => (
              <li key={slug}>
                <Link href={`/work/${slug}/`} className="group block max-w-[73.875rem]">
                  <h3 className="text-title text-plum decoration-from-font underline-offset-[0.12em] group-hover:underline">
                    {title}
                  </h3>
                  <p className="text-body mt-2 text-plum">{tag}</p>
                  <Image
                    src={previews[slug].src}
                    alt={previews[slug].alt}
                    sizes="(min-width: 1440px) 1156px, calc(100vw - 2.5rem)"
                    className="mt-2 w-full max-w-[72.25rem] transition-opacity group-hover:opacity-90"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
