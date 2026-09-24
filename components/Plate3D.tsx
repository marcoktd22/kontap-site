"use client";

import { useEffect, useRef } from "react";

/**
 * Targa recensioni Kontap in 3D — fronte e retro reali dal mockup, spessore
 * costruito da strati impilati (bordi arrotondati solidi a qualsiasi angolo).
 * Trascina (o swipe orizzontale su mobile) per ruotarla; tap per girarla.
 * A riposo oscilla appena, così si legge subito come oggetto fisico.
 * Solo CSS 3D: le facce restano immagini native → nitide su Retina.
 */

const LAYERS = 8; // strati dello spessore
const DEPTH = 5; // spessore totale in px
const RADIUS = "7.5%"; // raggio angoli, come il mockup
const REST_TILT = -6; // leggera inclinazione verso chi guarda

export function Plate3D({ className }: { className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const plate = plateRef.current;
    if (!stage || !plate) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Stato fisico
    let angle = reduced ? 0 : -200; // entrata: mezzo giro che mostra il retro
    let vel = 0;
    let tilt = REST_TILT;
    let tiltVel = 0;
    let target = 0;
    let sway = 0; // ampiezza oscillazione a riposo (0 → 1)
    let dragging = false;
    let coasting = false; // inerzia dopo il rilascio
    let moved = false;
    let startX = 0;
    let startY = 0;
    let startAngle = 0;
    let startTilt = 0;
    let lastX = 0;
    let lastT = 0;
    let idleSince = performance.now() + (reduced ? 0 : 900);
    let raf = 0;
    let running = false;
    let prev = performance.now();

    const nearestFace = (a: number) => Math.round(a / 180) * 180;

    const render = (t: number) => {
      const s = reduced ? 0 : sway;
      const a = angle + s * 14 * Math.sin(t / 1400);
      const x = tilt + s * 3 * Math.sin(t / 1900);
      plate.style.transform = `rotateX(${x}deg) rotateY(${a}deg)`;

      // Riflesso che scorre con la rotazione
      const rad = (a * Math.PI) / 180;
      if (shineRef.current) {
        shineRef.current.style.backgroundPosition = `${50 - Math.sin(rad) * 90}% 0`;
      }
      // Ombra a terra: si stringe quando la targa è di taglio
      if (shadowRef.current) {
        const face = Math.abs(Math.cos(rad));
        shadowRef.current.style.transform = `scaleX(${0.55 + 0.45 * face})`;
        shadowRef.current.style.opacity = `${0.55 + 0.35 * face}`;
      }
    };

    const tick = (t: number) => {
      const dt = Math.min(2.5, (t - prev) / 16.67);
      prev = t;

      if (!dragging) {
        if (coasting && Math.abs(vel) > 2.2) {
          // inerzia
          angle += vel * dt;
          vel *= Math.pow(0.94, dt);
        } else {
          if (coasting) {
            coasting = false;
            target = nearestFace(angle + vel * 8);
          }
          // molla verso la faccia più vicina
          vel += (target - angle) * 0.045 * dt;
          vel *= Math.pow(0.8, dt);
          angle += vel * dt;
        }
        tiltVel += (REST_TILT - tilt) * 0.06 * dt;
        tiltVel *= Math.pow(0.78, dt);
        tilt += tiltVel * dt;

        // Oscillazione a riposo: qualche ciclo, poi si ferma (nitida e
        // niente lavoro in background)
        const still = t - idleSince;
        const idle = still > 1200 && still < 10000 && Math.abs(target - angle) < 1;
        sway += ((idle ? 1 : 0) - sway) * 0.02 * dt;
      } else {
        sway += (0 - sway) * 0.2 * dt;
      }

      render(t);

      const settled =
        !dragging &&
        !coasting &&
        t - idleSince > 10000 &&
        sway < 0.002 &&
        Math.abs(target - angle) < 0.05 &&
        Math.abs(vel) < 0.01 &&
        Math.abs(tilt - REST_TILT) < 0.02;
      if (settled || reduced && !dragging && Math.abs(target - angle) < 0.05) {
        angle = target;
        tilt = REST_TILT;
        vel = tiltVel = sway = 0;
        render(t);
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      prev = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      coasting = false;
      moved = false;
      startX = lastX = e.clientX;
      startY = e.clientY;
      startAngle = angle;
      startTilt = tilt;
      lastT = performance.now();
      vel = 0;
      stage.setPointerCapture(e.pointerId);
      start();
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
      angle = startAngle + dx * 0.65;
      tilt = Math.max(-28, Math.min(22, startTilt - dy * 0.3));
      const now = performance.now();
      const dtm = Math.max(1, now - lastT);
      vel = ((e.clientX - lastX) * 0.65 * 16.67) / dtm;
      lastX = e.clientX;
      lastT = now;
    };

    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      if (!moved) {
        // tap → gira di 180°
        vel = 0;
        target = nearestFace(angle) + 180;
      } else {
        coasting = true;
      }
      idleSince = performance.now();
    };

    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onUp);

    render(performance.now());
    start();

    return () => {
      cancelAnimationFrame(raf);
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const face =
    "absolute inset-0 h-full w-full select-none [backface-visibility:hidden] [-webkit-backface-visibility:hidden]";

  return (
    <div className={className}>
      <div
        ref={stageRef}
        role="img"
        aria-label="Targa Kontap per le recensioni Google — trascina per ruotarla"
        className="relative cursor-grab touch-pan-y select-none [perspective:900px] active:cursor-grabbing"
      >
        <div
          ref={plateRef}
          className="relative aspect-[800/821] w-full [transform-style:preserve-3d]"
          style={{ transform: `rotateX(${REST_TILT}deg) rotateY(0deg)` }}
        >
          {/* Spessore: strati del bordo in acrilico */}
          {Array.from({ length: LAYERS }, (_, i) => {
            const z = -DEPTH / 2 + (DEPTH * (i + 0.5)) / LAYERS;
            const mid = 1 - Math.abs(i - (LAYERS - 1) / 2) / ((LAYERS - 1) / 2);
            const l = 88 - mid * 8; // più scuro al centro del bordo
            return (
              <div
                key={i}
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  borderRadius: RADIUS,
                  background: `hsl(218 30% ${l}%)`,
                  transform: `translateZ(${z}px)`,
                }}
              />
            );
          })}

          {/* Fronte */}
          <div className={face} style={{ transform: `translateZ(${DEPTH / 2}px)` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/products/review-plate-front.webp"
              alt=""
              draggable={false}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full"
              style={{ borderRadius: RADIUS }}
            />
            {/* riflesso lucido */}
            <div
              ref={shineRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{
                borderRadius: RADIUS,
                backgroundImage:
                  "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.7) 48%, transparent 62%)",
                backgroundSize: "260% 100%",
                backgroundPosition: "50% 0",
              }}
            />
          </div>

          {/* Retro — adesivo 3M */}
          <div
            className={face}
            style={{ transform: `rotateY(180deg) translateZ(${DEPTH / 2}px)` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/products/review-plate-back.webp"
              alt=""
              draggable={false}
              decoding="async"
              className="h-full w-full"
              style={{ borderRadius: RADIUS }}
            />
          </div>
        </div>

        {/* Ombra a terra */}
        <div
          ref={shadowRef}
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-7 left-[8%] right-[8%] h-5 rounded-[50%] bg-[radial-gradient(closest-side,rgba(16,24,40,0.28),rgba(36,83,255,0.08)_60%,transparent)] blur-[6px]"
        />
      </div>
    </div>
  );
}
