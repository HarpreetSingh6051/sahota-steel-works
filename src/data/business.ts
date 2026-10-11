/**
 * Central business configuration for Sahota Steel Works.
 *
 * Every phone number, link and displayed contact detail lives here so the
 * site can be updated without touching any component markup.
 *
 * NOTE — siteUrl below is the verified production domain. Override it with
 * NEXT_PUBLIC_SITE_URL when moving to a custom domain (see README).
 */

export interface BusinessContact {
  /** Contact person name, e.g. "Rajinder Singh" */
  name: string;
  /** Human-friendly phone number shown to visitors */
  phoneDisplay: string;
  /** tel: URI used to open the dialer */
  phoneAction: string;
}

export const business = {
  name: "Sahota Steel Works",
  shortName: "SSW",
  tagline: "Your Trusted Partner for Steel Supply & Fabrication",
  /**
   * Short factual description — no invented history or certifications.
   */
  summary:
    "Sahota Steel Works supplies iron and steel materials and provides fabrication solutions for construction, engineering, and industrial needs in Ludhiana, Punjab.",
  location: "Ludhiana, Punjab, India",
  address: "Near Khanna Dyeing, Tajpur Road, Ludhiana, Punjab, India.",

  contacts: [
    {
      name: "Navjot Singh",
      phoneDisplay: "9855285484",
      phoneAction: "tel:+919855285484",
    },
    {
      name: "Rajinder Singh",
      phoneDisplay: "9814472014",
      phoneAction: "tel:+919814472014",
    },
  ] satisfies BusinessContact[],

  /** Primary WhatsApp target (Navjot Singh's number). */
  whatsappNumber: "919855285484",

  /** Base WhatsApp deep link — build prefilled messages with waLink(). */
  whatsappBaseUrl: "https://wa.me/919855285484",

  /** Exact Google Maps directions URL supplied by the business. */
  mapsDirectionsUrl:
    "https://google.com/maps?sca_esv=d0fa25ced5188e1a&rlz=1C1YTUH_enIN1146IN1149&output=search&q=sahota+steel+works&source=lnms&fbs=ABfTbFVyMZGZf1hfvX9uKjN_-G8cqCQj_06QnZs315LoFmPf5bBLHMJ0vMQmTbuI72DM7jnxvATrUU2Yg9dwuUGnsUHc5cxu-aqCYeCJSAtXufN99fkgXpO2vANmbLJoH_f8uj_5jrFgu-r9VMH4YorzvNCSju3jKybaf5YHaYpfbaB0UMh_XtHeo1t89mP6pE2PXqbJ2WlnRhCPrzH1bVrlRooHF6xvPg&entry=mc&ved=1t:200715&ictx=111",

  /** Keyless Google Maps embed used for the map preview iframe. */
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Sahota%20Steel%20Works%2C%20Near%20Khanna%20Dyeing%2C%20Tajpur%20Road%2C%20Ludhiana%2C%20Punjab&t=&z=14&ie=UTF8&iwloc=&output=embed",

  /** Reliable search link fallback for the same destination. */
  mapsSearchUrl:
    "https://www.google.com/maps/search/?api=1&query=Sahota%20Steel%20Works%2C%20Near%20Khanna%20Dyeing%2C%20Tajpur%20Road%2C%20Ludhiana%2C%20Punjab",

  /**
   * Verified email — keep null until a real address is confirmed.
   * Email actions are hidden from the UI while this is null.
   */
  email: null as string | null,

  /**
   * Verified production domain — resolves every absolute metadata URL
   * (Open Graph, Twitter, canonical and JSON-LD). Override with the
   * NEXT_PUBLIC_SITE_URL env var (e.g. a custom domain) without editing
   * this file.
   */
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL || "https://sahota-steel-works.vercel.app",
} as const;

/** Default WhatsApp message used for the generic enquiry button. */
export const defaultWhatsAppMessage =
  "Hello Sahota Steel Works! I found your website and I would like to make an enquiry about steel material supply or fabrication.";