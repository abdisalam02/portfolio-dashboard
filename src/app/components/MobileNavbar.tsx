"use client";
import { usePathname } from "next/navigation";
import LoadingLink from "./LoadingLink";
import { motion } from "framer-motion";
import { FaHome, FaProjectDiagram, FaTools, FaEnvelope, FaFilePdf } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

export default function MobileBottomNav() {
  const pathname = usePathname();
  
  const navItems = [
    { href: "/", icon: FaHome, label: "Overview" },
    { href: "/projects", icon: FaProjectDiagram, label: "Projects" },
    { href: "/skills", icon: FaTools, label: "Skills" },
    { href: "/resume", icon: FaFilePdf, label: "Resume" },
    { href: "/contact", icon: FaEnvelope, label: "Contact" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-gray-800 dark:text-white flex justify-around items-center p-2 h-16 shadow-lg z-50 border-t border-gray-200 dark:border-gray-800">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <LoadingLink href={item.href} key={item.href} className="flex flex-col items-center relative">
            <motion.div 
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center"
            >
              {isActive && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute -top-2 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div className={`p-2 rounded-full ${isActive ? 'bg-blue-100 dark:bg-blue-900/30' : ''}`}>
                <item.icon className={`text-xl ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`} />
              </div>
              <span className={`text-xs mt-1 ${isActive ? 'font-medium text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
                {item.label}
              </span>
        </motion.div>
      </LoadingLink>
        );
      })}
      
      <div className="flex flex-col items-center">
        <ThemeToggle className="text-xl" />
        <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">Theme</span>
      </div>
    </div>
  );
}
