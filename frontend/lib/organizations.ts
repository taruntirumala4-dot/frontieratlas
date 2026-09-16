import { getModelFacets, getModels, type ModelFacets, type ModelItem } from "@/lib/models";
import { getPapers } from "@/lib/paperApi";

export type OrganizationDirectoryData = {
  models: ModelItem[];
  facets: ModelFacets;
  paperCounts: Record<string, number>;
};

export type OrganizationCatalogData = Pick<OrganizationDirectoryData, "models" | "facets">;

let catalogPromise: Promise<OrganizationCatalogData> | null = null;
let directoryPromise: Promise<OrganizationDirectoryData> | null = null;
let facetsPromise: Promise<ModelFacets> | null = null;

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

/** The small, fast data set needed to render every organization card. */
export function getOrganizationCatalog(): Promise<OrganizationCatalogData> {
  if (!catalogPromise) {
    catalogPromise = Promise.all([getModels(), getOrganizationFacets()])
      .then(([models, facets]) => ({ models, facets }))
      .catch((error) => {
        catalogPromise = null;
        throw error;
      });
  }

  return catalogPromise;
}

/** The compact endpoint that supplies all 60 organization names immediately. */
export function getOrganizationFacets(): Promise<ModelFacets> {
  if (!facetsPromise) {
    facetsPromise = getModelFacets().catch((error) => {
      facetsPromise = null;
      throw error;
    });
  }

  return facetsPromise;
}

/**
 * Warms counts and paper lists after the catalog is available. The paper
 * requests also warm paperApi's cache for organization profile pages.
 */
export function getOrganizationDirectory(): Promise<OrganizationDirectoryData> {
  if (!directoryPromise) {
    directoryPromise = (async () => {
      const [facets, models] = await Promise.all([
        getOrganizationFacets().catch(() => ({ totalModels: 0, vendors: [], modalities: [], accessTypes: [], opennessTypes: [], modelFamilies: [], capabilities: [], researchAreas: [] })),
        getModels().catch(() => []),
      ]);

      // Derive paper counts directly from models for instant, zero-latency rendering
      const initialCounts: Record<string, number> = {};
      models.forEach((m) => {
        if (m.vendor) {
          initialCounts[m.vendor] = (initialCounts[m.vendor] || 0) + (m.paperCount || 1);
        }
      });
      facets.vendors.forEach((v) => {
        if (!initialCounts[v.name]) {
          initialCounts[v.name] = v.count;
        }
      });

      return {
        models,
        facets,
        paperCounts: initialCounts,
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
  void getOrganizationFacets().catch(() => {});
  void getOrganizationCatalog().catch(() => {});
  void getOrganizationDirectory().catch(() => {});
}
