"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";

type Props = Omit<ImageProps, "onError"> & {
  /** Short text shown over the placeholder if the image fails to load. */
  fallbackLabel?: string;
};

/**
 * next/image wrapper that renders a safe placeholder if the source fails.
 * The parent must size the box (fill images need a positioned parent).
 */
export default function ImageWithFallback({
  fallbackLabel = "Image unavailable",
  alt,
  ...rest
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-2 bg-ink-900 text-ink-400"
      >
        <ImageOff className="h-8 w-8" aria-hidden="true" />
        <span className="text-xs uppercase tracking-widest">{fallbackLabel}</span>
      </div>
    );
  }

  return <Image alt={alt} {...rest} onError={() => setFailed(true)} />;
}