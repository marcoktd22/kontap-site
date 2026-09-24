import { Container } from "./ui/Container";
import Link from "next/link";
import { Logo } from "./Logo";
import { BrandBackdrop } from "./BrandBackdrop";
import { footer } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#f8fbff] pb-14 pt-16 sm:pt-28">
      <BrandBackdrop variant="footer" />
      {/* Divisore a gradiente soft */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-line-strong),transparent)]"
      />
      <Container className="relative">
        <div className="grid grid-cols-2 gap-x-10 gap-y-12 md:grid-cols-4">
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="inline-block" aria-label="Kontap home">
              <Logo className="h-7 w-auto" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-secondary">
              La targa NFC che trasforma ogni cliente soddisfatto in una
              recensione Google, con la piattaforma Plus. Made in Puglia.
            </p>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-medium text-ink">{col.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors duration-200 hover:text-secondary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="relative mt-16 pt-8 sm:mt-20">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-line),transparent)]"
          />
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-sm text-muted">
              © {new Date().getFullYear()} Kontap. Tutti i diritti riservati.
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted/70">
              kontap.com
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
