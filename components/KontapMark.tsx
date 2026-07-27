import { cn } from "@/lib/cn";

/**
 * The Kontap aperture mark, rebuilt as pure vector (crisp at any size / 4K /
 * Retina, fully tintable). Faithful to the brand mark: a broken four-blade
 * aperture ring, a solid centre and the satellite dot. Fills with currentColor
 * so each placement can be tinted (Kontap blue, azure or white) and set to any
 * opacity. Never distorted — only scaled, rotated, cropped, blurred or faded.
 */
export function KontapMark({
  className,
  style,
  title,
}: {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      className={cn("block", className)}
      style={style}
    >
      {title ? <title>{title}</title> : null}
      <path d="M56.15 3.91A46.5 46.5 0 0 0 4.26 41.61L20.49 44.58A30.0 30.0 0 0 1 53.97 20.26Z" />
      <path d="M3.58 52.76A46.5 46.5 0 0 0 23.73 88.37L33.05 74.75A30.0 30.0 0 0 1 20.05 51.78Z" />
      <path d="M35.94 94.32A46.5 46.5 0 0 0 70.82 91.58L63.43 76.82A30.0 30.0 0 0 1 40.93 78.60Z" />
      <path d="M82.53 83.22A46.5 46.5 0 0 0 95.98 43.05L79.66 45.51A30.0 30.0 0 0 1 70.99 71.43Z" />
      <circle cx="50" cy="50" r="13.5" />
      <circle cx="76" cy="23" r="9.5" />
    </svg>
  );
}
