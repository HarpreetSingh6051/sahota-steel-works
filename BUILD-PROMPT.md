# Website Build Prompt — Cinematic Single-Page Business Site

> **How to use this file**
> 1. Fill in the **INPUT** block below (Section 0). That is the only part that
>    changes from client to client.
> 2. Hand this whole file to an AI coding agent and say:
>    *"Build the complete website described in this file. Use the INPUT block
>    as the source of truth for all business content."*
> 3. The agent builds the whole project from scratch — scaffold, design system,
>    every section, motion, SEO, images — and verifies it.
>
> Do not ask the agent to invent business facts (phone numbers, history,
> certifications, awards, project counts). Everything factual comes from INPUT.

---

## 0. INPUT — fill this in

```yaml
# ---------- Brand ----------
brand_name: "ACME Steel Works"          # full display name
brand_short: "ASW"                       # 2–4 letter monogram for the logo mark
tagline: "Your Trusted Partner for Steel Supply & Fabrication"
industry: "steel material supply & fabrication"
summary: "Acme Steel Works supplies iron and steel materials and provides fabrication solutions for construction, engineering, and industrial needs in <city>."
location: "Ludhiana, Punjab, India"       # "City, State, Country"
address: "Near Khanna Dyeing, Tajpur Road, Ludhiana, Punjab, India."

# ---------- Domain / deploy ----------
site_url: "https://acme-steel-works.vercel.app"   # final production URL (no trailing slash)
env_override: "NEXT_PUBLIC_SITE_URL"              # env var that can override site_url

# ---------- Contacts (first entry = primary contact / WhatsApp target) ----------
contacts:
  - name: "Navjot Singh"
    phone_display: "9855285484"
    phone_e164: "+919855285484"           # used in tel: links
  - name: "Rajinder Singh"
    phone_display: "9814472014"
    phone_e164: "+919814472014"

whatsapp_number: "919855285484"           # digits only, country code first; defaults to contacts[0]
email: null                               # set to "name@domain.com" or keep null → email UI hidden

# ---------- Location / maps (agent builds the 3 URLs from address + name) ----------
maps_query: "Acme Steel Works, Near Khanna Dyeing, Tajpur Road, Ludhiana, Punjab"
maps_zoom: 14

# ---------- Catalogue ----------
# category is "material" or "fabrication" (or rename the groups to fit the industry)
products:
  - name: "MS Angles"
    description: "Mild steel angle sections for structural framing and fabrication work."
    profile: "L-section"                  # short technical descriptor shown on the tile
    category: "material"
  - name: "MS Channels"
    description: "Mild steel channel sections for construction and engineering requirements."
    profile: "U / C-section"
    category: "material"
  # ...add every product the business actually sells...

services:
  - name: "Iron & Steel Material Supply"
    description: "MS angles, channels, flats, pipes, round bars and other iron and steel materials for construction and industrial requirements."
    icon: "truck"                          # truck | scale | flame | building | messages
  # ...add services...

why_us:                                    # "why choose us" points, 4–6 entries
  - title: "Convenient Local Contact"
    description: "Located near Khanna Dyeing on Tajpur Road — easy to reach for customers across the city."
    icon: "map"                            # map | layers | clipboard | chat | phone
  # ...

gallery_categories:                        # tabs for the gallery filter
  - { id: "materials",  label: "Steel Materials" }
  - { id: "fabrication", label: "Fabrication" }
  - { id: "structural", label: "Structural Work" }

# ---------- Hero & section copy (write real, honest copy — no fluff) ----------
hero_eyebrow: "Steel Supply · Trading · Fabrication"
hero_h1: "The Right Steel for What You're Building."     # the single <h1>; can highlight the last word
hero_sub: "Explore steel materials and fabrication solutions for construction, engineering, and industrial requirements."
trust_strip:                               # 4 short items in the hero foot (desktop)
  - { title: "Steel Material Supply",   description: "Angles, channels, flats, pipes, rounds & more", icon: "layers" }
  - { title: "Fabrication Solutions",   description: "Iron & steel fabrication work",                 icon: "flame" }
  - { title: "Construction & Industrial", description: "Material enquiries for projects",             icon: "building" }
  - { title: "Ludhiana, Punjab",        description: "Near Khanna Dyeing, Tajpur Road",              icon: "map" }

# ---------- Optional design overrides (leave null to use the defaults in §4) ----------
accent_color: null                         # e.g. "#E8661B" — industrial orange by default
background_color: null                     # e.g. "#171717" — deep charcoal by default
font_body: null                            # e.g. "Inter" — Barlow by default
font_display: null                         # e.g. "Oswald" — Barlow Condensed by default

# ---------- Images ----------
# Either drop real photos into public/images/ (names listed in §13) and say so,
# or leave empty and the agent must use clearly-labelled representative placeholders.
images_provided: false
```

