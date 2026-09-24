import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/home/CtaBanner";
import { LocationDetails } from "@/components/shared/LocationDetails";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  path: "/web-developers-kisumu",
  title: "Web developers in Kisumu",
  description:
    "Kisumu-based web developers building business websites, web applications, custom software, and SEO foundations for organisations in Kisumu and Western Kenya.",
});

const services = [
  {
    href: "/services/website-design",
    title: "Business websites",
    body: "Fast, mobile-friendly websites that explain what you offer and make it easy for customers to call, message, or request a quote.",
  },
  {
    href: "/services/web-applications",
    title: "Web applications",
    body: "Booking systems, customer portals, online stores, and practical digital tools built around how your customers use your service.",
  },
  {
    href: "/services/custom-software",
    title: "Custom software",
    body: "Internal systems, dashboards, and integrations that reduce repetitive work and help your team manage information more clearly.",
  },
];

const areas = [
  "Kisumu CBD",
  "Milimani",
  "Mamboleo",
  "Riat",
  "Kondele",
  "Ahero",
  "Maseno",
  "Western Kenya",
];

export default function WebDevelopersKisumuPage() {
  return (
    <>
      <section className="ground-dark relative -mt-24">
        <div className="shell relative z-10 px-6 pb-16 pt-40 md:px-12 md:pb-24 md:pt-48">
          <p className="text-sm font-medium tracking-wide text-accent">
            Based in Kisumu, serving Western Kenya
          </p>
          <h1 className="mt-5 max-w-[850px] text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-text-light sm:text-5xl lg:text-6xl">
            Web developers in Kisumu for growing businesses
          </h1>
          <p className="mt-8 max-w-[62ch] font-light leading-relaxed text-text-light/70">
            KovaLab designs and develops websites, web applications, and custom
            software for businesses and organisations in Kisumu. We are located
            on Oginga Odinga Street in Kisumu. You work
            directly with our team from planning and design through launch,
            training, and support.
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
          <h2 className="max-w-[760px] text-3xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-4xl">
            A Kisumu web development partner you can work with directly
          </h2>
          <p className="mt-6 max-w-[65ch] font-light leading-relaxed text-text-muted">
            A useful website should do more than look polished. It should load
            well on mobile, answer the questions customers ask, and guide them
            towards the next step. We plan the content around your customers, the services they need, and the easiest way for them to get in touch.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3">
            <article className="border border-border bg-bg p-8">
              <h3 className="text-xl font-semibold">Direct collaboration</h3>
              <p className="mt-4 text-sm font-light leading-relaxed text-text-muted">
                Plan your project through calls and shared reviews, with clear decisions at each stage.
              </p>
            </article>
            <article className="border border-border bg-bg p-8">
              <h3 className="text-xl font-semibold">Clear project stages</h3>
              <p className="mt-4 text-sm font-light leading-relaxed text-text-muted">
                Review the structure, design, content, and working build before
                the website or software goes live.
              </p>
            </article>
            <article className="border border-border bg-bg p-8">
              <h3 className="text-xl font-semibold">Support after launch</h3>
              <p className="mt-4 text-sm font-light leading-relaxed text-text-muted">
                Get a proper handover, guidance on managing your platform, and
                ongoing help when you need improvements.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="shell px-6 py-16 md:px-12 md:py-24">
          <h2 className="text-3xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-4xl">
            What we build for Kisumu businesses
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
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

          <h2 className="mt-16 text-2xl font-bold tracking-[-0.03em]">
            Areas we serve around Kisumu
          </h2>
          <p className="mt-5 max-w-[65ch] font-light leading-relaxed text-text-muted">
            We work with clients across Kisumu County and neighbouring parts of
            Western Kenya from our base on Oginga Odinga Street in Kisumu.
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {areas.map((area) => (
              <li
                key={area}
                className="border border-border px-4 py-2 text-sm text-text-muted"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <LocationDetails location="Kisumu" />
      <CtaBanner />
    </>
  );
}
