"use client";

import { useState } from "react";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { LogoMark } from "../Logo";
import { products } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * Products — the dramatic dark "island" of the site (Solution A).
 * A 3-product selector: choosing a product lights the stage and the active
 * row with Kontap celeste. Product photos live at /public/products/<image>.png
 * (transparent PNG); a branded placeholder shows until they're added.
 */
export function Products() {
  const [active, setActive] = useState(0);
  const product = products[active];

  return (
    <section
      id="products"
      className="relative scroll-mt-24 overflow-hidden bg-deep py-24 text-white sm:py-32 md:py-40"
    >
      {/* Ambient brand glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-[-10%] h-[60vh] w-[80vw] -translate-x-1/2 opacity-60 blur-[80px]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(10,54,246,0.35) 0%, rgba(5,8,26,0) 70%)",
          }}
        />
      </div>

      <Container className="relative">
        <SectionHeader
          tone="dark"
          eyebrow="Products"
          title="One line-up. One platform."
          description="Kontap is a multi-product NFC company — the Google Review plate is only the start. Pick a product to see it come to life; every tap flows into Kontap Plus."
        />

        <div className="mt-16 grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Stage */}
          <Reveal className="order-1">
            <ProductStage
              key={product.image}
              image={product.image}
              name={product.name}
            />
          </Reveal>

          {/* Selector */}
          <div className="order-2 flex flex-col gap-3">
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
                        ? "bg-white/[0.06] ring-1 ring-[color:rgba(118,223,255,0.55)] shadow-[0_0_50px_-12px_rgba(118,223,255,0.45)]"
                        : "bg-white/[0.02] ring-hairline-invert hover:bg-white/[0.04]"
                    )}
                  >
                    {/* celeste edge light when selected */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute left-0 top-1/2 h-2/3 w-[3px] -translate-y-1/2 rounded-full bg-celeste transition-opacity duration-500",
                        selected ? "opacity-100 shadow-[0_0_18px_2px_rgba(118,223,255,0.8)]" : "opacity-0"
                      )}
                    />
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p
                          className={cn(
                            "text-xs font-medium uppercase tracking-[0.16em] transition-colors duration-300",
                            selected ? "text-celeste" : "text-white/40"
                          )}
                        >
                          {p.tagline}
                        </p>
                        <h3 className="mt-1.5 text-xl font-medium text-white">
                          {p.name}
                        </h3>
                      </div>
                      <span
                        className={cn(
                          "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                          selected
                            ? "bg-celeste/15 text-celeste"
                            : "text-white/30 group-hover:text-white/60"
                        )}
                      >
                        <Icon name="arrow" className="h-4 w-4" />
                      </span>
                    </div>

                    {/* Expanding detail for the selected product */}
                    <div
                      className={cn(
                        "grid transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
                        selected ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-md text-pretty text-[0.95rem] leading-relaxed text-white/60">
                          {p.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {p.specs.map((s) => (
                            <span
                              key={s}
                              className="rounded-full bg-white/[0.06] px-3 py-1 text-[0.7rem] font-medium text-white/70 ring-hairline-invert"
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

            <p className="mt-2 pl-1 text-sm text-white/40">
              …plus stands, stickers, wristbands and bespoke smart NFC products.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProductStage({ image, name }: { image: string; name: string }) {
  // The branded placeholder is the default. If a real photo exists at
  // /products/<image>.png it fades in on load (onError is unreliable for
  // SSR'd images, so we reveal on successful load instead).
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
      {/* Celeste halo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full opacity-90"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(118,223,255,0.28) 0%, rgba(10,54,246,0.14) 34%, rgba(5,8,26,0) 66%)",
        }}
      />
      {/* Pulsing rings */}
      {[0, 1].map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute h-56 w-56 rounded-full ring-1 ring-celeste/25"
          style={{
            animation: "kontap-pulse-ring 3.4s ease-out infinite",
            animationDelay: `${i * 1.7}s`,
          }}
        />
      ))}

      {/* Branded placeholder (shown until a real photo loads) */}
      <div
        className={cn(
          "relative z-10 flex h-52 w-52 flex-col items-center justify-center gap-3 rounded-[2rem] ring-hairline-invert transition-opacity duration-500",
          loaded ? "opacity-0" : "opacity-100"
        )}
        style={{
          background: "linear-gradient(150deg, #12205e 0%, #0a1240 60%, #05081a 100%)",
          boxShadow: "0 1px 0 0 rgba(255,255,255,0.08) inset, 0 40px 80px -40px rgba(0,0,0,0.9)",
        }}
      >
        <LogoMark className="h-12 w-12 text-white/85" />
        <p className="px-4 text-center text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white/45">
          {name}
        </p>
      </div>

      {/* Real product photo, revealed on load */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/products/${image}.png`}
        alt=""
        onLoad={() => setLoaded(true)}
        className={cn(
          "absolute inset-0 z-20 m-auto max-h-[78%] max-w-[78%] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)] transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}
