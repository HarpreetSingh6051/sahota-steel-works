"use client";

import { Check, Copy, Share2 } from "lucide-react";
import { useRef, useState } from "react";
import { business } from "@/data/business";

interface ShareButtonProps {
  /** Optional class overrides for the button itself. */
  className?: string;
  variant?: "solid" | "outline";
  label?: string;
}

/**
 * Native Web Share with clipboard fallback.
 *
 * - navigator.share supported  -> shares title + description + URL
 * - otherwise                  -> copies the current URL and confirms
 * Runs only inside event handlers, so it is safe during SSR.
 */
export default function ShareButton({
  className = "",
  variant = "solid",
  label = "Share This Website",
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function handleShare() {
    const shareData = {
      title: `${business.name} — Steel Supply & Fabrication`,
      text: `${business.name}, ${business.location}. ${business.summary}`,
      url: typeof window !== "undefined" ? window.location.href : "/",
    };

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await copyUrl(shareData.url);
    } catch (err) {
      // AbortError = user dismissed the native sheet — not an error.
      if (err instanceof DOMException && err.name === "AbortError") return;
      try {
        await copyUrl(shareData.url);
      } catch {
        setCopied(false);
      }
    }
  }

  async function copyUrl(url: string) {
    if (typeof navigator === "undefined") return;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2500);
  }

  const solid = variant === "solid";
  const styles = solid
    ? "bg-accent-500 text-ink-950 hover:bg-accent-400"
    : "border border-white/25 bg-white/[0.04] text-white hover:border-accent-500 hover:text-accent-300";
  const canShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-live="polite"
      className={`inline-flex h-11 min-w-[11rem] items-center justify-center gap-2 px-5 text-sm font-semibold uppercase tracking-wide transition-colors ${styles} ${className}`}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" aria-hidden="true" />
          Link copied
        </>
      ) : (
        <>
          {canShare ? (
            <Share2 className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4" aria-hidden="true" />
          )}
          {label}
        </>
      )}
    </button>
  );
}