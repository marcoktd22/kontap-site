import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  className,
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  /** "light" for light surfaces, "dark" for dark island sections */
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 " +
          "text-xs font-medium uppercase tracking-[0.18em] ring-hairline",
        tone === "dark"
          ? "bg-white/[0.05] text-white/70 ring-hairline-invert"
          : "bg-surface text-secondary",
        className
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          tone === "dark"
            ? "bg-celeste shadow-[0_0_10px_2px_rgba(88,200,255,0.65)]"
            : "bg-primary shadow-[0_0_10px_1px_rgba(36,83,255,0.4)]"
        )}
      />
      {children}
    </span>
  );
}
