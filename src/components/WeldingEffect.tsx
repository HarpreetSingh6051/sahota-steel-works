"use client";

import { useEffect, useRef } from "react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  gold: boolean;
}

/**
 * Restrained welding effect for the hero.
 *
 * A CSS focal glow (always present as a static fallback) is enhanced by a
 * very light canvas particle system: a handful of short-lived sparks emitted
 * from a single focal point. It is purely decorative, sits behind all hero
 * content, never captures pointer events, pauses when the tab is hidden, and
 * is skipped entirely for `prefers-reduced-motion`.
 */
export default function WeldingEffect() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (reduce || !ctx) return; // static glow only

    // Read welding colours from the centralized theme tokens (with fallbacks).
    const rootStyle = getComputedStyle(document.documentElement);
    const sparkColor =
      rootStyle.getPropertyValue("--color-weld-500").trim() || "#FFB547";
    const sparkCore =
      rootStyle.getPropertyValue("--color-weld-300").trim() || "#FFF0C2";
    const steelColor =
      rootStyle.getPropertyValue("--color-ink-50").trim() || "#F5F5F5";

    let raf = 0;
    let running = true;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let last = performance.now();
    let sinceSpawn = 0;

    // Focal point as a fraction of the hero box — matches .weld-glow
    const FX = 0.72;
    const FY = 0.58;
    const particles: Spark[] = [];

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const spawn = () => {
      if (particles.length > 20) return;
      const fx = FX * width;
      const fy = FY * height;
      const count = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i += 1) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.15;
        const speed = 22 + Math.random() * 55;
        particles.push({
          x: fx + (Math.random() - 0.5) * 5,
          y: fy,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 34,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 30 + Math.random() * 28,
          size: 1 + Math.random() * 1.6,
          gold: Math.random() < 0.6,
        });
      }
    };

    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;

      if (!document.hidden) {
        sinceSpawn += dt;
        if (sinceSpawn > 30) {
          spawn();
          sinceSpawn = 0;
        }

        ctx.clearRect(0, 0, width, height);
        ctx.globalCompositeOperation = "lighter";

        for (let i = particles.length - 1; i >= 0; i -= 1) {
          const p = particles[i];
          p.life += dt;
          if (p.life >= p.maxLife) {
            particles.splice(i, 1);
            continue;
          }
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.vy += 0.5 * dt; // gentle gravity
          p.vx *= 0.99;

          const t = p.life / p.maxLife;
          const alpha = (t < 0.18 ? t / 0.18 : 1 - (t - 0.18) / 0.82) * 0.85;
          if (alpha <= 0) continue;

          ctx.globalAlpha = alpha;
          ctx.fillStyle = p.gold ? sparkColor : steelColor;
          const s = Math.max(0.3, p.size * (1 - t * 0.6));
          ctx.beginPath();
          ctx.arc(p.x, p.y, s, 0, Math.PI * 2);
          ctx.fill();

          // hot core
          ctx.globalAlpha = alpha * 0.55;
          ctx.fillStyle = p.gold ? sparkCore : "#FFFFFF";
          ctx.beginPath();
          ctx.arc(p.x - p.vx * 0.28, p.y - p.vy * 0.28, s * 0.55, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
      }

      raf = window.requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      if (document.hidden) {
        // Fully stop the render loop while the tab is not visible
        if (raf) {
          window.cancelAnimationFrame(raf);
          raf = 0;
        }
      } else if (running && !raf) {
        last = performance.now();
        raf = window.requestAnimationFrame(frame);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    raf = window.requestAnimationFrame(frame);

    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="hero-sheen" />
      <div className="weld-glow" />
      <canvas ref={canvasRef} className="weld-canvas absolute inset-0 h-full w-full" />
    </div>
  );
}