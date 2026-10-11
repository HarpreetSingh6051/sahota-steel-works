"use client";

import { useEffect, useRef } from "react";

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  warm: boolean;
}

interface AmbientEmbersProps {
  /** Maximum simultaneous embers — kept low so this stays cheap. */
  count?: number;
  /** Extra classes for the decorative wrapper (e.g. opacity). */
  className?: string;
}

/**
 * Ambient workshop embers — a few slow, warm sparks drifting upward on a
 * dark surface. Localized to the section it is placed in.
 *
 * Lightweight by design: a single canvas, a tiny particle pool, and a render
 * loop that fully stops when the section is off-screen or the tab is hidden.
 * Skipped entirely for `prefers-reduced-motion`. Decorative only: it never
 * captures pointer events and is hidden from assistive tech.
 */
export default function AmbientEmbers({
  count = 16,
  className = "",
}: AmbientEmbersProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Colours pulled from the centralized theme tokens (with fallbacks).
    const rootStyle = getComputedStyle(document.documentElement);
    const emberColor =
      rootStyle.getPropertyValue("--color-accent-400").trim() || "#ff7a2f";
    const coreColor =
      rootStyle.getPropertyValue("--color-weld-400").trim() || "#ffd98a";

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let last = performance.now();
    let visible = true;
    const embers: Ember[] = [];

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      // Embers can span very tall sections; keep the backing store at 1x so
      // the per-frame clear/composite stays cheap even on high-DPI phones.
      dpr = 1;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const spawn = (initial = false) => {
      if (embers.length >= count) return;
      embers.push({
        x: Math.random() * width,
        y: initial ? Math.random() * height : height + 6,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(0.12 + Math.random() * 0.34),
        life: 0,
        maxLife: 150 + Math.random() * 220,
        size: 0.6 + Math.random() * 1.5,
        warm: Math.random() < 0.5,
      });
    };
    for (let i = 0; i < count; i += 1) spawn(true);

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (let i = embers.length - 1; i >= 0; i -= 1) {
        const p = embers[i];
        p.life += dt;
        if (p.life >= p.maxLife || p.y < -8) {
          embers.splice(i, 1);
          spawn();
          continue;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx += (Math.random() - 0.5) * 0.004 * dt;

        const t = p.life / p.maxLife;
        const alpha = Math.sin(Math.PI * t) * 0.55;
        if (alpha <= 0) continue;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.warm ? coreColor : emberColor;
        const s = Math.max(0.3, p.size * (1 - t * 0.5));
        ctx.beginPath();
        ctx.arc(p.x, p.y, s, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      raf = visible && !document.hidden ? window.requestAnimationFrame(frame) : 0;
    };

    const start = () => {
      if (raf) return;
      last = performance.now();
      raf = window.requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      (entries) => {
        visible = Boolean(entries[0]?.isIntersecting);
        if (visible && !document.hidden) start();
      },
      { rootMargin: "120px 0px" },
    );
    io.observe(wrap);

    const onVisibility = () => {
      if (document.hidden) {
        if (raf) {
          window.cancelAnimationFrame(raf);
          raf = 0;
        }
      } else if (visible) {
        start();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    start();

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [count]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
