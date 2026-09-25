"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { PlusLogo } from "../PlusLogo";
import { Globe, type GlobeOrigin } from "../Globe";
import { cn } from "@/lib/cn";

/**
 * Demo interattiva di Kontap+ — un "centro di controllo" finto (dati
 * dimostrativi): mappamondo con la provenienza dei clienti, KPI, punteggio
 * reputazione, attività settimanale, feed in tempo reale e sorgenti dei tap.
 * Tutto reagisce a periodo, numero di targhe e risposte AI, e "vive" con
 * piccole oscillazioni. Serve a far toccare con mano il prodotto.
 */

type Period = 7 | 30 | 90;
const PERIODS: Period[] = [7, 30, 90];

/** Migliaia col punto, identico su server e browser (niente Intl). */
const fmt = (v: number) => Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/** PRNG deterministico: stesso stato → stessi dati. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Città di provenienza dei clienti (quota sul totale dei tap). */
const ORIGINS = [
  { name: "Italia", city: "Milano", lat: 45.46, lon: 9.19, share: 0.34 },
  { name: "Italia", city: "Roma", lat: 41.9, lon: 12.5, share: 0.22 },
  { name: "Germania", city: "Berlino", lat: 52.52, lon: 13.4, share: 0.12 },
  { name: "Regno Unito", city: "Londra", lat: 51.5, lon: -0.13, share: 0.09 },
  { name: "Francia", city: "Parigi", lat: 48.86, lon: 2.35, share: 0.08 },
  { name: "Stati Uniti", city: "New York", lat: 40.71, lon: -74, share: 0.06 },
];
const COUNTRIES = [
  { name: "Italia", flag: "🇮🇹", share: 0.62 },
  { name: "Germania", flag: "🇩🇪", share: 0.12 },
  { name: "Regno Unito", flag: "🇬🇧", share: 0.09 },
  { name: "Francia", flag: "🇫🇷", share: 0.08 },
];

const DAYS = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
const WEEK_SHAPE = [0.55, 0.5, 0.6, 0.64, 0.82, 1, 0.78];

const FEED = [
  { icon: "★", text: "Nuova recensione ★★★★★ da Giulia R.", tone: "good" },
  { icon: "⟶", text: "Tap sulla targa del bancone · Milano", tone: "info" },
  { icon: "!", text: "Alert: recensione 3★ da rispondere", tone: "warn" },
  { icon: "✓", text: "Risposta AI pubblicata su Google", tone: "good" },
  { icon: "⟶", text: "Tap dal QR code · Berlino", tone: "info" },
  { icon: "↑", text: "Salito di 1 posizione su Google Maps", tone: "good" },
  { icon: "★", text: "Nuova recensione ★★★★★ da Mark T.", tone: "good" },
  { icon: "◎", text: "Competitor in zona: 2 nuove recensioni", tone: "info" },
] as const;

function useVisible<T extends Element>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible] as const;
}

/** Battito "live": un contatore che avanza ogni ~2,4s quando la demo è visibile. */
function useTicker(active: boolean, ms = 2400) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setTick((t) => t + 1), ms);
    return () => window.clearInterval(id);
  }, [active, ms]);
  return tick;
}

