import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/home/CtaBanner";
import { LocationDetails } from "@/components/shared/LocationDetails";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  path: "/web-developers-kenya",
  title: "Web developers in Kenya",
  description:
    "Kisumu-based web developers serving businesses across Kenya with website design, web applications, custom software, and SEO setup.",
});

const locations = [
  {
    href: "/web-developers-kisumu",
    title: "Web developers in Kisumu",
    body: "Find us on Oginga Odinga Street in Kisumu. We build websites, web applications, and custom software for businesses across the region.",
  },
  {
    href: "/web-developers-nakuru",
    title: "Web developers serving Nakuru",
    body: "We serve businesses in Nakuru with website design, web applications, custom software, and practical SEO foundations.",
  },
  {
    href: "/web-developers-nairobi",
    title: "Web developers serving Nairobi",
    body: "We serve businesses in Nairobi with websites, customer portals, and custom software shaped around their goals.",
  },
];

const services = [
  {
    href: "/services/website-design",
    title: "Business websites",
    body: "Clear, mobile-friendly websites designed to explain your offer, build confidence, and generate enquiries.",
  },
  {
    href: "/services/web-applications",
    title: "Web applications",
    body: "Booking journeys, online stores, portals, and tools that allow customers to complete useful actions online.",
  },
  {
    href: "/services/custom-software",
    title: "Custom software",
    body: "Internal tools, dashboards, and integrations shaped around the workflow your team already uses.",
  },
  {
    href: "/services/seo-setup",
    title: "SEO setup",
    body: "Technical and on-page foundations that help search engines understand your website and its most important services.",
  },
];

export default function WebDevelopersKenyaPage() {
  return (
    <>
      <section className="ground-dark relative -mt-24">
        <div className="shell relative z-10 px-6 pb-16 pt-40 md:px-12 md:pb-24 md:pt-48">
          <p className="text-sm font-medium tracking-wide text-accent">
            Kisumu-based, Kenya-wide
          </p>
          <h1 className="mt-5 max-w-[850px] text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-text-light sm:text-5xl lg:text-6xl">
            Web developers for businesses across Kenya
          </h1>
          <p className="mt-8 max-w-[62ch] font-light leading-relaxed text-text-light/70">
            KovaLab builds websites, web applications, and custom software for
            businesses in Kisumu and across Kenya. We combine clear planning,
            thoughtful design, and dependable development to create digital
            products that support real business goals.
          </p>
          <Link
            href="/quote"
            className="mt-10 inline-block bg-accent px-7 py-4 text-sm font-medium text-dark transition-transform hover:scale-105"
          >
            Estimate your project
          </Link>
        </div>
      </section>

      <section className="border-b border-border bg-bg-warm">
        <div className="shell px-6 py-16 md:px-12 md:py-24">
          <h2 className="max-w-[720px] text-3xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-4xl">
            One development team, wherever your business is based
          </h2>
          <p className="mt-6 max-w-[65ch] font-light leading-relaxed text-text-muted">
            A good web project needs clear decisions, useful feedback, and a
            reliable launch process. We use calls, shared reviews, and staged
            approvals so clients across Kenya can follow progress and make
            informed decisions throughout the project.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3">
            {locations.map((location) => (
              <Link
                key={location.title}
                href={location.href}
                className="border border-border bg-bg p-8 transition-colors hover:border-accent"
              >
                <h3 className="text-xl font-semibold">{location.title}</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-text-muted">
                  {location.body}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="shell px-6 py-16 md:px-12 md:py-24">
          <h2 className="text-3xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-4xl">
            What we build
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="border border-border p-8 transition-colors hover:border-accent"
              >
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-text-muted">
                  {service.body}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 gap-3 md:grid-cols-3">
            <article className="border border-border p-8">
              <p className="text-sm font-medium text-accent">01</p>
              <h3 className="mt-4 text-xl font-semibold">
                Plan the right scope
              </h3>
              <p className="mt-4 text-sm font-light leading-relaxed text-text-muted">
                We identify the users, business goal, content, and features the
                project actually needs.
              </p>
            </article>
            <article className="border border-border p-8">
              <p className="text-sm font-medium text-accent">02</p>
              <h3 className="mt-4 text-xl font-semibold">Review the work</h3>
              <p className="mt-4 text-sm font-light leading-relaxed text-text-muted">
                You see progress at agreed stages and give feedback before final
                approval.
              </p>
            </article>
            <article className="border border-border p-8">
              <p className="text-sm font-medium text-accent">03</p>
              <h3 className="mt-4 text-xl font-semibold">
                Launch with confidence
              </h3>
              <p className="mt-4 text-sm font-light leading-relaxed text-text-muted">
                We test the finished product, complete the launch, and hand over
                the information your team needs.
              </p>
            </article>
          </div>
        </div>
      </section>

      <LocationDetails location="Kenya" />
      <CtaBanner />
    </>
  );
}
