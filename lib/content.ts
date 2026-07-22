/**
 * Single source of truth for site copy and structured content.
 * Sections read from here so layout stays declarative and easy to edit.
 */

export const nav = {
  links: [
    { label: "Products", href: "#products" },
    { label: "How it works", href: "#how" },
    { label: "Kontap OS", href: "#os" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: { label: "Get started", href: "#cta" },
} as const;

export const useCases = [
  "Restaurants",
  "Clinics",
  "Creators",
  "Agencies",
  "Retail",
  "Real estate",
  "Events",
  "Studios",
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
    title: "Reprogrammable for life",
    description:
      "Point a tag at a new destination whenever your business changes. The hardware you buy once keeps earning.",
    icon: "refresh",
  },
  {
    title: "Engineered to last",
    description:
      "Waterproof, scratch-resistant materials and industrial-grade chips rated for hundreds of thousands of taps.",
    icon: "shield",
  },
  {
    title: "Instant to set up",
    description:
      "Unbox, tap to configure, place it anywhere. Most customers are live in under two minutes.",
    icon: "bolt",
  },
  {
    title: "Analytics-ready",
    description:
      "Every tap is a signal. Kontap OS turns them into insight — traffic, timing, conversion and location.",
    icon: "chart",
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
      "Pick the Kontap hardware that fits — a review plate for the counter, a card for your pocket, a tag for a collar.",
  },
  {
    number: "02",
    title: "Link it in seconds",
    description:
      "Tap to program the destination: a review page, a profile, a wallet pass, a URL. Change it anytime.",
  },
  {
    number: "03",
    title: "Tap to connect",
    description:
      "Your customer taps their phone. The experience opens instantly — and every interaction flows into your dashboard.",
  },
];

export type Product = {
  name: string;
  tagline: string;
  description: string;
  badge?: string;
  visual: "review" | "card" | "wallet" | "pettag" | "smart" | "os";
  span?: "wide" | "default";
};

export const products: Product[] = [
  {
    name: "Google Review Plate",
    tagline: "More reviews, on autopilot",
    description:
      "A premium counter plate that sends happy customers straight to your review page with one tap.",
    visual: "review",
    span: "wide",
  },
  {
    name: "NFC Business Card",
    tagline: "Your whole profile in a tap",
    description:
      "Share contact, socials and links instantly. Metal and premium finishes available.",
    visual: "card",
  },
  {
    name: "Apple Wallet Card",
    tagline: "Live in the wallet",
    description:
      "A dynamic pass that updates in real time and never leaves your customer's phone.",
    visual: "wallet",
  },
  {
    name: "Pet Tag",
    tagline: "Bring them home faster",
    description:
      "A durable tag that shows your contact details and location the moment someone taps it.",
    visual: "pettag",
  },
  {
    name: "Smart NFC Products",
    tagline: "A tap for everything",
    description:
      "Stands, stickers, wristbands and bespoke hardware — engineered for any surface or use case.",
    visual: "smart",
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
    question: "Can I change where a Kontap product points after I buy it?",
    answer:
      "Yes. Every Kontap product is reprogrammable. Update the destination — a review link, profile, wallet pass or URL — as many times as you like from your dashboard.",
  },
  {
    question: "Is Kontap only for Google reviews?",
    answer:
      "Not at all. Reviews are one popular use case, but Kontap is a technology platform. The same tap can open a business card, an Apple Wallet pass, a menu, a payment link, a pet's profile and more.",
  },
  {
    question: "How durable is the hardware?",
    answer:
      "Kontap products use waterproof, scratch-resistant materials and industrial-grade NFC chips rated for hundreds of thousands of taps, so they hold up on a counter, in a pocket or on a collar.",
  },
  {
    question: "What is Kontap OS?",
    answer:
      "Kontap OS is our upcoming software platform. It turns every tap into analytics — traffic, timing, location and conversion — with AI insights that help you understand and grow engagement. Join the waitlist to get early access.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes. Kontap ships worldwide. Shipping options and timelines are shown at checkout based on your destination.",
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
        { label: "Pet Tag", href: "#products" },
        { label: "Smart NFC Products", href: "#products" },
      ],
    },
    {
      title: "Platform",
      links: [
        { label: "How it works", href: "#how" },
        { label: "Kontap OS", href: "#os" },
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
