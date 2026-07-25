import { cn } from "@/lib/cn";

/**
 * The Kontap symbol (aperture mark) as a pure vector — fills with currentColor
 * so it can be tinted per section. This is the brand's recurring graphic
 * element: used oversized, cropped and almost invisible as background artwork.
 */
export function KontapSymbol({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={cn("block", className)}
    >
      <g stroke="currentColor" strokeWidth={11} strokeLinecap="round" fill="none">
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
