"use client";

import { useEffect, useRef, useState } from "react";
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
 * riempie in modo progressivo, con il passo
 * attivo in evidenza; avanza da solo o con un tap sul nodo. I tre passi
 * stanno affiancati sotto i rispettivi nodi, anche su mobile.
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
    <Section id="how" className="overflow-hidden pt-36 text-white sm:pt-44 md:pt-52">
      <BrandBackdrop variant="how" />
      <Container className="relative">
        <SectionHeader
          tone="dark"
          eyebrow="Come funziona"
          title={<span className="text-white">Dal tap al risultato in tre passi</span>}
          description="Nessuna integrazione, nessuna curva di apprendimento. Kontap funziona dal momento in cui esce dalla scatola."
        />

        <Reveal index={2} className="mx-auto mt-10 max-w-5xl sm:mt-16">
          <div ref={ref}>
            {/* Linea tecnologica con i tre nodi */}
            <div className="relative mx-auto px-[16.66%]">
              <div className="relative h-14">
                {/* binario */}
                <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white/20" />
                {/* riempimento luminoso */}
                <div
                  className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.7)] transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
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
                        <span className="absolute inset-0 -m-2 rounded-full bg-white/25 motion-safe:animate-ping" />
                      )}
                      <span
                        className={cn(
                          "relative flex h-11 w-11 items-center justify-center rounded-full text-base font-semibold transition-all duration-500 sm:h-12 sm:w-12",
                          "bg-white text-[#0b67cc]",
                          done
                            ? "shadow-[0_0_0_4px_rgba(255,255,255,0.18),0_10px_26px_-6px_rgba(0,0,0,0.45)]"
                            : "opacity-75 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.4)]",
                          current && "scale-110 opacity-100"
                        )}
                      >
                        {step.number}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* I tre passi affiancati, anche su mobile (card compatte) */}
            <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-8 sm:gap-5">
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
        "relative h-full overflow-hidden rounded-2xl bg-white p-3 transition-all duration-500 sm:rounded-[1.5rem] sm:p-7",
        active
          ? "shadow-[0_0_0_2px_rgba(255,255,255,0.6),0_24px_56px_-24px_rgba(0,0,0,0.55)]"
          : "opacity-80 shadow-[0_20px_40px_-26px_rgba(0,0,0,0.5)] hover:opacity-100"
      )}
    >
      <span
        aria-hidden="true"
        className={cn("bg-brand-gradient absolute inset-x-0 top-0 h-[3px] transition-opacity duration-500", active ? "opacity-100" : "opacity-30")}
      />
      <p className="text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-[#0b67cc] sm:text-[0.65rem] sm:tracking-[0.18em]">Passo {step.number}</p>
      <h3 className="mt-1 text-[0.8rem] font-semibold leading-tight text-ink sm:mt-1.5 sm:text-xl">{step.title}</h3>
      <p className="mt-1.5 text-[0.66rem] leading-snug text-muted sm:mt-2 sm:text-[0.95rem] sm:leading-relaxed">{step.description}</p>
    </div>
  );
}
