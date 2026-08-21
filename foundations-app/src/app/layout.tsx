import type { Metadata } from "next";
import { Barlow_Condensed } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { site } from "@/lib/site";
import "./globals.css";

const condensed = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: `${site.name} — Foundations`,
  description: site.proofStatement,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${condensed.variable} h-full`}>
      <body className={`${condensed.className} flex min-h-full flex-col antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-foreground focus:px-3 focus:py-2 focus:text-background"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
