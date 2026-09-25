import Link from "next/link";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { Coverflow } from "../ui/Coverflow";
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
  "border-[1.5px] border-transparent [background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(135deg,#2453ff,#58c8ff)_border-box]";

const CARD =
  "relative flex h-full flex-col rounded-[1.5rem] p-5 sm:p-6";
const CARD_PLAIN = "bg-white shadow-[var(--shadow-card)] ring-hairline";
const CARD_FEATURED = cn(GRADIENT_BORDER, "shadow-[0_24px_60px_-30px_rgba(36,83,255,0.55)]");

const BTN =
  "group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-0.5";
const BTN_PRIMARY = "bg-brand-gradient text-white shadow-[0_12px_28px_-12px_rgba(36,83,255,0.6)]";
const BTN_PLAIN = "bg-white text-ink ring-hairline hover:ring-1 hover:ring-[color:rgba(88,200,255,0.6)]";

/* ------------------------------------------------------------------ */
/* Targhe                                                              */
/* ------------------------------------------------------------------ */

export function PlatePricing() {
  const featured = Math.max(0, plateOffers.findIndex((o) => o.badge));
  return (
    <Section id="targhe" className="overflow-x-clip pt-28 sm:pt-44">
      <Container>
        <SectionHeader
          eyebrow="Prezzi"
          title={
            <>
              <span className="text-gradient">La tua targa, </span>
              <span className="text-gradient-accent">in sconto.</span>
            </>
          }
          description="Prezzi IVA inclusa. Scegli quante targhe ti servono."
        />

        <Reveal index={2} className="mt-6 sm:mt-12">
          <Coverflow label="Offerte targhe" initial={featured}>
            {plateOffers.map((offer) => (
              <PlateCard key={offer.id} offer={offer} />
            ))}
          </Coverflow>
        </Reveal>
      </Container>
    </Section>
  );
}

