import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { BrandBackdrop } from "../BrandBackdrop";
import { Plate3D } from "../Plate3D";

/** Settori tipici dei clienti Kontap, con icona lineare nel blu #0b67cc. */
const SECTORS: { label: string; icon: React.ReactNode }[] = [
  {
    label: "Parrucchieri ed estetica",
    icon: (
      <>
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" />
      </>
    ),
  },
  {
    label: "Studi medici e farmacie",
    icon: (
      <>
        <path d="M11 2v2M5 2v2" />
        <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
        <path d="M8 15a6 6 0 0 0 12 0v-3" />
        <circle cx="20" cy="10" r="2" />
      </>
    ),
  },
  {
    label: "B&B e case vacanze",
    icon: (
      <>
        <path d="M3 11 12 4l9 7" />
        <path d="M5 9.5V20h14V9.5" />
        <circle cx="10" cy="15" r="2" />
        <path d="M12 15h4.5M15 15v1.8" />
      </>
    ),
  },
  {
    label: "Ristoranti e bar",
    icon: (
      <>
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
        <path d="M7 2v20" />
        <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
      </>
    ),
  },
  {
    label: "Negozi",
    icon: (
      <>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </>
    ),
  },
  {
    label: "Palestre e fitness",
    icon: (
      <>
        <path d="M14.4 14.4 9.6 9.6" />
        <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
        <path d="m21.5 21.5-1.4-1.4M3.9 3.9 2.5 2.5" />
        <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
      </>
    ),
  },
];

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
          <p className="mt-6 max-w-md text-pretty text-[0.95rem] leading-relaxed text-[#475569] sm:text-lg">
            La targa NFC che porta i tuoi clienti a lasciarti una recensione
            Google <span className="font-semibold text-[#0649aa]">con un solo tap</span>. Niente
            app, niente attese.
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

        {/* Settori per cui è pensata */}
        <Reveal index={5} className="mt-12 w-full sm:mt-14">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#475569]/80">
            Pensata per
          </p>
          <ul className="mx-auto mt-5 grid max-w-3xl grid-cols-3 gap-x-2 gap-y-5 sm:grid-cols-6 sm:gap-x-4">
            {SECTORS.map((sector) => (
              <li key={sector.label} className="flex flex-col items-center gap-2">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-[0_10px_20px_-10px_rgba(11,103,204,0.55),inset_0_1px_0_rgba(255,255,255,0.45)] ring-1 ring-inset ring-white/30 sm:h-12 sm:w-12"
                  style={{ background: "linear-gradient(160deg, #8fc6f8 0%, #62aaf1 50%, #4494e8 100%)" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-[22px] w-[22px] drop-shadow-[0_1px_1px_rgba(11,85,193,0.25)]"
                  >
                    {sector.icon}
                  </svg>
                </span>
                <span className="text-balance text-[0.72rem] font-medium leading-tight text-[#475569] sm:text-[0.78rem]">
                  {sector.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
