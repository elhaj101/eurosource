import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "EuroSource | Order Quality Products from Germany",
  description:
    "Order quality products directly from Germany and Europe. Supplier sourcing, logistics, customs clearance, and manufacturing solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
