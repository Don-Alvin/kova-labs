import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/client";
import type { ProjectCard as ProjectCardType } from "@/lib/sanity/types";
import { ArrowRight } from "lucide-react";

type ProjectCardProps = {
  project: ProjectCardType;
  featured?: boolean;
};

export const ProjectCard = ({
  project,
  featured = false,
}: ProjectCardProps) => (
  <Link
    href={`/work/${project.slug}`}
    className="group flex flex-col border border-border bg-bg transition-all duration-300 hover:scale-[1.02] hover:border-accent hover:shadow-[var(--shadow-lift)]"
  >
    <div
      className={`relative w-full overflow-hidden bg-bg-warm ${
        featured ? "h-[280px] lg:h-[520px]" : "h-[220px] lg:h-[340px]"
      }`}
    >
      {project.coverImage ? (
        <Image
          src={urlFor(project.coverImage).width(1600).url()}
          alt={project.coverImage.alt ?? project.title}
          fill
          sizes={featured ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : null}
    </div>

    <div className="flex items-center justify-between gap-4 p-6 md:p-8">
      <div>
        <p className={`font-semibold ${featured ? "text-2xl" : "text-lg"}`}>
          {project.title}
        </p>
        <p className="mt-1 text-xs font-light tracking-wide text-text-muted">
          {project.category}
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
);
