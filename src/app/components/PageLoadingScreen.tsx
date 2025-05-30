/* eslint-disable */
/* @typescript-eslint/no-unused-vars */
/* @typescript-eslint/no-explicit-any */
/* react/jsx-no-duplicate-props */
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  FaHome, FaProjectDiagram, FaTools, FaEnvelope,
  FaCode, FaRocket, FaCog, FaStar, FaLaptopCode,
  FaDatabase, FaGitAlt, FaReact, FaNodeJs,
  FaPaperPlane, FaUserFriends, FaHandshake
} from "react-icons/fa";

interface PageLoadingScreenProps {
  isLoading: boolean;
  targetPage: string;
}

// Page-specific configurations
const pageConfigs = {
  "/": {
    name: "Home",
    icons: [FaHome, FaStar, FaRocket, FaCode],
    messages: ["Welcome back", "Loading portfolio", "Preparing showcase", "Almost ready"],
    colors: {
      primary: "from-blue-500 to-purple-600",
      secondary: "from-blue-400 to-purple-500",
      accent: "blue-500",
      particles: "bg-gradient-to-br from-blue-400/30 to-purple-500/30"
    },
    animation: "orbit"
  },
  "/projects": {
    name: "Projects",
    icons: [FaProjectDiagram, FaLaptopCode, FaGitAlt, FaDatabase],
    messages: ["Loading projects", "Fetching repositories", "Compiling code", "Deploying showcase"],
    colors: {
      primary: "from-blue-600 to-cyan-600",
      secondary: "from-blue-400 to-cyan-400",
      accent: "cyan-500",
      particles: "bg-gradient-to-br from-blue-400/30 to-cyan-500/30"
    },
    animation: "code"
  },
  "/skills": {
    name: "Skills",
    icons: [FaTools, FaReact, FaNodeJs, FaCog],
    messages: ["Loading skills", "Analyzing expertise", "Calculating proficiency", "Ready to showcase"],
    colors: {
      primary: "from-purple-600 to-indigo-600",
      secondary: "from-purple-400 to-indigo-400",
      accent: "purple-500",
      particles: "bg-gradient-to-br from-purple-400/30 to-indigo-500/30"
    },
    animation: "gears"
  },
  "/contact": {
    name: "Contact",
    icons: [FaEnvelope, FaPaperPlane, FaUserFriends, FaHandshake],
    messages: ["Loading contact", "Connecting networks", "Preparing channels", "Ready to connect"],
    colors: {
      primary: "from-indigo-600 to-blue-600",
      secondary: "from-indigo-400 to-blue-400",
      accent: "indigo-500",
      particles: "bg-gradient-to-br from-indigo-400/30 to-blue-500/30"
    },
    animation: "pulse"
  }
};

