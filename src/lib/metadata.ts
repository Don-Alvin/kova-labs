import type { Metadata } from "next";
import { SITE_URL } from "./site";

type PageMetadataInput = {
  /** Route path from the site root, e.g. "/about". "" for the homepage. */
  path: string;
  title: string;
  description: string;
  /** Absolute image URL. Omit to fall back to the site-wide opengraph-image. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
};

/**
 * Every page needs the same four things set consistently: a canonical URL,
 * an openGraph object with its own title/description/url (Next.js does not
 * deep-merge openGraph from the layout, so a page that skips this silently
 * inherits the homepage's), a twitter card, and an image. This is the one
 * place that logic lives, so no page can drift from it by omission.
 */
export const pageMetadata = ({
  path,
  title,
  description,
  image,
  type = "website",
  publishedTime,
}: PageMetadataInput): Metadata => {
  const url = `${SITE_URL}${path}`;
  // Setting our own openGraph object (needed for a per-page title/url) stops
  // Next.js's opengraph-image.tsx file convention from auto-filling images,
  // since that only applies when a route has no openGraph of its own at all.
  // Reference it directly so every page still gets a real image.
  const ogImage = image ?? `${SITE_URL}/opengraph-image`;

  return {
    title,
    description,
    alternates: { canonical: path || "/" },
    openGraph: {
      title,
      description,
      url,
      siteName: "KovaLab",
      locale: "en_KE",
      type,
      images: [ogImage],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
};
