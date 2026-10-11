import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { business } from "@/data/business";
import BrandDefs from "@/components/BrandDefs";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

/**
 * NOTE — business.siteUrl is the production domain that resolves every
 * absolute metadata URL (Open Graph, Twitter, JSON-LD). It is read from
 * src/data/business.ts; update it there once the final domain is live.
 */

/** Exact page title + meta description reused across search and social cards. */
const siteTitle = "Sahota Steel Works | Steel Supply & Fabrication";
const siteDescription =
  "Steel supply and fabrication services in Ludhiana, Punjab. Contact Sahota Steel Works for your project requirements.";

/**
 * Branded Open Graph / Twitter share image (1200 x 630) — a static asset in
 * public/, referenced with an absolute HTTPS URL so social crawlers can fetch
 * it without authentication.
 */
const socialImageUrl = `${business.siteUrl}/images/og-cover.jpg`;
const socialImageAlt =
  "Sahota Steel Works — steel supply and fabrication services in Ludhiana, Punjab, India";

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Sahota Steel Works",
  },
  description: siteDescription,
  applicationName: business.name,
  keywords: [
    "steel supplier Ludhiana",
    "iron steel material supply Punjab",
    "MS angles channels flats pipes Ludhiana",
    "structural steel work Punjab",
    "steel fabrication Ludhiana",
    "Sahota Steel Works Tajpur Road",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${business.siteUrl}/`,
    siteName: business.name,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: socialImageUrl,
        width: 1200,
        height: 630,
        alt: socialImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [socialImageUrl],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#171717",
};

/** LocalBusiness structured data — only confirmed, factual details. */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${business.siteUrl}/#business`,
  name: business.name,
  description: business.summary,
  url: business.siteUrl,
  image: `${business.siteUrl}/images/hero.jpg`,
  telephone: business.contacts.map((c) => c.phoneAction.replace("tel:", "")),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Near Khanna Dyeing, Tajpur Road",
    addressLocality: "Ludhiana",
    addressRegion: "Punjab",
    addressCountry: "IN",
  },
  areaServed: "Ludhiana, Punjab, India",
  contactPoint: business.contacts.map((c) => ({
    "@type": "ContactPoint",
    name: c.name,
    telephone: c.phoneAction.replace("tel:", ""),
    contactType: "customer service",
  })),
} as const;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body className="flex min-h-svh flex-col bg-ink-950">
        {/* Enables the scroll-reveal hidden state only when JS is available,
            so content is never hidden for no-JS visitors. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:inline-flex focus:h-11 focus:items-center focus:bg-accent-500 focus:px-5 focus:text-sm focus:font-semibold focus:uppercase focus:tracking-wide focus:text-ink-950"
        >
          Skip to main content
        </a>
        <BrandDefs />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </body>
    </html>
  );
}