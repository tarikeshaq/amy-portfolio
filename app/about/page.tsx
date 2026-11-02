import type { Metadata } from "next";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = { title: "About" };

// Stub; replaced by the Figma "About page" build.
export default function About() {
  return (
    <>
      <main className="px-5 pt-40">
        <h1 className="text-display text-plum">As a designer</h1>
      </main>
      <Footer />
    </>
  );
}
