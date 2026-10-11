"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import {
  galleryItems,
  galleryCategories,
  type GalleryCategory,
  type GalleryItem,
} from "@/data/gallery";
import ImageWithFallback from "@/components/ImageWithFallback";
import SectionHeading from "@/components/SectionHeading";
import MetalCut from "@/components/MetalCut";
import Reveal from "@/components/Reveal";

type Filter = GalleryCategory | "all";

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [closing, setClosing] = useState(false);

  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const lastTriggerId = useRef<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeTimer = useRef<number | null>(null);
  const closingRef = useRef(false);

  const open = openId !== null;

  const filtered = useMemo<GalleryItem[]>(
    () =>
      filter === "all"
        ? galleryItems
        : galleryItems.filter((item) => item.category === filter),
    [filter],
  );

  const openImage = (id: string) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    closingRef.current = false;
    setClosing(false);
    lastTriggerId.current = id;
    setOpenId(id);
  };

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    closeTimer.current = window.setTimeout(() => {
      closeTimer.current = null;
      closingRef.current = false;
      setClosing(false);
      setOpenId(null);
      const id = lastTriggerId.current;
      if (id) triggerRefs.current.get(id)?.focus();
    }, 180);
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      setOpenId((currentId) => {
        if (currentId === null) return currentId;
        const index = filtered.findIndex((item) => item.id === currentId);
        if (index === -1) return currentId;
        const next = (index + dir + filtered.length) % filtered.length;
        return filtered[next]?.id ?? currentId;
      });
    },
    [filtered],
  );

  // Keyboard control + scroll lock while the lightbox is open
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close, step]);

  // Focus the close button when the lightbox opens
  useEffect(() => {
    if (open && !closingRef.current) closeButtonRef.current?.focus();
  }, [open, openId]);

  // Clean up any pending close timer on unmount
  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  const activeItem = openId
    ? (filtered.find((item) => item.id === openId) ?? null)
    : null;
  const activeIndex = activeItem
    ? filtered.findIndex((item) => item.id === activeItem.id)
    : -1;

  return (
    <section id="gallery" className="relative bg-ink-950 pt-6 pb-20 sm:pt-8 sm:pb-28">
      <MetalCut />
      <div className="container-site">
        <SectionHeading
          eyebrow="Gallery"
          title="Materials & Fabrication in Action"
          description="Browse steel materials, fabrication work, and structural examples. Representative photography — your project enquiries are welcome."
          dark
        />

        {/* Category filter */}
        <div
          role="group"
          aria-label="Filter gallery by category"
          className="mt-10 flex flex-wrap gap-2"
        >
          {galleryCategories.map((category) => {
            const active = filter === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setFilter(category.id)}
                aria-pressed={active}
                className={`inline-flex h-10 items-center border px-4 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  active
                    ? "border-accent-500 bg-accent-500 text-ink-950"
                    : "border-white/20 text-ink-300 hover:border-accent-400 hover:text-accent-300"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <Reveal className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4" stagger>
          {filtered.map((item, index) => (
            <button
              key={item.id}
              style={{ "--reveal-delay": `${index * 40}ms` } as CSSProperties}
              type="button"
              ref={(el) => {
                if (el) triggerRefs.current.set(item.id, el);
                else triggerRefs.current.delete(item.id);
              }}
              onClick={() => openImage(item.id)}
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
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-sm font-semibold uppercase tracking-wide text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {item.caption}
                <Expand className="h-4 w-4 text-accent-400" aria-hidden="true" />
              </span>
            </button>
          ))}
        </Reveal>

        <p className="mt-8 text-xs leading-relaxed text-ink-500">
          Photographs are representative industrial images — none are
          presented as photographs of specific Sahota Steel Works
          projects.
        </p>
      </div>

      {/* Lightbox */}
      {open && activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery image viewer — ${activeItem.caption}`}
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur-sm sm:p-8 ${
            closing ? "anim-lightbox-out pointer-events-none" : "anim-lightbox-in"
          }`}
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

          <figure className="relative max-w-5xl" onClick={(e) => e.stopPropagation()}>
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
                {activeIndex + 1} / {filtered.length}
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
