"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Laptop, Check } from "lucide-react";

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getButtonIcon = () => {
    if (theme === "system") {
      return <Laptop size={15} className="text-[#F55036] dark:text-[#FF6A42]" />;
    }
    if (resolvedTheme === "dark") {
      return <Moon size={15} className="text-[#F59E0B]" />;
    }
    return <Sun size={15} className="text-[#F55036]" />;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme (Light, Dark, System)"
        title={`Current theme: ${theme} (${resolvedTheme})`}
        className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#E4E4E7] dark:border-[#2C2C30] bg-[#F4F4F5] dark:bg-[#1E1E22] text-[#52525B] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-white hover:border-[#D4D4D8] dark:hover:border-[#3F3F46] transition-all cursor-pointer active:scale-95 shadow-sm"
      >
        {getButtonIcon()}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-10 w-36 rounded-xl border border-[#E4E4E7] dark:border-[#2C2C30] bg-white dark:bg-[#18181B] p-1.5 shadow-xl z-50 animate-fade-in font-sans">
          <button
            type="button"
            onClick={() => {
              setTheme("light");
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[12.5px] font-medium transition-colors cursor-pointer ${
              theme === "light"
                ? "bg-[#FFF0EB] text-[#F55036] dark:bg-[#2A1612] dark:text-[#FF6A42] font-semibold"
                : "text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#202024] hover:text-[#111111] dark:hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Sun size={14} />
              <span>Light</span>
            </div>
            {theme === "light" && <Check size={13} />}
          </button>

          <button
            type="button"
            onClick={() => {
              setTheme("dark");
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[12.5px] font-medium transition-colors cursor-pointer ${
              theme === "dark"
                ? "bg-[#FFF0EB] text-[#F55036] dark:bg-[#2A1612] dark:text-[#FF6A42] font-semibold"
                : "text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#202024] hover:text-[#111111] dark:hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Moon size={14} />
              <span>Dark</span>
            </div>
            {theme === "dark" && <Check size={13} />}
          </button>

          <button
            type="button"
            onClick={() => {
              setTheme("system");
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[12.5px] font-medium transition-colors cursor-pointer ${
              theme === "system"
                ? "bg-[#FFF0EB] text-[#F55036] dark:bg-[#2A1612] dark:text-[#FF6A42] font-semibold"
                : "text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#202024] hover:text-[#111111] dark:hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Laptop size={14} />
              <span>System</span>
            </div>
            {theme === "system" && <Check size={13} />}
          </button>
        </div>
      )}
    </div>
  );
}
