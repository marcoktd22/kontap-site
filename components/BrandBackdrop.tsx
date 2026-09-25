import type { CSSProperties } from "react";
import { KontapMark } from "./KontapMark";
import { cn } from "@/lib/cn";

/**
 * Kontap background design system — one vector language, a different atmosphere
 * per section. The brand aperture mark is the recurring hero of every
 * composition (scaled, cropped, blurred, faded — never distorted). Everything
 * is SVG / CSS gradients so it stays razor-sharp on 4K & Retina, with soft,
 * glassy light and a lot of negative space. No bitmaps.
 */

const BLUE = "#2453ff";
const CYAN = "#58c8ff";

type Variant =
  | "hero"
  | "why"
  | "how"
  | "products"
  | "plus"
  | "cta"
  | "faq"
  | "footer";

/** A soft, blurred radial light blob. */
function Light({
  className,
  color,
  style,
}: {
  className?: string;
  color: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn("absolute rounded-full", className)}
      style={{ background: `radial-gradient(circle, ${color}, transparent 70%)`, ...style }}
    />
  );
}

/** Centred mark (uses negative-margin centring so scale animations are free). */
function Mark({
  size,
  color,
  opacity,
  blur,
  className,
  style,
}: {
  size: number | string;
  color: string;
  opacity: number;
  blur?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <KontapMark
      className={cn("absolute", className)}
      style={{
        width: size,
        height: size,
        color,
        opacity,
        filter: blur ? `blur(${blur}px)` : undefined,
        ...style,
      }}
    />
  );
}

function Hero() {
  return (
    <>
      <Light
        className="left-1/2 top-[34%] h-[112vh] w-[112vh] max-h-[1180px] max-w-[1180px] -translate-x-1/2 -translate-y-1/2"
        color="rgba(255,255,255,0.9)"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 58%)" }}
      />
      {/* huge blurred halo of the mark */}
      <Mark
        size="min(112vh, 1060px)"
        color={CYAN}
        opacity={0.05}
        blur={28}
        className="left-1/2 top-[43%] -translate-x-1/2 -translate-y-1/2"
      />
      {/* the icon itself, oversized and soft */}
      <Mark
        size="min(80vh, 760px)"
        color={BLUE}
        opacity={0.06}
        className="left-1/2 top-[43%] -translate-x-1/2 -translate-y-1/2 motion-safe:animate-[kontap-float_18s_ease-in-out_infinite]"
      />
    </>
  );
}

/**
 * Classic technical background (#17 look) — only the grid (from the section's
 * `grid-faint` utility) plus one soft blue glow. No Kontap symbol, no circles,
 * no decorative elements. Shared by "Hardware di cui fidarti" and "Una linea.
 * Una piattaforma." so they read as the same visual family.
 */
function GridTech() {
  return (
    <Light
      className="right-[6%] top-[-4%] h-[42vh] w-[42vh] opacity-60 blur-[90px]"
      color="rgba(36,83,255,0.16)"
    />
  );
}

/**
 * Come funziona — sfondo "abstract geometric gradient": il gradiente Kontap
 * (cobalto brillante in alto a sinistra → blu medio → navy profondo a destra,
 * glow ciano in basso a sinistra) con grandi pannelli geometrici traslucidi,
 * ruotati, sovrapposti e sfocati. Solo CSS, nessuna immagine.
 */
