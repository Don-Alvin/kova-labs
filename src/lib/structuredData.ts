import { EMAIL, SITE_URL, SOCIALS, WHATSAPP_NUMBER } from "./site";

/**
 * Renders a JSON-LD block. Next.js's Metadata API has no field for
 * arbitrary structured data, so this goes directly into the page as a
 * <script> tag. Everything passed in here is our own data (site constants,
 * studio-authored Sanity content, never a public form submission), but
 * JSON.stringify alone does not escape "</script>", which could otherwise
 * let a literal occurrence of that string in a title or excerpt break out
 * of the tag. Escaping "<" closes that regardless of the source.
 */
export const jsonLd = (data: object) => ({
  __html: JSON.stringify(data).replace(/</g, "\\u003c"),
});

const PHONE = `+${WHATSAPP_NUMBER}`;

/**
 * Organization + LocalBusiness, combined into one node since KovaLab is a
 * single local business, not a multi-location chain. ProfessionalService is
 * the more specific LocalBusiness subtype schema.org defines for a services
 * business like this one. Only confirmed facts from PRODUCT.md go in here:
 * no street address exists to publish, so it is omitted rather than
 * invented; priceRange comes from the real quote estimator tiers. Homepage
 * only, per the standard convention for this schema.
 */
export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: "KovaLab",
  url: SITE_URL,
  logo: `${SITE_URL}/logos/kovalab-mark.png`,
  image: `${SITE_URL}/opengraph-image`,
  email: EMAIL,
  telephone: PHONE,
  priceRange: "KES 10,000 - KES 50,000+",
  description:
    "Software solutions studio in Nairobi, Kenya, building fast websites and web apps for businesses across East Africa.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  areaServed: {
    "@type": "Place",
    name: "East Africa",
  },
  sameAs: SOCIALS.map((social) => social.href),
});

export const serviceSchema = (input: {
  name: string;
  description: string;
  path: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: input.name,
  name: input.name,
  description: input.description,
  url: `${SITE_URL}${input.path}`,
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: {
    "@type": "Place",
    name: "East Africa",
  },
});

export const articleSchema = (input: {
  title: string;
  excerpt: string;
  path: string;
  publishedAt: string;
  dateModified?: string;
  image?: string;
  authorName?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: input.title,
  description: input.excerpt,
  url: `${SITE_URL}${input.path}`,
  datePublished: input.publishedAt,
  dateModified: input.dateModified ?? input.publishedAt,
  ...(input.image ? { image: [input.image] } : {}),
  author: {
    "@type": input.authorName ? "Person" : "Organization",
    name: input.authorName ?? "KovaLab",
  },
  publisher: { "@id": `${SITE_URL}/#organization` },
});
