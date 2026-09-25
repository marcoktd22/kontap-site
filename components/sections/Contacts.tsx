import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { ContactIcon } from "../ContactIcon";
import { ContactForm } from "../ContactForm";
import { contacts } from "@/lib/content";

/**
 * Contatti — quattro card identiche, due per riga anche su smartphone:
 * WhatsApp, email (apre l'app Mail con l'indirizzo già inserito),
 * Instagram e il modulo "ti contattiamo noi".
 */
export function Contacts() {
  return (
    <>
      <Section id="contatti" className="pb-12 pt-28 sm:pb-16 sm:pt-44">
        <Container>
          <SectionHeader
            eyebrow="Contatti"
            title={
              <>
                <span className="text-gradient">Parliamo. </span>
                <span className="text-gradient-accent">Basta un tap.</span>
              </>
            }
            description="Scegli il canale che preferisci: ti rispondiamo il prima possibile."
          />

          <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:mt-14 sm:gap-4">
            {contacts.map((c, i) => (
              <Reveal as="li" key={c.id} index={i}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full flex-col gap-3 rounded-[1.5rem] bg-white p-4 shadow-[var(--shadow-card)] ring-hairline transition-all duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:ring-1 hover:ring-[color:rgba(88,200,255,0.6)] sm:flex-row sm:items-center sm:gap-4 sm:p-6"
                >
                  <span className="flex items-start justify-between sm:contents">
                    <span className="bg-brand-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white shadow-[0_10px_22px_-10px_rgba(36,83,255,0.6)] sm:h-12 sm:w-12">
                      <ContactIcon id={c.id} className="h-5 w-5" />
                    </span>
                    <Arrow className="sm:hidden" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted">
                      {c.label}
                    </span>
                    <span className="mt-1 block truncate text-[0.95rem] font-semibold text-ink sm:text-lg">
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

      <Section id="modulo" className="pb-24 pt-4 sm:pb-32 sm:pt-8">
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
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${className ?? ""}`}>
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
