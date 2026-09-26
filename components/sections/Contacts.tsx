import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { ContactIcon } from "../ContactIcon";
import { ContactForm } from "../ContactForm";
import { contacts } from "@/lib/content";

/**
 * Contatti — quattro pillole di vetro lucido nel gradiente Kontap dentro un
 * pannello smerigliato; una per riga e basse su smartphone così si vedono
 * tutte insieme:
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

          <div className="relative mx-auto mt-8 max-w-3xl sm:mt-14">
            {/* luci blu dietro al vetro */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute -left-6 top-0 h-2/3 w-1/2 rounded-full bg-[#0d76eb]/25 blur-3xl" />
              <div className="absolute -right-6 bottom-0 h-2/3 w-1/2 rounded-full bg-[#0b55c1]/25 blur-3xl" />
            </div>

            {/* pannello di vetro smerigliato */}
            <ul className="relative grid grid-cols-1 gap-2 rounded-[2rem] bg-white/45 p-2 shadow-[0_30px_60px_-34px_rgba(11,85,193,0.55),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-white/70 backdrop-blur-xl sm:grid-cols-2 sm:gap-3 sm:rounded-[2.5rem] sm:p-3">
              {contacts.map((c, i) => (
                <Reveal as="li" key={c.id} index={i}>
                  <a
                    href={c.href}
                    aria-label={`${c.label}: ${c.value}`}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="bg-brand-gradient group relative flex h-[54px] items-center justify-center gap-3 overflow-hidden rounded-full px-6 text-white shadow-[0_14px_28px_-14px_rgba(11,85,193,0.85),inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-10px_18px_rgba(4,24,80,0.28)] ring-1 ring-inset ring-white/25 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-0.5 hover:shadow-[0_20px_36px_-14px_rgba(11,85,193,0.95),inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-10px_18px_rgba(4,24,80,0.28)] active:scale-[0.98] sm:h-16"
                  >
                    {/* riflesso lucido sulla metà superiore */}
                    <span aria-hidden="true" className="pointer-events-none absolute inset-x-[5%] top-[2px] h-[48%] rounded-full bg-gradient-to-b from-white/20 via-white/[0.06] to-white/0 blur-[0.5px]" />
                    {/* bagliore che attraversa il vetro */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white/0 via-white/25 to-white/0 motion-safe:[animation:kontap-glint_5.5s_cubic-bezier(0.4,0,0.2,1)_infinite]"
                      style={{ animationDelay: `${i * 0.35}s` }}
                    />
                    <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-inset ring-white/35 backdrop-blur-sm sm:h-9 sm:w-9">
                      <ContactIcon id={c.id} className="h-[17px] w-[17px] sm:h-[18px] sm:w-[18px]" />
                    </span>
                    <span className="relative truncate text-[1rem] font-semibold tracking-tight sm:text-[1.05rem]">{c.value}</span>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
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
