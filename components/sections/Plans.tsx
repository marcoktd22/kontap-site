import Link from "next/link";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { Coverflow } from "../ui/Coverflow";
import { CheckBadge } from "../ui/CheckBadge";
import { PlusLogo } from "../PlusLogo";
import { servicePlans, type ServicePlan } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * "Non vendiamo solo una targhetta" — i tre piani sotto la Hero, su un'isola
 * nel blu sfumato chiaro dell'header (con la griglia a quadratini), scritte
 * bianche e card in vetro chiaro in un coverflow 3D in loop.
 */
export function Plans() {
  return (
    <section id="piani" className="relative scroll-mt-24 overflow-x-clip px-2 py-4 text-white sm:px-4 sm:py-8">
      <div className="relative overflow-hidden rounded-[2rem] pb-16 pt-14 sm:rounded-[3rem] sm:pb-24 sm:pt-20">
        {/* Fondo: stesso blu sfumato dell'header + griglia a quadratini */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 45% at 50% 0%, rgba(140,200,255,0.35), transparent 70%)," +
              "radial-gradient(90% 110% at 5% 105%, rgba(90,175,245,0.55), transparent 60%)," +
              "linear-gradient(135deg, #0d76eb 0%, #0c6adf 35%, #0b55c1 70%, #0d43a1 100%)",
          }}
        >
          <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:46px_46px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_40%,transparent_95%)]" />
        </div>

        <Container className="relative">
          <div className="flex flex-col items-center text-center">
            <Reveal>
              <Eyebrow tone="dark">I piani Kontap</Eyebrow>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-5 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] text-white sm:text-5xl">
                Non vendiamo solo una targhetta.
              </h2>
            </Reveal>
            <Reveal index={2}>
              <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
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
      </div>
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
          ? "bg-[linear-gradient(140deg,#ffffff,rgba(190,225,255,0.6)_45%,#ffffff)] shadow-[0_0_30px_-6px_rgba(190,225,255,0.55),0_34px_70px_-30px_rgba(4,30,90,0.6)]"
          : "bg-[linear-gradient(160deg,rgba(255,255,255,0.7),rgba(255,255,255,0.15)_45%,rgba(255,255,255,0.4))] shadow-[0_34px_70px_-34px_rgba(4,30,90,0.6)]"
      )}
    >
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.75rem-1px)] p-6 text-white"
        style={{
          background: premium
            ? "radial-gradient(120% 70% at 100% 0%, rgba(190,225,255,0.4), transparent 55%), linear-gradient(165deg, #0b5ccc 0%, #0a4aa8 60%, #093f96 100%)"
            : "radial-gradient(110% 60% at 0% 0%, rgba(255,255,255,0.28), transparent 60%), linear-gradient(165deg, #3d95f2 0%, #1f7ce6 50%, #1569d4 100%)",
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
            "bg-white text-[#0b67cc]"
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
                <CheckBadge color="#ffffff" className="h-[15px] w-4" />
                {label}
              </li>
            );
          })}
          {more > 0 && (
            <li className="pl-[26px] text-[0.8rem] font-medium text-white/85">
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
