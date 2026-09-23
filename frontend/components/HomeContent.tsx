"use client";

import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PaperTabs from "@/components/PaperTabs";
import PaperGridCard from "@/components/PaperGridCard";
import PaperList from "@/components/PaperFeed";
import HeroSection from "@/components/HeroSection";
import type { GetPapersResult, Paper } from "@/lib/paperApi";
import { FEATURED_PAPERS } from "@/lib/mockPapers";

export default function HomeContent({
  initialPapers,
  initialError,
  initialPeriod = "all",
}: {
  initialPapers: GetPapersResult | null;
  initialError?: string;
  initialPeriod?: string;
}) {
  const [activeNav, setActiveNav] = useState<string>("Trending Papers");
  const [selectedTopic, setSelectedTopic] = useState<string>("All Topics");
  const [selectedSort, setSelectedSort] = useState<string>("Trending");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("today");

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleNavSelect = (label: string) => {
    setActiveNav(label);
    if (label === "Trending Papers") {
      setSelectedSort("Trending");
      setSelectedTopic("All Topics");
    } else if (label === "Latest Papers") {
      setSelectedSort("Latest");
      setSelectedTopic("All Topics");
    } else if (label === "Most GitHub Stars") {
      setSelectedSort("Most GitHub Stars");
      setSelectedTopic("All Topics");
    } else {
      setSelectedTopic(label);
    }
  };

  // Combine featured papers with any dynamically loaded papers
  const allPapers: Paper[] = useMemo(() => {
    const fetched = initialPapers?.papers || [];
    if (fetched.length === 0) {
      return FEATURED_PAPERS;
    }

    // Merge featured papers at the front if not already present
    const map = new Map<string, Paper>();
    FEATURED_PAPERS.forEach((p) => map.set(p.slug, p));
    fetched.forEach((p) => {
      if (!map.has(p.slug)) map.set(p.slug, p);
    });
    return Array.from(map.values());
  }, [initialPapers]);

  // Filter papers based on selected topic
  const filteredPapers = useMemo(() => {
    if (!selectedTopic || selectedTopic === "All Topics") {
      return allPapers;
    }

    const topicQuery = selectedTopic.toLowerCase();
    return allPapers.filter((paper) => {
      const matchTags = (paper.tags || []).some((t) =>
        t.toLowerCase().includes(topicQuery)
      );
      const matchAdditional = (paper.additionalTags || []).some((t) =>
        t.toLowerCase().includes(topicQuery)
      );
      const matchTitle = paper.title.toLowerCase().includes(topicQuery);
      const matchDesc = paper.description.toLowerCase().includes(topicQuery);

      return matchTags || matchAdditional || matchTitle || matchDesc;
    });
  }, [allPapers, selectedTopic]);

  // Sort papers based on selected sort
  const sortedPapers = useMemo(() => {
    const papers = [...filteredPapers];
    if (selectedSort === "Most GitHub Stars") {
      return papers.sort(
        (a, b) => (parseInt(b.repo || "0", 10) || 0) - (parseInt(a.repo || "0", 10) || 0)
      );
    }
    if (selectedSort === "Trending") {
      return papers.sort(
        (a, b) =>
          ((b.github_hourly_increase || 0) * 100 + (parseInt(b.upvotes || "0", 10) || 0)) -
          ((a.github_hourly_increase || 0) * 100 + (parseInt(a.upvotes || "0", 10) || 0))
      );
    }
    if (selectedSort === "Citations") {
      return papers.sort((a, b) => (b.citations || 0) - (a.citations || 0));
    }
    // Default: Latest
    return papers;
  }, [filteredPapers, selectedSort]);

  const totalCount = 124532;
  const totalPages = 4152;

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] dark:bg-[#0F1115] text-[#111111] dark:text-[#EDEDED] transition-colors duration-200">
      {/* Top Navigation Bar */}
      <Navbar
        activeSort={activeNav}
        onItemSelect={handleNavSelect}
      />

      {/* Hero Section */}
      <HeroSection
        selectedTag={selectedTopic === "All Topics" ? undefined : selectedTopic}
        onTagSelect={(tag) => setSelectedTopic(tag)}
      />

      {/* Main Container */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-start gap-6 lg:gap-8 flex-1">
        {/* Left Sticky Sidebar */}
        <aside className="hidden lg:block w-[220px] shrink-0 sticky top-[80px] max-h-[calc(100vh-100px)] overflow-y-auto hide-scroll">
          <Sidebar
            initialActive={activeNav}
            onItemSelect={handleNavSelect}
          />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {/* Subheader: Period Tabs (Today, This Week, This Month, All time) + Sort Dropdown + Counts */}
          <PaperTabs
            selectedPeriod={selectedPeriod}
            onPeriodSelect={(period) => setSelectedPeriod(period)}
            selectedSort={selectedSort}
            onSortSelect={(sort) => {
              setSelectedSort(sort);
              if (sort === "Trending") setActiveNav("Trending Papers");
              else if (sort === "Latest") setActiveNav("Latest Papers");
              else if (sort === "Most GitHub Stars") setActiveNav("Most GitHub Stars");
            }}
            totalPapers={totalCount}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />

          {/* Cards Display */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-4.5 items-stretch">
              {sortedPapers.map((paper) => (
                <div key={paper.slug || paper.id} className="h-full">
                  <PaperGridCard paper={paper} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <PaperList
                filterParams={{ sort: selectedSort.toLowerCase() }}
                initialPapers={initialPapers}
                initialError={initialError}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}