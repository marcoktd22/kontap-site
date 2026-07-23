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
        "shadow-[0_1px_2px_0_rgba(7,11,26,0.04),0_24px_60px_-38px_rgba(7,11,26,0.25)]",
        interactive &&
          "transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:bg-white hover:shadow-[0_1px_2px_0_rgba(7,11,26,0.06),0_40px_80px_-34px_rgba(10,54,246,0.22)]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
