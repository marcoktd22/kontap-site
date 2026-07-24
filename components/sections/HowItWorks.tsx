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

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal as="div" key={step.number} index={i} className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white/70 p-8 ring-hairline backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1.5 hover:ring-1 hover:ring-[color:rgba(46,123,255,0.45)] hover:shadow-[0_36px_80px_-38px_rgba(46,123,255,0.55)]">
                {/* Lavata di gradiente al passaggio/tocco */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(150deg, rgba(10,54,246,0.10) 0%, rgba(46,123,255,0.08) 45%, rgba(118,223,255,0.14) 100%)",
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
                    <span className="h-2 w-2 rounded-full bg-[#3d7eff]/40 transition-all duration-500 group-hover:scale-150 group-hover:bg-[#3d7eff]" />
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
