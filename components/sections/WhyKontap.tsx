import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { whyFeatures } from "@/lib/content";
import { cn } from "@/lib/cn";

export function WhyKontap() {
  return (
    <Section
      id="why"
      className="bg-dark-tech grid-faint overflow-hidden text-white"
    >

      <Container className="relative">
        <div className="flex flex-col items-center gap-5 text-center">
          <Reveal>
            <Eyebrow tone="dark">Perché Kontap</Eyebrow>
          </Reveal>
          <Reveal index={1}>
            <h2 className="text-gradient-invert-accent max-w-3xl text-balance text-4xl font-semibold sm:text-5xl md:text-[3.4rem]">
              Hardware di cui fidarti. Software che cresce con te.
            </h2>
          </Reveal>
          <Reveal index={2}>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-white/55 sm:text-lg">
              Kontap è progettato dall’inizio alla fine — prodotti fisici premium
              e la piattaforma che li fa parlare — così ogni tap è semplice e ogni
              interazione conta.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {whyFeatures.map((feature, i) => (
            <Reveal
              key={feature.title}
              index={i}
              className={cn(feature.span === "wide" && "md:col-span-2")}
            >
              <div className="group relative h-full overflow-hidden rounded-3xl bg-white/[0.035] p-8 ring-hairline-invert backdrop-blur-md transition-all duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:ring-1 hover:ring-[color:rgba(88,200,255,0.5)] hover:shadow-[0_30px_70px_-30px_rgba(36,83,255,0.6)]">
                {/* Lavata di gradiente al passaggio/tocco */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(36,83,255,0.20) 0%, rgba(88,200,255,0.18) 100%)",
                  }}
                />
                <div className="relative flex h-full flex-col">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-celeste/15 text-celeste ring-1 ring-white/10 transition-colors duration-500 group-hover:bg-celeste/25 group-hover:text-white">
                    <Icon name={feature.icon} />
                  </span>
                  <h3 className="mt-6 text-xl font-medium text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-pretty text-[0.95rem] leading-relaxed text-white/60">
                    {feature.description}
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
