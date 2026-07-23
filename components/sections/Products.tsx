"use client";

import { useState } from "react";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { Logo } from "../Logo";
import { products, type Product } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * Prodotti — espositore a 3 prodotti. Sezione chiara con gradienti leggeri.
 * Selezionando un prodotto la riga e lo stage si illuminano di celeste Kontap.
 * Le foto vanno in /public/products/<image>.png (PNG trasparente); fino ad
 * allora appare un placeholder brandizzato.
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#eef4ff_55%,#ffffff_100%)]" />
        <div
          className="absolute left-[-8%] top-[10%] h-[46vh] w-[46vh] rounded-full opacity-70 blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, rgba(118,223,255,0.35) 0%, rgba(118,223,255,0) 70%)",
          }}
        />
        <div
          className="absolute right-[-6%] bottom-[6%] h-[42vh] w-[42vh] rounded-full opacity-50 blur-[90px]"
          style={{
            background:
              "radial-gradient(circle, rgba(10,54,246,0.18) 0%, rgba(10,54,246,0) 70%)",
          }}
        />
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
              return (
                <Reveal key={p.name} index={i}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={selected}
                    className={cn(
                      "group relative w-full overflow-hidden rounded-3xl p-6 text-left transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] sm:p-7",
                      selected
                        ? "scale-[1.02] bg-[linear-gradient(135deg,#e7f0ff_0%,#f5faff_45%,#e4f6ff_100%)] ring-1 ring-[color:rgba(46,123,255,0.55)] shadow-[0_26px_60px_-26px_rgba(46,123,255,0.55)]"
                        : "bg-white ring-hairline shadow-[0_1px_2px_0_rgba(7,11,26,0.05)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-28px_rgba(7,11,26,0.35)]"
                    )}
                  >
                    {/* barra celeste quando selezionato */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute left-0 top-1/2 h-2/3 w-[3px] -translate-y-1/2 rounded-full bg-[linear-gradient(180deg,#4FC3FF,#0A36F6)] transition-opacity duration-500",
                        selected ? "opacity-100" : "opacity-0"
                      )}
                    />
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
                        <h3 className="mt-1.5 text-xl font-medium text-ink">
                          {p.name}
                        </h3>
                      </div>
                      <span
                        className={cn(
                          "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                          selected
                            ? "bg-primary/10 text-primary"
                            : "text-muted group-hover:text-ink"
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
                              className="rounded-full bg-surface-2 px-3 py-1 text-[0.7rem] font-medium text-secondary ring-hairline"
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

            <p className="mt-2 pl-1 text-sm text-muted">
              …e poi espositori, adesivi, braccialetti e prodotti NFC su misura.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProductStage({ product }: { product: Product }) {
  if (product.back) {
    return <FlipCard product={product} />;
  }
  return <SingleStage product={product} />;
}

/** Prodotto singolo (es. targa): immagine su alone celeste. */
function SingleStage({ product }: { product: Product }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
      <Halo />
      <PulseRings />

      {/* Placeholder brandizzato finché non carica la foto */}
      <div
        className={cn(
          "relative z-10 flex h-52 w-52 flex-col items-center justify-center gap-4 rounded-[2rem] ring-hairline transition-opacity duration-500",
          loaded ? "opacity-0" : "opacity-100"
        )}
        style={{
          background: "linear-gradient(150deg, #d8f2ff 0%, #a9d4ff 55%, #7db0ff 100%)",
          boxShadow: "0 1px 0 0 rgba(255,255,255,0.6) inset, 0 30px 70px -34px rgba(46,123,255,0.5)",
        }}
      >
        <Logo variant="dark" className="h-5 w-auto opacity-90" />
        <p className="px-4 text-center text-[0.7rem] font-medium uppercase tracking-[0.18em] text-primary/70">
          {product.name}
        </p>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/products/${product.image}.png`}
        alt={product.name}
        onLoad={() => setLoaded(true)}
        className={cn(
          "absolute inset-0 z-20 m-auto max-h-[82%] max-w-[82%] object-contain drop-shadow-[0_30px_60px_rgba(7,11,26,0.25)] transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}

/** Biglietto NFC: si gira al click mostrando il retro. */
function FlipCard({ product }: { product: Product }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
      <Halo />
      <div className="relative z-10 w-full max-w-sm">
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          aria-label={flipped ? "Mostra il fronte del biglietto" : "Gira il biglietto e mostra il retro"}
          className="group block w-full rounded-2xl [perspective:1600px] focus-visible:outline-none"
        >
          <div
            className="relative aspect-[1.586/1] w-full transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] [transform-style:preserve-3d]"
            style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
          >
            {/* Fronte */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/products/${product.image}.png`}
              alt={`${product.name} — fronte`}
              className="absolute inset-0 h-full w-full rounded-2xl object-cover shadow-[0_30px_70px_-24px_rgba(7,11,26,0.55)] ring-1 ring-black/5 [backface-visibility:hidden] [transform:translateZ(0)]"
            />
            {/* Retro */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/products/${product.back}.png`}
              alt={`${product.name} — retro`}
              className="absolute inset-0 h-full w-full rounded-2xl object-cover shadow-[0_30px_70px_-24px_rgba(7,11,26,0.55)] ring-1 ring-black/5 [backface-visibility:hidden] [transform:rotateY(180deg)]"
            />
          </div>
        </button>

        {/* Suggerimento */}
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
          "radial-gradient(circle at 50% 50%, rgba(118,223,255,0.30) 0%, rgba(46,123,255,0.12) 36%, rgba(255,255,255,0) 66%)",
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
          className="absolute h-56 w-56 rounded-full ring-1 ring-[color:rgba(46,123,255,0.25)]"
          style={{
            animation: "kontap-pulse-ring 3.4s ease-out infinite",
            animationDelay: `${i * 1.7}s`,
          }}
        />
      ))}
    </>
  );
}
