"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Bot, Brain, Eye, Code2, Cpu, Plug, Loader2 } from "lucide-react";
import { searchPapers, type Paper, type PaperAuthor } from "@/lib/paperApi";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formatAuthors = (authors: PaperAuthor[]) => {
  if (!Array.isArray(authors) || authors.length === 0) return "";
  const names = authors.map((a) => a.name);
  if (names.length > 3) {
    return `${names.slice(0, 3).join(", ")} et al.`;
  }
  return names.join(", ");
};

interface HeroSectionProps {
  selectedTag?: string;
  setSelectedTag?: React.Dispatch<React.SetStateAction<string | undefined>>;
  onTagSelect?: (tag: string) => void;
}

export default function HeroSection({
  selectedTag,
  setSelectedTag,
  onTagSelect,
}: HeroSectionProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<Paper[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Global Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const heroInput = searchRef.current?.querySelector("input");
        if (heroInput) {
          heroInput.focus();
          heroInput.select();
        }
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    async function performSearch() {
      if (!debouncedQuery.trim()) {
        setResults([]);
        setIsSearching(false);
        return;
      }
      setIsSearching(true);
      try {
        const data = await searchPapers(debouncedQuery);
        setResults(data);
      } catch (error) {
        console.error("Search failed", error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }
    performSearch();
  }, [debouncedQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const tags = [
    { label: "Agents", icon: Bot },
    { label: "Reasoning", icon: Brain },
    { label: "Vision", icon: Eye },
    { label: "Coding", icon: Code2 },
    { label: "Robotics", icon: Cpu },
    { label: "MCP", icon: Plug },
  ];

  return (
    <section className="w-full flex flex-col items-center justify-center pt-8 md:pt-12 pb-6 md:pb-8 relative shrink-0 text-center font-sans">
      <div className="w-full max-w-[1200px] px-4 flex flex-col items-center z-10">
        {/* Title */}
        <h1 className="text-[28px] sm:text-[36px] md:text-[44px] font-black leading-[1.1] tracking-[-0.03em] text-[#111111] dark:text-white mb-5 sm:mb-6 text-center">
          Discover what&apos;s next in <span className="text-[#F55036] dark:text-[#FF6A42]">AI research.</span>
        </h1>

        {/* Search Bar */}
        <div 
          ref={searchRef} 
          className="w-full max-w-[680px] relative shadow-[0_4px_20px_rgba(0,0,0,0.04)] rounded-full bg-white dark:bg-[#18181B] border border-[#E5E5E0] dark:border-[#27272A] flex items-center px-4 sm:px-5 h-12 mb-4 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] focus-within:border-[#F55036]/50 focus-within:ring-2 focus-within:ring-[#F55036]/10 transition-all duration-200 mx-auto z-40"
        >
          <div className="flex items-center text-[#737373] dark:text-[#A1A1AA] mr-3 shrink-0">
            <Search className="w-[18px] h-[18px]" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim()) {
                e.preventDefault();
                setShowDropdown(false);
                router.push(`/search?q=${encodeURIComponent(query.trim())}`);
              }
            }}
            placeholder="Search papers, authors, topics, methods"
            className="bg-transparent outline-none flex-1 text-[#111111] dark:text-white placeholder:text-[#8B8B8B] dark:placeholder:text-[#71717A] text-[14px] sm:text-[15px] truncate mr-2 text-left w-full h-full"
          />
          {isSearching ? (
            <Loader2 size={16} className="text-[#F55036] animate-spin shrink-0" />
          ) : (
            <div className="flex items-center justify-center px-2 py-0.5 rounded-md bg-[#F4F4F5] dark:bg-[#27272A] border border-[#E4E4E7] dark:border-[#3F3F46] text-[11px] font-medium text-[#71717A] dark:text-[#A1A1AA] shrink-0 gap-0.5 tracking-wide">
              <span>⌘</span><span>K</span>
            </div>
          )}

          {/* Dropdown Results */}
          {showDropdown && (debouncedQuery.trim().length > 0 || isSearching) && (
            <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white dark:bg-[#18181B] rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.15)] border border-[#E5E5E0] dark:border-[#27272A] py-2 z-50 max-h-[400px] overflow-y-auto">
              {isSearching ? (
                <div className="flex items-center justify-center py-8 text-[#8B8B8B] dark:text-[#A1A1AA] gap-2">
                  <Loader2 size={16} className="animate-spin text-[#F55036]" />
                  <span className="text-[14px]">Searching...</span>
                </div>
              ) : results.length > 0 ? (
                <div className="flex flex-col">
                  {results.map((paper) => (
                    <Link
                      key={paper.id || paper.slug}
                      href={`/papers/${encodeURIComponent(paper.slug || String(paper.id))}`}
                      onClick={() => setShowDropdown(false)}
                      className="px-4 sm:px-5 py-3 hover:bg-[#F8F7F2] dark:hover:bg-[#202024] cursor-pointer transition-colors border-b border-[#F0F0EE] dark:border-[#27272A] last:border-0 flex flex-col gap-1 text-left"
                    >
                      <h4 className="text-[14px] font-semibold text-[#111111] dark:text-white leading-snug line-clamp-2">
                        {paper.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[12px] text-[#737373] dark:text-[#A1A1AA]">
                        <span className="truncate max-w-[200px]">{formatAuthors(paper.authors)}</span>
                        {Number(paper.upvotes) > 0 && (
                          <>
                            <span>•</span>
                            <span>{paper.upvotes} stars</span>
                          </>
                        )}
                      </div>
                    </Link>
                  ))}
                  <div className="pt-2 px-4 pb-1 border-t border-[#F0F0EE] dark:border-[#27272A] mt-1">
                    <Link
                      href={`/search?q=${encodeURIComponent(debouncedQuery.trim())}`}
                      onClick={() => setShowDropdown(false)}
                      className="text-[12px] font-medium text-[#F55036] dark:text-[#FF6A42] hover:underline flex items-center justify-between"
                    >
                      <span>View all results for &quot;{debouncedQuery}&quot;</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-[#737373] dark:text-[#A1A1AA] text-[14px]">
                  No results found for &quot;{debouncedQuery}&quot;
                </div>
              )}
            </div>
          )}
        </div>

        {/* Tags Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-full px-2">
          {tags.map((tag) => {
            const isSelected = selectedTag === tag.label;
            return (
              <button
                key={tag.label}
                type="button"
                onClick={() => {
                  if (onTagSelect) {
                    onTagSelect(isSelected ? "All Topics" : tag.label);
                  }
                  if (setSelectedTag) {
                    setSelectedTag(isSelected ? undefined : tag.label);
                  }
                }}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 min-h-[28px] transition-all duration-200 cursor-pointer select-none text-[12px] font-semibold border ${
                  isSelected
                    ? "bg-[#FFF0EB] text-[#F55036] border-[#F55036] dark:bg-[#2A1612] dark:text-[#FF6A42] dark:border-[#FF6A42] shadow-xs scale-[1.02]"
                    : "bg-white dark:bg-[#18181B] border-[#E5E5E0] dark:border-[#27272A] text-[#111111] dark:text-[#E4E4E7] hover:border-[#D4D4D8] dark:hover:border-[#3F3F46] hover:bg-[#FBFBFA] dark:hover:bg-[#202024]"
                }`}
              >
                <tag.icon
                  className={`w-3.5 h-3.5 ${
                    isSelected ? "text-[#F55036] dark:text-[#FF6A42]" : "text-[#F55036]"
                  }`}
                />
                <span>{tag.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
