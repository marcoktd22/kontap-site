"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";
import { Icon } from "./ui/Icon";
import { nav } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
      <nav
        className={cn(
          "flex w-full max-w-5xl items-center justify-between gap-4 rounded-full px-3 py-2 pl-5 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
          scrolled || open
            ? "bg-background/70 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] ring-hairline backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <a href="#top" className="shrink-0 text-lg" aria-label="Kontap home">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-secondary transition-colors duration-200 hover:bg-white/[0.04] hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex">
            <Button href={nav.cta.href} size="sm">
              {nav.cta.label}
              <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Button>
          </span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white ring-hairline transition-colors hover:bg-white/[0.06] md:hidden"
          >
            <div className="relative h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 top-1 h-[1.5px] w-full bg-current transition-all duration-300",
                  open && "top-1/2 -translate-y-1/2 rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute bottom-1 left-0 h-[1.5px] w-full bg-current transition-all duration-300",
                  open && "bottom-1/2 translate-y-1/2 -rotate-45"
                )}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-x-4 top-20 z-40 origin-top rounded-3xl bg-background/95 p-3 ring-hairline backdrop-blur-2xl transition-all duration-300 md:hidden",
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        )}
      >
        <ul className="flex flex-col">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base text-secondary transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <Button
          href={nav.cta.href}
          onClick={() => setOpen(false)}
          className="mt-2 w-full"
        >
          {nav.cta.label}
        </Button>
      </div>
    </header>
  );
}
