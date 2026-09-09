import { createClient, type SanityClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2024-10-01";

/**
 * createClient throws when projectId is empty, and it runs at module
 * evaluation, so an unset env var would crash the build before any caller
 * could guard against it. Keep it null instead and let readers fall back.
 */
export const sanityClient: SanityClient | null = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null;

/**
 * Only reachable once content exists, which requires a configured client, so
 * the throw is a guard against misuse rather than a runtime path.
 */
export const urlFor = (source: SanityImageSource) => {
  if (!builder) {
    throw new Error(
      "urlFor called without NEXT_PUBLIC_SANITY_PROJECT_ID configured."
    );
  }
  return builder.image(source);
};

/**
 * An unconfigured local setup may use the caller's empty state. A failed
 * request must throw so ISR retains the last successful page instead of
 * replacing it with empty content or a false 404.
 */
export const sanityFetch = async <T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T
): Promise<T> => {
  if (!sanityClient) return fallback;

  try {
    return await sanityClient.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
  } catch {
    console.error("Sanity content request failed", { projectId, dataset });
    throw new Error("Content is temporarily unavailable. Please try again.");
  }
};
