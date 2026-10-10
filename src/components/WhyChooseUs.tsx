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

const iconMap: Record<WhyPoint["icon"], LucideIcon> = {
  map: MapPin,
  layers: Layers,
  clipboard: ClipboardList,
  chat: MessagesSquare,
  phone: Phone,
};

export default function WhyChooseUs() {
  return (
    <section aria-labelledby="why-us-heading" className="border-y border-ink-200 bg-white py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="Why Sahota Steel Works"
          title="Practical reasons to get in touch"
          description="We keep things straightforward: local, direct, and easy to enquire."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyUsPoints.map((point) => {
            const Icon = iconMap[point.icon];
            return (
              <div
                key={point.id}
                className="flex gap-4 border border-ink-200 bg-ink-50 p-6 transition-colors hover:border-accent-500/60"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-ink-200 bg-white text-accent-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-bold uppercase tracking-wide text-ink-950">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {point.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}