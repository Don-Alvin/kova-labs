import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="ground-dark relative">
      <div className="shell relative z-10 flex min-h-[60vh] flex-col items-start justify-center px-6 py-16 md:px-12 md:py-24">
        <p
          aria-hidden="true"
          className="text-7xl font-extrabold leading-none tracking-tight text-accent opacity-20 sm:text-8xl"
        >
          404
        </p>
        <h1 className="mt-8 text-3xl font-bold leading-[1.05] tracking-[-0.04em] text-text-light sm:text-4xl">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-4 max-w-[42ch] font-light leading-relaxed text-text-light/70">
          The page you&apos;re looking for may have been moved or removed.
        </p>
        <Link
          href="/"
          className="mt-10 bg-accent px-8 py-4 text-sm font-medium text-dark transition-transform duration-300 hover:scale-105"
        >
          Back to homepage
        </Link>
      </div>
    </section>
  );
}
