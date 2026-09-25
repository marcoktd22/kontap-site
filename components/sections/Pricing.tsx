import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { CheckBadge } from "../ui/CheckBadge";
import { ContactIcon } from "../ContactIcon";
import { PlusLogo } from "../PlusLogo";
import { BrandBackdrop } from "../BrandBackdrop";
import {
  plateOffers,
  servicePlans,
  whatsappHref,
  type PlateOffer,
  type ServicePlan,
} from "@/lib/content";
import { cn } from "@/lib/cn";

/** Bordo a gradiente Kontap (stesso trucco delle card FAQ). */
const GRADIENT_BORDER =
  "border border-transparent [background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(135deg,#2453ff,#58c8ff)_border-box]";

const WA_LINK = { target: "_blank", rel: "noopener noreferrer" } as const;

/* ------------------------------------------------------------------ */
/* Targhe                                                              */
/* ------------------------------------------------------------------ */

export function PlatePricing() {
  return (
    <Section id="targhe" className="pt-32 sm:pt-44">
      <Container>
        <SectionHeader
          eyebrow="Prezzi"
          title={
            <>
              <span className="text-gradient">La tua targa, </span>
              <span className="text-gradient-accent">in sconto.</span>
            </>
          }
          description="Prezzi IVA inclusa. Montaggio e configurazione sono compresi."
        />

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2 md:gap-5">
          {plateOffers.map((offer, i) => (
            <Reveal key={offer.id} index={i} className="h-full">
              <PlateCard offer={offer} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function PlateCard({ offer }: { offer: PlateOffer }) {
  const featured = Boolean(offer.badge);
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-[1.75rem] p-6 sm:p-8",
        featured
          ? cn(GRADIENT_BORDER, "border-[1.5px] shadow-[0_28px_70px_-34px_rgba(36,83,255,0.55)]")
          : "bg-white shadow-[var(--shadow-card)] ring-hairline"
      )}
    >
      {featured && (
        <span className="bg-brand-gradient absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold text-white shadow-[0_10px_24px_-10px_rgba(36,83,255,0.7)]">
          <Icon name="star" className="h-3.5 w-3.5" strokeWidth={2} />
          {offer.badge}
        </span>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-ink">{offer.name}</h3>
          <p className="mt-2 text-pretty text-[0.95rem] leading-relaxed text-muted">
            {offer.description}
          </p>
        </div>
        <PlateVisual count={featured ? 3 : 1} />
      </div>

      {/* Prezzo */}
      <div className="mt-7 flex flex-wrap items-end gap-x-3 gap-y-2">
        <span className="text-[2.75rem] font-semibold leading-none tracking-tight text-ink">
          {offer.price}
          <span className="ml-1 text-2xl">€</span>
        </span>
        <span className="pb-1 text-lg text-muted line-through decoration-[1.5px]">
          {offer.was} €
        </span>
        <span className="mb-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
          {offer.discount}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted">
        IVA inclusa
        {offer.unitNote && (
          <>
            {" · "}
            <span className="font-medium text-primary">{offer.unitNote}</span>
          </>
        )}
      </p>

      <ul className="mb-8 mt-6 flex flex-col gap-3 border-t border-[color:var(--color-line)] pt-6">
        {offer.perks.map((perk) => (
          <li key={perk} className="flex items-center gap-3 text-[0.95rem] text-secondary">
            <CheckBadge className="h-[18px] w-[19px]" />
            {perk}
          </li>
        ))}
      </ul>

      <a
        href={whatsappHref(offer.order)}
        {...WA_LINK}
        className={cn(
          "group mt-auto inline-flex h-[3.25rem] w-full items-center justify-center gap-2 rounded-full text-base font-medium transition-all duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-0.5",
          featured
            ? "bg-brand-gradient text-white shadow-[0_12px_28px_-12px_rgba(36,83,255,0.6)]"
            : "bg-white text-ink ring-hairline hover:ring-1 hover:ring-[color:rgba(88,200,255,0.6)]"
        )}
      >
        <ContactIcon id="whatsapp" className={featured ? "text-white" : "text-primary"} />
        Ordina su WhatsApp
      </a>
    </div>
  );
}

/** Miniatura del prodotto: una targa, o un piccolo ventaglio per il bundle. */
function PlateVisual({ count }: { count: 1 | 3 }) {
  const plates = count === 1 ? [0] : [-12, 0, 12];
  return (
    <div aria-hidden="true" className="relative mt-1 h-16 w-16 shrink-0 sm:h-[4.5rem] sm:w-[4.5rem]">
      {plates.map((deg, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={deg}
          src="/products/review-plate-front.webp"
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full rounded-[18%] shadow-[0_8px_18px_-8px_rgba(16,24,40,0.35)]"
          style={{
            transform: `rotate(${deg}deg) translateX(${deg * 0.35}px)`,
            zIndex: i === 1 || count === 1 ? 2 : 1,
          }}
        />
      ))}
      {count === 3 && (
        <span className="bg-brand-gradient absolute -bottom-2 -right-2 z-10 flex h-7 min-w-7 items-center justify-center rounded-full px-1.5 text-xs font-bold text-white ring-2 ring-white">
          ×5
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Servizi                                                             */
/* ------------------------------------------------------------------ */

export function ServicePricing() {
  return (
    <Section id="servizi" className="bg-light-tech grid-faint overflow-hidden">
      <BrandBackdrop variant="why" />
      <Container className="relative">
        <SectionHeader
          eyebrow="Servizi"
          title={
            <>
              <span className="text-gradient">Dalla targa </span>
              <span className="text-gradient-accent">alla crescita.</span>
            </>
          }
          description="Tre livelli per far crescere la tua presenza digitale: dal primo ordine all'analisi continua."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 lg:grid-cols-3">
          {servicePlans.map((plan, i) => (
            <Reveal key={plan.id} index={i} className="h-full">
              <ServiceCard plan={plan} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ServiceCard({ plan }: { plan: ServicePlan }) {
  const premium = Boolean(plan.premium);
  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-6 sm:p-8",
        premium
          ? cn(GRADIENT_BORDER, "border-[1.5px] shadow-[0_32px_80px_-36px_rgba(36,83,255,0.6)]")
          : "bg-white shadow-[var(--shadow-card)] ring-hairline"
      )}
    >
      {premium && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(88,200,255,0.3),transparent_70%)]"
        />
      )}

      <span
        className={cn(
          "relative self-start whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold",
          premium ? "bg-brand-gradient text-white" : "bg-primary/10 text-primary"
        )}
      >
        {plan.billing}
      </span>
      <div className="relative mt-4">
        {premium ? (
          <h3>
            <PlusLogo className="h-8 text-ink" />
          </h3>
        ) : (
          <h3 className="text-2xl font-semibold tracking-tight text-ink">{plan.name}</h3>
        )}
      </div>
      <p className="relative mt-3 text-pretty text-[0.95rem] leading-relaxed text-secondary">
        {plan.tagline}
      </p>

      <p className="relative mt-6 border-t border-[color:var(--color-line)] pt-5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">
        {plan.includes}
      </p>
      <ul className="relative mt-4 flex flex-col gap-3">
        {plan.items.map((item) => {
          const label = typeof item === "string" ? item : item.label;
          return (
            <li key={label} className="flex items-start gap-3">
              <CheckBadge className="mt-[3px] h-[18px] w-[19px]" />
              <div>
                <span className="text-[0.95rem] font-medium text-ink">{label}</span>
                {typeof item !== "string" && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.details.map((d) => (
                      <span
                        key={d}
                        className="rounded-full bg-surface px-2.5 py-1 text-[0.72rem] font-medium text-secondary ring-hairline"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="relative mt-auto pt-8">
        <a
          href={whatsappHref(plan.cta)}
          {...WA_LINK}
          className={cn(
            "group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-[0.95rem] font-medium transition-all duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-0.5",
            premium
              ? "bg-brand-gradient text-white shadow-[0_12px_28px_-12px_rgba(36,83,255,0.6)]"
              : "bg-white text-ink ring-hairline hover:ring-1 hover:ring-[color:rgba(88,200,255,0.6)]"
          )}
        >
          Richiedi informazioni
          <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
