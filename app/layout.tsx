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
    "Kontap builds premium NFC hardware and the Plus platform — AI review analysis, automated reports and analytics — for local businesses. One tap turns a physical interaction into a digital experience.",
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
  themeColor: "#ffffff",
  colorScheme: "light",
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
