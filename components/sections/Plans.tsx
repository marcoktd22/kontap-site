import Link from "next/link";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { Coverflow } from "../ui/Coverflow";
import { CheckBadge } from "../ui/CheckBadge";
import { PlusLogo } from "../PlusLogo";
import { PlusHorizon } from "../PlusHorizon";
import { servicePlans, type ServicePlan } from "@/lib/content";
import { cn } from "@/lib/cn";

/** Blu notte della sezione: la cupola dell'orizzonte parte da qui. */
const NIGHT = "#0a1535";

/**
 * "Non vendiamo solo una targhetta" — i tre piani sotto la Hero, su un'isola
 * blu notte che sorge dall'orizzonte di luce. Card in vetro premium in un
 * coverflow 3D in loop.
 */
export function Plans() {
  return (
    <section id="piani" className="relative scroll-mt-24 overflow-x-clip pb-20 pt-28 text-white sm:pb-28 sm:pt-40 lg:pt-48">
      <PlusHorizon fill={NIGHT} />

      {/* Fondo blu notte con luci del brand */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[62px] overflow-hidden rounded-b-[2.5rem] sm:top-[94px] sm:rounded-b-[3.5rem] lg:top-[118px]"
        style={{
          background:
            "radial-gradient(70% 45% at 50% 0%, rgba(36,83,255,0.45), transparent 70%)," +
            "radial-gradient(40% 35% at 90% 70%, rgba(88,200,255,0.16), transparent 70%)," +
            "radial-gradient(40% 35% at 5% 85%, rgba(36,83,255,0.22), transparent 70%)," +
            `linear-gradient(180deg, ${NIGHT} 0%, #0b1a42 55%, #0d2052 100%)`,
        }}
      >
        {/* griglia tecnica appena accennata */}
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:46px_46px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000,transparent)]" />
      </div>

      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Eyebrow tone="dark">I piani Kontap</Eyebrow>
          </Reveal>
          <Reveal index={1}>
            <h2 className="mt-5 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl">
              Non vendiamo solo{" "}
              <span className="text-gradient-invert-accent">una targhetta.</span>
            </h2>
          </Reveal>
          <Reveal index={2}>
            <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
              La targa porta i clienti da te. I nostri piani fanno crescere la tua
              attività anche online.
            </p>
          </Reveal>
        </div>

        <Reveal index={3} className="mt-10 sm:mt-14">
          <Coverflow label="Piani Kontap" initial={1} tone="dark">
            {servicePlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </Coverflow>
        </Reveal>
      </Container>
    </section>
  );
}

const SHOWN = 5;

function PlanCard({ plan }: { plan: ServicePlan }) {
  const premium = Boolean(plan.premium);
  const shown = plan.items.slice(0, SHOWN);
  const more = plan.items.length - shown.length;
  const href = premium ? "/kontap-plus" : "/prezzi#servizi";

  return (
    // Bordo: vetro chiaro, o gradiente Kontap luminoso per il premium
    <div
      className={cn(
        "h-full rounded-[1.75rem] p-px",
        premium
          ? "bg-[linear-gradient(140deg,#6cceff,#2453ff_45%,#58c8ff)] shadow-[0_0_0_1px_rgba(88,200,255,0.25),0_30px_90px_-30px_rgba(88,200,255,0.55)]"
          : "bg-[linear-gradient(160deg,rgba(255,255,255,0.35),rgba(255,255,255,0.06)_45%,rgba(255,255,255,0.14))] shadow-[0_40px_80px_-36px_rgba(0,0,0,0.75)]"
      )}
    >
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.75rem-1px)] p-6"
        style={{
          background: premium
            ? "radial-gradient(120% 70% at 100% 0%, rgba(88,200,255,0.28), transparent 55%), linear-gradient(165deg, #16307a 0%, #0e1f55 55%, #0b1840 100%)"
            : "linear-gradient(165deg, rgba(40,62,130,0.92) 0%, rgba(18,33,80,0.95) 55%, rgba(12,24,62,0.97) 100%)",
        }}
      >
        {/* riflesso del materiale */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-1/4 top-0 h-full w-1/2 rotate-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)]"
        />

        <span
          className={cn(
            "relative self-start whitespace-nowrap rounded-full px-2.5 py-1 text-[0.7rem] font-semibold",
            premium ? "bg-brand-gradient-bright text-white" : "bg-[#0b67cc] text-white"
          )}
        >
          {plan.billing}
        </span>

        <h3 className="relative mt-4">
          {premium ? (
            <PlusLogo className="h-7 text-white" />
          ) : (
            <span className="block text-2xl font-bold leading-7 tracking-tight">{plan.name}</span>
          )}
        </h3>
        <p className="relative mt-2 text-pretty text-[0.9rem] leading-snug text-white/70">
          {plan.tagline}
        </p>

        <ul className="relative mt-5 flex flex-col gap-2.5 border-t border-white/10 pt-5">
          {shown.map((item) => {
            const label = typeof item === "string" ? item : item.label;
            return (
              <li key={label} className="flex items-center gap-2.5 text-[0.88rem] text-white/90">
                <CheckBadge color="#6cceff" className="h-[15px] w-4" />
                {label}
              </li>
            );
          })}
          {more > 0 && (
            <li className="pl-[26px] text-[0.8rem] font-medium text-[#8fdcff]">
              {more === 1 ? "+ 1 altro servizio incluso" : `+ altri ${more} servizi inclusi`}
            </li>
          )}
        </ul>

        <div className="relative mt-auto pt-6">
          <Link
            href={href}
            className={cn(
              "group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-[250ms] hover:-translate-y-0.5",
              premium
                ? "bg-white text-primary shadow-[0_12px_28px_-12px_rgba(0,0,0,0.5)]"
                : "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15"
            )}
          >
            {premium ? "Scopri Kontap+" : "Vedi i dettagli"}
            <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
