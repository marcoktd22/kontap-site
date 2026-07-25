import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { steps } from "@/lib/content";
import { BrandBackdrop } from "../BrandBackdrop";

export function HowItWorks() {
  return (
    <Section id="how" className="overflow-hidden">
      <BrandBackdrop variant="how" />
      <Container className="relative">
        <SectionHeader
          eyebrow="Come funziona"
          title="Dal tap al risultato in tre passi"
          description="Nessuna integrazione, nessuna curva di apprendimento. Kontap funziona dal momento in cui esce dalla scatola."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal as="div" key={step.number} index={i} className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-8 shadow-[var(--shadow-card)] ring-hairline transition-all duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:ring-1 hover:ring-[color:rgba(88,200,255,0.5)] hover:shadow-[0_28px_64px_-38px_rgba(36,83,255,0.35)]">
                {/* Lavata di gradiente al passaggio/tocco */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(150deg, rgba(36,83,255,0.09) 0%, rgba(88,200,255,0.13) 100%)",
                  }}
                />

                <div className="relative flex h-full flex-col">
                  {/* Numero romano */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-gradient-accent font-semibold leading-none tracking-tight"
                      style={{ fontSize: "3.25rem" }}
                    >
                      {step.number}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-celeste/40 transition-all duration-500 group-hover:scale-150 group-hover:bg-celeste" />
                  </div>

                  <div className="mt-8 h-px w-full bg-[color:var(--color-line)]" />

                  <h3 className="mt-6 text-xl font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-pretty text-[0.95rem] leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
