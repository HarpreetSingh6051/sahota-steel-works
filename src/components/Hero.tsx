import {
  ArrowRight,
  Building2,
  Flame,
  Layers,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { business } from "@/data/business";
import { genericWhatsAppLink } from "@/lib/contact";
import ImageWithFallback from "@/components/ImageWithFallback";
import WeldingEffect from "@/components/WeldingEffect";
import { LogoMark } from "@/components/Logo";

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
    title: "Construction & Industrial",
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
    <section
      id="home"
      className="relative isolate flex min-h-[92svh] items-center overflow-hidden bg-ink-950"
    >
      {/* Background photograph + atmospheric depth */}
      <div className="absolute inset-0 -z-10">
        <ImageWithFallback
          src="/images/hero.jpg"
          alt="Steel structural framework and beams at a construction site"
          fill
          preload
          sizes="100vw"
          quality={80}
          className="object-cover"
          style={{ objectPosition: "center 40%" }}
          fallbackLabel="Steel structure"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/35"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-ink-950/70"
          aria-hidden="true"
        />
        {/* Blurred industrial light sources — slowly drifting */}
        <div
          className="anim-orb-drift absolute -left-24 top-0 h-[60%] w-[55%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(232,102,27,0.30) 0%, rgba(232,102,27,0) 70%)",
            filter: "blur(80px)",
          }}
          aria-hidden="true"
        />
        <div
          className="anim-orb-drift-2 absolute -right-24 bottom-0 h-[50%] w-[45%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,122,47,0.18) 0%, rgba(255,122,47,0) 70%)",
            filter: "blur(90px)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 45%, transparent 40%, rgba(5,9,13,0.7) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Steel-profile motif */}
        <svg
          className="absolute right-0 top-0 hidden h-full w-1/2 lg:block"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          focusable="false"
        >
          <g
            fill="none"
            stroke="#dcdcdc"
            strokeWidth="1"
            opacity="0.1"
          >
            <path d="M120 90 h150 v16 h-67 v180 h67 v16 h-150 v-16 h67 v-180 h-67 Z" />
            <path d="M340 220 h130 v14 h-58 v150 h58 v14 h-130 v-14 h58 v-150 h-58 Z" />
          </g>
          <g stroke="#e8661b" strokeWidth="1.2" opacity="0.14" fill="none">
            <line x1="120" y1="330" x2="470" y2="330" />
            <line x1="470" y1="90" x2="470" y2="398" />
          </g>
        </svg>
      </div>

      <WeldingEffect />

      <div className="container-site py-24 sm:py-28">
        <div className="max-w-3xl">
          {/* Brand emblem */}
          <p className="anim-fade-up flex items-center gap-3">
            <LogoMark className="h-10 w-10 shrink-0" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-bold uppercase tracking-[0.06em] text-white">
                Sahota Steel Works
              </span>
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.34em] text-accent-300">
                Ludhiana · Punjab
              </span>
            </span>
          </p>

          <p className="eyebrow eyebrow-light anim-fade-up-1 mt-8">
            <span className="eyebrow-line" aria-hidden="true" />
            Steel Supply · Trading · Fabrication
          </p>

          <h1 className="anim-fade-up-2 mt-5 font-display text-5xl font-bold uppercase leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl">
            The Right Steel for What You&apos;re{" "}
            <span className="text-accent-400">Building.</span>
          </h1>

          <p className="anim-fade-up-3 mt-6 max-w-xl text-base leading-relaxed text-ink-200 sm:text-lg">
            Explore steel materials and fabrication solutions for construction,
            engineering, and industrial requirements.
          </p>

          <div className="anim-fade-up-4 mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="#products"
              className="group inline-flex h-12 items-center justify-center gap-2 bg-accent-500 px-7 text-sm font-semibold uppercase tracking-wide text-ink-950 transition-colors hover:bg-accent-400"
            >
              Explore Steel Products
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href={genericWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 border border-white/30 px-7 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-accent-300 hover:text-accent-300"
            >
              <MessageCircle
                className="h-4 w-4"
                aria-hidden="true"
              />
              WhatsApp Enquiry
            </a>
            <a
              href={primaryContact.phoneAction}
              className="inline-flex h-12 items-center justify-center gap-2 px-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:text-accent-300 sm:px-3"
            >
              <Phone className="h-4 w-4 text-accent-400" aria-hidden="true" />
              Call Now
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

          <p className="anim-fade-up-4 mt-6 text-sm text-ink-300">
            Speak directly with {primaryContact.name} —{" "}
            <a
              href={primaryContact.phoneAction}
              className="font-semibold text-accent-300 hover:underline"
            >
              {primaryContact.phoneDisplay}
            </a>{" "}
            or {business.contacts[1].name} —{" "}
            <a
              href={business.contacts[1].phoneAction}
              className="font-semibold text-accent-300 hover:underline"
            >
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
              <item.icon className="h-6 w-6 shrink-0 text-accent-400" aria-hidden="true" />
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
