"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative h-10 w-10 rounded-full bg-secondary text-secondary-foreground hover:bg-muted flex items-center justify-center border border-border transition-colors"
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{
          scale: theme === "dark" ? 0 : 1,
          opacity: theme === "dark" ? 0 : 1,
          rotate: theme === "dark" ? 90 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <FaSun className="h-5 w-5 text-orange-500" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: theme === "dark" ? 1 : 0,
          opacity: theme === "dark" ? 1 : 0,
          rotate: theme === "dark" ? 0 : -90,
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <FaMoon className="h-5 w-5 text-blue-400" />
      </motion.div>
    </motion.button>
  );
}
