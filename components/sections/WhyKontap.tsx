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
              {/* Floating premium hardware card */}
              <div className="group relative h-full overflow-hidden rounded-3xl bg-white p-8 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_4px_10px_-4px_rgba(16,24,40,0.06),0_28px_56px_-30px_rgba(36,83,255,0.16),inset_0_1px_0_0_rgba(255,255,255,0.9)] ring-hairline transition-all duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:ring-1 hover:ring-[color:rgba(88,200,255,0.55)] hover:shadow-[0_1px_2px_rgba(16,24,40,0.05),0_6px_14px_-4px_rgba(16,24,40,0.08),0_40px_80px_-34px_rgba(36,83,255,0.3),inset_0_1px_0_0_rgba(255,255,255,0.95)]">
                <div className="relative flex h-full flex-col">
                  <GradientBadge>
                    <BadgeIcon name={feature.icon} />
                  </GradientBadge>
                  <h3 className="mt-6 text-xl font-medium text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-pretty text-[0.95rem] leading-relaxed text-muted">
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
