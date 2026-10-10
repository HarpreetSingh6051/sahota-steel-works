"use client";

import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { galleryItems } from "@/data/gallery";
import ImageWithFallback from "@/components/ImageWithFallback";
import SectionHeading from "@/components/SectionHeading";

export default function Gallery() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const open = openIdx !== null;

  const openImage = (i: number) => {
    lastTriggerRef.current = triggerRefs.current[i] ?? null;
    setOpenIdx(i);
  };

  const close = () => {
    setOpenIdx(null);
    lastTriggerRef.current?.focus();
  };

  const step = (dir: 1 | -1) => {
    setOpenIdx((current) => {
      if (current === null) return current;
      return (current + dir + galleryItems.length) % galleryItems.length;
    });
  };

  // Keyboard control + scroll lock while the lightbox is open
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Focus the close button when the lightbox opens
  useEffect(() => {
    if (open) closeButtonRef.current?.focus();
  }, [open, openIdx]);

  const activeItem = openIdx !== null ? galleryItems[openIdx] : null;

  return (
    <section id="gallery" className="bg-ink-950 py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="Gallery"
          title="Materials & Fabrication in Action"
          description="A look at the kind of steel materials, sections, and fabrication work we deal with. Representative imagery — your project enquiries are welcome."
          dark
        />

        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {galleryItems.map((item, i) => (
            <button
              key={item.src}
              type="button"
              ref={(el) => {
                triggerRefs.current[i] = el;
              }}
              onClick={() => openImage(i)}
              aria-label={`View gallery image: ${item.caption}`}
              className="group relative aspect-[4/3] overflow-hidden bg-ink-900 text-left"
            >
              <ImageWithFallback
                src={item.src}
                alt={item.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                fallbackLabel="Gallery image"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
              <span className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-sm font-semibold uppercase tracking-wide text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {item.caption}
                <Expand className="h-4 w-4 text-accent-400" aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>

        <p className="mt-8 text-xs leading-relaxed text-ink-500">
          Photographs are representative industrial images used until real shop
          photographs become available — they are not presented as photos of
          specific Sahota Steel Works projects.
        </p>
      </div>

      {/* Lightbox */}
      {open && activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery image viewer — ${activeItem.caption}`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur-sm sm:p-8"
          onClick={close}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label="Close image viewer"
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors hover:border-accent-500 hover:text-accent-400"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 border border-white/25 p-3 text-white transition-colors hover:border-accent-500 hover:text-accent-400 sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>

          <figure
            className="relative max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageWithFallback
              src={activeItem.src}
              alt={activeItem.alt}
              width={activeItem.width}
              height={activeItem.height}
              sizes="(min-width: 1024px) 80vw, 100vw"
              className="mx-auto h-auto max-h-[80vh] w-auto max-w-full object-contain"
              fallbackLabel="Gallery image"
            />
            <figcaption className="mt-4 flex items-center justify-between gap-4 text-sm">
              <span className="font-semibold uppercase tracking-wide text-white">
                {activeItem.caption}
              </span>
              <span className="tabular-nums text-ink-400">
                {openIdx! + 1} / {galleryItems.length}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next image"
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 border border-white/25 p-3 text-white transition-colors hover:border-accent-500 hover:text-accent-400 sm:right-6"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}