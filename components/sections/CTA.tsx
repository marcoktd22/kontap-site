import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { Logo } from "../Logo";

export function CTA() {
  return (
    <section id="cta" className="relative scroll-mt-24 px-4 py-16 sm:py-20">
      <Container className="px-0">
        <div
          className="relative isolate overflow-hidden rounded-[2.5rem] px-6 py-20 text-center text-white sm:px-12 sm:py-28"
          style={{
            background:
              "linear-gradient(135deg, #0A36F6 0%, #2E7BFF 50%, #4FC3FF 100%)",
          }}
        >
          {/* Bagliori soft per profondità */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
            <div className="absolute right-[-10%] top-[-30%] h-[60vh] w-[60vh] rounded-full bg-white/20 blur-[80px]" />
            <div className="absolute left-[-10%] bottom-[-30%] h-[50vh] w-[50vh] rounded-full bg-celeste/40 blur-[90px]" />
          </div>

          <div className="relative">
            <Reveal className="flex justify-center">
              <span className="flex h-14 items-center justify-center rounded-2xl bg-white/15 px-5 ring-hairline-invert backdrop-blur-md">
                <Logo variant="light" className="h-5 w-auto" />
              </span>
            </Reveal>

            <Reveal index={1}>
              <h2 className="mx-auto mt-8 max-w-2xl text-balance text-4xl font-semibold sm:text-5xl md:text-6xl">
                Pronto a fare il tuo primo tap?
              </h2>
            </Reveal>

            <Reveal index={2}>
              <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/85">
                Porta Kontap sul tuo bancone — hardware NFC premium per le
                attività locali, tutto gestito dalla piattaforma Plus. Spedizioni
                in tutta Italia e nel mondo.
              </p>
            </Reveal>

            <Reveal index={3}>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#products"
                  className="group inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-full bg-white px-7 text-base font-medium text-primary shadow-[0_10px_30px_-8px_rgba(7,11,26,0.35)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-0.5"
                >
                  Scopri i prodotti
                  <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <Button href="#plus" size="lg" variant="invert">
                  Entra nella waitlist di Plus
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
