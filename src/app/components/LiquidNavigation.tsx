"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface LiquidNavProps {
  items: Array<{
    href: string;
    icon: React.ComponentType<any>;
    text: string;
  }>;
  activeIndex: number;
  onItemClick: (index: number) => void;
  expanded: boolean;
}

export default function LiquidNavigation({ items, activeIndex, onItemClick, expanded }: LiquidNavProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Liquid background blob */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"
        initial={false}
        animate={{
          y: (hoveredIndex !== null ? hoveredIndex : activeIndex) * 60,
          scale: hoveredIndex !== null ? 1.1 : 1,
          opacity: hoveredIndex !== null ? 0.8 : 0.6
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8
        }}
      />
      
      {/* Navigation items */}
      <div className="relative z-10 space-y-2">
        {items.map((item, index) => (
          <motion.div
            key={item.href}
            className="relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onItemClick(index)}
          >
            {/* Active indicator */}
            {index === activeIndex && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30
                }}
              />
            )}
            
            {/* Hover blob */}
            {hoveredIndex === index && (
              <motion.div
                layoutId="hoverBlob"
                className="absolute inset-0 bg-white/10 rounded-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
              />
            )}
            
            <div className="flex items-center px-4 py-3 rounded-lg transition-colors relative z-10 cursor-pointer">
              <motion.div
                className="flex items-center justify-center w-8"
                animate={{
                  scale: index === activeIndex ? 1.2 : 1,
                  rotate: hoveredIndex === index ? 5 : 0
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
              >
                <item.icon className="text-lg" />
              </motion.div>
              
              {expanded && (
                <motion.span
                  className="ml-3 relative z-10"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                >
                  {item.text}
                </motion.span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 