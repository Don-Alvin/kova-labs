"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { parallax, revealOnScroll } from "@/lib/animations";

const GRID_PROJECTS = [
  { name: "Raicha Electrical", tag: "Business website", slug: "raicha-electrical" },
  { name: "Online retail store", tag: "E-commerce", slug: "online-retail-store" },
];

const MORE_WORK = [
  {
    category: "Analytics",
    title: "Sales dashboard",
    description:
      "Real-time tracking and reporting for a retail chain across three locations.",
  },
  {
    category: "Web app",
    title: "Booking platform",
    description:
      "Online scheduling and payment system for a service-based business.",
  },
  {
    category: "SEO & content",
    title: "Traffic growth",
    description:
      "3x organic traffic increase through technical SEO and content strategy.",
  },
];

const Arrow = () => (
  <span
    aria-hidden="true"
    className="flex h-12 w-12 shrink-0 items-center justify-center border border-border text-text transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-dark"
  >
    &#8594;
  </span>
);

export const Work = () => {
  const container = useRef<HTMLElement>(null);
  const featuredImage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (featuredImage.current) parallax(featuredImage.current, 15, 1);

      gsap.utils
        .toArray<HTMLElement>(".work-card-image")
        .forEach((el) => parallax(el, 20, 1.2));

      gsap.utils
        .toArray<HTMLElement>(".work-reveal")
        .forEach((el, index) => revealOnScroll(el, "up", index * 0.1));
    },
    { scope: container }
  );

  return (
    <section id="work" ref={container} className="border-b border-border">
      <div className="shell px-6 py-16 md:px-12 md:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="max-w-[640px] text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Real results for <em className="text-accent">real</em> businesses
            </h2>
          </div>
          <Link
            href="/work"
            className="shrink-0 self-start border border-border px-6 py-3 text-sm font-medium text-text transition-colors hover:border-text hover:bg-text hover:text-text-light sm:self-auto"
          >
            All projects
          </Link>
        </div>

        <Link
          href="/work/gedo-holdings"
          className="work-reveal group relative mt-12 block h-[300px] overflow-hidden border border-border lg:h-[520px]"
        >
          <div
            ref={featuredImage}
            className="absolute inset-0 scale-110 bg-bg-warm"
            aria-hidden="true"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-dark/85 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 md:p-8">
            <div>
              <p className="text-xl font-bold text-text-light md:text-2xl">
                Gedo Holdings
              </p>
              <p className="mt-2 text-xs font-light tracking-wide text-text-muted-dark">
                Corporate website &middot; Next.js &middot; Vercel
              </p>
            </div>
            <Arrow />
          </div>
        </Link>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {GRID_PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="work-reveal group border border-border transition-colors hover:border-accent"
            >
              <div className="h-[240px] overflow-hidden lg:h-[340px]">
                <div
                  className="work-card-image h-full w-full scale-110 bg-bg-warm transition-transform duration-500 group-hover:scale-[1.15]"
                  aria-hidden="true"
                />
              </div>
              <div className="flex items-center justify-between gap-4 p-6">
                <div>
                  <p className="text-lg font-semibold">{project.name}</p>
                  <p className="mt-1 text-xs font-light tracking-wide text-text-muted">
                    {project.tag}
                  </p>
                </div>
                <Arrow />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {MORE_WORK.map((item) => (
            <article
              key={item.title}
              className="work-reveal border border-border p-6 md:p-8"
            >
              <p className="text-xs font-light tracking-wide text-accent-text">
                {item.category}
              </p>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
