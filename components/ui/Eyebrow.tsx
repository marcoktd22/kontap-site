import { cn } from "@/lib/cn";

/**
 * Section identifier — a refined uppercase kicker with a short brand-gradient
 * rule. No pill, no dot: a quiet, premium marker that belongs to Kontap.
 */
export function Eyebrow({
  children,
  className,
  align = "center",
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "center" | "left";
  /** "light" for light surfaces, "dark" for dark/gradient sections */
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex flex-col gap-2.5",
        align === "center" ? "items-center" : "items-start",
        className
      )}
    >
      <span
        className={cn(
          "text-[0.7rem] font-semibold uppercase tracking-[0.3em]",
          tone === "dark" ? "text-white/80" : "text-gradient-accent"
        )}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "h-[2px] w-8 rounded-full",
          tone === "dark"
            ? "bg-white/50"
            : "bg-[linear-gradient(90deg,#2453ff,#58c8ff)]"
        )}
      />
    </span>
  );
}
