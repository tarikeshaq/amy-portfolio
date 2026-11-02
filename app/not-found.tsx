import Link from "next/link";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <main className="px-5 pt-40">
        <h1 className="text-display text-plum">Page not found</h1>
        <p className="text-body mt-6">
          <Link href="/" className="text-label bg-plum text-sage hover:bg-sage hover:text-plum">
            Back home
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
