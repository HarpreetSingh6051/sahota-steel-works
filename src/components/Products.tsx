import { business } from "@/data/business";
import { products } from "@/data/products";
import AmbientEmbers from "@/components/AmbientEmbers";
import CuttingLine from "@/components/CuttingLine";
import IndustrialBackdrop from "@/components/IndustrialBackdrop";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function Products() {
  const primaryContact = business.contacts[0];

  return (
    <section
      id="products"
      className="relative isolate overflow-hidden bg-ink-950 pt-6 pb-20 text-white sm:pt-8 sm:pb-28"
    >
      <IndustrialBackdrop variant="dark" intensity="full" />
      <AmbientEmbers count={14} />
      {/* Slow metallic reflection travelling across the showroom edge */}
      <span className="divider-sheen" aria-hidden="true" />

      <div className="container-site">
        <SectionHeading
          eyebrow="Steel Showroom"
          title="Find the Steel Your Project Needs."
          description="Browse the materials and fabrication work we supply, then enquire directly on WhatsApp for sizes, grades and delivery."
          align="left"
          dark
        />
        <div className="mt-8 max-w-sm">
          <CuttingLine />
        </div>

        {/* Uniform showroom grid — every card shares the same height,
            image-container size and bottom-aligned actions. */}
        <Reveal
          className="mt-12 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          stagger
        >
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              primaryContact={primaryContact}
              delay={index * 60}
            />
          ))}
        </Reveal>

        <p className="mt-10 text-xs leading-relaxed text-ink-500">
          Product photographs are representative industry images, not
          photographs of our current stock. For exact sizes, grades and
          availability, enquire on WhatsApp or call{" "}
          <a
            href={primaryContact.phoneAction}
            className="font-semibold text-accent-300 hover:underline"
          >
            {primaryContact.phoneDisplay}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
