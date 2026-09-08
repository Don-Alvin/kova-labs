import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * AI crawlers get their own explicit blocks rather than relying on the
 * wildcard rule to cover them. The studio wants AI visibility and citations,
 * so each is a deliberate Allow, not an accident of a permissive default.
 */
const AI_CRAWLERS = ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/api/"],
      },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
