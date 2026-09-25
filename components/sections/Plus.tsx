import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { CheckBadge } from "../ui/CheckBadge";
import { Logo } from "../Logo";
import { BrandBackdrop, PlusNetwork } from "../BrandBackdrop";
import { PlusHorizon } from "../PlusHorizon";
import { ScaleToFit } from "../ScaleToFit";
import { whatsappHref } from "@/lib/content";
import { cn } from "@/lib/cn";

/** Servizi Plus, dal più interessante al meno. */
const services = [
  "AI-Powered Optimization",
  "Analisi Competitor Di Settore",
  "Ottimizzazione SEO, GEO e AEO",
  "Reports del Tuo Business",
];

/** Colore d'apertura della sezione: la cupola e il fondo partono da qui. */
const PLUS_TOP = "#dfe9ff";
/** Il fondo parte appena sotto la cupola di PlusHorizon (altezza 64/96/120px). */
const HORIZON_TOP = "top-[62px] sm:top-[94px] lg:top-[118px]";

/**
 * Kontap+ — grafico e servizi. Con `horizon` sorge dall'orizzonte di luce
 * (quando segue la Hero); senza, apre la pagina Kontap+.
 */
export function Plus({ horizon = false }: { horizon?: boolean }) {
  return (
    <section
      id="plus"
      className={cn(
        "relative scroll-mt-24 pb-20 sm:pb-32 md:pb-40",
        horizon ? "pt-28 sm:pt-40 md:pt-48" : "pt-32 sm:pt-44"
      )}
    >
      {/* Transizione premium dalla Hero: orizzonte di luce */}
      {horizon && <PlusHorizon fill={PLUS_TOP} />}

      {/* Fondo della sezione, sotto la cupola */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden",
          horizon ? HORIZON_TOP : "top-0"
        )}
        style={{
          background: `linear-gradient(180deg, ${PLUS_TOP} 0%, #edf3ff 38%, #f6f9ff 100%)`,
        }}
      >
        {/* Rete "intelligenza" — composizione desktop */}
        <BrandBackdrop variant="plus" className="hidden lg:block" />
      </div>

      <Container className="relative">
        <div className="grid grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] gap-x-4 gap-y-10 [grid-template-areas:'head_head'_'list_dash'_'cta_cta'] sm:gap-x-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-16 lg:gap-y-10 lg:[grid-template-areas:'head_dash'_'list_dash'_'cta_dash']">
          {/* Titolo */}
          <div className="min-w-0 [grid-area:head]">
            <Reveal>
              <Eyebrow align="left">Abbonamento · Kontap Plus</Eyebrow>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 text-balance text-4xl font-semibold sm:text-5xl">
                <span className="text-gradient">Ogni tap diventa </span>
                <span className="text-gradient-accent">intelligenza.</span>
              </h2>
            </Reveal>
            <Reveal index={2}>
              <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-muted sm:mt-6 sm:text-lg">
                L’abbonamento che fa lavorare la tua attività anche online:
                l’intelligenza artificiale analizza, ottimizza e ti dice cosa fare
                dopo.
              </p>
            </Reveal>
          </div>

          {/* Mobile: stessa impostazione del desktop, sotto lo stesso sfondo */}
          <div
            aria-hidden="true"
            className="pointer-events-none relative -mx-6 -my-10 [grid-column:1/-1] [grid-row:2] sm:-mx-8 lg:hidden"
          >
            <PlusNetwork viewBox="520 70 760 660" glowId="plus-hub-glow-m" />
          </div>

          {/* Servizi */}
          <ul className="relative flex flex-col justify-center gap-5 [grid-area:list] sm:gap-6 lg:justify-start">
            {services.map((s, i) => (
              <Reveal as="li" key={s} index={i} className="flex items-center gap-2.5 sm:gap-4">
                <CheckBadge className="h-[22px] w-[23px] sm:h-8 sm:w-[33px]" />
                <span className="text-[0.84rem] font-medium leading-snug text-ink sm:text-xl">
                  {s}
                </span>
              </Reveal>
            ))}
          </ul>

          {/* Grafico */}
          <Reveal index={1} className="relative self-center [grid-area:dash]">
            <ScaleToFit width={440}>
              <DashboardMock />
            </ScaleToFit>
          </Reveal>

          {/* CTA */}
          <Reveal index={2} className="[grid-area:cta]">
            <Button
              href={whatsappHref("Ciao Kontap, vorrei entrare nella waitlist di Kontap Plus.")}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="w-full sm:w-auto"
            >
              Entra nella waitlist
              <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function DashboardMock() {
  const stats = [
    { label: "Tap oggi", value: "2.841", delta: "+18%" },
    { label: "Conversione", value: "63%", delta: "+6%" },
    { label: "Nuove recensioni", value: "126", delta: "+24%" },
  ];

  return (
    <div className="relative">
      {/* Bagliore ambientale */}
      <div className="absolute -inset-8 -z-10 rounded-[2.4rem] bg-[radial-gradient(circle_at_50%_35%,rgba(36,83,255,0.35),transparent_70%)] blur-2xl" />

      <div className="relative overflow-hidden rounded-3xl bg-[color:var(--color-panel)]/85 text-white shadow-[0_50px_110px_-45px_rgba(9,17,33,0.85),inset_0_1px_0_0_rgba(255,255,255,0.09)] ring-hairline-invert backdrop-blur-2xl">
        {/* Riflesso vetro in alto */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]"
        />
        {/* Barra finestra */}
        <div className="relative flex items-center justify-center border-b border-white/[0.08] px-5 py-3.5">
          <Logo variant="plus" className="h-4 w-auto" />
          <div className="absolute right-5 top-1/2 flex -translate-y-1/2 items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </div>
        </div>

        <div className="p-5">
          {/* Statistiche */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/[0.03] p-3.5 ring-hairline-invert">
                <p className="text-[0.65rem] uppercase tracking-wider text-white/50">
                  {s.label}
                </p>
                <p className="mt-1.5 text-xl font-semibold text-white">{s.value}</p>
                <p className="mt-1 text-[0.65rem] font-medium text-celeste">{s.delta}</p>
              </div>
            ))}
          </div>

          {/* Grafico */}
          <div className="mt-3 rounded-2xl bg-white/[0.02] p-4 ring-hairline-invert">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-white">Tap · ultimi 30 giorni</p>
              <span className="rounded-full bg-primary/20 px-2.5 py-1 text-[0.65rem] font-medium text-celeste">
                Live
              </span>
            </div>
            <Sparkline />
          </div>

          {/* Insight AI */}
          <div className="mt-3 flex items-start gap-3 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent p-4 ring-hairline-invert">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-celeste/15 text-celeste">
              <Icon name="signal" className="h-4 w-4" />
            </span>
            <p className="text-[0.8rem] leading-relaxed text-white/70">
              <span className="font-medium text-white">Insight AI · </span>
              I tap raggiungono il picco tra le 19 e le 21 nel weekend. Sposta la
              targa recensioni vicino all’uscita per catturare il 20% di
              scansioni in più.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sparkline() {
  // Area chart morbido, tinta brand. SVG statico — decorativo.
  return (
    <svg viewBox="0 0 320 88" className="mt-3 w-full" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="plus-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2453ff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#2453ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="plus-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2453ff" />
          <stop offset="100%" stopColor="#58c8ff" />
        </linearGradient>
      </defs>
      <path
        d="M0 66 C 26 60, 40 44, 66 46 S 108 66, 132 54 S 176 22, 200 30 S 250 60, 276 40 S 308 20, 320 16 L320 88 L0 88 Z"
        fill="url(#plus-fill)"
      />
      <path
        d="M0 66 C 26 60, 40 44, 66 46 S 108 66, 132 54 S 176 22, 200 30 S 250 60, 276 40 S 308 20, 320 16"
        stroke="url(#plus-stroke)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="320" cy="16" r="3.5" fill="#58c8ff" />
    </svg>
  );
}
