import { createHash } from "node:crypto";
import { isIP } from "node:net";

type Options = { limit: number; windowMs: number };
type Result = { ok: boolean; remaining: number; retryAfter: number };

/** Bounded local fallback. Expired keys are swept on traffic, without timers. */
export const createMemoryLimiter = ({ maxEntries = 10_000, now = Date.now } = {}) => {
  const hits = new Map<string, { count: number; resetAt: number }>();
  let nextSweep = 0;
  return (key: string, { limit, windowMs }: Options): Result => {
    const time = now();
    if (time >= nextSweep || hits.size >= maxEntries) {
      for (const [id, entry] of hits) if (entry.resetAt <= time) hits.delete(id);
      nextSweep = time + 60_000;
    }
    let entry = hits.get(key);
    if (!entry || entry.resetAt <= time) {
      // Do not evict active counters: that would let new keys reset old limits.
      if (!entry && hits.size >= maxEntries) {
        return { ok: false, remaining: 0, retryAfter: Math.max(1, Math.ceil(windowMs / 1000)) };
      }
      entry = { count: 0, resetAt: time + windowMs };
      hits.set(key, entry);
    }
    const retryAfter = Math.max(1, Math.ceil((entry.resetAt - time) / 1000));
    if (entry.count >= limit) return { ok: false, remaining: 0, retryAfter };
    entry.count++;
    return { ok: true, remaining: limit - entry.count, retryAfter };
  };
};

const localLimit = createMemoryLimiter();

// One atomic Redis operation shares the same window across server instances.
const SCRIPT = `
local count = tonumber(redis.call('GET', KEYS[1]) or '0')
local limit = tonumber(ARGV[1])
if count >= limit then return {0, 0, redis.call('PTTL', KEYS[1])} end
count = redis.call('INCR', KEYS[1])
if count == 1 then redis.call('PEXPIRE', KEYS[1], ARGV[2]) end
return {1, limit - count, redis.call('PTTL', KEYS[1])}
`;

export const rateLimit = async (key: string, options: Options): Promise<Result> => {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url && !token) return localLimit(key, options);
  if (!url || !token || new URL(url).protocol !== "https:") {
    throw new Error("Shared rate limiting is not configured correctly.");
  }
  const digest = createHash("sha256").update(key).digest("hex");
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(["EVAL", SCRIPT, "1", `kovalab:rate:${digest}`, String(options.limit), String(options.windowMs)]),
    cache: "no-store",
    signal: AbortSignal.timeout(3000),
  });
  if (!response.ok) throw new Error("Shared rate limiting is unavailable.");
  const data: { result?: unknown; error?: string } = await response.json();
  const result = data.result;
  if (data.error || !Array.isArray(result) || result.length !== 3 ||
      !result.every((value) => typeof value === "number" && Number.isFinite(value)) ||
      (result[0] !== 0 && result[0] !== 1) || result[1] < 0 || result[2] < 0) {
    throw new Error("Shared rate limiting returned an invalid response.");
  }
  return { ok: result[0] === 1, remaining: result[1], retryAfter: Math.max(1, Math.ceil(result[2] / 1000)) };
};

/** Only trust forwarded IPs when the deployment's proxy overwrites that header. */
export const getClientIp = (request: Request): string => {
  if (process.env.VERCEL !== "1" && process.env.TRUST_PROXY !== "true") return "unknown";
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return ip && isIP(ip) ? ip : "unknown";
};
