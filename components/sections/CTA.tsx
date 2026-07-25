import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";

export function CTA() {
  return (
    <section id="cta" className="relative scroll-mt-24 px-4 py-16 sm:py-20">
      <Container className="px-0">
        <div
          className="relative isolate overflow-hidden rounded-[2.5rem] px-6 py-20 text-center ring-hairline shadow-[0_40px_100px_-56px_rgba(36,83,255,0.35)] sm:px-12 sm:py-28"
          style={{
            background:
              "radial-gradient(42% 62% at 14% 18%, rgba(88,200,255,0.22), transparent 60%)," +
              "radial-gradient(46% 66% at 86% 22%, rgba(36,83,255,0.14), transparent 62%)," +
              "radial-gradient(52% 72% at 72% 104%, rgba(88,200,255,0.2), transparent 65%)," +
              "radial-gradient(46% 62% at 22% 96%, rgba(36,83,255,0.1), transparent 60%)," +
              "linear-gradient(180deg, #f8fbff 0%, #edf5ff 100%)",
          }}
        >
          <Reveal index={1}>
            <h2 className="mx-auto max-w-2xl text-balance text-4xl font-semibold sm:text-5xl md:text-6xl">
              <span className="text-gradient">Pronto a fare il tuo </span>
              <span className="text-gradient-accent">primo tap?</span>
            </h2>
          </Reveal>

          <Reveal index={2}>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
              Porta Kontap sul tuo bancone — hardware NFC premium per le attività
              locali, tutto gestito dalla piattaforma Plus. Spedizioni in tutta
              Italia e nel mondo.
            </p>
          </Reveal>

          <Reveal index={3}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="#products" size="lg">
                Scopri i prodotti
                <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button href="#plus" size="lg" variant="secondary">
                Entra nella waitlist di Plus
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
