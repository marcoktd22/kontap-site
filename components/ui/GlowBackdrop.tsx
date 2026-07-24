import { cn } from "@/lib/cn";

/**
 * Ambient lighting layer. Soft brand-tinted gradients that add depth without
 * noise. `hero`/`soft` are tuned for LIGHT surfaces; `cta` is a saturated
 * radial for DARK island sections.
 */
export function GlowBackdrop({
  className,
  variant = "hero",
}: {
  className?: string;
  variant?: "hero" | "cta" | "soft";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      {variant === "hero" && (
        <>
          {/* Soft brand wash, upper area */}
          <div
            className="absolute left-1/2 top-[-18%] h-[70vh] w-[90vw] -translate-x-1/2 opacity-80 blur-[40px]"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, rgba(36,83,255,0.12) 0%, rgba(88,200,255,0.1) 38%, rgba(252,253,255,0) 70%)",
            }}
          />
          {/* Secondary-blue highlight, upper right */}
          <div
            className="absolute right-[-6%] top-[-8%] h-[42vh] w-[42vh] rounded-full opacity-60 blur-[80px]"
            style={{
              background:
                "radial-gradient(circle, rgba(88,200,255,0.35) 0%, rgba(88,200,255,0) 70%)",
            }}
          />
          {/* Primary highlight, lower left */}
          <div
            className="absolute left-[-8%] bottom-[-15%] h-[40vh] w-[40vh] rounded-full opacity-40 blur-[90px]"
            style={{
              background:
                "radial-gradient(circle, rgba(36,83,255,0.16) 0%, rgba(36,83,255,0) 70%)",
            }}
          />
        </>
      )}
      {variant === "cta" && (
        <div
          className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 opacity-90"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, #2f5bff 0%, #12225e 42%, #050811 76%)",
          }}
        />
      )}
      {variant === "soft" && (
        <div
          className="absolute left-1/2 top-0 h-[55vh] w-[70vw] -translate-x-1/2 opacity-60 blur-[50px]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(88,200,255,0.12) 0%, rgba(36,83,255,0.08) 40%, rgba(252,253,255,0) 72%)",
          }}
        />
      )}
    </div>
  );
}
