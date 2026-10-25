import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { links, site } from "@/data/site";

const inter = localFont({
  src: [
    { path: "./fonts/inter-latin-wght-normal.woff2", style: "normal", weight: "100 900" },
    { path: "./fonts/inter-latin-wght-italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.role}`, template: `%s — ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    type: "website",
    locale: "en_SG",
    siteName: site.name,
    url: site.url,
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image", creator: "@softserveotter" },
};

export const viewport: Viewport = { themeColor: "#FAF8F4" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: site.role,
  worksFor: { "@type": "Organization", name: "Phillip Nova" },
  sameAs: links.filter((l) => l.href.startsWith("https://www.linkedin") || l.href.startsWith("https://x.com")).map((l) => l.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:bg-bg focus:px-3 focus:py-1"
        >
          Skip to content
        </a>
        <div className="mx-auto w-full max-w-[48rem] px-5 sm:px-8">
          <Header />
          <main id="content">{children}</main>
          <Footer />
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
