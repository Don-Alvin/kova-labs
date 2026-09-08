/**
 * A fixed-window limiter kept in memory, scoped per running server process.
 *
 * This is a real, working deterrent against a single bot script hammering
 * one warm serverless instance, and it costs nothing to run. It is not a
 * durable limit: a cold start clears it, and traffic spread across multiple
 * instances (normal on Vercel under any real load) is not tracked jointly,
 * so a distributed attacker can exceed the stated limit. A production-grade
 * limit needs a shared store (Upstash Redis, Vercel KV) that this project
 * does not yet have credentials for. Treat this as the first layer, not the
 * only one; it must not be the reason a real rate-limiting service never
 * gets added before launch.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export const rateLimit = (
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): { ok: boolean; remaining: number } => {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { ok: false, remaining: 0 };
  }

  entry.count += 1;
  return { ok: true, remaining: limit - entry.count };
};

/** Best-effort client IP from the headers a reverse proxy actually sets. */
export const getClientIp = (request: Request): string =>
  request.headers.get("x-real-ip") ??
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  "unknown";
