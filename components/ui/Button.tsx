import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "invert";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary " +
  "disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white shadow-[0_8px_30px_-8px_rgba(10,54,246,0.5)] " +
    "hover:bg-hover hover:shadow-[0_12px_44px_-8px_rgba(29,77,255,0.6)] hover:-translate-y-0.5 " +
    "active:translate-y-0",
  secondary:
    "bg-ink/[0.04] text-ink ring-hairline " +
    "hover:bg-ink/[0.07] hover:-translate-y-0.5 active:translate-y-0",
  ghost:
    "text-secondary hover:text-ink bg-transparent hover:bg-ink/[0.04]",
  // For use on DARK island sections
  invert:
    "bg-white/[0.08] text-white ring-hairline-invert backdrop-blur-md " +
    "hover:bg-white/[0.14] hover:-translate-y-0.5 active:translate-y-0",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-[3.25rem] px-7 text-base",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </a>
  );
}
