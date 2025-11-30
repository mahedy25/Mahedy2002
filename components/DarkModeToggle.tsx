"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useEffect, useState } from "react";


export function ModeToggle() {
  const { setTheme } = useTheme();

    const [mounted, setMounted] = useState(false)

    // ✅ Wait until hydration finishes
    useEffect(() => {
      setMounted(true)
    }, [])

    // ✅ Prevent SSR mismatch (Radix IDs)
    if (!mounted) return null
  const handleThemeChange = (theme: string) => {
    setTheme(theme);

    // Always force a visible scrollbar on both light and dark themes
    const isDarkMode = theme === 'dark';
    document.documentElement.style.setProperty(
      '--scrollbar-width', 
      '12px' // Adjust the width as needed to match the scrollbar width
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="w-full h-full rounded-full bg-white/20 dark:bg-black/30 hover:bg-white/30 dark:hover:bg-black/40 backdrop-blur-xl border border-white/30 dark:border-white/20 hover:border-white/40 dark:hover:border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex items-center justify-center text-neutral-500 dark:text-neutral-300 hover:text-neutral-600 dark:hover:text-neutral-200 transition-all duration-300 hover:scale-110"
          aria-label="Toggle theme"
        >
          <Sun className="h-5 w-5 md:h-6 md:w-6 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-5 w-5 md:h-6 md:w-6 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
