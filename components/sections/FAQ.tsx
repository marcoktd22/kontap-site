"use client";

import { useState } from "react";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { faqs } from "@/lib/content";
import { cn } from "@/lib/cn";

const TICKER_CLASS =
  "whitespace-nowrap text-[13px] font-extrabold uppercase leading-none tracking-[0.2em]";
const TICKER_STYLE = {
  backgroundImage: "linear-gradient(90deg,#2453ff,#58c8ff)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
} as const;

/**
 * Infinite ticker — a subtle premium branding band framing the FAQ. One long,
 * varied brand sequence (never the same short phrase repeated) that loops only
 * after a long distance. Kontap gradient on the letters, white bar with a 1px
 * gradient hairline. Two identical copies translated by -50% = seamless loop
 * with no visible reset; `reverse` flips the direction so the top and bottom
 * bars scroll in opposite directions. Slow (~44s) — noticed once, not a marquee.
 */
function Ticker({
  text,
  reps,
  reverse,
}: {
  text: string;
  reps: number;
  reverse?: boolean;
}) {
  const line = text.repeat(reps);
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
            animation: "kontap-marquee 44s linear infinite",
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

const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
    <path
      d="M7 17 17 7M9 7h8v8"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24">
      {/* Barra superiore — scorre da sinistra a destra */}
      <Ticker
        text="NFC TECHNOLOGY • TOUCH THE FUTURE • PREMIUM HARDWARE • SMART INTERACTIONS • "
        reps={4}
        reverse
      />

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

            {/* Colonna destra — card (identiche alla versione precedente) */}
            <div className="flex flex-col gap-3.5">
              {faqs.map((faq, i) => {
                const isOpen = open === i;
                const panelId = `faq-panel-${i}`;
                const buttonId = `faq-button-${i}`;
                return (
                  <Reveal as="div" key={faq.question} index={Math.min(i, 3)}>
                    <div
                      className={cn(
                        "group relative rounded-2xl border transition-all duration-[350ms] ease-[cubic-bezier(0.25,1,0.5,1)]",
                        isOpen
                          ? "border-transparent [background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(135deg,#2453ff,#58c8ff)_border-box] shadow-[0_12px_34px_-14px_rgba(36,83,255,0.32)]"
                          : "border-[color:var(--color-line)] bg-white/80 shadow-[0_1px_2px_rgba(16,24,40,0.03),0_18px_40px_-30px_rgba(36,83,255,0.22)] backdrop-blur-sm hover:-translate-y-0.5 hover:border-transparent hover:[background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(135deg,#2453ff,#58c8ff)_border-box] hover:shadow-[0_16px_38px_-18px_rgba(36,83,255,0.3)]"
                      )}
                    >
                      <h3>
                        <button
                          id={buttonId}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setOpen(isOpen ? null : i)}
                          className="flex w-full items-start justify-between gap-6 px-6 py-5 text-left sm:px-7 sm:py-6"
                        >
                          <span
                            className={cn(
                              "text-lg font-medium leading-snug transition-colors duration-200",
                              isOpen
                                ? "text-gradient-accent"
                                : "text-ink group-hover:text-primary"
                            )}
                          >
                            {faq.question}
                          </span>
                          <span
                            className={cn(
                              "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:duration-200",
                              isOpen
                                ? "bg-brand-gradient rotate-45 border-transparent text-white shadow-[0_8px_20px_-8px_rgba(36,83,255,0.55)]"
                                : "border-[color:var(--color-line)] text-muted group-hover:border-[color:rgba(88,200,255,0.6)] group-hover:text-primary"
                            )}
                          >
                            <ArrowUpRight />
                          </span>
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
                              "max-w-2xl px-6 pb-6 pr-12 text-pretty leading-relaxed text-secondary transition-transform duration-[520ms] ease-[cubic-bezier(0.25,1,0.5,1)] sm:px-7 sm:pb-7",
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
      <Ticker
        text="MADE IN APULIA • ONE PLATFORM • AI INSIGHTS • GOOGLE REVIEWS • BUILT FOR LOCAL BUSINESSES • "
        reps={3}
      />
    </section>
  );
}
