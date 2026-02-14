import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "./utils/providers";
import FloatingNavbar from "./components/NavbarLayout";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Abdisalam Gure - Full Stack Developer",
  description: "Portfolio of Abdisalam Gure, a Full Stack Developer specializing in Next.js, React, and modern web technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans antialiased bg-background text-foreground selection:bg-cyan-500/30 transition-colors duration-300`}>
        <Providers>
           {/* Optimized Ambient Background - Static for performance */}
           <div className="fixed inset-0 -z-20 h-full w-full bg-background transition-colors duration-300">
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
              <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)] opacity-20 blur-[100px] pointer-events-none" />
           </div>
           
          <FloatingNavbar>{children}</FloatingNavbar>
        </Providers>
      </body>
    </html>
  );
}