---

## 1. Role & mission

You are a senior front-end engineer and product designer. Build a **complete,
production-ready, single-page marketing website** for the business described in
the INPUT block.

The result must feel like a **cinematic, premium "showroom"** for an industrial
or trades business: a dark feature hero, a uniform product/catalogue grid built
on real photography, a signature scroll animation, and one-tap contact actions
(phone + WhatsApp) that need **no backend**.

Deliver the working project, not a plan. Do not leave TODOs, placeholder text
like "Lorem ipsum", or unimplemented sections.

---

## 2. Hard constraints

- **Stack:** Next.js (App Router) + React + TypeScript + Tailwind CSS v4. Use
  `next/font` for fonts and `lucide-react` for icons. Nothing else is required.
- **Static & free:** no backend, no database, no auth, no payment, no paid
  services, no runtime API keys. All content is baked in at build time. It must
  deploy to Vercel with zero configuration.
- **No heavy animation libraries** (no GSAP/Framer/Three.js/WebGL) and **no
  full-screen continuous canvas**. Effects are CSS (keyframes, transitions,
  transforms, opacity) plus small SVG/canvas accents.
- **Everything factual comes from INPUT.** Never invent phone numbers, emails,
  history, certifications, awards, employee counts, or "X years of experience".
- **Mobile-first and accessible.** Content must be visible without JavaScript.
  Respect `prefers-reduced-motion`. No horizontal overflow at 320–1440 px.
- Read `node_modules/next/dist/docs/` before using framework APIs if the
  installed Next.js version is newer than your training data.

---

## 3. Architecture & file layout

Create this structure (names are the contract — keep them):

