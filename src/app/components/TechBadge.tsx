"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  SiNextdotjs, 
  SiTailwindcss, 
  SiFramer, 
  SiReact, 
  SiTypescript, 
  SiSupabase, 
  SiSpotify, 
  SiOpenai, 
  SiFirebase, 
  SiMongodb, 
  SiSqlite,
  SiPostgresql,
  SiPrisma
} from "react-icons/si";
import { FaApple, FaBolt, FaBell, FaShieldAlt, FaDeezer } from "react-icons/fa";
import { IconType } from "react-icons";

interface TechBadgeProps {
  name: string;
  showIcon?: boolean;
  isParentHovered?: boolean;
}

const techMap: Record<string, { icon: IconType; color: string }> = {
  "NEXT.JS": { icon: SiNextdotjs, color: "#FFFFFF" },
  "NEXT.JS 15": { icon: SiNextdotjs, color: "#FFFFFF" },
  "TAILWIND": { icon: SiTailwindcss, color: "#06B6D4" },
  "TAILWIND CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "FRAMER MOTION": { icon: SiFramer, color: "#FF0055" }, // Framer's pink/purple
  "REACT": { icon: SiReact, color: "#61DAFB" },
  "REACT 19": { icon: SiReact, color: "#61DAFB" },
  "TYPESCRIPT": { icon: SiTypescript, color: "#3178C6" },
  "SUPABASE": { icon: SiSupabase, color: "#3ECF8E" },
  "SUPABASEAUTH": { icon: FaShieldAlt, color: "#3ECF8E" },
  "SPOTIFY API": { icon: SiSpotify, color: "#1DB954" },
  "DEEZER API": { icon: FaDeezer, color: "#FF0000" }, // Deezer's vibrant red
  "AI INTEGRATION": { icon: SiOpenai, color: "#74AA9C" },
  "NUTRIAPI": { icon: FaApple, color: "#FF5F5F" },
  "REALTIME NOTIFICATIONS": { icon: FaBell, color: "#F59E0B" },
  "FIREBASE": { icon: SiFirebase, color: "#FFCA28" },
  "MONGODB": { icon: SiMongodb, color: "#47A248" },
  "SQLITE": { icon: SiSqlite, color: "#003B57" },
  "PRISMA": { icon: SiPrisma, color: "#2D3748" },
  "NEXTAUTH.JS": { icon: SiNextdotjs, color: "#FFFFFF" },
  "NEXTAUTH": { icon: SiNextdotjs, color: "#FFFFFF" },
};

export default function TechBadge({ name, showIcon = true, isParentHovered = false }: TechBadgeProps) {
  const upperName = name.toUpperCase();
  const tech = techMap[upperName] || { icon: FaBolt, color: "var(--accent)" };
  const Icon = tech.icon;

  const activeColor = tech.color === "#FFFFFF" ? "var(--foreground)" : tech.color;

  return (
    <motion.div
      className="inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold tracking-widest border border-foreground/20 transition-all duration-300 group/badge"
      animate={{
        backgroundColor: isParentHovered ? "#111111" : "rgba(128, 128, 128, 0.05)",
        borderColor: isParentHovered ? activeColor : "rgba(128, 128, 128, 0.2)",
        color: isParentHovered ? activeColor : "rgba(128, 128, 128, 0.5)",
        boxShadow: isParentHovered ? `0 0 10px ${tech.color}33` : "0 0 0px transparent",
        scale: isParentHovered ? 1.05 : 1
      }}
      whileInView={{
        backgroundColor: "#111111",
        borderColor: activeColor,
        color: activeColor,
        boxShadow: `0 0 10px ${tech.color}33`,
        scale: 1.05
      }}
      viewport={{ margin: "-45% 0px -45% 0px", once: false }}
      whileHover={{ 
        backgroundColor: "#000000",
        borderColor: activeColor,
        color: activeColor,
        boxShadow: `0 0 15px ${tech.color}66`,
        scale: 1.1,
        zIndex: 10
      }}
    >
      {showIcon && <Icon className="text-xs transition-transform duration-300 group-hover/badge:scale-110" />}
      <span className="hidden md:inline">{upperName}</span>
    </motion.div>
  );
}
