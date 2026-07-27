"use client";

import { useState } from "react";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { faqs } from "@/lib/content";
import { cn } from "@/lib/cn";

const TICKER_CLASS =
  "whitespace-nowrap text-[13px] font-extrabold uppercase tracking-[0.16em]";
const TICKER_STYLE = {
  backgroundImage: "linear-gradient(90deg,#2453ff,#58c8ff)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
} as const;

/**
 * Infinite gradient ticker — a premium band that frames the FAQ. Two identical
 * copies translated by -50% give a seamless loop; `reverse` flips the scroll
 * direction so the top and bottom bars move in opposite directions.
 */
function Ticker({ text, reverse }: { text: string; reverse?: boolean }) {
  const line = text.repeat(8);
  return (
    <div
      aria-hidden="true"
      className="relative h-[46px] w-full overflow-hidden bg-white"
    >
      <span
        className="absolute inset-x-0 top-0 z-10 h-px"
        style={{ background: "linear-gradient(90deg,#2453ff,#58c8ff)" }}
      />
      <div className="absolute inset-0 flex items-center">
        <div
          className="flex w-max flex-none will-change-transform"
          style={{
            animation: "kontap-marquee 45s linear infinite",
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          <span className={TICKER_CLASS} style={TICKER_STYLE}>
            {line}
          </span>
          <span className={TICKER_CLASS} style={TICKER_STYLE}>
            {line}
          </span>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24">
      {/* Gradiente condiviso per le frecce */}
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <defs>
          <linearGradient id="faq-arrow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2453ff" />
            <stop offset="1" stopColor="#58c8ff" />
          </linearGradient>
        </defs>
      </svg>

      {/* Barra superiore — scorre da sinistra a destra */}
      <Ticker text="NFC TECHNOLOGY • TOUCH THE FUTURE • " reverse />

      <div className="bg-light-tech grid-faint relative overflow-hidden py-24 sm:py-32 md:py-40">
        <Container className="relative">
          <div className="grid grid-cols-1 gap-x-20 gap-y-14 lg:grid-cols-[0.82fr_1.18fr]">
            {/* Colonna sinistra — protagonista */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <Eyebrow align="left">FAQ</Eyebrow>
              </Reveal>
              <Reveal index={1}>
                <h2 className="mt-5 text-balance text-5xl font-black leading-[1.02] tracking-[-0.02em] text-[#111827] md:text-[3.5rem]">
                  Domande,
                  <br />
                  risposte
                </h2>
              </Reveal>
              <Reveal index={2}>
                <p className="mt-6 max-w-xs text-pretty text-lg leading-relaxed text-secondary">
                  Tutto quello che devi sapere sull&apos;hardware Kontap e sulla
                  piattaforma che lo fa funzionare.
                </p>
              </Reveal>
            </div>

            {/* Colonna destra — card */}
            <div className="flex flex-col gap-4">
              {faqs.map((faq, i) => {
                const isOpen = open === i;
                const panelId = `faq-panel-${i}`;
                const buttonId = `faq-button-${i}`;
                return (
                  <Reveal as="div" key={faq.question} index={Math.min(i, 3)}>
                    <div
                      className={cn(
                        "group rounded-[22px] border bg-white transition-all duration-[350ms] ease-[cubic-bezier(0.25,1,0.5,1)]",
                        isOpen
                          ? "border-[color:rgba(88,200,255,0.7)] shadow-[0_16px_40px_-22px_rgba(36,83,255,0.3)]"
                          : "border-[color:var(--color-line)] shadow-[0_1px_2px_rgba(16,24,40,0.03),0_10px_30px_-24px_rgba(16,24,40,0.2)] hover:-translate-y-0.5 hover:border-[color:rgba(88,200,255,0.6)] hover:shadow-[0_14px_34px_-22px_rgba(36,83,255,0.28)]"
                      )}
                    >
                      <h3>
                        <button
                          id={buttonId}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setOpen(isOpen ? null : i)}
                          className="flex w-full items-center justify-between gap-7 px-7 py-7 text-left sm:px-8"
                        >
                          <span className="text-lg font-semibold leading-snug text-ink">
                            {faq.question}
                          </span>
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            className={cn(
                              "h-6 w-6 flex-none transition-transform duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)]",
                              isOpen ? "rotate-0" : "-rotate-90"
                            )}
                          >
                            <path
                              d="M6 9l6 6 6-6"
                              stroke="url(#faq-arrow)"
                              strokeWidth={2.6}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </h3>
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className={cn(
                          "grid transition-all duration-[520ms] ease-[cubic-bezier(0.25,1,0.5,1)]",
                          isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        )}
                      >
                        <div className="overflow-hidden">
                          <p
                            className={cn(
                              "max-w-2xl px-7 pb-7 text-pretty leading-relaxed text-secondary transition-transform duration-[520ms] ease-[cubic-bezier(0.25,1,0.5,1)] sm:px-8",
                              isOpen ? "translate-y-0" : "translate-y-1"
                            )}
                          >
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Container>
      </div>

      {/* Barra inferiore — scorre da destra a sinistra (direzione opposta) */}
      <Ticker text="KONTAP • MADE IN APULIA • " />
    </section>
  );
}
