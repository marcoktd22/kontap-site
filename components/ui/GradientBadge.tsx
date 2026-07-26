import { cn } from "@/lib/cn";

/**
 * The one circular badge for the whole site — a premium illuminated button.
 * Perfect circle, Kontap gradient, layered shadow + inner highlight + top gloss.
 * Holds either a Roman numeral (How it works) or a custom icon (Why Kontap):
 * both share exactly the same shell so every badge reads as one system.
 */
export function GradientBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "bg-brand-gradient relative flex h-14 w-14 items-center justify-center rounded-full text-white",
        "shadow-[0_12px_26px_-10px_rgba(36,83,255,0.6),inset_0_1px_0_0_rgba(255,255,255,0.45)]",
        className
      )}
    >
      {/* Top gloss — the illuminated-button highlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0)_55%)]"
      />
      <span className="relative flex items-center justify-center leading-none">
        {children}
      </span>
    </span>
  );
}
