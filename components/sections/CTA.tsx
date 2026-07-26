import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { BrandBackdrop } from "../BrandBackdrop";

export function CTA() {
  return (
    <section id="cta" className="relative scroll-mt-24 px-4 py-16 sm:py-20">
      <Container className="px-0">
        {/* Luminous Wallet-Pass gradient — bright & optimistic, never dark */}
        <div
          className="noise-layer relative isolate overflow-hidden rounded-[2.5rem] px-6 py-20 text-center text-white shadow-[0_40px_110px_-56px_rgba(36,83,255,0.55),inset_0_1px_0_0_rgba(255,255,255,0.3)] sm:px-12 sm:py-28"
          style={{
            background:
              "radial-gradient(120% 120% at 15% 0%, #3a7bff 0%, rgba(58,123,255,0) 55%)," +
              "radial-gradient(120% 120% at 100% 100%, #58c8ff 0%, rgba(88,200,255,0) 55%)," +
              "linear-gradient(150deg, #1f47d6 0%, #2453ff 42%, #3d8bff 76%, #58c8ff 100%)",
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
                  className="group inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-full bg-white px-7 text-base font-medium text-primary shadow-[0_12px_30px_-10px_rgba(9,17,33,0.4)] transition-all duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-0.5"
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
