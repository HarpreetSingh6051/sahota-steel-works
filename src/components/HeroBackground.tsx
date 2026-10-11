"use client";

import { useEffect, useRef } from "react";
import ImageWithFallback from "@/components/ImageWithFallback";

/**
 * Layered hero backdrop.
 *
 * Composes the hero photograph, dark legibility gradients, blurred workshop
 * lights (orange + warm amber), a steel-profile motif and an occasional
 * orange metallic sweep. A light, rAF-throttled scroll listener nudges each
 * `[data-parallax]` layer by a different amount for a gentle sense of depth.
 *
 * Performance / a11y:
 * - The photograph sits in an oversized box so parallax never reveals an edge.
 * - One passive listener + one rAF per frame; nothing runs for reduced motion.
 * - Purely decorative: hidden from assistive tech and never interactive.
 */
export default function HeroBackground() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layers = Array.from(
      root.querySelectorAll<HTMLElement>("[data-parallax]"),
    );
    if (layers.length === 0) return;

    let raf = 0;
    const apply = () => {
      raf = 0;
      const rect = root.getBoundingClientRect();
      // 0 while the hero fills the viewport, 1 once it has fully scrolled away.
      const progress = Math.min(
        Math.max(-rect.top / Math.max(rect.height, 1), 0),
        1,
      );
      for (const layer of layers) {
        const speed = Number(layer.dataset.parallax) || 0;
        layer.style.setProperty(
          "--parallax-y",
          `${(progress * speed).toFixed(2)}px`,
        );
      }
    };

    const schedule = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Photograph — oversized + parallaxed so edges never show */}
      <div
        className="hero-parallax absolute inset-x-0 -top-[12%] h-[124%]"
        data-parallax="70"
      >
        <ImageWithFallback
          src="/images/hero.jpg"
          alt="Steel structural framework and beams at a construction site"
          fill
          preload
          sizes="100vw"
          quality={80}
          className="object-cover"
          style={{ objectPosition: "center 40%" }}
          fallbackLabel="Steel structure"
        />
      </div>

      {/* Dark gradients — keep hero copy legible over the photograph */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-ink-950/70" />

      {/* Blurred workshop lights — drifting, and parallaxed for depth */}
      <div className="hero-parallax absolute inset-0" data-parallax="120">
        <div
          className="anim-orb-drift absolute -left-24 top-0 h-[60%] w-[55%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(232,102,27,0.30) 0%, rgba(232,102,27,0) 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="anim-orb-drift-2 absolute -right-24 bottom-0 h-[50%] w-[45%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,122,47,0.18) 0%, rgba(255,122,47,0) 70%)",
            filter: "blur(90px)",
          }}
        />
      </div>

      {/* Small warm light near the welding focal point — extra depth */}
      <div className="hero-parallax absolute inset-0" data-parallax="170">
        <div
          className="absolute left-[62%] top-[46%] h-[34%] w-[26%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,183,71,0.22) 0%, rgba(255,183,71,0) 72%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 45%, transparent 40%, rgba(5,9,13,0.7) 100%)",
        }}
      />

      {/* Steel-profile motif — lightest parallax layer */}
      <div
        className="hero-parallax absolute inset-0 hidden lg:block"
        data-parallax="40"
      >
        <svg
          className="absolute right-0 top-0 h-full w-1/2"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          focusable="false"
        >
          <g fill="none" stroke="#dcdcdc" strokeWidth="1" opacity="0.1">
            <path d="M120 90 h150 v16 h-67 v180 h67 v16 h-150 v-16 h67 v-180 h-67 Z" />
            <path d="M340 220 h130 v14 h-58 v150 h58 v14 h-130 v-14 h58 v-150 h-58 Z" />
          </g>
          <g stroke="#e8661b" strokeWidth="1.2" opacity="0.14" fill="none">
            <line x1="120" y1="330" x2="470" y2="330" />
            <line x1="470" y1="90" x2="470" y2="398" />
          </g>
        </svg>
      </div>

      {/* Occasional orange metallic light sweep */}
      <div className="hero-sweep" />
    </div>
  );
}