function PlateCard({ offer }: { offer: PlateOffer }) {
  const featured = Boolean(offer.badge);
  return (
    <div className={cn(CARD, featured ? CARD_FEATURED : CARD_PLAIN)}>
      {featured && (
        <span className="bg-brand-gradient absolute -top-3 right-5 inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-[0.7rem] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(36,83,255,0.7)]">
          <Icon name="star" className="h-3 w-3" strokeWidth={2.2} />
          {offer.badge}
        </span>
      )}

      <div className="flex items-center gap-3.5">
        <PlateVisual kind={offer.id} />
        <div className="min-w-0">
          <h3 className="text-lg font-semibold leading-tight text-ink">{offer.name}</h3>
          <p className="mt-1 text-[0.8rem] leading-snug text-muted">{offer.description}</p>
        </div>
      </div>

      {/* Prezzo */}
      <div className="mt-5 flex min-h-[2.75rem] flex-wrap items-end gap-x-2.5 gap-y-1">
        {offer.price ? (
          <>
            <span className="text-[2.5rem] font-semibold leading-none tracking-tight text-ink">
              {offer.price}
              <span className="ml-0.5 text-xl">€</span>
            </span>
            {offer.was && (
              <span className="pb-0.5 text-base text-muted line-through decoration-[1.5px]">
                {offer.was} €
              </span>
            )}
            {offer.saving && (
              <span className="mb-1 rounded-full bg-primary/10 px-2 py-0.5 text-[0.7rem] font-semibold text-primary">
                {offer.saving}
              </span>
            )}
          </>
        ) : (
          <span className="text-gradient-accent pb-1 text-[1.6rem] font-semibold leading-none tracking-tight">
            {offer.priceLabel}
          </span>
        )}
      </div>
      <p className="mt-1.5 text-xs text-muted">
        {offer.price ? "IVA inclusa" : "Ti prepariamo un'offerta dedicata"}
      </p>

      <ul className="mt-4 flex flex-col gap-2 border-t border-[color:var(--color-line)] pt-4">
        {offer.perks.map((perk) => (
          <li key={perk} className="flex items-center gap-2.5 text-[0.85rem] text-secondary">
            <CheckBadge className="h-[15px] w-4" />
            {perk}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-5">
        {offer.cta.external ? (
          <a
            href={offer.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(BTN, featured ? BTN_PRIMARY : BTN_PLAIN)}
          >
            <ContactIcon id="whatsapp" className={cn("h-4 w-4", featured ? "text-white" : "text-primary")} />
            {offer.cta.label}
          </a>
        ) : (
          <Link href={offer.cta.href} className={cn(BTN, BTN_PLAIN)}>
            {offer.cta.label}
            <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </div>
  );
}

/** Miniatura del prodotto: una targa, un ventaglio da 3 o una pila "10+". */
function PlateVisual({ kind }: { kind: PlateOffer["id"] }) {
  const fan = kind === "single" ? [0] : [-12, 0, 12];
  const tag = kind === "trio" ? "×3" : kind === "network" ? "10+" : null;
  return (
    <div aria-hidden="true" className="relative h-12 w-12 shrink-0">
      {fan.map((deg, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={deg}
          src="/products/review-plate-front.webp"
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full rounded-[18%] shadow-[0_6px_14px_-6px_rgba(16,24,40,0.35)]"
          style={{
            transform: `rotate(${deg}deg) translateX(${deg * 0.3}px)`,
            zIndex: i === 1 || fan.length === 1 ? 2 : 1,
          }}
        />
      ))}
      {tag && (
        <span className="bg-brand-gradient absolute -bottom-1.5 -right-2 z-10 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[0.62rem] font-bold text-white ring-2 ring-white">
          {tag}
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
          description="Tre livelli per far crescere la tua presenza digitale."
        />

        <Reveal index={2} className="mt-8 sm:mt-14">
          <Coverflow label="Servizi Kontap" initial={1}>
            {servicePlans.map((plan) => (
              <ServiceCard key={plan.id} plan={plan} />
            ))}
          </Coverflow>
        </Reveal>
      </Container>
    </Section>
  );
}

function ServiceCard({ plan }: { plan: ServicePlan }) {
  const premium = Boolean(plan.premium);
  // Liste lunghe su due colonne: la card resta compatta
  const twoCols = plan.items.length > 6;
  return (
    <div className={cn(CARD, "overflow-hidden", premium ? CARD_FEATURED : CARD_PLAIN)}>
      {premium && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(88,200,255,0.3),transparent_70%)]"
        />
      )}

      <span
        className={cn(
          "relative self-start whitespace-nowrap rounded-full px-2.5 py-1 text-[0.7rem] font-semibold",
          premium ? "bg-brand-gradient text-white" : "bg-primary/10 text-primary"
        )}
      >
        {plan.billing}
      </span>
      <h3 className="relative mt-3">
        {premium ? (
          <PlusLogo className="h-6 text-ink" />
        ) : (
          <span className="block text-xl font-semibold leading-6 tracking-tight text-ink">{plan.name}</span>
        )}
      </h3>
      <p className="relative mt-2 text-pretty text-[0.85rem] leading-snug text-secondary">
        {plan.tagline}
      </p>

      <p className="relative mt-4 border-t border-[color:var(--color-line)] pt-4 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted">
        {plan.includes}
      </p>
      <ul className={cn("relative mt-3 grid gap-x-3 gap-y-2", twoCols ? "grid-cols-2" : "grid-cols-1")}>
        {plan.items.map((item) => {
          const label = typeof item === "string" ? item : item.label;
          return (
            <li key={label} className="flex items-start gap-2">
              <CheckBadge className="mt-[2px] h-[14px] w-[15px]" />
              <div className="min-w-0">
                <span className="block text-[0.8rem] font-medium leading-snug text-ink">{label}</span>
                {typeof item !== "string" && (
                  <span className="mt-0.5 block text-[0.7rem] leading-snug text-muted">
                    {item.details.join(", ")}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="relative mt-auto pt-5">
        <a
          href={whatsappHref(plan.cta)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(BTN, premium ? BTN_PRIMARY : BTN_PLAIN)}
        >
          Richiedi informazioni
          <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
