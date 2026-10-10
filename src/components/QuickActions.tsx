import { ExternalLink, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { business } from "@/data/business";
import { genericWhatsAppLink } from "@/lib/contact";

interface ActionDef {
  id: string;
  label: string;
  value: string;
  icon: typeof Phone;
  href: string;
  external?: boolean;
}

/**
 * Quick contact action bar — every action is a real working link.
 * Email only appears once a verified address is configured.
 */
export default function QuickActions() {
  const actions: ActionDef[] = [
    ...business.contacts.map((c, i) => ({
      id: `call-${i}`,
      label: `Call ${c.name}`,
      value: c.phoneDisplay,
      icon: Phone,
      href: c.phoneAction,
    })),
    {
      id: "whatsapp",
      label: "WhatsApp Enquiry",
      value: "Message us directly",
      icon: MessageCircle,
      href: genericWhatsAppLink,
      external: true,
    },
    {
      id: "directions",
      label: "Get Directions",
      value: "Open in Google Maps",
      icon: MapPin,
      href: business.mapsDirectionsUrl,
      external: true,
    },
    {
      id: "justdial",
      label: "View Justdial Listing",
      value: "Business profile",
      icon: ExternalLink,
      href: business.justdialUrl,
      external: true,
    },
  ];

  const emailAction: ActionDef | null = business.email
    ? {
        id: "email",
        label: "Email Us",
        value: business.email,
        icon: Mail,
        href: `mailto:${business.email}`,
      }
    : null;

  return (
    <section aria-label="Quick contact actions" className="relative z-10 border-b border-ink-200 bg-white">
      <div className="container-site grid grid-cols-2 gap-px bg-ink-200 lg:grid-cols-5">
        {(emailAction ? [...actions, emailAction] : actions).map((action) => (
          <a
            key={action.id}
            href={action.href}
            target={action.external ? "_blank" : undefined}
            rel={action.external ? "noopener noreferrer" : undefined}
            className="group flex min-h-24 items-center gap-3 bg-white px-4 py-5 transition-colors hover:bg-ink-50"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-ink-200 text-ink-600 transition-colors group-hover:border-accent-500 group-hover:bg-accent-500 group-hover:text-white">
              <action.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-sm font-bold uppercase tracking-wide text-ink-950">
                {action.label}
              </span>
              <span className="block truncate text-xs text-ink-500">{action.value}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}