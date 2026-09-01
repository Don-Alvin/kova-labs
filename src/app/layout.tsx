import type { Metadata } from "next";
import { montserrat } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "KovaLab | Coming Soon",
  description:
    "KovaLab is a software solutions studio helping businesses across East Africa get online. Launching soon.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "KovaLab | Coming Soon",
    description:
      "A software solutions studio helping businesses across East Africa get online. Launching soon.",
    url: "https://kovalab.co.ke",
    siteName: "KovaLab",
    locale: "en_KE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
