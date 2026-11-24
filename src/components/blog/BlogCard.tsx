import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/client";
import type { PostCard } from "@/lib/sanity/types";

export const formatDate = (value: string): string =>
  new Date(value).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const BlogCard = ({ post }: { post: PostCard }) => (
  <Link
    href={`/blog/${post.slug}`}
    className="group flex h-full min-w-0 flex-col border border-border bg-bg transition-all duration-300 hover:border-accent hover:shadow-[var(--shadow-lift)]"
  >
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg-warm">
      {post.coverImage ? (
        <Image
          src={urlFor(post.coverImage).width(800).url()}
          alt={post.coverImage.alt ?? post.title}
          fill
          loading="lazy"
          sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) 50vw, 400px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <Image
          src={`/blog/${post.slug}/opengraph-image`}
          alt={post.title}
          fill
          unoptimized
          loading="lazy"
          sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) 50vw, 400px"
          className="object-cover"
        />
      )}
    </div>
    <div className="flex flex-1 flex-col p-5">
      <p className="text-xs font-medium tracking-wide text-accent-text">
        {post.category?.name ?? "Studio notes"}
      </p>
      <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight">{post.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm font-light leading-relaxed text-text-muted">{post.excerpt}</p>
      <p className="mt-auto pt-5 text-xs text-text-muted">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        {post.readTime ? ` \u00b7 ${post.readTime} min read` : ""}
      </p>
    </div>
  </Link>
);
