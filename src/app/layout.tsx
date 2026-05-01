import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./utils/providers";
import BrutalistNavbar from "./components/NavbarLayout";
import CustomCursor from "./components/CustomCursor";
import AccentPicker from "./components/AccentPicker";
import Footer from "./components/Footer";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700", "800"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AG — Designer & Developer",
  description: "Portfolio of Abdisalam Gure. Precision interfaces. Brutal functionality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${mono.variable} ${sans.variable} font-mono antialiased`}>
        <Providers>
          {/* Grid Overlay */}
          <div className="fixed inset-0 -z-10 brutalist-grid pointer-events-none" />
          <CustomCursor />
          <AccentPicker />
          <BrutalistNavbar>
            {children}
            <Footer />
          </BrutalistNavbar>
        </Providers>
      </body>
    </html>
  );
}
