"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RelatedPaperCard } from "@/components/PaperDetail";
import { Bookmark, Sparkles, ArrowRight } from "lucide-react";

const defaultApiUrl = "https://frontieratlas-backend.morningsignal-india.workers.dev";
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || defaultApiUrl).replace(/\/$/, "");

export default function SavedPapersPage() {
  const router = useRouter();
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSavedPapers() {
      try {
        const res = await fetch(`${API_BASE}/api/v1/research-papers/saved`, {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setPapers(data.papers || []);
        } else if (res.status === 401 || res.status === 403) {
          // If unauthorized, redirect to login with callback
          router.push("/login?redirect=/saved");
        }
      } catch (error) {
        console.error("Failed to load saved papers", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSavedPapers();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#171717] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-10">
        <header className="mb-8">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#FF5A1F] mb-2 font-semibold">
            <Bookmark size={13} />
            Personal Library
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#171717]">Saved Papers</h1>
          <p className="mt-2 text-[14px] sm:text-[15px] text-[#666666]">
            Research papers, pre-prints, and methodologies you have bookmarked for reference.
          </p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col border border-[#EDE8DF] bg-white rounded-lg overflow-hidden animate-pulse">
                <div className="w-full aspect-[3/2] bg-[#EFECE6]" />
                <div className="p-4 space-y-2.5">
                  <div className="h-3.5 bg-[#E8E5DD] rounded w-full" />
                  <div className="h-3.5 bg-[#E8E5DD] rounded w-4/5" />
                  <div className="h-2.5 bg-[#E8E5DD] rounded w-1/2 pt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : papers.length === 0 ? (
          <div className="py-16 px-6 border border-[#EDE8DF] bg-white rounded-xl text-center max-w-xl mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#FFF5F1] text-[#FF5A1F] flex items-center justify-center mx-auto mb-4">
              <Bookmark size={22} />
            </div>
            <h2 className="text-lg font-bold text-[#171717] mb-2">No saved papers yet</h2>
            <p className="text-[#666666] text-[14px] leading-relaxed mb-6">
              When exploring research on Frontier Atlas, click the bookmark icon on any paper card or detail page to save it to your personal reading library.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#171717] text-white text-[13px] font-semibold hover:bg-[#333333] transition-colors"
            >
              Explore Research Papers
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {papers.map((paper) => (
              <RelatedPaperCard key={paper.id || paper.slug} paper={paper} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}