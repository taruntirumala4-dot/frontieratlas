import Navbar from "@/components/Navbar";
import { Sparkles, Compass, BookOpen, Layers, BarChart3, Users, Globe2, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About | FrontierAtlas",
  description: "Learn about FrontierAtlas, our mission to map the global AI research ecosystem, and our open methodology.",
};

export default function AboutPage() {
  const pillars = [
    {
      icon: BookOpen,
      title: "Comprehensive Research Coverage",
      description: "Aggregating daily pre-prints from arXiv, Hugging Face, and top conferences with structured categorization and extracted code links.",
    },
    {
      icon: Layers,
      title: "Living Taxonomy of AI",
      description: "Classifying models, tasks, and methods across a rigorous hierarchy to help developers and researchers navigate cutting-edge breakthroughs.",
    },
    {
      icon: BarChart3,
      title: "Standardized Benchmarks",
      description: "Tracking SOTA benchmark leaderboards across reasoning, coding, vision, and multi-agent systems with transparent metrics.",
    },
    {
      icon: Users,
      title: "Community & Ecosystem",
      description: "Connecting researchers, engineers, and organizations shaping the future of autonomous systems and foundation intelligence.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#111111]">
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-5 md:px-10 lg:px-16 py-12 md:py-16">
        {/* Hero Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0EB] border border-[#F55036]/20 text-[#F55036] text-[12px] font-semibold mb-4">
            <Sparkles size={14} />
            <span>The Home of Everything AI</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] mb-6 text-[#111111]">
            Mapping the frontier of <span className="text-[#F55036]">artificial intelligence.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#555555] leading-relaxed">
            FrontierAtlas is an open knowledge platform tracking research papers, models, benchmarks, and foundational methodologies shaping modern machine intelligence.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white rounded-xl border border-[#E5E5E0] p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-[#FFF0EB] flex items-center justify-center text-[#F55036] mb-5">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#111111] mb-2">{pillar.title}</h3>
                <p className="text-[#666666] leading-relaxed text-[15px]">{pillar.description}</p>
              </div>
            );
          })}
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-2xl border border-[#E5E5E0] p-8 md:p-12 mb-16 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <h2 className="text-2xl font-bold text-[#111111] mb-4">Our Mission</h2>
          <p className="text-[#555555] text-base md:text-lg leading-relaxed mb-6">
            With thousands of papers and hundreds of models published each week, distinguishing genuine advances from incremental noise has become the paramount challenge in AI engineering. FrontierAtlas organizes and connects discoveries so builders can ship faster and researchers can build on reproducible foundations.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#F55036] text-white font-semibold text-[14px] hover:bg-[#E0462D] transition-colors shadow-sm"
            >
              Explore Papers
            </Link>
            <Link
              href="/models"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#F8F7F2] border border-[#E5E5E0] text-[#111111] font-semibold text-[14px] hover:bg-[#EBEBE6] transition-colors"
            >
              Browse Models
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
