"use client";

import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { business } from "@/data/business";
import { quoteWhatsAppLink } from "@/lib/contact";
import { Logo, LogoMark, logoAriaLabel } from "@/components/Logo";

const navLinks = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Products", href: "#products", id: "products" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Gallery", href: "#gallery", id: "gallery" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");

  // Refined sticky-state transition
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: keep the active section highlighted in the nav
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Slim utility bar — desktop only */}
      <div className="hidden border-b border-white/10 bg-ink-950 text-ink-300 lg:block">
        <div className="container-site flex h-10 items-center justify-between text-xs">
          <p className="inline-flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 bg-accent-400" aria-hidden="true" />
            {business.address}
          </p>
          <div className="flex items-center gap-6">
            {business.contacts.map((c) => (
              <a
                key={c.name}
                href={c.phoneAction}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-accent-300"
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
          <a href="#home" className="group flex items-center" aria-label={logoAriaLabel}>
            <Logo />
          </a>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => {
              const active = activeId === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "true" : undefined}
                  className={`relative rounded-sm px-2.5 py-2 text-[13px] font-semibold uppercase tracking-wide transition-colors xl:px-3 xl:text-sm ${
                    active ? "text-white" : "text-ink-300 hover:text-accent-300"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-2.5 -bottom-0.5 h-0.5 origin-left bg-accent-400 transition-transform duration-300 xl:inset-x-3 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={quoteWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden h-11 items-center justify-center gap-2 bg-accent-500 px-5 text-sm font-semibold uppercase tracking-wide text-ink-950 transition-colors hover:bg-accent-400 sm:inline-flex"
            >
              Get a Quote
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-11 w-11 items-center justify-center border border-white/15 text-white transition-colors hover:border-accent-400 hover:text-accent-300 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`overflow-hidden border-t border-white/10 bg-ink-950 transition-[max-height,opacity] duration-300 lg:hidden ${
            open ? "max-h-[40rem] opacity-100" : "max-h-0 border-t-0 opacity-0"
          }`}
        >
          <nav aria-label="Mobile navigation" className="container-site flex flex-col gap-1 py-4">
            <div className="mb-2 flex items-center gap-2.5 border-b border-white/10 pb-4">
              <LogoMark className="h-8 w-8" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg font-bold uppercase tracking-wide text-white">
                  Sahota
                </span>
                <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent-300">
                  Steel Works
                </span>
              </span>
            </div>
            {navLinks.map((link) => {
              const active = activeId === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "true" : undefined}
                  className={`flex min-h-11 items-center border-l-2 px-3 text-sm font-semibold uppercase tracking-wider transition-colors ${
                    active
                      ? "border-accent-400 text-white"
                      : "border-transparent text-ink-200 hover:border-accent-500/50 hover:text-accent-300"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href={quoteWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="group mt-2 inline-flex h-11 items-center justify-center gap-2 bg-accent-500 px-5 text-sm font-semibold uppercase tracking-wide text-ink-950 transition-colors hover:bg-accent-400"
            >
              Get a Quote
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}