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
  const [selectedPeriod, setSelectedPeriod] = useState<string>("Today");
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

  // Pre-cache all sidebar data on mount so every click hits cache instantly
  useEffect(() => {
    const prefetch = async (params: Parameters<typeof getPapers>[0]) => {
      try { await getPapers(params); } catch {}
    };
    const periods = ["today", "week", "month", "all"];
    const mainSorts = ["trending", "latest", "stars"];
    mainSorts.forEach(sort => {
      periods.forEach(period => {
        prefetch({ sort, period, page: 1 });
      });
    });
    // Pre-warm hero chips for instant chip clicks (0ms latency)
    const heroChips = [
      { task: "agents" },
      { task: "reasoning" },
      { task: "vision-language-models" },
      { task: "coding-agents" },
      { task: "robotics" },
      { method: "mcp" },
    ];
    heroChips.forEach((chip) => {
      prefetch({ sort: "trending", period: "today", page: 1, ...chip });
      prefetch({ sort: "trending", period: "all", page: 1, ...chip });
      prefetch({ sort: "latest", period: "today", page: 1, ...chip });
      prefetch({ sort: "latest", period: "all", page: 1, ...chip });
      prefetch({ page: 1, ...chip });
    });

    const taskSlugs = ["large-language-models","agents","reasoning","vision-language-models","multimodal-models","world-models","image-generation","automatic-speech-recognition","robotics"];
    taskSlugs.forEach(t => {
      prefetch({ sort: "latest", period: "all", task: t, page: 1 });
      prefetch({ task: t, page: 1 });
    });
    const methodSlugs = ["transformer","diffusion-models","mixture-of-experts-moe","policy-learning","chain-of-thought","rag","mcp","lora","rlhf"];
    methodSlugs.forEach(m => {
      prefetch({ sort: "latest", period: "all", method: m, page: 1 });
      prefetch({ method: m, page: 1 });
    });
    prefetchMethods();
  }, []);

  const handleSidebarSelect = (label: string) => {
    setIsFilterChanging(true);
    setActiveSort(label);
  };

  // Map the UI tab to API parameters
  const apiPeriod =
    selectedPeriod === "Today" ? "today" :
      selectedPeriod === "This Week" ? "week" :
        selectedPeriod === "This Month" ? "month" : "all";

const apiSort = activeSort === "Trending Papers" ? "trending" : activeSort === "Most GitHub Stars" ? "stars" : "latest";

// ADDED: Distinguish methods from tasks
const isMethod = selectedTag === "mcp"; 
const dynamicFilterParams: Record<string, string> = { sort: apiSort };

if (selectedTag) {
  if (isMethod) {
    dynamicFilterParams.method = selectedTag;
  } else {
    dynamicFilterParams.task = selectedTag; // This is what was missing!
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
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 xl:px-12 pt-3">
          <HeroSection
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
          />
        </div>

        {/* 3-Column Layout */}
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 xl:px-12 pt-4 pb-12 flex items-start gap-4 xl:gap-5">
          <div className="hidden lg:block w-[240px] shrink-0 sticky top-3 h-[calc(100vh-80px)]">
            <Sidebar initialActive={activeSort} onItemSelect={handleSidebarSelect} />
          </div>

          <main className="flex-1 min-w-0 max-w-[1380px]">
            <PaperTabs selectedPeriod={selectedPeriod} onPeriodSelect={setSelectedPeriod} />
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
