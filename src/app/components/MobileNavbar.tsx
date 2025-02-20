"use client";

import Link from "next/link";
import { FaHome, FaProjectDiagram, FaTools, FaEnvelope } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";

export default function MobileBottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 dark:bg-gray-900 text-white flex justify-around items-center p-4 h-20 shadow-lg z-50">
      <Link href="/" className="flex flex-col items-center">
        <motion.div whileTap={{ scale: 0.9 }}>
          <FaHome className="text-2xl" />
        </motion.div>
        <span className="text-sm mt-1">Overview</span>
      </Link>
      <Link href="/projects" className="flex flex-col items-center">
        <motion.div whileTap={{ scale: 0.9 }}>
          <FaProjectDiagram className="text-2xl" />
        </motion.div>
        <span className="text-sm mt-1">Projects</span>
      </Link>
      <Link href="/skills" className="flex flex-col items-center">
        <motion.div whileTap={{ scale: 0.9 }}>
          <FaTools className="text-2xl" />
        </motion.div>
        <span className="text-sm mt-1">Skills</span>
      </Link>
      <Link href="/contact" className="flex flex-col items-center">
        <motion.div whileTap={{ scale: 0.9 }}>
          <FaEnvelope className="text-2xl" />
        </motion.div>
        <span className="text-sm mt-1">Contact</span>
      </Link>
      <div className="flex flex-col items-center">
        <ThemeToggle />
      </div>
    </div>
  );
}
