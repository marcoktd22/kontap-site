import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { BrandBackdrop } from "../BrandBackdrop";
import { whatsappHref } from "@/lib/content";

export function CTA() {
  return (
    <section id="cta" className="relative scroll-mt-24 px-4 py-12 sm:py-20">
      <Container className="px-0">
        {/* Blu sfumato Kontap */}
        <div
          className="relative isolate overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:rounded-[2.5rem] text-white shadow-[0_40px_110px_-56px_rgba(36,83,255,0.5)] sm:px-12 sm:py-28"
          style={{
            // Blu sfumato Kontap, versione luminosa
            backgroundImage:
              "radial-gradient(80% 90% at 10% 105%, rgba(90,175,245,0.6), transparent 60%)," +
              "radial-gradient(70% 70% at 100% 0%, rgba(13,67,161,0.5), transparent 65%)," +
              "linear-gradient(140deg, #0d76eb 0%, #0c6adf 40%, #0b55c1 75%, #0d43a1 100%)",
          }}
        >
          <BrandBackdrop variant="cta" />

          <div className="relative">
            <Reveal index={1}>
              <h2 className="mx-auto max-w-2xl text-balance text-4xl font-semibold sm:text-5xl md:text-6xl">
                Pronto a fare il tuo primo tap?
              </h2>
            </Reveal>

            <Reveal index={2}>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
                Porta la targa Kontap sul tuo bancone: la montiamo e configuriamo
                noi, senza costi aggiuntivi.
              </p>
            </Reveal>

            <Reveal index={3}>
              <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <a
                  href={whatsappHref("Ciao Kontap, vorrei richiedere la targa recensioni.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-full bg-white px-7 text-base font-semibold text-[#0b5fc8] shadow-[0_12px_30px_-10px_rgba(9,17,33,0.4)] transition-all duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-0.5"
                >
                  <span className="text-gradient-accent">Richiedi la tua targa</span>
                  <Icon name="arrow" className="h-4 w-4 text-[#0b55c1] transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <Button href="/prezzi" size="lg" variant="invert">
                  Vedi i prezzi
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
