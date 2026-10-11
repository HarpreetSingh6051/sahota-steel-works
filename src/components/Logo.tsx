/**
 * SSW symbol — a bold geometric "S" built from five structural
 * beam sections. The middle beam is welded in industrial orange;
 * the remaining sections are off-white. Purely geometric, reads
 * at small sizes, designed for the charcoal surfaces of the
 * header, footer and favicon.
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
      <rect x="6" y="6" width="36" height="7" fill="#F5F5F5" />
      {/* Upper-left upright */}
      <rect x="6" y="6" width="7" height="22" fill="#F5F5F5" />
      {/* Middle beam — industrial orange */}
      <rect x="6" y="21" width="36" height="7" fill="#E8661B" />
      {/* Lower-right upright */}
      <rect x="35" y="21" width="7" height="21" fill="#F5F5F5" />
      {/* Bottom beam */}
      <rect x="6" y="35" width="36" height="7" fill="#F5F5F5" />
    </svg>
  );
}

/**
 * Full horizontal logo — symbol + strong SAHOTA wordmark with STEEL WORKS
 * beneath it. Includes a one-shot metallic sheen sweep on load.
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
      className={`group/logo relative inline-flex items-center gap-2.5 overflow-hidden sm:gap-3 ${className}`}
    >
      <LogoMark className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
      <span className={`flex flex-col leading-none ${wordmarkClass}`}>
        <span className="font-display text-xl font-bold uppercase leading-none tracking-[0.04em] text-white sm:text-2xl">
          SAHOTA
        </span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.34em] text-accent-300">
          Steel Works
        </span>
      </span>
      <span className="logo-sheen" aria-hidden="true" />
    </span>
  );
}

/** Accessible name helper — matches the visible wordmark text. */
export const logoAriaLabel = "SAHOTA Steel Works — home";