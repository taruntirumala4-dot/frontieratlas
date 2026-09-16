import { Redis } from "@upstash/redis";

const dummyPipeline = {
  get: () => dummyPipeline,
  set: () => dummyPipeline,
  del: () => dummyPipeline,
  exec: async () => [],
};

const dummyClient = {
  get: async () => null,
  set: async () => "OK",
  del: async () => 0,
  incr: async () => 1,
  keys: async () => [],
  mget: async () => [],
  pipeline: () => dummyPipeline,
} as unknown as Redis;

class RedisManager {
  private client: Redis | null = null;

  connect(url?: string, token?: string) {
    if (!url || !token || typeof url !== "string" || typeof token !== "string" || !url.startsWith("http")) {
      return;
    }

    if (!this.client) {
      try {
        this.client = new Redis({
          url,
          token,
        });

        console.log("✅ Redis Connected");
      } catch (err) {
        console.warn("⚠️ Redis initialization skipped:", err);
      }
    }
  }

  getClient(): Redis {
    if (!this.client) {
      return dummyClient;
    }

    return this.client;
  }
}

export const redisManager = new RedisManager();
