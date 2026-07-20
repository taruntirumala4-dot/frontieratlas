"use client";

export const runtime = "edge";

import { AlertCircle, BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect, useLayoutEffect } from "react";
import { getPaperBySlug, getPaperBySlugSync } from "@/lib/papers";
import type { PaperDetail as PaperDetailType } from "@/lib/papers";
import PaperDetail from "@/components/PaperDetail";
import PaperDetailSkeleton from "@/components/PaperDetailSkeleton";
import Navbar from "@/components/Navbar";

// Use useLayoutEffect on client, useEffect on server (SSR safety)
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function PaperPage() {
  const params = useParams();
  const slug = params?.slug as string;

  // ── Cache-first: read synchronously before first paint ──
  const [paper, setPaper] = useState<PaperDetailType | null>(() => {
    if (typeof window === "undefined") return null;
    return getPaperBySlugSync(slug);
  });
  const [loading, setLoading] = useState(() => {
    if (typeof window === "undefined") return true;
    return getPaperBySlugSync(slug) === null;
  });
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (!slug) return;

    // If we already have cached data, skip the loading spinner entirely.
    // Still re-fetch in background for stale-while-revalidate.
    const cached = getPaperBySlugSync(slug);
    if (cached) {
      setPaper(cached);
      setLoading(false);
      // Silently refresh in background — no spinner shown
      getPaperBySlug(slug).then(setPaper).catch(() => {});
      return;
    }

    // No cache → fetch with loading state
    setLoading(true);
    setError(null);
    setNotFound(false);

    getPaperBySlug(slug)
      .then((data) => {
        setPaper(data);
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.message.includes("404")) {
          setNotFound(true);
        } else {
          setError("Failed to load paper. Please try again later.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  let content = null;

  if (loading && !paper) {
    content = <PaperDetailSkeleton />;
  } else if (notFound) {
    content = (
      <div className="w-full max-w-7xl mx-auto px-5 lg:px-6 py-6 lg:py-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-800 transition-colors no-underline">Home</Link>
          <span>›</span>
          <span className="text-gray-900 font-medium">{slug}</span>
        </nav>

        <div className="max-w-md mx-auto flex flex-col items-center justify-center py-24 gap-5 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-2">
            <BookOpen size={32} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Paper not found</h2>
          <p className="text-sm text-gray-500">
            The paper you are looking for does not exist or may have been removed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm font-semibold transition-colors mt-4"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  } else if (error) {
    content = (
      <div className="w-full max-w-7xl mx-auto px-5 lg:px-6 py-6 lg:py-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-800 transition-colors no-underline">Home</Link>
          <span>›</span>
          <span className="text-gray-900 font-medium">{slug}</span>
        </nav>

        <div className="max-w-md mx-auto flex flex-col items-center justify-center py-24 gap-5 text-center">
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-2">
            <AlertCircle size={32} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-red-600">Something went wrong</h2>
          <p className="text-sm text-gray-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-sm font-semibold transition-colors mt-4"
          >
            Retry
          </button>
        </div>
      </div>
    );
  } else if (paper) {
    content = <PaperDetail paper={paper} />;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F8F7F2] text-[#111111]">
      <style>{`body { overflow: hidden !important; }`}</style>
      <Navbar />
      <div id="scroll-container" className="flex-1 overflow-y-auto overflow-x-hidden hide-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {content}
      </div>
    </div>
  );
}

