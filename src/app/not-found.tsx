import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <div className="shell flex min-h-[60vh] flex-col items-start justify-center px-6 py-16 md:px-12 md:py-24">
        <p
          aria-hidden="true"
          className="text-7xl font-extrabold leading-none tracking-tight text-accent opacity-20 sm:text-8xl"
        >
          404
        </p>
        <h1 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-4 max-w-[480px] leading-relaxed text-text-muted">
          The page you&apos;re looking for may have been moved or removed.
        </p>
        <Link
          href="/"
          className="mt-10 bg-accent px-8 py-4 text-sm font-medium text-dark transition-colors hover:bg-text"
        >
          Back to homepage
        </Link>
      </div>
    </section>
  );
}
