"use client";

import { ThemeProvider } from "next-themes";
import "./globals.css";
import ThemeToggle from "./components/ThemeToggle";
import DashboardLayout from "./components/DashboardLayout";
import { Suspense } from "react";
import Loading from "./Loading";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          <DashboardLayout>
            {/* Header */}
            <div className="p-4 flex justify-end bg-gray-200 dark:bg-gray-700">
              <ThemeToggle />
            </div>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </DashboardLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
