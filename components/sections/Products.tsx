"use client";

import { useState } from "react";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { products, type Product } from "@/lib/content";
import { cn } from "@/lib/cn";

/** Soft light gradient for the alternating "gradient" slide — bright, never loud. */
const SOFT_GRADIENT =
  "linear-gradient(135deg,#e4eeff 0%,#f3f9ff 55%,#e6f4ff 100%)";

/**
 * Prodotti — il centro emotivo della pagina. Il mockup del prodotto è l'eroe
 * visivo; le schede a destra restano leggere. Selezionando un prodotto lo
 * stage mostra l'immagine (il biglietto si gira al click) con transizioni
 * eleganti e discrete.
 */
export function Products() {
  const [active, setActive] = useState(0);
  const product = products[active];

  return (
    <section
      id="products"
      className="bg-light-tech relative scroll-mt-24 overflow-hidden py-24 sm:py-32 md:py-40"
    >
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

        <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.12fr_1fr] lg:gap-16">
          {/* Stage — l'eroe visivo */}
          <Reveal className="order-1">
            <ProductStage key={product.image} product={product} />
          </Reveal>

          {/* Selettore — leggero, non ruba la scena */}
          <div className="order-2 flex flex-col gap-3.5">
            {products.map((p, i) => {
              const selected = i === active;
              const grad = i % 2 === 0;
              return (
                <Reveal key={p.name} index={i}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={selected}
                    style={grad ? { backgroundImage: SOFT_GRADIENT } : undefined}
                    className={cn(
                      "group relative w-full overflow-hidden rounded-3xl p-6 text-left backdrop-blur-xl transition-all duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)] sm:p-7",
                      grad ? "" : "bg-white/70",
                      selected
                        ? "scale-[1.01] shadow-[0_26px_60px_-30px_rgba(36,83,255,0.32)] ring-1 ring-[color:rgba(88,200,255,0.6)]"
                        : "shadow-[var(--shadow-card)] ring-hairline hover:-translate-y-0.5 hover:ring-1 hover:ring-[color:rgba(88,200,255,0.4)]"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p
                          className={cn(
                            "text-xs font-medium uppercase tracking-[0.16em] transition-colors duration-300",
                            selected ? "text-primary" : "text-muted"
                          )}
                        >
                          {p.tagline}
                        </p>
                        <h3 className="mt-1.5 text-xl font-semibold text-ink">
                          {p.name}
                        </h3>
                      </div>
                      <span
                        className={cn(
                          "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                          selected ? "bg-primary/10 text-primary" : "text-muted group-hover:text-ink"
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
                        <p className="max-w-md text-pretty text-[0.95rem] leading-relaxed text-secondary">
                          {p.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {p.specs.map((s) => (
                            <span
                              key={s}
                              className="rounded-full bg-surface px-3 py-1 text-[0.7rem] font-medium text-secondary ring-hairline"
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

/** Prodotto singolo (es. targa): immagine su alone soft, subito visibile. */
function SingleStage({ product }: { product: Product }) {
  return (
    <div className="group relative mx-auto flex aspect-square w-full max-w-lg items-center justify-center">
      <Halo />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/products/${product.image}.webp`}
        alt={product.name}
        loading="eager"
        decoding="async"
        className="relative z-10 max-h-[92%] max-w-[92%] object-contain drop-shadow-[0_40px_70px_rgba(16,24,40,0.22)] transition-transform duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform group-hover:scale-[1.03]"
      />
    </div>
  );
}

/** Biglietto NFC: si gira al click mostrando il retro. */
function FlipCard({ product }: { product: Product }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="group relative mx-auto flex aspect-square w-full max-w-lg items-center justify-center">
      <Halo />
      <div className="relative z-10 w-full max-w-md">
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          aria-label={flipped ? "Mostra il fronte del biglietto" : "Gira il biglietto e mostra il retro"}
          className="block w-full rounded-2xl [perspective:1600px] transition-transform duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform group-hover:scale-[1.02] focus-visible:outline-none"
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
              className="absolute inset-0 h-full w-full rounded-2xl object-cover shadow-[0_36px_80px_-30px_rgba(16,24,40,0.5)] ring-1 ring-black/5 [backface-visibility:hidden]"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/products/${product.back}.webp`}
              alt={`${product.name} — retro`}
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full rounded-2xl object-cover shadow-[0_36px_80px_-30px_rgba(16,24,40,0.5)] ring-1 ring-black/5 [backface-visibility:hidden] [transform:rotateY(180deg)]"
            />
          </div>
        </button>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted">
          <Icon name="refresh" className="h-4 w-4" />
          <span>{flipped ? "Clicca per il fronte" : "Clicca per girarlo"}</span>
        </div>
      </div>
    </div>
  );
}

/** Alone soft dietro il prodotto — profondità dalla luce, non dal buio. */
function Halo() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 rounded-full opacity-90"
      style={{
        background:
          "radial-gradient(circle at 50% 48%, rgba(88,200,255,0.28) 0%, rgba(36,83,255,0.1) 38%, rgba(248,251,255,0) 68%)",
      }}
    />
  );
}
