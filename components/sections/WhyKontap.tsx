import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { GradientBadge } from "../ui/GradientBadge";
import { BadgeIcon } from "../ui/BadgeIcon";
import { whyFeatures } from "@/lib/content";
import { BrandBackdrop } from "../BrandBackdrop";
import { cn } from "@/lib/cn";

export function WhyKontap() {
  return (
    <Section id="why" className="bg-light-tech grid-faint overflow-hidden">
      <BrandBackdrop variant="why" />
      <Container className="relative">
        <div className="flex flex-col items-center gap-5 text-center">
          <Reveal>
            <Eyebrow>Perché Kontap</Eyebrow>
          </Reveal>
          <Reveal index={1}>
            <h2 className="max-w-3xl text-balance text-4xl font-semibold sm:text-5xl md:text-[3.4rem]">
              <span className="text-gradient">Hardware di cui fidarti. </span>
              <span className="text-gradient-accent">Software che cresce con te.</span>
            </h2>
          </Reveal>
          <Reveal index={2}>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Kontap è progettato dall’inizio alla fine — la targa e la
              piattaforma che la fa parlare — così ogni tap è semplice e ogni
              interazione conta.
            </p>
          </Reveal>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:mt-16 sm:gap-4 md:grid-cols-3">
          {whyFeatures.map((feature, i) => (
            <Reveal
              key={feature.title}
              index={i}
              className={cn(feature.span === "wide" && "col-span-2")}
            >
              {/* Floating premium hardware card */}
              <div className="group relative h-full overflow-hidden rounded-[1.25rem] border-[1.5px] border-[#0b67cc]/45 bg-white p-4 shadow-[var(--shadow-card)] sm:rounded-3xl sm:p-8 transition-all duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:ring-1 hover:ring-[color:rgba(88,200,255,0.55)] hover:shadow-[0_24px_56px_-34px_rgba(36,83,255,0.2)]">
                <div className="relative flex h-full flex-col">
                  <GradientBadge className="h-10 w-10 sm:h-14 sm:w-14">
                    <BadgeIcon name={feature.icon} className="h-5 w-5 sm:h-7 sm:w-7" />
                  </GradientBadge>
                  <h3 className="mt-3 text-[0.95rem] font-semibold leading-snug text-ink sm:mt-5 sm:text-xl sm:font-medium">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-pretty text-[0.78rem] leading-snug text-muted sm:mt-3 sm:text-[0.95rem] sm:leading-relaxed">
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
