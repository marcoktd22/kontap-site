"use client";

import { useState } from "react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { BrandBackdrop } from "../BrandBackdrop";
import { faqs } from "@/lib/content";
import { cn } from "@/lib/cn";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" className="overflow-hidden">
      <BrandBackdrop variant="faq" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-[0.8fr_1.15fr]">
          {/* Colonna sinistra — intestazione */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              align="left"
              eyebrow="FAQ"
              title="Domande, risposte"
              description="Tutto quello che devi sapere sull'hardware Kontap e sulla piattaforma che lo fa funzionare."
            />
          </div>

          {/* Colonna destra — elenco premium */}
          <Reveal index={1}>
            <ul className="border-t border-[color:var(--color-line)]">
              {faqs.map((faq, i) => {
                const isOpen = open === i;
                const panelId = `faq-panel-${i}`;
                const buttonId = `faq-button-${i}`;
                return (
                  <li
                    key={faq.question}
                    className="border-b border-[color:var(--color-line)]"
                  >
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                      >
                        <span
                          className={cn(
                            "text-lg font-medium leading-snug transition-colors duration-200",
                            isOpen ? "text-primary" : "text-ink group-hover:text-primary"
                          )}
                        >
                          {faq.question}
                        </span>
                        {/* Toggle custom — + che si trasforma in − e si riempie di gradiente */}
                        <span
                          className={cn(
                            "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]",
                            isOpen
                              ? "bg-[linear-gradient(135deg,#2453ff,#58c8ff)] text-white shadow-[0_8px_20px_-8px_rgba(36,83,255,0.6)]"
                              : "text-muted ring-hairline group-hover:text-primary group-hover:ring-1 group-hover:ring-[color:rgba(88,200,255,0.5)]"
                          )}
                        >
                          <span className="relative block h-3.5 w-3.5">
                            <span className="absolute left-1/2 top-1/2 h-[1.7px] w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                            <span
                              className={cn(
                                "absolute left-1/2 top-1/2 h-full w-[1.7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-transform duration-300",
                                isOpen ? "scale-y-0" : "scale-y-100"
                              )}
                            />
                          </span>
                        </span>
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={cn(
                        "grid transition-all duration-[350ms] ease-[cubic-bezier(0.25,1,0.5,1)]",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-xl pb-7 pr-10 text-pretty leading-relaxed text-secondary">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
