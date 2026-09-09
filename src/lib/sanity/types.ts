import type { PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";

export type SanityCategory = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
};

export type PostCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: SanityImageSource & { alt?: string };
  publishedAt: string;
  _updatedAt: string;
  readTime?: number;
  category?: { name: string; slug: string };
  author?: { name: string; role?: string };
};

export type Post = PostCard & {
  tags?: string[];
  body?: PortableTextBlock[];
};

export type ProjectCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: SanityImageSource & { alt?: string };
  category: string;
  client: string;
  tags?: string[];
  publishedAt: string;
};

export type Project = ProjectCard & {
  challenge?: PortableTextBlock[];
  solution?: PortableTextBlock[];
  results?: PortableTextBlock[];
  testimonial?: { quote?: string; author?: string; role?: string };
  screenshots?: (SanityImageSource & { alt?: string })[];
};
