import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ServiceWorkerProvider } from "@/hooks/use-service-worker";
import { WebVitalsMonitor } from "@/components/web-vitals-monitor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "EuroSource | Order Quality Products from Germany",
  description: "Order quality products directly from Germany and Europe. Supplier sourcing, logistics, customs clearance, and manufacturing solutions.",
  keywords: "European suppliers, Germany products, manufacturing, import/export, sourcing, EU trade",
  authors: [{ name: "EuroSource" }],
  creator: "EuroSource",
  publisher: "EuroSource",
  robots: "index, follow",
  metadataBase: new URL("https://eurosource.de"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eurosource.de",
    siteName: "EuroSource",
    title: "EuroSource | Order Quality Products from Germany",
    description: "Order quality products directly from Germany and Europe. Supplier sourcing & logistics.",
    images: [
      {
        url: "/shipping-container-eu-2.webp",
        width: 1920,
        height: 1080,
        alt: "EuroSource - Shipping Container",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EuroSource | Order Quality Products from Germany",
    description: "Order quality products directly from Germany and Europe.",
    creator: "@eurosource",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="canonical" href="https://eurosource.de" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WebVitalsMonitor />
        <ServiceWorkerProvider>{children}</ServiceWorkerProvider>
      </body>
    </html>
  );
}
