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
                filter: isActive ? "none" : dark ? "brightness(0.55) saturate(0.85)" : "brightness(0.82) saturate(0.9)",
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
          <Arrow dir={-1} dark={dark} onClick={() => go(-1)} className="left-0 -translate-x-full" />
          <Arrow dir={1} dark={dark} onClick={() => go(1)} className="right-0 translate-x-full" />
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

/** Freccia del brand (chevron + triangolo), vettoriale. */
const CHEVRON = "M13.5 560.1C8.7 557.9 5.6 554.7 3.5 549.8C1.3 544.4 1.3 493.2 3.5 484.5C5.7 476.0 9.6 468.7 14.6 463.8C17.0 461.4 68.8 422.1 129.7 376.5C190.6 330.9 241.2 292.4 242.2 291.0C246.0 285.8 245.8 276.5 241.7 271.9C240.5 270.5 222.4 256.6 201.5 241.0C69.7 142.5 17.1 102.8 13.8 99.4C9.3 94.6 5.7 87.5 3.6 79.4C2.3 74.5 2.0 67.6 2.0 45.4C2.0 20.5 2.2 17.1 3.9 13.5C7.5 5.5 16.2 0.9 23.8 3.0C25.8 3.5 32.2 7.5 38.0 11.9C48.9 20.1 183.4 120.6 307.1 213.2C346.5 242.6 379.8 268.2 381.2 270.1C385.5 275.8 386.5 280.9 384.6 286.8C383.6 289.6 381.9 293.1 380.8 294.5C379.7 296.0 360.0 311.2 337.1 328.3C314.2 345.4 268.9 379.2 236.5 403.5C204.1 427.8 144.2 472.6 103.5 503.0C62.8 533.5 27.9 559.2 26.0 560.2C21.7 562.5 18.6 562.4 13.5 560.1ZM14.7 359.5C9.7 357.8 6.2 354.5 3.9 349.5C2.2 345.7 2.0 341.6 2.0 281.7C2.0 220.2 2.1 217.8 4.0 214.1C8.3 205.5 17.8 201.2 25.2 204.3C27.2 205.1 47.5 219.8 70.3 236.8C100.1 259.1 112.4 268.9 114.1 271.7C115.9 274.6 116.5 276.9 116.5 281.6C116.5 292.4 117.1 291.9 70.5 326.8C47.4 344.2 26.9 359.0 25.0 359.6C20.6 361.2 19.4 361.2 14.7 359.5Z";

/**
 * Freccia 3D senza contorni: il glifo del brand con un'estrusione a strati
 * (effetto rilievo) e ombra morbida. Bianca sui fondi scuri, nera su quelli
 * chiari. A riposo "spinge" piano nella sua direzione; al passaggio si
 * inclina in prospettiva e si ingrandisce; al tap si comprime.
 */
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
        "group/arrow pointer-events-auto absolute top-1/2 -translate-y-1/2 p-1 [perspective:300px] focus-visible:outline-none sm:p-1.5",
        className
      )}
    >
      <span
        className={cn(
          "block motion-safe:animate-[kontap-nudge_2.6s_ease-in-out_infinite]",
          dir === -1 && "[animation-direction:reverse]"
        )}
        style={{ ["--nudge" as string]: `${dir * 4}px` }}
      >
        <svg
          viewBox="0 0 388 564"
          aria-hidden="true"
          className={cn(
            "block h-8 w-auto transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/arrow:scale-110 group-active/arrow:scale-90 sm:h-10",
            dir === 1
              ? "group-hover/arrow:[transform:rotateY(-22deg)_scale(1.1)]"
              : "-scale-x-100 group-hover/arrow:[transform:scaleX(-1)_rotateY(-22deg)_scale(1.1)]"
          )}
          style={{
            filter: dark
              ? "drop-shadow(1px 1px 0 #0b67cc) drop-shadow(1px 1px 0 #0a55b0) drop-shadow(1px 1px 0 #0a4596) drop-shadow(0 10px 14px rgba(0,8,30,0.55))"
              : "drop-shadow(1px 1px 0 #3b4a63) drop-shadow(1px 1px 0 #6b7a94) drop-shadow(0 10px 14px rgba(11,40,90,0.3))",
          }}
        >
          <path fill={dark ? "#ffffff" : "#0b0c10"} fillRule="evenodd" d={CHEVRON} />
        </svg>
      </span>
    </button>
  );
}
