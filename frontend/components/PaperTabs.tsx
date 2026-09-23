"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface PaperTabsProps {
  selectedPeriod?: string;
  onPeriodSelect?: (period: string) => void;
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

const PERIODS = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "All time", value: "all" },
];

export default function PaperTabs({
  selectedPeriod = "today",
  onPeriodSelect,
  selectedSort = "Latest",
  onSortSelect,
  totalPapers = 124532,
  currentPage = 1,
  totalPages = 4152,
  onPageChange,
}: PaperTabsProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortOptions = ["Latest", "Trending", "Most GitHub Stars", "Citations"];

  return (
    <div className="w-full flex flex-col gap-3 mb-5 select-none font-sans">
      {/* Top Filter Bar: Period Tabs (Left) + Sort Dropdown (Right) */}
      <div className="flex items-center justify-between border-b border-[#E5E5E0] dark:border-[#27272A] gap-4">
        {/* Period Tabs */}
        <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto hide-scroll">
          {PERIODS.map((period) => {
            const isActive =
              (selectedPeriod || "today").toLowerCase() === period.value.toLowerCase() ||
              (selectedPeriod || "today").toLowerCase() === period.label.toLowerCase();
            return (
              <button
                key={period.value}
                type="button"
                onClick={() => onPeriodSelect?.(period.value)}
                className={`relative pb-3 text-[14px] sm:text-[15px] transition-colors cursor-pointer select-none whitespace-nowrap ${
                  isActive
                    ? "font-bold text-[#111111] dark:text-white"
                    : "font-medium text-[#71717A] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-white"
                }`}
              >
                <span>{period.label}</span>
                {isActive && (
                  <span className="absolute -bottom-[1px] left-0 right-0 h-[2.5px] bg-[#F55036] dark:bg-[#FF6A42] rounded-t-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Controls: Sort By Dropdown */}
        <div className="relative flex items-center gap-1.5 text-[12.5px] pb-2 shrink-0">
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
      </div>

      {/* Row 2: Counter on Left & Compact Pagination on Right */}
      <div className="flex items-center justify-between pt-1">
        <div
          className="text-[13.5px] font-semibold text-[#111111] dark:text-[#F3F4F6]"
          suppressHydrationWarning
        >
          {totalPapers.toLocaleString()}{" "}
          <span className="text-[#71717A] dark:text-[#A1A1AA] font-normal">papers</span>
        </div>

        <div
          className="flex items-center gap-2 text-[12.5px] text-[#71717A] dark:text-[#A1A1AA]"
          suppressHydrationWarning
        >
          <span>
            Page {currentPage} of {totalPages.toLocaleString()}
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
