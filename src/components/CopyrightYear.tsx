"use client";

import { useSyncExternalStore } from "react";

/**
 * Clientside current year so the copyright stays accurate without a redeploy.
 *
 * `new Date()` must not run during prerendering (Next blocks time reads in the
 * render path), so the live year is read through `useSyncExternalStore`: the
 * server/prerender snapshot uses the build year, and the browser then reads
 * the real year after hydration.
 */
const emptySubscribe = () => () => {};

/** Build-time fallback used for the prerendered snapshot. */
const BUILD_YEAR = 2026;

export default function CopyrightYear() {
  const year = useSyncExternalStore(
    emptySubscribe,
    () => new Date().getFullYear(),
    () => BUILD_YEAR,
  );

  return <span>{year}</span>;
}
