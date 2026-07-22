import { cn } from "@/lib/cn";

/**
 * Kontap aperture mark — the brand's radial "tap" symbol used in place of
 * the "o". Drawn with currentColor so it inherits white on dark surfaces
 * and black on light ones (matching the two supplied logo variants).
 */
export function LogoMark({
  className,
  title = "Kontap",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label={title}
      className={cn("block", className)}
      fill="none"
    >
      <g
        stroke="currentColor"
        strokeWidth={11}
        strokeLinecap="round"
        fill="none"
      >
        <path d="M 81.95 38.37 A 34 34 0 0 1 81.95 61.63" />
        <path d="M 76.04 71.86 A 34 34 0 0 1 55.90 83.48" />
        <path d="M 44.10 83.48 A 34 34 0 0 1 23.96 71.86" />
        <path d="M 18.05 61.63 A 34 34 0 0 1 18.05 38.37" />
        <path d="M 23.96 28.14 A 34 34 0 0 1 44.10 16.52" />
        <path d="M 55.90 16.52 A 34 34 0 0 1 76.04 28.14" />
      </g>
      <circle cx="50" cy="50" r="9" fill="currentColor" />
    </svg>
  );
}

/**
 * Full wordmark: k + aperture mark + ntap.
 * The wordmark is set in the site typeface so the logo and headings read as
 * one type system; the aperture mark carries the brand recognition.
 */
export function Logo({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex select-none items-center font-semibold tracking-tight text-white",
        className
      )}
    >
      <span aria-hidden="true">k</span>
      <LogoMark
        className={cn("mx-[0.01em] h-[0.82em] w-[0.82em]", markClassName)}
        title=""
      />
      <span aria-hidden="true">ntap</span>
      <span className="sr-only">Kontap</span>
    </span>
  );
}
