import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/home/CtaBanner";
import { LocationDetails } from "@/components/shared/LocationDetails";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  path: "/web-developers-nakuru",
  title: "Web developers serving Nakuru",
  description:
    "KovaLab builds websites, web applications, custom software, and SEO foundations for businesses in Nakuru and across Kenya.",
});

const projectTypes = [
  {
    href: "/services/website-design",
    title: "Business website design",
    body: "A clear, responsive website for presenting your services, building trust, and turning visits into enquiries.",
  },
  {
    href: "/services/web-applications",
    title: "Web application development",
    body: "Online booking, e-commerce, customer portals, and service platforms that customers can use from any device.",
  },
  {
    href: "/services/custom-software",
    title: "Custom business software",
    body: "Purpose-built dashboards, workflow tools, and integrations for processes that generic software cannot handle well.",
  },
];

export default function WebDevelopersNakuruPage() {
  return (
    <>
      <section className="ground-dark relative -mt-24">
        <div className="shell relative z-10 px-6 pb-16 pt-40 md:px-12 md:pb-24 md:pt-48">
          <p className="text-sm font-medium tracking-wide text-accent">
            Serving businesses in Nakuru
          </p>
          <h1 className="mt-5 max-w-[850px] text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-text-light sm:text-5xl lg:text-6xl">
            Web developers for businesses in Nakuru
          </h1>
          <p className="mt-8 max-w-[62ch] font-light leading-relaxed text-text-light/70">
            KovaLab helps businesses in Nakuru build professional websites,
            customer-facing web applications, and custom software. Our
            process keeps planning, feedback, approvals, and launch organised
            from the first call to the final handover.
          </p>
          <Link
            href="/quote"
            className="mt-10 inline-block bg-accent px-7 py-4 text-sm font-medium text-dark transition-transform hover:scale-105"
          >
            Get a project estimate
          </Link>
        </div>
      </section>

      <section className="border-b border-border bg-bg-warm">
        <div className="shell px-6 py-16 md:px-12 md:py-24">
          <h2 className="max-w-[760px] text-3xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-4xl">
            A clear process that keeps your project moving
          </h2>
          <p className="mt-6 max-w-[65ch] font-light leading-relaxed text-text-muted">
            A strong digital product starts with a clear brief, visible progress, timely
            feedback, and agreed approval points. We use scheduled calls and
            shared reviews so Nakuru clients always know what is being built and
            what happens next.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3">
            <article className="border border-border bg-bg p-8">
              <h3 className="text-xl font-semibold">Discovery and scope</h3>
              <p className="mt-4 text-sm font-light leading-relaxed text-text-muted">
                We define your goals, users, required pages or features, and a
                practical scope before development begins.
              </p>
            </article>
            <article className="border border-border bg-bg p-8">
              <h3 className="text-xl font-semibold">Shared reviews</h3>
              <p className="mt-4 text-sm font-light leading-relaxed text-text-muted">
                You review each major stage and give feedback while changes are
                still easy to make.
              </p>
            </article>
            <article className="border border-border bg-bg p-8">
              <h3 className="text-xl font-semibold">Launch and handover</h3>
              <p className="mt-4 text-sm font-light leading-relaxed text-text-muted">
                We test the finished product, prepare it for launch, and explain
                how your team can manage it confidently.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="shell px-6 py-16 md:px-12 md:py-24">
          <h2 className="text-3xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-4xl">
            Web development services for Nakuru businesses
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
            {projectTypes.map((project) => (
              <Link
                key={project.href}
                href={project.href}
                className="border border-border p-8 transition-colors hover:border-accent"
              >
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-text-muted">
                  {project.body}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-16 border border-border bg-bg-warm p-8 md:p-12">
            <h2 className="text-2xl font-bold tracking-[-0.03em]">
              Looking for website design in Nakuru?
            </h2>
            <p className="mt-5 max-w-[65ch] font-light leading-relaxed text-text-muted">
              Tell us what your business does, what the website needs to help
              customers accomplish, and whether you already have content. We
              will recommend a sensible project scope and explain the next steps
              without technical jargon.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-block font-medium text-accent"
            >
              Discuss your project
            </Link>
          </div>
        </div>
      </section>

      <LocationDetails location="Nakuru" />
      <CtaBanner />
    </>
  );
}
