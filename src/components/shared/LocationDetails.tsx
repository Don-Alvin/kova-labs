import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { jsonLd, serviceSchema } from "@/lib/structuredData";
import { LOCATIONS, type Location } from "@/lib/locations";

export function LocationDetails({ location }: { location: Location }) {
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
        <nav aria-label="Web development locations">
          <h2 className="text-xl font-semibold">Web development across Kenya</h2>
          <ul className="mt-5 flex flex-wrap gap-5">
            {LOCATIONS.map((name) => <li key={name}><Link href={`/web-developers-${name.toLowerCase()}`} aria-current={name === location ? "page" : undefined} className="text-sm text-text-muted underline underline-offset-4 hover:text-accent-text">{name === "Kenya" ? "All Kenya" : name}</Link></li>)}
          </ul>
        </nav>
      </div>
    </section>
  );
}
