import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { ContactIcon } from "../ContactIcon";
import { ContactForm } from "../ContactForm";
import { contacts } from "@/lib/content";

/** Nuovo stile Kontap (prova su questa pagina): blu sfumato ↔ bianco con testi #0e57ba. */
const KBLUE = "#0e57ba";

/**
 * Contatti — quattro card identiche, due per riga anche su smartphone:
 * WhatsApp, email (apre l'app Mail con l'indirizzo già inserito),
 * Instagram e il modulo "ti contattiamo noi".
 */
export function Contacts() {
  return (
    <>
      <Section
        id="contatti"
        className="bg-cover bg-center pb-14 pt-28 text-white sm:pb-20 sm:pt-44"
        style={{ backgroundImage: "url(/backgrounds/kontap-blue.webp)", backgroundColor: "#052973" }}
      >
        <Container>
          <SectionHeader
            tone="dark"
            eyebrow="Contatti"
            title={
              <>
                <span className="text-white">Parliamo. </span>
                <span className="text-gradient-invert-accent">Basta un tap.</span>
              </>
            }
            description={<span className="text-white/80">Scegli il canale che preferisci: ti rispondiamo il prima possibile.</span>}
          />

          <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:mt-14 sm:gap-4">
            {contacts.map((c, i) => (
              <Reveal as="li" key={c.id} index={i}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full flex-col gap-3 rounded-[1.5rem] bg-white p-4 shadow-[0_24px_50px_-24px_rgba(3,15,51,0.7)] transition-all duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 sm:flex-row sm:items-center sm:gap-4 sm:p-6"
                >
                  <span className="flex items-start justify-between sm:contents">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white sm:h-12 sm:w-12" style={{ backgroundColor: KBLUE }}>
                      <ContactIcon id={c.id} className="h-5 w-5" />
                    </span>
                    <Arrow className="sm:hidden" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em]" style={{ color: KBLUE, opacity: 0.65 }}>
                      {c.label}
                    </span>
                    <span className="mt-1 block truncate text-[0.95rem] font-semibold sm:text-lg" style={{ color: KBLUE }}>
                      {c.value}
                    </span>
                  </span>
                  <Arrow className="hidden sm:block" />
                </a>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section id="modulo" className="bg-white pb-20 pt-12 sm:pb-28 sm:pt-20">
        <Container>
          <Reveal className="mx-auto max-w-3xl">
            <ContactForm />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={`h-5 w-5 shrink-0 text-[#0e57ba] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${className ?? ""}`}>
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
