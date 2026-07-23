import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { steps } from "@/lib/content";

export function HowItWorks() {
  return (
    <Section id="how">
      <Container>
        <SectionHeader
          eyebrow="Come funziona"
          title="Dal tap al risultato in tre passi"
          description="Nessuna integrazione, nessuna curva di apprendimento. Kontap funziona dal momento in cui esce dalla scatola."
        />

        <div className="relative mt-16">
          {/* Connecting light line (desktop) */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[2.15rem] hidden h-px md:block"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(118,223,255,0.35) 20%, rgba(10,54,246,0.5) 50%, rgba(118,223,255,0.35) 80%, transparent)",
            }}
          />

          <ol className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step, i) => (
              <Reveal as="li" key={step.number} index={i} className="relative">
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                  <span className="relative z-10 flex h-[4.3rem] w-[4.3rem] items-center justify-center rounded-2xl bg-surface text-lg font-semibold ring-hairline shadow-[0_18px_40px_-20px_rgba(10,54,246,0.4)]">
                    <span className="font-mono text-sm text-primary">{step.number}</span>
                  </span>
                  <h3 className="mt-6 text-xl font-medium text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-pretty text-[0.95rem] leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
