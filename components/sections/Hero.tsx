import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { GlowBackdrop } from "../ui/GlowBackdrop";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-24 pt-40 sm:pb-28 sm:pt-44 md:pb-32 md:pt-48"
    >
      <GlowBackdrop variant="hero" />

      {/* Wordmark fantasma per profondità */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[46%] -z-10 -translate-x-1/2 -translate-y-1/2 select-none text-[24vw] font-semibold leading-none tracking-tighter text-ink/[0.03] sm:text-[20vw]"
      >
        kontap
      </span>

      <Container className="relative flex flex-col items-center text-center">
        <Reveal>
          <Eyebrow>Tecnologia NFC · Made in Puglia</Eyebrow>
        </Reveal>

        <Reveal index={1}>
          <h1 className="mt-7 max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
            <span className="text-gradient">Un tap che fa crescere </span>
            <span className="text-gradient-accent">la tua attività.</span>
          </h1>
        </Reveal>

        <Reveal index={2}>
          <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
            Kontap crea hardware NFC premium per le attività locali — a partire
            dalla targa per le recensioni Google — tutto gestito da Plus:
            analisi delle recensioni con l’AI, report automatici e statistiche
            in tempo reale.
          </p>
        </Reveal>

        <Reveal index={3}>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Button href="#products" size="lg">
              Scopri i prodotti
              <Icon
                name="arrow"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
            <Button href="#how" size="lg" variant="secondary">
              Guarda come funziona
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
