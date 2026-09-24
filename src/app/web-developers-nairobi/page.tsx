import Link from "next/link";
import { CtaBanner } from "@/components/home/CtaBanner";
import { LocationDetails } from "@/components/shared/LocationDetails";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/web-developers-nairobi",
  title: "Web developers in Nairobi",
  description: "Website design and web development for Nairobi businesses. Build a mobile-friendly website, customer portal, or custom software with KovaLab.",
});

const services = [
  { title: "Service business websites", href: "/services/website-design", body: "Give customers a clear view of your services, coverage, and contact details. Make it easy to request a quote or start a WhatsApp conversation from a phone." },
  { title: "Stores and customer portals", href: "/services/web-applications", body: "Help customers browse products, book a service, or manage a request online. We scope WhatsApp checkout, M-Pesa, or Paystack options around how your business takes payments." },
  { title: "Tools for your operations", href: "/services/custom-software", body: "Bring repeated tasks into a shared workflow. Custom dashboards and integrations can help your team manage enquiries, orders, and information across branches." },
];

export default function WebDevelopersNairobiPage() {
  return <>
    <section className="ground-dark relative -mt-24">
      <div className="shell relative z-10 px-6 pb-16 pt-40 md:px-12 md:pb-24 md:pt-48">
        <p className="text-sm font-medium tracking-wide text-accent">Serving businesses in Nairobi</p>
        <h1 className="mt-5 max-w-[850px] text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-text-light sm:text-5xl lg:text-6xl">Web developers in Nairobi for your next stage of business</h1>
        <p className="mt-8 max-w-[62ch] font-light leading-relaxed text-text-light/70">Give customers a clear way to discover your business and take the next step. KovaLab builds websites, web applications, and custom software for Nairobi businesses, from a first company website to a platform that supports a growing team.</p>
        <Link href="/quote" className="mt-10 inline-block bg-accent px-7 py-4 text-sm font-medium text-dark transition-transform hover:scale-105">Estimate your project</Link>
      </div>
    </section>
    <section className="border-b border-border bg-bg-warm">
      <div className="shell px-6 py-16 md:px-12 md:py-24">
        <h2 className="max-w-[760px] text-3xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-4xl">A website shaped around how your customers buy</h2>
        <p className="mt-6 max-w-[65ch] font-light leading-relaxed text-text-muted">Whether you serve customers in one part of Nairobi or deliver across the city, your website should explain where you work, what you offer, and how to order or enquire. We plan those journeys before design begins, with mobile browsing and clear contact options at the centre.</p>
        <div className="mt-12 grid gap-3 md:grid-cols-3">{services.map(service => <Link key={service.href} href={service.href} className="border border-border bg-bg p-8 transition-colors hover:border-accent"><h3 className="text-xl font-semibold">{service.title}</h3><p className="mt-4 text-sm font-light leading-relaxed text-text-muted">{service.body}</p></Link>)}</div>
      </div>
    </section>
    <section className="border-b border-border">
      <div className="shell grid gap-12 px-6 py-16 md:grid-cols-2 md:px-12 md:py-24">
        <article><h2 className="text-2xl font-bold tracking-[-0.03em]">Replacing an existing website?</h2><p className="mt-5 font-light leading-relaxed text-text-muted">Start with what your current site gets right and where customers get stuck. Share the existing URL, the content you want to keep, and the features you need. We can scope a rebuild around clearer navigation, faster pages, and a planned move from old URLs to new ones.</p></article>
        <article><h2 className="text-2xl font-bold tracking-[-0.03em]">Keep the project moving around your workday</h2><p className="mt-5 font-light leading-relaxed text-text-muted">Regular reviews and shared previews keep your team involved at every stage. We agree on the pages, features, feedback stages, and handover before starting. Ongoing support can be included in your estimate.</p><Link href="/contact" className="mt-6 inline-block font-medium text-accent-text">Discuss your Nairobi project</Link></article>
      </div>
    </section>
    <LocationDetails location="Nairobi" />
    <CtaBanner />
  </>;
}
