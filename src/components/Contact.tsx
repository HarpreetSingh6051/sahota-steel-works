import {
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";
import { business } from "@/data/business";
import { genericWhatsAppLink } from "@/lib/contact";
import ImageWithFallback from "@/components/ImageWithFallback";
import SectionHeading from "@/components/SectionHeading";

export default function Contact() {
  return (
    <section id="contact" className="relative isolate overflow-hidden bg-ink-950 pt-6 pb-20 sm:pt-8 sm:pb-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="Contact Us"
          title="Reach Sahota Steel Works Directly"
          description="Call either of the contacts below, message us on WhatsApp, or get directions to our location on Tajpur Road, Ludhiana."
          dark
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Contact options — a balanced 2 x 2 grid of the real actions */}
          <div className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              {business.contacts.map((contact) => (
                <div key={contact.name} className="border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
                    {contact.name}
                  </p>
                  <p className="mt-2 font-display text-3xl font-bold tracking-tight text-white">
                    {contact.phoneDisplay}
                  </p>
                  <a
                    href={contact.phoneAction}
                    className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 bg-accent-500 text-sm font-semibold uppercase tracking-wide text-ink-950 transition-colors hover:bg-accent-400"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Call {contact.name.split(" ")[0]}
                  </a>
                </div>
              ))}

              <div className="border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
                  WhatsApp Enquiry
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">
                  Quick way to send your material or fabrication requirement.
                </p>
                <a
                  href={genericWhatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 border border-[#25D366]/70 text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-ink-950"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp Enquiry
                </a>
              </div>

              <div className="border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
                  Visit Us
                </p>
                <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-ink-300">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" aria-hidden="true" />
                  <span>{business.address}</span>
                </p>
                <a
                  href={business.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 border border-white/25 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-accent-500 hover:text-accent-300"
                >
                  <Navigation className="h-4 w-4" aria-hidden="true" />
                  Get Directions
                </a>
              </div>
            </div>

            {business.email && (
              <a
                href={`mailto:${business.email}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink-200 hover:text-accent-300"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {business.email}
              </a>
            )}

            {/* Scan-to-open QR — handy for printed materials and sharing */}
            <div className="flex flex-col gap-5 border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center">
              <div className="relative h-32 w-32 shrink-0 bg-white p-2">
                <ImageWithFallback
                  src="/images/website-qr.png"
                  alt="QR code that opens the Sahota Steel Works website"
                  fill
                  sizes="128px"
                  className="object-contain"
                  fallbackLabel="QR code"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
                  Scan to Open Our Website
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">
                  Point your phone camera at the QR code to open this website —
                  handy for sharing our steel products, location and contact
                  details.
                </p>
                <p className="mt-2 break-words text-xs text-ink-400">
                  {business.siteUrl}
                </p>
              </div>
            </div>
          </div>

          {/* Map preview — the iframe fills the column so no blank band shows */}
          <div className="flex flex-col">
            <div className="relative min-h-[20rem] flex-1 overflow-hidden border border-white/10 bg-ink-900">
              <iframe
                title="Map — Sahota Steel Works, Near Khanna Dyeing, Tajpur Road, Ludhiana"
                src={business.mapsEmbedUrl}
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a
                href={business.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 bg-accent-500 text-sm font-semibold uppercase tracking-wide text-ink-950 transition-colors hover:bg-accent-400"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                Open in Google Maps
              </a>
              <a
                href={business.mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 border border-white/25 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-accent-500 hover:text-accent-300"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Search Location
              </a>
            </div>
            <p className="mt-3 text-xs text-ink-400">
              Map preview loads from Google Maps. If it does not render, use
              the buttons above to open the address in Google Maps directly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
