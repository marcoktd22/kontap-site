import { cn } from "@/lib/cn";
import type { Feature } from "@/lib/content";

type Name = Feature["icon"];

/**
 * Custom Kontap badge glyphs — bold, solid white, thick strokes, optically
 * centred. Built for the gradient circle, not a generic icon pack.
 */
const glyphs: Record<Name, React.ReactNode> = {
  // NFC / Tap — contactless waves emanating from a point
  signal: (
    <>
      <circle cx="5.2" cy="12" r="1.7" fill="#fff" />
      <g stroke="#fff" strokeWidth="2.3" strokeLinecap="round" fill="none">
        <path d="M8.6 9.2a4.2 4.2 0 0 1 0 5.6" />
        <path d="M12 6.6a8 8 0 0 1 0 10.8" />
        <path d="M15.4 4a11.8 11.8 0 0 1 0 16" />
      </g>
    </>
  ),
  // Layers / Platform — filled top plate + stacked planes
  layers: (
    <>
      <path fill="#fff" d="M12 2.8 21 7.4 12 12 3 7.4z" />
      <g stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M3.6 12 12 16.2 20.4 12" />
        <path d="M3.6 16.2 12 20.4 20.4 16.2" />
      </g>
    </>
  ),
  // Shield — solid white shield with a knocked-out check (gradient shows through)
  shield: (
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M12 2.1 4.3 5v6.1c0 4.9 3.3 8 7.7 9.1 4.4-1.1 7.7-4.2 7.7-9.1V5L12 2.1Zm4 6.5 1.5 1.6-6 5.9-3.5-3.5 1.6-1.6 1.9 1.9 4.5-4.3Z"
    />
  ),
  // Refresh — two bold arcs with arrowheads
  refresh: (
    <g stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M18.4 8.2A7.2 7.2 0 0 0 5.2 10.4" />
      <path d="M18.9 4.6v3.9h-3.9" />
      <path d="M5.6 15.8A7.2 7.2 0 0 0 18.8 13.6" />
      <path d="M5.1 19.4v-3.9H9" />
    </g>
  ),
  // Lightning — solid filled bolt
  bolt: (
    <path fill="#fff" d="M13.6 2.2 5.6 13.1a.6.6 0 0 0 .49.95H10l-1.1 7.2a.5.5 0 0 0 .9.37l7.9-10.86a.6.6 0 0 0-.49-.95H13.4l1.06-6.9a.5.5 0 0 0-.86-.4Z" />
  ),
  // Analytics — bold bars + baseline
  chart: (
    <g stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M4 20V5" />
      <path d="M4 20h16" />
      <path d="M8.5 20v-4.5M13 20V9M17.5 20v-7.5" />
    </g>
  ),
};

export function BadgeIcon({
  name,
  className,
}: {
  name: Name;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={cn("h-[26px] w-[26px]", className)}>
      {glyphs[name]}
    </svg>
  );
}
