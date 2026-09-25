import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Plus } from "@/components/sections/Plus";
import { PlusDemo } from "@/components/sections/PlusDemo";
import { PlusFeatures } from "@/components/sections/PlusFeatures";
import { CTA } from "@/components/sections/CTA";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Kontap+",
  description:
    "Kontap+ analizza continuamente la tua presenza digitale: reputazione, AI review analysis, competitor, SEO, GEO/AEO, report automatici e piano d'azione.",
};

export default function KontapPlusPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Plus />
        <PlusDemo />
        <PlusFeatures />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
