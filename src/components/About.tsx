import { MapPin, MessageCircle, Phone } from "lucide-react";
import { business } from "@/data/business";
import { genericWhatsAppLink } from "@/lib/contact";
import ImageWithFallback from "@/components/ImageWithFallback";
import SectionHeading from "@/components/SectionHeading";

const facts = [
  { label: "Location", value: business.address },
  { label: "Contact", value: `${business.contacts[0].name} • ${business.contacts[0].phoneDisplay}` },
  { label: "Also reachable", value: `${business.contacts[1].name} • ${business.contacts[1].phoneDisplay}` },
];

export default function About() {
  return (
    <section id="about" className="bg-white py-20 sm:py-28">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Photography */}
        <div className="relative">
          <div className="absolute -left-3 -top-3 h-24 w-24 border-l-4 border-t-4 border-accent-500" aria-hidden="true" />
          <div className="relative aspect-[4/3] overflow-hidden bg-ink-900">
            <ImageWithFallback
              src="/images/about.jpg"
              alt="Inside view of a steel structure showing beams and framework"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              fallbackLabel="Steel structure"
            />
          </div>
          <div className="absolute -bottom-3 -right-3 h-24 w-24 border-b-4 border-r-4 border-ink-950" aria-hidden="true" />
        </div>

        {/* Copy */}
        <div>
          <SectionHeading
            eyebrow="About Us"
            title="Steel supply & fabrication, handled directly"
            align="left"
          />
          <p className="mt-6 text-base leading-relaxed text-ink-600 sm:text-lg">
            Sahota Steel Works supplies iron and steel materials and provides
            fabrication solutions for construction, engineering, and
            industrial applications. We help customers source essential steel
            sections and materials for their projects, with a focus on
            practical solutions, dependable service, and direct communication.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-600">
            Based near Khanna Dyeing on Tajpur Road, Ludhiana, Punjab, we work
            with builders, contractors, fabricators, and industrial buyers —
            whatever the enquiry, you can speak directly with the business.
          </p>

          <dl className="mt-8 divide-y divide-ink-100 border-y border-ink-100">
            {facts.map((fact) => (
              <div key={fact.label} className="flex items-start gap-3 py-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-ink-500">
                    {fact.label}
                  </dt>
                  <dd className="mt-0.5 text-sm font-medium text-ink-900">{fact.value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={business.contacts[0].phoneAction}
              className="inline-flex h-12 items-center justify-center gap-2 bg-ink-950 px-6 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-600"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Us Now
            </a>
            <a
              href={genericWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 border border-ink-300 px-6 text-sm font-semibold uppercase tracking-wide text-ink-800 transition-colors hover:border-accent-500 hover:text-accent-600"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp Enquiry
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}