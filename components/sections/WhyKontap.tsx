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
      className="overflow-hidden bg-[color:var(--color-deepest)] text-white"
    >
      {/* Bagliore blu premium */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-[-12%] h-[55vh] w-[80vw] -translate-x-1/2 opacity-70 blur-[90px]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(61,126,255,0.28) 0%, rgba(13,15,20,0) 70%)",
          }}
        />
      </div>

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
              <div className="group relative h-full overflow-hidden rounded-3xl bg-[color:var(--color-panel)] p-8 ring-hairline-invert transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:ring-1 hover:ring-[color:rgba(118,223,255,0.5)] hover:shadow-[0_30px_70px_-30px_rgba(61,126,255,0.6)]">
                {/* Lavata di gradiente al passaggio/tocco */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(10,54,246,0.22) 0%, rgba(61,126,255,0.16) 45%, rgba(118,223,255,0.20) 100%)",
                  }}
                />
                <div className="relative flex h-full flex-col">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3d7eff]/15 text-[#6ea8ff] ring-1 ring-white/10 transition-colors duration-500 group-hover:bg-[#3d7eff]/25 group-hover:text-white">
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
