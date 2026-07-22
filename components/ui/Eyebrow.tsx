import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-white/[0.03] px-3 py-1 " +
          "text-xs font-medium uppercase tracking-[0.18em] text-muted ring-hairline",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(118,223,255,0.6)]" />
      {children}
    </span>
  );
}
