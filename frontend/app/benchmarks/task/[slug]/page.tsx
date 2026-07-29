"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import { atlasUiFont } from "@/lib/fonts";
import { getBenchmarks, getCachedBenchmarksSync, prefetchBenchmarkDetail, prefetchBenchmarkList, type BenchmarkItem } from "@/lib/benchmarks";
import { Search } from "lucide-react";
export const runtime = 'edge';
// --- UNIVERSAL META MATCHER ---
function getMeta(name: string) {
  const n = name.toLowerCase();

  // 1. Agents (NEW)
  if (n.includes("agent") || n.includes("tool") || n.includes("webarena") || n.includes("alfworld") || n.includes("gym") || n.includes("env"))
    return { task: "Autonomous Agents", category: "Agents", collection: "Agents", metric: "success rate", status: "Active", year: "2024" };

  // 2. Multimodal (NEW)
  if (n.includes("multimodal") || n.includes("mmmu") || n.includes("mm-") || n.includes("llava") || n.includes("vl"))
    return { task: "Joint Understanding", category: "Multimodal", collection: "Multimodal", metric: "accuracy", status: "Active", year: "2024" };

  // 3. Audio Speech (NEW)
  if (n.includes("audio") || n.includes("speech") || n.includes("voice") || n.includes("librispeech") || n.includes("whisper") || n.includes("asr") || n.includes("tts"))
    return { task: "Speech Recognition", category: "Audio Speech", collection: "Audio Speech", metric: "WER", status: "Active", year: "2023" };

  // 4. Text Generation (NEW)
  if (n.includes("text") || n.includes("generation") || n.includes("summar") || n.includes("wmt") || n.includes("translate") || n.includes("bleu"))
    return { task: "Text Generation", category: "Text Generation", collection: "Language", metric: "score", status: "Active", year: "2022" };

  // 5. Computer Vision
  if (n.includes("vqa") || n.includes("imagenet") || n.includes("coco") || n.includes("vision") || n.includes("image"))
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

export default function TaskPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params.slug as string) || "";
  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

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

  const taskBenchmarks = useMemo(() => {
    const cleanSlug = slug.replace(/[^a-z0-9]/g, "").toLowerCase();
    const filtered = benchmarks.filter(b => {
      const meta = getMeta(b.name);
      const searchSpace = `${b.name} ${meta.category} ${meta.task} ${meta.collection}`.replace(/[^a-z0-9]/gi, "").toLowerCase();
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
            Explore {title.toLowerCase()} benchmarks and evaluations. This area of evaluation is critical for accurately quantifying the capabilities and progress of modern AI systems.
          </p>
        </div>

        <div className="mt-6 mb-6 bg-white border border-gray-200 rounded-full py-3 px-6 flex items-center gap-6 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sort</span>
          <div className="w-px h-4 bg-gray-300 mx-1.5" />
          <button onClick={() => setSortBy("popular")} className={`text-sm flex items-center gap-1.5 ${sortBy === "popular" ? "font-semibold text-gray-900" : "text-gray-500"}`}>Popular</button>
          <button onClick={() => setSortBy("recent")} className={`text-sm flex items-center gap-1.5 ${sortBy === "recent" ? "font-semibold text-gray-900" : "text-gray-500"}`}> Recent</button>
          <span className="ml-auto text-sm text-gray-400 font-mono">{taskBenchmarks.length} benchmarks found</span>
        </div>

        {loading ? (
          <div className="animate-pulse h-20 bg-white rounded" />
        ) : taskBenchmarks.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
            <Search size={32} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">No benchmarks match this task.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Benchmark</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide hidden md:table-cell">Task Details</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Results</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {taskBenchmarks.map((b) => (
                  <tr
                    key={b.id}
                    onClick={() => { handlePrefetch(b.slug); router.push(`/benchmarks/${b.slug}`); }}
                    onMouseEnter={() => handlePrefetch(b.slug)}
                    onTouchStart={() => handlePrefetch(b.slug)}
                    onFocus={() => handlePrefetch(b.slug)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">{b.name}</td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{getMeta(b.name).task}</td>
                    <td className="px-4 py-3 text-right font-bold text-[#e11d48] font-mono text-xs">{b._count?.rankings ?? 0} results</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}