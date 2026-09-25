import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const SITE_URL = "https://kontap.it";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kontap — Un tap che fa crescere la tua attività",
    template: "%s · Kontap",
  },
  description:
    "La targa NFC Kontap porta i tuoi clienti a lasciarti una recensione Google con un solo tap. Con Kontap Plus: analisi AI delle recensioni, report automatici e statistiche. Made in Puglia.",
  keywords: [
    "NFC",
    "targa recensioni Google",
    "targa NFC",
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
      "La targa NFC che trasforma ogni cliente soddisfatto in una recensione Google. Un tap, nessuna app.",
    siteName: "Kontap",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontap — Un tap che fa crescere la tua attività",
    description:
      "La targa NFC che trasforma ogni cliente soddisfatto in una recensione Google. Un tap, nessuna app.",
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
