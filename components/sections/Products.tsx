"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { products, type Product } from "@/lib/content";
import { BrandBackdrop } from "../BrandBackdrop";
import { cn } from "@/lib/cn";

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
      <BrandBackdrop variant="products" />

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
              return (
                <Reveal key={p.name} index={i}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={selected}
                    className={cn(
                      "group relative w-full overflow-hidden rounded-3xl bg-white p-6 pl-7 text-left text-ink transition-all duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)] sm:p-7 sm:pl-8",
                      selected
                        ? "scale-[1.01] shadow-[0_1px_2px_rgba(16,24,40,0.05),0_30px_64px_-28px_rgba(36,83,255,0.4),inset_0_1px_0_0_rgba(255,255,255,0.95)] ring-1 ring-[color:rgba(88,200,255,0.65)]"
                        : "shadow-[0_1px_2px_rgba(16,24,40,0.04),0_4px_10px_-4px_rgba(16,24,40,0.06),0_24px_50px_-30px_rgba(36,83,255,0.14),inset_0_1px_0_0_rgba(255,255,255,0.9)] ring-hairline hover:-translate-y-0.5 hover:ring-1 hover:ring-[color:rgba(88,200,255,0.5)]"
                    )}
                  >
                    {/* Barra accento a gradiente quando selezionato */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute left-0 top-1/2 w-[3px] -translate-y-1/2 rounded-full bg-[linear-gradient(180deg,#2453ff,#58c8ff)] transition-all duration-[250ms]",
                        selected
                          ? "h-2/3 opacity-100 shadow-[0_0_18px_2px_rgba(88,200,255,0.6)]"
                          : "h-1/3 opacity-0"
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

/** Prodotto singolo (es. targa / wallet): immagine con tilt 3D reattivo al mouse. */
function SingleStage({ product }: { product: Product }) {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-lg items-center justify-center">
      <Halo />
      <TiltImage src={`/products/${product.image}.webp`} alt={product.name} />
    </div>
  );
}

/** Premium hardware tilt — mouse parallax + moving highlight, gentle idle float. */
function TiltImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, mx: 50, my: 40, active: false });

  const onMove = (e: ReactPointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({ rx: (0.5 - py) * 9, ry: (px - 0.5) * 11, mx: px * 100, my: py * 100, active: true });
  };
  const onLeave = () => setT({ rx: 0, ry: 0, mx: 50, my: 40, active: false });

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative z-10 flex h-[92%] w-[92%] items-center justify-center [perspective:1300px]"
    >
      <div
        className={cn(
          "relative transition-transform duration-300 ease-out [transform-style:preserve-3d]",
          !t.active && "animate-float-soft"
        )}
        style={{ transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg)` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="eager"
          decoding="async"
          className="max-h-full max-w-full object-contain drop-shadow-[0_44px_74px_rgba(16,24,40,0.3)]"
          style={{ transform: "translateZ(36px)" }}
        />
        {/* Riflesso che segue il mouse */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: t.active ? 1 : 0,
            background: `radial-gradient(circle at ${t.mx}% ${t.my}%, rgba(255,255,255,0.28), transparent 42%)`,
            mixBlendMode: "soft-light",
          }}
        />
      </div>
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
