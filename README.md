# Sahota Steel Works - Website

Single-page, mobile-first marketing website for **Sahota Steel Works**
(Ludhiana, Punjab, India), a steel material supply & fabrication business.
Static site - no backend, no database, no payment, no paid services. Deploys
as-is to Vercel.

The site is a cinematic industrial "steel showroom": a dark feature hero,
a product showroom built on realistic industrial photography, and
direct **Enquire on WhatsApp** actions with the product name prefilled
(no backend required).

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/turbopack`)
- `lucide-react` icons
- `next/font` - Barlow (body) + Barlow Condensed (display)
- Animation: CSS keyframes + IntersectionObserver + one lightweight canvas
  (no animation libraries)
- Product photography: realistic local photos in `public/images/products/`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

| Command         | What it does                          |
| --------------- | ------------------------------------- |
| `npm run dev`   | Start the dev server                  |
| `npm run lint`  | ESLint (flat config, ESLint 9)        |
| `npm run build` | Production build + TypeScript check   |
| `npm run start` | Serve the production build            |

> `next lint` no longer exists in Next 16 - the lint script is plain `eslint`.

## Brand identity

All colours are centralized as Tailwind v4 theme tokens in
`src/app/globals.css` (`@theme`). Update them there and the whole site follows.

| Token family      | Purpose                                            |
| ----------------- | -------------------------------------------------- |
| `ink-50..950`     | Off-white text (`#F5F5F5`) -> deep charcoal (`#171717`) |
| `accent-300..700` | Industrial orange (`--color-accent-500: #E8661B`, hover `#FF7A2F`) |
| `weld-300..500`   | Warm welding sparks - welding/metal-cut only       |
| `navy-*`          | Neutral graphite darks (legacy aliases, no blue)   |

- **Orange** is the primary action colour: buttons, active nav,
  interactive highlights, selected icons. Orange buttons use
  charcoal text for contrast.
- **Off-white / steel grey** carry typography and secondary
  elements on the deep charcoal surfaces.
- **Warm gold** (`weld-*`) is intentionally restricted to the
  welding and metal-cutting animations.

### Logo

The logo is an original, purely geometric SVG: a bold "S"
monogram built from five structural beam sections, with the
middle beam welded in industrial orange and the remaining
sections off-white. It is vector (renders sharply at any size)
and needs no external API.

- `src/components/Logo.tsx` - `Logo` (horizontal, header + footer) and
  `LogoMark` (compact symbol-only, used in the mobile menu).
- `src/app/icon.svg` - the favicon, matching the symbol.
- `public/brand/ssw-mark.svg`, `public/brand/ssw-logo.svg` - reusable
  standalone SVG assets.

The header/footer wordmark also has a one-shot metallic sheen sweep on load.

## Link previews (Open Graph / Twitter)

Sharing the site on WhatsApp, Facebook, LinkedIn or X renders a branded
card instead of a bare URL.

- **Share image** - `public/images/og-cover.jpg` (1200 x 630 JPEG). It uses
  the dark charcoal / graphite surface, the industrial orange accent
  (`#E8661B`) and off-white type: the SSW mark over "SAHOTA / STEEL WORKS",
  the line "Steel Supply & Fabrication | Ludhiana, Punjab", and the address,
  composited over a steel channel-section photograph held back by a charcoal
  scrim.
- **Metadata** - all declared once in the `metadata` export in
  `src/app/layout.tsx`: `metadataBase` (from `business.siteUrl`),
  `title` / `description`, `openGraph`
  (`type`, `siteName`, `url`, `title`, `description`, and an `images` entry
  with `1200 x 630` dimensions plus alt text) and `twitter`
  (`summary_large_image`). The file-based `opengraph-image` convention is
  intentionally not used, so the image has one source of truth.
- The share image is referenced by **absolute HTTPS URL**
  (`https://sahota-steel-works.vercel.app/images/og-cover.jpg`), resolved
  from `business.siteUrl`.

## Steel showroom

- **Product showroom** (`Products.tsx`) - a dark, editorial grid of
  uniform product cards. Every card shares the same height, the same
  image container (4:3 crop, `object-cover`), and bottom-aligned
  actions. Each tile shows a realistic product photograph matched to
  the section profile, its profile name, and an **Enquire on
  WhatsApp** action that opens a prefilled message naming the product
  (plus a one-tap call button). Hover brings a slow zoom, orange
  border illumination and a restrained metallic shine sweep.
- **Product photographs** (`public/images/products/`) - local JPEGs
  (`ms-angles.jpg`, `ms-channels.jpg`, `ms-flats.jpg`, `ms-squares.jpg`,
  `ms-pipes.jpg`, `round-bars.jpg`, `tmt-bars.jpg`, `ms-plates.jpg`,
  `roofing-sheets.jpg`, `structural-steel.jpg`,
  `iron-steel-fabrication.jpg`, `structural-fabrication.jpg`). Every
  image is stored locally, so the catalogue keeps working even if a
  third-party image link disappears. Images are representative photos
  selected to match each product's actual profile - L-sections,
  U/C-channel sections, flat and square bars, hollow pipes, solid round
  and ribbed TMT bars, plates, corrugated roofing, I-beams and
  fabrication scenes. None are presented as photographs of Sahota Steel
  Works' actual inventory.
