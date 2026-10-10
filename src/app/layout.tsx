import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { business } from "@/data/business";

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
 * NOTE — business.siteUrl is a placeholder used to resolve absolute metadata
 * URLs (Open Graph, JSON-LD). Replace it with the real production domain
 * after the first deployment (see README).
 */
export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default:
      "Sahota Steel Works | Steel Supply & Fabrication in Ludhiana, Punjab",
    template: "%s | Sahota Steel Works",
  },
  description: business.summary,
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
    url: "/",
    siteName: business.name,
    title:
      "Sahota Steel Works | Steel Supply & Fabrication in Ludhiana, Punjab",
    description: business.summary,
    images: [
      {
        url: "/images/hero.jpg",
        width: 1920,
        height: 1080,
        alt: "Structural steel building frame under construction",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Sahota Steel Works | Steel Supply & Fabrication in Ludhiana, Punjab",
    description: business.summary,
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d1116",
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
      <body className="flex min-h-svh flex-col bg-ink-50">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:inline-flex focus:h-11 focus:items-center focus:bg-accent-500 focus:px-5 focus:text-sm focus:font-semibold focus:uppercase focus:tracking-wide focus:text-white"
        >
          Skip to main content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </body>
    </html>
  );
}