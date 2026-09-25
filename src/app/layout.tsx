import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Syne, Cinzel } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agure.space"),
  title: {
    default: "A.GURE — Web Developer & Designer",
    template: "%s | A.GURE",
  },
  description: "I build and redesign websites. Portfolio of A.Gure, based in Oslo.",
  authors: [{ name: "A.Gure", url: "https://agure.space" }],
  creator: "A.Gure",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://agure.space",
    siteName: "A.GURE",
    title: "A.GURE — Web Developer & Designer",
    description: "I build and redesign websites. Based in Oslo.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "A.GURE — Web Developer & Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A.GURE — Web Developer & Designer",
    description: "I build and redesign websites. Based in Oslo.",
    images: ["/og-image.png"],
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${syne.variable} ${cinzel.variable} font-pair-1 theme-paper`}
    >
      <body className="antialiased min-h-screen selection:bg-white selection:text-black">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
