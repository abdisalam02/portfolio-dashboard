"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate page load delay
    const timer = setTimeout(() => {
      setLoading(false); // Mark loading as false after simulated load
    }, 300); // Adjust this delay as needed

    return () => {
      clearTimeout(timer); // Cleanup timer on component unmount
      setLoading(true); // Reset loading for the next transition
    };
  }, [pathname]); // Re-run whenever the route changes

  if (loading) {
    return null; // Show nothing while "loading"
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
