import type { Metadata } from "next";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { NewsletterSignup } from "@/components/blog/NewsletterSignup";
import { sanityFetch } from "@/lib/sanity/client";
import { ALL_CATEGORIES_QUERY, ALL_POSTS_QUERY } from "@/lib/sanity/queries";
import type { PostCard, SanityCategory } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical notes on websites, payments, and analytics for businesses across East Africa.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    sanityFetch<PostCard[]>(ALL_POSTS_QUERY, {}, []),
    sanityFetch<SanityCategory[]>(ALL_CATEGORIES_QUERY, {}, []),
  ]);

  return (
    <>
      <section className="border-b border-border">
        <div className="shell px-6 py-16 md:px-12 md:py-24">
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
            Notes from the studio
          </h1>
          <p className="mt-8 max-w-[58ch] font-light leading-relaxed text-text-muted">
            Practical writing on getting a business online: what to build, what
            it costs, and what actually moves the needle.
          </p>

          <div className="mt-12">
            {posts.length === 0 ? (
              <p className="text-text-muted">
                No posts yet. The first one is on its way.
              </p>
            ) : (
              <BlogGrid posts={posts} categories={categories} />
            )}
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </>
  );
}
