import type { CSSProperties } from "react";
import { KontapSymbol } from "./KontapSymbol";
import { cn } from "@/lib/cn";

/**
 * Kontap background system — the brand's visual DNA.
 * Layers, from back to front:
 *   1. (section gradient, provided by the section itself)
 *   2. oversized Kontap symbol(s) at 2–5% opacity, cropped by the viewport
 *   3. one soft radial light source (blue/cyan, diffused)
 * Content sits above. Every section gets a unique composition so nothing
 * repeats, yet everything belongs to the same language.
 */

type Variant =
  | "hero"
  | "why"
  | "how"
  | "products"
  | "plus"
  | "cta"
  | "footer";

type Sym = {
  size: number;
  style: CSSProperties;
  opacity: number;
  tone?: "blue" | "white";
  blur?: number;
};

const SYMBOLS: Record<Variant, Sym[]> = {
  // Large icon cropped on the left
  hero: [{ size: 1180, style: { top: "-22%", left: "-26%", transform: "rotate(-8deg)" }, opacity: 0.03, blur: 3 }],
  // Icon entering from the top-right
  why: [{ size: 900, style: { top: "-28%", right: "-16%", transform: "rotate(7deg)" }, opacity: 0.028, blur: 3 }],
  // Large cropped icon bottom-left
  how: [{ size: 1000, style: { bottom: "-36%", left: "-22%", transform: "rotate(-6deg)" }, opacity: 0.026, blur: 3 }],
  // Two oversized icons overlapping with different opacity
  products: [
    { size: 1040, style: { top: "-18%", left: "-24%", transform: "rotate(-6deg)" }, opacity: 0.032, blur: 3 },
    { size: 780, style: { bottom: "-24%", right: "-14%", transform: "rotate(9deg)" }, opacity: 0.02, blur: 3 },
  ],
  // Huge icon behind the dashboard
  plus: [{ size: 1240, style: { top: "-30%", right: "-26%", transform: "rotate(4deg)" }, opacity: 0.034, blur: 3 }],
  // Largest and softest composition, tinted white on the luminous gradient
  cta: [{ size: 1520, style: { top: "-32%", left: "50%", transform: "translateX(-50%) rotate(0deg)" }, opacity: 0.08, tone: "white", blur: 6 }],
  // Very subtle partial icon
  footer: [{ size: 680, style: { bottom: "-44%", right: "-10%", transform: "rotate(6deg)" }, opacity: 0.022, blur: 3 }],
};

/** One diffused light source per section. */
function Light({ variant }: { variant: Variant }) {
  const base = "pointer-events-none absolute rounded-full blur-[90px]";
  switch (variant) {
    case "hero":
      return <div className={cn(base, "left-[8%] top-[-6%] h-[46vh] w-[46vh] opacity-70")} style={{ background: "radial-gradient(circle,rgba(88,200,255,0.28),transparent 70%)" }} />;
    case "why":
      return <div className={cn(base, "right-[6%] top-[-4%] h-[42vh] w-[42vh] opacity-60")} style={{ background: "radial-gradient(circle,rgba(36,83,255,0.16),transparent 70%)" }} />;
    case "how":
      return <div className={cn(base, "bottom-[-8%] left-[10%] h-[42vh] w-[42vh] opacity-55")} style={{ background: "radial-gradient(circle,rgba(88,200,255,0.2),transparent 70%)" }} />;
    case "products":
      return <div className={cn(base, "left-[-6%] top-[12%] h-[48vh] w-[48vh] opacity-70")} style={{ background: "radial-gradient(circle,rgba(88,200,255,0.24),transparent 70%)" }} />;
    case "plus":
      return <div className={cn(base, "right-[-4%] top-[6%] h-[46vh] w-[46vh] opacity-60")} style={{ background: "radial-gradient(circle,rgba(36,83,255,0.16),transparent 70%)" }} />;
    case "cta":
      return <div className={cn(base, "left-1/2 top-[-10%] h-[60vh] w-[60vh] -translate-x-1/2 opacity-70")} style={{ background: "radial-gradient(circle,rgba(255,255,255,0.35),transparent 70%)" }} />;
    case "footer":
      return <div className={cn(base, "right-[6%] bottom-[-10%] h-[34vh] w-[34vh] opacity-50")} style={{ background: "radial-gradient(circle,rgba(88,200,255,0.16),transparent 70%)" }} />;
  }
}

export function BrandBackdrop({
  variant,
  className,
}: {
  variant: Variant;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <Light variant={variant} />
      {SYMBOLS[variant].map((s, i) => (
        <div
          key={i}
          className={cn(
            "absolute",
            s.tone === "white" ? "text-white" : "text-primary"
          )}
          style={{
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            filter: s.blur ? `blur(${s.blur}px)` : undefined,
            ...s.style,
          }}
        >
          <KontapSymbol className="h-full w-full" />
        </div>
      ))}
    </div>
  );
}
