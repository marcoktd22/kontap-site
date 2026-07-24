"use client";

import { useState } from "react";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { products, type Product } from "@/lib/content";
import { cn } from "@/lib/cn";

const SITE_GRADIENT = "linear-gradient(135deg,#2453ff 0%,#58c8ff 100%)";

/**
 * Prodotti — espositore interattivo. Le schede alternano sfondo bianco e
 * sfondo a gradiente (stesso gradiente del brand): su gradiente il testo è
 * bianco, su bianco il testo è a gradiente. Selezionando una scheda lo stage
 * a sinistra mostra il prodotto (il biglietto si gira al click).
 */
export function Products() {
  const [active, setActive] = useState(0);
  const product = products[active];

  return (
    <section
      id="products"
      className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32 md:py-40"
    >
      {/* Sfondo chiaro con gradienti leggeri */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#fcfdff_0%,#eef3ff_55%,#fcfdff_100%)]" />
        <div
          className="absolute left-[-8%] top-[10%] h-[46vh] w-[46vh] rounded-full opacity-70 blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, rgba(88,200,255,0.32) 0%, rgba(88,200,255,0) 70%)",
          }}
        />
      </div>

      {/* Preload nascosto delle immagini prodotto (caricamento istantaneo) */}
      <div aria-hidden="true" className="hidden">
        {products.map((p) => (
          <span key={p.image}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/products/${p.image}.webp`} alt="" />
            {p.back && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={`/products/${p.back}.webp`} alt="" />
            )}
          </span>
        ))}
      </div>

      <Container className="relative">
        <SectionHeader
          eyebrow="Prodotti"
          title="Una linea. Una piattaforma."
          description="Kontap è un'azienda NFC multi-prodotto — la targa per le recensioni Google è solo l'inizio. Scegli un prodotto per vederlo in azione; ogni tap confluisce in Kontap Plus."
        />

        <div className="mt-16 grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Stage */}
          <Reveal className="order-1">
            <ProductStage key={product.image} product={product} />
          </Reveal>

          {/* Selettore */}
          <div className="order-2 flex flex-col gap-4">
            {products.map((p, i) => {
              const selected = i === active;
              const grad = i % 2 === 0; // alternanza bianco / gradiente
              return (
                <Reveal key={p.name} index={i}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={selected}
                    style={grad ? { backgroundImage: SITE_GRADIENT } : undefined}
                    className={cn(
                      "group relative w-full overflow-hidden rounded-3xl p-6 text-left transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] sm:p-7",
                      grad
                        ? "text-white ring-hairline-invert"
                        : "bg-white text-ink ring-hairline",
                      selected
                        ? grad
                          ? "scale-[1.02] shadow-[0_26px_60px_-24px_rgba(36,83,255,0.6),inset_0_1px_0_0_rgba(255,255,255,0.25)] ring-1 ring-white/60"
                          : "scale-[1.02] shadow-[0_26px_60px_-26px_rgba(36,83,255,0.38)] ring-1 ring-[color:rgba(36,83,255,0.5)]"
                        : "hover:-translate-y-0.5"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p
                          className={cn(
                            "text-xs font-medium uppercase tracking-[0.16em]",
                            grad ? "text-white/80" : "text-primary"
                          )}
                        >
                          {p.tagline}
                        </p>
                        <h3
                          className={cn(
                            "mt-1.5 text-xl font-semibold",
                            grad ? "text-white" : "text-gradient-accent"
                          )}
                        >
                          {p.name}
                        </h3>
                      </div>
                      <span
                        className={cn(
                          "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                          grad
                            ? "bg-white/15 text-white"
                            : "bg-primary/10 text-primary"
                        )}
                      >
                        <Icon name="arrow" className="h-4 w-4" />
                      </span>
                    </div>

                    {/* Dettaglio espandibile per il prodotto selezionato */}
                    <div
                      className={cn(
                        "grid transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
                        selected ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p
                          className={cn(
                            "max-w-md text-pretty text-[0.95rem] leading-relaxed",
                            grad ? "text-white/85" : "text-secondary"
                          )}
                        >
                          {p.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {p.specs.map((s) => (
                            <span
                              key={s}
                              className={cn(
                                "rounded-full px-3 py-1 text-[0.7rem] font-medium",
                                grad
                                  ? "bg-white/15 text-white ring-hairline-invert"
                                  : "bg-surface-2 text-secondary ring-hairline"
                              )}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProductStage({ product }: { product: Product }) {
  if (product.back) return <FlipCard product={product} />;
  return <SingleStage product={product} />;
}

/** Prodotto singolo (es. targa): immagine su alone celeste, subito visibile. */
function SingleStage({ product }: { product: Product }) {
  return (
    <div className="group relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
      <Halo />
      <PulseRings />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/products/${product.image}.webp`}
        alt={product.name}
        loading="eager"
        decoding="async"
        className="relative z-10 max-h-[86%] max-w-[86%] object-contain drop-shadow-[0_30px_60px_rgba(16,24,40,0.28)] transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform group-hover:scale-[1.04]"
      />
    </div>
  );
}

/** Biglietto NFC: si gira al click mostrando il retro. */
function FlipCard({ product }: { product: Product }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="group relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
      <Halo />
      <div className="relative z-10 w-full max-w-sm">
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          aria-label={flipped ? "Mostra il fronte del biglietto" : "Gira il biglietto e mostra il retro"}
          className="block w-full rounded-2xl [perspective:1600px] transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform group-hover:scale-[1.02] focus-visible:outline-none"
        >
          <div
            className="relative aspect-[1.586/1] w-full transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] [transform-style:preserve-3d]"
            style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/products/${product.image}.webp`}
              alt={`${product.name} — fronte`}
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full rounded-2xl object-cover shadow-[0_30px_70px_-24px_rgba(7,11,26,0.55)] ring-1 ring-black/5 [backface-visibility:hidden]"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/products/${product.back}.webp`}
              alt={`${product.name} — retro`}
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full rounded-2xl object-cover shadow-[0_30px_70px_-24px_rgba(7,11,26,0.55)] ring-1 ring-black/5 [backface-visibility:hidden] [transform:rotateY(180deg)]"
            />
          </div>
        </button>

        <div className="mt-5 flex items-center justify-center gap-2 text-sm text-muted">
          <Icon name="refresh" className="h-4 w-4" />
          <span>{flipped ? "Clicca per il fronte" : "Clicca per girarlo"}</span>
        </div>
      </div>
    </div>
  );
}

function Halo() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 rounded-full opacity-90"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(88,200,255,0.30) 0%, rgba(36,83,255,0.12) 36%, rgba(252,253,255,0) 66%)",
      }}
    />
  );
}

function PulseRings() {
  return (
    <>
      {[0, 1].map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute h-56 w-56 rounded-full ring-1 ring-[color:rgba(36,83,255,0.22)]"
          style={{
            animation: "kontap-pulse-ring 3.4s ease-out infinite",
            animationDelay: `${i * 1.7}s`,
          }}
        />
      ))}
    </>
  );
}
