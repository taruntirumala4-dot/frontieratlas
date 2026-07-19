"use client";

import { TrendingUp, Clock3, Star } from "lucide-react";
interface Props {
  selectedSort: "popular" | "latest" | "citations";

onSortChange: (
  sort: "popular" | "latest" | "citations"
) => void;
}

export default function TaskFilterBar({
  selectedSort,
  onSortChange,
}: Props) {
  return (
    <div className="inline-flex items-center bg-white rounded-xl border border-gray-200 px-5 py-3 mb-5">

      
      {/* SORT */}
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
          Sort
        </span>

        <div className="flex rounded-lg bg-gray-100 p-0.5">

          <button
            onClick={() => onSortChange("popular")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full

            ${
              selectedSort === "popular"
                ? "bg-white shadow"
                : ""
            }`}
          >
            <TrendingUp size={13} />
            Popular
          </button>

          <button
            onClick={() => onSortChange("latest")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full

            ${
              selectedSort === "latest"
                ? "bg-white shadow"
                : ""
            }`}
          >
            <Clock3 size={15} />
            Recent
          </button>

          <button
            onClick={() => onSortChange("citations")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full

            ${
              selectedSort === "citations"
                ? "bg-white shadow"
                : ""
            }`}
          >
            <Star size={15} />
            Citations
          </button>

        </div>
      </div>

    </div>
  );
}