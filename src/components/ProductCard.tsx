"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { MessageCircle, Phone } from "lucide-react";
import type { BusinessContact } from "@/data/business";
import { productEnquiryMessage, type Product } from "@/data/products";
import { waLink } from "@/lib/contact";
import ImageWithFallback from "@/components/ImageWithFallback";

interface ProductCardProps {
  product: Product;
  /** Primary contact used for the one-tap call button. */
  primaryContact: BusinessContact;
  /** Stagger delay (ms) for the scroll-reveal of this card. */
  delay?: number;
}

/**
 * A single showroom tile.
 *
 * On fine-pointer (desktop) hover the card tilts in 3D to follow the pointer,
 * with a metallic glare tracking the same position, an orange border glow and
 * a soft lift. The transform is applied via CSS custom properties on the
 * element, so React never re-renders during pointer movement.
 *
 * Touch and coarse pointers are ignored outright (`pointerType === "mouse"`
 * gate), and reduced-motion users get a completely static card. The wrapper is
 * `h-full` and the inner card is a flex column, so every card keeps the same
 * height and the enquiry buttons stay aligned.
 */
export default function ProductCard({
  product,
  primaryContact,
  delay = 0,
}: ProductCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const enabled = useRef(false);

  useEffect(() => {
    enabled.current =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const handleMove = (event: PointerEvent<HTMLElement>) => {
    if (!enabled.current || event.pointerType !== "mouse") return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const max = 7; // degrees — deliberately restrained
    card.style.setProperty("--tilt-rx", `${((0.5 - py) * max).toFixed(2)}deg`);
    card.style.setProperty("--tilt-ry", `${((px - 0.5) * max).toFixed(2)}deg`);
    card.style.setProperty("--tilt-gx", `${(px * 100).toFixed(1)}%`);
    card.style.setProperty("--tilt-gy", `${(py * 100).toFixed(1)}%`);
    card.style.setProperty("--tilt-lift", "1");
  };

  const reset = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--tilt-rx", "0deg");
    card.style.setProperty("--tilt-ry", "0deg");
    card.style.setProperty("--tilt-lift", "0");
  };

  return (
    <div
      className="h-full"
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      <article
        ref={cardRef}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        onBlur={reset}
        className="tilt-card group relative flex h-full flex-col overflow-hidden border border-white/10 bg-white/[0.02] transition-[border-color,box-shadow] duration-300 hover:z-10 hover:border-accent-500/60 hover:shadow-[0_30px_70px_-32px_rgba(232,102,27,0.5)]"
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
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
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

        {/* Pointer-following metallic highlight (inert until hover) */}
        <span className="tilt-card__glare" aria-hidden="true" />
      </article>
    </div>
  );
}
