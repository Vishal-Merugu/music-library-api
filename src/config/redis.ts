import IORedis, { Redis, RedisOptions } from "ioredis";
import ENV from "./env";

let redisClient: Redis | null = null;

export const createRedisClient = async (): Promise<Redis> => {
  if (redisClient) return redisClient;

  const config: RedisOptions = {
    retryStrategy: (times) => Math.min(times * 50, 2000),
    maxRetriesPerRequest: 3,
  };

  redisClient = new IORedis(ENV.REDIS_HOST, config);

  await new Promise<void>((resolve, reject) => {
    redisClient!.on("connect", () => {
      console.log("\x1b[32m%s\x1b[0m", "Redis Connected");
      resolve();
    });

    redisClient!.on("error", (err) => {
      console.error("Redis Error:", err);
      reject(err);
    });
  });

  return redisClient;
};

export const redisUtils = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await redisClient?.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Redis Get Error:", error);
      return null;
    }
  },

  async set(key: string, value: any, ttlSeconds?: number): Promise<boolean> {
    try {
      const stringValue = JSON.stringify(value);
      if (ttlSeconds) {
        await redisClient?.setex(key, ttlSeconds, stringValue);
      } else {
        await redisClient?.set(key, stringValue);
      }
      return true;
    } catch (error) {
      console.error("Redis Set Error:", error);
      return false;
    }
  },

  async del(key: string | string[]): Promise<boolean> {
    try {
      await redisClient?.del(Array.isArray(key) ? key : [key]);
      return true;
    } catch (error) {
      console.error("Redis Delete Error:", error);
      return false;
    }
  },

  async mget<T>(keys: string[]): Promise<(T | null)[]> {
    try {
      const values = await redisClient?.mget(keys);
      return values?.map((value) => (value ? JSON.parse(value) : null)) || [];
    } catch (error) {
      console.error("Redis MGet Error:", error);
      return keys.map(() => null);
    }
  },

  getClient(): Redis | null {
    return redisClient;
  },
};

export default redisClient;
