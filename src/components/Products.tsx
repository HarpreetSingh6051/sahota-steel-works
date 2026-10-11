"use client";

import type { CSSProperties } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { business } from "@/data/business";
import { products, productEnquiryMessage } from "@/data/products";
import { waLink } from "@/lib/contact";
import ImageWithFallback from "@/components/ImageWithFallback";
import IndustrialBackdrop from "@/components/IndustrialBackdrop";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function Products() {
  const primaryContact = business.contacts[0];

  return (
    <section
      id="products"
      className="relative isolate overflow-hidden bg-ink-950 py-20 text-white sm:py-28"
    >
      <IndustrialBackdrop variant="dark" intensity="full" />
      {/* Slow metallic reflection travelling across the showroom edge */}
      <span className="divider-sheen" aria-hidden="true" />

      <div className="container-site">
        <SectionHeading
          eyebrow="Steel Showroom"
          title="Find the Steel Your Project Needs."
          description="Browse the materials and fabrication work we supply, then enquire directly on WhatsApp for sizes, grades and delivery."
          align="left"
          dark
        />

        {/* Uniform showroom grid — every card shares the same height,
            image-container size and bottom-aligned actions. */}
        <Reveal
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          stagger
        >
          {products.map((product, index) => (
            <article
              key={product.id}
              style={{ "--reveal-delay": `${index * 60}ms` } as CSSProperties}
              className="group relative flex h-full flex-col overflow-hidden border border-white/10 bg-white/[0.02] transition-[border-color,box-shadow] duration-300 hover:border-accent-500/60 hover:shadow-[0_24px_60px_-30px_rgba(232,102,27,0.45)]"
            >
              {/* Product photograph — consistent crop on every card */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  quality={82}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  fallbackLabel={product.name}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent"
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 border border-white/15 bg-ink-950/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-200 backdrop-blur-sm">
                  {product.profile}
                </span>
                {/* Restrained metallic shine — sweeps across on hover only */}
                <span className="product-shine" aria-hidden="true" />
              </div>

              {/* Details — flex column keeps the actions aligned at the
                  bottom of every card, whatever the description length */}
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="font-display text-2xl font-bold uppercase leading-none tracking-tight text-white">
                  {product.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-300">
                  {product.description}
                </p>

                <div className="mt-5 flex items-stretch gap-2">
                  <a
                    href={waLink(productEnquiryMessage(product))}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Enquire about ${product.name} on WhatsApp`}
                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 bg-accent-500 px-4 text-xs font-semibold uppercase tracking-wide text-ink-950 transition-colors duration-300 hover:bg-accent-400 sm:text-sm"
                  >
                    <MessageCircle
                      className="h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                    Enquire on WhatsApp
                  </a>
                  <a
                    href={primaryContact.phoneAction}
                    aria-label={`Call ${primaryContact.name} about ${product.name}`}
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-white/25 text-white transition-colors duration-300 hover:border-accent-400 hover:text-accent-300"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </Reveal>

        <p className="mt-10 text-xs leading-relaxed text-ink-500">
          Product photographs are representative industry images, not
          photographs of our current stock. For exact sizes, grades and
          availability, enquire on WhatsApp or call{" "}
          <a
            href={primaryContact.phoneAction}
            className="font-semibold text-accent-300 hover:underline"
          >
            {primaryContact.phoneDisplay}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
