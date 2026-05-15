import type { Metadata } from "next";
import { Forum, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import Loader from "@/components/ui/Loader";
import "./globals.css";

/* Open Sauce One — self-hosted (place files in public/fonts/) */
const openSauceOne = localFont({
  src: [
    { path: "../../public/fonts/OpenSauceOne-Light.woff2",    weight: "300" },
    { path: "../../public/fonts/OpenSauceOne-Regular.woff2",  weight: "400" },
    { path: "../../public/fonts/OpenSauceOne-Medium.woff2",   weight: "500" },
    { path: "../../public/fonts/OpenSauceOne-SemiBold.woff2", weight: "600" },
  ],
  variable: "--font-open-sauce-one",
  display: "swap",
});

const forum = Forum({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-forum",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["200", "300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["300", "400"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GIINA — Making Design Transcendent",
  description: "The design atelier. Warm minimalism, silent luxury and technical precision. Marbella, Spain.",
  keywords: ["interior design", "interiorismo", "Marbella", "luxury", "diseño interiores", "Costa del Sol"],
  openGraph: {
    title: "GIINA — Making Design Transcendent",
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
    <html
      lang="en"
      className={`${openSauceOne.variable} ${forum.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-off-white text-technical-grey">
        <Loader />
        {children}
      </body>
    </html>
  );
}
