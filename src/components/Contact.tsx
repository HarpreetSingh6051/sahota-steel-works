import {
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";
import { business } from "@/data/business";
import { genericWhatsAppLink } from "@/lib/contact";
import SectionHeading from "@/components/SectionHeading";

export default function Contact() {
  return (
    <section id="contact" className="bg-white py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="Contact Us"
          title="Reach Sahota Steel Works Directly"
          description="Call either of the contacts below, message us on WhatsApp, or get directions to our location on Tajpur Road, Ludhiana."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Contact options */}
          <div>
            <div className="grid gap-5 sm:grid-cols-2">
              {business.contacts.map((contact) => (
                <div key={contact.name} className="border border-ink-200 bg-ink-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent-600">
                    {contact.name}
                  </p>
                  <p className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-950">
                    {contact.phoneDisplay}
                  </p>
                  <a
                    href={contact.phoneAction}
                    className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 bg-ink-950 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-600"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Call {contact.name.split(" ")[0]}
                  </a>
                </div>
              ))}

              <div className="border border-ink-200 bg-ink-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-600">
                  WhatsApp Enquiry
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  Quick way to send your material or fabrication requirement.
                </p>
                <a
                  href={genericWhatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 border border-[#25D366] text-[#128c4a] transition-colors hover:bg-[#25D366] hover:text-white"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp Enquiry
                </a>
              </div>

              <div className="border border-ink-200 bg-ink-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-600">
                  Visit Us
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {business.address}
                </p>
                <a
                  href={business.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 border border-ink-300 text-sm font-semibold uppercase tracking-wide text-ink-800 transition-colors hover:border-accent-500 hover:text-accent-600"
                >
                  <Navigation className="h-4 w-4" aria-hidden="true" />
                  Get Directions
                </a>
              </div>
            </div>

            {business.email && (
              <a
                href={`mailto:${business.email}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink-800 hover:text-accent-600"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {business.email}
              </a>
            )}

            <a
              href={business.justdialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 border border-ink-200 bg-white px-5 py-3 text-sm font-semibold uppercase tracking-wide text-ink-700 transition-colors hover:border-accent-500 hover:text-accent-600"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              View Our Justdial Listing
            </a>

            <div className="mt-6 flex items-start gap-3 border-l-4 border-accent-500 bg-ink-50 p-4">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-ink-600">
                <strong className="text-ink-900">{business.name}</strong> —{" "}
                {business.address}
              </p>
            </div>
          </div>

          {/* Map preview */}
          <div className="flex flex-col">
            <div className="relative flex-1 overflow-hidden border border-ink-200 bg-ink-100">
              <iframe
                title="Map — Sahota Steel Works, Near Khanna Dyeing, Tajpur Road, Ludhiana"
                src={business.mapsEmbedUrl}
                className="min-h-[24rem] w-full flex-1"
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
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 bg-ink-950 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-600"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                Open in Google Maps
              </a>
              <a
                href={business.mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 border border-ink-300 text-sm font-semibold uppercase tracking-wide text-ink-800 transition-colors hover:border-accent-500 hover:text-accent-600"
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