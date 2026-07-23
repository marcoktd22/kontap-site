import { cn } from "@/lib/cn";

/**
 * Kontap aperture mark — the brand's radial "tap" symbol used in place of
 * the "o". Faithful vector of the supplied logo mark, drawn with
 * currentColor so it inherits the surrounding text colour (black on light
 * surfaces, white on dark ones). Used for small inline / decorative marks.
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
 * Official Kontap wordmark (real supplied SVG). Two colour variants:
 * `variant="dark"` renders the black wordmark for light backgrounds,
 * `variant="light"` renders the white wordmark for dark backgrounds.
 */
export function Logo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const src =
    variant === "light"
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
