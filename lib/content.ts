/**
 * Fonte unica per i testi e i contenuti strutturati del sito.
 * Le sezioni leggono da qui, così il layout resta dichiarativo e facile da modificare.
 */

/** Configurazione globale del sito — da modificare in un solo punto. */
export const site = {
  /** Contatto WhatsApp. Inserisci il numero reale in formato internazionale,
   *  solo cifre (senza +, spazi o trattini), es. "393401234567". */
  whatsapp: {
    number: "393000000000",
    message: "Ciao Kontap, vorrei informazioni sui prodotti.",
  },
} as const;

export const nav = {
  links: [
    { label: "Prodotti", href: "#products" },
    { label: "Come funziona", href: "#how" },
    { label: "Plus", href: "#plus" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: { label: "Inizia ora", href: "#cta" },
} as const;

/** Destinazioni che un tap può aprire — scorrono nel nastro sotto l'hero. */
export type Destination = {
  name: string;
  icon:
    | "google"
    | "tripadvisor"
    | "instagram"
    | "facebook"
    | "whatsapp"
    | "trustpilot"
    | "tiktok"
    | "youtube";
};

export const destinations: Destination[] = [
  { name: "Google", icon: "google" },
  { name: "TripAdvisor", icon: "tripadvisor" },
  { name: "Instagram", icon: "instagram" },
  { name: "Facebook", icon: "facebook" },
  { name: "WhatsApp", icon: "whatsapp" },
  { name: "Trustpilot", icon: "trustpilot" },
  { name: "TikTok", icon: "tiktok" },
  { name: "YouTube", icon: "youtube" },
];

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
      "Ogni prodotto Kontap funziona con lo smartphone che il cliente ha già. Un tap apre l'esperienza all'istante — niente da scaricare, niente da spiegare.",
    span: "wide",
    icon: "signal",
  },
  {
    title: "Una piattaforma, tutti i prodotti",
    description:
      "Plus è l'infrastruttura condivisa. Un'unica dashboard, le stesse statistiche e la stessa AI per la targa recensioni, il biglietto da visita e tutto ciò che aggiungi.",
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
      "Cambia la destinazione di un tag ogni volta che la tua attività cambia. L'hardware lo compri una volta e continua a lavorare per te.",
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
    number: "01",
    title: "Scegli il tuo prodotto",
    description:
      "Parti dalla targa per le recensioni Google sul bancone, aggiungi i biglietti NFC per il team, un pass Apple Wallet per i clienti abituali — una sola linea, un'unica piattaforma.",
  },
  {
    number: "02",
    title: "Collegalo in pochi secondi",
    description:
      "Tocca per impostare la destinazione: una pagina recensioni, un profilo, un pass wallet o qualsiasi URL. La cambi quando vuoi dalla dashboard.",
  },
  {
    number: "03",
    title: "Tocca, connetti, misura",
    description:
      "Il cliente avvicina il telefono e l'esperienza si apre all'istante — mentre ogni interazione entra in Kontap Plus come statistica.",
  },
];

export type Product = {
  name: string;
  tagline: string;
  description: string;
  /** slug usato per l'immagine prodotto in /products/<image>.png */
  image: string;
  /** slug del retro in /products/<back>.png: se presente, il prodotto si
   *  gira al click mostrando il retro */
  back?: string;
  /** proporzione dello stage: "card" per il biglietto, "square" per il resto */
  ratio?: "card" | "square";
  /** brevi chip di specifica mostrate sotto la descrizione */
  specs: string[];
};

/** L'espositore a 3 prodotti. Le foto vanno in /public/products/<image>.png
 *  (PNG trasparente, lato lungo ≥ 2000px). Fino ad allora appare un
 *  placeholder brandizzato. */
export const products: Product[] = [
  {
    name: "Targa Recensioni Google",
    tagline: "Il prodotto d'ingresso",
    description:
      "Una targa premium da bancone che porta i clienti soddisfatti direttamente alla tua pagina recensioni Google con un solo tap. Il modo più veloce per far crescere la tua reputazione.",
    image: "review-plate",
    specs: ["Da bancone", "Riprogrammabile", "Impermeabile"],
  },
  {
    name: "Biglietto da Visita NFC",
    tagline: "Il tuo profilo in un tap",
    description:
      "Condividi contatti, social e link all'istante. Finiture in metallo e premium, un solo biglietto per tutto il team — e ogni tap tracciato in Plus.",
    image: "business-card",
    back: "business-card-back",
    ratio: "card",
    specs: ["Finitura metallo", "Contatti + social", "Pronto per il team"],
  },
  {
    name: "Carta Apple Wallet",
    tagline: "Vive nel wallet",
    description:
      "Un pass dinamico che si aggiorna in tempo reale e non lascia mai il telefono del cliente. Fedeltà, offerte e promemoria, sempre a portata di swipe.",
    image: "wallet-card",
    specs: ["Apple Wallet", "Tempo reale", "Fedeltà e offerte"],
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
      "No. L'NFC è integrato in ogni iPhone e Android moderno. Il cliente avvicina semplicemente il telefono al prodotto Kontap e l'esperienza si apre nel browser — niente da installare.",
  },
  {
    question: "Kontap serve solo per le recensioni Google?",
    answer:
      "No. La targa recensioni Google è il nostro prodotto d'ingresso, ma Kontap è un'azienda NFC multi-prodotto. Lo stesso tap può aprire un biglietto da visita, un pass Apple Wallet, un menù, un link di pagamento e altro — tutto gestito da un'unica piattaforma.",
  },
  {
    question: "Cos'è Kontap Plus?",
    answer:
      "Plus è il nostro abbonamento SaaS — infrastruttura condivisa su ogni prodotto Kontap. Trasforma ogni tap in statistiche (traffico, orari, posizione e conversioni), aggiunge l'analisi delle recensioni con l'AI e invia report automatici, così sai sempre cosa funziona.",
  },
  {
    question: "Posso cambiare la destinazione di un prodotto dopo l'acquisto?",
    answer:
      "Sì. Ogni prodotto Kontap è riprogrammabile. Aggiorna la destinazione — un link recensioni, un profilo, un pass wallet o un URL — tutte le volte che vuoi dalla tua dashboard.",
  },
  {
    question: "Quanto è resistente l'hardware?",
    answer:
      "I prodotti Kontap usano materiali impermeabili e resistenti ai graffi e chip NFC di livello industriale testati per centinaia di migliaia di tap: reggono su un bancone affollato o in tasca.",
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
      title: "Prodotti",
      links: [
        { label: "Targa Recensioni Google", href: "#products" },
        { label: "Biglietto da Visita NFC", href: "#products" },
        { label: "Carta Apple Wallet", href: "#products" },
        { label: "Prodotti NFC Smart", href: "#products" },
      ],
    },
    {
      title: "Piattaforma",
      links: [
        { label: "Come funziona", href: "#how" },
        { label: "Kontap Plus", href: "#plus" },
        { label: "Casi d'uso", href: "#usecases" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Azienda",
      links: [
        { label: "Chi siamo", href: "#" },
        { label: "Contatti", href: "#cta" },
        { label: "Privacy", href: "#" },
        { label: "Termini", href: "#" },
      ],
    },
  ],
} as const;
