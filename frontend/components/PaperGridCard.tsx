"use client";

import { useState } from "react";
import Link from "next/link";
import { Paper } from "@/lib/paperApi";
import { Star, FileText, Code2, Bookmark, Github } from "lucide-react";

export default function PaperGridCard({ paper }: { paper: Paper }) {
  const [isSaved, setIsSaved] = useState(false);

  const starCount = paper.upvotes ? parseInt(paper.upvotes, 10) : 128;
  const citationCount = paper.citations ?? 12;
  const githubStars = paper.repo ? parseInt(paper.repo, 10) : 86;

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
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#52525B] dark:text-[#A1A1AA] hover:text-[#F55036] dark:hover:text-[#FF6A42] transition-colors no-underline cursor-pointer"
          >
            <FileText size={12} />
            <span>PDF</span>
          </a>

          <a
            href={codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#52525B] dark:text-[#A1A1AA] hover:text-[#F55036] dark:hover:text-[#FF6A42] transition-colors no-underline cursor-pointer"
          >
            <Code2 size={12} />
            <span>Code</span>
          </a>

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
