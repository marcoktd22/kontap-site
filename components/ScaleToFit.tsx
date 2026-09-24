"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Rende il contenuto alla sua larghezza di progetto e lo scala in modo
 * proporzionale quando il contenitore è più stretto (es. il grafico di Plus
 * su smartphone): stessa composizione del desktop, solo più piccola.
 * Oltre la larghezza di progetto torna fluido.
 */
export function ScaleToFit({
  width,
  className,
  children,
}: {
  width: number;
  className?: string;
  children: React.ReactNode;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<{ scale: number; height: number } | null>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const update = () => {
      const w = outer.clientWidth;
      if (w >= width) {
        setFit(null);
        return;
      }
      const scale = w / width;
      setFit({ scale, height: inner.offsetHeight * scale });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer);
    ro.observe(inner);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div
      ref={outerRef}
      className={className}
      style={fit ? { position: "relative", height: fit.height, minWidth: 0 } : { minWidth: 0 }}
    >
      <div
        ref={innerRef}
        style={
          fit
            ? {
                width,
                // fuori dal flusso: la larghezza di progetto non allarga la griglia
                position: "absolute",
                transform: `scale(${fit.scale})`,
                transformOrigin: "top left",
              }
            : undefined
        }
      >
        {children}
      </div>
    </div>
  );
}