const HOW_PANELS: {
  pos: CSSProperties;
  rotate: number;
  blur: number;
  opacity: number;
  bg: string;
  radius: string;
}[] = [
  // grande pannello chiaro in alto a sinistra
  { pos: { left: "-10%", top: "-16%", width: "60%", height: "68%" }, rotate: -14, blur: 34, opacity: 0.15, bg: "linear-gradient(160deg, #6aaaf5, #1f6fe0)", radius: "5%" },
  // lastra verticale centrale, blu medio più chiaro
  { pos: { left: "32%", top: "6%", width: "26%", height: "112%" }, rotate: 9, blur: 30, opacity: 0.12, bg: "linear-gradient(180deg, #4d8fec, #0a3f9e)", radius: "3%" },
  // pannello navy a destra, più scuro
  { pos: { right: "-12%", top: "-8%", width: "50%", height: "78%" }, rotate: -7, blur: 44, opacity: 0.15, bg: "linear-gradient(200deg, #000418, #030b30)", radius: "5%" },
  // quadrilatero basso a sinistra, ciano desaturato
  { pos: { left: "-6%", bottom: "-20%", width: "56%", height: "54%" }, rotate: 12, blur: 40, opacity: 0.13, bg: "linear-gradient(120deg, #2a9ad8, #0b5fb0)", radius: "5%" },
  // lastra sottile diagonale, chiara
  { pos: { left: "50%", top: "40%", width: "40%", height: "30%" }, rotate: -20, blur: 30, opacity: 0.1, bg: "linear-gradient(90deg, #8bbaf7, #3f86ea)", radius: "3%" },
  // pannello scuro in basso a destra
  { pos: { right: "-4%", bottom: "-14%", width: "44%", height: "48%" }, rotate: 16, blur: 40, opacity: 0.14, bg: "linear-gradient(140deg, #020b30, #000312)", radius: "4%" },
  // velo desaturato che attraversa il centro
  { pos: { left: "8%", top: "46%", width: "48%", height: "34%" }, rotate: -6, blur: 50, opacity: 0.07, bg: "linear-gradient(100deg, #9fb8e0, #5b7fc0)", radius: "4%" },
];

function How() {
  return (
    <>
      {/* gradiente di base (palette Kontap) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 60% at 8% 100%, rgba(2,110,184,0.75), transparent 70%)," +
            "radial-gradient(60% 55% at 0% 0%, rgba(2,76,186,0.95), transparent 70%)," +
            "linear-gradient(100deg, #0247b0 0%, #033a92 28%, #032c70 52%, #05194b 76%, #070f33 100%)",
        }}
      />
      {/* pannelli geometrici traslucidi immersi nel gradiente */}
      {HOW_PANELS.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            ...p.pos,
            transform: `rotate(${p.rotate}deg)`,
            filter: `blur(${p.blur}px)`,
            opacity: p.opacity,
            background: p.bg,
            borderRadius: p.radius,
          }}
        />
      ))}
    </>
  );
}


/**
 * Costellazione "intelligenza" di Kontap Plus — rete di nodi con l'hub (il
 * marchio) al centro. `viewBox` permette di inquadrarla diversamente (es. su
 * mobile dietro al grafico) senza cambiarne il disegno.
 */
