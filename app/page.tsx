import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Plus } from "@/components/sections/Plus";
import { CTA } from "@/components/sections/CTA";
import { WhatsAppButton } from "@/components/WhatsAppButton";

/** Landing essenziale: il prodotto, Plus, la chiamata all'azione. */
export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Plus />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
