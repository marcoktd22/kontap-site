import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/**
 * Ambient lighting system — the site's depth engine.
 * Layers per section: breathing/drifting light blobs + abstract NFC concentric
 * waves (never the literal logo) + optional technical grid / vignette.
 * Each section gets its own composition and light source, yet all belong to one
 * coherent language. Motion is barely perceptible.
 */

type Variant =
  | "hero"
  | "why"
  | "how"
  | "products"
  | "plus"
  | "cta"
  | "faq"
  | "footer";

type Blob = {
  size: number | string;
  style: CSSProperties;
  bg: string;
  o: number;
  drift?: boolean;
};
type Waves = { size: number; style: CSSProperties; color: string; o: number };

type Comp = {
  blobs: Blob[];
  waves?: Waves[];
  grid?: boolean;
  vignette?: boolean;
};

const BLUE = "rgba(36,83,255,";
const CYAN = "rgba(88,200,255,";

const COMPS: Record<Variant, Comp> = {
  // Glowing mesh — saturated cyan above, deep blue below, drifting.
  hero: {
    blobs: [
      { size: "62vh", style: { top: "-14%", left: "8%" }, bg: `${CYAN}0.5)`, o: 0.75, drift: true },
      { size: "56vh", style: { top: "-8%", right: "2%" }, bg: `${BLUE}0.42)`, o: 0.6, drift: true },
      { size: "50vh", style: { bottom: "-24%", left: "26%" }, bg: `${CYAN}0.32)`, o: 0.5, drift: true },
    ],
    waves: [{ size: 1180, style: { top: "-24%", left: "-24%" }, color: "#2453ff", o: 0.06 }],
    vignette: true,
  },
  // Technical grid + central light.
  why: {
    blobs: [
      { size: "52vh", style: { top: "-10%", left: "50%", transform: "translateX(-50%)" }, bg: `${CYAN}0.34)`, o: 0.6, drift: true },
      { size: "40vh", style: { bottom: "-16%", right: "4%" }, bg: `${BLUE}0.26)`, o: 0.45 },
    ],
    waves: [{ size: 820, style: { top: "-22%", right: "-14%" }, color: "#2453ff", o: 0.05 }],
    grid: true,
  },
  // Stronger blue ambient light from the top.
  how: {
    blobs: [
      { size: "58vh", style: { top: "-18%", left: "50%", transform: "translateX(-50%)" }, bg: `${CYAN}0.45)`, o: 0.7, drift: true },
      { size: "42vh", style: { bottom: "-18%", left: "6%" }, bg: `${BLUE}0.3)`, o: 0.5 },
    ],
    waves: [{ size: 900, style: { bottom: "-30%", left: "-16%" }, color: "#2453ff", o: 0.05 }],
  },
  // Diagonal lighting + reflections.
  products: {
    blobs: [
      { size: "50vh", style: { top: "-8%", left: "-6%" }, bg: `${CYAN}0.36)`, o: 0.6, drift: true },
      { size: "46vh", style: { bottom: "-18%", right: "-6%" }, bg: `${BLUE}0.26)`, o: 0.45, drift: true },
    ],
    waves: [{ size: 980, style: { top: "-16%", left: "-22%" }, color: "#2453ff", o: 0.05 }],
  },
  // Darker, premium atmosphere behind the dashboard.
  plus: {
    blobs: [
      { size: "54vh", style: { top: "-12%", right: "-10%" }, bg: `${BLUE}0.4)`, o: 0.6, drift: true },
      { size: "40vh", style: { bottom: "-20%", left: "0%" }, bg: `${CYAN}0.28)`, o: 0.45 },
    ],
    waves: [{ size: 1120, style: { top: "-26%", right: "-24%" }, color: "#2453ff", o: 0.055 }],
  },
  // Bright, minimal, elegant.
  faq: {
    blobs: [
      { size: "44vh", style: { top: "6%", left: "-8%" }, bg: `${CYAN}0.3)`, o: 0.55, drift: true },
      { size: "34vh", style: { bottom: "-10%", right: "-4%" }, bg: `${BLUE}0.2)`, o: 0.4 },
    ],
    waves: [{ size: 720, style: { top: "-10%", left: "-16%" }, color: "#2453ff", o: 0.045 }],
  },
  // Continuation of the CTA gradient — white light on blue.
  footer: {
    blobs: [
      { size: "40vh", style: { bottom: "-24%", right: "6%" }, bg: `${CYAN}0.22)`, o: 0.5 },
    ],
    waves: [{ size: 640, style: { bottom: "-40%", right: "-8%" }, color: "#2453ff", o: 0.04 }],
  },
  // Emitted light on the luminous gradient — white waves + moving highlight.
  cta: {
    blobs: [
      { size: "60vh", style: { top: "-24%", left: "8%" }, bg: "rgba(255,255,255,0.32)", o: 0.7, drift: true },
      { size: "48vh", style: { bottom: "-26%", right: "6%" }, bg: `${CYAN}0.5)`, o: 0.6, drift: true },
    ],
    waves: [
      { size: 1200, style: { top: "-30%", left: "50%", transform: "translateX(-50%)" }, color: "#ffffff", o: 0.12 },
    ],
    vignette: false,
  },
};

function Blobs({ blobs }: { blobs: Blob[] }) {
  return (
    <>
      {blobs.map((b, i) => (
        <div
          key={i}
          className={cn("absolute", b.drift && "animate-drift")}
          style={{ ...b.style, width: b.size, height: b.size }}
        >
          <div
            className="animate-breathe h-full w-full rounded-full blur-[80px]"
            style={
              {
                background: `radial-gradient(circle, ${b.bg} 0%, transparent 70%)`,
                ["--breathe-o" as string]: b.o,
              } as CSSProperties
            }
          />
        </div>
      ))}
    </>
  );
}

/** Abstract NFC concentric waves — communicates invisible signal, not the logo. */
function NfcWaves({ waves }: { waves?: Waves[] }) {
  if (!waves) return null;
  return (
    <>
      {waves.map((w, i) => (
        <div
          key={i}
          className="absolute"
          style={{ ...w.style, width: w.size, height: w.size, opacity: w.o }}
        >
          <svg
            viewBox="0 0 100 100"
            fill="none"
            className="h-full w-full"
            style={{
              maskImage: "radial-gradient(circle, #000 52%, transparent 78%)",
              WebkitMaskImage: "radial-gradient(circle, #000 52%, transparent 78%)",
            }}
          >
            {[14, 23, 32, 41, 49].map((r) => (
              <circle key={r} cx="50" cy="50" r={r} stroke={w.color} strokeWidth="0.4" />
            ))}
          </svg>
        </div>
      ))}
    </>
  );
}

export function BrandBackdrop({
  variant,
  className,
}: {
  variant: Variant;
  className?: string;
}) {
  const c = COMPS[variant];
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      {c.grid && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(16,24,40,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(16,24,40,0.028) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
            maskImage: "radial-gradient(ellipse 72% 62% at 50% 30%, #000 32%, transparent 84%)",
            WebkitMaskImage: "radial-gradient(ellipse 72% 62% at 50% 30%, #000 32%, transparent 84%)",
          }}
        />
      )}
      <Blobs blobs={c.blobs} />
      <NfcWaves waves={c.waves} />
      {c.vignette && (
        <div
          className="absolute inset-0"
          style={{
            boxShadow: "inset 0 0 140px 40px rgba(252,253,255,0.9)",
          }}
        />
      )}
    </div>
  );
}
