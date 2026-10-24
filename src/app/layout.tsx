import type { Metadata } from "next";
import {
  Space_Grotesk, // design-ok
  Inter, // design-ok
  JetBrains_Mono,
  Syne,
  Cinzel,
  Playfair_Display,
  Cormorant_Garamond,
  Mrs_Saint_Delafield,
  Antonio,
  Plus_Jakarta_Sans,
  Instrument_Serif,
  DM_Sans,
  Archivo_Black,
  IBM_Plex_Mono,
  Fraunces,
  Bodoni_Moda,
  Bebas_Neue,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ThemeFontSwitcher from "@/components/ThemeFontSwitcher";

const spaceGrotesk = Space_Grotesk({ // design-ok
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({ // design-ok
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

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const mrsSaintDelafield = Mrs_Saint_Delafield({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-signature",
  display: "swap",
});

const antonio = Antonio({
  subsets: ["latin"],
  variable: "--font-antonio",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-archivo-black",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-mono",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
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
    title: "A.GURE · Web Developer & Designer",
    description: "I build and redesign websites. Based in Oslo.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "A.GURE · Web Developer & Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A.GURE · Web Developer & Designer",
    description: "I build and redesign websites. Based in Oslo.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVars = [
    spaceGrotesk.variable,
    inter.variable,
    jetbrainsMono.variable,
    syne.variable,
    cinzel.variable,
    playfair.variable,
    cormorant.variable,
    mrsSaintDelafield.variable,
    antonio.variable,
    plusJakartaSans.variable,
    instrumentSerif.variable,
    dmSans.variable,
    archivoBlack.variable,
    ibmPlexMono.variable,
    fraunces.variable,
    bodoniModa.variable,
    bebasNeue.variable,
  ].join(" ");

  return (
    <html
      lang="en"
      className={`${fontVars} font-pair-0 theme-paper`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=comico@400&f[]=clash-display@600,700&f[]=cabinet-grotesk@700,800&f[]=zodiak@400,700&f[]=boska@500,700&f[]=gambarino@400&f[]=panchang@600,700&f[]=satoshi@500,700&f[]=general-sans@500,600&f[]=telma@500,700&f[]=khand@600,700&f[]=chillax@500,600&f[]=ranade@500,700&f[]=sentient@500,700&f[]=supreme@500,700&f[]=technor@600,700&f[]=array@400,700&f[]=stardom@400&display=swap"
        />
      </head>
      <body className="antialiased min-h-svh selection:bg-foreground selection:text-background">
        <ThemeFontSwitcher />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
