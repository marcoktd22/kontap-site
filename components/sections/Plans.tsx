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
 * a lamelle diagonali lucide nel gradiente Kontap; card bianche con bordo
 * #0b67cc in un coverflow 3D in loop.
 */
export function Plans() {
  return (
    <section id="piani" className="relative scroll-mt-24 overflow-x-clip px-2 py-4 text-white sm:px-4 sm:py-8">
      <div className="relative overflow-hidden rounded-[2rem] pb-16 pt-14 sm:rounded-[3rem] sm:pb-24 sm:pt-20">
        {/* Fondo: lamelle diagonali lucide nel gradiente Kontap */}
        <KontapSlats />

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

/**
 * Lamelle diagonali lucide (stile metallo/vetro) nel blu Kontap, solo CSS:
 * base a gradiente, corpo delle lamelle con riflesso cilindrico, filo di luce
 * sul bordo di ognuna, onde di luce morbide e vignettatura ai lati.
 */
function KontapSlats() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background: [
            // filo di luce + fessura scura tra una lamella e l'altra
            "repeating-linear-gradient(130deg, rgba(150,205,255,0.55) 0 1.5px, rgba(1,6,26,0.75) 1.5px 6px, transparent 6px 124px)",
            // corpo lucido della lamella (riflesso cilindrico)
            "repeating-linear-gradient(130deg, rgba(1,6,26,0.55) 0px, rgba(13,118,235,0) 34px, rgba(110,175,255,0.26) 86px, rgba(1,6,26,0.4) 124px)",
            // seconda trama più larga per rompere la regolarità
            "repeating-linear-gradient(130deg, transparent 0 150px, rgba(120,185,255,0.1) 150px 210px, transparent 210px 330px)",
            // base: gradiente Kontap dal blu brillante al navy
            "linear-gradient(135deg, #0d76eb 0%, #0b55c1 38%, #0a2f7a 68%, #041236 100%)",
          ].join(","),
        }}
      />
      {/* onde di luce che scorrono sulle lamelle */}
      <div className="absolute -left-[10%] top-[8%] h-[38%] w-[70%] rotate-[-40deg] rounded-[50%] bg-[radial-gradient(closest-side,rgba(90,170,255,0.45),transparent)] blur-2xl" />
      <div className="absolute -right-[12%] bottom-[4%] h-[34%] w-[64%] rotate-[-40deg] rounded-[50%] bg-[radial-gradient(closest-side,rgba(60,140,255,0.4),transparent)] blur-2xl" />
      {/* vignettatura: più profondo ai bordi, contenuto leggibile al centro */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_42%,transparent_35%,rgba(2,8,30,0.6)_100%)]" />
    </div>
  );
}

/** Servizi mostrati per piano: il resto diventa "+N servizi" (curiosità). */
const SHOWN: Record<ServicePlan["id"], number> = { base: 3, grow: 4, plus: 5 };

function PlanCard({ plan }: { plan: ServicePlan }) {
  const premium = Boolean(plan.premium);
  const shown = plan.items.slice(0, SHOWN[plan.id]);
  const more = plan.items.length - shown.length;
  const href = premium ? "/kontap-plus" : "/prezzi#servizi";

  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border-[1.5px] border-[#0b67cc] bg-white p-6 text-ink",
        premium
          ? "shadow-[0_0_0_4px_rgba(11,103,204,0.18),0_34px_70px_-28px_rgba(1,8,30,0.75)]"
          : "shadow-[0_34px_70px_-30px_rgba(1,8,30,0.7)]"
      )}
    >
      <span className="relative self-start whitespace-nowrap rounded-full bg-[#0b67cc] px-2.5 py-1 text-[0.7rem] font-semibold text-white">
        {plan.billing}
      </span>

      <h3 className="relative mt-4">
        {premium ? (
          <PlusLogo className="h-7 text-[#0b0c10]" />
        ) : (
          <span className="block text-2xl font-bold leading-7 tracking-tight text-[#0b0c10]">{plan.name}</span>
        )}
      </h3>
      <p className="relative mt-2 text-pretty text-[0.9rem] leading-snug text-secondary">{plan.tagline}</p>

      <ul className="relative mt-5 flex flex-col gap-2.5 border-t border-[color:var(--color-line)] pt-5">
        {shown.map((item) => {
          const label = typeof item === "string" ? item : item.label;
          return (
            <li key={label} className="flex items-center gap-2.5 text-[0.88rem] text-secondary">
              <CheckBadge className="h-[15px] w-4" />
              {label}
            </li>
          );
        })}
      </ul>
      {more > 0 && (
        <Link
          href={href}
          className="relative mt-4 inline-flex items-center gap-1.5 self-start rounded-full bg-[#0b67cc]/10 px-3 py-1.5 text-[0.8rem] font-semibold text-[#0b67cc] ring-1 ring-[#0b67cc]/25 transition-colors hover:bg-[#0b67cc]/15"
        >
          +{more} servizi
          <Icon name="arrow" className="h-3.5 w-3.5" />
        </Link>
      )}

      <div className="relative mt-auto pt-6">
        <Link
          href={href}
          className={cn(
            "group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-[250ms] hover:-translate-y-0.5",
            premium
              ? "bg-brand-gradient text-white shadow-[0_12px_28px_-12px_rgba(11,103,204,0.7)]"
              : "bg-white text-[#0b67cc] ring-1 ring-[#0b67cc]/40 hover:ring-[#0b67cc]"
          )}
        >
          {premium ? "Scopri Kontap+" : "Vedi i dettagli"}
          <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
