/* eslint-disable */
/* @typescript-eslint/no-unused-vars */
/* @typescript-eslint/no-explicit-any */
/* react/jsx-no-duplicate-props */
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaHome, FaProjectDiagram, FaTools, FaEnvelope
} from "react-icons/fa";

interface PageLoadingScreenProps {
  isLoading: boolean;
  targetPage: string;
}

// Simple page configurations - just icons and colors
const pageConfigs = {
  "/": {
    icon: FaHome,
    color: "#3b82f6", // blue-500
    name: "Home"
  },
  "/projects": {
    icon: FaProjectDiagram,
    color: "#06b6d4", // cyan-500
    name: "Projects"
  },
  "/skills": {
    icon: FaTools,
    color: "#8b5cf6", // violet-500
    name: "Skills"
  },
  "/contact": {
    icon: FaEnvelope,
    color: "#10b981", // emerald-500
    name: "Contact"
  }
};

export default function PageLoadingScreen({ isLoading, targetPage }: PageLoadingScreenProps) {
  // Get page config, default to home if not found
  const config = pageConfigs[targetPage as keyof typeof pageConfigs] || pageConfigs["/"];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
          style={{
            pointerEvents: isLoading ? 'auto' : 'none'
          }}
          onAnimationComplete={(definition) => {
            // Ensure pointer events are disabled when exit animation completes
            if (definition.opacity === 0) {
              const element = document.querySelector('[data-loading-overlay]');
              if (element) {
                (element as HTMLElement).style.pointerEvents = 'none';
              }
            }
          }}
          data-loading-overlay
        >
          {/* Simple icon animation */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.2,
              ease: "easeOut"
            }}
          >
            {/* Page Icon with smooth pop animation */}
            <motion.div
              className="relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.3,
                ease: "easeOut"
              }}
            >
              {/* Icon glow effect - smooth and subtle */}
              <motion.div
                className="absolute inset-0 rounded-full blur-lg"
                style={{ backgroundColor: config.color }}
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                  scale: [0.9, 1.1, 0.9]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "loop"
                }}
              />
              
              {/* Main Icon - subtle breathing effect */}
              <motion.div
                className="relative z-10 w-16 h-16 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-lg"
                style={{ 
                  boxShadow: `0 0 30px ${config.color}40`
                }}
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "loop"
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                    delay: 0.05
                  }}
                >
                  {React.createElement(config.icon, {
                    className: "text-3xl",
                    style: { color: config.color }
                  })}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Simple loading dots - staggered and smooth */}
            <motion.div 
              className="flex space-x-2 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 0.2,
                delay: 0.1,
                ease: "easeOut"
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: config.color }}
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                    repeatType: "loop"
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 