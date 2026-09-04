import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableBody } from "@/components/shared/PortableBody";
import { CtaBanner } from "@/components/home/CtaBanner";
import { sanityFetch, urlFor } from "@/lib/sanity/client";
import {
  NEXT_PROJECT_QUERY,
  PROJECT_BY_SLUG_QUERY,
  PROJECT_SLUGS_QUERY,
} from "@/lib/sanity/queries";
import type { Project } from "@/lib/sanity/types";
import { ArrowRight } from "lucide-react";

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export const generateStaticParams = async () => {
  const slugs = await sanityFetch<string[]>(PROJECT_SLUGS_QUERY, {}, []);
  return slugs.map((slug) => ({ slug }));
};

export const generateMetadata = async ({
  params,
}: Params): Promise<Metadata> => {
  const { slug } = await params;
  const project = await sanityFetch<Project | null>(
    PROJECT_BY_SLUG_QUERY,
    { slug },
    null
  );

  if (!project) return {};

  return {
    title: project.title,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
      images: project.coverImage
        ? [urlFor(project.coverImage).width(1200).height(630).url()]
        : undefined,
    },
  };
};

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = await sanityFetch<Project | null>(
    PROJECT_BY_SLUG_QUERY,
    { slug },
    null
  );

  if (!project) notFound();

  const next = await sanityFetch<{ title: string; slug: string } | null>(
    NEXT_PROJECT_QUERY,
    { slug },
    null
  );

  return (
    <>
      {project.coverImage ? (
        <div className="relative h-[280px] w-full overflow-hidden border-b border-border bg-bg-warm lg:h-[520px]">
          <Image
            src={urlFor(project.coverImage).width(1920).url()}
            alt={project.coverImage.alt ?? project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <section className="border-b border-border">
        <div className="shell px-6 py-16 md:px-12 md:py-24">
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-8 max-w-[58ch] font-light leading-relaxed text-text-muted">
            {project.excerpt}
          </p>

          {project.tags && project.tags.length > 0 ? (
            <ul className="mt-8 flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-border px-4 py-2 text-xs font-light tracking-wide text-text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      <section className="border-b border-border">
        <div className="shell grid max-w-[900px] grid-cols-1 gap-12 px-6 py-16 md:px-12 md:py-24">
          {project.challenge ? (
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                The challenge
              </h2>
              <div className="mt-6">
                <PortableBody value={project.challenge} />
              </div>
            </div>
          ) : null}

          {project.solution ? (
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                The solution
              </h2>
              <div className="mt-6">
                <PortableBody value={project.solution} />
              </div>
            </div>
          ) : null}

          {project.results ? (
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Results</h2>
              <div className="mt-6">
                <PortableBody value={project.results} />
              </div>
            </div>
          ) : null}

          {project.testimonial?.quote ? (
            <blockquote className="border-l border-accent bg-bg-warm p-8">
              <p className="text-lg leading-relaxed">
                {project.testimonial.quote}
              </p>
              <footer className="mt-6 text-sm text-text-muted">
                {project.testimonial.author}
                {project.testimonial.role
                  ? `, ${project.testimonial.role}`
                  : ""}
              </footer>
            </blockquote>
          ) : null}
        </div>
      </section>

      {project.screenshots && project.screenshots.length > 0 ? (
        <section className="border-b border-border bg-bg-warm">
          <div className="shell px-6 py-16 md:px-12 md:py-24">
            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
              {project.screenshots.map((shot, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] w-full border border-border bg-bg"
                >
                  <Image
                    src={urlFor(shot).width(1200).url()}
                    alt={shot.alt ?? `${project.title} screenshot ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {next ? (
        <section className="border-b border-border">
          <Link
            href={`/work/${next.slug}`}
            className="group block transition-colors hover:bg-bg-warm"
          >
            <div className="shell flex items-center justify-between gap-6 px-6 py-12 md:px-12">
              <div>
                <p className="text-xs font-light tracking-wide text-text-muted">
                  Next project
                </p>
                <p className="mt-3 text-2xl font-bold tracking-tight">
                  {next.title}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center border border-border transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-dark"
              >
                <ArrowRight size={18} strokeWidth={1.5} />
              </span>
            </div>
          </Link>
        </section>
      ) : null}

      <CtaBanner />
    </>
  );
}
