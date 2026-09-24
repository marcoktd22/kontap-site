"use client";

import { motion } from "motion/react";

/**
 * Transizione Hero → Kontap Plus: un "orizzonte" luminoso. La sezione Plus
 * sale come una cupola; sul bordo una linea di luce nel gradiente Kontap si
 * disegna dal centro verso i lati quando entra in vista, con un bagliore
 * all'apice e un impulso di luce che la percorre lentamente.
 *
 * Il ritaglio della cupola usa lo stesso tracciato della linea, così bordo e
 * luce coincidono a ogni larghezza (SVG stirato in orizzontale).
 */

/** Curva della cupola nel viewBox 0 0 1000 100 (apice al centro, y=2). */
const DOME = "M0 100 C 180 22, 360 2, 500 2 C 640 2, 820 22, 1000 100";
const DOME_LEFT = "M500 2 C 360 2, 180 22, 0 100";
const DOME_RIGHT = "M500 2 C 640 2, 820 22, 1000 100";

/** Altezza della fascia: il fondo di Plus parte 2px più in alto (vedi Plus.tsx). */
const HORIZON_HEIGHT = "h-[64px] sm:h-[96px] lg:h-[120px]";

export function PlusHorizon({ fill }: { fill: string }) {
  const draw = {
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: "0px 0px -10% 0px" },
    transition: { duration: 1.6, ease: [0.25, 1, 0.5, 1] as const },
  };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-0 z-[1] ${HORIZON_HEIGHT}`}
    >
      {/* Luce che "sorge" dall'orizzonte e sfuma nella Hero */}
      <div className="absolute left-1/2 top-0 h-[180%] w-[min(900px,120%)] -translate-x-1/2 -translate-y-[62%] bg-[radial-gradient(50%_50%_at_50%_100%,rgba(88,200,255,0.34),rgba(36,83,255,0.1)_45%,transparent_75%)]" />

      {/* Cupola: riempie sotto la curva col colore d'apertura di Plus */}
      <svg
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path d={`${DOME} L1000 100 L0 100 Z`} fill={fill} />
      </svg>

      {/* Linea di luce: si disegna dal centro verso i lati + impulso */}
      <svg
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible [filter:drop-shadow(0_0_5px_rgba(88,200,255,0.85))_drop-shadow(0_0_14px_rgba(36,83,255,0.35))]"
      >
        <defs>
          <linearGradient id="horizon-stroke" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#58c8ff" stopOpacity="0" />
            <stop offset="0.26" stopColor="#58c8ff" stopOpacity="0.75" />
            <stop offset="0.5" stopColor="#2453ff" />
            <stop offset="0.74" stopColor="#58c8ff" stopOpacity="0.75" />
            <stop offset="1" stopColor="#58c8ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="[stroke-width:2.6] sm:[stroke-width:1.8] lg:[stroke-width:1.4]">
          <motion.path d={DOME_LEFT} stroke="url(#horizon-stroke)" strokeLinecap="round" fill="none" {...draw} />
          <motion.path d={DOME_RIGHT} stroke="url(#horizon-stroke)" strokeLinecap="round" fill="none" {...draw} />
        </g>
        <path
          d={DOME}
          pathLength={1}
          stroke="#ffffff"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="0.07 1.3"
          strokeDashoffset={0.07}
          className="[stroke-width:3.6] sm:[stroke-width:2.6] lg:[stroke-width:2.1] motion-safe:[animation:kontap-horizon-pulse_7s_cubic-bezier(0.45,0,0.25,1)_1.8s_infinite]"
        />
      </svg>

      {/* Bagliore all'apice */}
      <div className="absolute left-1/2 top-[2%] h-[3px] w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,#ffffff,rgba(88,200,255,0.9)_35%,transparent_75%)] blur-[1px]" />
      <div className="absolute left-1/2 top-[2%] h-10 w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(88,200,255,0.55),transparent_70%)] blur-md" />
    </div>
  );
}
