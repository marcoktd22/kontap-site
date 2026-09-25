import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { ContactIcon } from "../ContactIcon";
import { contacts } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * Contatti — quattro card da un tocco: WhatsApp (in evidenza), email,
 * Instagram e sito. Pensate per il pollice: grandi, chiare, immediate.
 */
export function Contacts() {
  return (
    <Section id="contatti" className="pt-32 sm:pt-44">
      <Container>
        <SectionHeader
          eyebrow="Contatti"
          title={
            <>
              <span className="text-gradient">Parliamo. </span>
              <span className="text-gradient-accent">Basta un tap.</span>
            </>
          }
          description="Scegli il canale che preferisci: ti rispondiamo il prima possibile."
        />

        <ul className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2">
          {contacts.map((c, i) => {
            const primary = c.id === "whatsapp";
            return (
              <Reveal as="li" key={c.id} index={i}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={cn(
                    "group flex items-center gap-4 rounded-[1.5rem] p-5 transition-all duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 sm:p-6",
                    primary
                      ? "bg-brand-gradient text-white shadow-[0_24px_50px_-24px_rgba(36,83,255,0.65)]"
                      : "bg-white text-ink shadow-[var(--shadow-card)] ring-hairline hover:ring-1 hover:ring-[color:rgba(88,200,255,0.6)]"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                      primary
                        ? "bg-white/20 text-white ring-1 ring-white/30"
                        : "bg-brand-gradient text-white shadow-[0_10px_22px_-10px_rgba(36,83,255,0.6)]"
                    )}
                  >
                    <ContactIcon id={c.id} className="h-[22px] w-[22px]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block text-xs font-semibold uppercase tracking-[0.16em]",
                        primary ? "text-white/80" : "text-muted"
                      )}
                    >
                      {c.label}
                    </span>
                    <span className="mt-1 block truncate text-lg font-semibold">
                      {c.value}
                    </span>
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className={cn(
                      "h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                      primary ? "text-white" : "text-primary"
                    )}
                  >
                    <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
