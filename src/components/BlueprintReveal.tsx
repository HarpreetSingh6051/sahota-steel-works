"use client";

import { useEffect, useRef, useState } from "react";
import ImageWithFallback from "@/components/ImageWithFallback";

interface BlueprintRevealProps {
  src: string;
  alt: string;
  sizes: string;
  fallbackLabel: string;
  className?: string;
}

/**
 * Drafting-blueprint linework that crossfades into the real steel
 * photograph once it scrolls into view — "drawing becomes steel".
 *
 * The photograph is the default state, so it is always shown without
 * JavaScript; reduced motion resolves straight to the photograph.
 */
export default function BlueprintReveal({
  src,
  alt,
  sizes,
  fallbackLabel,
  className = "",
}: BlueprintRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || typeof IntersectionObserver === "undefined") {
      const id = window.setTimeout(() => setInView(true), 0);
      return () => window.clearTimeout(id);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`blueprint-reveal relative h-full w-full ${
        inView ? "is-in" : ""
      } ${className}`.trim()}
    >
      <div className="photo-layer">
        <ImageWithFallback
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          fallbackLabel={fallbackLabel}
        />
      </div>

      <div className="blueprint-layer" aria-hidden="true">
        <svg
          viewBox="0 0 400 300"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
        >
          {/* Steel frame outline */}
          <g
            fill="none"
            stroke="#cbd0d6"
            strokeWidth="1.6"
            strokeLinejoin="round"
            opacity="0.85"
          >
            <path d="M120 244 V86 H280 V244" />
            <path d="M120 166 H280" />
            <path d="M120 166 L280 86" />
            <path d="M104 244 H136" />
            <path d="M264 244 H296" />
          </g>

          {/* Dimension lines + connection nodes */}
          <g fill="none" stroke="#e8661b" strokeWidth="1.4" opacity="0.9">
            <path d="M96 86 V244" />
            <path d="M92 86 H100" />
            <path d="M92 244 H100" />
            <path d="M120 268 H280" />
            <path d="M120 264 V272" />
            <path d="M280 264 V272" />
          </g>
          <g fill="#e8661b" opacity="0.9">
            <circle cx="120" cy="86" r="3" />
            <circle cx="280" cy="86" r="3" />
            <circle cx="120" cy="166" r="3" />
            <circle cx="280" cy="166" r="3" />
          </g>

          {/* Drafting marks */}
          <g fill="none" stroke="#b8b8b8" strokeWidth="1" opacity="0.5">
            <path d="M200 58 v10 M195 63 h10" />
            <circle cx="330" cy="120" r="14" />
            <path d="M330 100 v6 M330 134 v6 M310 120 h6 M344 120 h6" />
          </g>
        </svg>
      </div>
    </div>
  );
}
