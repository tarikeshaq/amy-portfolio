import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { TopNav } from "@/components/TopNav";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["500", "700"],
  style: ["normal", "italic"],
});

// Figma uses Source Serif Pro; Source Serif 4 is its successor on Google Fonts.
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <TopNav />
        {children}
      </body>
    </html>
  );
}
