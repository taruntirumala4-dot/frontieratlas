"use client";

import { useState } from "react";
import Link from "next/link";
import { Paper, getArxivAbsUrl, getArxivPdfUrl } from "@/lib/paperApi";
import { Star, FileText, Code2, Bookmark, Github, ArrowUpRight, ArrowUp } from "lucide-react";

export default function PaperGridCard({ paper }: { paper: Paper }) {
  const [isSaved, setIsSaved] = useState(false);

  const starCount = paper.upvotes ? parseInt(paper.upvotes, 10) : 128;
  const citationCount = paper.citations ?? 12;
  const githubStars = paper.repo ? parseInt(paper.repo, 10) : 86;

  const githubRepo = paper.repositories?.find(
    (repo: any) => repo.url?.includes("github.com")
  );
  const huggingFaceRepo = paper.repositories?.find(
    (repo: any) => repo.url?.includes("huggingface.co")
  );
  const upvotesNum = parseFloat(paper.upvotes) || 0;

  // Authors display string
  const authorsText = paper.authors && paper.authors.length > 0
    ? paper.authors.map((a) => a.name).join(", ")
    : "Unknown Authors";

  // PDF & Code URLs
  const pdfUrl = paper.pdfUrl || (paper.arxivId ? `https://arxiv.org/pdf/${paper.arxivId}.pdf` : "https://arxiv.org");
  const codeUrl = paper.githubUrl || (paper.repositories && paper.repositories[0]?.url) || "https://github.com";

  // Thumbnail resolution: prefer real .jpg thumbnail from public/thumbnails/<slug>.jpg
  const preferredThumbnail =
    paper.thumbnail && !paper.thumbnail.endsWith(".svg")
      ? paper.thumbnail
      : paper.slug
      ? `/thumbnails/${paper.slug}.jpg`
      : "/thumbnails/spade-self-play-in-adaptive-synthetic-executable-environments.jpg";

  const [imgSrc, setImgSrc] = useState(preferredThumbnail);

  return (
    <div className="group bg-white dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] hover:border-[#D4D4D8] dark:hover:border-[#3F3F46] rounded-xl p-3.5 flex flex-col justify-between hover:shadow-md transition-all duration-200 h-full select-none font-sans">
      <div>
        {/* Top Paper Figure / Diagram */}
        <Link
          href={`/papers/${paper.slug}`}
          className="block w-full h-[140px] rounded-lg overflow-hidden border border-[#EBEBEA] dark:border-[#2B2B30] bg-[#FAFAFA] dark:bg-[#202024] relative group/thumb cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt={paper.title}
            onError={() => {
              if (paper.slug && imgSrc !== `/thumbnails/${paper.slug}.jpg`) {
                setImgSrc(`/thumbnails/${paper.slug}.jpg`);
              } else if (paper.arxivId) {
                setImgSrc(`https://cdn-thumbnails.huggingface.co/social-thumbnails/papers/${paper.arxivId}.png`);
              } else {
                setImgSrc("/thumbnails/spade-self-play-in-adaptive-synthetic-executable-environments.jpg");
              }
            }}
            className="w-full h-full object-contain p-1.5 transition-transform duration-200 group-hover/thumb:scale-[1.02]"
            loading="lazy"
          />
        </Link>

        {/* Paper Title */}
        <h3 className="font-bold text-[14px] leading-snug text-[#111111] dark:text-[#F4F4F5] line-clamp-2 mt-2.5 group-hover:text-[#F55036] dark:group-hover:text-[#FF6A42] transition-colors">
          <Link href={`/papers/${paper.slug}`} className="no-underline text-inherit">
            {paper.title}
          </Link>
        </h3>

        {/* Authors */}
        <p className="text-[12px] text-[#71717A] dark:text-[#A1A1AA] line-clamp-1 mt-1 font-normal">
          {authorsText}
        </p>

        {/* Abstract snippet */}
        <p className="text-[12px] text-[#52525B] dark:text-[#9CA3AF] line-clamp-3 leading-relaxed mt-1.5 font-normal">
          {paper.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {(paper.tags || ["Agents", "Robotics"]).slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#F4F4F5] dark:bg-[#27272A] text-[#52525B] dark:text-[#D4D4D8]"
            >
              {tag}
            </span>
          ))}
          {(paper.additionalTags || []).slice(0, 1).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#F4F4F5] dark:bg-[#27272A] text-[#52525B] dark:text-[#D4D4D8]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-5 gap-1 mt-3.5">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const url = paper.arxivUrl || getArxivAbsUrl(paper.arxivId, paper.paperUrl) || "https://arxiv.org";
              window.open(url, "_blank");
            }}
            className="flex-none flex items-center justify-center px-0.5 h-[24px] sm:h-[26px] bg-white dark:bg-[#1C2128] text-[#b31b1b] dark:text-[#F85149] border-[1.5px] border-[#b31b1b]/40 dark:border-[#F85149]/40 hover:border-[#b31b1b] dark:hover:border-[#F85149] hover:bg-[#b31b1b]/5 dark:hover:bg-[#F85149]/10 rounded-[6px] transition-all duration-300"
          >
            <div className="flex items-center gap-0.5 sm:gap-1">
              <div className="w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] rounded-[4px] bg-transparent flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://cdn.simpleicons.org/arxiv/b31b1b" alt="arXiv" className="w-[9px] h-[9px] sm:w-[10px] sm:h-[10px] dark:brightness-125" />
              </div>
              <span className="font-semibold text-[8px] sm:text-[9.5px] whitespace-nowrap tracking-tighter">arXiv</span>
            </div>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const url = paper.pdfUrl || getArxivPdfUrl((paper as any).pdfUrl, paper.paperUrl, paper.arxivId) || "https://arxiv.org";
              window.open(url, "_blank");
            }}
            className="flex-none flex items-center justify-center px-0.5 h-[24px] sm:h-[26px] bg-white dark:bg-[#1C2128] text-[#E54D59] dark:text-[#FF7B72] border-[1.5px] border-[#E54D59]/40 dark:border-[#FF7B72]/40 hover:border-[#E54D59] dark:hover:border-[#FF7B72] hover:bg-[#E54D59]/5 dark:hover:bg-[#FF7B72]/10 rounded-[6px] transition-all duration-300"
          >
            <div className="flex items-center gap-0.5 sm:gap-1">
              <div className="w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] rounded-[4px] bg-transparent flex items-center justify-center">
                <FileText className="text-[#E54D59] dark:text-[#FF7B72] w-[9px] h-[9px] sm:w-[10px] sm:h-[10px]" />
              </div>
              <span className="font-semibold text-[8px] sm:text-[9.5px] whitespace-nowrap tracking-tighter">PDF</span>
            </div>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const ghUrl =
                paper.githubUrl ||
                githubRepo?.url ||
                (paper.repositories?.find((repo: any) => repo.url?.includes("github.com"))?.url);
              if (ghUrl) {
                window.open(ghUrl, "_blank");
              } else {
                window.open("https://github.com", "_blank");
              }
            }}
            className="flex-none flex items-center justify-center px-0.5 h-[24px] sm:h-[26px] bg-white dark:bg-[#1C2128] text-[#24292f] dark:text-[#C9D1D9] border-[1.5px] border-[#24292f]/30 dark:border-[#30363D] hover:border-[#24292f] dark:hover:border-[#8B949E] hover:bg-[#24292f]/5 dark:hover:bg-[#30363D]/50 rounded-[6px] transition-all duration-300"
          >
            <div className="flex items-center gap-0.5 sm:gap-1">
              <div className="w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] rounded-[4px] bg-transparent flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://cdn.simpleicons.org/github/24292f" alt="GitHub" className="w-[9px] h-[9px] sm:w-[10px] sm:h-[10px] dark:invert" />
              </div>
              <span className="font-semibold text-[8px] sm:text-[9.5px] whitespace-nowrap tracking-tighter">Code</span>
            </div>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const hfUrl =
                huggingFaceRepo?.url ||
                (paper as any).hfUrl ||
                (paper as any).huggingface_url ||
                (paper.arxivId ? `https://huggingface.co/papers/${paper.arxivId}` : null);
              if (hfUrl) {
                window.open(hfUrl, "_blank");
              } else {
                window.open("https://huggingface.co", "_blank");
              }
            }}
            className="relative overflow-hidden flex-none flex items-center justify-center px-0.5 h-[24px] sm:h-[26px] bg-white dark:bg-[#1C2128] text-[#B7791F] dark:text-[#E3B341] border-[1.5px] border-[#eab308]/50 dark:border-[#E3B341]/40 hover:border-[#eab308] dark:hover:border-[#E3B341] hover:bg-[#eab308]/10 dark:hover:bg-[#E3B341]/10 rounded-[6px] transition-all duration-300"
          >
            {/* Mobile/Compact Content */}
            <div className="absolute inset-0 flex min-[420px]:hidden items-center justify-center pointer-events-none">
              <div className="flex items-center transform scale-[0.70] whitespace-nowrap">
                <img src="https://cdn.simpleicons.org/huggingface" alt="Hugging Face" className="w-[10px] h-[10px]" />
              </div>
            </div>

            {/* Desktop Content */}
            <div className="hidden min-[420px]:flex items-center gap-0.5 sm:gap-1">
              <div className="w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] rounded-[4px] bg-transparent flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://cdn.simpleicons.org/huggingface" alt="Hugging Face" className="w-[9px] h-[9px] sm:w-[10px] sm:h-[10px]" />
              </div>
              <span className="font-semibold text-[8px] sm:text-[9.5px] whitespace-nowrap tracking-tighter">
                HF
              </span>
            </div>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const ghUrl =
                paper.githubUrl ||
                githubRepo?.url ||
                (paper.repositories?.find((repo: any) => repo.url?.includes("github.com"))?.url);
              if (ghUrl) {
                window.open(ghUrl, "_blank");
              }
            }}
            className="relative overflow-hidden flex-none flex items-center justify-center px-0.5 h-[24px] sm:h-[26px] bg-white dark:bg-[#1C2128] text-[#24292f] dark:text-[#C9D1D9] border-[1.5px] border-[#24292f]/30 dark:border-[#30363D] hover:border-[#24292f] dark:hover:border-[#8B949E] hover:bg-[#24292f]/5 dark:hover:bg-[#30363D]/50 rounded-[6px] transition-all duration-300"
          >
            {/* Mobile/Compact Content */}
            <div className="absolute inset-0 flex min-[420px]:hidden items-center justify-center pointer-events-none">
              <div className="flex items-center gap-0.5 transform scale-[0.70] whitespace-nowrap">
                <ArrowUp className="w-[10px] h-[10px] text-[#24292f] dark:text-[#C9D1D9]" strokeWidth={2.5} />
                <span className="font-medium text-[10px] tracking-tight">{(paper.github_hourly_increase ?? 1.00).toFixed(1)}/h</span>
              </div>
            </div>

            {/* Desktop Content */}
            <div className="hidden min-[420px]:flex items-center gap-0.5">
              <div className="w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] rounded-[4px] bg-transparent flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://cdn.simpleicons.org/github/24292f" alt="GitHub" className="w-[9px] h-[9px] sm:w-[10px] sm:h-[10px] dark:invert" />
              </div>
              <ArrowUp className="w-[10px] h-[10px] text-[#24292f] dark:text-[#C9D1D9]" strokeWidth={2.5} />
              <span className="font-semibold text-[8px] sm:text-[9.5px] whitespace-nowrap tracking-tighter">
                {(paper.github_hourly_increase ?? 1.00).toFixed(1)}/h
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Footer Metrics & Actions */}
      <div className="flex items-center justify-between text-[11.5px] text-[#71717A] dark:text-[#A1A1AA] pt-3 border-t border-[#F0F0EE] dark:border-[#27272A] mt-3">
        {/* Left Metrics */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Star rating */}
          <span className="flex items-center gap-1 text-[#EA580C] dark:text-[#F97316] font-medium">
            <Star size={12} className="fill-[#EA580C] dark:fill-[#F97316]" />
            <span>{isNaN(starCount) ? 128 : starCount}</span>
          </span>

          {/* Citations */}
          <span className="flex items-center gap-0.5 text-[#52525B] dark:text-[#A1A1AA]">
            <span className="font-serif font-bold text-[13px] leading-none">❞</span>
            <span>{citationCount}</span>
          </span>

          {/* GitHub stars */}
          <span className="flex items-center gap-1 text-[#52525B] dark:text-[#A1A1AA]">
            <Github size={12} />
            <span>{isNaN(githubStars) ? 86 : githubStars}</span>
          </span>
        </div>

        {/* Right Action Links */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={() => setIsSaved(!isSaved)}
            className={`flex items-center gap-1 transition-colors cursor-pointer ${
              isSaved
                ? "text-[#F55036] dark:text-[#FF6A42] font-semibold"
                : "text-[#52525B] dark:text-[#A1A1AA] hover:text-[#F55036] dark:hover:text-[#FF6A42]"
            }`}
          >
            <Bookmark size={12} className={isSaved ? "fill-current" : ""} />
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
}
