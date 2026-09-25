import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { BrandBackdrop } from "../BrandBackdrop";
import { Plate3D } from "../Plate3D";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-16 pt-28 sm:pb-28 sm:pt-44 md:pb-32 md:pt-48"
    >
      <BrandBackdrop variant="hero" />

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

        {/* Il prodotto, subito — targa 3D girevole */}
        <Reveal index={2}>
          <Plate3D className="mx-auto mt-9 w-[165px] sm:mt-10" />
          <p className="mt-9 flex items-center justify-center gap-1.5 text-xs font-medium text-muted">
            <Icon name="refresh" className="h-3.5 w-3.5" />
            Trascina per ruotarla
          </p>
        </Reveal>

        <Reveal index={3}>
          <p className="mt-6 max-w-md text-pretty text-base font-normal leading-relaxed text-[#0b67cc] sm:text-xl">
            La targa NFC che porta i tuoi clienti a lasciarti una recensione
            Google con un solo tap. Niente app, niente attese.
          </p>
        </Reveal>

        <Reveal index={4}>
          <div className="mt-9 flex w-full items-center justify-center gap-3">
            <Button
              href="/prezzi"
              size="lg"
              variant="solid"
              className="flex-1 px-5 sm:flex-none sm:px-7"
            >
              Prodotti
              <Icon
                name="arrow"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
            <Button href="/come-funziona" size="lg" variant="secondary" className="flex-1 px-5 sm:flex-none sm:px-7">
              Come funziona
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
