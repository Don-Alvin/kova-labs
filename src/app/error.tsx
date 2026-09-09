"use client";

import Link from "next/link";

export default function ErrorPage({ retry }: { retry: () => void }) {
  return (
    <section className="ground-dark relative -mt-24 border-b border-border-dark text-text-light">
      <div className="shell relative z-10 px-6 pb-20 pt-40 md:px-12">
        <h1 className="text-3xl font-bold tracking-tight">We couldn’t load this page</h1>
        <p className="mt-4 max-w-[50ch] leading-relaxed text-text-light/70">
          There’s a temporary problem loading the content. Please try again in a moment.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <button type="button" onClick={retry} className="bg-accent px-6 py-3 text-sm font-medium text-dark">Try again</button>
          <Link href="/" className="border border-border-dark px-6 py-3 text-sm font-medium">Back to homepage</Link>
        </div>
      </div>
    </section>
  );
}
