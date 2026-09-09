import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  { name: "Gedo Holdings", category: "Construction & real estate", description: "A confident online home for a company building the spaces people live and work in.", url: "https://gedoholdings.co.ke", image: "gedoholdings", tags: ["Corporate website", "Project showcase"] },
  { name: "Lamona Realtors", category: "Property & real estate", description: "A welcoming property experience that brings the search for a new home onto any screen.", url: "https://lamonarealtors.co.ke", image: "lamonarealtors", tags: ["Business website", "Real estate"] },
  // Temporarily hidden from the showcase; keep the project data here for a
  // quick restore when the case study is ready to return.
  // { name: "Wekaniweke", category: "Business & services", description: "A clear digital presence that puts the business front and centre, wherever customers find it.", url: "https://wekaniweke.com", image: "wekaniweke", tags: ["Business website", "Responsive design"] },
  { name: "Three Mice Computers", category: "Technology & retail", description: "An online storefront built around discovering technology, exploring products, and finding the right fit.", url: "https://threemice.co.ke", image: "threemicecomputers", tags: ["E-commerce", "Product catalogue"] },
];

const DeviceShowcase = ({ image, name }: { image: string; name: string }) => (
  <div className="project-devices" role="img" aria-label={`${name} displayed on desktop, tablet, and mobile`}>
    <div className="project-laptop">
      <div className="project-laptop-lid">
        <span className="project-camera" />
        <div className="project-desktop-screen">
          <Image src={`/work/${image}.webp`} alt="" fill sizes="(max-width: 767px) 75vw, (max-width: 1280px) 45vw, 560px" className="object-cover object-top" />
        </div>
      </div>
      <div className="project-laptop-base" />
    </div>
    <div className="project-tablet">
      <div className="project-tablet-screen">
        <Image src={`/work/${image}-tablet.webp`} alt="" fill sizes="(max-width: 767px) 28vw, 210px" className="object-cover object-top" />
      </div>
    </div>
    <div className="project-phone">
      <span className="project-phone-speaker" />
      <div className="project-phone-screen">
        <Image src={`/work/${image}-mobile.webp`} alt="" fill sizes="(max-width: 767px) 16vw, 115px" className="object-cover object-top" />
      </div>
    </div>
  </div>
);

export const Work = () => (
  <section id="work" className="scroll-mt-24 border-b border-border">
    <div className="shell px-6 py-16 md:px-12 md:py-24">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 className="max-w-[560px] text-4xl font-bold leading-[0.98] tracking-[-0.05em] sm:text-5xl lg:text-6xl">Proof is in<br />the product.</h2>
        <div className="max-w-[340px]">
          <p className="text-sm font-light leading-relaxed text-text-muted">Real businesses. Thoughtful websites. Explore our work, from the big picture to the smallest screen.</p>
          <Link href="/work" className="mt-4 inline-flex items-center gap-2 border-b border-text pb-1 text-sm font-medium">All projects <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-5 md:mt-12 md:gap-6">
        {PROJECTS.map((project, index) => (
          <article key={project.image} className="project-showcase">
            <div className={`project-copy ${index % 2 ? "md:order-2" : ""}`}>
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] project-eyebrow">{String(index + 1).padStart(2, "0")} / {project.category}</p>
              <h3 className="mt-4 text-3xl font-semibold leading-[1.02] tracking-[-0.05em] lg:text-[2.6rem]">{project.name}</h3>
              <p className="mt-4 max-w-[34ch] text-sm font-light leading-relaxed project-description">{project.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Project services">{project.tags.map((tag) => <li key={tag} className="project-tag">{tag}</li>)}</ul>
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 project-link border-b pb-1 text-xs font-semibold transition-opacity hover:opacity-60" aria-label={`Visit ${project.name} website (opens in a new tab)`}>View live project <ArrowUpRight size={15} aria-hidden="true" /></a>
            </div>
            <DeviceShowcase image={project.image} name={project.name} />
          </article>
        ))}
      </div>
    </div>
  </section>
);
