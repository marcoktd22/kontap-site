import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Plans } from "@/components/sections/Plans";
import { CTA } from "@/components/sections/CTA";
import { WhatsAppButton } from "@/components/WhatsAppButton";

/** Landing essenziale: il prodotto, i piani, la chiamata all'azione. */
export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Plans />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
