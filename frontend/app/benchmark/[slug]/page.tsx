"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import { atlasUiFont } from "@/lib/fonts";
import { getBenchmarks, getCachedBenchmarksSync, prefetchBenchmarkDetail, prefetchBenchmarkList, type BenchmarkItem } from "@/lib/benchmarks";
import {
  Search, Trophy, BookOpen, Brain, Code, Bot, Eye, FileText,
  Layers, Mic, Video, Cpu, Activity, Heart, BarChart3,
  TrendingUp, Network, Target
} from "lucide-react";

export const runtime = 'edge';

const STATUS_CFG: Record<string, { color: string; text: string; bg: string; border: string }> = {
  Active: { color: "#10B981", text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-100" },
  Saturating: { color: "#F59E0B", text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-100" },
  Saturated: { color: "#F87171", text: "text-rose-700", bg: "bg-rose-50", border: "border-rose-100" },
  Superseded: { color: "#A78BFA", text: "text-purple-700", bg: "bg-purple-50", border: "border-purple-100" },
  Unmapped: { color: "#9CA3AF", text: "text-gray-500", bg: "bg-gray-50", border: "border-gray-100" },
};

const DOMAINS = [
  { label: "General AI", icon: Trophy, color: "#e11d48", desc: "Measures overall AI capability across diverse tasks spanning language, vision, reasoning & planning" },
  { label: "Language", icon: BookOpen, color: "#0284c7", desc: "NLP benchmarks for comprehension, fluent text generation & cross-lingual translation quality" },
  { label: "Reasoning", icon: Brain, color: "#9333ea", desc: "Evaluates logical, causal & commonsense inference across multi-step problem chains" },
  { label: "Coding", icon: Code, color: "#16a34a", desc: "Code generation, debugging & software engineering evaluations across real-world repositories" },
  { label: "Agents", icon: Bot, color: "#d97706", desc: "Tool use, long-horizon planning & multi-turn decision-making in interactive environments" },
  { label: "Computer Vision", icon: Eye, color: "#0891b2", desc: "Detection, segmentation, classification & other pixel-level visual understanding tasks" },
  { label: "OCR & Document AI", icon: FileText, color: "#7c3aed", desc: "Text recognition, layout parsing & structured extraction from scanned documents & PDFs" },
  { label: "Multimodal", icon: Layers, color: "#db2777", desc: "Cross-modal reasoning across image, text & audio inputs requiring joint understanding" },
  { label: "Audio & Speech", icon: Mic, color: "#0d9488", desc: "Speech recognition, synthesis quality & audio classification measured by WER and MOS" },
  { label: "Video", icon: Video, color: "#ea580c", desc: "Temporal action recognition, video QA & long-form understanding across frame sequences" },
  { label: "Robotics", icon: Cpu, color: "#4f46e5", desc: "Manipulation, navigation & embodied control tasks across simulated & real-world settings" },
  { label: "Embodied AI", icon: Activity, color: "#ca8a04", desc: "Agents acting, exploring & solving goals in simulated 3D environments with physical constraints" },
  { label: "Healthcare", icon: Heart, color: "#dc2626", desc: "Medical QA, clinical NLP & diagnostic imaging benchmarks for biomedical AI systems" },
  { label: "Mathematics", icon: BarChart3, color: "#2563eb", desc: "From arithmetic word problems to formal proof verification across multiple difficulty levels" },
  { label: "Time Series", icon: TrendingUp, color: "#65a30d", desc: "Forecasting future values & anomaly detection across temporal signals and sensor streams" },
  { label: "Graphs", icon: Network, color: "#c026d3", desc: "Node classification, link prediction & graph-level reasoning on structured relational data" },
  { label: "Scientific AI", icon: Target, color: "#0284c7", desc: "Biology, chemistry & physics evaluations measuring AI progress on scientific discovery tasks" },
];

const getCategoryIcon = (category: string) => DOMAINS.find(d => d.label === category)?.icon ?? Trophy;
const getCategoryColor = (category: string) => DOMAINS.find(d => d.label === category)?.color ?? "#e11d48";

// --- UNIVERSAL META MATCHER ---
function getMeta(name: string) {
  const n = name.toLowerCase();

  // 1. Agents
  if (n.includes("agent") || n.includes("tool") || n.includes("webarena") || n.includes("alfworld") || n.includes("gym") || n.includes("env"))
    return { task: "Autonomous Agents", category: "Agents", collection: "Agents", metric: "success rate", status: "Active", year: "2024" };

  // 2. Multimodal
  if (n.includes("multimodal") || n.includes("mmmu") || n.includes("mm-") || n.includes("llava") || n.includes("vl"))
    return { task: "Joint Understanding", category: "Multimodal", collection: "Multimodal", metric: "accuracy", status: "Active", year: "2024" };

  // 3. Audio Speech
  if (n.includes("audio") || n.includes("speech") || n.includes("voice") || n.includes("librispeech") || n.includes("whisper") || n.includes("asr") || n.includes("tts"))
    return { task: "Speech Recognition", category: "Audio Speech", collection: "Audio Speech", metric: "WER", status: "Active", year: "2023" };

  // 4. Text Generation
  if (n.includes("text") || n.includes("generation") || n.includes("summar") || n.includes("wmt") || n.includes("translate") || n.includes("bleu"))
    return { task: "Text Generation", category: "Text Generation", collection: "Language", metric: "score", status: "Active", year: "2022" };

  // 5. Computer Vision
  if (n.includes("vqa") || n.includes("imagenet") || n.includes("coco") || n.includes("vision") || n.includes("image") || n.includes("mmmu"))
    return { task: "Visual QA", category: "Computer Vision", collection: "Vision", metric: "accuracy", status: "Active", year: "2023" };

  // 6. Coding
  if (n.includes("swe") || n.includes("humaneval") || n.includes("mbpp") || n.includes("code") || n.includes("ds-1000"))
    return { task: "Software Engineering", category: "Coding", collection: "Coding", metric: "pass@1", status: "Active", year: "2023" };

  // 7. OCR & Document AI
  if (n.includes("ocr") || n.includes("doc") || n.includes("parse"))
    return { task: "Document Parsing", category: "OCR & Document AI", collection: "Document AI", metric: "f1-score", status: "Active", year: "2024" };

  // 8. Mathematics
  if (n.includes("math") || n.includes("gsm"))
    return { task: "Mathematical Reasoning", category: "Mathematics", collection: "Math", metric: "accuracy", status: "Active", year: "2021" };

  // 9. Reasoning
  if (n.includes("arc") || n.includes("hellaswag") || n.includes("piqa") || n.includes("boolq"))
    return { task: "Commonsense Reasoning", category: "Reasoning", collection: "Reasoning", metric: "accuracy", status: "Saturated", year: "2019" };

  // 10. Healthcare
  if (n.includes("medqa") || n.includes("pubmed") || n.includes("clinical") || n.includes("med"))
    return { task: "Medical QA", category: "Healthcare", collection: "Healthcare", metric: "accuracy", status: "Active", year: "2023" };

  // 11. Language
  if (n.includes("mmlu") || n.includes("gpqa") || n.includes("nlp"))
    return { task: "Question Answering", category: "Language", collection: "General QA", metric: "accuracy", status: "Active", year: "2021" };

  // Fallback
  return { task: "General Evaluation", category: "General AI", collection: "General", metric: "score", status: "Active", year: "2024" };
}

export default function UnifiedBenchmarkCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params.slug as string) || "";
  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  // Detect if this is a known domain to provide rich UI, otherwise fallback to generic descriptions
  const domainInfo = DOMAINS.find(d => d.label.toLowerCase() === title.toLowerCase());

  const [benchmarks, setBenchmarks] = useState<BenchmarkItem[]>(() => getCachedBenchmarksSync() ?? []);
  const [loading, setLoading] = useState(() => !(benchmarks && benchmarks.length > 0));
  const [sortBy, setSortBy] = useState<"popular" | "recent">("popular");

  useEffect(() => {
    getBenchmarks()
      .then((data) => {
        setBenchmarks(data);
        prefetchBenchmarkList(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handlePrefetch = (bSlug: string) => {
    if (bSlug) {
      router.prefetch(`/benchmarks/${bSlug}`);
      prefetchBenchmarkDetail(bSlug);
    }
  };

  const filteredBenchmarks = useMemo(() => {
    const cleanSlug = slug.replace(/[^a-z0-9]/g, "").toLowerCase();
    
    const filtered = benchmarks.filter(b => {
      const meta = getMeta(b.name);
      const searchSpace = `${b.name} ${meta.category} ${meta.task} ${meta.collection}`.replace(/[^a-z0-9]/gi, "").toLowerCase();
      
      // Keep the specific fallback for "General AI" domain routing
      if (cleanSlug === "generalai") {
        return searchSpace.includes("general");
      }
      
      return searchSpace.includes(cleanSlug) || cleanSlug.includes(searchSpace);
    });

    return filtered.sort((a, b) => {
      if (sortBy === "popular") return (b._count?.rankings ?? 0) - (a._count?.rankings ?? 0);
      return (parseInt(getMeta(b.name).year) || 0) - (parseInt(getMeta(a.name).year) || 0);
    });
  }, [benchmarks, slug, sortBy]);

  return (
    <div className={`${atlasUiFont.className} flex flex-col min-h-screen bg-[#F8F7F2] text-slate-800`}>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-6 pt-6 pb-6 w-full">
        <div className="text-sm text-gray-500 mb-6 uppercase tracking-wide font-medium cursor-pointer">
          <span onClick={() => router.push('/')} className="hover:text-gray-900">Home</span> /{" "}
          <span onClick={() => router.push('/benchmarks')} className="hover:text-gray-900">Benchmarks</span> /{" "}
          <span className="text-gray-900">{title}</span>
        </div>

        <div className="max-w-3xl">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase">{title}</h1>
          </div>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            {domainInfo?.desc 
              ? `${domainInfo.desc}${!domainInfo.desc.endsWith('.') ? '.' : ''} This area of evaluation is critical for accurately quantifying the capabilities and progress of modern AI systems.`
              : `Explore ${title.toLowerCase()} benchmarks and evaluations. This area of evaluation is critical for accurately quantifying the capabilities and progress of modern AI systems.`
            }
          </p>
        </div>

        <div className="mt-6 mb-6 bg-white border border-gray-200 rounded-full py-3 px-6 flex items-center gap-6 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sort</span>
          <div className="w-px h-4 bg-gray-300 mx-1.5" />
          <button onClick={() => setSortBy("popular")} className={`text-sm flex items-center gap-1.5 ${sortBy === "popular" ? "font-semibold text-gray-900" : "text-gray-500 hover:text-gray-900"}`}> Popular</button>
          <button onClick={() => setSortBy("recent")} className={`text-sm flex items-center gap-1.5 ${sortBy === "recent" ? "font-semibold text-gray-900" : "text-gray-500 hover:text-gray-900"}`}> Recent</button>
          <span className="ml-auto text-sm text-gray-400 font-mono">{filteredBenchmarks.length} benchmarks found</span>
        </div>

        {loading ? (
          <div className="animate-pulse h-20 bg-white rounded" />
        ) : filteredBenchmarks.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
            <Search size={32} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">No benchmarks match this category.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Benchmark</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide hidden md:table-cell">Task</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide hidden lg:table-cell">Category</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide hidden xl:table-cell">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredBenchmarks.map((b) => {
                  const meta = getMeta(b.name);
                  const cfg = STATUS_CFG[meta.status] ?? STATUS_CFG["Unmapped"];
                  const Icon = getCategoryIcon(meta.category);
                  const color = getCategoryColor(meta.category);
                  return (
                    <tr
                      key={b.id}
                      onClick={() => { handlePrefetch(b.slug); router.push(`/benchmarks/${b.slug}`); }}
                      onMouseEnter={() => handlePrefetch(b.slug)}
                      onTouchStart={() => handlePrefetch(b.slug)}
                      onFocus={() => handlePrefetch(b.slug)}
                      className="hover:bg-gray-50 cursor-pointer group"
                    >
                      <td className="px-4 py-3 flex items-center gap-2.5">
                        <div className="p-1.5 rounded-md group-hover:scale-110 transition-transform" style={{ background: color + "18" }}><Icon size={13} style={{ color }} /></div>
                        <span className="font-medium text-gray-800 group-hover:text-[#e11d48]">{b.name}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{meta.task}</td>
                      <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{meta.category}</td>
                      <td className="px-4 py-3 hidden xl:table-cell">
                        <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded ${cfg.bg} ${cfg.text} border ${cfg.border}`}>{meta.status}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}