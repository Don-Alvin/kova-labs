import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkPanel } from "@/components/shared/MarkPanel";
import { pageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";
import { SERVICES, SERVICE_SLUGS } from "@/lib/services";
import { jsonLd, serviceSchema } from "@/lib/structuredData";
import { ProjectShowcases } from "@/components/work/ProjectShowcases";

type Params = { params: Promise<{ slug: string }> };

export const generateStaticParams = () =>
  SERVICE_SLUGS.map((slug) => ({ slug }));

export const generateMetadata = async ({
  params,
}: Params): Promise<Metadata> => {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) notFound();

  return pageMetadata({
    path: `/services/${slug}`,
    title: service.seoTitle,
    description: service.description,
  });
};

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = SERVICES[slug];

  if (!service) notFound();

  const ctaHref = service.quoteHint ? `/quote?type=${service.quoteHint}` : "/contact";

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: service.name, item: `${SITE_URL}/services/${slug}` },
          ],
        })}
      />
      <section className="ground-dark relative -mt-24">
        <div className="shell relative z-10 grid grid-cols-1 items-center gap-12 px-6 pb-16 pt-40 md:px-12 md:pb-24 md:pt-48 lg:grid-cols-[55fr_45fr] lg:gap-16">
          <div>
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-text-light/70">
              <ol className="flex flex-wrap items-center gap-3">
                <li><Link href="/" className="underline underline-offset-4 hover:text-text-light">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{service.name}</li>
              </ol>
            </nav>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-text-light sm:text-5xl lg:text-6xl">
              {service.title}
            </h1>
            <p className="mt-8 max-w-[42ch] font-light leading-relaxed text-text-light/70">
              {service.intro}
            </p>
            <Link
              href={ctaHref}
              className="mt-8 inline-block bg-accent px-6 py-4 text-sm font-semibold text-dark transition-colors hover:bg-accent/90"
            >
              {service.cta.label}
            </Link>
          </div>
          <MarkPanel className="min-h-[280px] lg:min-h-[440px]" />
        </div>
      </section>

      <section className="border-b border-border bg-bg-warm">
        <div className="shell px-6 py-12 md:px-12 md:py-16">
          <h2 className="max-w-[800px] text-3xl font-bold leading-tight tracking-[-0.04em]">{service.overview.heading}</h2>
          <p className="mt-6 max-w-[72ch] font-light leading-relaxed text-text-muted">{service.overview.body}</p>
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

      <section className="border-b border-border">
        <div className="shell px-6 py-12 md:px-12 md:py-16">
          <h2 className="max-w-[800px] text-3xl font-bold leading-tight tracking-[-0.04em]">{service.scope.heading}</h2>
          <p className="mt-6 max-w-[72ch] font-light leading-relaxed text-text-muted">{service.scope.body}</p>
          {service.scope.link && (
            <Link href={service.scope.link.href} className="mt-5 inline-block text-sm font-semibold underline underline-offset-4 hover:text-accent-text">
              {service.scope.link.label}
            </Link>
          )}
        </div>
      </section>

      <section className="border-b border-border bg-bg-warm">
        <div className="shell px-6 py-16 md:px-12 md:py-24">
          <h2 className="text-3xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-4xl">
            {service.name}: from brief to handover
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
                <p aria-hidden="true" className="text-4xl font-extrabold tracking-tight text-accent">
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

      {service.relatedWork.length > 0 && (
        <section className="border-b border-border">
          <div className="shell px-6 py-16 md:px-12 md:py-24">
            <h2 className="text-3xl font-bold">Selected work</h2>
            <ProjectShowcases urls={service.relatedWork} />
          </div>
        </section>
      )}

      <section aria-labelledby="service-faq-heading" className="border-b border-border">
        <div className="shell px-6 py-16 md:px-12 md:py-24">
          <h2 id="service-faq-heading" className="text-3xl font-bold leading-tight tracking-[-0.04em] sm:text-4xl">Questions about {service.name.toLowerCase()}</h2>
          <div className="mt-8 max-w-[900px]">
            {service.faqs.map((item) => (
              <details key={item.question} name="service-faq" className="border-b border-border py-5">
                <summary className="cursor-pointer text-lg font-semibold">{item.question}</summary>
                <p className="mt-4 max-w-[70ch] font-light leading-relaxed text-text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="ground-dark relative">
        <div className="shell relative z-10 px-6 py-16 md:px-12 md:py-24">
          <h2 className="max-w-[28ch] text-3xl font-bold leading-tight tracking-[-0.04em] text-text-light sm:text-4xl">{service.cta.heading}</h2>
          <p className="mt-6 max-w-[62ch] font-light leading-relaxed text-text-light/70">{service.cta.body}</p>
          <Link
            href={ctaHref}
            className="mt-8 inline-block bg-accent px-6 py-4 text-sm font-semibold text-dark transition-colors hover:bg-accent/90"
          >
            {service.cta.label}
          </Link>
          <nav aria-label="Other services" className="mt-12 flex flex-wrap gap-6 text-sm text-text-light/70 underline underline-offset-4">
            {SERVICE_SLUGS.filter(item => item !== slug).map(item => (
              <Link key={item} href={("/services/" + item)} className="hover:text-text-light">{SERVICES[item].name}</Link>
            ))}
          </nav>
        </div>
      </section>
    </>
  );
}
