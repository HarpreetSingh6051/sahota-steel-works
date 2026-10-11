"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Metal-cutting divider — a single luminous line sweeps across the section
 * boundary with a few short-lived sparks. Plays once when scrolled into view.
 * Decorative only: hidden from assistive tech and never interactive.
 */
export default function MetalCut() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setPlayed(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`metalcut-wrap pointer-events-none absolute inset-x-0 top-0 z-10 h-px ${
        played ? "is-played" : ""
      }`}
    >
      <span className="metalcut-line" />
      <span className="metalcut-spark mc-s1" />
      <span className="metalcut-spark mc-s2" />
      <span className="metalcut-spark mc-s3" />
    </div>
  );
}