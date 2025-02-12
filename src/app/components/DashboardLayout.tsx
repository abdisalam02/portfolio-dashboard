"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import PageTransition from "./PageTransition";
import Loading from "../Loading";
import { FiMenu, FiX } from "react-icons/fi";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-800 text-white dark:bg-gray-900">
        <button onClick={() => setSidebarOpen(true)} className="focus:outline-none">
          <FiMenu className="text-2xl" />
        </button>
        <span className="text-2xl font-bold">My Dashboard</span>
        <div>
          <ThemeToggle />
        </div>
      </div>

      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex w-64 bg-gray-800 text-white dark:bg-gray-900 flex-col">
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
        <div className="p-4">
          <ThemeToggle />
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 bg-gray-800 text-white dark:bg-gray-900 flex flex-col p-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">My Dashboard</span>
              <button onClick={() => setSidebarOpen(false)} className="focus:outline-none">
                <FiX className="text-2xl" />
              </button>
            </div>
            <nav className="flex-1 mt-4 space-y-2">
              <Link href="/" onClick={() => setSidebarOpen(false)} className="block px-4 py-2 rounded hover:bg-gray-700">
                Overview
              </Link>
              <Link href="/projects" onClick={() => setSidebarOpen(false)} className="block px-4 py-2 rounded hover:bg-gray-700">
                Projects
              </Link>
              <Link href="/skills" onClick={() => setSidebarOpen(false)} className="block px-4 py-2 rounded hover:bg-gray-700">
                Skills
              </Link>
              <Link href="/contact" onClick={() => setSidebarOpen(false)} className="block px-4 py-2 rounded hover:bg-gray-700">
                Contact
              </Link>
            </nav>
            <div className="p-4">
              <ThemeToggle />
            </div>
          </div>
          <div className="flex-1 bg-black opacity-50" onClick={() => setSidebarOpen(false)}></div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <PageTransition>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </PageTransition>
      </main>
    </div>
  );
}
