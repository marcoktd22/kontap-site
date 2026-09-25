import { Container } from "./ui/Container";
import Link from "next/link";
import { Logo } from "./Logo";
import { BrandBackdrop } from "./BrandBackdrop";
import { ContactIcon } from "./ContactIcon";
import { contacts, footer } from "@/lib/content";

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

            {/* Contatti rapidi: un tocco e sei in chat, in mail o sul profilo */}
            <ul className="mt-6 flex flex-wrap items-center gap-2.5">
              {(["instagram", "email", "whatsapp"] as const)
                .map((id) => contacts.find((c) => c.id === id)!)
                .map((c) => (
                  <li key={c.id}>
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      aria-label={c.id === "instagram" ? `Instagram ${c.value}` : `${c.label}: ${c.value}`}
                      className={
                        c.id === "instagram"
                          ? "flex h-9 w-9 items-center justify-center rounded-full bg-white text-secondary shadow-[0_1px_2px_rgba(16,24,40,0.05)] ring-hairline transition-all duration-200 hover:-translate-y-0.5 hover:text-primary hover:ring-1 hover:ring-[color:rgba(88,200,255,0.6)]"
                          : "flex h-9 items-center gap-2 rounded-full bg-white px-3 text-[0.78rem] font-medium text-secondary shadow-[0_1px_2px_rgba(16,24,40,0.05)] ring-hairline transition-all duration-200 hover:-translate-y-0.5 hover:text-primary hover:ring-1 hover:ring-[color:rgba(88,200,255,0.6)]"
                      }
                    >
                      <ContactIcon
                        id={c.id}
                        className={c.id === "instagram" ? "h-[18px] w-[18px]" : "h-4 w-4 text-primary"}
                      />
                      {c.id !== "instagram" && <span>{c.value}</span>}
                    </a>
                  </li>
                ))}
            </ul>
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
              kontap.it
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
