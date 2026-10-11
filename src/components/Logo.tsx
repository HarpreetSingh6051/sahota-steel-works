/**
 * SSW symbol — a bold geometric "S" built from five structural
 * beam sections. The middle beam is welded in industrial orange;
 * the remaining sections are off-white. Purely geometric, reads
 * at small sizes, designed for the charcoal surfaces of the
 * header, footer and favicon.
 *
 * Surfaces use the metallic gradients defined once in <BrandDefs />;
 * the geometry itself is never distorted.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* Top beam */}
      <rect x="6" y="6" width="36" height="7" fill="url(#sswBeamSteel)" />
      {/* Upper-left upright */}
      <rect x="6" y="6" width="7" height="22" fill="url(#sswBeamSteel)" />
      {/* Middle beam — industrial orange */}
      <rect x="6" y="21" width="36" height="7" fill="url(#sswBeamOrange)" />
      {/* Lower-right upright */}
      <rect x="35" y="21" width="7" height="21" fill="url(#sswBeamSteel)" />
      {/* Bottom beam */}
      <rect x="6" y="35" width="36" height="7" fill="url(#sswBeamSteel)" />
    </svg>
  );
}

/**
 * Full horizontal logo — symbol + strong SAHOTA wordmark with STEEL WORKS
 * beneath it. The mark sits on a soft orange reflection with metallic shadow
 * depth; a one-shot sheen sweep travels across on load (clipped to the logo
 * box so the reflection and shadow remain visible).
 */
export function Logo({
  className = "",
  wordmarkClass = "",
}: {
  className?: string;
  wordmarkClass?: string;
}) {
  return (
    <span
      className={`group/logo relative inline-flex items-center gap-2.5 sm:gap-3 ${className}`}
    >
      <span className="relative inline-flex shrink-0">
        <LogoMark className="logo-mark h-9 w-9 sm:h-10 sm:w-10" />
        <span className="logo-reflection" aria-hidden="true" />
      </span>
      <span className={`flex flex-col leading-none ${wordmarkClass}`}>
        <span className="font-display text-xl font-bold uppercase leading-none tracking-[0.04em] text-white sm:text-2xl">
          SAHOTA
        </span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.34em] text-accent-300">
          Steel Works
        </span>
      </span>
      <span
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <span className="logo-sheen" />
      </span>
    </span>
  );
}

/** Accessible name helper — matches the visible wordmark text. */
export const logoAriaLabel = "SAHOTA Steel Works — home";