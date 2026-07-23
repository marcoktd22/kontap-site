/**
 * Single source of truth for site copy and structured content.
 * Sections read from here so layout stays declarative and easy to edit.
 */

/** Global site config — edit these in one place. */
export const site = {
  /** WhatsApp contact. Put the real number in international format, digits
   *  only (no +, spaces or dashes), e.g. "393401234567". */
  whatsapp: {
    number: "393000000000",
    message: "Ciao Kontap, vorrei informazioni sui prodotti.",
  },
} as const;

export const nav = {
  links: [
    { label: "Products", href: "#products" },
    { label: "How it works", href: "#how" },
    { label: "Plus", href: "#plus" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: { label: "Get started", href: "#cta" },
} as const;

export const useCases = [
  "Restaurants",
  "Bars & cafés",
  "Shops",
  "Salons",
  "Bakeries",
  "Pizzerias",
  "Gelaterie",
  "Local services",
] as const;

export type Feature = {
  title: string;
  description: string;
  /** span controls bento sizing on large screens */
  span?: "wide" | "tall" | "default";
  icon: "bolt" | "shield" | "refresh" | "chart" | "signal" | "layers";
};

export const whyFeatures: Feature[] = [
  {
    title: "No app. No friction.",
    description:
      "Every Kontap product works with the phone your customer already has. A tap opens the experience instantly — nothing to download, nothing to explain.",
    span: "wide",
    icon: "signal",
  },
  {
    title: "One platform, every product",
    description:
      "Plus is shared infrastructure. The same dashboard, analytics and AI power the review plate, the business card and everything you add next.",
    icon: "layers",
  },
  {
    title: "Engineered to last",
    description:
      "Waterproof, scratch-resistant materials and industrial-grade chips rated for hundreds of thousands of taps.",
    icon: "shield",
  },
  {
    title: "Reprogrammable for life",
    description:
      "Point a tag at a new destination whenever your business changes. The hardware you buy once keeps earning.",
    icon: "refresh",
  },
  {
    title: "Built for local business",
    description:
      "Made for restaurants, bars and shops in Puglia and beyond — live in under two minutes, insight from day one.",
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
    title: "Choose your product",
    description:
      "Start with the Google Review plate on your counter, add NFC cards for the team, an Apple Wallet pass for regulars — one line-up, one platform.",
  },
  {
    number: "02",
    title: "Link it in seconds",
    description:
      "Tap to program the destination: a review page, a profile, a wallet pass or any URL. Change it anytime from your dashboard.",
  },
  {
    number: "03",
    title: "Tap, connect, measure",
    description:
      "Your customer taps their phone and the experience opens instantly — while every interaction flows into Kontap Plus as analytics.",
  },
];

export type Product = {
  name: string;
  tagline: string;
  description: string;
  /** slug used for the product image at /products/<image>.png */
  image: string;
  /** short spec chips shown under the description */
  specs: string[];
};

/** The 3-product display. Photos are dropped in at /public/products/<image>.png
 *  (transparent PNG, long edge ≥ 2000px). A branded placeholder renders until
 *  the real photo is added. */
export const products: Product[] = [
  {
    name: "Google Review Plate",
    tagline: "The entry product",
    description:
      "A premium counter plate that sends happy customers straight to your Google review page with one tap. The fastest way to grow your rating.",
    image: "review-plate",
    specs: ["Counter-top", "Reprogrammable", "Waterproof"],
  },
  {
    name: "NFC Business Card",
    tagline: "Your profile in a tap",
    description:
      "Share contact, socials and links instantly. Metal and premium finishes, one card for the whole team — every tap tracked in Plus.",
    image: "business-card",
    specs: ["Metal finish", "Contact + socials", "Team-ready"],
  },
  {
    name: "Apple Wallet Card",
    tagline: "Live in the wallet",
    description:
      "A dynamic pass that updates in real time and never leaves your customer's phone. Loyalty, offers and reminders, always one swipe away.",
    image: "wallet-card",
    specs: ["Apple Wallet", "Real-time", "Loyalty & offers"],
  },
];

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "Do my customers need an app to use Kontap?",
    answer:
      "No. NFC is built into every modern iPhone and Android. Your customer simply holds their phone near the Kontap product and the experience opens in their browser — nothing to install.",
  },
  {
    question: "Is Kontap only for Google reviews?",
    answer:
      "Not at all. The Google Review plate is our entry product, but Kontap is a multi-product NFC company. The same tap can open a business card, an Apple Wallet pass, a menu, a payment link and more — all managed from one platform.",
  },
  {
    question: "What is Kontap Plus?",
    answer:
      "Plus is our SaaS subscription — shared infrastructure across every Kontap product. It turns each tap into analytics (traffic, timing, location and conversion), adds AI-powered review analysis and sends automated reports so you always know what's working.",
  },
  {
    question: "Can I change where a Kontap product points after I buy it?",
    answer:
      "Yes. Every Kontap product is reprogrammable. Update the destination — a review link, profile, wallet pass or URL — as many times as you like from your dashboard.",
  },
  {
    question: "How durable is the hardware?",
    answer:
      "Kontap products use waterproof, scratch-resistant materials and industrial-grade NFC chips rated for hundreds of thousands of taps, so they hold up on a busy counter or in a pocket.",
  },
  {
    question: "Do you ship in Italy?",
    answer:
      "Yes. Kontap is based in Puglia and ships across Italy — with worldwide shipping available. Options and timelines are shown at checkout based on your destination.",
  },
];

export const footer = {
  columns: [
    {
      title: "Products",
      links: [
        { label: "Google Review Plate", href: "#products" },
        { label: "NFC Business Card", href: "#products" },
        { label: "Apple Wallet Card", href: "#products" },
        { label: "Smart NFC Products", href: "#products" },
      ],
    },
    {
      title: "Platform",
      links: [
        { label: "How it works", href: "#how" },
        { label: "Kontap Plus", href: "#plus" },
        { label: "Use cases", href: "#usecases" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Contact", href: "#cta" },
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
      ],
    },
  ],
} as const;
