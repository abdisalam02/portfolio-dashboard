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
  title: "A.Gure — Independent Web Designer & Developer",
  description: "Bespoke web platforms, creative UI engineering, and high-converting digital flagships for ambitious businesses and brands. Based in Oslo.",
  openGraph: {
    title: "A.Gure — Independent Web Designer & Developer",
    description: "Bespoke digital platforms & creative web design. Oslo, Norway.",
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${syne.variable} ${cinzel.variable} font-pair-1 theme-obsidian`}
    >
      <body className="antialiased min-h-screen selection:bg-white selection:text-black">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
