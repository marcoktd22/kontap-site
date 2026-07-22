import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { UseCases } from "@/components/sections/UseCases";
import { WhyKontap } from "@/components/sections/WhyKontap";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Products } from "@/components/sections/Products";
import { KontapOS } from "@/components/sections/KontapOS";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/sections/FAQ";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <UseCases />
        <WhyKontap />
        <HowItWorks />
        <Products />
        <KontapOS />
        <CTA />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
