"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Carosello mobile-first: su smartphone le card stanno sulla stessa riga,
 * una al centro e le vicine che si intravedono; si scorre con lo swipe o con
 * le frecce (in loop: dall'ultima si torna alla prima). Da tablet in su
 * diventa una griglia a 3 colonne, senza frecce.
 */

export function Carousel({
  children,
  label,
  initial = 0,
  className,
}: {
  children: React.ReactNode;
  label: string;
  /** card centrata all'apertura (es. quella consigliata) */
  initial?: number;
  className?: string;
}) {
  const items = Children.toArray(children);
  const n = items.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(initial);

  const scrollToIndex = useCallback((i: number, smooth = true) => {
    const track = trackRef.current;
    const el = track?.children[i] as HTMLElement | undefined;
    if (!track || !el) return;
    track.scrollTo({
      left: el.offsetLeft - (track.clientWidth - el.clientWidth) / 2,
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

  // Apertura sulla card iniziale (solo quando è davvero un carosello)
  useEffect(() => {
    const track = trackRef.current;
    if (track && track.scrollWidth > track.clientWidth + 1) scrollToIndex(initial, false);
  }, [initial, scrollToIndex]);

  // Card attiva = la più vicina al centro
  const raf = useRef(0);
  const onScroll = () => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track) return;
      const center = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(track.children).forEach((c, i) => {
        const el = c as HTMLElement;
        const d = Math.abs(el.offsetLeft + el.clientWidth / 2 - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
    });
  };

  const go = (dir: 1 | -1) => scrollToIndex((active + dir + n) % n);

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className={className}>
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="relative -mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 pt-5 [scrollbar-width:none] sm:-mx-8 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden px-[calc((100vw_-_min(100vw_-_6rem,20rem))/2)]"
      >
        {items.map((child, i) => (
          <div key={i} className="w-[min(100vw_-_6rem,20rem)] shrink-0 snap-center md:w-auto">
            {child}
          </div>
        ))}
      </div>

      {/* Frecce + indicatori (solo mobile) */}
      <div className="mt-4 flex items-center justify-center gap-5 md:hidden">
        <ArrowButton dir={-1} onClick={() => go(-1)} />
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {items.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active ? "bg-brand-gradient w-6" : "w-1.5 bg-[color:var(--color-line-strong)]"
              )}
            />
          ))}
        </div>
        <ArrowButton dir={1} onClick={() => go(1)} />
      </div>
    </div>
  );
}

function ArrowButton({ dir, onClick }: { dir: 1 | -1; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 1 ? "Successivo" : "Precedente"}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-[0_6px_16px_-8px_rgba(36,83,255,0.45)] ring-hairline transition-all duration-200 active:scale-95"
    >
      <svg viewBox="0 0 24 24" fill="none" className={cn("h-4 w-4", dir === -1 && "rotate-180")} aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
