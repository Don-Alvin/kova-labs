import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { SERVICE_SLUGS } from "@/lib/services";
import { sanityFetch } from "@/lib/sanity/client";
import { SITEMAP_CONTENT_QUERY } from "@/lib/sanity/queries";

const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/contact", priority: 0.8 },
  { path: "/quote", priority: 0.8 },
  { path: "/blog", priority: 0.7 },
  { path: "/work", priority: 0.7 },
  { path: "/privacy", priority: 0.3 },
];

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await sanityFetch<{
    _type: "post" | "project"; slug: string; _updatedAt: string;
  }[]>(SITEMAP_CONTENT_QUERY, {}, []);

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      priority: route.priority,
    })),
    ...SERVICE_SLUGS.map((slug) => ({
      url: `${SITE_URL}/services/${slug}`,
      priority: 0.8,
    })),
    ...content.map((entry) => ({
      url: `${SITE_URL}/${entry._type === "post" ? "blog" : "work"}/${entry.slug}`,
      lastModified: new Date(entry._updatedAt),
      priority: entry._type === "post" ? 0.6 : 0.7,
    })),
  ];
}
