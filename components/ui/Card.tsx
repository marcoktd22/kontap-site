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
        "relative overflow-hidden rounded-3xl bg-white p-8 ring-hairline",
        "shadow-[0_1px_2px_rgba(16,24,40,0.04),0_4px_10px_-4px_rgba(16,24,40,0.06),0_28px_56px_-30px_rgba(36,83,255,0.16),inset_0_1px_0_0_rgba(255,255,255,0.9)]",
        interactive &&
          "transition-all duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:ring-1 hover:ring-[color:rgba(88,200,255,0.5)] hover:shadow-[0_1px_2px_rgba(16,24,40,0.05),0_6px_14px_-4px_rgba(16,24,40,0.08),0_40px_80px_-34px_rgba(36,83,255,0.3),inset_0_1px_0_0_rgba(255,255,255,0.95)]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