export default function PageLoadingScreen({ isLoading, targetPage }: PageLoadingScreenProps) {
  const [currentIcon, setCurrentIcon] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 800 });

  // Get page config, default to home if not found
  const config = pageConfigs[targetPage as keyof typeof pageConfigs] || pageConfigs["/"];

  // Handle window size safely
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });

      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      setCurrentIcon(0);
      const iconInterval = setInterval(() => {
        setCurrentIcon(prev => (prev + 1) % config.icons.length);
      }, 600);

      return () => {
        clearInterval(iconInterval);
      };
    }
  }, [isLoading, config.icons.length]);

  // Animation variants based on page
  const getAnimationVariant = () => {
    switch (config.animation) {
      case "code":
        return {
          container: {
            rotate: [0, 360],
            scale: [1, 1.05, 1],
            transition: { 
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }
          },
          orbital: {
            rotate: [0, -360],
            scale: [1, 1.2, 1],
            transition: { 
              rotate: { duration: 6, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }
          }
        };
      case "gears":
        return {
          container: {
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
            transition: { 
              rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }
          },
          orbital: {
            rotate: [0, -180, -360],
            scale: [1, 1.3, 1],
            transition: { 
              rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }
          }
        };
      case "pulse":
        return {
          container: {
            scale: [1, 1.2, 1, 1.1, 1],
            rotate: [0, 5, -5, 0],
            transition: { 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }
          },
          orbital: {
            scale: [1, 1.5, 1, 1.2, 1],
            opacity: [0.5, 1, 0.5, 0.8, 0.5],
            transition: { 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }
          }
        };
      default: // orbit
        return {
          container: {
            rotate: [0, 360],
            scale: [1, 1.05, 1],
            transition: { 
              rotate: { duration: 6, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }
          },
          orbital: {
            rotate: -360,
            scale: [1, 1.15, 1],
            transition: { 
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }
          }
        };
    }
  };

  const animations = getAnimationVariant();

  return (
    <AnimatePresence>
      {isLoading && (
        <>
          {/* Main loading overlay with page-specific styling */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.1,
              filter: "blur(10px)"
            }}
            transition={{ 
              exit: { duration: 0.8, ease: "easeInOut" }
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-md"
          >
            {/* Animated curtain reveal with page colors */}
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ 
                exit: { duration: 0.8, ease: "easeInOut" }
              }}
              className={`absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r ${config.colors.primary} opacity-20 z-10`}
            />
            
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ 
                exit: { duration: 0.8, ease: "easeInOut" }
              }}
              className={`absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l ${config.colors.primary} opacity-20 z-10`}
            />

            {/* Page-specific floating particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{
                    x: Math.random() * windowSize.width,
                    y: Math.random() * windowSize.height,
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    y: [
                      Math.random() * windowSize.height,
                      Math.random() * windowSize.height,
                      Math.random() * windowSize.height
                    ],
                    x: [
                      Math.random() * windowSize.width,
                      Math.random() * windowSize.width,
                      Math.random() * windowSize.width
                    ],
                    scale: [0, 1, 0],
                    opacity: [0, 0.7, 0],
                    rotate: [0, 360, 720]
                  }}
                  exit={{
                    scale: 0,
                    opacity: 0,
                    y: windowSize.height + 100
                  }}
                  transition={{
                    duration: 5 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut",
                    exit: { duration: 0.6, delay: Math.random() * 0.3 }
                  }}
                  className={`w-5 h-5 rounded-full ${config.colors.particles} shadow-lg`}
                />
              ))}
            </div>

            {/* Central loading element with page-specific animation */}
            <motion.div 
              className="relative z-20 text-center"
              exit={{
                scale: 0.8,
                opacity: 0,
                y: -50
              }}
              transition={{
                exit: { duration: 0.6, ease: "easeInOut" }
              }}
            >
              {/* Page title indicator */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4"
              >
                <span className={`text-sm font-medium text-${config.colors.accent} bg-${config.colors.accent}/10 px-3 py-1 rounded-full`}>
                  {config.name}
                </span>
              </motion.div>

              {/* Main icon container with page-specific animation */}
              <motion.div
                className="relative w-32 h-32 mx-auto mb-8"
                animate={animations.container}
              >
                {/* Outer orbital ring */}
                <motion.div
                  className={`absolute inset-0 border-2 border-${config.colors.accent}/30 rounded-full`}
                  animate={animations.orbital}
                />
                
                {/* Inner ring with page-specific gradient */}
                <motion.div
                  className={`absolute inset-4 border border-${config.colors.accent}/40 rounded-full bg-gradient-to-br ${config.colors.secondary}/10`}
                  animate={{ 
                    rotate: 360,
                    scale: [1, 0.9, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 5, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
                
                {/* Center icon with smooth transitions */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  key={currentIcon}
                  initial={{ 
                    scale: 0, 
                    opacity: 0, 
                    rotateY: 180,
                    filter: "blur(10px)"
                  }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1, 
                    rotateY: 0,
                    filter: "blur(0px)"
                  }}
                  exit={{ 
                    scale: 0, 
                    opacity: 0, 
                    rotateY: -180,
                    filter: "blur(5px)"
                  }}
                  transition={{ 
                    duration: 0.6, 
                    ease: "backOut",
                    filter: { duration: 0.3 }
                  }}
                >
                  {React.createElement(config.icons[currentIcon], {
                    className: `text-6xl text-${config.colors.accent} drop-shadow-lg`
                  })}
                </motion.div>

                {/* Orbiting mini icons with page theme */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-4 h-4 bg-gradient-to-br ${config.colors.secondary} rounded-full shadow-lg`}
                    animate={{
                      rotate: 360,
                      x: [35, 35 * Math.cos((i * 120 + Date.now() * 0.001) * Math.PI / 180)],
                      y: [0, 35 * Math.sin((i * 120 + Date.now() * 0.001) * Math.PI / 180)]
                    }}
                    transition={{
                      rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                      x: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                      y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                    style={{
                      left: "50%",
                      top: "50%",
                      transformOrigin: "0 0"
                    }}
                  />
                ))}
              </motion.div>

              {/* Loading text with typewriter effect */}
              <motion.div
                className="text-2xl font-light text-gray-700 dark:text-gray-300 mb-6"
                key={currentIcon}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="inline-block overflow-hidden whitespace-nowrap"
                >
                  {config.messages[currentIcon]}
                </motion.span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className={`ml-1 text-${config.colors.accent}`}
                >
                  |
                </motion.span>
              </motion.div>

              {/* Page-specific pulse dots */}
              <div className="flex justify-center space-x-3">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className={`w-3 h-3 bg-gradient-to-br ${config.colors.secondary} rounded-full`}
                    animate={{
                      scale: [0.8, 1.3, 0.8],
                      opacity: [0.4, 1, 0.4]
                    }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Page reveal effect overlay with theme colors */}
          <motion.div
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            exit={{ 
              clipPath: "circle(150% at 50% 50%)",
              opacity: 0
            }}
            transition={{ 
              exit: { 
                duration: 1, 
                ease: "easeInOut",
                delay: 0.2
              }
            }}
            className={`fixed inset-0 z-40 bg-gradient-to-br ${config.colors.primary}/20`}
          />
        </>
      )}
    </AnimatePresence>
  );
} 