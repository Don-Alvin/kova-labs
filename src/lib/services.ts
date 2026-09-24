export type ServiceContent = {
  slug: string;
  name: string;
  title: string;
  description: string;
  quoteHint: string;
  included: { heading: string; body: string }[];
  process: { number: string; title: string; description: string }[];
  relatedWork: { name: string; tag: string; url: string; domain: string; image: string }[];
};

export const SERVICES: Record<string, ServiceContent> = {
  "website-design": {
    "slug": "website-design",
    "name": "Website design",
    "title": "A clear website for your next customer",
    "description": "Mobile-friendly business websites from KSh 15,000, designed in Kisumu for customers across Kenya and East Africa.",
    "quoteHint": "static",
    "included": [
      {
        "heading": "A clear first impression",
        "body": "Pages that explain your offer, show your work, and make it easy to enquire."
      },
      {
        "heading": "Designed for every screen",
        "body": "Responsive layouts, readable text, accessible navigation, and lean images for mobile connections."
      },
      {
        "heading": "Content and enquiries",
        "body": "We agree the page count, content editing needs, and WhatsApp or email enquiry route before work begins."
      },
      {
        "heading": "A practical launch foundation",
        "body": "Page titles, descriptions, and crawlable pages, with domain and hosting setup guidance. Domain and hosting fees are separate."
      }
    ],
    "process": [
      {
        "number": "01",
        "title": "Agree the scope",
        "description": "We map the business need, content, features, budget, and acceptance criteria."
      },
      {
        "number": "02",
        "title": "Build and review",
        "description": "Review the design and working features as we build, with time for feedback."
      },
      {
        "number": "03",
        "title": "Launch and hand over",
        "description": "We test the agreed scope, launch, and explain how to manage your new tools."
      }
    ],
    "relatedWork": []
  },
  "web-applications": {
    "slug": "web-applications",
    "name": "Web applications",
    "title": "Let customers do more online",
    "description": "Booking systems, customer portals, and online stores that turn repeated manual steps into a clear online journey.",
    "quoteHint": "custom",
    "included": [
      {
        "heading": "Customer journeys",
        "body": "Map the steps from arrival to booking, order, or account access before building."
      },
      {
        "heading": "Accounts and permissions",
        "body": "Give customers and staff access to the information and actions relevant to them."
      },
      {
        "heading": "Local integrations",
        "body": "Scope M-Pesa, payment providers, notifications, and other connections around your business needs."
      },
      {
        "heading": "An interface you can operate",
        "body": "Manage content and records with workflows your team can understand, supported by handover training."
      }
    ],
    "process": [
      {
        "number": "01",
        "title": "Agree the scope",
        "description": "We map the business need, content, features, budget, and acceptance criteria."
      },
      {
        "number": "02",
        "title": "Build and review",
        "description": "Review the design and working features as we build, with time for feedback."
      },
      {
        "number": "03",
        "title": "Launch and hand over",
        "description": "We test the agreed scope, launch, and explain how to manage your new tools."
      }
    ],
    "relatedWork": []
  },
  "custom-software": {
    "slug": "custom-software",
    "name": "Custom software",
    "title": "Software that fits the way you work",
    "description": "Internal tools, workflow automation, and business integrations shaped around your team and existing systems.",
    "quoteHint": "custom",
    "included": [
      {
        "heading": "Start with the workflow",
        "body": "Identify repeated tasks, bottlenecks, and where information is duplicated across tools."
      },
      {
        "heading": "Tools for your team",
        "body": "Scope dashboards, approval flows, and reporting around the decisions staff need to make."
      },
      {
        "heading": "Connect existing systems",
        "body": "Agree data flows, access controls, and integration requirements before implementation."
      },
      {
        "heading": "A maintainable handover",
        "body": "Document the agreed workflows, train users, and define ongoing support separately from the initial build."
      }
    ],
    "process": [
      {
        "number": "01",
        "title": "Agree the scope",
        "description": "We map the business need, content, features, budget, and acceptance criteria."
      },
      {
        "number": "02",
        "title": "Build and review",
        "description": "Review the design and working features as we build, with time for feedback."
      },
      {
        "number": "03",
        "title": "Launch and hand over",
        "description": "We test the agreed scope, launch, and explain how to manage your new tools."
      }
    ],
    "relatedWork": []
  },
  "seo-setup": {
    "slug": "seo-setup",
    "name": "SEO setup",
    "title": "Give search engines a clear view of your business",
    "description": "Technical and on-page SEO setup for businesses in Nairobi and across Kenya, with a foundation you can measure.",
    "quoteHint": "",
    "included": [
      {
        "heading": "Technical indexing checks",
        "body": "Review canonical URLs, redirects, robots rules, sitemaps, and page accessibility to search crawlers."
      },
      {
        "heading": "Pages with a clear purpose",
        "body": "Align page titles, descriptions, headings, and internal links with your services and customer questions."
      },
      {
        "heading": "Consistent business information",
        "body": "Align your business name, location, and contact details across the website and agreed local listings."
      },
      {
        "heading": "Measurement and handover",
        "body": "Set up or review Search Console and consent-aware analytics, then explain what to monitor. Rankings and indexing are not guaranteed."
      }
    ],
    "process": [
      {
        "number": "01",
        "title": "Agree the scope",
        "description": "We map the business need, content, features, budget, and acceptance criteria."
      },
      {
        "number": "02",
        "title": "Build and review",
        "description": "Review the design and working features as we build, with time for feedback."
      },
      {
        "number": "03",
        "title": "Launch and hand over",
        "description": "We test the agreed scope, launch, and explain how to manage your new tools."
      }
    ],
    "relatedWork": []
  }
};

export const SERVICE_SLUGS = Object.keys(SERVICES);

SERVICES["website-design"].relatedWork = [
  { name: "Gedo Holdings", tag: "Corporate website", url: "https://gedoholdings.co.ke", domain: "gedoholdings.co.ke", image: "/work/gedoholdings.webp" },
  { name: "Lamona Realtors", tag: "Business website", url: "https://lamonarealtors.co.ke", domain: "lamonarealtors.co.ke", image: "/work/lamonarealtors.webp" },
  { name: "Three Mice Computers", tag: "E-commerce", url: "https://threemice.co.ke", domain: "threemice.co.ke", image: "/work/threemicecomputers.webp" },
];
