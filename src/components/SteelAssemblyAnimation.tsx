"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * "From Raw Steel to Structure" — a lightweight, scroll-driven steel
 * assembly.
 *
 * A tall wrapper holds a sticky panel; as it scrolls through, JavaScript
 * writes a single `--p` value (0 → 1) on the wrapper. Every SVG member
 * derives its own reveal progress from its `--a`/`--b` range in CSS, so the
 * frame assembles in stages (columns → beams → bracing → plates → orange
 * connections) without re-rendering React on each frame.
 *
 * Fallbacks / performance:
 * - `--p` defaults to 1, so the frame is fully assembled without JS.
 * - Reduced motion keeps the assembled frame and never attaches a listener.
 * - One passive scroll + resize listener and one rAF per frame; nothing runs
 *   while the panel is far off-screen.
 */

const STAGES = [
  { label: "Raw sections", at: 0 },
  { label: "Columns rise", at: 0.06 },
  { label: "Top beam spans", at: 0.26 },
  { label: "Mid rail ties in", at: 0.4 },
  { label: "Diagonal bracing", at: 0.54 },
  { label: "Base plates", at: 0.68 },
  { label: "Connection plates", at: 0.78 },
] as const;

/** Inline custom-property bag describing one member's place in the sequence. */
function stage(a: number, b: number, extra?: Record<string, string>): CSSProperties {
  return { "--a": String(a), "--b": String(b), ...extra } as CSSProperties;
}

export default function SteelAssemblyAnimation({
  className = "",
}: {
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      // Leave the CSS default (--p: 1) in place — fully assembled, no motion.
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = wrap.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const progress = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 1;
      wrap.style.setProperty("--p", progress.toFixed(4));

      let index = 0;
      for (let i = 0; i < STAGES.length; i += 1) {
        if (progress >= STAGES[i].at) index = i;
      }
      setActive((prev) => (prev === index ? prev : index));
    };

    const schedule = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
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
      ref={wrapRef}
      className={`steel-assembly relative h-[150vh] lg:h-[175vh] ${className}`.trim()}
    >
      <div className="sticky top-[var(--header-h)] flex h-[calc(100svh-var(--header-h))] items-center">
        <div className="container-site w-full">
          <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
            {/* Stage copy + progress */}
            <div className="order-2 lg:order-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-300">
                Assembly
              </p>
              <p className="mt-3 font-display text-2xl font-bold uppercase leading-tight tracking-tight text-white sm:text-3xl">
                {STAGES[active].label}
              </p>
              <div className="mt-5 h-1 w-full max-w-xs overflow-hidden bg-white/10">
                <div
                  className="h-full bg-accent-500"
                  style={{ width: "calc(var(--p, 1) * 100%)" }}
                />
              </div>
              <ol className="mt-6 hidden gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-widest lg:flex lg:flex-wrap">
                {STAGES.map((s, i) => (
                  <li
                    key={s.label}
                    className={i <= active ? "text-accent-300" : "text-ink-500"}
                  >
                    {s.label}
                  </li>
                ))}
              </ol>
            </div>

            {/* The assembling frame */}
            <div className="order-1 lg:order-2">
              <svg
                viewBox="0 0 720 400"
                className="mx-auto h-auto w-full max-w-[560px]"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <linearGradient id="sa-steel-v" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#d9dde1" />
                    <stop offset="0.5" stopColor="#9aa0a6" />
                    <stop offset="1" stopColor="#6d7379" />
                  </linearGradient>
                  <linearGradient id="sa-steel-h" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#cfd4d9" />
                    <stop offset="0.5" stopColor="#9aa0a6" />
                    <stop offset="1" stopColor="#cfd4d9" />
                  </linearGradient>
                  <radialGradient id="sa-node" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0" stopColor="#ffd0a6" />
                    <stop offset="1" stopColor="#e8661b" />
                  </radialGradient>
                  <radialGradient id="sa-glow" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0" stopColor="#e8661b" stopOpacity="0.5" />
                    <stop offset="1" stopColor="#e8661b" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Final warm glow behind the finished frame */}
                <ellipse
                  className="sa"
                  style={stage(0.84, 1)}
                  cx="360"
                  cy="200"
                  rx="300"
                  ry="150"
                  fill="url(#sa-glow)"
                />

                {/* Drafting guides — always faintly present */}
                <g
                  fill="none"
                  stroke="#b8b8b8"
                  strokeWidth="1"
                  strokeDasharray="2 7"
                  opacity="0.16"
                >
                  <line x1="159" y1="30" x2="159" y2="380" />
                  <line x1="561" y1="30" x2="561" y2="380" />
                  <line x1="70" y1="73" x2="650" y2="73" />
                  <line x1="70" y1="203" x2="650" y2="203" />
                </g>

                {/* Ground line */}
                <line
                  x1="70"
                  y1="372"
                  x2="650"
                  y2="372"
                  stroke="#8a8a8a"
                  strokeWidth="2"
                  opacity="0.35"
                />

                {/* Columns — rise into place */}
                <g className="sa sa-rise" style={stage(0.05, 0.28, { "--rise": "64px" })}>
                  <rect x="150" y="64" width="18" height="300" fill="url(#sa-steel-v)" />
                  <rect x="552" y="64" width="18" height="300" fill="url(#sa-steel-v)" />
                </g>

                {/* Base plates — settle in */}
                <g className="sa" style={stage(0.68, 0.8)}>
                  <rect x="124" y="352" width="70" height="12" fill="url(#sa-steel-h)" />
                  <rect x="526" y="352" width="70" height="12" fill="url(#sa-steel-h)" />
                </g>

                {/* Top beam — drops across */}
                <g className="sa sa-drop" style={stage(0.26, 0.44, { "--rise": "-46px" })}>
                  <rect x="150" y="64" width="420" height="18" fill="url(#sa-steel-h)" />
                  <rect x="150" y="60" width="420" height="4" fill="#e6e9ec" opacity="0.55" />
                </g>

                {/* Mid rail */}
                <g className="sa sa-drop" style={stage(0.4, 0.56, { "--rise": "-26px" })}>
                  <rect x="150" y="196" width="420" height="14" fill="url(#sa-steel-h)" />
                </g>

                {/* Diagonal bracing — draws in */}
                <line
                  className="sa sa-draw"
                  style={stage(0.54, 0.68, { "--len": "423" })}
                  x1="159"
                  y1="203"
                  x2="561"
                  y2="73"
                  stroke="#b9bfc5"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <line
                  className="sa sa-draw"
                  style={stage(0.6, 0.74, { "--len": "423" })}
                  x1="561"
                  y1="203"
                  x2="159"
                  y2="73"
                  stroke="#b9bfc5"
                  strokeWidth="9"
                  strokeLinecap="round"
                />

                {/* Orange connection plates — pop in */}
                <g className="sa sa-pop" style={stage(0.78, 0.92)}>
                  <circle cx="159" cy="73" r="7" fill="url(#sa-node)" />
                  <circle cx="561" cy="73" r="7" fill="url(#sa-node)" />
                  <circle cx="159" cy="203" r="7" fill="url(#sa-node)" />
                  <circle cx="561" cy="203" r="7" fill="url(#sa-node)" />
                  <circle cx="360" cy="138" r="5" fill="url(#sa-node)" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
