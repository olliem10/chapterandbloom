import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { SiteHeader } from "@/components/nav/SiteHeader";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://chapterandbloom.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Chapter & Bloom — Made for Those Who Live Between the Pages",
    template: "%s | Chapter & Bloom",
  },
  description:
    "Curated book bundles and thoughtful gifts made for those who live between the pages. Discover Chapter & Bloom, a UK book & gift boutique.",
  openGraph: {
    title: "Chapter & Bloom",
    description: "Made for Those Who Live Between the Pages.",
    url: siteUrl,
    siteName: "Chapter & Bloom",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chapter & Bloom",
    description: "Made for Those Who Live Between the Pages.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${fraunces.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-cream font-sans text-ink antialiased">
        <OrganizationJsonLd />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <CartProvider>
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
