import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { Eyebrow } from "../ui/Eyebrow";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { LogoMark } from "../Logo";

const bullets = [
  "AI review analysis — sentiment, themes and what to fix next",
  "Automated reports delivered to your inbox",
  "Real-time tap analytics: traffic, timing and location",
  "One dashboard across every Kontap product",
];

export function Plus() {
  return (
    <Section id="plus" className="overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div>
            <Reveal>
              <Eyebrow>Subscription · Kontap Plus</Eyebrow>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 text-balance text-4xl font-semibold sm:text-5xl">
                <span className="text-gradient">Every tap becomes </span>
                <span className="text-gradient-accent">intelligence.</span>
              </h2>
            </Reveal>
            <Reveal index={2}>
              <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted">
                Plus is the subscription behind the hardware — shared
                infrastructure across every product. AI-powered review analysis,
                automated reports and analytics that tell you exactly what to do
                next.
              </p>
            </Reveal>

            <ul className="mt-8 flex flex-col gap-4">
              {bullets.map((b, i) => (
                <Reveal as="li" key={b} index={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-[color:var(--color-line-strong)]">
                    <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                  <span className="text-[0.95rem] leading-relaxed text-secondary">
                    {b}
                  </span>
                </Reveal>
              ))}
            </ul>

            <Reveal index={2}>
              <div className="mt-10">
                <Button href="#cta" size="lg">
                  Join the waitlist
                  <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Dashboard mock */}
          <Reveal index={1}>
            <DashboardMock />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function DashboardMock() {
  const stats = [
    { label: "Taps today", value: "2,841", delta: "+18%" },
    { label: "Conversion", value: "63%", delta: "+6%" },
    { label: "New reviews", value: "126", delta: "+24%" },
  ];

  return (
    <div className="relative">
      {/* Ambient glow */}
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-primary/15 blur-3xl" />

      <div className="overflow-hidden rounded-3xl bg-deep text-white ring-hairline-invert shadow-[0_40px_90px_-40px_rgba(7,11,26,0.6)]">
        {/* Window bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-3.5">
          <div className="flex items-center gap-2">
            <LogoMark className="h-4 w-4 text-white/80" />
            <span className="text-sm font-medium text-white">Kontap Plus</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </div>
        </div>

        <div className="p-5">
          {/* Stat tiles */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/[0.03] p-3.5 ring-hairline-invert">
                <p className="text-[0.65rem] uppercase tracking-wider text-white/50">
                  {s.label}
                </p>
                <p className="mt-1.5 text-xl font-semibold text-white">{s.value}</p>
                <p className="mt-1 text-[0.65rem] font-medium text-celeste">{s.delta}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="mt-3 rounded-2xl bg-white/[0.02] p-4 ring-hairline-invert">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-white">Taps · last 30 days</p>
              <span className="rounded-full bg-primary/20 px-2.5 py-1 text-[0.65rem] font-medium text-celeste">
                Live
              </span>
            </div>
            <Sparkline />
          </div>

          {/* AI insight */}
          <div className="mt-3 flex items-start gap-3 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent p-4 ring-hairline-invert">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-celeste/15 text-celeste">
              <Icon name="signal" className="h-4 w-4" />
            </span>
            <p className="text-[0.8rem] leading-relaxed text-white/70">
              <span className="font-medium text-white">AI insight · </span>
              Taps peak at 7–9pm on weekends. Move your review plate nearer the
              exit to capture 20% more scans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sparkline() {
  // Smooth area chart, brand-tinted. Static SVG — decorative.
  return (
    <svg viewBox="0 0 320 88" className="mt-3 w-full" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="plus-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A36F6" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0A36F6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="plus-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0A36F6" />
          <stop offset="100%" stopColor="#76DFFF" />
        </linearGradient>
      </defs>
      <path
        d="M0 66 C 26 60, 40 44, 66 46 S 108 66, 132 54 S 176 22, 200 30 S 250 60, 276 40 S 308 20, 320 16 L320 88 L0 88 Z"
        fill="url(#plus-fill)"
      />
      <path
        d="M0 66 C 26 60, 40 44, 66 46 S 108 66, 132 54 S 176 22, 200 30 S 250 60, 276 40 S 308 20, 320 16"
        stroke="url(#plus-stroke)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="320" cy="16" r="3.5" fill="#76DFFF" />
    </svg>
  );
}
