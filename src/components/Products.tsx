import { MessageCircle } from "lucide-react";
import { products, productEnquiryMessage } from "@/data/products";
import { waLink } from "@/lib/contact";
import ImageWithFallback from "@/components/ImageWithFallback";
import SectionHeading from "@/components/SectionHeading";

export default function Products() {
  return (
    <section id="products" className="bg-ink-50 py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="Our Products"
          title="Iron & Steel Materials"
          description="A practical range of steel sections and fabrication categories. Send your requirement on WhatsApp — no account or forms needed."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col overflow-hidden border border-ink-200 bg-white transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-900">
                <ImageWithFallback
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  fallbackLabel={`${product.name} image`}
                />
                <span className="absolute bottom-0 left-0 h-1 w-full bg-accent-500" aria-hidden="true" />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-ink-950">
                  {product.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
                  {product.description}
                </p>
                <a
                  href={waLink(productEnquiryMessage(product))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex h-11 items-center justify-center gap-2 border border-ink-300 text-sm font-semibold uppercase tracking-wide text-ink-800 transition-colors hover:border-[#25D366] hover:bg-[#25D366] hover:text-white"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Enquire on WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-xs leading-relaxed text-ink-400">
          Product photographs are representative industrial imagery. For exact
          sizes, availability, and material enquiries, message us on WhatsApp.
        </p>
      </div>
    </section>
  );
}