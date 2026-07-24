"use client";

import { useState } from "react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { faqs } from "@/lib/content";
import { cn } from "@/lib/cn";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq">
      <Container className="max-w-3xl">
        <SectionHeader
          eyebrow="FAQ"
          title="Domande, risposte"
          description="Tutto quello che devi sapere sull'hardware Kontap e sulla piattaforma che lo fa funzionare."
        />

        <div className="mt-14 flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <Reveal key={faq.question} index={i}>
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl bg-white transition-all duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)]",
                    isOpen
                      ? "shadow-[0_24px_60px_-34px_rgba(36,83,255,0.45)] ring-1 ring-[color:rgba(36,83,255,0.45)]"
                      : "shadow-[var(--shadow-card)] ring-hairline hover:-translate-y-0.5 hover:ring-1 hover:ring-[color:var(--color-line-strong)]"
                  )}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span
                        className={cn(
                          "text-[1.05rem] font-medium transition-colors duration-200",
                          isOpen ? "text-primary" : "text-ink"
                        )}
                      >
                        {faq.question}
                      </span>
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-hairline transition-all duration-300",
                          isOpen ? "rotate-180 bg-primary/10 text-primary" : "text-muted"
                        )}
                      >
                        <Icon
                          name={isOpen ? "minus" : "plus"}
                          className="h-4 w-4"
                          strokeWidth={2}
                        />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={cn(
                      "grid transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-pretty leading-relaxed text-muted">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
