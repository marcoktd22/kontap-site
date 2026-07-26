import { Container } from "./ui/Container";
import { Logo } from "./Logo";
import { BrandBackdrop } from "./BrandBackdrop";
import { footer } from "@/lib/content";

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden pb-14 pt-20 sm:pt-32"
      style={{
        background:
          "radial-gradient(80% 80% at 50% 0%, rgba(88,200,255,0.08), transparent 60%)," +
          "linear-gradient(180deg, #e9f0ff 0%, #f3f8ff 55%, #fcfdff 100%)",
      }}
    >
      <BrandBackdrop variant="footer" />
      {/* Divisore a gradiente soft */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-line-strong),transparent)]"
      />
      <Container>
        <div className="grid grid-cols-2 gap-x-10 gap-y-12 sm:grid-cols-3 md:grid-cols-5">
          <div className="col-span-2 md:col-span-2">
            <a href="#top" className="inline-block" aria-label="Kontap home">
              <Logo className="h-7 w-auto" />
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-secondary">
              Hardware NFC premium e la piattaforma Plus — trasformiamo le
              interazioni fisiche in esperienze digitali, un tap alla volta. Made
              in Puglia.
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
