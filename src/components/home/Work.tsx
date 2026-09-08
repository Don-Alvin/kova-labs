import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Screenshots live in `public/work/`, named after the slug. Leave `image`
 * undefined and the card falls back to a toned placeholder, so a missing file
 * never breaks the build.
 */
const FEATURED = {
  name: "Gedo Holdings",
  tag: "Corporate website",
  slug: "gedo-holdings",
  url: "https://gedoholdings.co.ke",
  domain: "gedoholdings.co.ke",
  image: "/work/gedoholdings.png",
};

const GRID_PROJECTS = [
  {
    name: "Lamona Realtors",
    tag: "Business website",
    slug: "lamona-realtors",
    url: "https://lamonarealtors.co.ke",
    domain: "lamonarealtors.co.ke",
    image: "/work/lamonarealtors.png",
  },
  {
    name: "Wekaniweke",
    tag: "Business website",
    slug: "wekaniweke",
    url: "https://wekaniweke.com",
    domain: "wekaniweke.com",
    image: "/work/wekaniweke.png",
  },
  {
    name: "Three Mice Computers",
    tag: "E-commerce",
    slug: "three-mice-computers",
    url: "https://threemice.co.ke",
    domain: "threemice.co.ke",
    image: "/work/threemicecomputers.png",
  },
];

const Arrow = () => (
  <span
    aria-hidden="true"
    className="flex h-12 w-12 shrink-0 items-center justify-center border border-border text-text transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-dark"
  >
    <ArrowRight size={18} strokeWidth={1.5} />
  </span>
);

export const Work = () => {
  return (
    <section id="work" className="border-b border-border">
      <div className="shell px-6 py-16 md:px-12 md:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="max-w-[640px] text-3xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              Real results for <em className="text-accent">real</em> businesses
            </h2>
          </div>
          <Link
            href="/work"
            className="shrink-0 self-start border border-border px-6 py-3 text-sm font-medium text-text transition-all duration-300 hover:scale-105 hover:border-text hover:bg-text hover:text-text-light sm:self-auto"
          >
            All projects
          </Link>
        </div>

        <a
          href={FEATURED.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mt-12 block h-[300px] overflow-hidden border border-border lg:h-[520px]"
        >
          <div className="absolute inset-0 scale-110 bg-bg-warm">
            {FEATURED.image ? (
              <Image
                src={FEATURED.image}
                alt={`${FEATURED.name} website`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            ) : null}
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-dark/85 to-transparent"
          />
          {/* bg-dark/70 is a real background-color on the text's own ancestor,
              not just the sibling gradient above, so the light label stays
              legible even against a very bright screenshot underneath. */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 bg-dark/70 p-6 md:p-8">
            <div>
              <p className="text-xl font-bold text-text-light md:text-2xl">
                {FEATURED.name}
              </p>
              <p className="mt-2 text-xs font-light tracking-wide text-text-light/70">
                {FEATURED.tag} &middot; {FEATURED.domain}
              </p>
            </div>
            <Arrow />
          </div>
        </a>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {GRID_PROJECTS.map((project) => (
            <a
              key={project.slug}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-border bg-bg transition-all duration-300 hover:scale-[1.02] hover:border-accent hover:shadow-[var(--shadow-lift)]"
            >
              <div className="relative h-[240px] overflow-hidden lg:h-[300px]">
                <div className="absolute inset-0 scale-110 bg-bg-warm transition-transform duration-500 group-hover:scale-[1.15]">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.name} website`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : null}
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 p-6">
                <div>
                  <p className="text-lg font-semibold">{project.name}</p>
                  <p className="mt-1 text-xs font-light tracking-wide text-text-muted">
                    {project.domain}
                  </p>
                </div>
                <Arrow />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
