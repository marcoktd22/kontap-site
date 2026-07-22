import { cn } from "@/lib/cn";

/**
 * Glass surface card. Subtle by default — depth comes from lighting and a
 * hairline ring, not heavy borders. `interactive` adds a hover lift + glow.
 */
export function Card({
  className,
  children,
  interactive = false,
  as: Tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  interactive?: boolean;
  as?: React.ElementType;
}) {
  return (
    <Tag
      className={cn(
        "relative overflow-hidden rounded-3xl bg-surface/60 p-8 ring-hairline backdrop-blur-xl",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_24px_60px_-30px_rgba(0,0,0,0.9)]",
        interactive &&
          "transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:bg-surface-2/50 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset,0_40px_80px_-30px_rgba(10,54,246,0.35)]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
