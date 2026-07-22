import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Card } from "../ui/Card";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { GlowBackdrop } from "../ui/GlowBackdrop";
import { ProductVisual } from "../ProductVisual";
import { products } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Products() {
  return (
    <Section id="products">
      <GlowBackdrop variant="soft" />
      <Container>
        <SectionHeader
          eyebrow="Products"
          title="A tap for every surface"
          description="One technology, many forms. Each Kontap product is designed to feel premium in the hand and effortless for whoever taps it."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product, i) => (
            <Reveal
              key={product.name}
              index={i}
              className={cn(
                product.span === "wide" && "sm:col-span-2 md:col-span-2"
              )}
            >
              <Card interactive className="group flex h-full flex-col p-6 sm:p-7">
                <ProductVisual
                  visual={product.visual}
                  className={cn(
                    "mb-6 w-full",
                    product.span === "wide" ? "h-56" : "h-52"
                  )}
                />
                <div className="mt-auto">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                    {product.tagline}
                  </p>
                  <h3 className="mt-2 flex items-center gap-2 text-xl font-medium text-white">
                    {product.name}
                    <Icon
                      name="arrow"
                      className="h-4 w-4 -translate-x-1 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100"
                    />
                  </h3>
                  <p className="mt-2 text-pretty text-[0.95rem] leading-relaxed text-muted">
                    {product.description}
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
