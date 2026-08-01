"use client";

import { useState } from "react";
import TaskFilterBar from "./TaskFilterBar";
import PaperTabs from "@/components/PaperTabs";
import PaperList from "@/components/PaperFeed";
import type { GetPapersResult } from "@/lib/paperApi";

interface Props {
  slug: string;
  initialPapers?: GetPapersResult | null;
}

export default function TaskDetailClient({ slug, initialPapers }: Props) {
  const [sort, setSort] = useState<
    "popular" | "latest" | "citations"
  >("popular");

  return (
    <>
      <TaskFilterBar
        selectedSort={sort}
        onSortChange={setSort}
      />
      <PaperTabs />

      <PaperList
        filterParams={{
          task: slug,
          sort,
        }}
        initialPapers={sort === "popular" ? initialPapers : null}
      />
    </>
  );
}