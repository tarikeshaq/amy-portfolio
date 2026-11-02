import type { Metadata } from "next";
import Image from "next/image";
import { Collage, Piece, collageBody } from "@/components/Collage";
import { Footer } from "@/components/Footer";
import beach from "@/assets/images/about/beach.webp";
import catBlack from "@/assets/images/about/cat-black.webp";
import catOrange from "@/assets/images/about/cat-orange.webp";
import jewelry1 from "@/assets/images/about/jewelry-1.webp";
import jewelry2 from "@/assets/images/about/jewelry-2.webp";
import jewelry3 from "@/assets/images/about/jewelry-3.webp";
import portrait from "@/assets/images/about/portrait.webp";
import ring from "@/assets/images/about/ring.webp";
import chair from "@/assets/images/about/vintage-chair.webp";
import tray from "@/assets/images/about/vintage-tray.webp";
import vase from "@/assets/images/about/vintage-vase.webp";

export const metadata: Metadata = { title: "About" };

const jewelry = [
  { src: jewelry1, alt: "Jewelry-making tools on a workbench." },
  { src: jewelry2, alt: "Rings Amy made, worn on her hand above a case of loose stones." },
  { src: jewelry3, alt: "A ring with a large stone on Amy’s hand." },
];

/** 48px between blocks at 1440, scaling down with the viewport. */
const blockGap = "mt-[clamp(2rem,3.333vw,3rem)]";

// Figma "About page" (3081:3736). Coordinates in comments/props are Figma px at 1440.
export default function About() {
  return (
    <>
      <main className="mx-auto max-w-[1440px] @container">
        {/* Intro (3157:10357): heading + paragraph, portrait flush right. */}
        <section className="flex flex-col gap-6 px-5 pt-28 lg:flex-row lg:items-center lg:gap-[3.82cqw] lg:pt-0 lg:pr-0">
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-[1.875cqw]">
            <h1 className="text-display shrink-0 text-plum lg:text-[5.5556cqw]">As a designer</h1>
            <p className={`${collageBody} max-w-[566px] lg:w-[39.3cqw]`}>
              I was a business school grad working in accounting when I realized I wanted to do something more
              creative. I spent all my time after work learning: taking courses, connecting with other designers, and
              designing for small businesses.
              <br />
              <br />
              Because of my background, I find one of my super powers as a designer is understanding stakeholders and
              designing with business objectives in mind.
            </p>
          </div>
          <Image
            src={portrait}
            alt="Amy smiling at a restaurant table."
            priority
            sizes="(min-width: 1024px) 23vw, 60vw"
            className="w-3/5 self-end lg:ml-auto lg:w-[22.71cqw]"
          />
        </section>

        {/* Jewelry (3159:10360): ring cut-out on the left, copy + photos on the right. */}
        <Collage height={824} className={blockGap}>
          <Piece x={817} y={51} w={599} className="col-span-2 lg:text-right">
            <h2 className="text-display text-plum lg:text-[5.5556cqw]">Outside of work</h2>
          </Piece>
          <Piece x={0} y={0} w={884} className="pointer-events-none col-span-2 -ml-5 w-4/5 lg:ml-0">
            <Image
              src={ring}
              alt="A ring Amy made, held between two fingers."
              sizes="(min-width: 1024px) 61vw, 80vw"
              // The cut-out is mostly transparent; on phones show just the band with the ring.
              className="aspect-[884/380] object-cover object-[0_42%] lg:aspect-auto"
            />
          </Piece>
          <Piece x={496} y={170} w={921} className="col-span-2">
            <p className={collageBody}>
              I make jewelry! I enrolled in jewelry making classes at a local college and go to local gem shows to
              source stones. My goal this year is to design my own jewelry using the stones I sourced.
            </p>
            <ul className="mt-4 grid grid-cols-3 gap-2 lg:mt-[1.6667cqw] lg:gap-[2.2917cqw]">
              {jewelry.map(({ src, alt }) => (
                <li key={src.src}>
                  <Image src={src} alt={alt} sizes="(min-width: 1024px) 20vw, 30vw" className="aspect-[285/379] object-cover" />
                </li>
              ))}
            </ul>
          </Piece>
        </Collage>

        {/* Vintage (3161:10362): grid centred in the page, so x is offset by 103.5. */}
        <Collage height={477} className="mt-12 lg:mt-0">
          <Piece x={103.5} y={94} w={379} className="col-span-2 mx-auto w-4/5">
            <Image src={tray} alt="A silver tray of vintage coupe glasses." sizes="(min-width: 1024px) 27vw, 80vw" />
          </Piece>
          <Piece x={576} y={143} w={330} className="col-span-2">
            <p className={collageBody}>
              I love browsing vintage stores for home items and fashion.
              <br />
              <br />
              On vacation, I see it just another way to absorb culture and discover new design styles that may be
              referenced in my design work.
            </p>
          </Piece>
          <Piece x={1061.5} y={49} w={275} className="self-end">
            <Image src={vase} alt="A green marble table lighter." sizes="(min-width: 1024px) 20vw, 45vw" />
          </Piece>
          <Piece x={918.5} y={0} w={182} className="w-3/4">
            <Image src={chair} alt="A carved wooden folding chair." sizes="(min-width: 1024px) 13vw, 35vw" />
          </Piece>
        </Collage>

        {/* Pets (3161:10364): clipped at the left edge like the design's 1100px-wide frame. */}
        <Collage height={926} clip className={blockGap}>
          <Piece x={295} y={174.89} w={565} className="order-3 col-span-2">
            <Image src={beach} alt="Amy riding a horse along a beach." sizes="(min-width: 1024px) 40vw, 90vw" />
          </Piece>
          <Piece x={888} y={505.89} w={212} className="order-4 col-span-2">
            <p className={collageBody}>
              I have two amazing cats but also have a rotation of friends’ cats and dogs who I pet-sit while they travel
            </p>
          </Piece>
          <Piece x={247} y={174.89} w={249} className="order-2 w-3/4 justify-self-center">
            <Image src={catOrange} alt="An orange tabby cat sitting up." sizes="(min-width: 1024px) 18vw, 35vw" />
          </Piece>
          <Piece x={-292.8} y={0} w={782.6} className="order-1 -ml-5 lg:ml-0">
            <Image src={catBlack} alt="A black cat stretched out." sizes="(min-width: 1024px) 55vw, 50vw" />
          </Piece>
        </Collage>
      </main>
      <Footer />
    </>
  );
}
