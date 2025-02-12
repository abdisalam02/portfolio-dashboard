"use client";

import Link from "next/link";
import { FaHome, FaProjectDiagram, FaTools, FaEnvelope } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

export default function MobileBottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 dark:bg-gray-900 text-white flex justify-around items-center p-2 shadow-lg z-50">
      <Link href="/" className="flex flex-col items-center">
        <FaHome className="text-xl" />
        <span className="text-xs">Overview</span>
      </Link>
      <Link href="/projects" className="flex flex-col items-center">
        <FaProjectDiagram className="text-xl" />
        <span className="text-xs">Projects</span>
      </Link>
      <Link href="/skills" className="flex flex-col items-center">
        <FaTools className="text-xl" />
        <span className="text-xs">Skills</span>
      </Link>
      <Link href="/contact" className="flex flex-col items-center">
        <FaEnvelope className="text-xl" />
        <span className="text-xs">Contact</span>
      </Link>
      <div className="flex flex-col items-center">
        <ThemeToggle />
        <span className="text-xs">Theme</span>
      </div>
    </div>
  );
}