```
src/
  app/
    layout.tsx        # fonts, metadata, LocalBusiness JSON-LD, skip link, <BrandDefs/>
    page.tsx          # the ONE page — composes the sections in order
    icon.svg          # favicon = the logo mark
    globals.css       # Tailwind v4 @theme tokens, keyframes, all motion rules
  components/
    Logo.tsx                 # <Logo/> horizontal wordmark + <LogoMark/> compact symbol + logoAriaLabel
    BrandDefs.tsx            # one hidden <svg> holding the metallic gradients the logo references
    Header.tsx               # sticky header: utility bar, nav, scroll-spy, mobile menu
    Hero.tsx                 # hero + trust strip
    HeroBackground.tsx       # hero photo + gradient/grid/orb lighting layers
    QuickActions.tsx         # full-width quick-contact bar under the hero
    About.tsx                # about + facts list + CTAs (+ BlueprintReveal image)
    Products.tsx             # catalogue section (grid of ProductCard)
    ProductCard.tsx          # one tile: image, profile, name, description, WhatsApp + call
    SteelStructure.tsx       # "signature" scroll-animation section (adapt the story to the industry)
    SteelAssemblyAnimation.tsx # the scroll-driven SVG that powers the section above
    Services.tsx             # services grid
    WhyChooseUs.tsx          # value points + supporting image
    Gallery.tsx              # filterable gallery + accessible lightbox
    Contact.tsx              # phones, WhatsApp, address, map, QR
    CTASection.tsx           # final call-to-action band
    Footer.tsx               # nav, contact, hours, copyright
    MobileActionBar.tsx      # fixed bottom Call / WhatsApp / Directions bar (< lg)
    ShareButton.tsx          # native share / copy-link
    CopyrightYear.tsx        # <CopyrightYear/>
    ImageWithFallback.tsx    # next/image wrapper with a graceful fallback tile
    Reveal.tsx               # IntersectionObserver reveal wrapper (single + stagger)
    SectionHeading.tsx       # eyebrow + h2 (+ optional description), reveals on view
    IndustrialBackdrop.tsx   # reusable industrial background (grid + hairline + glow layers)
    AmbientEmbers.tsx        # subtle floating ember dots
    WeldingEffect.tsx        # hero focal glow + tiny canvas spark emitter
    MetalCut.tsx             # metal-cutting divider (one sweep + sparks) used on section edges
    CuttingLine.tsx          # thin orange line that draws in on scroll (section accents)
    BlueprintReveal.tsx      # blueprint linework that crossfades into a real photo
  data/
    business.ts       # ALL contact/location/domain content
    products.ts       # catalogue
    services.ts       # services + why-us points
    gallery.ts        # gallery items + categories
  lib/
    contact.ts        # WhatsApp deep-link helpers (waLink + generic / quote links)
public/
  images/             # hero.jpg, about.jpg, og-share.jpg, website-qr.png, gallery-*.jpg
  images/products/    # one JPEG per product
  brand/              # ssw-logo.svg, ssw-mark.svg
```

Section composition in `page.tsx` (single `<main id="main">`):

```
<Header/>
<main id="main">
  <Hero/> <QuickActions/> <About/> <Products/> <SteelStructure/>
  <Services/> <WhyChooseUs/> <Gallery/> <Contact/> <CTASection/>
</main>
<Footer/>
<MobileActionBar/>
```

Give the outer wrapper `pb-16 lg:pb-0` so the fixed mobile bar never covers the
footer. Anchor IDs: `home`, `about`, `products`, `process`, `services`,
`gallery`, `contact` (the `process`/why-us sections are not in the nav).

---

## 4. Design system

Centralise everything as Tailwind v4 `@theme` tokens in `globals.css` so the
whole site follows one source of truth.

**Colour tokens**

| Family | Role |
| --- | --- |
| `ink-50 … ink-950` | Off-white text (`#F5F5F5`) → steel grey (`#B8B8B8`) → deep charcoal surface (`#171717`) |
| `accent-300 … accent-700` | Primary accent (default industrial orange `#E8661B`, hover `#FF7A2F`) |
| `weld-300 … weld-500` | Warm gold, restricted to the welding / metal-cut accents |
| `navy-600 … navy-950` | Neutral graphite darks (legacy aliases, no blue) |

Rules: the accent is the **action colour** (buttons, active nav, highlights);
accent-coloured buttons use **dark charcoal text** for contrast; off-white /
grey carry typography. Never use pure black `#000` or pure white typography.

**Type:** `--font-sans` = body (Barlow), `--font-display` = condensed display
(Barlow Condensed) for headings, product names and the logo. Headings are
uppercase, tight leading, `tracking-tight`. Body is `text-base`/`lg` with
`leading-relaxed`. Eyebrows are `11px`, uppercase, wide tracking, accent-tinted.

**Surfaces:** dark charcoal base for the whole site; secondary panels `ink-900`;
cards/borders use `border-white/10` and `bg-white/[0.02]…[0.03]`. Sections use a
`.container-site` wrapper (`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8`).

**Corner treatment:** sharp rectangular corners (industrial, not soft/rounded).
Buttons are `h-11`/`h-12`, uppercase, wide tracking, square edges.

