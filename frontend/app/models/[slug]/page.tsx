"use client";

import React, { useEffect, useMemo, useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Cpu,
  ExternalLink,
  FileText,
  Github,
  Layers3,
  Sparkles,
} from "lucide-react";
import {
  type ModelDetail,
  type ModelItem,
  getCachedModelBySlug,
  getModelBySlug,
} from "@/lib/models";
import PaperList from "@/components/PaperFeed";
import Navbar from "@/components/Navbar";

function formatNumber(value: number | null | undefined) {
  if (value === null || value === undefined) return null;
  return new Intl.NumberFormat("en-US", {
    notation: value >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatDate(value: string | null | undefined) {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getInitials(name: string) {
  return name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
  }
  if (typeof value === "string" && value.trim().length > 0) {
    return [value];
  }
  return [];
}

function ModelDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#F8F7F2] pb-24">
      <Navbar />

      <div className="w-full max-w-[1370px] mx-auto px-5 md:px-10 lg:px-16 xl:px-24 pt-6 pb-12">
        <div className="h-4 w-48 rounded bg-[#EAE9E4] animate-pulse mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-8 lg:gap-10">
          <div className="space-y-8">
            <div className="rounded-[10px] border border-[#E5E5E0] bg-white p-6 md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="h-4 w-24 rounded bg-[#EAE9E4] animate-pulse mb-4" />
                  <div className="h-10 w-64 rounded bg-[#EAE9E4] animate-pulse mb-3" />
                  <div className="h-5 w-40 rounded bg-[#EAE9E4] animate-pulse mb-4" />
                  <div className="space-y-2 mb-5">
                    <div className="h-4 w-full max-w-2xl rounded bg-[#EAE9E4] animate-pulse" />
                    <div className="h-4 w-4/5 max-w-xl rounded bg-[#EAE9E4] animate-pulse" />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-7 w-24 rounded-full bg-[#EAE9E4] animate-pulse"
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div
                        key={index}
                        className="rounded-[8px] border border-[#EAE9E4] bg-[#FAFAF8] p-3"
                      >
                        <div className="h-3 w-16 rounded bg-[#EAE9E4] animate-pulse mb-2" />
                        <div className="h-5 w-20 rounded bg-[#EAE9E4] animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-20 h-20 rounded-[10px] border border-[#EAE9E4] bg-[#FAFAF8] animate-pulse shrink-0" />
              </div>
            </div>

            <div className="rounded-[10px] border border-[#E5E5E0] bg-white p-6">
              <div className="h-6 w-40 rounded bg-[#EAE9E4] animate-pulse mb-5" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-[8px] border border-[#EAE9E4] bg-[#FAFAF8] p-4"
                  >
                    <div className="h-4 w-32 rounded bg-[#EAE9E4] animate-pulse mb-3" />
                    <div className="h-2 w-full rounded-full bg-[#EAE9E4] animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="rounded-[10px] border border-[#E5E5E0] bg-white p-5"
              >
                <div className="h-5 w-28 rounded bg-[#EAE9E4] animate-pulse mb-4" />
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((__, rowIndex) => (
                    <div key={rowIndex} className="flex items-center justify-between gap-3">
                      <div className="h-3 w-20 rounded bg-[#EAE9E4] animate-pulse" />
                      <div className="h-3 w-24 rounded bg-[#EAE9E4] animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#E5E5E0] bg-[#FAFAF8] px-3 py-1 text-[12px] font-medium text-[#555555]">
      {children}
    </span>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  if (value === null || value === undefined || value === "") return null;

  return (
    <div className="rounded-[8px] border border-[#E5E5E0] bg-[#FAFAF8] px-3 py-3">
      <div className="text-[11px] uppercase tracking-[0.08em] text-[#8B8B8B]">
        {label}
      </div>
      <div className="mt-1 text-[15px] font-semibold text-[#111111]">
        {value}
      </div>
    </div>
  );
}

function SidebarRow({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  if (!value) return null;

  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-[#F0F0EC] last:border-b-0">
      <dt className="text-[12px] text-[#8B8B8B]">{label}</dt>
      <dd className="text-[12px] font-medium text-[#222222] text-right">{value}</dd>
    </div>
  );
}

function ExternalResourceLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-between gap-3 rounded-[8px] border border-[#E5E5E0] bg-[#FAFAF8] px-3 py-2.5 text-[13px] text-[#222222] transition-colors hover:border-[#D9D7D0] hover:bg-white"
    >
      <span className="flex items-center gap-2">
        <span className="text-[#8B8B8B]">{icon}</span>
        <span>{label}</span>
      </span>
      <ArrowUpRight size={14} className="text-[#8B8B8B]" />
    </a>
  );
}

function BenchmarksIcon() {
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#FFF6F3] text-[#FF5A1F]">
      <Layers3 size={16} />
    </span>
  );
}

export default function ModelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const cleanId = resolvedParams?.slug ? resolvedParams.slug.toLowerCase().trim() : "";

  const [model, setModel] = useState<ModelItem | ModelDetail | null>(() =>
    cleanId ? getCachedModelBySlug(cleanId) : null,
  );
  const [loading, setLoading] = useState<boolean>(() => !model);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLogoError(false);
    if (!cleanId) return;

    const cachedData = getCachedModelBySlug(cleanId);
    if (cachedData) {
      setModel(cachedData);
      setLoading(false);
    }

    getModelBySlug(cleanId)
      .then((data) => {
        if (data) {
          setModel(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load model:", err);
        setLoading(false);
      });
  }, [cleanId]);

  const benchmarkArray = useMemo(() => {
    if (!model?.benchmarkScore) return [];
    return Object.entries(model.benchmarkScore)
      .map(([name, value]) => ({
        name,
        value: Number(value) || 0,
        score: typeof value === "number" ? value.toFixed(1) : String(value),
        rank: null as number | null,
      }))
      .filter((item) => item.value > 0);
  }, [model]);

  const metaTags = useMemo(() => {
    if (!model) return [];
    return Array.from(
      new Set([
        model.accessType,
        model.opennessType,
        ...toStringArray(model.capabilities),
        ...toStringArray(model.researchAreas),
      ].filter((item): item is string => typeof item === "string" && item.trim().length > 0)),
    );
  }, [model]);

  const overviewRows = useMemo(() => {
    if (!model) return [];
    return [
      { label: "Model Family", value: model.modelFamily },
      { label: "Modality", value: model.modality },
      { label: "Category", value: model.category },
      { label: "Architecture", value: model.architecture },
      { label: "Parameters", value: model.parameterCount },
      { label: "Context Window", value: model.contextWindow },
      { label: "License", value: model.license },
    ].filter((row) => row.value);
  }, [model]);

  const externalLinks = useMemo(() => {
    const source = (model ?? {}) as Record<string, string | undefined | null>;
    return [
      {
        key: "repository",
        href: source.repositoryUrl,
        label: "GitHub Repository",
        icon: <Github size={14} />,
      },
      {
        key: "huggingface",
        href: source.huggingFaceUrl,
        label: "Hugging Face",
        icon: <Cpu size={14} />,
      },
      {
        key: "paper",
        href: source.paperUrl,
        label: "Primary Paper",
        icon: <FileText size={14} />,
      },
      {
        key: "api",
        href: source.apiUrl,
        label: "API Documentation",
        icon: <ExternalLink size={14} />,
      },
    ].filter((item) => item.href);
  }, [model]);

  if (loading && !model) {
    return <ModelDetailSkeleton />;
  }

  if (!model) {
    return (
      <div className="min-h-screen bg-[#F8F7F2] flex items-center justify-center p-6">
        <div className="bg-white border border-[#E5E5E0] rounded-[12px] p-10 max-w-md w-full text-center shadow-sm">
          <div className="w-16 h-16 bg-[#FFF6F3] text-[#FF5A1F] rounded-full flex items-center justify-center mx-auto mb-5 border border-[#FFEDD5]">
            <Sparkles size={32} />
          </div>
          <h1 className="text-2xl font-extrabold text-[#111111] mb-3 tracking-tight">
            Model Profile Not Found
          </h1>
          <p className="text-base text-[#555555] mb-8 leading-relaxed font-medium">
            We couldn&apos;t find an indexed AI foundation model matching{" "}
            <code className="bg-[#F8F7F2] border border-[#EAE9E4] px-2 py-1 rounded text-[#FF5A1F] text-[13px] font-bold mx-1">
              {resolvedParams.slug}
            </code>
            .
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
    <div className="min-h-screen bg-[#F8F7F2] pb-24">
      <Navbar />

      <div className="w-full max-w-[1370px] mx-auto px-5 md:px-10 lg:px-16 xl:px-24 pt-6 pb-12">
        <nav className="flex items-center gap-2 text-[13px] text-[#8B8B8B] mb-6">
          <Link href="/" className="hover:text-[#FF5A1F] transition-colors no-underline">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/models"
            className="hover:text-[#FF5A1F] transition-colors no-underline"
          >
            Models
          </Link>
          <span>/</span>
          <span className="text-[#555555] font-medium">{model.name}</span>
        </nav>

        <div className="space-y-8">
          <section className="rounded-[10px] border border-[#E5E5E0] bg-white p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-8 lg:gap-10 items-start">
              <div className="min-w-0">
                <div className="mb-4 text-[12px] uppercase tracking-[0.08em] text-[#8B8B8B]">
                  {model.vendor || "Model"}
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 shrink-0 rounded-[10px] border border-[#E5E5E0] bg-[#FAFAF8] flex items-center justify-center overflow-hidden">
                    {model.vendorLogoUrl && !logoError ? (
                      <img
                        src={model.vendorLogoUrl}
                        alt={model.vendor}
                        onError={() => setLogoError(true)}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <span className="text-[18px] font-semibold text-[#777777]">
                        {getInitials(model.name || model.vendor || "M")}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h1 className="text-[30px] md:text-[36px] leading-tight font-semibold tracking-[-0.03em] text-[#111111]">
                      {model.name}
                    </h1>
                    <div className="mt-1 text-[15px] text-[#666666]">
                      {model.vendor}
                    </div>
                  </div>
                </div>

                {model.description && (
                  <p className="max-w-3xl text-[15px] leading-7 text-[#4B5563] mb-5">
                    {model.description}
                  </p>
                )}

                {metaTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {metaTags.map((tag, index) => (
                      <Tag key={`${tag}-${index}`}>{tag}</Tag>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <Stat label="Papers" value={formatNumber(model.paperCount) ?? "0"} />
                  <Stat
                    label="Citations"
                    value={formatNumber(model.citationCount) ?? "0"}
                  />
                  <Stat
                    label="GitHub Stars"
                    value={formatNumber(model.githubStars) ?? "0"}
                  />
                  <Stat
                    label="Benchmarks"
                    value={benchmarkArray.length > 0 ? benchmarkArray.length : null}
                  />
                  <Stat label="Release Date" value={formatDate(model.releaseDate)} />
                </div>
              </div>

              <div className="min-w-0">
                <div className="space-y-4">
                  {externalLinks.length > 0 && (
                    <section className="rounded-[10px] border border-[#E5E5E0] bg-white p-5">
                      <h2 className="text-[14px] font-semibold text-[#111111] mb-4">
                        External Links
                      </h2>
                      <div className="space-y-2">
                        {externalLinks.map((link) => (
                          <ExternalResourceLink
                            key={link.key}
                            href={link.href as string}
                            label={link.label}
                            icon={link.icon}
                          />
                        ))}
                      </div>
                    </section>
                  )}

                  {overviewRows.length > 0 && (
                    <section className="rounded-[10px] border border-[#E5E5E0] bg-white p-5">
                      <h2 className="text-[14px] font-semibold text-[#111111] mb-2">
                        Model Overview
                      </h2>
                      <dl>
                        {overviewRows.map((row) => (
                          <SidebarRow key={row.label} label={row.label} value={row.value} />
                        ))}
                      </dl>
                    </section>
                  )}

                </div>
              </div>
            </div>
          </section>

          {benchmarkArray.length > 0 && (
            <section className="rounded-[10px] border border-[#E5E5E0] bg-white p-6">
              <div className="flex items-center gap-2 mb-5">
                <BenchmarksIcon />
                <h2 className="text-[18px] font-semibold tracking-tight text-[#111111]">
                  Benchmarks
                </h2>
              </div>

              <div className="overflow-hidden rounded-[8px] border border-[#E5E5E0]">
                <table className="min-w-full border-collapse">
                  <thead className="bg-[#FAFAF8]">
                    <tr className="text-left text-[12px] uppercase tracking-[0.08em] text-[#8B8B8B]">
                      <th className="px-4 py-3 font-medium">Benchmark</th>
                      <th className="px-4 py-3 font-medium">Score</th>
                      <th className="px-4 py-3 font-medium">Rank</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0F0EC] bg-white">
                    {benchmarkArray.map((benchmark) => (
                      <tr key={benchmark.name} className="text-[14px] text-[#222222]">
                        <td className="px-4 py-3 font-medium">{benchmark.name}</td>
                        <td className="px-4 py-3">{benchmark.score}</td>
                        <td className="px-4 py-3 text-[#8B8B8B]">—</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          <section className="rounded-[10px] border border-[#E5E5E0] bg-white p-6 md:p-7 w-full">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen size={18} className="text-[#FF5A1F]" />
              <div>
                <h2 className="text-[18px] font-semibold tracking-tight text-[#111111]">
                  Papers
                </h2>
                <p className="text-[13px] text-[#666666]">
                  Research papers citing, evaluating, or comparing {model.name}.
                </p>
              </div>
            </div>

            {model.paperCount === 0 ? (
              <div className="rounded-[8px] border border-dashed border-[#E5E5E0] bg-[#FAFAF8] p-10 text-center">
                <h3 className="text-[18px] font-semibold text-[#111111] mb-2">
                  No indexed papers yet
                </h3>
                <p className="text-[14px] text-[#666666]">
                  There are currently no research papers associated with{" "}
                  <strong>{model.name}</strong>.
                </p>
              </div>
            ) : (
              <PaperList
                filterParams={{
                  model: resolvedParams.slug.toLowerCase().trim(),
                  sort: "citations",
                }}
              />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
