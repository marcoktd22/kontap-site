/**
 * Fonte unica per i testi e i contenuti strutturati del sito.
 * Le sezioni leggono da qui, così il layout resta dichiarativo e facile da modificare.
 */

/** Configurazione globale del sito — da modificare in un solo punto. */
export const site = {
  /** Contatto WhatsApp. Inserisci il numero reale in formato internazionale,
   *  solo cifre (senza +, spazi o trattini), es. "393401234567". */
  whatsapp: {
    number: "393510484959",
    message: "Ciao Kontap, vorrei informazioni sulla targa recensioni.",
  },
} as const;

/** Link wa.me con messaggio precompilato (default: site.whatsapp.message). */
export function whatsappHref(message: string = site.whatsapp.message) {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export const nav = {
  links: [
    { label: "Come funziona", href: "/come-funziona" },
    { label: "Kontap+", href: "/#plus" },
    { label: "FAQ", href: "/faq" },
  ],
  cta: { label: "Inizia ora", href: "/#cta" },
} as const;

export type Feature = {
  title: string;
  description: string;
  /** span controls bento sizing on large screens */
  span?: "wide" | "tall" | "default";
  icon: "bolt" | "shield" | "refresh" | "chart" | "signal" | "layers";
};

export const whyFeatures: Feature[] = [
  {
    title: "Niente app. Nessun ostacolo.",
    description:
      "La targa Kontap funziona con lo smartphone che il cliente ha già. Un tap apre l'esperienza all'istante — niente da scaricare, niente da spiegare.",
    span: "wide",
    icon: "signal",
  },
  {
    title: "Una dashboard, tutte le tue targhe",
    description:
      "Con Kontap Plus gestisci ogni targa da un unico posto: statistiche, analisi AI delle recensioni e report, anche se hai più sedi.",
    icon: "layers",
  },
  {
    title: "Costruito per durare",
    description:
      "Materiali impermeabili e resistenti ai graffi, chip di livello industriale testati per centinaia di migliaia di tap.",
    icon: "shield",
  },
  {
    title: "Riprogrammabile per sempre",
    description:
      "Cambia la destinazione della targa ogni volta che la tua attività cambia. La compri una volta e continua a lavorare per te.",
    icon: "refresh",
  },
  {
    title: "Pensato per le attività locali",
    description:
      "Fatto per ristoranti, bar e negozi in Puglia e non solo — attivo in meno di due minuti, dati utili dal primo giorno.",
    icon: "bolt",
  },
];

export type Step = {
  number: string;
  title: string;
  description: string;
};

export const steps: Step[] = [
  {
    number: "I",
    title: "Richiedi la tua targa",
    description:
      "Scrivici e scegli dove metterla: bancone, cassa, tavoli o ingresso. Ogni targa è collegata alla tua pagina recensioni Google.",
  },
  {
    number: "II",
    title: "Setup incluso, a costo zero",
    description:
      "Il settaggio del dispositivo è compreso nel prezzo: veniamo noi nel tuo locale a montarlo e configurarlo, senza costi aggiuntivi.",
  },
  {
    number: "III",
    title: "Tocca, connetti, misura",
    description:
      "Il cliente avvicina il telefono e l'esperienza si apre all'istante — mentre ogni interazione entra in Kontap Plus come statistica.",
  },
];

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "I miei clienti hanno bisogno di un'app per usare Kontap?",
    answer:
      "No. L'NFC è integrato in ogni iPhone e Android moderno. Il cliente avvicina semplicemente il telefono alla targa e l'esperienza si apre nel browser — niente da installare.",
  },
  {
    question: "E se il telefono del cliente non ha l'NFC?",
    answer:
      "Nessun problema: su ogni targa c'è anche un QR code. Il cliente lo inquadra con la fotocamera e arriva alla stessa pagina recensioni.",
  },
  {
    question: "Cos'è Kontap Plus?",
    answer:
      "Plus è il nostro abbonamento: trasforma ogni tap in statistiche (traffico, orari, posizione e conversioni), aggiunge l'analisi delle recensioni con l'AI e invia report automatici, così sai sempre cosa funziona.",
  },
  {
    question: "Posso cambiare la destinazione della targa dopo l'acquisto?",
    answer:
      "Sì. Ogni targa Kontap è riprogrammabile: puoi farla puntare alla pagina recensioni, al menù, a Instagram o a qualsiasi link, tutte le volte che vuoi.",
  },
  {
    question: "Quanto è resistente l'hardware?",
    answer:
      "Le targhe Kontap usano materiali impermeabili e resistenti ai graffi e chip NFC di livello industriale testati per centinaia di migliaia di tap: reggono anche sul bancone più affollato.",
  },
  {
    question: "Spedite in Italia?",
    answer:
      "Sì. Kontap ha sede in Puglia e spedisce in tutta Italia — con spedizione mondiale disponibile. Opzioni e tempi sono mostrati al checkout in base alla destinazione.",
  },
];

export const footer = {
  columns: [
    {
      title: "Kontap",
      links: [
        { label: "Targa Recensioni Google", href: "/" },
        { label: "Kontap Plus", href: "/#plus" },
        { label: "Contatti", href: "/#cta" },
      ],
    },
    {
      title: "Scopri",
      links: [
        { label: "Come funziona", href: "/come-funziona" },
        { label: "Perché Kontap", href: "/come-funziona#why" },
        { label: "FAQ", href: "/faq" },
      ],
    },
  ],
} as const;
