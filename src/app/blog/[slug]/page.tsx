import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableBody } from "@/components/shared/PortableBody";
import { BlogCard, formatDate } from "@/components/blog/BlogCard";
import { NewsletterSignup } from "@/components/blog/NewsletterSignup";
import { sanityFetch, urlFor } from "@/lib/sanity/client";
import {
  POST_BY_SLUG_QUERY,
  POST_SLUGS_QUERY,
  RELATED_POSTS_QUERY,
} from "@/lib/sanity/queries";
import type { Post, PostCard as PostCardType } from "@/lib/sanity/types";
import { SITE_URL } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export const generateStaticParams = async () => {
  const slugs = await sanityFetch<string[]>(POST_SLUGS_QUERY, {}, []);
  return slugs.map((slug) => ({ slug }));
};

export const generateMetadata = async ({
  params,
}: Params): Promise<Metadata> => {
  const { slug } = await params;
  const post = await sanityFetch<Post | null>(
    POST_BY_SLUG_QUERY,
    { slug },
    null
  );

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.coverImage
        ? [urlFor(post.coverImage).width(1200).height(630).url()]
        : undefined,
    },
  };
};

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await sanityFetch<Post | null>(
    POST_BY_SLUG_QUERY,
    { slug },
    null
  );

  if (!post) notFound();

  const related = await sanityFetch<PostCardType[]>(
    RELATED_POSTS_QUERY,
    { slug, category: post.category?.slug ?? "" },
    []
  );

  const shareUrl = `${SITE_URL}/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title);

  return (
    <>
      {post.coverImage ? (
        <div className="relative h-[240px] w-full overflow-hidden border-b border-border bg-bg-warm lg:h-[440px]">
          <Image
            src={urlFor(post.coverImage).width(1920).url()}
            alt={post.coverImage.alt ?? post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <article className="border-b border-border">
        <div className="shell max-w-[720px] px-6 py-16 md:px-12 md:py-24">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-text-muted">
            {post.category ? (
              <Link
                href="/blog"
                className="font-light tracking-wide text-accent-text transition-colors hover:text-text"
              >
                {post.category.name}
              </Link>
            ) : null}
            <span aria-hidden="true">&middot;</span>
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            {post.readTime ? (
              <>
                <span aria-hidden="true">&middot;</span>
                <span>{post.readTime} min read</span>
              </>
            ) : null}
            {post.author ? (
              <>
                <span aria-hidden="true">&middot;</span>
                <span>{post.author.name}</span>
              </>
            ) : null}
          </div>

          <h1 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {post.title}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-text-muted">
            {post.excerpt}
          </p>

          <div className="mt-12">
            {post.body ? <PortableBody value={post.body} /> : null}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-border pt-8 text-sm">
            <span className="text-text-muted">Share this post</span>
            <a
              href={`https://x.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border px-4 py-2 transition-colors hover:border-accent hover:text-accent-text"
            >
              X
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border px-4 py-2 transition-colors hover:border-accent hover:text-accent-text"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </article>

      <NewsletterSignup />

      {related.length > 0 ? (
        <section className="border-t border-border">
          <div className="shell px-6 py-16 md:px-12 md:py-24">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Related posts
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <BlogCard key={item._id} post={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