**Logo:** build an original, purely geometric SVG monogram from the
`brand_short` (e.g. a bold "S" formed from five rectangular beam sections) with
one beam in the accent colour and the rest off-white; add a soft coloured
reflection beneath and a one-shot metallic sheen sweep on load. Provide a
compact `<LogoMark/>` (used in the mobile menu and the favicon) and a full
`<Logo/>` wordmark. Put the metallic gradients once in `<BrandDefs/>`.

**Reusable motion utilities** (see §8): `.reveal` / `.reveal-stagger`,
`.eyebrow`, `.eyebrow-line`, `.divider-sheen`, `.product-shine`, `.tilt-card`,
`.cutting-line`, `.blueprint-reveal`, `.steel-assembly`.

**Focus state (global):**
```css
:focus-visible {
  outline: 2px solid var(--color-accent-400);
  outline-offset: 2px;
  border-radius: 2px;
}
```

---

## 5. Page / section specification

**Header** — `sticky top-0 z-50`. Two tiers: a slim utility bar (address + both
phones, desktop only) and the main bar (`h-[4.5rem]`) with logo, desktop nav,
"Get a Quote" (WhatsApp) button, and a mobile hamburger. Implement **scroll-spy**
with `IntersectionObserver` (highlight the section in view via `aria-current`).
On scroll past ~12 px add a translucent charcoal background + blur + shadow.
Mobile menu is an animated `max-height` panel that closes on link click; the
toggle has `aria-expanded` / `aria-controls` / a changing `aria-label`.

**Hero** — `min-h-[92svh]`, full-bleed photography (from `public/images/hero.jpg`)
behind layered lighting (gradient scrim + faint drafting grid + slow drifting
orange/amber blurred orbs), plus a restrained welding glow and a tiny canvas
spark emitter. Content is left-aligned, max-width ~3xl: logo emblem, eyebrow,
the single `<h1>` (with the last word in accent), one supporting paragraph, and
a staggered `anim-fade-up*` entrance. CTAs: primary "Explore …" (in-page anchor),
WhatsApp button, "Call Now", a compact round WhatsApp icon button, and a line
naming both contacts with `tel:` links. On desktop only, a 4-item trust strip
pinned to the bottom edge (icons + short descriptions).

**QuickActions** — full-width bar directly under the hero, visually attached to
it. One row of real actions: `Call {contact}` per contact, "WhatsApp Enquiry",
"Get Directions" (and "Email Us" only if an email is configured). Each tile has
an icon box, a bold label and a muted sub-value, and is a real link. **Column
count must equal the number of tiles** (e.g. 4 tiles → `lg:grid-cols-4`); never
leave an empty grid cell.

**About** — two columns on `lg`: a framed photo
(`aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]`) using the `BlueprintReveal`
effect, plus copy (`SectionHeading` + 2 paragraphs) and a small facts list
(location, contacts) with an "Also reachable" line. Orange CTA + WhatsApp button.
On mobile the **photo leads**, then the heading.

**Products / catalogue** — dark editorial grid, `auto-rows-fr`, 1 / 2 / 4
columns (`sm` / `lg`). Every card is the same height with the same 4:3 image
crop, an overlaid `profile` chip, name, description, and **bottom-aligned**
actions: "Enquire on WhatsApp" (prefilled with the product name) + a square call
button. Desktop pointer hover = gentle 3D tilt + tracked metallic glare + accent
border glow + slow image zoom. Include a small footnote that photos are
representative.

