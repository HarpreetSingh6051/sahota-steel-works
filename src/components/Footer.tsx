import { ArrowUp, ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react";
import { business } from "@/data/business";
import { products } from "@/data/products";
import { genericWhatsAppLink } from "@/lib/contact";
import ShareButton from "@/components/ShareButton";
import CopyrightYear from "@/components/CopyrightYear";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

/** SSR monogram block matching the header brand. */
function Monogram() {
  return (
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center border border-accent-500/40 bg-ink-900"
      aria-hidden="true"
    >
      <span className="font-display text-lg font-bold leading-none tracking-tight text-accent-500">
        SSW
      </span>
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950 text-ink-300">
      <div className="container-site grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8">
        {/* Brand */}
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <Monogram />
            <p className="leading-tight">
              <span className="block font-display text-xl font-bold uppercase tracking-wide text-white">
                {business.name}
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-accent-500">
                Steel Supply &amp; Fabrication
              </span>
            </p>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-400">
            {business.summary}
          </p>
          <ShareButton className="mt-8 w-full sm:w-auto" />
        </div>

        {/* Quick links */}
        <nav className="lg:col-span-2" aria-label="Footer quick links">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Quick Links
          </h3>
          <ul className="mt-5 space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-8 items-center text-sm text-ink-400 transition-colors hover:text-accent-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Products */}
        <div className="lg:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Products
          </h3>
          <ul className="mt-5 space-y-2.5">
            {products.map((product) => (
              <li key={product.id}>
                <a
                  href="#products"
                  className="inline-flex min-h-8 items-center text-sm text-ink-400 transition-colors hover:text-accent-400"
                >
                  {product.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="lg:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Contact
          </h3>
          <ul className="mt-5 space-y-3.5 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden="true" />
              <a
                href={business.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-400 transition-colors hover:text-accent-400"
              >
                {business.address}
              </a>
            </li>
            {business.contacts.map((contact) => (
              <li key={contact.name} className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden="true" />
                <a
                  href={contact.phoneAction}
                  className="text-ink-400 transition-colors hover:text-accent-400"
                >
                  {contact.name} — {contact.phoneDisplay}
                </a>
              </li>
            ))}
            <li className="flex items-start gap-2.5">
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden="true" />
              <a
                href={genericWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-400 transition-colors hover:text-accent-400"
              >
                WhatsApp Enquiry
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden="true" />
              <a
                href={business.justdialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-400 transition-colors hover:text-accent-400"
              >
                View Our Justdial Listing
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {business.name}, {business.location}. All rights
            reserved.
          </p>
          <a
            href="#home"
            className="inline-flex min-h-8 w-fit items-center gap-1.5 text-ink-400 transition-colors hover:text-accent-400"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}