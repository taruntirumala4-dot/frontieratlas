import { getModelFacets, getModels, type ModelFacets, type ModelItem } from "@/lib/models";
import { getPapers } from "@/lib/paperApi";

export type OrganizationDirectoryData = {
  models: ModelItem[];
  facets: ModelFacets;
  paperCounts: Record<string, number>;
};

let directoryPromise: Promise<OrganizationDirectoryData> | null = null;

async function mapWithConcurrency<T, R>(
  values: T[],
  concurrency: number,
  worker: (value: T) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(values.length);
  let nextIndex = 0;

  await Promise.all(Array.from({ length: Math.min(concurrency, values.length) }, async () => {
    while (nextIndex < values.length) {
      const index = nextIndex++;
      results[index] = await worker(values[index]);
    }
  }));

  return results;
}

/**
 * Loads the complete organization directory once. The paper requests also warm
 * paperApi's cache, so opening an organization profile reuses its paper list.
 */
export function getOrganizationDirectory(): Promise<OrganizationDirectoryData> {
  if (!directoryPromise) {
    directoryPromise = (async () => {
      const [models, facets] = await Promise.all([getModels(), getModelFacets()]);
      const organizationNames = facets.vendors.map((vendor) => vendor.name);
      const counts = await mapWithConcurrency(organizationNames, 10, async (organization) => {
        const result = await getPapers({ organization, limit: 50, sort: "latest" });
        return [organization, result.total] as const;
      });

      return {
        models,
        facets,
        paperCounts: Object.fromEntries(counts),
      };
    })().catch((error) => {
      directoryPromise = null;
      throw error;
    });
  }

  return directoryPromise;
}

/** Start the directory request before the user navigates to Organizations. */
export function prefetchOrganizationDirectory(): void {
  void getOrganizationDirectory().catch(() => {});
}
