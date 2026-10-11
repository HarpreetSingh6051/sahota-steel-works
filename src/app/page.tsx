import About from "@/components/About";
import Contact from "@/components/Contact";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MobileActionBar from "@/components/MobileActionBar";
import Products from "@/components/Products";
import QuickActions from "@/components/QuickActions";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col pb-16 lg:pb-0">
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <QuickActions />
        <About />
        <Products />
        <Services />
        <WhyChooseUs />
        <Gallery />
        <Contact />
        <CTASection />
      </main>
      <Footer />
      {/* pb-16 above keeps the fixed mobile action bar from covering footer content */}
      <MobileActionBar />
    </div>
  );
}
