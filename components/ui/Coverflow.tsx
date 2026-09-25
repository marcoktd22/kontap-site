"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Coverflow 3D in loop (stile visionOS): la card attiva al centro, le vicine
 * ruotate in prospettiva ai lati. Swipe/trascinamento, frecce, tastiera e
 * tap sulla card laterale per portarla al centro. Le card stanno tutte nella
 * stessa cella di griglia: l'altezza è quella della card più alta, senza
 * misure in JS.
 */
export function Coverflow({
  children,
  label,
  initial = 0,
  tone = "light",
  cardClassName = "w-[min(100vw_-_5rem,19rem)] sm:w-[21rem]",
  className,
}: {
  children: React.ReactNode;
  label: string;
  initial?: number;
  /** "dark" per sezioni scure (frecce e indicatori chiari) */
  tone?: "light" | "dark";
  cardClassName?: string;
  className?: string;
}) {
  const items = Children.toArray(children);
  const n = items.length;
  const [active, setActive] = useState(initial);
  const go = useCallback((dir: number) => setActive((a) => (a + dir + n) % n), [n]);

  // Swipe / drag orizzontale (lo scroll verticale resta libero)
  const start = useRef<{ x: number; y: number } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = start.current;
    start.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - s.y)) go(dx < 0 ? 1 : -1);
  };

  // Tastiera quando il carosello ha il focus
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [go]);

  const dark = tone === "dark";

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={cn("relative", className)}
    >
      <div
        className="relative grid touch-pan-y select-none justify-items-center [perspective:1400px]"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (start.current = null)}
      >
        {items.map((child, i) => {
          // distanza circolare dalla card attiva: -1 sinistra, 0 centro, 1 destra
          let d = i - active;
          if (d > n / 2) d -= n;
          if (d < -n / 2) d += n;
          const abs = Math.abs(d);
          const isActive = d === 0;
          return (
            <div
              key={i}
              aria-roledescription="slide"
              aria-label={`${i + 1} di ${n}`}
              inert={!isActive}
              className={cn(
                "relative [grid-area:1/1] transition-[transform,opacity,filter] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
                cardClassName
              )}
              style={{
                transform: `translateX(${d * 64}%) translateZ(${-abs * 140}px) rotateY(${-d * 34}deg) scale(${1 - abs * 0.06})`,
                opacity: abs > 1 ? 0 : 1,
                filter: isActive ? "none" : "brightness(0.82) saturate(0.9)",
                zIndex: 10 - abs,
              }}
            >
              {child}
              {/* Card laterale: un tap la porta al centro */}
              {!isActive && abs === 1 && (
                <button
                  type="button"
                  tabIndex={-1}
                  aria-hidden="true"
                  onClick={() => go(d)}
                  className="absolute inset-0 z-20 cursor-pointer rounded-[1.75rem]"
                />
              )}
            </div>
          );
        })}

        {/* Frecce a metà card, sul bordo della card attiva, sopra tutto */}
        <div className={cn("pointer-events-none relative z-30 [grid-area:1/1]", cardClassName)}>
          <Arrow dir={-1} dark={dark} onClick={() => go(-1)} className="left-0 -translate-x-1/2" />
          <Arrow dir={1} dark={dark} onClick={() => go(1)} className="right-0 translate-x-1/2" />
        </div>
      </div>

      {/* Indicatori */}
      <div className="relative z-20 mt-6 flex items-center justify-center">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {items.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active
                  ? cn("w-6", dark ? "bg-white" : "bg-brand-gradient")
                  : cn("w-1.5", dark ? "bg-white/30" : "bg-[color:var(--color-line-strong)]")
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Freccia in vetro 3D, trasparente: galleggia sul bordo della card attiva. */
function Arrow({
  dir,
  dark,
  onClick,
  className,
}: {
  dir: 1 | -1;
  dark: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 1 ? "Successivo" : "Precedente"}
      className={cn(
        "pointer-events-auto absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full backdrop-blur-xl transition-[transform,background-color] duration-200 active:scale-90",
        dark
          ? "bg-white/15 text-white ring-1 ring-white/40 shadow-[0_14px_30px_-10px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_-3px_8px_rgba(0,0,0,0.2)] hover:bg-white/25"
          : "bg-white/45 text-[#0b67cc] ring-1 ring-white/80 shadow-[0_14px_30px_-10px_rgba(11,103,204,0.55),inset_0_1px_1px_rgba(255,255,255,1),inset_0_-3px_8px_rgba(11,103,204,0.18)] hover:bg-white/65",
        className
      )}
    >
      {/* riflesso del vetro */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-1.5 top-0.5 h-1/2 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(255,255,255,0))] opacity-70" />
      <svg viewBox="0 0 24 24" fill="none" className={cn("relative h-4 w-4", dir === -1 && "rotate-180")} aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
