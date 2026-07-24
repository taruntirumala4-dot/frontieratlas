import { fetchApi } from './api';
import { MOCK_BENCHMARKS, getMockBenchmarkDetail } from './mockBenchmarks';

let benchmarksCache: Promise<BenchmarkItem[]> | null = null;

export interface BenchmarkItem {
  id: string;
  name: string;
  slug: string;
  _count?: {
    rankings: number;
    claims: number;
  };
}

export interface BenchmarkDetailRanking {
  id: string;
  rank: number;
  previous_rank: number | null;
  paper: {
    id: string;
    title: string;
    slug: string;
    githubStars: number;
    citationCount: number;
    publicationDate: string | null;
  };
}

export interface BenchmarkDetailClaim {
  id: string;
  paper: {
    id: string;
    title: string;
    slug: string;
    githubStars: number;
    citationCount: number;
    publicationDate: string | null;
  };
}

export interface BenchmarkDetail {
  id: string;
  name: string;
  slug: string;
  rankings: BenchmarkDetailRanking[];
  claims: BenchmarkDetailClaim[];
}

export interface GetBenchmarksResponse {
  status: string;
  count: number;
  data: BenchmarkItem[];
}

export interface GetBenchmarkBySlugResponse {
  status: string;
  data: BenchmarkDetail;
}

export async function getBenchmarks(): Promise<BenchmarkItem[]> {
  // 1. If the data is already being fetched or is cached, return it immediately
  if (benchmarksCache) {
    return benchmarksCache;
  }

  // 2. Otherwise, fetch it and store the promise in the cache
  try {
    benchmarksCache = fetchApi<GetBenchmarksResponse>('/api/v1/benchmarks?limit=5000')
      .then(response => {
        return Array.isArray(response?.data) ? response.data : [];
      })
      .catch(error => {
        benchmarksCache = null; // Clear cache on error so it can retry later
        console.warn('[benchmarks] API unavailable:', error.message);
        return MOCK_BENCHMARKS;
      });

    return await benchmarksCache;
  } catch (error) {
    benchmarksCache = null;
    return MOCK_BENCHMARKS;
  }
}

export async function getBenchmarkBySlug(slug: string): Promise<BenchmarkDetail | null> {
  try {
    const response = await fetchApi<GetBenchmarkBySlugResponse>(`/api/v1/benchmarks/${encodeURIComponent(slug)}`);
    return response.data || null;
  } catch (error) {
    console.warn(`[benchmarks] API unavailable for slug "${slug}", using mock data:`, (error as Error).message);
    return getMockBenchmarkDetail(slug);
  }
}
