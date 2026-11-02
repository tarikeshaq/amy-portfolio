import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { caseStudies } from "@/lib/site";

const study = caseStudies.find((c) => c.slug === "compute-costs")!;

export const metadata: Metadata = { title: study.title };

// Stub; replaced by the case-study build.
export default function CaseStudy() {
  return (
    <>
      <main className="px-5 pt-40">
        <h1 className="text-display text-plum">{study.title}</h1>
      </main>
      <Footer />
    </>
  );
}
