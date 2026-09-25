"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { steps } from "@/lib/content";
import { BrandBackdrop } from "../BrandBackdrop";
import { cn } from "@/lib/cn";

const STEP_MS = 4200;

/**
 * Come funziona — una linea tecnologica con tre nodi (1 · 2 · 3) che si
 * riempie in modo progressivo. Su mobile sotto la linea c'è solo il passo
 * attivo (compatto); avanza da solo o con un tap sul nodo. Da tablet in su
 * i tre passi stanno affiancati sotto i rispettivi nodi.
 */
export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // avanzamento automatico (si ferma se l'utente sceglie un passo)
  useEffect(() => {
    if (!visible || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % steps.length), STEP_MS);
    return () => window.clearTimeout(id);
  }, [active, visible, paused]);

  const select = (i: number) => {
    setActive(i);
    setPaused(true);
  };

  // riempimento della linea: fino al nodo attivo
  const fill = steps.length > 1 ? (active / (steps.length - 1)) * 100 : 100;

  return (
    <Section id="how" className="overflow-hidden">
      <BrandBackdrop variant="how" />
      <Container className="relative">
        <SectionHeader
          eyebrow="Come funziona"
          title="Dal tap al risultato in tre passi"
          description="Nessuna integrazione, nessuna curva di apprendimento. Kontap funziona dal momento in cui esce dalla scatola."
        />

        <Reveal index={2} className="mx-auto mt-10 max-w-5xl sm:mt-16">
          <div ref={ref}>
            {/* Linea tecnologica con i tre nodi */}
            <div className="relative mx-auto px-[12%] md:px-[16.66%]">
              <div className="relative h-14">
                {/* binario */}
                <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[color:var(--color-line)]" />
                {/* riempimento luminoso */}
                <div
                  className="bg-brand-gradient absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full shadow-[0_0_12px_rgba(13,118,235,0.6)] transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ width: `${fill}%` }}
                />
                {/* impulso che scorre sul binario */}
                <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full">
                  <div className="h-full w-16 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.95),transparent)] motion-safe:[animation:kontap-scan_2.8s_linear_infinite]" />
                </div>

                {steps.map((step, i) => {
                  const done = i <= active;
                  const current = i === active;
                  return (
                    <button
                      key={step.number}
                      type="button"
                      onClick={() => select(i)}
                      aria-label={`Passo ${step.number}: ${step.title}`}
                      aria-current={current ? "step" : undefined}
                      className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${(i / (steps.length - 1)) * 100}%` }}
                    >
                      {current && (
                        <span className="absolute inset-0 -m-2 rounded-full bg-[#0d76eb]/25 motion-safe:animate-ping" />
                      )}
                      <span
                        className={cn(
                          "relative flex h-11 w-11 items-center justify-center rounded-full text-base font-semibold transition-all duration-500 sm:h-12 sm:w-12",
                          done
                            ? "bg-brand-gradient text-white shadow-[0_10px_24px_-8px_rgba(11,103,204,0.7),inset_0_1px_0_rgba(255,255,255,0.45)]"
                            : "bg-white text-[#0b67cc] ring-2 ring-[color:var(--color-line)]",
                          current && "scale-110"
                        )}
                      >
                        {step.number}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile: solo il passo attivo */}
            <div className="relative mt-6 md:hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <StepCard step={steps[active]} active />
                </motion.div>
              </AnimatePresence>
              <Progress key={`${active}-${paused}`} running={visible && !paused} />
            </div>

            {/* Da tablet: i tre passi affiancati */}
            <div className="mt-8 hidden grid-cols-3 gap-5 md:grid">
              {steps.map((step, i) => (
                <button key={step.number} type="button" onClick={() => select(i)} className="text-left">
                  <StepCard step={step} active={i === active} />
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function StepCard({ step, active }: { step: (typeof steps)[number]; active: boolean }) {
  return (
    <div
      className={cn(
        "relative h-full overflow-hidden rounded-[1.5rem] bg-white p-5 transition-all duration-500 sm:p-7",
        active
          ? "shadow-[0_24px_56px_-30px_rgba(11,103,204,0.45)] ring-1 ring-[#0b67cc]/30"
          : "opacity-70 shadow-[var(--shadow-card)] ring-hairline hover:opacity-100"
      )}
    >
      <span
        aria-hidden="true"
        className={cn("bg-brand-gradient absolute inset-x-0 top-0 h-[3px] transition-opacity duration-500", active ? "opacity-100" : "opacity-30")}
      />
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#0b67cc]">Passo {step.number}</p>
      <h3 className="mt-1.5 text-lg font-semibold text-ink sm:text-xl">{step.title}</h3>
      <p className="mt-2 text-pretty text-[0.88rem] leading-relaxed text-muted sm:text-[0.95rem]">{step.description}</p>
    </div>
  );
}

/** Barra sottile che mostra quando arriva il passo successivo. */
function Progress({ running }: { running: boolean }) {
  const [go, setGo] = useState(false);
  useEffect(() => {
    if (!running) return;
    const id = requestAnimationFrame(() => setGo(true));
    return () => cancelAnimationFrame(id);
  }, [running]);
  const on = running && go;
  return (
    <div className="mx-auto mt-4 h-1 w-24 overflow-hidden rounded-full bg-[color:var(--color-line)]">
      <div
        className="bg-brand-gradient h-full rounded-full"
        style={{ width: on ? "100%" : "0%", transition: on ? `width ${STEP_MS}ms linear` : "none" }}
      />
    </div>
  );
}
