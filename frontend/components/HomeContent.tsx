"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PaperList from "@/components/PaperFeed";
import PaperTabs from "@/components/PaperTabs";
import HeroSection from "@/components/HeroSection";
import type { GetPapersResult } from "@/lib/paperApi";
import { getPapers } from "@/lib/paperApi";
import { prefetchMethods } from "@/lib/methodCache";

export default function HomeContent({
  initialPapers,
  initialError,
}: {
  initialPapers: GetPapersResult | null;
  initialError?: string;
}) {
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const [activeSort, setActiveSort] = useState<string>("Trending Papers");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all");
  const [isFilterChanging, setIsFilterChanging] = useState(false);

  const isMounted = useRef(false);

  // Stealthy Memory Check: Restore filters from sessionStorage if they exist
  useEffect(() => {
    const savedSort = sessionStorage.getItem("atlas_activeSort");
    const savedPeriod = sessionStorage.getItem("atlas_selectedPeriod");
    if (savedSort && savedSort !== "undefined" && savedSort !== "null") setActiveSort(savedSort);
    if (savedPeriod && savedPeriod !== "undefined" && savedPeriod !== "null") setSelectedPeriod(savedPeriod);

    // Mark as mounted after we've read the saved values
    setTimeout(() => {
      isMounted.current = true;
    }, 0);
  }, []);

  // Save user preferences to memory when they change
  useEffect(() => {
    if (isMounted.current) {
      sessionStorage.setItem("atlas_activeSort", activeSort);
    }
  }, [activeSort]);

  useEffect(() => {
    if (isMounted.current) {
      sessionStorage.setItem("atlas_selectedPeriod", selectedPeriod);
    }
  }, [selectedPeriod]);

  // Defer speculative background prefetching so initial feed & infinite scroll get 100% network bandwidth
  useEffect(() => {
    const timer = setTimeout(() => {
      const prefetch = async (params: Parameters<typeof getPapers>[0]) => {
        try { await getPapers(params); } catch {}
      };
      
      // Warm main periods/sorts sequentially with small delays to keep network open
      const periods = ["today", "week", "month", "all"];
      const mainSorts = ["trending", "latest", "stars"];
      let delay = 0;

      mainSorts.forEach(sort => {
        periods.forEach(period => {
          setTimeout(() => prefetch({ sort, period, page: 1 }), delay);
          delay += 100;
        });
      });

      // Lazy pre-warm key hero chips
      const heroChips = [{ task: "agents" }, { task: "reasoning" }, { method: "mcp" }];
      heroChips.forEach((chip) => {
        setTimeout(() => prefetch({ sort: "trending", period: "today", page: 1, ...chip }), delay);
        delay += 100;
      });

      setTimeout(() => prefetchMethods(), delay);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // --- FILTER HANDLERS ---
  const handleSidebarSelect = (label: string) => {
    setIsFilterChanging(true);
    setActiveSort(label);
  };

  const handlePeriodSelect = (period: string) => {
    setIsFilterChanging(true);
    setSelectedPeriod(period);
  };

  // Custom handler to ensure `isFilterChanging` triggers when a pill is clicked
  const handleTagSelect = (tag: string | undefined | ((prev: string | undefined) => string | undefined)) => {
    setIsFilterChanging(true);
    setSelectedTag(tag);
  };

  // Map the UI tab to API parameters
  const apiPeriod =
    selectedPeriod === "Today" ? "today" :
      selectedPeriod === "This Week" ? "week" :
        selectedPeriod === "This Month" ? "month" : "all";

  const apiSort = activeSort === "Trending Papers" ? "trending" : activeSort === "Most GitHub Stars" ? "stars" : "latest";

  // Distinguish methods from tasks and ensure case-insensitivity
  const isMethod = selectedTag?.toLowerCase() === "mcp"; 
  const dynamicFilterParams: Record<string, string> = { sort: apiSort };

  if (selectedTag) {
    if (isMethod) {
      dynamicFilterParams.method = selectedTag.toLowerCase();
    } else {
      dynamicFilterParams.task = selectedTag.toLowerCase(); 
    }
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F8F7F2] text-[#111111]">
      <Navbar activeSort={activeSort} onItemSelect={handleSidebarSelect} />
      <div
        id="scroll-container"
        className="flex-1 overflow-y-auto overflow-x-hidden hide-scroll flex flex-col"
      >
        {/* Hero Section Container */}
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 xl:px-10 pt-3">
          <HeroSection
            selectedTag={selectedTag}
            setSelectedTag={handleTagSelect as any}
          />
        </div>

        {/* 3-Column Layout */}
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 xl:px-10 pt-4 pb-12 flex items-start gap-5 lg:gap-8 xl:gap-10">
          <div className="hidden lg:block w-[240px] shrink-0 sticky top-3 h-[calc(100vh-80px)]">
            <Sidebar initialActive={activeSort} onItemSelect={handleSidebarSelect} />
          </div>

          <main className="flex-1 min-w-0 max-w-[1380px]">
            <PaperTabs selectedPeriod={selectedPeriod} onPeriodSelect={handlePeriodSelect} />
            <PaperList
              selectedTag={isMethod ? undefined : selectedTag}
              period={apiPeriod}
              filterParams={dynamicFilterParams}
              initialPapers={initialPapers}
              initialError={initialError}
              isFilterChanging={isFilterChanging}
              onFilterDone={() => setIsFilterChanging(false)}
            />
          </main>
        </div>
      </div>
    </div>
  );
}