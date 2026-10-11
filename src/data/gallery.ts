/**
 * Gallery data for Sahota Steel Works.
 *
 * All gallery items are representative industrial photographs stored
 * locally in public/images. Category filtering reflects the actual
 * material grouping. None are presented as photographs of specific
 * Sahota Steel Works projects.
 */

export type GalleryCategory = "materials" | "fabrication" | "structural";

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  width: number;
  height: number;
}

export type GalleryItem = GalleryPhoto;

export const galleryCategories: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "materials", label: "Steel Materials" },
  { id: "fabrication", label: "Fabrication" },
  { id: "structural", label: "Structural Work" },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "pipes-stack",
    src: "/images/gallery-pipes-stack.jpg",
    alt: "Large stack of steel pipes stacked on top of each other",
    caption: "Steel pipes & hollow sections",
    category: "materials",
    width: 1000,
    height: 750,
  },
  {
    id: "rods-closeup",
    src: "/images/gallery-rods-closeup.jpg",
    alt: "Close-up of solid metal rods stacked together",
    caption: "MS round bars & rods",
    category: "materials",
    width: 1000,
    height: 750,
  },
  {
    id: "rebar-bundles",
    src: "/images/gallery-rebar-bundles.jpg",
    alt: "Bundles of steel rods tied together",
    caption: "Bundled steel materials",
    category: "materials",
    width: 1000,
    height: 750,
  },
  {
    id: "warehouse-rods",
    src: "/images/gallery-warehouse-rods.jpg",
    alt: "Metal rods stacked on industrial shelving units in a warehouse",
    caption: "Warehouse & material storage",
    category: "materials",
    width: 1000,
    height: 750,
  },
  {
    id: "pipes-grey",
    src: "/images/gallery-pipes-grey.jpg",
    alt: "Grayscale photograph of metal pipes",
    caption: "Structural steel pipes",
    category: "materials",
    width: 1000,
    height: 750,
  },
  {
    id: "cylinders",
    src: "/images/gallery-cylinders.jpg",
    alt: "Large steel sections and cylinders placed next to each other",
    caption: "Steel sections & cylinders",
    category: "materials",
    width: 1000,
    height: 750,
  },
  {
    id: "welding-sparks",
    src: "/images/gallery-welding-sparks.jpg",
    alt: "Fabricator welding metal with visible sparks",
    caption: "Fabrication work",
    category: "fabrication",
    width: 1000,
    height: 750,
  },
  {
    id: "worker-grate",
    src: "/images/gallery-worker-grate.jpg",
    alt: "Worker performing fabrication work on a metal grate",
    caption: "On-site fabrication",
    category: "fabrication",
    width: 1000,
    height: 750,
  },
  {
    id: "steel-truss",
    src: "/images/gallery-truss.jpg",
    alt: "Geometric steel truss ceiling structure",
    caption: "Steel truss framing",
    category: "structural",
    width: 1600,
    height: 1067,
  },
  {
    id: "steel-frame",
    src: "/images/gallery-steel-frame.jpg",
    alt: "Modern steel framework structure against a clear sky",
    caption: "Structural steel framework",
    category: "structural",
    width: 1600,
    height: 1067,
  },
];
