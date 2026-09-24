import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { jsonLd, serviceSchema } from "@/lib/structuredData";

const locations = ["Kenya", "Kisumu", "Nakuru", "Nairobi"] as const;

export function LocationDetails({ location }: { location: typeof locations[number] }) {
  const path = `/web-developers-${location.toLowerCase()}`;
  return (
    <section className="border-b border-border bg-bg-warm">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd({
        ...serviceSchema({ name: `Web development in ${location}`, description: `Website design, web applications, custom software, and SEO setup for businesses in ${location}.`, path }),
        areaServed: { "@type": location === "Kenya" ? "Country" : "City", name: location },
      })} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          ...(location === "Kenya" ? [] : [{ "@type": "ListItem", position: 2, name: "Kenya", item: `${SITE_URL}/web-developers-kenya` }]),
          { "@type": "ListItem", position: location === "Kenya" ? 2 : 3, name: location, item: `${SITE_URL}${path}` },
        ],
      })} />
      <div className="shell px-6 py-16 md:px-12">
        <h2 className="text-2xl font-bold tracking-[-0.03em]">Plan your website budget</h2>
        <p className="mt-5 max-w-[65ch] font-light leading-relaxed text-text-muted">
          A static website of up to 4 pages starts at KSh 15,000. A business website
          of 5 to 8 pages starts at KSh 20,000. Domain registration and hosting are
          arranged separately. Use our estimator to compare features and support options.
        </p>
        <div className="mt-6 flex flex-wrap gap-6">
          <Link href="/quote" className="font-medium text-accent-text">Estimate your project</Link>
          <Link href="/work" className="font-medium text-accent-text">View our work</Link>
          <Link href="/services/seo-setup" className="font-medium text-accent-text">Explore SEO setup</Link>
        </div>
        <nav aria-label="Web development locations" className="mt-12 border-t border-border pt-8">
          <h2 className="text-xl font-semibold">Web development across Kenya</h2>
          <ul className="mt-5 flex flex-wrap gap-5">
            {locations.map((name) => <li key={name}><Link href={`/web-developers-${name.toLowerCase()}`} aria-current={name === location ? "page" : undefined} className="text-sm text-text-muted underline underline-offset-4 hover:text-accent-text">{name === "Kenya" ? "All Kenya" : name}</Link></li>)}
          </ul>
        </nav>
      </div>
    </section>
  );
}
