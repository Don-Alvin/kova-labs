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

type BlogCardProps = {
  post: PostCard;
  featured?: boolean;
};

export const BlogCard = ({ post, featured = false }: BlogCardProps) => (
  <Link
    href={`/blog/${post.slug}`}
    className="group flex flex-col border border-border bg-bg transition-all duration-300 hover:scale-[1.02] hover:border-accent hover:shadow-[var(--shadow-lift)]"
  >
    <div
      className={`relative w-full overflow-hidden bg-bg-warm ${
        featured ? "h-[240px] lg:h-[420px]" : "h-[200px] lg:h-[260px]"
      }`}
    >
      {post.coverImage ? (
        <Image
          src={urlFor(post.coverImage).width(1600).url()}
          alt={post.coverImage.alt ?? post.title}
          fill
          sizes={featured ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : null}
    </div>

    <div className="flex flex-1 flex-col p-6 md:p-8">
      {post.category ? (
        <p className="text-xs font-light tracking-wide text-accent-text">
          {post.category.name}
        </p>
      ) : null}

      <h3
        className={`mt-4 font-semibold ${
          featured ? "text-2xl lg:text-3xl" : "text-xl"
        }`}
      >
        {post.title}
      </h3>

      <p className="mt-3 max-w-[58ch] flex-1 text-sm font-light leading-relaxed text-text-muted">
        {post.excerpt}
      </p>

      <p className="mt-6 text-xs text-text-muted">
        {formatDate(post.publishedAt)}
        {post.readTime ? ` · ${post.readTime} min read` : ""}
      </p>
    </div>
  </Link>
);
