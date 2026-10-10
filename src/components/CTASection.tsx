import { MessageCircle, Navigation, Phone } from "lucide-react";
import { business } from "@/data/business";
import { genericWhatsAppLink } from "@/lib/contact";
import ImageWithFallback from "@/components/ImageWithFallback";

export default function CTASection() {
  return (
    <section
      id="enquire"
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden bg-ink-950 py-24 sm:py-32"
    >
      <div className="absolute inset-0 -z-10">
        <ImageWithFallback
          src="/images/cta.jpg"
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          quality={75}
          className="object-cover"
          fallbackLabel="Steel background"
        />
        <div className="absolute inset-0 bg-ink-950/85" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-transparent to-ink-950/70" aria-hidden="true" />
      </div>

      <div className="container-site text-center">
        <p className="eyebrow justify-center">
          <span className="eyebrow-line" aria-hidden="true" />
          Let&apos;s Talk Steel
          <span className="eyebrow-line" aria-hidden="true" />
        </p>

        <h2
          id="cta-heading"
          className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Looking for steel materials or fabrication support?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-300 sm:text-lg">
          Tell us what your project needs. Contact Sahota Steel Works directly
          to discuss your material or fabrication requirements.
        </p>

        <div className="mx-auto mt-10 flex max-w-3xl flex-col justify-center gap-3 sm:flex-row">
          <a
            href={business.contacts[0].phoneAction}
            className="inline-flex h-12 items-center justify-center gap-2 bg-accent-500 px-8 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-600"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call Now
          </a>
          <a
            href={genericWhatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 border border-[#25D366] px-8 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#25D366] hover:text-ink-950"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Enquire on WhatsApp
          </a>
          <a
            href={business.mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 border border-white/30 px-8 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-accent-500 hover:text-accent-400"
          >
            <Navigation className="h-4 w-4" aria-hidden="true" />
            Get Directions
          </a>
        </div>

        <p className="mt-8 text-sm text-ink-400">
          Call {business.contacts[0].name} at{" "}
          <a href={business.contacts[0].phoneAction} className="font-semibold text-accent-400 hover:underline">
            {business.contacts[0].phoneDisplay}
          </a>{" "}
          or {business.contacts[1].name} at{" "}
          <a href={business.contacts[1].phoneAction} className="font-semibold text-accent-400 hover:underline">
            {business.contacts[1].phoneDisplay}
          </a>
        </p>
      </div>
    </section>
  );
}