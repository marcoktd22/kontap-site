import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Card } from "../ui/Card";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { GlowBackdrop } from "../ui/GlowBackdrop";
import { whyFeatures } from "@/lib/content";
import { cn } from "@/lib/cn";

export function WhyKontap() {
  return (
    <Section id="why">
      <GlowBackdrop variant="soft" />
      <Container>
        <SectionHeader
          eyebrow="Why Kontap"
          title="Hardware people trust. Software that scales."
          description="Kontap is engineered end to end — premium physical products and the platform behind them — so every tap feels effortless and every interaction counts."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {whyFeatures.map((feature, i) => (
            <Reveal
              key={feature.title}
              index={i}
              className={cn(feature.span === "wide" && "md:col-span-2")}
            >
              <Card interactive className="h-full">
                <div className="flex h-full flex-col">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-accent ring-1 ring-[color:var(--color-line-strong)]">
                    <Icon name={feature.icon} />
                  </span>
                  <h3 className="mt-6 text-xl font-medium text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-pretty text-[0.95rem] leading-relaxed text-muted">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
