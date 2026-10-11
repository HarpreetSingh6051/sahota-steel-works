"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Extra transition delay (ms) for this element. */
  delay?: number;
  /** When true, direct children animate individually with a CSS stagger. */
  stagger?: boolean;
}

/**
 * Reveals its content once when it scrolls into view.
 *
 * The hidden state is gated behind `html.js`, so content is never lost when
 * JavaScript is unavailable. Reduced-motion and missing IntersectionObserver
 * both resolve immediately to the visible state.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  stagger = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Ancient browsers without IntersectionObserver: reveal on the next tick
    // (deferred so we never call setState synchronously inside the effect).
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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${stagger ? "reveal-stagger" : "reveal"} ${
        inView ? "is-in" : ""
      } ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}