export function PlusNetwork({
  viewBox = "0 0 1440 820",
  className,
  glowId = "plus-hub-glow",
}: {
  viewBox?: string;
  className?: string;
  glowId?: string;
}) {
  return (
    <>
      {/* data / intelligence constellation — hub sits behind the dashboard,
          connections radiate out into the open space (Stripe-Radar, not Tron) */}
      <svg
        className={cn(
          "absolute inset-0 h-full w-full [&_ellipse]:[vector-effect:non-scaling-stroke] [&_line]:[vector-effect:non-scaling-stroke] [&_path]:[vector-effect:non-scaling-stroke]",
          className
        )}
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <g stroke="rgba(36,83,255,0.16)" strokeWidth="1">
          <line x1="1040" y1="392" x2="860" y2="255" />
          <line x1="1040" y1="392" x2="1250" y2="300" />
          <line x1="1040" y1="392" x2="1300" y2="470" />
          <line x1="1040" y1="392" x2="900" y2="560" />
          <line x1="1040" y1="392" x2="1080" y2="150" />
          <line x1="1040" y1="392" x2="840" y2="420" />
          <line x1="860" y1="255" x2="700" y2="200" />
          <line x1="1250" y1="300" x2="1360" y2="220" />
          <line x1="1300" y1="470" x2="1385" y2="640" />
          <line x1="900" y1="560" x2="760" y2="650" />
          <line x1="840" y1="420" x2="620" y2="440" />
          <line x1="1080" y1="150" x2="1200" y2="90" />
          <line x1="1250" y1="300" x2="1250" y2="560" />
        </g>
        <g stroke="rgba(88,200,255,0.32)" strokeWidth="1.2">
          <line x1="1040" y1="392" x2="1250" y2="300" />
          <line x1="1040" y1="392" x2="900" y2="560" />
        </g>
        <ellipse cx="1040" cy="392" rx="250" ry="250" stroke="rgba(36,83,255,0.10)" strokeWidth="1" />
        <ellipse cx="1040" cy="392" rx="372" ry="300" stroke="rgba(36,83,255,0.07)" strokeWidth="1" transform="rotate(-18 1040 392)" />
        {/* node halos */}
        <g fill="rgba(88,200,255,0.16)">
          <circle cx="1250" cy="300" r="12" />
          <circle cx="900" cy="560" r="11" />
          <circle cx="1080" cy="150" r="10" />
        </g>
        {/* primary nodes */}
        <g fill={BLUE}>
          <circle cx="860" cy="255" r="4.5" />
          <circle cx="1250" cy="300" r="5" />
          <circle cx="1300" cy="470" r="4" />
          <circle cx="900" cy="560" r="4.5" />
          <circle cx="1080" cy="150" r="4" />
          <circle cx="840" cy="420" r="4" />
          <circle cx="1250" cy="560" r="3.5" />
        </g>
        {/* secondary nodes */}
        <g fill={CYAN}>
          <circle cx="700" cy="200" r="3.5" />
          <circle cx="1360" cy="220" r="3.5" />
          <circle cx="1385" cy="640" r="3.5" />
          <circle cx="760" cy="650" r="3.5" />
          <circle cx="620" cy="440" r="3" />
          <circle cx="1200" cy="90" r="3" />
        </g>
        {/* abstract analytics curve */}
        <path
          d="M120 740 L240 700 L340 710 L450 655 L560 665 L670 600 L780 618"
          stroke="rgba(36,83,255,0.16)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g fill={BLUE}>
          <circle cx="450" cy="655" r="3" />
          <circle cx="670" cy="600" r="3" />
        </g>
        {/* the intelligence hub = the mark, glowing at the centre of the graph */}
        <defs>
          <radialGradient id={glowId}>
            <stop offset="0%" stopColor="rgba(88,200,255,0.28)" />
            <stop offset="100%" stopColor="rgba(88,200,255,0)" />
          </radialGradient>
        </defs>
        <circle cx="1040" cy="392" r="78" fill={`url(#${glowId})`} />
        <KontapMark x={1005} y={357} width={70} height={70} style={{ color: BLUE, opacity: 0.9 }} />
      </svg>
    </>
  );
}

function Plus() {
  return <PlusNetwork />;
}

function Cta() {
  return (
    <>
      {/* huge logo in transparency — the poster */}
      <Mark
        size="min(120%, 1180px)"
        color="#ffffff"
        opacity={0.1}
        className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <Light className="left-[14%] top-[6%] h-[520px] w-[520px] blur-[8px]" color="rgba(255,255,255,0.5)" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.5), transparent 65%)" }} />
      <Light className="right-[8%] bottom-[4%] h-[440px] w-[440px] blur-[10px]" color="rgba(255,255,255,0.28)" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.28), transparent 68%)" }} />
    </>
  );
}

function Faq() {
  return (
    <>
      <Light className="left-[-8%] top-[20%] h-[520px] w-[520px] blur-[8px]" color="rgba(88,200,255,0.14)" />
      {/* a quiet fragment of the mark, cropped off the right edge */}
      <Mark size={340} color={CYAN} opacity={0.05} className="-right-[6%] top-[8%]" style={{ transform: "rotate(-6deg)" }} />
    </>
  );
}

function Footer() {
  return (
    <Mark size={420} color={BLUE} opacity={0.045} className="-right-[4%] -bottom-[40%]" style={{ transform: "rotate(6deg)" }} />
  );
}

const COMPOSITIONS: Record<Variant, () => React.ReactNode> = {
  hero: Hero,
  why: GridTech,
  how: How,
  products: GridTech,
  plus: Plus,
  cta: Cta,
  faq: Faq,
  footer: Footer,
};

export function BrandBackdrop({
  variant,
  className,
}: {
  variant: Variant;
  className?: string;
}) {
  const Composition = COMPOSITIONS[variant];
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden", className)}
    >
      <Composition />
    </div>
  );
}
