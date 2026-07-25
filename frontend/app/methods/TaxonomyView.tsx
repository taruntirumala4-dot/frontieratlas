"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { CategoryRow } from "@/components/CategoryRow";
import { MethodsHero } from "@/components/MethodsHero";
import { prefetchTaxonomyMethods } from "@/lib/methodCache";

export function TaxonomyView({ initialTaxonomy }: { initialTaxonomy: any[] }) {
  const [taxonomy] = useState(initialTaxonomy);
  const [search, setSearch] = useState("");

  useEffect(() => {
    prefetchTaxonomyMethods(initialTaxonomy);
  }, [initialTaxonomy]);

  const filteredTaxonomy = taxonomy
  .map((category: any) => ({
    ...category,
    methods: category.methods.filter((method: any) =>
      method.name.toLowerCase().includes(search.toLowerCase())
    ),
  }))
  .filter((category: any) => category.methods.length > 0);
  return (
  <>
    <MethodsHero taxonomy={taxonomy} />

    <main className="flex flex-col md:grid md:grid-cols-[220px_minmax(0,1fr)] gap-6 md:gap-8 mt-6 md:mt-10">
      <aside className="hidden md:block w-[220px] shrink-0 sticky top-24 h-fit border-r border-[#ececec] pr-6">
  <h3 className="text-[#F55036] font-bold uppercase text-lg mb-4">
  Methods
</h3>


<div className="space-y-3">
  {filteredTaxonomy.map((category: any) => (
    <a
  key={category.id}
  href={`#${category.id}`}
  className="block text-[15px] text-[#555] hover:text-[#F55036] transition-colors"
>
  {category.name}
</a>
  ))}
</div>
</aside>

      <div>
        {filteredTaxonomy.length > 0 ? (
  filteredTaxonomy.map((category: any) => (
            <CategoryRow
              key={category.id}
              category={category}
            />
          ))
        ) : (
          <div className="ds-card flex flex-col items-center justify-center py-24 px-4 text-center">
            <h3 className="text-[16px] font-bold text-[#111111]">
              No methods found
            </h3>
          </div>
        )}
      </div>
    </main>
  </>
);
}
