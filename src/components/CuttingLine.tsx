"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Thin orange "cutting line" that draws in from the left once it scrolls
 * into view — used to reveal selected sections. Decorative only: hidden from
 * assistive tech and never interactive.
 *
 * Reduced motion resolves the line to its drawn state via CSS; a missing
 * IntersectionObserver reveals it on the next tick.
 */
export default function CuttingLine({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
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
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`cutting-line ${inView ? "is-in" : ""} ${className}`.trim()}
    />
  );
}
