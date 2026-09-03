"use client";

import { useMemo, useState } from "react";
import { BlogCard } from "./BlogCard";
import type { PostCard, SanityCategory } from "@/lib/sanity/types";

const PAGE_SIZE = 6;

type BlogGridProps = {
  posts: PostCard[];
  categories: SanityCategory[];
};

export const BlogGrid = ({ posts, categories }: BlogGridProps) => {
  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory =
        category === "all" || post.category?.slug === category;
      const matchesSearch =
        term.length === 0 ||
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [posts, category, search]);

  const [featured, ...rest] = filtered;
  const shown = rest.slice(0, visible);

  const filters = [{ slug: "all", name: "All" }, ...categories];

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-border pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-6" role="tablist">
          {filters.map((item) => {
            const active = category === item.slug;
            return (
              <button
                key={item.slug}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setCategory(item.slug);
                  setVisible(PAGE_SIZE);
                }}
                className={`border-b-2 pb-1 text-sm transition-colors ${
                  active
                    ? "border-accent font-medium text-text"
                    : "border-transparent text-text-muted hover:text-text"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        <div className="lg:w-[280px]">
          <label htmlFor="blog-search" className="sr-only">
            Search posts
          </label>
          <input
            id="blog-search"
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setVisible(PAGE_SIZE);
            }}
            placeholder="Search posts"
            className="w-full border border-border bg-bg px-4 py-3 text-sm text-text placeholder:text-text-muted"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-text-muted">
          No posts match that yet. Try another category or search term.
        </p>
      ) : (
        <>
          {featured ? (
            <div className="mt-12">
              <BlogCard post={featured} featured />
            </div>
          ) : null}

          {shown.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              {shown.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          ) : null}

          {rest.length > visible ? (
            <button
              type="button"
              onClick={() => setVisible((count) => count + PAGE_SIZE)}
              className="mt-12 border border-border px-8 py-4 text-sm font-medium transition-colors hover:border-text hover:bg-text hover:text-text-light"
            >
              Load more
            </button>
          ) : null}
        </>
      )}
    </div>
  );
};
