"use client";

import { useEffect, useState } from "react";

/**
 * Clientside current year so the copyright stays accurate without a redeploy.
 *
 * `new Date()` cannot run during prerendering (Next blocks time reads in the
 * render path), so the year is computed in an effect after hydration. The
 * initial render falls back to the build year to avoid an empty gap.
 */
export default function CopyrightYear() {
  const [year, setYear] = useState<number>(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <span>{year}</span>;
}