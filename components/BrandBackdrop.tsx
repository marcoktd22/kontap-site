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

function Why() {
  return (
    <>
      {/* near-invisible technical grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,24,40,0.03) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(16,24,40,0.03) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          WebkitMaskImage: "radial-gradient(ellipse 82% 72% at 50% 32%, #000 30%, transparent 82%)",
          maskImage: "radial-gradient(ellipse 82% 72% at 50% 32%, #000 30%, transparent 82%)",
        }}
      />
      <Light className="right-[3%] top-[-8%] h-[46vh] w-[46vh] blur-[6px]" color="rgba(88,200,255,0.13)" />
      {/* small geometric recalls of the mark, cropped in the corners */}
      <Mark size={120} color={BLUE} opacity={0.06} className="right-[5%] top-[11%]" />
      <Mark size={78} color={CYAN} opacity={0.06} className="left-[3%] bottom-[9%]" />
    </>
  );
}

function How() {
  return (
    <>
      <Light
        className="left-1/2 top-[52%] h-[86vh] w-[86vh] -translate-x-1/2 -translate-y-1/2"
        color="rgba(88,200,255,0.16)"
        style={{ background: "radial-gradient(circle, rgba(88,200,255,0.16) 0%, rgba(255,255,255,0) 60%)" }}
      />
      {/* static concentric rings — depth, crisp vectors */}
      <svg
        className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2"
        style={{ maxWidth: "none" }}
        width="1180"
        height="1180"
        viewBox="0 0 1180 1180"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="590" cy="590" r="130" stroke="rgba(36,83,255,0.12)" strokeWidth="1.4" />
        <circle cx="590" cy="590" r="230" stroke="rgba(36,83,255,0.10)" strokeWidth="1.4" />
        <circle cx="590" cy="590" r="345" stroke="rgba(36,83,255,0.08)" strokeWidth="1.4" />
        <circle cx="590" cy="590" r="470" stroke="rgba(36,83,255,0.06)" strokeWidth="1.4" />
        <circle cx="590" cy="590" r="560" stroke="rgba(88,200,255,0.05)" strokeWidth="1.4" />
      </svg>
      {/* live ripples — the tap emitting motion */}
      <div className="absolute left-1/2 top-[52%]">
        {[0, 2, 4].map((delay) => (
          <span
            key={delay}
            className="absolute left-0 top-0 -ml-[150px] -mt-[150px] h-[300px] w-[300px] rounded-full border-[1.5px] border-[color:rgba(88,200,255,0.4)] motion-safe:animate-[kontap-ripple_6s_ease-out_infinite]"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </div>
      {/* the tap point */}
      <Mark size={112} color={BLUE} opacity={0.1} className="left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2" />
    </>
  );
}

function Products() {
  return (
    <>
      <div
        className="absolute left-1/2 top-[-2%] h-[46vh] w-[70vw] -translate-x-1/2 blur-[4px]"
        style={{ background: "radial-gradient(closest-side, rgba(88,200,255,0.10), transparent)", borderRadius: "50%" }}
      />
      {/* a single large mark cropped far off the corner — lets the products breathe */}
      <Mark
        size="min(42vw, 560px)"
        color={BLUE}
        opacity={0.04}
        className="-bottom-[20%] -right-[8%]"
        style={{ transform: "rotate(8deg)" }}
      />
    </>
  );
}

function Plus() {
  return (
    <>
      {/* data / intelligence constellation — hub sits behind the dashboard,
          connections radiate out into the open space (Stripe-Radar, not Tron) */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 820"
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
      </svg>
      {/* the intelligence hub = the mark, glowing at the centre of the graph */}
      <div className="absolute left-[72.2%] top-[47.8%] h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-[-60%] rounded-full" style={{ background: "radial-gradient(circle, rgba(88,200,255,0.28), transparent 70%)" }} />
        <KontapMark className="relative h-full w-full" style={{ color: BLUE, opacity: 0.9 }} />
      </div>
    </>
  );
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
  why: Why,
  how: How,
  products: Products,
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
