import { MessageCircle, Navigation, Phone } from "lucide-react";
import { business } from "@/data/business";
import { quoteWhatsAppLink } from "@/lib/contact";

/**
 * Fixed bottom action bar for mobile — the three highest-value actions are
 * always one tap away. Hidden on large screens where the header nav is full.
 * Uses env(safe-area-inset-bottom) so it clears iPhone home indicators.
 */
export default function MobileActionBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-950 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.7)] lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-3 divide-x divide-white/10">
        <a
          href={business.contacts[0].phoneAction}
          className="flex min-h-12 flex-col items-center justify-center gap-0.5 py-2 text-white transition-colors hover:bg-ink-900"
        >
          <Phone className="h-5 w-5 text-accent-400" aria-hidden="true" />
          <span className="text-[11px] font-semibold uppercase tracking-wide">Call</span>
        </a>
        <a
          href={quoteWhatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 flex-col items-center justify-center gap-0.5 py-2 text-white transition-colors hover:bg-ink-900"
        >
          <MessageCircle className="h-5 w-5 text-[#25D366]" aria-hidden="true" />
          <span className="text-[11px] font-semibold uppercase tracking-wide">WhatsApp</span>
        </a>
        <a
          href={business.mapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 flex-col items-center justify-center gap-0.5 py-2 text-white transition-colors hover:bg-ink-900"
        >
          <Navigation className="h-5 w-5 text-accent-400" aria-hidden="true" />
          <span className="text-[11px] font-semibold uppercase tracking-wide">Directions</span>
        </a>
      </div>
    </div>
  );
}