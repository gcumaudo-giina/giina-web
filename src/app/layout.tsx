import type { Metadata } from "next";
import Loader from "@/components/ui/Loader";
import CursorCustom from "@/components/ui/CursorCustom";
import "@fontsource/open-sauce-one/300.css";
import "@fontsource/open-sauce-one/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "GIINA - Making Design Transcendent",
  description: "The design atelier. Warm minimalism, silent luxury and technical precision. Marbella, Spain.",
  keywords: ["interior design", "interiorismo", "Marbella", "luxury", "diseno interiores", "Costa del Sol"],
  openGraph: {
    title: "GIINA - Making Design Transcendent",
    description: "The design atelier. Warm minimalism, silent luxury and technical precision.",
    siteName: "GIINA Design",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-off-white text-technical-grey">
        <CursorCustom />
        <Loader />
        {children}
      </body>
    </html>
  );
}
