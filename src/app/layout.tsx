"use client";

import { ThemeProvider } from "next-themes";
import "./globals.css";
import DashboardLayout from "./components/DashboardLayout";
import MobileNavbar from "./components/MobileNavbar"; // import the new component
import { Suspense } from "react";
import Loading from "./Loading";
import { useIsMobile } from "./hooks/useIsMobile";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile(); // returns true when window.innerWidth < 768 (for example)

  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          {isMobile ? (
            <>
              {/* Mobile Navbar on top */}
              <MobileNavbar />
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </>
          ) : (
            <DashboardLayout>
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </DashboardLayout>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
