import { LogoMark } from "./Logo";
import { cn } from "@/lib/cn";

/**
 * Hero product object: a Kontap NFC card at a slight 3D tilt, emitting
 * concentric "tap" ripples from the aperture mark. A dark premium card
 * floating on the light hero — high contrast, Apple-style. Pure CSS motion.
 */
export function HeroVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn("relative mx-auto w-full max-w-lg", className)}
      style={{ perspective: "1400px" }}
      aria-hidden="true"
    >
      {/* Glow pad under the card */}
      <div className="absolute left-1/2 top-1/2 h-64 w-[28rem] max-w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[90px]" />

      <div
        className="relative"
        style={{
          transformStyle: "preserve-3d",
          animation: "kontap-float 7s ease-in-out infinite",
          ["--tilt" as string]: "0deg",
        }}
      >
        <div
          className="relative aspect-[1.585/1] w-full overflow-hidden rounded-[1.75rem] ring-hairline-invert"
          style={{
            transform: "rotateX(14deg) rotateY(-16deg)",
            background:
              "linear-gradient(145deg, #12205e 0%, #0a1240 55%, #05081a 100%)",
            boxShadow:
              "0 1px 0 0 rgba(255,255,255,0.08) inset, 0 40px 90px -34px rgba(7,11,26,0.55), 0 0 60px -24px rgba(10,54,246,0.5)",
          }}
        >
          {/* Diagonal sheen */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 32%, rgba(255,255,255,0) 70%, rgba(118,223,255,0.08) 100%)",
            }}
          />

          {/* Top row: brand */}
          <div className="absolute left-6 top-6 flex items-center gap-2 text-white sm:left-7 sm:top-7">
            <LogoMark className="h-6 w-6 text-white/90" />
            <span className="text-sm font-semibold tracking-tight">kontap</span>
          </div>

          {/* Contactless glyph + ripples, top-right tap point */}
          <div className="absolute right-6 top-6 sm:right-7 sm:top-7">
            <div className="relative flex h-10 w-10 items-center justify-center">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="absolute inset-0 rounded-full ring-1 ring-celeste/50"
                  style={{
                    animation: "kontap-ripple 2.6s ease-out infinite",
                    animationDelay: `${i * 0.65}s`,
                  }}
                />
              ))}
              <span className="h-2 w-2 rounded-full bg-celeste shadow-[0_0_12px_3px_rgba(118,223,255,0.7)]" />
            </div>
          </div>

          {/* Engraved chip */}
          <div className="absolute bottom-6 left-6 sm:bottom-7 sm:left-7">
            <div className="h-8 w-11 rounded-md bg-gradient-to-br from-celeste/30 to-primary/20 ring-1 ring-white/10" />
          </div>

          {/* Mono label */}
          <div className="absolute bottom-6 right-6 text-right sm:bottom-7 sm:right-7">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-white/40">
              Tap to connect
            </p>
            <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-white/60">
              NFC · Kontap
            </p>
          </div>
        </div>

        {/* Floating "result" chip — the digital experience that opens */}
        <div
          className="absolute -right-4 bottom-2 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 ring-hairline sm:-right-8"
          style={{
            transform: "translateZ(60px)",
            boxShadow: "0 20px 50px -20px rgba(7,11,26,0.35)",
          }}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 12 4.5 4.5L19 7" />
            </svg>
          </span>
          <div className="pr-1">
            <p className="text-xs font-medium text-ink">Opened instantly</p>
            <p className="text-[0.65rem] text-muted">No app required</p>
          </div>
        </div>
      </div>
    </div>
  );
}
