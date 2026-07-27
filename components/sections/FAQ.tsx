"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { faqs } from "@/lib/content";
import { cn } from "@/lib/cn";

const TILE = "TOUCH THE FUTURE • KONTAP • MADE IN APULIA • ";
const REPS = 6;

/**
 * A giant, soft Kontap ribbon anchored to a corner, with the brand line
 * following the path and drifting slowly & seamlessly. Pure vector: crisp at
 * any size. The stroke fades to transparent toward the content so it never
 * invades it. Seamless loop = shift startOffset by exactly one repeated tile,
 * measured on the client.
 */
function Curve({
  id,
  d,
  grad,
  dir,
  className,
}: {
  id: string;
  d: string;
  grad: [number, number, number, number];
  dir: 1 | -1;
  className: string;
}) {
  const textRef = useRef<SVGTextElement>(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    const t = textRef.current;
    if (!t) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      setShift(t.getComputedTextLength() / REPS);
    } catch {
      /* getComputedTextLength unsupported — leave static */
    }
  }, []);

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute", className)}
      viewBox="0 0 700 700"
      fill="none"
    >
      <defs>
        <linearGradient id={`${id}-g`} x1={grad[0]} y1={grad[1]} x2={grad[2]} y2={grad[3]}>
          <stop offset="0" stopColor="#315EFB" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#58C8FF" stopOpacity="0.4" />
          <stop offset="1" stopColor="#6CCEFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        id={id}
        d={d}
        stroke={`url(#${id}-g)`}
        strokeWidth="48"
        strokeLinecap="round"
        style={{ filter: "blur(0.4px)" }}
      />
      <text
        ref={textRef}
        fill="#ffffff"
        fillOpacity="0.9"
        fontSize="16"
        fontWeight={500}
        letterSpacing="5"
        dominantBaseline="middle"
      >
        <textPath href={`#${id}`} startOffset="0">
          {shift > 0 && (
            <animate
              attributeName="startOffset"
              from="0"
              to={dir * shift}
              dur="14s"
              repeatCount="indefinite"
            />
          )}
          {TILE.repeat(REPS)}
        </textPath>
      </text>
    </svg>
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
    <section
      id="faq"
      className="bg-light-tech grid-faint relative scroll-mt-24 overflow-hidden py-28 sm:py-36 md:py-48"
    >
      {/* Curve decorative Kontap — angolo alto-sinistra e basso-destra */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Curve
          id="faq-curve-tl"
          className="left-[-9%] top-[-11%] w-[74%] sm:w-[62%] lg:w-[56%]"
          d="M -40 430 C 130 170 380 80 780 150"
          grad={[0, 1, 1, 0]}
          dir={-1}
        />
        <Curve
          id="faq-curve-br"
          className="right-[-9%] bottom-[-11%] w-[74%] sm:w-[62%] lg:w-[56%]"
          d="M -80 560 C 320 630 570 540 740 280"
          grad={[1, 0, 0, 1]}
          dir={1}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-x-20 gap-y-14 lg:grid-cols-[0.82fr_1.18fr]">
          {/* Colonna sinistra — pulita e minimale */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Eyebrow align="left">FAQ</Eyebrow>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.03] sm:text-5xl md:text-[3.25rem]">
                <span className="text-gradient">
                  Domande,
                  <br />
                  risposte
                </span>
              </h2>
            </Reveal>
            <Reveal index={2}>
              <p className="mt-6 max-w-xs text-pretty leading-relaxed text-muted">
                Tutto quello che devi sapere sull&apos;hardware Kontap e sulla
                piattaforma che lo fa funzionare.
              </p>
            </Reveal>
          </div>

          {/* Colonna destra — card */}
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
    </section>
  );
}
