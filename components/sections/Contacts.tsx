import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { ContactIcon } from "../ContactIcon";
import { ContactForm } from "../ContactForm";
import { contacts } from "@/lib/content";
import { cn } from "@/lib/cn";

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
            {contacts.map((c, i) => {
              // alternanza a scacchiera: card blu sfumato ↔ card bianca con testi #0e57ba
              const blue = i === 0 || i === 3;
              return (
                <Reveal as="li" key={c.id} index={i}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={cn(
                      "group flex h-full flex-col gap-3 rounded-[1.5rem] p-4 transition-all duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 sm:flex-row sm:items-center sm:gap-4 sm:p-6",
                      blue
                        ? "bg-brand-gradient text-white shadow-[0_24px_50px_-24px_rgba(11,103,204,0.7)]"
                        : "bg-white text-[#0e57ba] shadow-[var(--shadow-card)] ring-1 ring-[#0e57ba]/15"
                    )}
                  >
                    <span className="flex items-start justify-between sm:contents">
                      <span
                        className={cn(
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white sm:h-12 sm:w-12",
                          blue ? "bg-white/15 ring-1 ring-white/25" : "bg-brand-gradient shadow-[0_10px_22px_-10px_rgba(5,41,115,0.6)]"
                        )}
                      >
                        <ContactIcon id={c.id} className="h-5 w-5" />
                      </span>
                      <Arrow className={cn("sm:hidden", blue ? "text-white" : "text-[#0e57ba]")} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={cn("block text-[0.65rem] font-semibold uppercase tracking-[0.16em]", blue ? "text-white/70" : "text-[#0e57ba]/60")}>
                        {c.label}
                      </span>
                      <span className="mt-1 block truncate text-[0.95rem] font-semibold sm:text-lg">{c.value}</span>
                    </span>
                    <Arrow className={cn("hidden sm:block", blue ? "text-white" : "text-[#0e57ba]")} />
                  </a>
                </Reveal>
              );
            })}
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
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={`h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${className ?? ""}`}>
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
