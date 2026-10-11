/**
 * Reusable industrial background system.
 *
 * Composes layered, blurred light sources (industrial orange + warm
 * amber), a faint drafting grid, and geometric steel-profile outlines.
 * Purely decorative: it never captures pointer events and is hidden
 * from assistive tech.
 *
 * Used sparingly on selected sections — not everywhere at once.
 */

interface IndustrialBackdropProps {
  /** Surface the backdrop sits on. Controls line + glow strength. */
  variant?: "dark" | "light";
  /** "soft" keeps it subtle; "full" is for feature sections. */
  intensity?: "soft" | "full";
  /** Show the faint technical profile outlines. */
  showProfiles?: boolean;
  className?: string;
}

export default function IndustrialBackdrop({
  variant = "dark",
  intensity = "soft",
  showProfiles = true,
  className = "",
}: IndustrialBackdropProps) {
  const dark = variant === "dark";
  const full = intensity === "full";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      {/* Blurred industrial light sources */}
      <div
        className="absolute rounded-full"
        style={{
          top: "-14%",
          left: "-8%",
          width: "46%",
          aspectRatio: "1",
          background:
            "radial-gradient(circle, rgba(232,102,27,0.40) 0%, rgba(232,102,27,0) 68%)",
          filter: "blur(70px)",
          opacity: full ? 0.7 : 0.4,
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          bottom: "-20%",
          right: "-10%",
          width: "52%",
          aspectRatio: "1",
          background:
            "radial-gradient(circle, rgba(255,122,47,0.20) 0%, rgba(255,122,47,0) 70%)",
          filter: "blur(80px)",
          opacity: full ? 0.65 : 0.4,
        }}
      />

      {/* Drafting grid */}
      <div
        className={`absolute inset-0 ${dark ? "drafting-dark" : "drafting-light"}`}
        style={{ opacity: full ? 0.5 : 0.32 }}
      />

      {/* Technical steel-profile outlines */}
      {showProfiles && (
        <svg
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          focusable="false"
        >
          <g
            fill="none"
            stroke={dark ? "#dcdcdc" : "#171717"}
            strokeWidth="1"
            opacity={dark ? 0.07 : 0.05}
          >
            <path d="M40 40 h120 v14 h-53 v96 h53 v14 h-120 v-14 h53 v-96 h-53 Z" />
            <path d="M360 300 h150 v16 h-67 v110 h67 v16 h-150 v-16 h67 v-110 h-67 Z" />
          </g>
        </svg>
      )}

      {/* Soft scanline / brushed-metal texture */}
      <div
        className={dark ? "brushed-dark" : "brushed-light"}
        style={{ opacity: full ? 0.5 : 0.3 }}
      />
    </div>
  );
}
