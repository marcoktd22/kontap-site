import { Container } from "../ui/Container";
import { useCases } from "@/lib/content";

export function UseCases() {
  // Duplicate for a seamless marquee loop
  const items = [...useCases, ...useCases];

  return (
    <section
      id="usecases"
      aria-label="Industries using Kontap"
      className="relative scroll-mt-24 border-y border-[color:var(--color-line)] py-12"
    >
      <Container>
        <p className="text-center text-xs font-medium uppercase tracking-[0.22em] text-muted">
          One platform, every counter and pocket
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
          className="flex w-max items-center gap-4"
          style={{ animation: "kontap-marquee 34s linear infinite" }}
        >
          {items.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="inline-flex items-center gap-2.5 rounded-full bg-white/[0.03] px-5 py-2.5 text-sm text-secondary ring-hairline"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
