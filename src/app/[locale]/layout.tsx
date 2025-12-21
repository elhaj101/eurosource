import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { DM_Sans } from "next/font/google";
import { ServiceWorkerProvider } from "@/hooks/use-service-worker";
import { WebVitalsMonitor } from "@/components/web-vitals-monitor";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import "../globals.css";

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'de' }, { locale: 'ar' }, { locale: 'zh' }];
}

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Ensure that the incoming `locale` is valid
  if (!['en', 'de', 'ar', 'zh'].includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="canonical" href="https://eurosource.de" />
      </head>
      <body
        className={`${dmSans.variable} antialiased`}
        style={{ fontFamily: 'var(--font-dm-sans), system-ui, sans-serif' }}
      >
        <NextIntlClientProvider messages={messages}>
          <WebVitalsMonitor />
          <ServiceWorkerProvider>{children}</ServiceWorkerProvider>
        </NextIntlClientProvider>
        {/* Google Analytics - Replace G-MEASUREMENT_ID with your actual ID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-MEASUREMENT_ID');
          `}
        </Script>
      </body>
    </html>
  );
}