**SteelStructure (signature section)** — a "story" section (e.g. *"From Raw
Steel to Structure"*) that is **scroll-driven**: a sticky panel on one side pins
under the header while the other side scrolls, and an inline-SVG assembly builds
itself as you scroll (see §8). It must be decorative/illustrative, must not block
links or text, and must render fully assembled without JS and under reduced
motion. Adapt the metaphor to the industry (e.g. process, installation,
fabrication stages). Keep it to one section — do not animate everything.

**Services** — a grid of the input `services`, each with a `lucide` icon, name and
description. Optional per-service "Enquire" WhatsApp link (prefilled with the
service name).

**WhyChooseUs** — 2-column value-point grid (or list) from `why_us`, plus a
supporting image. Point the section at its own `<h2 id>` via `aria-labelledby`
(use `SectionHeading`'s optional `titleId`).

**Gallery** — filter tabs (from `gallery_categories`) + a responsive tile grid
(2 / 4 columns) + an accessible lightbox: `role="dialog"`, `aria-modal`,
`aria-label`, keyboard `Esc`/`←`/`→`, focus trap/return of focus to the trigger,
scroll lock while open, and prev/next controls. Images are `next/image` with
correct `width`/`height`.

**Contact** — balanced two columns on `lg`. Left: a 2×2 grid of real contact
cards (each phone, WhatsApp, "Visit Us" with the address + "Get Directions"),
then a QR card (image + short copy + the site URL) — email only if configured.
Right: a Google Maps iframe that **fills its column** (absolutely positioned
`inset-0 h-full w-full`, lazy) plus "Open in Google Maps" / "Search Location"
buttons and a fallback note. No empty cards, no blank bands, no reserved gaps.

**CTASection** — a strong final band over a photo (`cta.jpg`) with a headline and
call/WhatsApp buttons.

**Footer** — logo + short description, quick nav, contact block (both phones,
WhatsApp, address, hours if supplied), social links if supplied, and
`<CopyrightYear/>`. Keep links ≥ 44 px tall on touch.

**MobileActionBar** — fixed bottom bar (`lg:hidden`) with Call / WhatsApp /
Directions, each ≥ 48 px, using `env(safe-area-inset-bottom)`.

---

## 6. Data model (`src/data/*`) and helpers (`src/lib/contact.ts`)

Keep **all** business content in `src/data/*` so it can be edited without
touching markup.

```ts
// business.ts
export interface BusinessContact { name: string; phoneDisplay: string; phoneAction: string; /* "tel:+91..." */ }
export const business = {
  name, shortName, tagline, summary, location, address,
  contacts: [...] satisfies BusinessContact[],
  whatsappNumber, whatsappBaseUrl,       // "https://wa.me/<number>"
  mapsDirectionsUrl, mapsEmbedUrl, mapsSearchUrl,
  email: string | null,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "<site_url>",
} as const;
export const defaultWhatsAppMessage = "Hello <Brand>! I found your website and I would like to make an enquiry about …";
```

Build the three map URLs from `maps_query`:

```
search:     https://www.google.com/maps/search/?api=1&query=<uri-encoded query>
directions: https://www.google.com/maps/dir/?api=1&destination=<uri-encoded query>
embed:      https://maps.google.com/maps?q=<uri-encoded query>&z=<zoom>&output=embed
```

```ts
// products.ts
export type ProductCategory = "material" | "fabrication";
export interface Product { id; name; description; profile; image; imageAlt;
  imageWidth; imageHeight; category: ProductCategory; }
export function productEnquiryMessage(p: Product): string; // "<Brand>! I would like to enquire about {name} ({description})."
```

`services.ts` (services + why-us points with a constrained `icon` union mapped to
`lucide-react` in the component) and `gallery.ts` (items with `category`,
`caption`, `width`, `height` + a `galleryCategories` list). `lib/contact.ts`
exports `waLink(message?)` (encodes `?text=`) and the shared generic/quote links.

**Email rule:** while `business.email` is `null`, hide every email UI (header,
contact, footer, `QuickActions` tile). It must appear automatically once set.

---

## 7. Two non-negotiable layout fixes (these are easy to get wrong)

**A. Anchor links must land with the heading just below the sticky header.**
The root cause of "the heading hides under the header" is stacking a per-section
`scroll-margin-top` (header only) *plus* a large section top padding. Fix it once,
globally:

```css
:root { --header-h: 4.5rem; }               /* must match the real header height */
@media (min-width: 1024px) { :root { --header-h: 7rem; } }   /* + utility bar */
html { scroll-behavior: smooth; scroll-padding-top: var(--header-h); }
```

Anchored sections then use only a **small** top padding (`pt-6 … sm:pt-8`) and
their normal bottom padding (`pb-20 … sm:pb-28`). Do **not** add arbitrary
`scroll-margin-top` values. Under `prefers-reduced-motion` set
`scroll-behavior: auto`. Verify every nav link, the hero CTA and the footer links
on both mobile and desktop widths.

**B. Grid column counts must match the real number of children.** If a card is
removed (e.g. a third-party link), update the grid class so no empty cell
remains. Keep Tailwind class names as **literal strings** in the source (e.g.
`items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-5"`) so the JIT scanner
still generates them.

---

## 8. Motion system

Everything is CSS-driven, GPU-friendly (transform/opacity), subtle, and fully
disabled under `prefers-reduced-motion`. **Gate the hidden start state behind
`html.js`** so content is always visible without JavaScript:

```tsx
// in layout.tsx, before {children}
<script dangerouslySetInnerHTML={{ __html:
  "document.documentElement.classList.add('js');" }} />
```

```css
html.js .reveal, html.js .reveal-stagger > * {
  opacity: 0; transform: translateY(18px);
  transition: opacity .55s ease, transform .55s cubic-bezier(.22,1,.36,1);
}
html.js .reveal.is-in, html.js .reveal-stagger.is-in > * { opacity: 1; transform: none; }
```

- **`Reveal`** — `IntersectionObserver` wrapper, fires once, disconnects.
  `stagger` animates direct children one by one via `--reveal-delay`. If
  `IntersectionObserver` is missing, reveal on the next tick.
- **`SectionHeading`** — same one-shot reveal.
- **Hero** — short staggered `anim-fade-up*`; slow drifting blurred orbs;
  optional tiny canvas spark emitter that pauses when the tab is hidden, caps DPR
  and stays small.
- **Signature scroll animation (`SteelAssemblyAnimation`)** — drive the whole
  assembly from **one** CSS variable so React never re-renders per frame: JS
  writes `--p` (0→1) on the wrapper from scroll progress; each SVG member derives
  its own progress from an `[--a, --b]` range in CSS:

```css
.steel-assembly { --p: 1; }   /* fully assembled by default (no-JS / reduced motion) */
.steel-assembly .sa {
  --t: clamp(0, calc((var(--p) - var(--a,0)) / (var(--b,1) - var(--a,0))), 1);
  opacity: var(--t); transform-box: fill-box; transform-origin: center;
}
.sa-rise { transform: translateY(calc((1 - var(--t)) * var(--rise,40px))); }
.sa-pop  { transform: scale(calc(.4 + .6 * var(--t))); }
.sa-draw { stroke-dasharray: var(--len,400); stroke-dashoffset: calc((1 - var(--t)) * var(--len,400)); }
```

  Members use `sa-rise` / `sa-pop` / `sa-draw`; connection points get a subtle
  accent highlight. It is decorative (`aria-hidden`), sits behind/alongside text,
  and never intercepts pointer events.
- **`CuttingLine`** — thin accent line `scaleX(0)` → `scaleX(1)` when its section
  enters view (used on 1–2 headings only).
- **`BlueprintReveal`** — a grid "blueprint" layer crossfades into the real photo
  when in view; without JS the photo is simply visible.
- **`MetalCut`** — a one-shot luminous sweep + a few sparks on 1–2 section edges.
- **`.divider-sheen`** — slow metallic reflection travelling across a section edge.
- **`.product-shine`** — restrained shine sweep on product tiles, hover only.
- **`.tilt-card`** — pointer-following 3D tilt. JS writes `--tilt-rx/--tilt-ry/
  --tilt-gx/--tilt-gy/--tilt-lift`; gate on
  `matchMedia("(hover: hover) and (pointer: fine)")` **and** not reduced-motion,
  and require `event.pointerType === "mouse"`. Never on touch.
- **Parallax** — at most one hero layer, via a `--parallax-y` variable written
  from scroll; disabled on reduced motion.

**Global reduced-motion block** must: force reveals visible, `display:none` the
canvas/sparks/sweeps/glare, neutralise tilt & parallax, and resolve the assembly,
cutting line and blueprint to their finished state.

`prefers-reduced-motion: reduce` global kill switch:
```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, ::before, ::after {
    animation-duration: .01ms !important; animation-iteration-count: 1 !important;
    transition-duration: .01ms !important; transition-delay: 0ms !important;
  }
}
```
Rule of thumb: **do not animate every component** — pick the hero, the signature
section, 1–2 dividers and card hovers.

---

## 9. Contact & conversion features

- **Phone** — every number is a real `tel:` link, shown with a spaced/legible
  display format and a `Call {firstName}` label.
- **WhatsApp** — build links through `waLink(message)`; product/service tiles
  prefill a message that names the item; the generic and "Get a Quote" links use
  shared helpers. All open in a new tab with
  `target="_blank" rel="noopener noreferrer"`.
- **Maps** — keyless `output=embed` iframe (lazy, `title`, `allowFullScreen`),
  plus directions + search links.
- **QR code** — generate `public/images/website-qr.png` that encodes
  `business.siteUrl` (so print/scan opens the site) with:
  ```bash
  npx qrcode -o public/images/website-qr.png -w 640 -m 2 -e M \
    -d "#0f1115ff" -l "#ffffffff" "https://YOUR-DOMAIN"
  ```
  Render it small (≈128 px) with short "scan to open our website" copy and the
  URL in text. Regenerate it whenever the domain changes.
- **Share** — a `ShareButton` using `navigator.share` with a copy-link fallback.

---

## 10. Accessibility & performance (all required)

- Exactly **one `<h1>`** (the hero); logical heading order thereafter.
- A **skip-to-content** link (`sr-only` until focused) and a real `<main id="main">`.
- Visible `:focus-visible` styling; keyboard-operable menu, gallery and lightbox.
- Every image has meaningful `alt`; decorative layers are `aria-hidden`.
- No dangling `aria-labelledby`; no duplicate `id`s; `aria-current` on active nav.
- Content visible without JS; `overflow-x: clip` on `body`; no layout shift.
- Touch targets ≥ 44 px; `next/image` everywhere (proper `sizes`, lazy below fold,
  `quality` tuned); locally stored images so nothing breaks if a remote image dies.
- Effects must never block links, text or buttons, and must not interfere with the
  fixed mobile action bar.

---

## 11. SEO, metadata & social preview

Declare metadata once in `src/app/layout.tsx`:

- `metadataBase = new URL(business.siteUrl)`; `title` (with a `%s | Brand`
  template) and `description`; `keywords`; `applicationName`.
- `openGraph`: `type: "website"`, `locale` (e.g. `"en_IN"`), `url`, `siteName`,
  `title`, `description`, and one `images` entry `{ url, width: 1200, height: 630,
  alt }`.
- `twitter`: `card: "summary_large_image"` + title/description/image.
- `viewport`: `width: "device-width"`, `initialScale: 1`, `themeColor` (charcoal).
- **Share image** — `public/images/og-share.jpg` (1200×630, < 300 KB). Build it
  from a real brand photo (e.g. `about.jpg` or `hero.jpg`) with the logo lockup
  and a short capability line over a charcoal scrim. Generate it with a one-off
  Node script (use `sharp`, which ships with Next's image tooling; temporarily
  install it if needed). **Use a new file name whenever the artwork changes** —
  that is what makes WhatsApp / Facebook / LinkedIn drop their cached preview.
- **Favicon** — `src/app/icon.svg` matching the logo mark.
- **Structured data** — a `LocalBusiness` JSON-LD `<script>` in the body with only
  confirmed facts: `name`, `description`, `url`, `image`, `telephone`(s),
  `address` (`PostalAddress`), `areaServed`, and `contactPoint`(s). No invented
  email, ratings or opening hours.
- Optional: `alternates.canonical`.

Reference the share image by **absolute HTTPS URL** derived from `siteUrl`.

---

## 12. Imagery

- Store every image locally in `public/` and use `next/image`; never hotlink.
- Required slots: `hero.jpg`, `about.jpg`, `cta.jpg`, `og-share.jpg`,
  `website-qr.png`, `gallery-*.jpg`, and one `products/<id>.jpg` per product.
- If real photos are not supplied, use representative, licence-friendly stock
  (Pexels/Wikimedia) sized reasonably, keep consistent aspect ratios (4:3 for
  product/gallery tiles, 1200×630 for the share image), and **state in the UI and
  README that the photos are representative**, not the client's actual stock.
- Keep `imageWidth`/`imageHeight` accurate in the data files.
- Record image sources/credits in the README.

---

## 13. Copywriting rules

- Honest, specific, trade-appropriate. Short sentences. No hype, no guarantees.
- Use the business's real city/area for local relevance.
- Label sections clearly (eyebrow + `<h2>`).
- "Direct communication / speak to the business directly" is a strong, true theme
  for small businesses — use it, but only if the contacts support it.
- Never claim certifications, memberships, awards or years of experience unless
  given in INPUT.

---

## 14. Definition of done — verify before finishing

Run and report:

- `npm run lint` → 0 errors, 0 warnings.
- `npx tsc --noEmit` → clean.
- `npm run build` → succeeds; the page prerenders as static.

Then verify at runtime (dev or `next start`):

1. Single `<h1>`; heading hierarchy correct; skip link works; no duplicate IDs;
   no dangling `aria-labelledby`; every `<img>`/`next/image` has `alt`.
2. Every in-page anchor resolves and lands with the section heading just below
   the sticky header — tested on **mobile and desktop** (`scroll-padding-top`
   approach from §7A).
3. All `tel:` links correct; all `wa.me` links URL-encoded and correct; maps
   directions/search/embed all work; QR image returns 200.
4. Every local image returns 200; favicon and brand SVGs return 200.
5. `og:image` / `twitter:image` resolve to the absolute HTTPS share URL with
   `1200×630`; JSON-LD is valid with only real data.
6. Zero horizontal overflow at **320 / 375 / 414 / 768 / 1024 / 1440 px**
   (measure with same-origin iframes at those widths if you cannot resize the
   window). No layout shift.
7. No-JS check: with the `js` class removed, all reveal content is visible.
8. Reduced-motion check: entrance/reveal motion, canvas, sparks, sweeps, tilt and
   parallax all resolve to static visible states; the assembly renders assembled.
9. No console errors or warnings.
10. Quick-action / contact grids have **no empty cells**; the contact map fills its
    column with no blank band.

---

## 15. Deliverables & docs

- The complete, runnable project.
- A `README.md` covering: stack, scripts, brand tokens, structure, how to update
  content (`src/data/*`), how to regenerate the QR and share image, how to set the
  production domain (`NEXT_PUBLIC_SITE_URL`), Vercel deploy steps, how to refresh
  cached link previews, and the verification performed.
- Git: make small, meaningful commits; never commit `node_modules` or `.next`.

Adapt section names, the signature animation metaphor, icons, gallery categories
and copy to the industry in INPUT, but keep the architecture, design system,
motion, accessibility and SEO requirements exactly as specified above.
