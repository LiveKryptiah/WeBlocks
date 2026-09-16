"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useLibrary } from "@/context/library-context";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className,
  showLabel = false,
}) => {
  const { isDark, toggleTheme } = useLibrary();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-8 h-8 rounded-full bg-field/50 border border-hairline-soft shrink-0",
          className
        )}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "relative flex items-center justify-center rounded-full text-ink hover:text-ink transition-all cursor-pointer select-none",
        showLabel
          ? "px-3 py-1.5 gap-2 bg-field text-body-sm font-semibold hover:bg-canvas-soft border border-hairline-soft"
          : "w-8 h-8 bg-field/60 hover:bg-canvas-soft border border-hairline-soft hover:scale-105 active:scale-95",
        className
      )}
      title={isDark ? "Switch to light mode" : "Switch to dark mode (design.md)"}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-[#e5e5e6] hover:text-white transition-transform duration-300 rotate-0 scale-100" />
        ) : (
          <Moon className="w-4 h-4 text-[#141414] transition-transform duration-300 -rotate-12 scale-100" />
        )}
      </div>
      {showLabel && (
        <span className="text-caption font-semibold">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  );
};
