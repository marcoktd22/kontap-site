import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { ContactIcon } from "../ContactIcon";
import { ContactForm } from "../ContactForm";
import { contacts } from "@/lib/content";

/**
 * Contatti — quattro caselle di vetro chiaro (bianco → azzurro) con bordo
 * blu, nome del canale, recapito e una sfera lucida con l'icona; due per
 * riga su smartphone, quattro in fila su desktop:
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
            {/* luci azzurre morbide dietro alle caselle */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute -left-8 top-2 h-3/4 w-1/2 rounded-full bg-[#58a8f5]/20 blur-3xl" />
              <div className="absolute -right-8 bottom-0 h-3/4 w-1/2 rounded-full bg-[#0d76eb]/15 blur-3xl" />
            </div>

            <ul className="relative grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {contacts.map((c, i) => (
                <Reveal as="li" key={c.id} index={i}>
                  <a
                    href={c.href}
                    aria-label={`${c.label}: ${c.value}`}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group relative flex h-full flex-col items-center overflow-hidden rounded-[1.75rem] border-[1.5px] border-[#0b67cc]/45 px-3 pb-4 pt-4 text-center shadow-[0_22px_44px_-26px_rgba(11,85,193,0.55),inset_0_1px_0_#fff,inset_0_-14px_26px_rgba(11,103,204,0.07)] backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:border-[#0b67cc]/70 hover:shadow-[0_28px_50px_-24px_rgba(11,85,193,0.65),inset_0_1px_0_#fff,inset_0_-14px_26px_rgba(11,103,204,0.09)] sm:rounded-[2rem] sm:pb-5 sm:pt-5"
                    style={{
                      background:
                        "radial-gradient(90% 60% at 50% 100%, rgba(88,168,245,0.28), transparent 70%), linear-gradient(180deg, rgba(255,255,255,0.97) 0%, rgba(243,248,255,0.95) 45%, rgba(221,235,253,0.92) 100%)",
                    }}
                  >
                    {/* riflesso vetro in alto */}
                    <span aria-hidden="true" className="pointer-events-none absolute inset-x-3 top-0 h-1/3 rounded-b-[50%] bg-gradient-to-b from-white to-white/0 opacity-80" />

                    <span className="relative block text-[1rem] font-semibold leading-tight tracking-tight text-[#0b67cc] sm:text-[1.05rem]">{c.label}</span>
                    <span className="relative mt-0.5 block max-w-full truncate text-[0.72rem] font-medium text-[#0b67cc]/60 sm:text-[0.78rem]">{c.value}</span>

                    {/* sfera lucida con l'icona */}
                    <span className="relative mt-3 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-[0_10px_22px_-6px_rgba(11,103,204,0.6),0_0_0_6px_rgba(88,168,245,0.12),inset_0_2px_3px_rgba(255,255,255,0.55),inset_0_-4px_8px_rgba(4,40,120,0.35)] transition-transform duration-300 group-hover:scale-105 sm:mt-4 sm:h-14 sm:w-14"
                      style={{ background: "radial-gradient(circle at 35% 28%, #7cc0ff 0%, #2f8cf0 32%, #0b67cc 62%, #0b4fb0 100%)" }}
                    >
                      <ContactIcon id={c.id} className="h-[21px] w-[21px] drop-shadow-[0_1px_1px_rgba(4,40,120,0.35)] sm:h-6 sm:w-6" />
                    </span>
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
