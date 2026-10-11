"use client";

import { useEffect, useRef, useState } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  dark?: boolean;
  /** Optional id for the <h2>, so a <section> can point at it via aria-labelledby. */
  titleId?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
  titleId,
}: SectionHeadingProps) {
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
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const alignCls =
    align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div
      ref={ref}
      className={`reveal ${
        inView ? "is-in" : ""
      } flex flex-col gap-4 ${alignCls}`}
    >
      <p className={`eyebrow ${dark ? "eyebrow-light" : ""}`}>
        <span className="eyebrow-line" aria-hidden="true" />
        {eyebrow}
        {align === "center" && <span className="eyebrow-line" aria-hidden="true" />}
      </p>
      <h2
        id={titleId}
        className={`font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl ${
          dark ? "text-white heading-depth" : "text-ink-950"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`max-w-2xl text-base leading-relaxed sm:text-lg ${
            align === "center" ? "mx-auto" : ""
          } ${dark ? "text-ink-300" : "text-ink-600"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}