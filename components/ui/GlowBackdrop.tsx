import { cn } from "@/lib/cn";

/**
 * Ambient lighting layer. Renders the brand radial gradient as soft glow
 * behind a section — light, never a loud background. Always decorative.
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
          {/* Primary brand radial — matches the supplied gradient recipe */}
          <div
            className="absolute left-1/2 top-[-10%] h-[80vh] w-[120vw] -translate-x-1/2 opacity-70 blur-[10px]"
            style={{
              background:
                "radial-gradient(ellipse at 28% 55%, #0A36F6 0%, #001580 42%, rgba(0,5,27,0) 72%)",
            }}
          />
          {/* Accent cool highlight, upper right */}
          <div
            className="absolute right-[-10%] top-[-20%] h-[50vh] w-[50vh] rounded-full opacity-30 blur-[80px]"
            style={{
              background:
                "radial-gradient(circle, rgba(118,223,255,0.5) 0%, rgba(118,223,255,0) 70%)",
            }}
          />
        </>
      )}
      {variant === "cta" && (
        <div
          className="absolute left-1/2 top-1/2 h-[120%] w-[130%] -translate-x-1/2 -translate-y-1/2 opacity-80"
          style={{
            background:
              "radial-gradient(ellipse at 50% 60%, #0A36F6 0%, #001580 40%, rgba(0,5,27,0) 70%)",
          }}
        />
      )}
      {variant === "soft" && (
        <div
          className="absolute left-1/2 top-0 h-[60vh] w-[80vw] -translate-x-1/2 opacity-40 blur-[40px]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(10,54,246,0.35) 0%, rgba(0,5,27,0) 70%)",
          }}
        />
      )}
    </div>
  );
}
