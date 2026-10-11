import type { CSSProperties } from "react";
import {
  Building2,
  Flame,
  MessagesSquare,
  Scale,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { services, serviceEnquiryMessage } from "@/data/services";
import type { Service } from "@/data/services";
import { waLink } from "@/lib/contact";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import MetalCut from "@/components/MetalCut";

const iconMap: Record<Service["icon"], LucideIcon> = {
  truck: Truck,
  scale: Scale,
  flame: Flame,
  building: Building2,
  messages: MessagesSquare,
};

export default function Services() {
  return (
    <section id="services" className="relative bg-ink-950 py-20 text-white sm:py-28">
      <MetalCut />
      <div className="container-site">
        <SectionHeading
          eyebrow="What We Do"
          title="Services You Can Enquire About"
          description="Every service below is a real enquiry you can raise by phone or WhatsApp. Message us about your project and we will respond directly."
          dark
        />

        <Reveal
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger
        >
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <article
                key={service.id}
                style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}
                className="group flex flex-col border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-accent-500/60 hover:bg-white/[0.06]"
              >
                <span className="flex h-12 w-12 items-center justify-center border border-accent-500/40 text-accent-400 transition-colors group-hover:bg-accent-500 group-hover:text-ink-950">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold uppercase tracking-tight">
                  {service.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-300">
                  {service.description}
                </p>
                <a
                  href={waLink(serviceEnquiryMessage(service))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex h-11 items-center justify-center border border-white/20 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-[#25D366] hover:bg-[#25D366] hover:text-ink-950"
                >
                  Enquire on WhatsApp
                </a>
              </article>
            );
          })}

          {/* Call-out card keeps the grid balanced */}
          <article
            style={{ "--reveal-delay": `${services.length * 70}ms` } as CSSProperties}
            className="flex flex-col justify-center border border-accent-500/50 bg-navy-900 p-6"
          >
            <h3 className="font-display text-2xl font-bold uppercase leading-tight tracking-tight">
              Not sure where to start?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-300">
              Describe the material or the job you have in mind — we will tell
              you honestly what we can supply or fabricate.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={waLink(
                  "Hello Sahota Steel Works! I have a project requirement I would like to discuss."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center bg-accent-500 px-5 text-sm font-semibold uppercase tracking-wide text-ink-950 transition-colors hover:bg-accent-400"
              >
                Discuss on WhatsApp
              </a>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}