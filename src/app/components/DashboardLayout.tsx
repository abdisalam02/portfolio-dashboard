/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { useState, Suspense } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import PageTransition from "./PageTransition";
import Loading from "../Loading";
import { FiMenu, FiX } from "react-icons/fi";
import { FaHome, FaProjectDiagram, FaTools, FaEnvelope } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Sidebar animation variants
const sidebarVariants = {
  expanded: {
    width: 256,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  collapsed: {
    width: 64,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 35,
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

// Text-only variants for nav items
const navTextVariants = {
  expanded: {
    opacity: 1,
    x: 0,
    display: "block",
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 20
    }
  },
  collapsed: {
    opacity: 0,
    x: -20,
    transitionEnd: {
      display: "none"
    },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
};

function HoverThemeToggle() {
  return (
    <motion.div 
      className="relative group p-2 inline-block" 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ThemeToggle />
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileHover={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-1 bg-gray-200 text-gray-800 rounded shadow text-xs pointer-events-none"
      >
        Theme
      </motion.div>
    </motion.div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const navItems = [
    { href: "/", icon: FaHome, text: "Overview" },
    { href: "/projects", icon: FaProjectDiagram, text: "Projects" },
    { href: "/skills", icon: FaTools, text: "Skills" },
    { href: "/contact", icon: FaEnvelope, text: "Contact" }
  ];

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Mobile Navbar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="md:hidden flex items-center justify-between p-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-md dark:from-gray-900 dark:to-gray-800"
      >
        <motion.button 
          onClick={() => setSidebarOpen(true)} 
          className="focus:outline-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiMenu className="text-2xl" />
        </motion.button>
        <span className="text-2xl font-bold">My Dashboard</span>
        <ThemeToggle />
      </motion.div>

      {/* Desktop Sidebar */}
      <motion.aside
        initial="collapsed"
        animate={expanded ? "expanded" : "collapsed"}
        variants={sidebarVariants}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className="hidden md:flex flex-col bg-gray-800 text-white dark:bg-gray-900 overflow-hidden"
      >
        <motion.div className="h-16 border-b border-gray-700 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {expanded ? (
              <motion.span
                key="full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="text-2xl font-bold"
              >
                My Dashboard
              </motion.span>
            ) : (
              <motion.span
                key="mini"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="text-xl font-bold"
              >
                MD
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        <nav className="flex-1 p-2 space-y-2">
          {navItems.map((item, index) => (
            <Link key={item.href} href={item.href}>
              <motion.div
                className="flex items-center px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center justify-center w-8">
                  <item.icon className="text-lg" />
                </div>
                <motion.span
                  variants={navTextVariants}
                  className="ml-3"
                >
                  {item.text}
                </motion.span>
              </motion.div>
            </Link>
          ))}
        </nav>
        
        <div className="p-4 flex justify-center">
          <HoverThemeToggle />
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 left-0 w-64 bg-gray-800 text-white dark:bg-gray-900 z-50"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between p-4">
                <span className="text-2xl font-bold">My Dashboard</span>
                <motion.button
                  onClick={() => setSidebarOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiX className="text-2xl" />
                </motion.button>
              </div>
              
              <nav className="flex-1 mt-4 space-y-4 p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center space-x-3 px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                  >
                    <item.icon className="text-lg" />
                    <span>{item.text}</span>
                  </Link>
                ))}
              </nav>
              
              <div className="p-4 flex justify-center">
                <HoverThemeToggle />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.main
        className="flex-1 p-6 overflow-y-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
      >
        <PageTransition>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </PageTransition>
      </motion.main>
    </div>
  );
} 