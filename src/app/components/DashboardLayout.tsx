"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import PageTransition from "./PageTransition";
import Loading from "../Loading";
import { Suspense } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white dark:bg-gray-900 flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          My Dashboard
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/" className="block px-4 py-2 rounded hover:bg-gray-700">
            Overview
          </Link>
          <Link href="/projects" className="block px-4 py-2 rounded hover:bg-gray-700">
            Projects
          </Link>
          <Link href="/skills" className="block px-4 py-2 rounded hover:bg-gray-700">
            Skills
          </Link>
          <Link href="/contact" className="block px-4 py-2 rounded hover:bg-gray-700">
            Contact
          </Link>
        </nav>

        {/* Theme Toggle */}
        <div className="p-4">
          <ThemeToggle />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <PageTransition>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </PageTransition>
      </main>
    </div>
  );
}
