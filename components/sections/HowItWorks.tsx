import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { GradientBadge } from "../ui/GradientBadge";
import { steps } from "@/lib/content";
import { BrandBackdrop } from "../BrandBackdrop";

export function HowItWorks() {
  return (
    <Section
      id="how"
      className="overflow-hidden"
      style={{
        background:
          "radial-gradient(62% 52% at 50% 0%, rgba(88,200,255,0.16), transparent 60%)," +
          "linear-gradient(180deg, #eef4ff 0%, #dde9ff 100%)",
      }}
    >
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
              <div className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white p-8 shadow-[0_2px_4px_rgba(16,24,40,0.04),0_28px_60px_-34px_rgba(36,83,255,0.28)] ring-hairline transition-all duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1.5 hover:shadow-[0_36px_80px_-38px_rgba(36,83,255,0.42)] hover:ring-1 hover:ring-[color:rgba(88,200,255,0.55)]">
                {/* Accento a gradiente in alto */}
                <span
                  aria-hidden="true"
                  className="bg-brand-gradient absolute inset-x-0 top-0 h-[3px] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                />

                {/* Numero romano nel badge condiviso — stesso linguaggio delle icone */}
                <GradientBadge>
                  <span className="text-xl font-semibold">{step.number}</span>
                </GradientBadge>

                <h3 className="mt-7 text-xl font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-pretty text-[0.95rem] leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
