"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  FaHtml5, 
  FaCss3Alt, 
  FaJs, 
  FaReact, 
  FaPython, 
  FaPhp,
  FaDatabase
} from "react-icons/fa";
import { 
  SiTypescript, 
  SiNextdotjs,              
  SiMysql
} from "react-icons/si";

interface Skill3DProps {
  skillName: string;
  color: string;
  level: number;
  className?: string;
  onClick?: () => void;
}

// Function to get the appropriate icon for each skill with proper colors
function getSkillIcon(skillName: string) {
  const name = skillName.toLowerCase();
  
  switch (name) {
    case "html":
      return <FaHtml5 className="text-4xl text-orange-500 drop-shadow-lg" />;
    case "css":
      return <FaCss3Alt className="text-4xl text-blue-500 drop-shadow-lg" />;
    case "javascript":
      return <FaJs className="text-4xl text-yellow-400 drop-shadow-lg" />;
    case "typescript":
      return <SiTypescript className="text-4xl text-blue-600 drop-shadow-lg" />;
    case "react":
      return <FaReact className="text-4xl text-cyan-400 drop-shadow-lg" />;
    case "next.js":
      return <SiNextdotjs className="text-4xl text-gray-800 dark:text-white drop-shadow-lg" />;
    case "python":
      return <FaPython className="text-4xl text-blue-500 drop-shadow-lg" />;
    case "php":
      return <FaPhp className="text-4xl text-indigo-600 drop-shadow-lg" />;
    case "sql":
      return <SiMysql className="text-4xl text-orange-600 drop-shadow-lg" />;
    default:
      // Fallback to database icon for any unknown skills
      return <FaDatabase className="text-4xl text-gray-600 drop-shadow-lg" />;
  }
}

// Function to get the exact color code for each skill to match icons
function getSkillColor(skillName: string) {
  const name = skillName.toLowerCase();
  
  switch (name) {
    case "html":
      return "#f97316"; // orange-500
    case "css":
      return "#3b82f6"; // blue-500
    case "javascript":
      return "#facc15"; // yellow-400
    case "typescript":
      return "#2563eb"; // blue-600
    case "react":
      return "#22d3ee"; // cyan-400
    case "next.js":
      return "#ffffff"; // white for Next.js as requested
    case "python":
      return "#3b82f6"; // blue-500
    case "php":
      return "#4f46e5"; // indigo-600
    case "sql":
      return "#ea580c"; // orange-600
    default:
      return "#4b5563"; // gray-600
  }
}

