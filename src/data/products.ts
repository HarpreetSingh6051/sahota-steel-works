/**
 * Product catalogue for Sahota Steel Works.
 *
 * Each product is shown with a realistic industrial photograph stored
 * locally in public/images/products, so the catalogue keeps working even
 * if a third-party image link disappears. The photographs are
 * representative images selected to match each product's actual section
 * profile — L-sections for angles, U/C-channel sections for channels,
 * flat and square bars, hollow pipes, solid round and ribbed TMT bars,
 * plates, corrugated roofing and fabrication work. They are never
 * presented as photographs of Sahota Steel Works' actual inventory.
 *
 * Image sources: business-supplied product photos plus licence-friendly
 * stock photography (Pexels License and Wikimedia Commons CC BY / CC
 * BY-SA). See README for the per-image source list.
 */

export type ProductCategory = "material" | "fabrication";

export interface Product {
  id: string;
  name: string;
  description: string;
  /** Short technical descriptor of the section/profile, shown on the tile. */
  profile: string;
  /** Local product photograph (public/images/products). */
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  category: ProductCategory;
}

export const products: Product[] = [
  {
    id: "ms-angles",
    name: "MS Angles",
    description:
      "Mild steel angle sections for structural framing and fabrication work.",
    profile: "L-section",
    image: "/images/products/ms-angles.jpg",
    imageAlt:
      "Close-up of steel angle sections arranged in a geometric stack",
    imageWidth: 1600,
    imageHeight: 1200,
    category: "material",
  },
  {
    id: "ms-channels",
    name: "MS Channels",
    description:
      "Mild steel channel sections for construction and engineering requirements.",
    profile: "U / C-section",
    image: "/images/products/ms-channels.jpg",
    imageAlt: "Mild steel channel (U/C) sections stacked together",
    imageWidth: 500,
    imageHeight: 500,
    category: "material",
  },
  {
    id: "ms-flats",
    name: "MS Flats",
    description:
      "Flat mild steel bars for fabrication, framing and general metalwork.",
    profile: "Flat rectangular section",
    image: "/images/products/ms-flats.jpg",
    imageAlt: "Flat mild steel bars stacked together",
    imageWidth: 447,
    imageHeight: 447,
    category: "material",
  },
  {
    id: "ms-squares",
    name: "MS Squares",
    description:
      "Square mild steel bars for grills, gates, frames and general fabrication work.",
    profile: "Square section",
    image: "/images/products/ms-squares.jpg",
    imageAlt: "Square mild steel bars stacked together",
    imageWidth: 1200,
    imageHeight: 782,
    category: "material",
  },
  {
    id: "ms-pipes",
    name: "MS Pipes",
    description:
      "Hollow steel pipes and tubes for suitable structural and industrial use.",
    profile: "Hollow circular section",
    image: "/images/products/ms-pipes.jpg",
    imageAlt: "Stack of hollow steel pipes on a factory line",
    imageWidth: 800,
    imageHeight: 600,
    category: "material",
  },
  {
    id: "round-bars",
    name: "Round Bars",
    description:
      "Solid round steel bars for fabrication and engineering applications.",
    profile: "Solid round section",
    image: "/images/products/round-bars.jpg",
    imageAlt: "Solid round steel bars",
    imageWidth: 500,
    imageHeight: 500,
    category: "material",
  },
  {
    id: "tmt-bars",
    name: "TMT Bars",
    description:
      "Thermo-mechanically treated reinforcement bars for RCC and construction work.",
    profile: "Ribbed reinforcement bar",
    image: "/images/products/tmt-bars.jpg",
    imageAlt: "Close-up of ribbed TMT reinforcement bars",
    imageWidth: 1200,
    imageHeight: 800,
    category: "material",
  },
  {
    id: "ms-plates",
    name: "MS Plates",
    description:
      "Mild steel plates for structural, fabrication and general engineering requirements.",
    profile: "Plate / flat section",
    image: "/images/products/ms-plates.jpg",
    imageAlt: "Stacked mild steel plates in an industrial yard",
    imageWidth: 1200,
    imageHeight: 720,
    category: "material",
  },
  {
    id: "roofing-sheets",
    name: "Roofing Sheets",
    description:
      "Corrugated galvanised steel roofing sheets for sheds, warehouses and shelters.",
    profile: "Corrugated GI sheet",
    image: "/images/products/roofing-sheets.jpg",
    imageAlt: "Corrugated galvanised steel roofing sheets",
    imageWidth: 1200,
    imageHeight: 1500,
    category: "material",
  },
  {
    id: "structural-steel",
    name: "Structural Steel",
    description:
      "Beams, columns and structural sections for building and construction work.",
    profile: "I & H beam sections",
    image: "/images/products/structural-steel.jpg",
    imageAlt: "Five structural I-beams delivered as construction raw material",
    imageWidth: 1920,
    imageHeight: 1080,
    category: "material",
  },
  {
    id: "iron-steel-fabrication",
    name: "Iron & Steel Fabrication",
    description:
      "Cutting, welding and assembly of iron and steel components to your requirement.",
    profile: "Cutting · welding · assembly",
    image: "/images/products/iron-steel-fabrication.jpg",
    imageAlt:
      "Fabricator working on a steel workpiece with a welding machine",
    imageWidth: 800,
    imageHeight: 600,
    category: "fabrication",
  },
  {
    id: "structural-fabrication",
    name: "Structural Fabrication Work",
    description:
      "Fabricated steel structures — trusses, frames and load-bearing assemblies.",
    profile: "Trusses · frames · structures",
    image: "/images/products/structural-fabrication.jpg",
    imageAlt: "Welder joining a steel frame during structural fabrication",
    imageWidth: 800,
    imageHeight: 600,
    category: "fabrication",
  },
];

/** Products grouped for navigation / filtering (fabrication items last). */
export const materialProducts = products.filter(
  (product) => product.category === "material",
);
export const fabricationProducts = products.filter(
  (product) => product.category === "fabrication",
);

/**
 * Build a product-specific WhatsApp enquiry. Appended to the WhatsApp URL
 * directly (already URL-safe) or used through waLink() in src/lib/contact.ts.
 */
export function productEnquiryMessage(product: Product): string {
  return `Hello Sahota Steel Works! I would like to enquire about ${product.name} (${product.description}).`;
}
