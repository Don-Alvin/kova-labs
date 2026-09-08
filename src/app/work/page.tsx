import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { ProjectCard } from "@/components/work/ProjectCard";
import { CtaBanner } from "@/components/home/CtaBanner";
import { sanityFetch } from "@/lib/sanity/client";
import { ALL_PROJECTS_QUERY } from "@/lib/sanity/queries";
import type { ProjectCard as ProjectCardType } from "@/lib/sanity/types";

export const metadata: Metadata = pageMetadata({
  path: "/work",
  title: "Work",
  description:
    "Websites, web applications, and analytics work for businesses across East Africa.",
});

export const revalidate = 60;

export default async function WorkPage() {
  const projects = await sanityFetch<ProjectCardType[]>(
    ALL_PROJECTS_QUERY,
    {},
    []
  );

  const [featured, ...rest] = projects;

  return (
    <>
      <section className="ground-dark relative -mt-24">
        <div className="shell relative z-10 px-6 pb-16 pt-40 md:px-12 md:pb-24 md:pt-48">
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-text-light sm:text-5xl">
            Real results for <em className="text-accent">real</em> businesses
          </h1>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="shell px-6 py-16 md:px-12 md:py-24">
          {projects.length === 0 ? (
            <p className="max-w-[58ch] font-light leading-relaxed text-text-muted">
              Case studies are being written up. In the meantime, get in touch
              and we will walk you through the work directly.
            </p>
          ) : (
            <>
              <ProjectCard project={featured} featured />
              {rest.length > 0 ? (
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {rest.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
