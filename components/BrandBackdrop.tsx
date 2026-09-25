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

function How() {
  // Sfondo premium: anelli nel gradiente Kontap, anelli tecnici tratteggiati
  // che ruotano piano in versi opposti, due punti in orbita e le onde del tap.
  // Nessuna filigrana del marchio.
  const C = "left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2";
  return (
    <>
      {/* bagliore centrale nel blu del brand */}
      <div
        className={`absolute ${C} h-[80vh] w-[80vh] rounded-full`}
        style={{ background: "radial-gradient(circle, rgba(13,118,235,0.12) 0%, rgba(11,85,193,0.05) 35%, rgba(255,255,255,0) 65%)" }}
      />

      {/* anelli statici con tratto a gradiente */}
      <svg className={`absolute ${C}`} style={{ maxWidth: "none" }} width="1180" height="1180" viewBox="0 0 1180 1180" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="how-ring" x1="0" y1="0" x2="1180" y2="1180" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#0d76eb" />
            <stop offset="0.55" stopColor="#0b55c1" />
            <stop offset="1" stopColor="#0d43a1" />
          </linearGradient>
        </defs>
        <circle cx="590" cy="590" r="140" stroke="url(#how-ring)" strokeOpacity="0.22" strokeWidth="1.2" />
        <circle cx="590" cy="590" r="250" stroke="url(#how-ring)" strokeOpacity="0.16" strokeWidth="1.2" />
        <circle cx="590" cy="590" r="370" stroke="url(#how-ring)" strokeOpacity="0.11" strokeWidth="1.2" />
        <circle cx="590" cy="590" r="490" stroke="url(#how-ring)" strokeOpacity="0.07" strokeWidth="1.2" />
      </svg>

      {/* anelli tecnici tratteggiati, rotazione lenta in versi opposti */}
      <svg className={`absolute ${C} motion-safe:animate-[spin_90s_linear_infinite]`} style={{ maxWidth: "none" }} width="640" height="640" viewBox="0 0 640 640" fill="none" aria-hidden="true">
        <circle cx="320" cy="320" r="310" stroke="#0d76eb" strokeOpacity="0.28" strokeWidth="1.5" strokeDasharray="2 10" />
        <path d="M320 10a310 310 0 0 1 219 91" stroke="#0d76eb" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <svg className={`absolute ${C} motion-safe:animate-[spin_120s_linear_infinite_reverse]`} style={{ maxWidth: "none" }} width="880" height="880" viewBox="0 0 880 880" fill="none" aria-hidden="true">
        <circle cx="440" cy="440" r="430" stroke="#0b55c1" strokeOpacity="0.16" strokeWidth="1.2" strokeDasharray="24 14 4 14" />
        <path d="M10 440a430 430 0 0 1 126-304" stroke="#0b55c1" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
      </svg>

      {/* punti luminosi in orbita */}
      <div className={`absolute ${C} h-[500px] w-[500px] motion-safe:animate-[spin_26s_linear_infinite]`}>
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0d76eb] shadow-[0_0_14px_4px_rgba(13,118,235,0.45)]" />
      </div>
      <div className={`absolute ${C} h-[740px] w-[740px] motion-safe:animate-[spin_40s_linear_infinite_reverse]`}>
        <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#0b55c1] shadow-[0_0_12px_3px_rgba(11,85,193,0.4)]" />
      </div>

      {/* onde del tap nel blu Kontap */}
      <div className="absolute left-1/2 top-[52%]">
        {[0, 2, 4].map((delay) => (
          <span
            key={delay}
            className="absolute left-0 top-0 -ml-[150px] -mt-[150px] h-[300px] w-[300px] rounded-full border-[1.5px] border-[#0d76eb]/35 shadow-[0_0_24px_rgba(13,118,235,0.12)_inset] motion-safe:animate-[kontap-ripple_6s_ease-out_infinite]"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </div>

      {/* nucleo luminoso al centro, al posto della filigrana */}
      <div className={`absolute ${C} h-40 w-40 rounded-full`} style={{ background: "radial-gradient(circle, rgba(13,118,235,0.18), rgba(13,118,235,0) 70%)" }} />
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
