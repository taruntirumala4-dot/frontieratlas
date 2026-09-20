"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Maximize2 } from "lucide-react";
import type { Paper } from "@/lib/paperApi";
import { getArxivPdfUrl } from "@/lib/paperApi";

interface PaperPreviewProps {
  paper: Paper | null;
}

export default function PaperPreview({ paper }: PaperPreviewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12; // Standard display estimate

  if (!paper) {
    return (
      <div className="w-[280px] xl:w-[320px] shrink-0 border border-[#E5E5E0] dark:border-[#22272E] rounded-xl bg-white dark:bg-[#161B22] p-5 hidden 2xl:flex flex-col items-center justify-center text-center text-[#8B8B8B] dark:text-[#6E7681]">
        <p className="text-xs">Hover or select a paper to preview</p>
      </div>
    );
  }

  const pdfUrl = paper.pdfUrl || getArxivPdfUrl(paper.arxivId) || "https://arxiv.org";

  return (
    <aside className="w-[300px] xl:w-[340px] shrink-0 border border-[#E5E5E0] dark:border-[#22272E] rounded-2xl bg-white dark:bg-[#161B22] p-4 hidden 2xl:flex flex-col sticky top-2 shadow-sm transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E0] dark:border-[#22272E] mb-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#666666] dark:text-[#8B949E]">
          Paper Preview
        </span>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Open in new window"
          className="text-[#8B8B8B] dark:text-[#8B949E] hover:text-[#111111] dark:hover:text-white transition-colors"
        >
          <Maximize2 size={13} />
        </a>
      </div>

      {/* Preview Sheet Box */}
      <div className="relative aspect-[3/4] w-full bg-[#FAFAFA] dark:bg-[#0D1117] border border-[#E5E5E0] dark:border-[#30363D] rounded-xl p-4 overflow-hidden flex flex-col justify-between shadow-inner">
        <div>
          <h4 className="text-[12.5px] font-bold text-[#111111] dark:text-[#F0F6FC] leading-snug line-clamp-3 mb-1">
            {paper.title}
          </h4>
          <p className="text-[10px] text-[#737373] dark:text-[#8B949E] truncate mb-2">
            {paper.authors?.map((a) => a.name).join(", ")}
          </p>

          <div className="text-[9px] font-bold uppercase tracking-wider text-[#8B8B8B] dark:text-[#6E7681] mb-1">
            Abstract
          </div>
          <p className="text-[9.5px] text-[#555555] dark:text-[#A1A1A6] leading-[1.45] line-clamp-[12]">
            {paper.description}
          </p>
        </div>

        {/* Page counter slider bar representation */}
        <div className="mt-2 pt-2 border-t border-[#E5E5E0] dark:border-[#22272E] flex items-center justify-between text-[11px] text-[#666666] dark:text-[#8B949E]">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            className="p-1 hover:text-[#111111] dark:hover:text-white disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="font-mono text-[10px]">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className="p-1 hover:text-[#111111] dark:hover:text-white disabled:opacity-30 cursor-pointer"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Action: Open full paper */}
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 w-full py-2 px-3 border border-[#F55036]/40 dark:border-[#FF5A1F]/40 hover:border-[#F55036] dark:hover:border-[#FF5A1F] hover:bg-[#F55036]/5 dark:hover:bg-[#FF5A1F]/10 text-[#F55036] dark:text-[#FF5A1F] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer no-underline"
      >
        <span>Open full paper</span>
        <ExternalLink size={12} />
      </a>
    </aside>
  );
}
