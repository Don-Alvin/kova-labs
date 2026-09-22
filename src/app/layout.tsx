import type { Metadata } from "next";
import { montserrat } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { Analytics } from "@/components/layout/Analytics";
import { ConversionEvents } from "@/components/layout/ConversionEvents";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "KovaLab | Software Solutions Studio",
    template: "%s | KovaLab",
  },
  description:
    "Based in Kisumu, Kenya, we build websites, web applications, and custom software for businesses across East Africa. Websites from KSh 15,000.",
  authors: [{ name: "KovaLab" }],
  metadataBase: new URL(SITE_URL),
  manifest: "/site.webmanifest",
  // Every other route sets its own via pageMetadata() in src/lib/metadata.ts.
  // This one covers the homepage, which has no metadata export of its own.
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "KovaLab | Software Solutions Studio",
    description:
      "Based in Kisumu, Kenya, we build websites, web applications, and custom software for businesses across East Africa. Websites from KSh 15,000.",
    url: SITE_URL,
    siteName: "KovaLab",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KovaLab | Software Solutions Studio",
    description:
      "Based in Kisumu, Kenya, we build websites, web applications, and custom software for businesses across East Africa. Websites from KSh 15,000.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-50 focus:bg-text focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-text-light"
        >
          Skip to content
        </a>

        <Navbar />

        <main id="main" className="flex-1 pt-24">
          {children}
        </main>

        <Footer />

        <WhatsAppButton />
        <CookieConsent />
        <Analytics />
        <ConversionEvents />
      </body>
    </html>
  );
}
