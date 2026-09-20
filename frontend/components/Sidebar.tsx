"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Flame,
  Clock,
  Star,
  MessageSquare,
  Bot,
  Brain,
  Image,
  Layers,
  Globe,
  Volume2,
  Cpu,
  FileText,
  Zap,
  Search,
  Plug,
  Link2,
  Target,
} from "lucide-react";

interface SidebarProps {
  onItemClick?: () => void;
  onItemSelect?: (item: string) => void;
  initialActive?: string;
}

export default function Sidebar({
  onItemClick,
  onItemSelect,
  initialActive = "Trending Papers",
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const discoverItems = [
    {
      label: "Trending Papers",
      icon: Flame,
      href: "/",
    },
    {
      label: "Latest Papers",
      icon: Clock,
      href: "/",
    },
    {
      label: "Most GitHub Stars",
      icon: Star,
      href: "/",
    },
  ];

  const taskItems = [
    { label: "Large Language Models", icon: MessageSquare, href: "/tasks/large-language-models" },
    { label: "Agents", icon: Bot, href: "/tasks/agents" },
    { label: "Reasoning", icon: Brain, href: "/tasks/reasoning-models" },
    { label: "Vision-Language Models", icon: Image, href: "/tasks/vision-language-models" },
    { label: "Multimodal Models", icon: Layers, href: "/tasks/multimodal-models" },
    { label: "World Models", icon: Globe, href: "/tasks/world-models" },
    { label: "Image Generation", icon: Image, href: "/tasks/image-generation" },
    { label: "Automatic Speech Recognition", icon: Volume2, href: "/tasks/automatic-speech-recognition" },
    { label: "Robotics", icon: Cpu, href: "/tasks/robotics" },
    { label: "All Tasks", icon: FileText, href: "/tasks" },
  ];

  const methodItems = [
    { label: "Transformers", icon: Zap, href: "/methods/transformer" },
    { label: "Diffusion Models", icon: Image, href: "/methods/diffusion-models" },
    { label: "Mixture of Experts", icon: Layers, href: "/methods/mixture-of-experts" },
    { label: "Reinforcement Learning", icon: Target, href: "/methods/policy-learning" },
    { label: "Chain-of-Thought", icon: Link2, href: "/methods/chain-of-thought" },
    { label: "RAG", icon: Search, href: "/methods/retrieval-augmented-generation" },
    { label: "Model Context Protocol", icon: Plug, href: "/methods/mcp" },
    { label: "LoRA", icon: Layers, href: "/methods/lora" },
    { label: "RLHF", icon: Target, href: "/methods/rlhf" },
    { label: "All Methods", icon: FileText, href: "/methods" },
  ];

  const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <div className="px-3 mb-0.5 mt-4 first:mt-0">
      <p className="text-[11px] font-bold italic text-[#8B8B8B] uppercase tracking-wider">
        {children}
      </p>
    </div>
  );

  return (
    <aside className="flex flex-col w-full bg-transparent h-full border-r border-[#E5E5E0] dark:border-[#27272A] select-none font-sans">
      <div className="flex-1 px-2 pt-1 pb-2 space-y-1 overflow-y-auto">
        {/* DISCOVER */}
        <div>
          <SectionLabel>Discover</SectionLabel>
          <div className="flex flex-col gap-0">
            {discoverItems.map((item) => {
              const isItemActive = initialActive === item.label;
              const Icon = item.icon;
              const isTrending = item.label === "Trending Papers";
              const isStars = item.label === "Most GitHub Stars";

              return (
                <div
                  key={item.label}
                  onClick={(e) => {
                    e.preventDefault();
                    onItemSelect?.(item.label);
                    onItemClick?.();
                    if (pathname !== "/") {
                      router.push("/");
                    }
                  }}
                  className={`flex items-center gap-2.5 px-3 py-1 mx-1 cursor-pointer transition-colors rounded-md text-[13px] font-medium leading-snug ${
                    isItemActive
                      ? "text-[#F55036] font-semibold"
                      : "text-[#555555] hover:text-[#111111] dark:text-[#A1A1AA] dark:hover:text-white"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center shrink-0 w-4 h-4 transition-colors ${
                      isItemActive ? "text-[#F55036]" : "text-[#8B8B8B]"
                    }`}
                  >
                    <Icon
                      width={16}
                      height={16}
                      className={
                        isItemActive
                          ? isTrending || isStars
                            ? "text-[#F55036] fill-[#F55036]"
                            : "text-[#F55036]"
                          : undefined
                      }
                    />
                  </span>
                  <span className="whitespace-normal leading-tight">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* TASKS */}
        <div>
          <SectionLabel>Tasks</SectionLabel>
          <div className="flex flex-col gap-0">
            {taskItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block no-underline"
                  onClick={() => {
                    onItemSelect?.(item.label);
                    onItemClick?.();
                  }}
                >
                  <div
                    className={`flex items-center gap-2.5 px-3 py-1 mx-1 cursor-pointer transition-colors rounded-md text-[13px] font-medium leading-snug ${
                      active
                        ? "text-[#F55036] font-semibold"
                        : "text-[#555555] hover:text-[#111111] dark:text-[#A1A1AA] dark:hover:text-white"
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center shrink-0 w-4 h-4 transition-colors ${
                        active ? "text-[#F55036]" : "text-[#8B8B8B]"
                      }`}
                    >
                      <Icon width={16} height={16} />
                    </span>
                    <span className="whitespace-normal leading-tight">
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* METHODS */}
        <div>
          <SectionLabel>Methods</SectionLabel>
          <div className="flex flex-col gap-0">
            {methodItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block no-underline"
                  onClick={() => {
                    onItemSelect?.(item.label);
                    onItemClick?.();
                  }}
                >
                  <div
                    className={`flex items-center gap-2.5 px-3 py-1 mx-1 cursor-pointer transition-colors rounded-md text-[13px] font-medium leading-snug ${
                      active
                        ? "text-[#F55036] font-semibold"
                        : "text-[#555555] hover:text-[#111111] dark:text-[#A1A1AA] dark:hover:text-white"
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center shrink-0 w-4 h-4 transition-colors ${
                        active ? "text-[#F55036]" : "text-[#8B8B8B]"
                      }`}
                    >
                      <Icon width={16} height={16} />
                    </span>
                    <span className="whitespace-normal leading-tight">
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
