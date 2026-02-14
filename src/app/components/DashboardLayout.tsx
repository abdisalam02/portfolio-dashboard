/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import React, { useState, useEffect, Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";
import LoadingLink from "./LoadingLink";
import ThemeToggle from "./ThemeToggle";
import PageTransition from "./PageTransition";
import Loading from "../Loading";
import { FiMenu, FiX } from "react-icons/fi";
import { FaHome, FaProjectDiagram, FaTools, FaEnvelope, FaFilePdf } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";
import LiquidNavigation from "./LiquidNavigation";

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
    <MagneticButton
      className="relative group p-2 inline-block"
      magneticStrength={0.3}
    >
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <ThemeToggle />
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded shadow text-xs pointer-events-none whitespace-nowrap"
        >
          Toggle Theme
        </motion.div>
      </motion.div>
    </MagneticButton>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: "/", icon: FaHome, text: "Overview" },
    { href: "/projects", icon: FaProjectDiagram, text: "Projects" },
    { href: "/skills", icon: FaTools, text: "Skills" },
    { href: "/resume", icon: FaFilePdf, text: "Resume" },
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
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">My Dashboard</span>
        <ThemeToggle />
      </motion.div>

      {/* Desktop Sidebar with glass morphism */}
      <motion.aside
        initial="collapsed"
        animate={expanded ? "expanded" : "collapsed"}
        variants={sidebarVariants}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className="hidden md:flex flex-col bg-gradient-to-b from-gray-800 to-gray-900 text-white dark:from-gray-900 dark:to-black overflow-hidden backdrop-blur-sm border-r border-white/10"
      >
        <motion.div className="h-16 border-b border-gray-700/50 flex items-center justify-center overflow-hidden px-2">
          <AnimatePresence mode="wait">
            {expanded ? (
              <motion.span
                key="full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
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
                className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
              >
                MD
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="flex-1 p-3">
          <LiquidNavigation
            items={navItems}
            activeIndex={navItems.findIndex(item => item.href === pathname)}
            onItemClick={(index) => {
              const target = navItems[index];
              if (target) {
                router.push(target.href);
              }
            }}
            expanded={expanded}
          />
        </div>
        
        <div className="p-4 flex justify-center">
          <HoverThemeToggle />
        </div>
      </motion.aside>

      {/* Mobile Sidebar with glass morphism */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white dark:from-gray-900 dark:to-black z-50 border-r border-white/10"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">My Dashboard</span>
                <motion.button
                  onClick={() => setSidebarOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiX className="text-2xl" />
                </motion.button>
              </div>
              
              <nav className="flex-1 mt-4 space-y-4 p-4">
                {navItems.map((item, index) => (
                  <LoadingLink
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <motion.div 
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors relative overflow-hidden group"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Add hover effect */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300"
                      ></motion.div>
                      
                      <item.icon className="text-lg relative z-10" />
                      <span className="relative z-10">{item.text}</span>
                    </motion.div>
                  </LoadingLink>
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