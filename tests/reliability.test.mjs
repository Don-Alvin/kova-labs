import assert from "node:assert/strict";
import { test } from "node:test";
import { loadTs } from "./load-ts.mjs";

test("local limit blocks excess requests, preserves active counters at capacity, and reclaims expired keys", () => {
  const { createMemoryLimiter } = loadTs("src/lib/rateLimit.ts");
  let now = 0;
  const limit = createMemoryLimiter({ maxEntries: 2, now: () => now });
  const options = { limit: 2, windowMs: 1000 };
  assert.equal(limit("a", options).ok, true);
  assert.equal(limit("a", options).remaining, 0);
  assert.equal(limit("a", options).ok, false);
  assert.equal(limit("b", options).ok, true);
  assert.equal(limit("c", options).ok, false);
  assert.equal(limit("a", options).ok, false);
  now = 1000;
  assert.equal(limit("c", options).ok, true);
  assert.equal(limit("a", options).remaining, 1);
});

test("shared limiter uses Redis decisions and hashes identifiers", async () => {
  let command;
  const { rateLimit } = loadTs("src/lib/rateLimit.ts", {
    env: { UPSTASH_REDIS_REST_URL: "https://redis.example.test", UPSTASH_REDIS_REST_TOKEN: "test-only" },
    fetch: async (_url, init) => {
      command = JSON.parse(init.body);
      return Response.json({ result: [0, 0, 2501] });
    },
  });
  const result = await rateLimit("newsletter:192.0.2.1", { limit: 5, windowMs: 60_000 });
  assert.equal(result.ok, false);
  assert.equal(result.retryAfter, 3);
  assert.equal(command[0], "EVAL");
  assert.match(command[3], /^kovalab:rate:[a-f0-9]{64}$/);
  assert.equal(JSON.stringify(command).includes("192.0.2.1"), false);
});

test("configured shared limiter never falls back to permissive local counters on failure", async () => {
  for (const response of [new Response("offline", { status: 503 }), Response.json({ result: "unexpected" })]) {
    const { rateLimit } = loadTs("src/lib/rateLimit.ts", {
      env: { UPSTASH_REDIS_REST_URL: "https://redis.example.test", UPSTASH_REDIS_REST_TOKEN: "test-only" },
      fetch: async () => response,
    });
    await assert.rejects(rateLimit("key", { limit: 5, windowMs: 60_000 }), /rate limiting/);
  }
});

test("client IP ignores user-supplied proxy headers unless the deployment trusts its proxy", () => {
  const request = new Request("https://example.test", { headers: { "x-forwarded-for": "192.0.2.1", "x-real-ip": "198.51.100.1" } });
  assert.equal(loadTs("src/lib/rateLimit.ts").getClientIp(request), "unknown");
  assert.equal(loadTs("src/lib/rateLimit.ts", { env: { VERCEL: "1" } }).getClientIp(request), "192.0.2.1");
});

const cms = (fetch, configured = true) => loadTs("src/lib/sanity/client.ts", {
  env: configured ? { NEXT_PUBLIC_SANITY_PROJECT_ID: "test-project" } : {},
  modules: {
    "next-sanity": { createClient: () => ({ fetch }) },
    "@sanity/image-url": { createImageUrlBuilder: () => ({ image: () => ({}) }) },
  },
});

test("CMS failure is not treated as missing content", async () => {
  await assert.rejects(cms(async () => { throw new Error("upstream failure"); }).sanityFetch("query", {}, null), /temporarily unavailable/);
  assert.equal(await cms(async () => null).sanityFetch("query", {}, null), null);
  const fallback = [];
  assert.equal(await cms(undefined, false).sanityFetch("query", {}, fallback), fallback);
});

test("sitemap uses CMS modification dates and omits invented static dates", async () => {
  const { default: sitemap } = loadTs("src/app/sitemap.ts", {
    modules: {
      "@/lib/site": { SITE_URL: "https://example.test" },
      "@/lib/services": { SERVICE_SLUGS: ["web-development"] },
      "@/lib/sanity/queries": { SITEMAP_CONTENT_QUERY: "query" },
      "@/lib/sanity/client": { sanityFetch: async () => [{ _type: "post", slug: "hello", _updatedAt: "2026-09-01T00:00:00Z" }] },
    },
  });
  const entries = await sitemap();
  const article = entries.find((item) => item.url.endsWith("/blog/hello"));
  assert.equal(article.lastModified.toISOString(), "2026-09-01T00:00:00.000Z");
  assert.equal(entries.filter((item) => item !== article).some((item) => "lastModified" in item), false);
});

function newsletter({ limit = async () => ({ ok: true }), fetch = async () => Response.json({}) } = {}) {
  return loadTs("src/app/api/newsletter/route.ts", {
    env: { MAILCHIMP_API_KEY: "test-only", MAILCHIMP_AUDIENCE_ID: "test-audience", MAILCHIMP_SERVER_PREFIX: "us1" },
    fetch,
    modules: {
      "next/server": { NextResponse: { json: (body, init) => Response.json(body, init) } },
      "@/lib/rateLimit": { getClientIp: () => "unknown", rateLimit: limit },
    },
  }).POST;
}
const request = (body) => new Request("https://example.test/api/newsletter", { method: "POST", body: JSON.stringify(body) });

test("newsletter rejects malformed email and silently discards honeypots without contacting Mailchimp", async () => {
  const post = newsletter({ fetch: () => { throw new Error("Must not contact Mailchimp"); } });
  assert.equal((await post(request({ email: "bad" }))).status, 400);
  assert.equal((await post(request({ email: "a".repeat(255) + "@example.test" }))).status, 400);
  assert.equal((await post(request({ email: "test@example.test", company: "bot" }))).status, 200);
});

test("newsletter handles throttling and limiter outages before contacting Mailchimp", async () => {
  let called = false;
  const fetch = async () => { called = true; return Response.json({}); };
  const denied = await newsletter({ limit: async () => ({ ok: false, retryAfter: 12 }), fetch })(request({ email: "test@example.test" }));
  assert.equal(denied.status, 429);
  assert.equal(denied.headers.get("Retry-After"), "12");
  const unavailable = await newsletter({ limit: async () => { throw new Error("offline"); }, fetch })(request({ email: "test@example.test" }));
  assert.equal(unavailable.status, 503);
  assert.equal(called, false);
});

test("newsletter normalizes email and requests double opt-in with a timeout", async () => {
  let sent;
  const post = newsletter({ fetch: async (_url, init) => { sent = init; return Response.json({}); } });
  assert.equal((await post(request({ email: " Person@Example.test " }))).status, 200);
  assert.deepEqual(JSON.parse(sent.body), { email_address: "person@example.test", status_if_new: "pending" });
  assert.ok(sent.signal instanceof AbortSignal);
});
