import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const SITE_URL = "https://kontap.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kontap — Un tap che fa crescere la tua attività",
    template: "%s · Kontap",
  },
  description:
    "Kontap crea hardware NFC premium e la piattaforma Plus — analisi delle recensioni con l'AI, report automatici e statistiche — per le attività locali. Un tap trasforma un'interazione fisica in un'esperienza digitale.",
  keywords: [
    "NFC",
    "targa recensioni Google",
    "biglietto da visita NFC",
    "carta Apple Wallet",
    "prodotti NFC smart",
    "recensioni Google",
    "Puglia",
    "Kontap",
  ],
  authors: [{ name: "Kontap" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    locale: "it_IT",
    title: "Kontap — Un tap che fa crescere la tua attività",
    description:
      "Hardware NFC premium e la piattaforma Plus. Un tap collega il fisico e il digitale.",
    siteName: "Kontap",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontap — Un tap che fa crescere la tua attività",
    description:
      "Hardware NFC premium e la piattaforma Plus. Un tap collega il fisico e il digitale.",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="it"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
