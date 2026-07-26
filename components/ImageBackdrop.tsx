import { cn } from "@/lib/cn";

/**
 * Full-bleed brand background image for a section.
 * The image is part of Kontap's visual language — never a texture inside a card.
 * It sits behind the content (‑z‑10), full width, and blends into the scroll via
 * a very light fade at the top/bottom edges so consecutive sections read as one
 * continuous experience. The composition, colours and depth of the image are
 * preserved — no filters, no desaturation, no flattening.
 */
export function ImageBackdrop({
  src,
  position = "center",
  size = "cover",
  fadeTop = true,
  fadeBottom = true,
  className,
}: {
  src: string;
  /** background-position — anchor the subject so it stays readable */
  position?: string;
  /** background-size — "cover" or e.g. "100% auto" per section */
  size?: string;
  fadeTop?: boolean;
  fadeBottom?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        className
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: size,
          backgroundPosition: position,
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Edge blend — only the extreme top/bottom, so the scroll feels seamless
          without touching the luminous core of the image. */}
      {fadeTop && (
        <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,#fcfdff,rgba(252,253,255,0))]" />
      )}
      {fadeBottom && (
        <div className="absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(0deg,#fcfdff,rgba(252,253,255,0))]" />
      )}
    </div>
  );
}
