"use client";

import { useState, useEffect, useRef } from "react";
import type { MethodDetail } from "@/lib/methods";

const METHOD_CACHE = new Map<string, { data: MethodDetail; timestamp: number }>();
const METHOD_CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const IN_FLIGHT = new Map<string, Promise<MethodDetail>>();

/**
 * Client-side method fetcher with aggressive in-memory + localStorage caching.
 * Called from HomeContent to warm the cache, and from MethodDetailClient to display data.
 */
export async function fetchMethodCached(slug: string): Promise<MethodDetail> {
  const cacheKey = `method:${slug}`;

  // 1. In-memory cache (instant, zero-cost)
  const mem = METHOD_CACHE.get(cacheKey);
  if (mem && Date.now() - mem.timestamp < METHOD_CACHE_TTL) {
    return mem.data;
  }

  // 2. localStorage cache (fast, persists across navigations)
  try {
    const raw = localStorage.getItem(cacheKey);
    if (raw) {
      const parsed = JSON.parse(raw) as { data: MethodDetail; timestamp: number };
      if (parsed && Date.now() - parsed.timestamp < METHOD_CACHE_TTL) {
        METHOD_CACHE.set(cacheKey, parsed);
        return parsed.data;
      }
    }
  } catch {}

  // 3. Deduplicate in-flight requests
  if (IN_FLIGHT.has(cacheKey)) {
    return IN_FLIGHT.get(cacheKey)!;
  }

  // 4. Fetch from API
  const defaultApiUrl = "https://frontieratlas-backend.morningsignal-india.workers.dev";
  const API_BASE = (process.env.NEXT_PUBLIC_API_URL || defaultApiUrl).replace(/\/$/, "");

  const request = fetch(`${API_BASE}/api/v1/methods/${encodeURIComponent(slug)}`, {
    headers: { "Content-Type": "application/json" },
  })
    .then(async (res) => {
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const json = await res.json();
      const data = json.data as MethodDetail;

      // Write to both caches
      const entry = { data, timestamp: Date.now() };
      METHOD_CACHE.set(cacheKey, entry);
      try {
        localStorage.setItem(cacheKey, JSON.stringify(entry));
      } catch {}

      return data;
    })
    .finally(() => {
      IN_FLIGHT.delete(cacheKey);
    });

  IN_FLIGHT.set(cacheKey, request);
  return request;
}

/**
 * Prefetch method data for all sidebar method slugs.
 * Called from HomeContent on mount to warm the cache.
 */
export function prefetchMethods() {
  const slugs = [
    "transformer", "diffusion-models", "mixture-of-experts-moe",
    "policy-learning", "chain-of-thought", "rag", "mcp", "lora", "rlhf",
  ];
  slugs.forEach((slug) => {
    fetchMethodCached(slug).catch(() => {});
  });
}

/**
 * Hook to use cached method data client-side.
 */
export function useMethodDetail(slug: string) {
  const [data, setData] = useState<MethodDetail | null>(() => {
    // Try synchronous cache hit on first render
    const mem = METHOD_CACHE.get(`method:${slug}`);
    if (mem && Date.now() - mem.timestamp < METHOD_CACHE_TTL) return mem.data;
    return null;
  });
  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    
    // If we already have data from synchronous cache, skip
    const mem = METHOD_CACHE.get(`method:${slug}`);
    if (mem && Date.now() - mem.timestamp < METHOD_CACHE_TTL) {
      setData(mem.data);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchMethodCached(slug)
      .then((result) => {
        if (mountedRef.current) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mountedRef.current) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      mountedRef.current = false;
    };
  }, [slug]);

  return { data, loading, error };
}
