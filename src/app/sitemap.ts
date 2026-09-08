import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { SERVICE_SLUGS } from "@/lib/services";
import { sanityFetch } from "@/lib/sanity/client";
import { ALL_POSTS_QUERY, ALL_PROJECTS_QUERY } from "@/lib/sanity/queries";
import type { PostCard, ProjectCard } from "@/lib/sanity/types";

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
  const now = new Date();

  const [posts, projects] = await Promise.all([
    sanityFetch<PostCard[]>(ALL_POSTS_QUERY, {}, []),
    sanityFetch<ProjectCard[]>(ALL_PROJECTS_QUERY, {}, []),
  ]);

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified: now,
      priority: route.priority,
    })),
    ...SERVICE_SLUGS.map((slug) => ({
      url: `${SITE_URL}/services/${slug}`,
      lastModified: now,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      priority: 0.6,
    })),
    ...projects.map((project) => ({
      url: `${SITE_URL}/work/${project.slug}`,
      lastModified: new Date(project.publishedAt),
      priority: 0.7,
    })),
  ];
}
