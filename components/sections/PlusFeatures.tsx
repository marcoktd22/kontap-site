import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { GradientBadge } from "../ui/GradientBadge";
import { Icon, type IconName } from "../ui/Icon";
import { BrandBackdrop } from "../BrandBackdrop";

/** Cosa fa Kontap+, raccolto per aree: i servizi del piano, spiegati. */
const areas: { icon: IconName; title: string; text: string; items: string[] }[] = [
  {
    icon: "star",
    title: "Reputazione",
    text: "Ogni recensione letta e analizzata dall'AI: sentiment, temi ricorrenti e cosa migliorare.",
    items: ["Reputation Analytics", "AI Review Analysis"],
  },
  {
    icon: "signal",
    title: "Visibilità",
    text: "Ti facciamo trovare su Google, nelle mappe e nelle risposte dei motori AI.",
    items: ["SEO / Local SEO", "GEO / AEO"],
  },
  {
    icon: "chart",
    title: "Mercato",
    text: "Sai come vanno i concorrenti della tua zona e dove puoi superarli.",
    items: ["Competitor Intelligence", "Business Insights"],
  },
  {
    icon: "bolt",
    title: "Controllo",
    text: "Report che arrivano da soli e avvisi quando succede qualcosa di importante.",
    items: ["Report automatici", "Alert"],
  },
  {
    icon: "layers",
    title: "Strategia",
    text: "Revisione periodica con noi e un piano d'azione concreto per il mese successivo.",
    items: ["Strategic Business Review", "Piano d'azione"],
  },
];

export function PlusFeatures() {
  return (
    <Section id="funzioni" className="bg-light-tech grid-faint overflow-hidden">
      <BrandBackdrop variant="why" />
      <Container className="relative">
        <SectionHeader
          eyebrow="Cosa include"
          title={
            <>
              <span className="text-gradient">Tutto quello che serve, </span>
              <span className="text-gradient-accent">in un solo piano.</span>
            </>
          }
          description="Kontap+ unisce dashboard, intelligenza artificiale e il nostro team."
        />

        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:mt-14 sm:gap-3 lg:grid-cols-3 lg:gap-4">
          {areas.map((a, i) => (
            <Reveal key={a.title} index={i % 3} className={i === areas.length - 1 ? "col-span-2 h-full lg:col-span-1" : "h-full"}>
              <div className="flex h-full flex-col gap-3 rounded-[1.25rem] border-[1.5px] border-[#0b67cc] bg-white p-4 shadow-[var(--shadow-card)] sm:rounded-3xl sm:p-6">
                <GradientBadge className="h-9 w-9 shrink-0 sm:h-12 sm:w-12">
                  <Icon name={a.icon} className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.8} />
                </GradientBadge>
                <div>
                  <h3 className="text-base font-semibold text-ink sm:text-lg">{a.title}</h3>
                  <p className="mt-1 text-pretty text-[0.78rem] leading-snug text-muted sm:mt-1.5 sm:text-[0.9rem] sm:leading-relaxed">{a.text}</p>
                  <div className="mt-2.5 flex flex-wrap gap-1 sm:mt-3 sm:gap-1.5">
                    {a.items.map((it) => (
                      <span key={it} className="rounded-full bg-[#0b67cc] px-2 py-0.5 text-[0.65rem] font-medium text-white sm:px-2.5 sm:py-1 sm:text-[0.72rem]">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
