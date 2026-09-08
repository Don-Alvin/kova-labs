import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/home/CtaBanner";
import { MarkPanel } from "@/components/shared/MarkPanel";
import { pageMetadata } from "@/lib/metadata";
import { SERVICES, SERVICE_SLUGS } from "@/lib/services";
import { jsonLd, serviceSchema } from "@/lib/structuredData";
import { ArrowRight } from "lucide-react";

type Params = { params: Promise<{ slug: string }> };

export const generateStaticParams = () =>
  SERVICE_SLUGS.map((slug) => ({ slug }));

export const generateMetadata = async ({
  params,
}: Params): Promise<Metadata> => {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) return {};

  return pageMetadata({
    path: `/services/${slug}`,
    title: service.name,
    description: service.description,
  });
};

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = SERVICES[slug];

  if (!service) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          serviceSchema({
            name: service.name,
            description: service.description,
            path: `/services/${slug}`,
          })
        )}
      />
      <section className="ground-dark relative -mt-24">
        <div className="shell relative z-10 grid grid-cols-1 items-center gap-12 px-6 pb-16 pt-40 md:px-12 md:pb-24 md:pt-48 lg:grid-cols-[55fr_45fr] lg:gap-16">
          <div>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-text-light sm:text-5xl lg:text-6xl">
              {service.title}
            </h1>
            <p className="mt-8 max-w-[42ch] font-light leading-relaxed text-text-light/70">
              {service.description}
            </p>
          </div>
          <MarkPanel className="min-h-[280px] lg:min-h-[440px]" />
        </div>
      </section>

      <section className="ground-dark relative">
        <div className="shell relative z-10 px-6 py-16 md:px-12 md:py-24">
          <h2 className="max-w-[720px] text-3xl font-bold leading-[1.05] tracking-[-0.04em] text-text-light sm:text-4xl">
            What you get
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2">
            {service.included.map((item) => (
              <div
                key={item.heading}
                className="glass-dark p-8 text-text-light md:p-10"
              >
                <h3 className="text-xl font-semibold">{item.heading}</h3>
                <p className="mt-4 max-w-[42ch] text-sm font-light leading-relaxed text-text-light/60">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-bg-warm">
        <div className="shell px-6 py-16 md:px-12 md:py-24">
          <h2 className="text-3xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-4xl">
            The process for this service
          </h2>

          <ol className="mt-12 grid grid-cols-1 border border-border md:grid-cols-3">
            {service.process.map((step, index) => (
              <li
                key={step.number}
                className={`bg-bg p-8 md:p-10 ${
                  index < service.process.length - 1
                    ? "border-b border-border md:border-b-0 md:border-r"
                    : ""
                }`}
              >
                <p aria-hidden="true" className="text-4xl font-extrabold tracking-tight text-accent opacity-20">
                  {step.number}
                </p>
                <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-text-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="shell px-6 py-16 md:px-12 md:py-24">
          <h2 className="text-3xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-4xl">
            Projects like this
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {service.relatedWork.map((project) => (
              <a
                key={project.domain}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-border bg-bg transition-all duration-300 hover:scale-[1.02] hover:border-accent hover:shadow-[var(--shadow-lift)]"
              >
                <div className="relative h-[220px] overflow-hidden bg-bg-warm lg:h-[300px]">
                  <div className="absolute inset-0 scale-110 transition-transform duration-500 group-hover:scale-[1.15]">
                    <Image
                      src={project.image}
                      alt={`${project.name} website`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 p-6">
                  <div>
                    <p className="text-lg font-semibold">{project.name}</p>
                    <p className="mt-1 text-xs font-light tracking-wide text-text-muted">
                      {project.domain}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center border border-border transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-dark"
                  >
                    <ArrowRight size={18} strokeWidth={1.5} />
                  </span>
                </div>
              </a>
            ))}
          </div>

          <Link
            href={`/quote?type=${service.quoteHint}`}
            className="mt-12 inline-block border border-border px-8 py-4 text-sm font-medium transition-all duration-300 hover:scale-105 hover:border-text hover:bg-text hover:text-text-light"
          >
            Estimate your project cost
          </Link>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
