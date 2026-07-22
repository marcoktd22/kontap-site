import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const SITE_URL = "https://kontap.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kontap — Turn one tap into a digital experience",
    template: "%s · Kontap",
  },
  description:
    "Kontap builds premium NFC hardware and software that turn physical interactions into digital experiences. Review plates, NFC cards, Apple Wallet passes, pet tags and the upcoming Kontap OS analytics platform.",
  keywords: [
    "NFC",
    "NFC business cards",
    "Google review NFC plate",
    "Apple Wallet card",
    "NFC pet tag",
    "smart NFC products",
    "Kontap",
  ],
  authors: [{ name: "Kontap" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Kontap — Turn one tap into a digital experience",
    description:
      "Premium NFC hardware and software. One tap connects the physical and the digital.",
    siteName: "Kontap",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontap — Turn one tap into a digital experience",
    description:
      "Premium NFC hardware and software. One tap connects the physical and the digital.",
  },
};

export const viewport: Viewport = {
  themeColor: "#00051B",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
