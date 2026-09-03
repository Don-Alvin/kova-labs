import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2024-10-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: SanityImageSource) => builder.image(source);

/**
 * Wraps a query so an unreachable or empty dataset renders an empty state
 * instead of failing the page. The studio starts with no content, and the
 * site has to survive that.
 */
export const sanityFetch = async <T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T
): Promise<T> => {
  if (!projectId) return fallback;

  try {
    return await sanityClient.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
  } catch {
    return fallback;
  }
};
