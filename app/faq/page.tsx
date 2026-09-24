import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FAQ } from "@/components/sections/FAQ";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Domande frequenti sulla targa recensioni NFC Kontap e sull'abbonamento Kontap Plus.",
};

export default function FaqPage() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-[88px] sm:pt-24">
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
