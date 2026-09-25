import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PlatePricing, ServicePricing } from "@/components/sections/Pricing";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Prezzi e servizi",
  description:
    "Targa recensioni Google a 29,99 € IVA inclusa, Bundle 5 targhe a 100 € e i servizi Kontap Base, Kontap Grow e Kontap+.",
};

export default function PrezziPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <PlatePricing />
        <ServicePricing />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
