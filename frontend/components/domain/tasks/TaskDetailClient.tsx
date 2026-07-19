"use client";

import { useState } from "react";
import TaskFilterBar from "./TaskFilterBar";
import PaperTabs from "@/components/PaperTabs";
import PaperList from "@/components/PaperFeed";
interface Props {
  slug: string;
}
export default function TaskDetailClient({ slug }: Props)
 {

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
/>
    </>
  );
}