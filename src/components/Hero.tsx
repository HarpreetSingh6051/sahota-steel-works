import { Building2, Flame, Layers, MapPin, MessageCircle, Phone } from "lucide-react";
import { business } from "@/data/business";
import { genericWhatsAppLink } from "@/lib/contact";
import ImageWithFallback from "@/components/ImageWithFallback";

const trustStrip = [
  {
    title: "Steel Material Supply",
    description: "Angles, channels, flats, pipes, rounds & more",
    icon: Layers,
  },
  {
    title: "Fabrication Solutions",
    description: "Iron & steel fabrication work",
    icon: Flame,
  },
  {
    title: "Construction & Industrial Needs",
    description: "Material enquiries for projects",
    icon: Building2,
  },
  {
    title: "Ludhiana, Punjab",
    description: "Near Khanna Dyeing, Tajpur Road",
    icon: MapPin,
  },
];

export default function Hero() {
  const primaryContact = business.contacts[0];
  return (
    <section id="home" className="relative isolate flex min-h-[92svh] items-center bg-ink-950">
      {/* Background photograph */}
      <div className="absolute inset-0 -z-10">
        <ImageWithFallback
          src="/images/hero.jpg"
          alt="Structural steel building frame under construction"
          fill
          preload
          sizes="100vw"
          quality={80}
          className="object-cover"
          style={{ objectPosition: "center 30%" }}
          fallbackLabel="Steel construction"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/75 to-ink-950/30" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/60" aria-hidden="true" />
      </div>

      <div className="container-site py-20 sm:py-28">
        <div className="max-w-3xl">
          <p className="eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            Steel Supply • Trading • Fabrication
          </p>

          <h1 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Steel solutions built on{" "}
            <span className="text-accent-500">strength</span> and{" "}
            <span className="text-accent-500">trust</span>.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-200 sm:text-lg">
            Your local partner for iron and steel materials, structural
            sections, and fabrication solutions for construction,
            engineering, and industrial requirements.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={primaryContact.phoneAction}
              className="inline-flex h-12 items-center justify-center gap-2 bg-accent-500 px-7 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-600"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Us Now
            </a>
            <a
              href="#products"
              className="inline-flex h-12 items-center justify-center gap-2 border border-white/30 px-7 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-accent-500 hover:text-accent-400"
            >
              Explore Our Products
            </a>
            <a
              href={genericWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Start a WhatsApp enquiry"
              className="inline-flex h-12 w-12 items-center justify-center border border-[#25D366]/60 text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-ink-950"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>

          <p className="mt-6 text-sm text-ink-300">
            Speak directly with {primaryContact.name} —{" "}
            <a href={primaryContact.phoneAction} className="font-semibold text-accent-400 hover:underline">
              {primaryContact.phoneDisplay}
            </a>
            {" "}
            or {business.contacts[1].name} —{" "}
            <a href={business.contacts[1].phoneAction} className="font-semibold text-accent-400 hover:underline">
              {business.contacts[1].phoneDisplay}
            </a>
          </p>
        </div>
      </div>

      {/* Compact trust strip */}
      <div className="absolute inset-x-0 bottom-0 hidden border-t border-white/10 bg-ink-950/70 backdrop-blur-sm md:block">
        <div className="container-site grid grid-cols-4 divide-x divide-white/10">
          {trustStrip.map((item) => (
            <div key={item.title} className="flex items-center gap-3 px-5 py-4">
              <item.icon className="h-6 w-6 shrink-0 text-accent-500" aria-hidden="true" />
              <div className="leading-tight">
                <p className="text-sm font-semibold uppercase tracking-wide text-white">
                  {item.title}
                </p>
                <p className="mt-0.5 text-xs text-ink-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}