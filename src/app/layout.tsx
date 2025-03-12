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
      <body className="bg-gray-50 dark:bg-gray-900">
        {/* Add subtle background pattern */}
        <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        
        <ThemeProvider attribute="class" defaultTheme="light">
          {isMobile ? (
            <div className="min-h-screen relative">
              {/* Decorative elements */}
              <div className="fixed top-0 left-0 w-full h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-b-full blur-3xl -z-10"></div>
              <div className="fixed bottom-0 right-0 w-full h-64 bg-gradient-to-l from-green-500/10 to-yellow-500/10 rounded-t-full blur-3xl -z-10"></div>
              
              {/* Mobile Navbar on top */}
              <MobileNavbar />
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
          ) : (
            <div className="relative">
              {/* Decorative elements for desktop */}
              <div className="fixed top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10"></div>
              <div className="fixed bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-500/10 to-yellow-500/10 rounded-full blur-3xl -z-10"></div>
              
              <DashboardLayout>
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </DashboardLayout>
            </div>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
