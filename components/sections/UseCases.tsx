import { Container } from "../ui/Container";
import { BrandIcon } from "../BrandIcon";
import { destinations } from "@/lib/content";

export function UseCases() {
  // Duplicato per un loop continuo del nastro
  const items = [...destinations, ...destinations];

  return (
    <section
      id="usecases"
      aria-label="Destinazioni che un tap può aprire"
      className="relative scroll-mt-24 border-y border-[color:var(--color-line)] py-12"
    >
      <Container>
        <p className="text-center text-sm font-bold uppercase tracking-[0.22em] text-ink">
          Un tap. Qualsiasi destinazione.
        </p>
      </Container>

      <div
        className="relative mt-8 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <div
          className="flex w-max items-center gap-12 sm:gap-16"
          style={{ animation: "kontap-marquee 34s linear infinite" }}
        >
          {items.map((d, i) => (
            <span
              key={`${d.name}-${i}`}
              className="inline-flex items-center gap-2.5"
            >
              <BrandIcon name={d.icon} className="h-6 w-6 text-[#3d7eff]" />
              <span
                className="bg-clip-text text-lg font-bold tracking-tight text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, #141720 0%, #3d7eff 100%)",
                }}
              >
                {d.name}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
