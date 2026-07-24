"use client";

import React, { useState, useEffect, useMemo, use } from "react";
import Link from "next/link";
import { 
  Cpu, ArrowLeft,
  Sparkles, BookOpen, Zap, 
  Activity, Box, BarChart3,
} from "lucide-react";
import { fetchApi } from "@/lib/api";
import { type ModelItem } from "@/lib/models";
import PaperList from "@/components/PaperFeed";
import Navbar from "@/components/Navbar";

export default function ModelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const [model, setModel] = useState<ModelItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLogoError(false);
    if (resolvedParams?.slug) {
      const cleanId = resolvedParams.slug.toLowerCase().trim();
      fetchApi<{ status: string, data: any }>(`/api/v1/models/${cleanId}`)
        .then(response => {
          if (response.status === "success" && response.data) {
            setModel(response.data);
          } else {
            setModel(null);
          }
          setLoading(false);
        })
        .catch(err => {
        console.error("Failed to load model:", err);
        setLoading(false);
      });
    }
  }, [resolvedParams?.slug]);
  
  const benchmarkArray = useMemo(() => {
    if (!model || !model.benchmarkScore) return [];
    return Object.entries(model.benchmarkScore).map(([key, value]) => {
      return {
        name: key.toUpperCase(),
        score: typeof value === 'number' ? value.toFixed(1) : value,
        value: Number(value) || 0,
        color: "#FF5A1F" // fallback brand color
      };
    });
  }, [model]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center p-10">
          <div className="w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Cpu size={24} className="text-[#FF5A1F]" />
          </div>
          <div className="text-[13px] font-bold text-[#8B8B8B] uppercase tracking-wider animate-pulse">Loading Architecture Profile...</div>
        </div>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6">
        <div className="bg-white border border-[#F0F0F0] rounded-[12px] p-10 max-w-md w-full text-center shadow-sm">
          <div className="w-16 h-16 bg-[#FFF6F3] text-[#FF5A1F] rounded-full flex items-center justify-center mx-auto mb-5 border border-[#FFEDD5]">
            <Sparkles size={32} />
          </div>
          <h1 className="text-2xl font-extrabold text-[#111111] mb-3 tracking-tight">Model Profile Not Found</h1>
          <p className="text-base text-[#555555] mb-8 leading-relaxed font-medium">
            We couldn&apos;t find an indexed AI foundation model matching <code className="bg-[#F8F7F2] border border-[#EAE9E4] px-2 py-1 rounded text-[#FF5A1F] text-[13px] font-bold mx-1">{resolvedParams.slug}</code>.
          </p>
          <Link
            href="/models"
            className="flex items-center justify-center gap-2 w-full p-3.5 bg-[#111111] hover:bg-[#222222] text-white rounded-[8px] transition-colors font-bold text-sm no-underline shadow-sm"
          >
            <ArrowLeft size={16} />
            <span>Return to Models Directory</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      
      <Navbar />

      {/* Breadcrumb — matching models page style */}
      <nav className="flex items-center gap-2 text-[13px] text-[#8B8B8B] mb-6 max-w-7xl mx-auto px-4 md:px-8 pt-6">
        <Link href="/" className="hover:text-[#FF5A1F] transition-colors no-underline">Home</Link>
        <span>/</span>
        <Link href="/models" className="hover:text-[#FF5A1F] transition-colors no-underline">Models</Link>
        <span>/</span>
        <span className="text-[#555555] font-medium">{model.name}</span>
      </nav>

      {/* ── HERO SECTION: CLEAN LIGHT CARD ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
        <div className="bg-white rounded-[12px] border border-[#F0F0F0] p-6 md:p-10 shadow-sm relative overflow-hidden flex flex-col md:flex-row gap-8 justify-between">
          <div className="flex-1">
          
          {/* Top Metadata Strip */}
          {(model as any).elo && (
            <div className="flex mb-4 relative z-10">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111111] text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                <Zap size={13} style={{ fill: "#ffffff" }} />
                <span>GLOBAL ELO RATING: {(model as any).elo}</span>
              </div>
            </div>
          )}

          {/* Title & Core Summary */}
          <h1 className="text-lg md:text-2xl font-bold text-[#111111] tracking-tight mb-3 relative z-10">
            {model.name}
          </h1>
          <p className="text-[#555555] text-lg max-w-3xl leading-relaxed mb-10 relative z-10 font-medium">
            {model.description}
          </p>

          {/* 4-Cell Interactive Architecture & Spec Pods inside Hero */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            
            <div className="bg-[#F8F7F2] border border-[#EAE9E4] rounded-[8px] p-3 transition-shadow hover:shadow-md cursor-default">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#8B8B8B]">Architecture Specs</span>
                <Cpu size={14} className="text-[#FF5A1F]" />
              </div>
              <div className="text-base font-bold text-[#111111]">
                {model.parameterCount || "Not Specified"}
              </div>
            </div>

            <div className="bg-[#F8F7F2] border border-[#EAE9E4] rounded-[8px] p-3 transition-shadow hover:shadow-md cursor-default">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#8B8B8B]">Context Capacity</span>
                <Box size={14} className="text-[#3B82F6]" />
              </div>
              <div className="text-base font-bold text-[#111111]">
                {model.contextWindow || "Not Specified"}
              </div>
            </div>

            <div className="bg-[#F8F7F2] border border-[#EAE9E4] rounded-[8px] p-3 transition-shadow hover:shadow-md cursor-default">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#8B8B8B]">Primary Specialization</span>
                <Activity size={14} className="text-[#FF5A1F]" />
              </div>
              <div className="text-base font-bold text-[#111111]">
                {model.category || "General Purpose"}
              </div>
            </div>

            <div className="bg-[#F8F7F2] border border-[#EAE9E4] rounded-[8px] p-3 transition-shadow hover:shadow-md cursor-default">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#8B8B8B]">Literature Citations</span>
                <BookOpen size={14} className="text-[#8B5CF6]" />
              </div>
              <div className="text-base font-bold text-[#111111]">
                {model.paperCount} Verified Papers
              </div>
            </div>
          
          </div>
          </div>

          {/* Logo on the Right Side */}
          {model.vendorLogoUrl && !logoError ? (
            <div className="hidden md:flex flex-col items-end justify-start shrink-0">
              <div className="w-24 h-24 rounded-[12px] bg-[#F8F7F2] border border-[#EAE9E4] p-3 flex items-center justify-center">
                <img 
                  src={model.vendorLogoUrl} 
                  alt={model.vendor} 
                  onError={() => setLogoError(true)}
                  className="w-full h-full object-contain" 
                />
              </div>
            </div>
          ) : (
            <div className="hidden md:flex flex-col items-end justify-start shrink-0">
              <div className="w-24 h-24 rounded-[12px] bg-[#F8F7F2] border border-[#EAE9E4] p-3 flex items-center justify-center text-[#8B8B8B]">
                <Cpu size={40} />
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 1: VERIFIED ACADEMIC BENCHMARKS & EVALUATION MATRIX
      ───────────────────────────────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
          
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-white p-5 rounded-[12px] border border-[#F0F0F0]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FFF6F3] flex items-center justify-center text-[#FF5A1F]">
                <BarChart3 size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#111111] mb-1 tracking-tight">Empirical Evaluation Leaderboard</h2>
                <p className="text-sm font-medium text-[#555555]">Official verified evaluations vs baseline human expert threshold</p>
              </div>
            </div>


          </div>

          {/* Benchmarks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benchmarkArray && benchmarkArray.length > 0 ? (
              benchmarkArray.map((bm, i) => {
                
                

                return (
                  <div key={i} className="bg-white rounded-[12px] border border-[#F0F0F0] overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-5">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: bm.color || "#FF5A1F" }} />
                            <span className="text-base font-extrabold text-[#111111] tracking-tight">{bm.name}</span>
                          </div>
                          <span className="text-[11px] font-bold text-[#8B8B8B] uppercase tracking-wider">Peer-Reviewed Verification Suite</span>
                        </div>
                        
                        <div className="flex flex-col items-end">
                          <span className="text-xl font-extrabold text-[#111111] tracking-tighter">{bm.score}</span>
                        </div>
                      </div>

                      {/* Gauge Bar */}
                      <div className="mb-2">
                        <div className="flex justify-between items-end mb-2 text-[11px] font-bold">
                          <span className="text-[#8B8B8B] uppercase">Model Capability</span>
                          
                        </div>

                        <div className="relative w-full h-3 bg-[#F0F0F0] rounded-full overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${bm.value}%`, backgroundColor: bm.color || "#FF5A1F" }}
                          />

                          {/* Human Expert Marker */}
                          
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full bg-white rounded-[12px] border border-[#F0F0F0] p-12 text-center">
                <p className="text-base font-bold text-[#555555]">Extensive evaluation suites are currently being compiled for this model.</p>
              </div>
            )}
          </div>

        </section>



      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 4: RESEARCH LITERATURE & ACADEMIC BIBLIOGRAPHY
      ───────────────────────────────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-5 rounded-[12px] border border-[#F0F0F0]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FAF5FF] text-[#8B5CF6] flex items-center justify-center">
                <BookOpen size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#111111] mb-1 tracking-tight">Indexed Academic Citations</h2>
                <p className="text-sm font-medium text-[#555555]">Peer-reviewed literature citing, evaluating, or comparing {model.name}</p>
              </div>
            </div>
          </div>

          <PaperList filterParams={{ model: resolvedParams.slug.toLowerCase().trim(), sort: "citations" }} />
        </section>
    </div>
  );
}
