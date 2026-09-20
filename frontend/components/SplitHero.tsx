"use client";

import { useState, useRef, useEffect } from "react";
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

export default function SplitHero({
  selectedTag,
  setSelectedTag,
}: {
  selectedTag?: string;
  setSelectedTag: (tag: string | undefined) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<Paper[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 250);
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
      } catch {
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
    { label: "Agents", slug: "agents", icon: Bot },
    { label: "Reasoning", slug: "reasoning-models", icon: Brain },
    { label: "Vision", slug: "vision-language-models", icon: Eye },
    { label: "Coding", slug: "coding-agents", icon: Code2 },
    { label: "Robotics", slug: "robotics", icon: Cpu },
    { label: "MCP", slug: "model-context-protocol-mcp", icon: Plug },
  ];

  return (
    <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-8 pt-1 pb-4">
      {/* Left Column: Big Headline */}
      <div className="shrink-0">
        <h1 className="text-[28px] sm:text-[34px] lg:text-[40px] font-bold tracking-tight text-[#111111] dark:text-[#F0F6FC] leading-[1.1]">
          Discover what&apos;s next in
          <span className="block text-[#F55036] dark:text-[#FF5A1F]">AI research.</span>
        </h1>
      </div>

      {/* Right Column: Search bar + Filter chips */}
      <div className="w-full lg:max-w-[580px] flex flex-col items-start lg:items-end gap-2.5">
        {/* Search Bar Input */}
        <div ref={searchRef} className="relative w-full">
          <div className="relative w-full rounded-full bg-white dark:bg-[#161B22] border border-[#E5E5E0] dark:border-[#30363D] shadow-sm hover:shadow-md focus-within:border-[#FF5A1F]/50 dark:focus-within:border-[#FF5A1F]/60 flex items-center px-4 h-11 transition-all">
            <Search className="w-4 h-4 text-[#737373] dark:text-[#8B949E] mr-2.5 shrink-0" />
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
              className="bg-transparent outline-none flex-1 text-[#111111] dark:text-[#F0F6FC] placeholder:text-[#8B8B8B] dark:placeholder:text-[#8B949E] text-[13.5px] truncate"
            />
            {isSearching ? (
              <Loader2 size={15} className="text-[#F55036] animate-spin shrink-0" />
            ) : (
              <span className="text-[10px] font-semibold text-[#8B8B8B] dark:text-[#6E7681] tracking-wide border border-[#E5E5E0] dark:border-[#30363D] rounded px-1.5 py-0.5 ml-2">
                ⌘K
              </span>
            )}
          </div>

          {/* Search Dropdown Results */}
          {showDropdown && (debouncedQuery.trim().length > 0 || isSearching) && (
            <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white dark:bg-[#161B22] rounded-xl shadow-xl border border-[#E5E5E0] dark:border-[#30363D] py-2 z-50 max-h-[380px] overflow-y-auto">
              {isSearching ? (
                <div className="flex items-center justify-center py-6 text-[#8B8B8B] text-[13px] gap-2">
                  <Loader2 size={15} className="animate-spin text-[#F55036]" />
                  <span>Searching...</span>
                </div>
              ) : results.length > 0 ? (
                <div className="flex flex-col">
                  {results.slice(0, 5).map((paper) => (
                    <Link
                      key={paper.id}
                      href={`/papers/${encodeURIComponent(paper.slug || String(paper.id))}`}
                      onClick={() => setShowDropdown(false)}
                      className="px-4 py-2.5 hover:bg-[#F8F7F2] dark:hover:bg-[#21262D] cursor-pointer transition-colors border-b border-[#E5E5E0] dark:border-[#22272E] last:border-0 flex flex-col gap-0.5 text-left"
                    >
                      <h4 className="text-[13px] font-semibold text-[#111111] dark:text-[#F0F6FC] leading-snug line-clamp-1">
                        {paper.title}
                      </h4>
                      <p className="text-[11.5px] text-[#737373] dark:text-[#8B949E] truncate">
                        {formatAuthors(paper.authors)}
                      </p>
                    </Link>
                  ))}
                  <div className="pt-2 px-4 pb-1 border-t border-[#E5E5E0] dark:border-[#22272E] mt-1">
                    <Link
                      href={`/search?q=${encodeURIComponent(debouncedQuery.trim())}`}
                      onClick={() => setShowDropdown(false)}
                      className="text-[12px] font-medium text-[#F55036] dark:text-[#FF5A1F] hover:underline flex items-center justify-between"
                    >
                      <span>View all results for &quot;{debouncedQuery}&quot;</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center text-[#737373] dark:text-[#8B949E] text-[13px]">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Category Pills Row */}
        <div className="flex flex-wrap items-center gap-1.5 w-full justify-start lg:justify-end">
          {tags.map((tag) => {
            const isSelected = selectedTag === tag.slug;
            return (
              <button
                key={tag.slug}
                onClick={() => setSelectedTag(isSelected ? undefined : tag.slug)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold border transition-all cursor-pointer select-none ${
                  isSelected
                    ? "bg-[#F55036] text-white border-[#F55036] shadow-sm"
                    : "bg-white dark:bg-[#161B22] border-[#E5E5E0] dark:border-[#30363D] text-[#333333] dark:text-[#C9D1D9] hover:border-[#F55036]/50 dark:hover:border-[#F55036]/50"
                }`}
              >
                <tag.icon
                  size={12}
                  className={isSelected ? "text-white" : "text-[#F55036] dark:text-[#FF5A1F]"}
                />
                <span>{tag.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
