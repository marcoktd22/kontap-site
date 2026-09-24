import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyKontap } from "@/components/sections/WhyKontap";
import { CTA } from "@/components/sections/CTA";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Come funziona",
  description:
    "Dal tap alla recensione in tre passi: come funziona la targa NFC Kontap e perché sceglierla.",
};

export default function ComeFunziona() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-16 sm:pt-12">
        <HowItWorks />
        <WhyKontap />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
