import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import { sanityFetch } from "@/lib/sanity/client";
import { LATEST_POSTS_QUERY } from "@/lib/sanity/queries";
import type { PostCard } from "@/lib/sanity/types";

export async function Explore() {
  const posts = await sanityFetch<PostCard[]>(LATEST_POSTS_QUERY, {}, []);

  return (
    <section id="blog" aria-labelledby="blog-heading" className="scroll-mt-24 border-b border-border bg-bg-warm">
      <div className="shell px-6 py-16 md:px-12 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-accent-text">From the blog</p>
            <h2 id="blog-heading" className="mt-4 max-w-[22ch] text-3xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-4xl">Better decisions for your business online</h2>
            <p className="mt-4 max-w-[56ch] font-light leading-relaxed text-text-muted">What should a website cost? When do you need online payments? How do you know what&apos;s working? Read our studio notes on planning, building, and improving a business website in Kenya.</p>
          </div>
          <Link href="/blog" className="inline-flex shrink-0 items-center gap-2 text-sm font-medium underline underline-offset-4">Read the blog <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => <BlogCard key={post._id} post={post} />)}
          {posts.length === 0 && (
            <Link href="/blog" className="flex min-h-[240px] flex-col justify-between border border-border bg-bg p-8 transition-colors hover:border-accent md:col-span-2 lg:col-span-3">
              <p className="text-xs font-medium tracking-wide text-accent-text">Studio notes</p>
              <div>
                <h3 className="text-xl font-semibold">A little clarity before your next project</h3>
                <p className="mt-3 max-w-[64ch] text-sm font-light leading-relaxed text-text-muted">Our first articles are on their way. We&apos;ll break down website budgets, useful features, and the questions to ask before you build.</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">Visit the blog <ArrowRight size={16} aria-hidden="true" /></span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