- **Image sources & credits** - `ms-channels`, `ms-flats`, `round-bars`,
  `hero` and `about` are business-supplied images; `ms-angles`,
  `tmt-bars` and `roofing-sheets` are Pexels License photos (no
  attribution required); `ms-squares` and `ms-plates` are Wikimedia
  Commons:
  - `ms-squares.jpg` - "Bar square steel" by Supersonic0714,
    [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0)
  - `ms-plates.jpg` - "Industrial steel plates stacked near Thurcroft"
    by Neil Theasby (Geograph),
    [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0)
- **Per-product messages** (`productEnquiryMessage` in
  `src/data/products.ts`) - pure function that assembles the WhatsApp
  text; routed through `waLink()` in `src/lib/contact.ts`.

## Contact & QR code

The Contact section lists both phone numbers, WhatsApp, directions and the
map. It also renders a **QR code**
(`public/images/website-qr.png`) that encodes `business.siteUrl`, so visitors
or printed materials can scan to open the site. The PNG is generated locally
and stored in `public/` (no external service at runtime). Re-generate it if
the domain changes:

```bash
npx qrcode -o public/images/website-qr.png -w 640 -m 2 -e M \
  -d "#0f1115ff" -l "#ffffffff" "https://YOUR-DOMAIN"
```

## Motion system

Defined in `src/app/globals.css`, driven by a few small components:

- **Hero** - short fade-and-rise entrance for text/CTAs
  (`anim-fade-up*`), slowly drifting blurred workshop lights
  (orange + warm amber orbs, `anim-orb-drift*`), plus `WeldingEffect`
  (CSS focal glow + a restrained canvas spark emitter behind all hero
  content).
- **Scroll reveals** - `Reveal` (single element) and `Reveal` with `stagger`
  (children animate one-by-one) via `IntersectionObserver`.
- **Section headings** - `SectionHeading` reveals itself once in view.
- **Industrial backdrop** - `IndustrialBackdrop` layers blurred
  orange/amber light sources, a drafting grid, brushed-metal
  hairlines and faint profile outlines, used sparingly on selected
  sections.
- **Metal-cutting dividers** - `MetalCut` plays one luminous sweep + a few
  sparks on the Services and Gallery section edges.
- **Metallic reflections** - a slow light sweep travels across section
  edges (`.divider-sheen`, e.g. the showroom top edge and the hero).
- **Cards / images / buttons** - hover zoom on product photographs, accent
  border illumination, a restrained metallic shine sweep on product tiles
  (`.product-shine`, hover-only), slight arrow movement on primary CTAs,
  refined sticky header.
- **Lightbox** - smooth opacity + scale in/out.

Accessibility & performance:

- `prefers-reduced-motion: reduce` disables entrance/reveal motion, the
  welding canvas, and the metal-cut sweep (global kill switch in
  `globals.css`).
- Reveal content is only hidden when JS is present (`html.js`), so
  no-JS visitors still see everything.
- The canvas particle system pauses entirely when the tab is hidden, caps
  device pixel ratio, and stays small.
- No animation blocks contact buttons or causes layout shift / horizontal
  overflow.

## Project layout

```
src/
  app/
    layout.tsx        # fonts, metadata, LocalBusiness JSON-LD, skip link
    page.tsx          # section composition
    icon.svg          # SSW favicon (match the LogoMark)
    globals.css       # Tailwind v4 @theme tokens, keyframes, motion rules
  components/
    Logo.tsx          # full logo + compact mark
    Reveal.tsx        # IntersectionObserver reveal wrapper
    SectionHeading.tsx
    IndustrialBackdrop.tsx # reusable industrial background system
    WeldingEffect.tsx # hero welding glow + sparks (canvas)
    MetalCut.tsx      # metal-cutting section divider
    SteelStructure.tsx # "From Raw Steel to Structure" section
    SteelAssemblyAnimation.tsx # scroll-driven SVG frame assembly
    CuttingLine.tsx   # thin orange section reveal line
    BlueprintReveal.tsx # blueprint linework that becomes the real photo
    Header.tsx Hero.tsx QuickActions.tsx About.tsx Products.tsx
    Services.tsx WhyChooseUs.tsx
    Gallery.tsx Contact.tsx CTASection.tsx
    Footer.tsx MobileActionBar.tsx ShareButton.tsx CopyrightYear.tsx
    ImageWithFallback.tsx
  data/               # ALL business content lives here
    business.ts       # name, phones, WhatsApp, Maps, email
    products.ts       # 12 products (image, profile, category)
    services.ts       # 5 services + "why us" points
    gallery.ts        # categorised gallery items (materials/fabrication/structural)
  lib/
    contact.ts        # WhatsApp deep-link helpers
public/
  images/             # local images (representative industrial stock)
    products/         # product catalogue photography (12 local JPEGs)
    hero.jpg          # home hero background (stored locally)
    about.jpg         # "About" section photo (steel framework)
    website-qr.png    # QR code encoded with business.siteUrl
    og-cover.jpg      # 1200x630 Open Graph / Twitter share image
  brand/              # reusable logo SVGs
```

