import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VoiceConcierge } from "@/components/ai/VoiceConcierge";
import { StickyBookCta } from "@/components/layout/StickyBookCta";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#050508",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} · ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Cyber-luxe tattoo art by Ozzy Fox — portfolio, booking, $100 deposits, and Fox Concierge AI assistant.",
  openGraph: {
    title: `${SITE_NAME} · ${SITE_TAGLINE}`,
    description: "Book custom work, pay deposits, and explore portfolio.",
    url: siteUrl,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} h-full scroll-smooth`}>
      <body className="relative flex min-h-full flex-col font-sans text-foreground">
        <div className="noise-overlay" aria-hidden />
        <Navbar />
        <main className="relative z-10 flex-1 pb-24 max-sm:pb-28 sm:pb-20 md:pb-16">
          {children}
        </main>
        <Footer />
        <StickyBookCta />
        <VoiceConcierge />
        <Analytics />
      </body>
    </html>
  );
}
