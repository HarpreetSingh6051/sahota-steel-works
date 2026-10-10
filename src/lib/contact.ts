import { business } from "@/data/business";

/**
 * Build a WhatsApp deep link.
 *
 * When `message` is provided it is URL-encoded and prefilled in the chat.
 * Following common WhatsApp conventions, the message uses the business
 * WhatsApp number supplied in the configuration.
 */
export function waLink(message?: string): string {
  const base = business.whatsappBaseUrl;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Primary WhatsApp message shown when the visitor clicks a generic enquiry. */
export const genericWhatsAppLink = waLink(
  "Hello Sahota Steel Works! I found your website and I would like to make an enquiry about steel material supply or fabrication."
);

/** Header / hero "Get a Quote" style message. */
export const quoteWhatsAppLink = waLink(
  "Hello Sahota Steel Works! I would like a quote for steel material or fabrication work. Please share the details."
);