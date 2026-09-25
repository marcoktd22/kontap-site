"use client";

import { useEffect, useRef } from "react";
import { LAND_POINTS } from "@/lib/globe-points";

/**
 * Mappamondo digitale girevole (canvas 2D, proiezione ortografica).
 * Terre a puntini luminosi, atmosfera nel gradiente Kontap, la tua attività
 * in Puglia che pulsa e archi animati dalle città da cui arrivano i clienti.
 * Si ferma fuori schermo; con reduced-motion resta fermo sull'Europa.
 */

export type GlobeOrigin = { name: string; lat: number; lon: number; value: number };

const HOME = { lat: 41.12, lon: 16.87 }; // Bari
const TILT = (28 * Math.PI) / 180; // inclinazione: l'emisfero nord verso chi guarda

type V3 = [number, number, number];
const toVec = (lat: number, lon: number): V3 => {
  const p = (lat * Math.PI) / 180;
  const l = (lon * Math.PI) / 180;
  return [Math.cos(p) * Math.sin(l), Math.sin(p), Math.cos(p) * Math.cos(l)];
};

export function Globe({ origins, className }: { origins: GlobeOrigin[]; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originsRef = useRef(origins);
  originsRef.current = origins;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const land: V3[] = [];
    for (let i = 0; i < LAND_POINTS.length; i += 2) land.push(toVec(LAND_POINTS[i], LAND_POINTS[i + 1]));
    const home = toVec(HOME.lat, HOME.lon);

    let size = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      size = canvas.clientWidth;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // rotazione: parte centrata sull'Italia, gira lentamente; trascinabile
    let rot = (-HOME.lon * Math.PI) / 180 + 0.25;
    let vel = 0;
    let dragging = false;
    let lastX = 0;

    const project = (v: V3, r: number, cx: number, cy: number) => {
      const cr = Math.cos(rot);
      const sr = Math.sin(rot);
      const x = v[0] * cr + v[2] * sr;
      const z0 = -v[0] * sr + v[2] * cr;
      const y = v[1] * Math.cos(TILT) - z0 * Math.sin(TILT);
      const z = v[1] * Math.sin(TILT) + z0 * Math.cos(TILT);
      return { x: cx + x * r, y: cy - y * r, z };
    };

    const slerp = (a: V3, b: V3, t: number): V3 => {
      const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
      const om = Math.acos(dot);
      if (om < 1e-4) return a;
      const s = Math.sin(om);
      const k1 = Math.sin((1 - t) * om) / s;
      const k2 = Math.sin(t * om) / s;
      return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
    };

    let raf = 0;
    let running = false;
    let prev = performance.now();

    const draw = (t: number) => {
      const W = size * dpr;
      const cx = W / 2;
      const cy = W / 2;
      const R = W * 0.4;
      ctx.clearRect(0, 0, W, W);

      // alone esterno
      const halo = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.25);
      halo.addColorStop(0, "rgba(88,200,255,0.28)");
      halo.addColorStop(1, "rgba(88,200,255,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // sfera
      const body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      body.addColorStop(0, "#1f4fd6");
      body.addColorStop(0.55, "#10286e");
      body.addColorStop(1, "#0a1740");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // orbite decorative
      ctx.strokeStyle = "rgba(143,220,255,0.12)";
      ctx.lineWidth = 1 * dpr;
      ctx.beginPath();
      ctx.ellipse(cx, cy, R * 1.12, R * 0.32, -0.35, 0, Math.PI * 2);
      ctx.stroke();

      // terre a puntini (retro appena visibile per profondità)
      const dot = Math.max(1, R / 150);
      for (const v of land) {
        const p = project(v, R, cx, cy);
        if (p.z > 0) {
          ctx.fillStyle = `rgba(143,220,255,${0.25 + 0.75 * p.z})`;
          ctx.fillRect(p.x - dot, p.y - dot, dot * 2, dot * 2);
        } else if (p.z > -0.6) {
          ctx.fillStyle = "rgba(143,220,255,0.05)";
          ctx.fillRect(p.x - dot * 0.6, p.y - dot * 0.6, dot * 1.2, dot * 1.2);
        }
      }

      // bordo luminoso
      const rim = ctx.createRadialGradient(cx, cy, R * 0.82, cx, cy, R);
      rim.addColorStop(0, "rgba(88,200,255,0)");
      rim.addColorStop(1, "rgba(88,200,255,0.35)");
      ctx.fillStyle = rim;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // archi dalle città di origine verso la tua attività
      const hp = project(home, R, cx, cy);
      const phase = (t / 2600) % 1;
      originsRef.current.forEach((o, idx) => {
        const ov = toVec(o.lat, o.lon);
        const op = project(ov, R, cx, cy);
        const pts: { x: number; y: number; z: number }[] = [];
        const N = 28;
        for (let i = 0; i <= N; i++) {
          const f = i / N;
          const s = slerp(ov, home, f);
          const lift = 1 + 0.22 * Math.sin(Math.PI * f) * Math.min(1, Math.acos(ov[0] * home[0] + ov[1] * home[1] + ov[2] * home[2]) * 1.2);
          pts.push(project([s[0] * lift, s[1] * lift, s[2] * lift], R, cx, cy));
        }
        if (pts[0].z < -0.05 && pts[N].z < -0.05) return;

        const grad = ctx.createLinearGradient(pts[0].x, pts[0].y, pts[N].x, pts[N].y);
        grad.addColorStop(0, "rgba(88,200,255,0.15)");
        grad.addColorStop(1, "rgba(108,206,255,0.85)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4 * dpr;
        ctx.beginPath();
        let started = false;
        for (const p of pts) {
          if (p.z < -0.05) {
            started = false;
            continue;
          }
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();

        // particella che viaggia verso la tua attività
        const f = (phase + idx * 0.17) % 1;
        const pp = pts[Math.round(f * N)];
        if (pp.z > -0.05) {
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "#58c8ff";
          ctx.shadowBlur = 8 * dpr;
          ctx.beginPath();
          ctx.arc(pp.x, pp.y, 1.8 * dpr, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // città di origine + valore (etichetta solo se non si sovrappone alla tua attività)
        if (op.z > 0) {
          ctx.fillStyle = "#58c8ff";
          ctx.beginPath();
          ctx.arc(op.x, op.y, 2.4 * dpr, 0, Math.PI * 2);
          ctx.fill();
          const far = Math.hypot(op.x - hp.x, op.y - hp.y) > 34 * dpr;
          ctx.fillStyle = `rgba(255,255,255,${far ? 0.5 + 0.5 * op.z : 0})`;
          ctx.font = `600 ${Math.round(9.5 * dpr)}px system-ui, sans-serif`;
          if (far) ctx.fillText(String(o.value).replace(/\B(?=(\d{3})+(?!\d))/g, "."), op.x + 5 * dpr, op.y - 4 * dpr);
        }
      });

      // la tua attività: pulsa
      if (hp.z > 0) {
        const pulse = (t / 1600) % 1;
        ctx.strokeStyle = `rgba(108,206,255,${1 - pulse})`;
        ctx.lineWidth = 1.5 * dpr;
        ctx.beginPath();
        ctx.arc(hp.x, hp.y, (4 + pulse * 14) * dpr, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#58c8ff";
        ctx.shadowBlur = 12 * dpr;
        ctx.beginPath();
        ctx.arc(hp.x, hp.y, 3.6 * dpr, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const tick = (t: number) => {
      const dt = Math.min(50, t - prev);
      prev = t;
      if (!dragging) {
        vel *= 0.95;
        rot += (reduced ? 0 : 0.00012) * dt + vel;
      }
      draw(t);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      prev = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(canvas);
    draw(performance.now());

    // trascina per girarlo (orizzontale; lo scroll verticale resta libero)
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      vel = 0;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      const d = (dx / size) * 3;
      rot += d;
      vel = d;
      if (!running) draw(performance.now());
    };
    const onUp = () => (dragging = false);
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Mappamondo: da dove arrivano i clienti"
      className={className}
      style={{ touchAction: "pan-y", aspectRatio: "1 / 1", width: "100%", cursor: "grab" }}
    />
  );
}
