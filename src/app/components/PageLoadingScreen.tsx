"use client";

import { motion, AnimatePresence } from "framer-motion";

interface PageLoadingScreenProps {
  isLoading: boolean;
  targetPage: string;
}

export default function PageLoadingScreen({ isLoading }: PageLoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          style={{ pointerEvents: isLoading ? "auto" : "none" }}
          data-loading-overlay
        >
          <motion.span
            className="text-xs font-bold tracking-widest"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            LOADING...
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}