export default function Skill3D({ skillName, color, level, className = "", onClick }: Skill3DProps) {
  const [isHovered, setIsHovered] = useState(false);
  const skillColor = getSkillColor(skillName); // Get the specific color for this skill

  return (
    <motion.div
      className={`relative h-64 w-full cursor-pointer ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 group">
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            background: `linear-gradient(135deg, ${color}44 0%, ${color}88 50%, ${color}44 100%)`
          }}
          animate={{
            backgroundPosition: isHovered ? "200% 200%" : "0% 0%"
          }}
          transition={{ duration: 3, ease: "linear", repeat: Infinity }}
        />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full opacity-40"
              style={{ backgroundColor: color }}
              initial={{
                x: Math.random() * 300,
                y: Math.random() * 250,
              }}
              animate={{
                x: Math.random() * 300,
                y: Math.random() * 250,
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </div>

        <div className="relative z-10 p-6 h-full flex flex-col justify-between">
          {/* Skill name and icon */}
          <div className="text-center">
            {/* Technology Icon - No background box */}
            <motion.div
              className="w-20 h-20 mx-auto mb-4 flex items-center justify-center relative"
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotateY: isHovered ? 5 : 0
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <motion.div
                animate={{ 
                  scale: isHovered ? 1.2 : 1,
                  rotateZ: isHovered ? 5 : 0
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {getSkillIcon(skillName)}
              </motion.div>
              
              {/* Subtle glow effect around icon */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
                }}
                animate={{
                  scale: isHovered ? 1.5 : 1,
                  opacity: isHovered ? 0.8 : 0.3
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </motion.div>
            
            <motion.h3
              className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4"
              animate={{ y: isHovered ? -3 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {skillName}
            </motion.h3>
          </div>
          
          {/* Cool Progress Bars Section */}
          <div className="space-y-4">
            {/* Percentage Display */}
            <div className="text-center">
              <motion.span
                className="text-3xl font-bold"
                style={{ color: skillColor }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {level}%
              </motion.span>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {level >= 90 ? "Expert" : level >= 70 ? "Advanced" : level >= 50 ? "Intermediate" : "Beginner"}
              </p>
            </div>
            
            {/* Multi-layer Progress Bars */}
            <div className="space-y-3">
              {/* Main Progress Bar */}
              <div className="relative">
                <div className="flex justify-between text-xs font-medium mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Proficiency</span>
                  <motion.span
                    style={{ color: skillColor }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    {level}%
                  </motion.span>
                </div>
                
                {/* Outer container with rounded edges */}
                <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                  {/* Animated background stripes */}
                  <motion.div
                    className="absolute inset-0 opacity-10"
                    style={{
                      background: `repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 2px,
                        ${color}40 2px,
                        ${color}40 4px
                      )`
                    }}
                    animate={{ x: ["0%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Main progress fill */}
                  <motion.div
                    className="h-full rounded-full relative overflow-hidden"
                    style={{ 
                      background: `linear-gradient(90deg, ${color} 0%, ${color}aa 50%, ${color} 100%)`,
                      boxShadow: `0 0 20px ${color}60`
                    }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${level}%` }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.8 }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    />
                    
                    {/* Pulse effect at the end */}
                    <motion.div
                      className="absolute right-0 top-0 h-full w-2 rounded-r-full"
                      style={{ backgroundColor: color }}
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </div>
              </div>
              
              {/* Segmented Progress Bar */}
              <div className="flex space-x-1">
                {[...Array(10)].map((_, index) => {
                  const segmentValue = (index + 1) * 10;
                  const isActive = level >= segmentValue;
                  const isPartial = level > (index * 10) && level < segmentValue;
                  
                  return (
                    <motion.div
                      key={index}
                      className="flex-1 h-2 rounded-sm overflow-hidden"
                      style={{
                        backgroundColor: isActive ? color : 'rgb(229, 231, 235)'
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        backgroundColor: isActive ? color : (isPartial ? `${color}60` : 'rgb(229, 231, 235)')
                      }}
                      transition={{ 
                        duration: 0.3, 
                        delay: 1.2 + (index * 0.1),
                        backgroundColor: { duration: 0.5 }
                      }}
                    >
                      {isActive && (
                        <motion.div
                          className="h-full w-full bg-white/30"
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{
                            duration: 1,
                            ease: "easeInOut",
                            delay: 1.5 + (index * 0.1)
                          }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Particle Trail */}
              <div className="relative h-1">
                <motion.div
                  className="absolute left-0 top-0 h-1 rounded-full"
                  style={{ backgroundColor: color }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${level}%` }}
                  transition={{ duration: 2.5, ease: "easeInOut", delay: 1.5 }}
                />
                {/* Moving particle */}
                <motion.div
                  className="absolute top-0 w-2 h-1 rounded-full"
                  style={{ 
                    backgroundColor: color,
                    boxShadow: `0 0 10px ${color}`
                  }}
                  initial={{ left: "0%" }}
                  animate={{ left: `${level}%` }}
                  transition={{ duration: 2.5, ease: "easeInOut", delay: 1.5 }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced hover glow effect */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            boxShadow: `0 0 30px ${color}60, inset 0 0 20px ${color}20`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Click indicator */}
        <motion.div
          className="absolute bottom-3 right-3 text-xs text-gray-600 dark:text-gray-400 flex items-center space-x-1 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <span>Click to explore</span>
          <motion.div
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            →
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Keep the same export for the 2D version
export function Skill2D({ skillName, color, level, className = "", onClick }: Skill3DProps) {
  return <Skill3D skillName={skillName} color={color} level={level} className={className} onClick={onClick} />;
} 