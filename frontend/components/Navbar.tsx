"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bookmark, Menu, X, LogOut, User } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";

type CurrentUser = {
  email: string;
};

const API_BASE = process.env.NODE_ENV === "development"
    ? (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8787").replace(/\/$/, "")
    : "";

export default function Navbar({
  activeSort,
  onItemSelect,
}: {
  activeSort?: string;
  onItemSelect?: (item: string) => void;
} = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // ── Active tab helpers ──────────────────────────────────────────────────────
  const isHomePage = pathname === "/";
  const isDiscover = isHomePage && (!activeSort || activeSort === "Trending Papers");
  const isTrending = activeSort === "Trending Papers" || pathname === "/category/trending";
  const isLatest = activeSort === "Latest Papers" || pathname === "/category/latest";
  const isStars = activeSort === "Most GitHub Stars" || pathname === "/category/github-stars";
  const isLeaderboards = pathname.startsWith("/benchmarks") || pathname.startsWith("/leaderboards");
  const isResources = pathname.startsWith("/methods");

  // ── Load current user ───────────────────────────────────────────────────────
  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/v1/auth/me`, {
          credentials: "include",
        });
        if (!response.ok) { setCurrentUser(null); return; }
        const data = await response.json();
        setCurrentUser(data.user);
      } catch {
        setCurrentUser(null);
      }
    };
    loadCurrentUser();
    window.addEventListener("authchange", loadCurrentUser);
    return () => window.removeEventListener("authchange", loadCurrentUser);
  }, []);

  // ── Close profile dropdown on outside click ─────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Close mobile menu on Escape ─────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  // ── Search shortcut ─────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("nav-search-input")?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);


  // ── Logout ──────────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch(`${API_BASE}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setCurrentUser(null);
      setIsProfileOpen(false);
      setIsLoggingOut(false);
      window.dispatchEvent(new Event("authchange"));
      router.push("/");
      router.refresh();
    }
  };

  // ── Nav links ───────────────────────────────────────────────────────────────
  const navLinks = [
    { label: "Discover", href: "/", active: isDiscover },
    {
      label: "Trending Papers",
      href: "/category/trending",
      active: !isDiscover && isTrending,
      onClick: () => onItemSelect?.("Trending Papers"),
    },
    {
      label: "Latest Papers",
      href: "/category/latest",
      active: isLatest,
      onClick: () => onItemSelect?.("Latest Papers"),
    },
    {
      label: "Most GitHub Stars",
      href: "/category/github-stars",
      active: isStars,
      onClick: () => onItemSelect?.("Most GitHub Stars"),
    },
    { label: "Leaderboards", href: "/benchmarks", active: isLeaderboards },
    { label: "Resources", href: "/methods", active: isResources },
  ];

  // ── Profile control ─────────────────────────────────────────────────────────
  const ProfileControl = () =>
    currentUser ? (
      <div ref={profileRef} className="relative">
        <button
          type="button"
          onClick={() => setIsProfileOpen((o) => !o)}
          aria-label="Open profile menu"
          aria-expanded={isProfileOpen}
          className="w-8 h-8 rounded-full bg-[#F55036] text-white text-[13px] font-bold flex items-center justify-center cursor-pointer hover:bg-[#E0462D] transition-colors shadow-sm hover:shadow-[0_0_0_3px_rgba(245,80,54,0.20)] active:scale-95"
        >
          {currentUser.email.trim().charAt(0).toUpperCase()}
        </button>

        {isProfileOpen && (
          <div className="absolute right-0 top-11 w-64 rounded-xl border border-[#E4E4E7] dark:border-[#2C2C30] bg-white dark:bg-[#18181B] p-3 shadow-xl z-50 animate-fade-in">
            {/* Email */}
            <p className="truncate text-[12.5px] font-medium text-[#52525B] dark:text-[#A1A1AA] px-2 pb-2.5 border-b border-[#E4E4E7] dark:border-[#2C2C30] mb-2">
              {currentUser.email}
            </p>

            {/* Saved Papers */}
            <Link
              href="/saved"
              onClick={() => setIsProfileOpen(false)}
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-[13px] font-medium text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#FFF0EB] dark:hover:bg-[#2A1612] hover:text-[#F55036] dark:hover:text-[#FF6A42] no-underline transition-colors"
            >
              <Bookmark size={15} />
              Saved Papers
            </Link>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="mt-2 w-full flex items-center justify-center gap-2 rounded-lg bg-[#F55036] px-3 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#E0462D] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut size={14} />
              {isLoggingOut ? "Logging out…" : "Log out"}
            </button>
          </div>
        )}
      </div>
    ) : (
      <Link
        href="/login"
        aria-label="Sign In"
        className="w-8 h-8 rounded-full bg-[#F55036] flex items-center justify-center cursor-pointer hover:bg-[#E0462D] transition-colors shadow-sm hover:shadow-[0_0_0_3px_rgba(245,80,54,0.20)] active:scale-95 no-underline"
      >
        <User size={15} className="text-white" />
      </Link>
    );

  // ────────────────────────────────────────────────────────────────────────────
  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#0F1115]/95 backdrop-blur-md border-b border-[#E4E4E7] dark:border-[#27272A] transition-colors font-sans">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 h-[60px] flex items-center justify-between gap-4">

          {/* ── Left: Hamburger (mobile) + Logo ── */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-[#F4F4F5] dark:hover:bg-[#1E1E22] text-[#52525B] dark:text-[#A1A1AA] transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>

            <Link href="/" className="flex items-center gap-2 group no-underline shrink-0">
              {/* Fern / leaf icon */}
              <div className="relative w-7 h-7 flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
                <svg width="28" height="28" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Main stem */}
                  <path d="M32 56 C32 56 32 20 32 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-[#111111] dark:text-white" />
                  {/* Left fronds */}
                  <path d="M32 44 C22 40 14 32 16 22 C20 28 26 36 32 38" fill="currentColor" className="text-[#111111] dark:text-white" />
                  <path d="M32 34 C20 28 12 18 16 8 C20 16 26 26 32 28" fill="currentColor" className="text-[#111111] dark:text-white" />
                  {/* Right fronds */}
                  <path d="M32 44 C42 40 50 32 48 22 C44 28 38 36 32 38" fill="currentColor" className="text-[#111111] dark:text-white" />
                  <path d="M32 34 C44 28 52 18 48 8 C44 16 38 26 32 28" fill="currentColor" className="text-[#111111] dark:text-white" />
                </svg>
              </div>
              <span className="font-sans text-[17px] font-bold tracking-tight text-[#111111] dark:text-white leading-none">
                FrontierAtlas
              </span>
            </Link>
          </div>

          {/* ── Center: Nav Links (Desktop) ── */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 h-full">
            {navLinks.map((tab) => (
              <Link
                key={tab.label}
                href={tab.href}
                onClick={tab.onClick}
                className={`relative px-3 py-2 text-[13px] font-medium transition-colors no-underline flex items-center h-full ${
                  tab.active
                    ? "text-[#F55036] dark:text-[#FF6A42] font-semibold"
                    : "text-[#52525B] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-white"
                }`}
              >
                {tab.label}
                {tab.active && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#F55036] dark:bg-[#FF6A42] rounded-t-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* ── Right: Search + Bookmark + Theme + Profile ── */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Search (desktop) — full autocomplete SearchBar */}
            <div className="hidden md:block w-[220px] lg:w-[280px] xl:w-[340px]">
              <SearchBar
                variant="compact"
                placeholder="Search papers, authors, topics..."
                initialQuery=""
              />
            </div>

            {/* Saved / Bookmark */}
            <Link
              href="/saved"
              aria-label="Saved papers"
              className="p-2 rounded-lg text-[#52525B] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#1E1E22] transition-colors"
            >
              <Bookmark size={17} />
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Profile / Login */}
            <ProfileControl />
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <div
        className={`fixed inset-0 bg-black/40 z-[60] lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`fixed inset-y-0 left-0 w-[80vw] max-w-[300px] bg-white dark:bg-[#0F1115] z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Drawer Header */}
        <div className="h-[56px] border-b border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#111111] dark:text-white">
              <path d="M32 56 C32 56 32 20 32 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M32 44 C22 40 14 32 16 22 C20 28 26 36 32 38" fill="currentColor" />
              <path d="M32 34 C20 28 12 18 16 8 C20 16 26 26 32 28" fill="currentColor" />
              <path d="M32 44 C42 40 50 32 48 22 C44 28 38 36 32 38" fill="currentColor" />
              <path d="M32 34 C44 28 52 18 48 8 C44 16 38 26 32 28" fill="currentColor" />
            </svg>
            <span className="font-sans font-bold text-[17px] text-[#111111] dark:text-white">
              FrontierAtlas
            </span>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#F4F4F5] dark:hover:bg-[#1E1E22] text-[#52525B] dark:text-[#A1A1AA] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto py-2 px-2">
          <Sidebar
            initialActive={activeSort}
            onItemSelect={(item) => {
              onItemSelect?.(item);
              setIsMenuOpen(false);
            }}
            onItemClick={() => setIsMenuOpen(false)}
          />
        </div>

        {/* Drawer Footer: Login/Logout */}
        <div className="border-t border-[#E4E4E7] dark:border-[#27272A] p-4">
          {currentUser ? (
            <div className="flex flex-col gap-2">
              <p className="text-[12px] text-[#71717A] dark:text-[#A1A1AA] truncate">{currentUser.email}</p>
              <button
                type="button"
                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                disabled={isLoggingOut}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#F55036] px-3 py-2 text-[13px] font-semibold text-white hover:bg-[#E0462D] disabled:opacity-50 transition-colors"
              >
                <LogOut size={14} />
                {isLoggingOut ? "Logging out…" : "Log out"}
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full rounded-lg bg-[#F55036] px-3 py-2 text-[13px] font-semibold text-white hover:bg-[#E0462D] transition-colors no-underline"
            >
              <User size={14} />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
