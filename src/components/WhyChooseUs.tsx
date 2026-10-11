import type { CSSProperties } from "react";
import {
  ClipboardList,
  Layers,
  MapPin,
  MessagesSquare,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { whyUsPoints } from "@/data/services";
import type { WhyPoint } from "@/data/services";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const iconMap: Record<WhyPoint["icon"], LucideIcon> = {
  map: MapPin,
  layers: Layers,
  clipboard: ClipboardList,
  chat: MessagesSquare,
  phone: Phone,
};

export default function WhyChooseUs() {
  return (
    <section aria-labelledby="why-us-heading" className="relative overflow-hidden border-y border-white/10 bg-ink-900 pt-6 pb-20 sm:pt-8 sm:pb-28">
      <span className="divider-sheen" aria-hidden="true" />
      <div className="container-site">
        <SectionHeading
          titleId="why-us-heading"
          eyebrow="Why Sahota Steel Works"
          title="Practical reasons to get in touch"
          description="We keep things straightforward: local, direct, and easy to enquire."
          dark
        />

        <Reveal
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger
        >
          {whyUsPoints.map((point, index) => {
            const Icon = iconMap[point.icon];
            return (
              <div
                key={point.id}
                style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}
                className="flex gap-4 border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-accent-500/60"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/15 bg-white/[0.04] text-accent-400">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-bold uppercase tracking-wide text-white">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">
                    {point.description}
                  </p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}