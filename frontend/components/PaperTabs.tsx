"use client";

import { useState } from "react";
import {
  ChevronDown,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface PaperTabsProps {
  selectedTopic?: string;
  onTopicSelect?: (topic: string) => void;
  selectedSort?: string;
  onSortSelect?: (sort: string) => void;
  viewMode?: "grid" | "list";
  onViewModeChange?: (mode: "grid" | "list") => void;
  totalPapers?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const TOPICS = [
  "All Topics",
  "Agents",
  "Reasoning",
  "Vision",
  "Coding",
  "Robotics",
  "MCP",
  "Multimodal",
  "Safety",
  "Alignment",
  "Data",
  "Applications",
];

const MORE_TOPICS = [
  "Reinforcement Learning",
  "Synthetic Data",
  "Evaluation",
  "Quantization",
  "Open Source",
  "Speech",
  "Biology & Medicine",
];

export default function PaperTabs({
  selectedTopic = "All Topics",
  onTopicSelect,
  selectedSort = "Latest",
  onSortSelect,
  viewMode = "grid",
  onViewModeChange,
  totalPapers = 124532,
  currentPage = 1,
  totalPages = 4152,
  onPageChange,
}: PaperTabsProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const sortOptions = ["Latest", "Trending", "Most GitHub Stars", "Citations"];

  return (
    <div className="w-full flex flex-col gap-3.5 mb-5 select-none font-sans">
      {/* Top Filter Bar: Topic Pills (Left) + Sort Dropdown & View Mode (Right) */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        {/* Topic Pills List */}
        <div className="flex items-center gap-1.5 overflow-x-auto hide-scroll max-w-full py-1">
          {TOPICS.map((topic) => {
            const isActive = selectedTopic === topic;
            return (
              <button
                key={topic}
                type="button"
                onClick={() => onTopicSelect?.(topic)}
                className={`px-3 py-1.5 rounded-full text-[12.5px] font-medium whitespace-nowrap transition-all cursor-pointer border ${
                  isActive
                    ? "bg-[#FFF0EB] text-[#F55036] border-[#F55036] dark:bg-[#2A1612] dark:text-[#FF6A42] dark:border-[#FF6A42] font-semibold"
                    : "bg-white dark:bg-[#18181B] text-[#52525B] dark:text-[#A1A1AA] border-[#E4E4E7] dark:border-[#2C2C30] hover:border-[#D4D4D8] dark:hover:border-[#3F3F46] hover:text-[#111111] dark:hover:text-white"
                }`}
              >
                {topic}
              </button>
            );
          })}

          {/* More Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="px-3 py-1.5 rounded-full text-[12.5px] font-medium whitespace-nowrap transition-all cursor-pointer border bg-white dark:bg-[#18181B] text-[#52525B] dark:text-[#A1A1AA] border-[#E4E4E7] dark:border-[#2C2C30] hover:text-[#111111] dark:hover:text-white flex items-center gap-1"
            >
              <span>More</span>
              <ChevronDown size={13} />
            </button>

            {isMoreOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-48 rounded-xl border border-[#E5E5E0] dark:border-[#2C2C30] bg-white dark:bg-[#18181B] p-1.5 shadow-xl z-50">
                {MORE_TOPICS.map((mt) => (
                  <button
                    key={mt}
                    type="button"
                    onClick={() => {
                      onTopicSelect?.(mt);
                      setIsMoreOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-[12px] font-medium text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#FFF0EB] hover:text-[#F55036] dark:hover:bg-[#2A1612] dark:hover:text-[#FF6A42] transition-colors"
                  >
                    {mt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Controls: Sort By + View Grid/List Toggles */}
        <div className="flex items-center gap-3 shrink-0 self-end lg:self-auto">
          {/* Sort By Dropdown */}
          <div className="relative flex items-center gap-1.5 text-[12.5px]">
            <span className="text-[#71717A] dark:text-[#A1A1AA]">Sort by</span>
            <button
              type="button"
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#E4E4E7] dark:border-[#2C2C30] bg-white dark:bg-[#18181B] text-[#111111] dark:text-white font-medium hover:border-[#D4D4D8] dark:hover:border-[#3F3F46] transition-colors cursor-pointer"
            >
              <span>{selectedSort}</span>
              <ChevronDown size={13} className="text-[#71717A]" />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-36 rounded-xl border border-[#E5E5E0] dark:border-[#2C2C30] bg-white dark:bg-[#18181B] p-1 shadow-xl z-50 animate-fade-in">
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      onSortSelect?.(opt);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${
                      selectedSort === opt
                        ? "text-[#F55036] dark:text-[#FF6A42] bg-[#FFF0EB] dark:bg-[#2A1612] font-semibold"
                        : "text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#202024] hover:text-[#111111] dark:hover:text-white"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Grid vs List View Buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onViewModeChange?.("grid")}
              aria-label="Grid view"
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-[#FFF0EB] border-[#F55036]/40 text-[#F55036] dark:bg-[#2A1612] dark:border-[#FF6A42]/40 dark:text-[#FF6A42]"
                  : "bg-white dark:bg-[#18181B] border-[#E4E4E7] dark:border-[#2C2C30] text-[#71717A] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-white"
              }`}
            >
              <LayoutGrid size={15} />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange?.("list")}
              aria-label="List view"
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-[#FFF0EB] border-[#F55036]/40 text-[#F55036] dark:bg-[#2A1612] dark:border-[#FF6A42]/40 dark:text-[#FF6A42]"
                  : "bg-white dark:bg-[#18181B] border-[#E4E4E7] dark:border-[#2C2C30] text-[#71717A] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-white"
              }`}
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Counter on Left & Compact Pagination on Right */}
      <div className="flex items-center justify-between pt-1">
        <div
          className="text-[13.5px] font-semibold text-[#111111] dark:text-[#F3F4F6]"
          suppressHydrationWarning
        >
          1,24,532{" "}
          <span className="text-[#71717A] dark:text-[#A1A1AA] font-normal">papers</span>
        </div>

        <div
          className="flex items-center gap-2 text-[12.5px] text-[#71717A] dark:text-[#A1A1AA]"
          suppressHydrationWarning
        >
          <span>
            Page {currentPage} of 4,152
          </span>
          <div className="flex items-center gap-1 ml-1">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => onPageChange?.(currentPage - 1)}
              className="w-7 h-7 rounded-lg border border-[#E4E4E7] dark:border-[#2C2C30] bg-white dark:bg-[#18181B] flex items-center justify-center text-[#52525B] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange?.(currentPage + 1)}
              className="w-7 h-7 rounded-lg border border-[#E4E4E7] dark:border-[#2C2C30] bg-white dark:bg-[#18181B] flex items-center justify-center text-[#52525B] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
