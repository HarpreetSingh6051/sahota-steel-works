"use client";

import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { business } from "@/data/business";
import { quoteWhatsAppLink } from "@/lib/contact";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

/** SSW monogram block — swap with the real logo later. */
function Monogram({ dark = true }: { dark?: boolean }) {
  return (
    <span
      className={`flex h-11 w-11 shrink-0 items-center justify-center border ${
        dark ? "border-white/20 bg-ink-800" : "border-ink-950/10 bg-ink-950"
      }`}
      aria-hidden="true"
    >
      <span className="font-display text-lg font-bold leading-none tracking-tight text-accent-500">
        SSW
      </span>
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Slim utility bar — desktop only */}
      <div className="hidden border-b border-white/10 bg-ink-950 text-ink-300 lg:block">
        <div className="container-site flex h-10 items-center justify-between text-xs">
          <p className="inline-flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 bg-accent-500" aria-hidden="true" />
            {business.address}
          </p>
          <div className="flex items-center gap-6">
            {business.contacts.map((c) => (
              <a
                key={c.name}
                href={c.phoneAction}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-accent-400"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                {c.name}: {c.phoneDisplay}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-ink-950/95 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.8)] backdrop-blur"
            : "border-white/5 bg-ink-950"
        }`}
      >
        <div className="container-site flex h-[4.5rem] items-center justify-between gap-4">
          {/* Brand */}
          <a href="#home" className="group flex items-center gap-3" aria-label={`${business.name} — back to top`}>
            <Monogram />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-lg font-bold uppercase tracking-wide text-white">
                Sahota Steel Works
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-accent-500">
                Steel Supply &amp; Fabrication
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-sm px-3 py-2 text-sm font-semibold uppercase tracking-wider text-ink-300 transition-colors hover:text-accent-400"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={quoteWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-11 items-center justify-center bg-accent-500 px-5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-600 sm:inline-flex"
            >
              Get a Quote
            </a>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-11 w-11 items-center justify-center border border-white/15 text-white transition-colors hover:border-accent-500 hover:text-accent-400 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`overflow-hidden border-t border-white/10 bg-ink-950 transition-[max-height,opacity] duration-300 lg:hidden ${
            open ? "max-h-[26rem] opacity-100" : "max-h-0 border-t-0 opacity-0"
          }`}
        >
          <nav aria-label="Mobile navigation" className="container-site flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center px-2 text-sm font-semibold uppercase tracking-wider text-ink-200 transition-colors hover:text-accent-400"
              >
                {link.label}
              </a>
            ))}
            <a
              href={quoteWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-11 items-center justify-center bg-accent-500 px-5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-600"
            >
              Get a Quote
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}