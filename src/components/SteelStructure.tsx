import CuttingLine from "@/components/CuttingLine";
import IndustrialBackdrop from "@/components/IndustrialBackdrop";
import SectionHeading from "@/components/SectionHeading";
import SteelAssemblyAnimation from "@/components/SteelAssemblyAnimation";

/**
 * "From Raw Steel to Structure" — a scroll-driven showcase that bridges the
 * product showroom and the fabrication narrative. The frame assembles from
 * raw members as the visitor scrolls; the copy stays factual and high level.
 */
export default function SteelStructure() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative isolate border-y border-white/10 bg-ink-900"
    >
      <IndustrialBackdrop variant="dark" intensity="soft" showProfiles={false} />

      <div className="container-site relative pt-16 sm:pt-20">
        <SectionHeading
          titleId="process-heading"
          eyebrow="From Raw Steel to Structure"
          title="Watch a steel frame take shape"
          description="Steel sections from our showroom are cut and fabricated to suit the job. Scroll to see a simple frame assemble from raw members — columns, beams, bracing and connections."
          dark
        />
        <div className="mx-auto mt-8 max-w-sm">
          <CuttingLine />
        </div>
      </div>

      <SteelAssemblyAnimation />
    </section>
  );
}
