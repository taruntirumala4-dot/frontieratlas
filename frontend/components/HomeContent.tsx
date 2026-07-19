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
import { getModels, getModelFacets, getTrendingModels } from "@/lib/models";
export default function HomeContent({
  initialPapers,
  initialError,
}: {
  initialPapers: GetPapersResult | null;
  initialError?: string;
}) {
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const [activeSort, setActiveSort] = useState<string>("Latest Papers");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("All time");
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
    prefetch({ sort: "trending", period: "all", page: 1 });
    prefetch({ sort: "latest", period: "all", page: 1 });
    prefetch({ sort: "stars", period: "all", page: 1 });
    const taskSlugs = ["large-language-models","agents","reasoning","vision-language-models","multimodal-models","world-models","image-generation","automatic-speech-recognition","robotics"];
    taskSlugs.forEach(t => {
      // Warm both variants: with sort (for home sidebar) and without sort (for /tasks/[slug] pages)
      prefetch({ sort: "latest", period: "all", task: t, page: 1 });
      prefetch({ task: t, page: 1 });
    });
    const methodSlugs = ["transformer","diffusion-models","mixture-of-experts-moe","policy-learning","chain-of-thought","rag","mcp","lora","rlhf"];
    methodSlugs.forEach(m => {
      prefetch({ sort: "latest", period: "all", method: m, page: 1 });
      prefetch({ method: m, page: 1 });
    });
    // Also prefetch full method detail data for instant /methods/[slug] pages
    prefetchMethods();
    // Prefetch models for instant /models page load
    try {
      getModels();
      getModelFacets();
      getTrendingModels(15);
    } catch {}
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
              selectedTag={selectedTag}
              period={apiPeriod}
              filterParams={{ sort: apiSort }}
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
