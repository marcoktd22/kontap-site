import { cn } from "@/lib/cn";

/**
 * Official Kontap wordmark (real supplied SVG). Two colour variants:
 * `variant="dark"` renders the black wordmark for light backgrounds,
 * `variant="light"` renders the white wordmark for dark backgrounds.
 * This is the only approved logo lockup — do not substitute a redrawn mark.
 */
export function Logo({
  className,
  variant = "dark",
}: {
  className?: string;
  /** "dark" black wordmark · "light" white wordmark · "plus" white kontap+ lockup */
  variant?: "dark" | "light" | "plus";
}) {
  const src =
    variant === "plus"
      ? "/brand/kontap-plus-light.svg"
      : variant === "light"
        ? "/brand/kontap-wordmark-light.svg"
        : "/brand/kontap-wordmark-dark.svg";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Kontap"
      className={cn("block h-7 w-auto select-none", className)}
    />
  );
}
