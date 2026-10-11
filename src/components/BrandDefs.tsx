/**
 * Document-level SVG paint servers for the SSW logo mark.
 *
 * Rendered exactly once in the root layout so the metallic gradients below
 * exist a single time in the DOM. `LogoMark` then references them with
 * `fill="url(#sswBeamSteel)"` / `fill="url(#sswBeamOrange)"`. This keeps the
 * mark a pure, geometry-only SVG while still giving it a brushed-steel face —
 * no duplicated ids, no distortion, no animation.
 *
 * The 0x0 box is decorative and removed from the accessibility tree.
 */
export default function BrandDefs() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute h-0 w-0 overflow-hidden"
    >
      <defs>
        {/* Off-white structural steel — light top edge fading to a darker base */}
        <linearGradient id="sswBeamSteel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.42" stopColor="#eef1f4" />
          <stop offset="0.56" stopColor="#b9c0c7" />
          <stop offset="1" stopColor="#8b939b" />
        </linearGradient>

        {/* Industrial orange beam — warm highlight rolling into the brand hue */}
        <linearGradient id="sswBeamOrange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffc08a" />
          <stop offset="0.5" stopColor="#e8661b" />
          <stop offset="1" stopColor="#9c3607" />
        </linearGradient>
      </defs>
    </svg>
  );
}
