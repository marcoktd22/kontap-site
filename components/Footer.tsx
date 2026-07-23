import { Container } from "./ui/Container";
import { Logo } from "./Logo";
import { footer } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative border-t border-[color:var(--color-line)] pb-10 pt-16 sm:pt-20">
      <Container>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-5">
          <div className="col-span-2 md:col-span-2">
            <a href="#top" className="inline-block" aria-label="Kontap home">
              <Logo className="h-7 w-auto" />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Premium NFC hardware and the Plus platform — turning physical
              interactions into digital experiences, one tap at a time. Made in
              Puglia.
            </p>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-medium text-ink">{col.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted transition-colors duration-200 hover:text-secondary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[color:var(--color-line)] pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Kontap. All rights reserved.
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted/70">
            kontap.com
          </p>
        </div>
      </Container>
    </footer>
  );
}
