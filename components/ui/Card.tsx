import { cn } from "@/lib/cn";

/**
 * Clean light surface card. Depth comes from a soft shadow and a hairline
 * ring, not heavy borders. `interactive` adds a hover lift + brand glow.
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
        "relative overflow-hidden rounded-3xl bg-surface p-8 ring-hairline",
        "shadow-[var(--shadow-card)]",
        interactive &&
          "transition-all duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:ring-1 hover:ring-[color:var(--color-line-strong)] hover:shadow-[0_28px_70px_-34px_rgba(36,83,255,0.28)]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
