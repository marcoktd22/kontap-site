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
            className="absolute left-1/2 top-[-18%] h-[70vh] w-[90vw] -translate-x-1/2 opacity-70 blur-[40px]"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, rgba(10,54,246,0.14) 0%, rgba(63,183,255,0.10) 38%, rgba(255,255,255,0) 70%)",
            }}
          />
          {/* Celeste highlight, upper right */}
          <div
            className="absolute right-[-6%] top-[-8%] h-[42vh] w-[42vh] rounded-full opacity-60 blur-[80px]"
            style={{
              background:
                "radial-gradient(circle, rgba(118,223,255,0.35) 0%, rgba(118,223,255,0) 70%)",
            }}
          />
          {/* Blue highlight, lower left */}
          <div
            className="absolute left-[-8%] bottom-[-15%] h-[40vh] w-[40vh] rounded-full opacity-40 blur-[90px]"
            style={{
              background:
                "radial-gradient(circle, rgba(10,54,246,0.18) 0%, rgba(10,54,246,0) 70%)",
            }}
          />
        </>
      )}
      {variant === "cta" && (
        <div
          className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 opacity-90"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, #1747ff 0%, #0a1f9c 38%, #05081a 74%)",
          }}
        />
      )}
      {variant === "soft" && (
        <div
          className="absolute left-1/2 top-0 h-[55vh] w-[70vw] -translate-x-1/2 opacity-60 blur-[50px]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(63,183,255,0.12) 0%, rgba(10,54,246,0.08) 40%, rgba(255,255,255,0) 72%)",
          }}
        />
      )}
    </div>
  );
}
