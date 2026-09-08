import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { NewsletterSignup } from "@/components/blog/NewsletterSignup";
import { sanityFetch } from "@/lib/sanity/client";
import { ALL_CATEGORIES_QUERY, ALL_POSTS_QUERY } from "@/lib/sanity/queries";
import type { PostCard, SanityCategory } from "@/lib/sanity/types";

export const metadata: Metadata = pageMetadata({
  path: "/blog",
  title: "Blog",
  description:
    "Practical notes on websites, payments, and analytics for businesses across East Africa.",
});

export const revalidate = 60;

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    sanityFetch<PostCard[]>(ALL_POSTS_QUERY, {}, []),
    sanityFetch<SanityCategory[]>(ALL_CATEGORIES_QUERY, {}, []),
  ]);

  return (
    <>
      {/* A dark intro band, then the grid itself stays on paper: this is a
          Read-mode page, and scanning a list of posts wants the flattest,
          most scannable ground available. */}
      <section className="ground-dark relative -mt-24">
        <div className="shell relative z-10 px-6 pb-16 pt-40 md:px-12 md:pb-24 md:pt-48">
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-text-light sm:text-5xl">
            Notes from the studio
          </h1>
          <p className="mt-8 max-w-[58ch] font-light leading-relaxed text-text-light/70">
            Practical writing on getting a business online: what to build, what
            it costs, and what actually moves the needle.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="shell px-6 py-16 md:px-12 md:py-24">
          {posts.length === 0 ? (
            <p className="text-text-muted">
              No posts yet. The first one is on its way.
            </p>
          ) : (
            <BlogGrid posts={posts} categories={categories} />
          )}
        </div>
      </section>

      <NewsletterSignup />
    </>
  );
}