### Updating content

Every phone number, link, and displayed detail is centralized in
`src/data/*`. All copy reads from these files, so edit data rather than
markup.

- **Phones / WhatsApp / Maps / email** - `src/data/business.ts`
- **Products** - `src/data/products.ts` (12 items with `image`,
  `imageAlt`, `profile`, `category`). Photos live in
  `public/images/products/`.
- **Services & "why us" points** - `src/data/services.ts`
- **Gallery tiles** - `src/data/gallery.ts` (each item has a `category`; the
  on-page filter reflects it)

Email is `null` in `business.ts` until a real address is verified - the UI
hides all email actions while it is `null`.

## After your first deploy

1. **Confirm the production domain** in `src/data/business.ts` -
   `siteUrl` is pre-set to the verified Vercel URL
   `https://sahota-steel-works.vercel.app` (note the hyphens). It feeds
   `metadataBase`, the Open Graph / Twitter URLs (including the share
   image), and the JSON-LD `image`/`url`. To switch to a custom domain,
   set the `NEXT_PUBLIC_SITE_URL` environment variable in Vercel - no code
   change required.
2. **Swap stock images for real photos** - `public/images/` and
   `public/images/products/` hold representative industrial stock
   photography (Pexels license). Replace each file in place
   (keep the same filenames) or update the data files. The product
   catalogue and Gallery captions already state the photos are
   representative until real shop photos exist.
3. **Canonical URL** is intentionally omitted. `metadataBase` is already set
   from `business.siteUrl`, so add `alternates: { canonical: "/" }` in
   `src/app/layout.tsx` if a canonical link is desired.

> **Refreshing cached link previews** - social platforms cache previews
> aggressively. After changing the metadata or share image, force a
> re-scrape with the
> [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
> or [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/),
> and simply re-share on WhatsApp (it has no public debugger and updates on
> its own schedule).

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel: **New Project** -> import the repo -> framework preset
   **Next.js** (auto-detected). No environment variables, no overrides.
3. Deploy. `siteUrl` already points at the verified Vercel URL
   (`https://sahota-steel-works.vercel.app`); set `NEXT_PUBLIC_SITE_URL`
   only when moving to a custom domain.
4. `metadataBase` resolves relative OG images - no extra config needed.

## Verification performed

- `npm run lint` - 0 errors, 0 warnings
- `npm run build` - compiles, TypeScript passes; `/`, `/_not-found`,
  `/icon.svg` prerender static
- Live checks on the production build (`npm run start`):
  - Single `h1`, correct heading hierarchy, skip-to-content link
  - All section anchors resolve; fixed mobile action bar present below `lg`
  - All `tel:` links correct (both numbers); `wa.me` links all correctly
    URL-encoded; Google Maps directions and search links intact
  - 28/28 local images return HTTP 200 (`image/jpeg` / `image/png`, incl.
    the QR code); `/icon.svg`,
    `/brand/ssw-mark.svg`, `/brand/ssw-logo.svg` return 200 `image/svg+xml`
  - No console errors or warnings
  - Zero horizontal overflow, tested at 320 / 375 / 414 / 985 px (mobile
    widths measured via same-origin iframes with their own layout viewport)
  - Brand tokens present at runtime (`--color-accent-500:#e8661b`,
    `--color-weld-500:#ffb547`, `--color-weld-300:#fff0c2`,
    `--color-weld-400:#ffd98a`, `--color-ink-950:#171717`)
  - Orange CTAs compute to `rgb(232,102,27)` bg with `rgb(23,23,23)` text
  - Reveal JS present (`html.js`); no-JS fallback verified visible (reveal
    elements compute to `opacity: 1` without the `js` class)
  - Reduced-motion rules present (reveal forced visible, welding canvas
    `display:none`, metal-cut hidden)
  - Anchor links land with the section heading ~2rem below the sticky
    header (`html { scroll-padding-top: var(--header-h) }` plus a small
    section top padding) - measured on Products / Services / Gallery /
    Contact at mobile and desktop widths
  - "From Raw Steel to Structure" assembly: the sticky panel pins directly
    under the header and the SVG members reveal linearly with scroll
    (`--p` 0 → 1); fully assembled without JS and under reduced motion
  - Contact map iframe fills its column (no blank band after the Justdial
    removal); no horizontal overflow at 390 / 768 / 1024 / 1440 px
  - LocalBusiness JSON-LD valid - both phones + contact points, no invented
    email/data
