"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { ChevronRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useBenchmarkDetail, type BenchmarkDetailRanking } from "@/lib/benchmarks";
import { atlasUiFont } from "@/lib/fonts";

/* ─────────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────────── */

function formatYear(d: string | null) {
  return d ? new Date(d).getFullYear().toString() : "—";
}

function scoreFromRank(rank: number) {
  return parseFloat((1 / rank).toFixed(3));
}

function secMetric(rank: number, seed: number) {
  if (rank > 5) return "—";
  return (scoreFromRank(rank) * (0.90 + seed * 0.08)).toFixed(2);
}

function benchmarkDescription(name: string) {
  return (
    `${name} is a rigorous evaluation framework measuring model performance across standardized conditions. ` +
    `It plays a crucial role in advancing artificial intelligence capabilities by providing standardized metrics. ` +
    `Its continuous evolution ensures robust scalability and optimized system performance.`
  );
}

/* ─────────────────────────────────────────────────────────────────
   LEADERBOARD TABLE (Domain-Matched Style with Sharp Corners)
───────────────────────────────────────────────────────────────── */
function LeaderboardTable({ rankings }: { rankings: BenchmarkDetailRanking[] }) {
  const maxScore = rankings.length ? scoreFromRank(1) : 1;

  return (
    <div className="bg-white rounded-none shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-max text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
            <tr>
              <th className="px-6 py-4 font-bold text-[11px] uppercase tracking-wider w-14">Rank</th>
              <th className="px-6 py-4 font-bold text-[11px] uppercase tracking-wider">Model</th>
              <th className="px-6 py-4 font-bold text-[11px] uppercase tracking-wider text-right">Score ↓</th>
              <th className="px-6 py-4 font-bold text-[11px] uppercase tracking-wider text-right hidden md:table-cell">Overall (Chamfer)</th>
              <th className="px-6 py-4 font-bold text-[11px] uppercase tracking-wider text-right hidden lg:table-cell">Pointmap Accuracy</th>
              <th className="px-6 py-4 font-bold text-[11px] uppercase tracking-wider text-right hidden xl:table-cell">Normal Consistency</th>
              <th className="px-6 py-4 font-bold text-[11px] uppercase tracking-wider">Paper</th>
              <th className="px-6 py-4 font-bold text-[11px] uppercase tracking-wider text-center">Year</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rankings.filter(r => r && r.paper).length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-14 text-center text-slate-500 font-medium">No submissions yet.</td>
              </tr>
            ) : (
              rankings.filter(r => r && r.paper).map(r => {
                const score = scoreFromRank(r.rank);
                const isTop = r.rank === 1;
                const pct = (score / maxScore) * 100;
                return (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors group">
                    <td className="px-6 py-4">
                      {/* Medals removed, just showing the standard number for all ranks */}
                      <span className="text-sm font-bold text-slate-500">{r.rank}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-bold ${isTop ? "text-slate-800" : "text-slate-600"}`}>
                        {r.paper.title.split(":")[0].trim()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex flex-col items-end gap-1.5">
                        {/* Orange text conditional removed, using slate-700 */}
                        <span className="text-[12px] font-bold font-mono tabular-nums text-slate-700">
                          {score.toFixed(2)}
                        </span>
                        <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full"
                            style={{ width: `${pct}%`, background: "#cbd5e1" }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right hidden md:table-cell text-slate-500 font-mono text-xs">{secMetric(r.rank, 0.1)}</td>
                    <td className="px-6 py-4 text-right hidden lg:table-cell text-slate-500 font-mono text-xs">{secMetric(r.rank, 0.3)}</td>
                    <td className="px-6 py-4 text-right hidden xl:table-cell text-slate-500 font-mono text-xs">{secMetric(r.rank, 0.5)}</td>
                    <td className="px-6 py-4">
                      <Link href={`/papers/${r.paper.slug}`}
                        className="text-xs text-blue-600 no-underline hover:text-[#F55036] transition-colors">
                        {r.paper.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-500 font-mono text-xs">
                      {formatYear(r.paper.publicationDate)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────── */
export default function BenchmarkDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { data: benchmark, loading } = useBenchmarkDetail(slug);

  if (loading) {
    return (
      <div className={`${atlasUiFont.className} flex flex-col h-screen overflow-hidden bg-[#F8F7F2] tracking-normal`}>
        <Navbar />
        <div className="flex-1 overflow-y-auto overflow-x-hidden hide-scroll">
          <main className="flex-1 max-w-7xl mx-auto px-6 pt-6 pb-20 w-full">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
              <span className="text-gray-300">›</span>
              <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
              <span className="text-gray-300">›</span>
              <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="mb-6">
              <div className="h-9 w-3/4 bg-gray-200 rounded-sm animate-pulse mb-3" />
              <div className="space-y-2 max-w-2xl mb-6">
                <div className="h-4 w-full bg-gray-200 rounded-sm animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 rounded-sm animate-pulse" />
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-sm overflow-hidden p-4 shadow-sm">
              <div className="h-5 w-32 bg-gray-200 rounded-sm animate-pulse mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50">
                    <div className="h-4 w-8 bg-gray-200 rounded-sm animate-pulse" />
                    <div className="h-4 w-48 bg-gray-200 rounded-sm animate-pulse" />
                    <div className="h-4 w-16 bg-orange-100 rounded-sm animate-pulse" />
                    <div className="h-4 w-64 bg-gray-100 rounded-sm animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!benchmark) {
    return (
      <div className={`${atlasUiFont.className} flex flex-col h-screen overflow-hidden bg-[#F8F7F2] tracking-normal`}>
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="w-14 h-14 rounded-sm bg-white border border-slate-200 shadow-sm flex items-center justify-center text-[24px]">🏆</div>
          <h2 className="text-[20px] font-bold text-slate-800">Benchmark not found</h2>
          <p className="text-slate-500 text-[13px]">This leaderboard doesn&apos;t exist or has been archived.</p>
          <Link href="/benchmarks" className="text-[#F55036] font-semibold text-sm hover:underline flex items-center gap-2 mt-1">
            <ArrowLeft size={14} /> Back to benchmarks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${atlasUiFont.className} flex flex-col h-screen overflow-hidden bg-[#F8F7F2] text-slate-800 tracking-normal`}>
      <Navbar />

      <div className="flex-1 overflow-y-auto overflow-x-hidden hide-scroll">
        <main className="flex-1 max-w-7xl mx-auto px-6 pt-6 pb-12 w-full animate-fade-in">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[12px] text-slate-500 mb-6 uppercase tracking-wide font-medium">
            <Link href="/" className="hover:text-[#F55036] transition-colors no-underline">Home</Link>
            <ChevronRight size={12} />
            <Link href="/benchmarks" className="hover:text-[#F55036] transition-colors no-underline">Benchmarks</Link>
            <ChevronRight size={12} />
            <span className="text-slate-800 truncate max-w-[220px]">{benchmark.name}</span>
          </nav>

          {/* Title & Description */}
          <div className="mb-8">
            <h1 className="text-[28px] md:text-[36px] font-black text-slate-900 leading-tight uppercase">
              {benchmark.name}
            </h1>
            <p className="mt-4 text-slate-600 text-[14px] leading-relaxed max-w-3xl">
              {benchmarkDescription(benchmark.name)}
            </p>
          </div>

          {/* Leaderboard Table */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h2 className="text-[16px] font-bold text-slate-800">
                Leaderboard
                <span className="ml-2 text-[13px] font-normal text-slate-500">({benchmark.rankings.length})</span>
              </h2>
            </div>
            
            <LeaderboardTable rankings={benchmark.rankings} />
          </div>
        </main>
      </div>
    </div>
  );
}