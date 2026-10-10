/**
 * Gallery data for Sahota Steel Works.
 *
 * Images are representative industrial photographs stored locally in
 * public/images. Replace `src` with real shop photographs when available —
 * everything else (captions, alt text) is easy to update here too.
 */

export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export const galleryItems: GalleryItem[] = [
  {
    src: "/images/gallery-pipes-stack.jpg",
    alt: "Large stack of steel pipes stacked on top of each other",
    caption: "Steel pipes & hollow sections",
    width: 1000,
    height: 750,
  },
  {
    src: "/images/gallery-rods-closeup.jpg",
    alt: "Close-up of metal rods stacked together",
    caption: "MS round bars & rods",
    width: 1000,
    height: 750,
  },
  {
    src: "/images/gallery-rebar-bundles.jpg",
    alt: "Bundles of steel rods tied together",
    caption: "Bundled steel materials",
    width: 1000,
    height: 750,
  },
  {
    src: "/images/gallery-welding-sparks.jpg",
    alt: "Fabricator welding metal with visible sparks",
    caption: "Fabrication work",
    width: 1000,
    height: 750,
  },
  {
    src: "/images/gallery-worker-grate.jpg",
    alt: "Worker performing fabrication work on a metal grate",
    caption: "On-site fabrication",
    width: 1000,
    height: 750,
  },
  {
    src: "/images/gallery-warehouse-rods.jpg",
    alt: "Metal rods stacked on industrial shelving units in a warehouse",
    caption: "Warehouse & material storage",
    width: 1000,
    height: 750,
  },
  {
    src: "/images/gallery-pipes-grey.jpg",
    alt: "Grayscale photograph of metal pipes",
    caption: "Structural steel pipes",
    width: 1000,
    height: 750,
  },
  {
    src: "/images/gallery-cylinders.jpg",
    alt: "Large steel cylinders placed next to each other",
    caption: "Steel sections & cylinders",
    width: 1000,
    height: 750,
  },
];