import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Contacts } from "@/components/sections/Contacts";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Contatta Kontap su WhatsApp, via email a hello@kontap.it o su Instagram @kontap.it.",
};

export default function ContattiPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Contacts />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