export function PlusDemo() {
  const [period, setPeriod] = useState<Period>(30);
  const [plates, setPlates] = useState(3);
  const [ai, setAi] = useState(true);
  const [ref, visible] = useVisible<HTMLDivElement>();
  const tick = useTicker(visible);

  const d = useMemo(() => {
    const r = rng(period * 131 + plates * 17 + (ai ? 7 : 0));
    const live = 1 + Math.sin(tick * 1.7) * 0.012 + Math.min(tick, 40) * 0.0015; // oscilla e cresce piano (max +6%)
    const boost = ai ? 1.08 : 1;
    const taps = Math.round(plates * 34 * period * boost * live);
    const conv = (ai ? 0.13 : 0.09) + Math.sin(tick * 2.3) * 0.002;
    const reviews = Math.round(taps * conv);
    const rating = Math.min(4.9, 4.2 + (ai ? 0.3 : 0.1) + Math.min(0.3, reviews / 1500));
    const rank = Math.max(1, Math.round(12 - reviews / 25));
    const growth = (ai ? 0.22 : 0.11) * (0.9 + r() * 0.2);
    const score = Math.min(98, Math.round(58 + (ai ? 18 : 6) + Math.min(16, reviews / 40)));
    const week = WEEK_SHAPE.map((s, i) => Math.round((taps / period) * 7 * (s / 4.89) * (0.92 + r() * 0.16) * (i === 5 ? 1 : 1)));
    const origins: GlobeOrigin[] = ORIGINS.map((o) => ({ name: o.city, lat: o.lat, lon: o.lon, value: Math.max(1, Math.round(taps * o.share)) }));
    const sources = [
      { name: "Tap sulla targa", value: Math.round(taps * 0.58 * (0.08 + r() * 0.05)) },
      { name: "QR code", value: Math.round(taps * 0.17 * (0.04 + r() * 0.05)) * (ai ? 1 : -1) },
      { name: "Google Maps", value: Math.round(taps * 0.2 * (0.07 + r() * 0.05)) },
      { name: "Instagram", value: -Math.round(taps * 0.05 * (0.05 + r() * 0.05)) },
    ];
    const insight = ai
      ? `Le risposte AI stanno spingendo le recensioni: +${Math.round(growth * 100)}% sul periodo precedente. Il sabato è il tuo giorno migliore.`
      : "Rispondere alle recensioni migliora la conversione: attiva le risposte AI e guarda come cambiano i numeri.";
    return { taps, conv, reviews, rating, rank, growth, score, week, origins, sources, insight };
  }, [period, plates, ai, tick]);

  const feed = useMemo(() => [0, 1, 2].map((k) => FEED[(tick + k) % FEED.length]), [tick]);

  return (
    <section id="demo" className="relative scroll-mt-24 py-16 sm:py-28">
      <Container>
        <SectionHeader
          eyebrow="Demo interattiva"
          title={
            <>
              <span className="text-gradient">Guarda Kontap+ </span>
              <span className="text-gradient-accent">al lavoro.</span>
            </>
          }
          description="Cambia periodo, targhe e risposte AI: la dashboard reagisce come quella vera."
        />

        <Reveal index={2} className="mx-auto mt-8 max-w-6xl sm:mt-14">
          <div ref={ref} className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_40%_30%,rgba(36,83,255,0.4),transparent_70%)] blur-2xl" />

            <div
              className="relative overflow-hidden rounded-[1.5rem] p-3 text-white shadow-[0_50px_110px_-45px_rgba(9,17,33,0.9)] ring-1 ring-white/10 sm:rounded-[2rem] sm:p-5"
              style={{
                background:
                  "radial-gradient(70% 50% at 0% 0%, rgba(36,83,255,0.35), transparent 60%)," +
                  "radial-gradient(60% 50% at 100% 100%, rgba(88,200,255,0.14), transparent 60%)," +
                  "linear-gradient(170deg, #0f1e4a 0%, #0a1535 60%, #081130 100%)",
              }}
            >
              {/* barra */}
              <div className="flex items-center justify-between px-1">
                <PlusLogo className="h-5 text-white sm:h-6" />
                <div className="flex items-center gap-2 text-[0.65rem] text-white/60 sm:text-[0.7rem]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#58c8ff] opacity-70 motion-reduce:hidden" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#58c8ff]" />
                  </span>
                  Live · dati dimostrativi
                </div>
              </div>

              {/* controlli */}
              <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:grid-cols-3 sm:gap-3">
                <div className="col-span-2 sm:col-span-1">
                  <Segmented value={period} onChange={setPeriod} />
                </div>
                <div className="flex h-9 items-center justify-between rounded-full bg-white/[0.06] px-1 ring-1 ring-white/10">
                  <StepButton label="Meno targhe" onClick={() => setPlates((n) => Math.max(1, n - 1))} disabled={plates <= 1}>−</StepButton>
                  <span className="text-[0.72rem] font-semibold tabular-nums">
                    {plates} {plates === 1 ? "targa" : "targhe"}
                  </span>
                  <StepButton label="Più targhe" onClick={() => setPlates((n) => Math.min(10, n + 1))} disabled={plates >= 10}>+</StepButton>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={ai}
                  onClick={() => setAi((v) => !v)}
                  className="flex h-9 items-center justify-between rounded-full bg-white/[0.06] pl-3 pr-1 ring-1 ring-white/10"
                >
                  <span className="text-[0.72rem] font-semibold text-white/80">Risposte AI</span>
                  <span className={cn("relative h-7 w-12 rounded-full transition-colors duration-300", ai ? "bg-brand-gradient" : "bg-white/15")}>
                    <span className={cn("absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-300", ai ? "left-6" : "left-1")} />
                  </span>
                </button>
              </div>

              {/* griglia dashboard */}
              <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:gap-3 lg:grid-cols-4">
                {/* mappamondo */}
                <Glass className="col-span-2 lg:row-span-2">
                  <CardTitle>Da dove arrivano i tuoi clienti</CardTitle>
                  <div className="mt-1 grid grid-cols-[1.25fr_1fr] items-center gap-2 lg:grid-cols-1">
                    <div className="mx-auto w-full max-w-[20rem]">
                      <Globe origins={d.origins} />
                    </div>
                    <ul className="flex flex-col gap-2 lg:grid lg:grid-cols-2 lg:gap-x-4">
                      {COUNTRIES.map((c) => (
                        <li key={c.name}>
                          <div className="flex items-center justify-between text-[0.68rem] sm:text-[0.75rem]">
                            <span className="truncate text-white/80">
                              <span className="mr-1">{c.flag}</span>
                              {c.name}
                            </span>
                            <AnimatedNumber value={Math.round(d.taps * c.share)} format={(v) => fmt(v)} className="font-semibold tabular-nums" />
                          </div>
                          <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/10">
                            <div className="bg-brand-gradient h-full rounded-full transition-[width] duration-700" style={{ width: `${c.share * 100 / 0.62}%` }} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Glass>

                {/* KPI */}
                <Kpi label="Tap" value={d.taps} format={(v) => fmt(v)} delta={`+${Math.round(d.growth * 100)}%`} seed={1} />
                <Kpi label="Recensioni" value={d.reviews} format={(v) => fmt(v)} delta={`+${Math.round(d.growth * 120)}%`} seed={2} />
                <Kpi label="Valutazione" value={d.rating} format={(v) => `${v.toFixed(1).replace(".", ",")}★`} delta={`+${(d.rating - 4.1).toFixed(1).replace(".", ",")}`} seed={3} />
                <Kpi label="Posizione Maps" value={d.rank} format={(v) => `#${Math.round(v)}`} delta={ai ? "in salita" : "stabile"} seed={4} />

                {/* punteggio reputazione */}
                <Glass>
                  <CardTitle>Reputation score</CardTitle>
                  <Ring value={d.score} />
                </Glass>

                {/* attività settimanale */}
                <Glass>
                  <CardTitle>Tap per giorno</CardTitle>
                  <Bars values={d.week} />
                </Glass>

                {/* feed in tempo reale */}
                <Glass className="col-span-2">
                  <CardTitle>Attività in tempo reale</CardTitle>
                  <ul className="mt-2 flex flex-col gap-1.5" aria-live="polite">
                    {feed.map((f, i) => (
                      <motion.li
                        key={`${tick}-${i}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: i === 0 ? 1 : 0.7 - i * 0.15, y: 0 }}
                        transition={{ duration: 0.45, delay: i * 0.05 }}
                        className="flex items-center gap-2.5 rounded-xl bg-white/[0.04] px-2.5 py-2 text-[0.72rem] sm:text-[0.78rem]"
                      >
                        <span
                          className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.7rem] font-bold",
                            f.tone === "good" && "bg-[#58c8ff]/15 text-[#8fdcff]",
                            f.tone === "info" && "bg-white/10 text-white/80",
                            f.tone === "warn" && "bg-[#ffb86b]/15 text-[#ffcf99]"
                          )}
                        >
                          {f.icon}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-white/85">{f.text}</span>
                        <span className="shrink-0 text-[0.62rem] text-white/40">{i === 0 ? "ora" : `${i * 3} min`}</span>
                      </motion.li>
                    ))}
                  </ul>
                </Glass>

                {/* sorgenti dei tap (desktop) */}
                <Glass className="col-span-2 hidden lg:block">
                  <CardTitle>Sorgenti · variazione</CardTitle>
                  <ul className="mt-2 grid grid-cols-2 gap-1.5">
                    {d.sources.map((s) => (
                      <li key={s.name} className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2 text-[0.78rem]">
                        <span className="text-white/80">{s.name}</span>
                        <AnimatedNumber
                          value={s.value}
                          format={(v) => `${v >= 0 ? "+" : "−"}${fmt(Math.abs(v))}`}
                          className={cn("font-semibold tabular-nums", s.value >= 0 ? "text-[#8fdcff]" : "text-[#ff9fb2]")}
                        />
                      </li>
                    ))}
                  </ul>
                </Glass>

                {/* insight AI */}
                <div className="col-span-2 flex items-start gap-3 rounded-2xl bg-gradient-to-br from-primary/35 to-primary/5 p-3 ring-1 ring-white/10 sm:p-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#58c8ff]/15 text-[#8fdcff]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4" aria-hidden="true">
                      <path d="M12 3v2M12 19v2M5 12H3M21 12h-2M6.3 6.3 4.9 4.9M19.1 19.1l-1.4-1.4M17.7 6.3l1.4-1.4M4.9 19.1l1.4-1.4" strokeLinecap="round" />
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </span>
                  <p className="text-[0.75rem] leading-relaxed text-white/80 sm:text-[0.82rem]">
                    <span className="font-medium text-white">Insight AI · </span>
                    {d.insight}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------------------------- componenti ---------------------------- */

function Glass({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-3 ring-1 ring-white/10 sm:p-4",
        "bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white/55 sm:text-[0.66rem]">{children}</p>;
}

function Segmented({ value, onChange }: { value: Period; onChange: (p: Period) => void }) {
  return (
    <div className="flex h-9 rounded-full bg-white/[0.06] p-1 ring-1 ring-white/10">
      {PERIODS.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-pressed={value === p}
          className={cn(
            "flex-1 rounded-full text-[0.72rem] font-semibold transition-all duration-300",
            value === p ? "bg-brand-gradient text-white shadow-[0_6px_16px_-6px_rgba(36,83,255,0.8)]" : "text-white/60 hover:text-white"
          )}
        >
          {p} giorni
        </button>
      ))}
    </div>
  );
}

function StepButton({ label, onClick, disabled, children }: { label: string; onClick: () => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-base leading-none text-white transition-colors hover:bg-white/20 disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function Kpi({ label, value, format, delta, seed }: { label: string; value: number; format: (v: number) => string; delta: string; seed: number }) {
  return (
    <Glass className="flex flex-col">
      <CardTitle>{label}</CardTitle>
      <AnimatedNumber value={value} format={format} className="mt-1 block text-lg font-semibold tabular-nums sm:text-2xl lg:text-3xl" />
      <div className="mt-1 flex items-center justify-between gap-2">
        <span className="text-[0.66rem] font-medium text-[#58c8ff]">{delta}</span>
        <Wave seed={seed} value={value} className="h-4 w-12 sm:h-5 sm:w-16 lg:hidden" />
      </div>
      {/* su desktop l'onda riempie la card */}
      <Wave seed={seed} value={value} className="mt-auto hidden h-16 w-full pt-3 lg:block" />
    </Glass>
  );
}

/** Numero che scorre dal valore precedente al nuovo. */
function AnimatedNumber({ value, format, className }: { value: number; format: (v: number) => string; className?: string }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    const b = value;
    let raf = 0;
    const step = (t: number) => {
      const k = Math.min(1, (t - start) / 700);
      const v = a + (b - a) * (1 - Math.pow(1 - k, 3));
      setShown(v);
      from.current = v;
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span className={className}>{format(shown)}</span>;
}

/** Piccola onda che si muove con il valore (come nei riferimenti). */
function Wave({ seed, value, className }: { seed: number; value: number; className?: string }) {
  const gid = `wave-${useId().replace(/:/g, "")}`;
  const ph = (value % 97) / 15 + seed;
  const pts = Array.from({ length: 13 }, (_, i) => {
    const x = (i / 12) * 60;
    const y = 10 + Math.sin(i * 0.9 + ph) * 5 + Math.sin(i * 0.37 + seed) * 2;
    return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 60 20" preserveAspectRatio="none" className={cn("shrink-0", className)} aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" x2="1">
          <stop offset="0" stopColor="#2453ff" />
          <stop offset="1" stopColor="#58c8ff" />
        </linearGradient>
      </defs>
      <motion.path initial={false} animate={{ d: pts }} transition={{ duration: 0.8 }} fill="none" stroke={`url(#${gid})`} strokeWidth={2} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function Ring({ value }: { value: number }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative mx-auto mt-2 h-[4.75rem] w-[4.75rem] sm:h-24 sm:w-24">
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2453ff" />
            <stop offset="1" stopColor="#6cceff" />
          </linearGradient>
        </defs>
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="7" />
        <motion.circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={false}
          animate={{ strokeDashoffset: c * (1 - value / 100) }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: "drop-shadow(0 0 6px rgba(88,200,255,0.5))" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatedNumber value={value} format={(v) => `${Math.round(v)}%`} className="text-lg font-semibold tabular-nums sm:text-xl" />
      </div>
    </div>
  );
}

function Bars({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const peak = values.indexOf(max);
  return (
    <div className="mt-2 flex h-[4.75rem] items-end justify-between gap-1 sm:h-24">
      {values.map((v, i) => (
        <div key={DAYS[i]} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
          <div className="relative flex w-full flex-1 items-end justify-center">
            <div
              className={cn(
                "w-[60%] max-w-[10px] rounded-full transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                i === peak ? "bg-[linear-gradient(180deg,#6cceff,#2453ff)] shadow-[0_0_12px_rgba(88,200,255,0.6)]" : "bg-[linear-gradient(180deg,rgba(108,206,255,0.7),rgba(36,83,255,0.5))]"
              )}
              style={{ height: `${Math.max(8, (v / max) * 100)}%` }}
            />
          </div>
          <span className={cn("text-[0.55rem] sm:text-[0.6rem]", i === peak ? "text-white" : "text-white/45")}>{DAYS[i].slice(0, 1)}</span>
        </div>
      ))}
    </div>
  );
}
