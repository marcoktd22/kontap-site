import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { ContactIcon } from "../ContactIcon";
import { ContactForm } from "../ContactForm";
import { contacts } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * Contatti — quattro pillole sfumate bianco → blu (direzione alternata),
 * una per riga e basse su smartphone così si vedono tutte insieme:
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

          <ul className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-2.5 sm:mt-14 sm:grid-cols-2 sm:gap-4">
            {contacts.map((c, i) => {
              // pillole sfumate bianco → blu, direzione alternata
              const reverse = i % 2 === 1;
              return (
                <Reveal as="li" key={c.id} index={i}>
                  <a
                    href={c.href}
                    aria-label={`${c.label}: ${c.value}`}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={cn(
                      "group relative flex h-[52px] items-center justify-center gap-2.5 rounded-full border-[1.5px] border-[#0b67cc] px-6 text-white shadow-[0_14px_30px_-20px_rgba(11,103,204,0.8)] transition-all duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-18px_rgba(11,103,204,0.9)] sm:h-16",
                      reverse
                        ? "bg-[linear-gradient(90deg,#0b67cc_0%,#6aa0de_32%,#c9d8ea_62%,#f1f3f6_84%,#fafaf8_100%)]"
                        : "bg-[linear-gradient(90deg,#fafaf8_0%,#f1f3f6_16%,#c9d8ea_38%,#6aa0de_68%,#0b67cc_100%)]"
                    )}
                    style={{ textShadow: "0 1px 2px rgba(11,103,204,0.55), 0 0 10px rgba(11,103,204,0.35)" }}
                  >
                    <ContactIcon id={c.id} className="h-5 w-5 drop-shadow-[0_1px_2px_rgba(11,103,204,0.55)] sm:h-[22px] sm:w-[22px]" />
                    <span className="truncate text-[1.05rem] font-medium tracking-tight sm:text-lg">{c.value}</span>
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
