"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md transition-all hover:scale-105 text-base md:text-lg"
    >
      <span className="hidden md:inline">
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </span>
      <span className="md:hidden">
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
    </button>
  );
}
