/**
 * Product catalogue for Sahota Steel Works.
 *
 * Images are locally stored representative industrial photographs
 * (public/images). Swap `image` with real shop photographs later without
 * touching the layout.
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  /** Local path under /public */
  image: string;
  imageAlt: string;
  /** Intrinsic pixel dimensions — prevents layout shift */
  width: number;
  height: number;
}

export const products: Product[] = [
  {
    id: "ms-angles",
    name: "MS Angles",
    description:
      "Steel angle sections for structural and fabrication applications.",
    image: "/images/product-angles.jpg",
    imageAlt:
      "Angle sections forming a steel lattice structure against a blue sky",
    width: 800,
    height: 600,
  },
  {
    id: "ms-channels",
    name: "MS Channels",
    description:
      "Channel sections for construction and engineering requirements.",
    image: "/images/product-channels.jpg",
    imageAlt: "Structural steel members forming a gray metal framework",
    width: 800,
    height: 600,
  },
  {
    id: "ms-flats",
    name: "MS Flats",
    description:
      "Flat steel bars for fabrication and general metalwork.",
    image: "/images/product-flats.jpg",
    imageAlt: "Flat steel bars stacked neatly inside a metal warehouse",
    width: 800,
    height: 600,
  },
  {
    id: "ms-pipes",
    name: "MS Pipes",
    description:
      "Steel pipes for suitable structural and industrial applications.",
    image: "/images/product-pipes.jpg",
    imageAlt: "Stack of steel pipes on a factory line",
    width: 800,
    height: 600,
  },
  {
    id: "round-bars",
    name: "Round Bars",
    description:
      "Round steel bars for fabrication and engineering use.",
    image: "/images/product-round-bars.jpg",
    imageAlt: "Bundle of round steel bars stacked together",
    width: 800,
    height: 600,
  },
  {
    id: "structural-steel",
    name: "Structural Steel",
    description:
      "Steel sections for structural and construction requirements.",
    image: "/images/product-structural-steel.jpg",
    imageAlt: "Steel beams and roofing sections in a modern construction",
    width: 800,
    height: 600,
  },
  {
    id: "iron-steel-fabrication",
    name: "Iron & Steel Fabrication",
    description:
      "Fabrication solutions based on project requirements.",
    image: "/images/product-fabrication.jpg",
    imageAlt: "Fabricator working on a steel workpiece with a welding machine",
    width: 800,
    height: 600,
  },
  {
    id: "structural-fabrication",
    name: "Structural Fabrication Work",
    description:
      "Steel structures and fabrication work according to customer specifications.",
    image: "/images/product-structural-fab.jpg",
    imageAlt: "Welder joining a steel frame during structural fabrication",
    width: 800,
    height: 600,
  },
];

/**
 * Build a product-specific WhatsApp enquiry. Appended to the WhatsApp URL
 * directly (already URL-safe) or used through waLink() in src/lib/contact.ts.
 */
export function productEnquiryMessage(product: Product): string {
  return `Hello Sahota Steel Works! I would like to enquire about ${product.name} (${product.description}).`;
}