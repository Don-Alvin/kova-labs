export type ServiceContent = {
  slug: string;
  name: string;
  title: string;
  description: string;
  quoteHint: string;
  included: { heading: string; body: string }[];
  process: { number: string; title: string; description: string }[];
  relatedWork: { name: string; tag: string; url: string; domain: string }[];
};

export const SERVICES: Record<string, ServiceContent> = {
  "web-development": {
    slug: "web-development",
    name: "Web development",
    title: "Websites built to bring in customers",
    description:
      "Fast, professional websites and web applications that load quickly, rank well, and turn visitors into enquiries.",
    quoteHint: "business",
    included: [
      {
        heading: "Sites that load in under two seconds",
        body: "Most of your customers are on a phone using mobile data. We build lean, server-rendered pages so your site opens quickly even on a slow connection, because a visitor who waits is a visitor who leaves.",
      },
      {
        heading: "Payments that work here",
        body: "M-Pesa, Paystack, and WhatsApp checkout are first-class options rather than afterthoughts. Your customers pay the way they already pay, without being pushed through a checkout designed for somewhere else.",
      },
      {
        heading: "Content you can change yourself",
        body: "We connect your site to a simple content system so updating text, swapping photos, or publishing a post does not require a developer. We train you on it before handover.",
      },
      {
        heading: "Found on Google",
        body: "Technical SEO, structured data, sitemaps, and analytics are set up from the start, so the site is discoverable the day it launches rather than months later.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Scope the site",
        description:
          "We agree what pages you need, what each one has to achieve, and what content exists already.",
      },
      {
        number: "02",
        title: "Design and build",
        description:
          "You see the design before we build it, and working pages weekly after that.",
      },
      {
        number: "03",
        title: "Launch and train",
        description:
          "We deploy, connect your domain and analytics, and walk you through managing it.",
      },
    ],
    relatedWork: [
      {
        name: "Gedo Holdings",
        tag: "Corporate website",
        url: "https://gedoholdings.co.ke",
        domain: "gedoholdings.co.ke",
      },
      {
        name: "Lamona Realtors",
        tag: "Business website",
        url: "https://lamonarealtors.co.ke",
        domain: "lamonarealtors.co.ke",
      },
    ],
  },
  "ui-ux-design": {
    slug: "ui-ux-design",
    name: "UI/UX design",
    title: "Design that makes the next step obvious",
    description:
      "Interfaces shaped around what your customer is actually trying to do, so the path from landing to enquiry is short and clear.",
    quoteHint: "static",
    included: [
      {
        heading: "Structure before decoration",
        body: "We start with what a visitor needs to understand and in what order. Layout, hierarchy, and wording come first, because a beautiful page that buries the phone number still fails.",
      },
      {
        heading: "Designed on a phone first",
        body: "Your buyers decide on mobile. We design at that width first and expand outward, rather than shrinking a desktop layout and hoping it holds together.",
      },
      {
        heading: "A system, not a set of screens",
        body: "Colors, type, spacing, and components are defined once and reused, so the site stays consistent as it grows and new pages take days rather than weeks.",
      },
      {
        heading: "Accessible by default",
        body: "Real contrast ratios, keyboard navigation, and sensible labels. This is both the right thing to do and the reason your site works for someone in bright sunlight on a cracked screen.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Understand the visitor",
        description:
          "Who arrives, what they want, and what currently stops them from getting it.",
      },
      {
        number: "02",
        title: "Structure and design",
        description:
          "Wireframes to agree the shape, then full design once the structure is right.",
      },
      {
        number: "03",
        title: "Hand off or build",
        description:
          "You get a documented design system, and we can build it or brief your team.",
      },
    ],
    relatedWork: [
      {
        name: "Wekaniweke",
        tag: "Business website",
        url: "https://wekaniweke.com",
        domain: "wekaniweke.com",
      },
      {
        name: "Three Mice Computers",
        tag: "E-commerce",
        url: "https://threemice.co.ke",
        domain: "threemice.co.ke",
      },
    ],
  },
  "data-analytics": {
    slug: "data-analytics",
    name: "Data & analytics",
    title: "Know what your business is actually doing",
    description:
      "Tracking, dashboards, and reporting that answer real questions: where customers come from, what they do, and what is working.",
    quoteHint: "dashboard",
    included: [
      {
        heading: "Analytics set up properly",
        body: "Not just a tracking snippet. We define the events that matter for your business, verify they fire, and make sure consent is respected so the numbers you see are numbers you can trust.",
      },
      {
        heading: "Dashboards you will actually open",
        body: "A custom dashboard showing the handful of figures that drive decisions, in plain language, rather than a wall of metrics nobody reads twice.",
      },
      {
        heading: "Reporting across your tools",
        body: "Sales, site traffic, and enquiries pulled into one place, so you are not reconciling three exports by hand every month.",
      },
      {
        heading: "Answers, not just charts",
        body: "We tell you what the data suggests and what we would change because of it. A chart that nobody interprets has not earned its place.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Agree the questions",
        description:
          "We start from the decisions you need to make, then work back to what must be measured.",
      },
      {
        number: "02",
        title: "Instrument and verify",
        description:
          "Tracking is implemented and tested, so the data is correct before anyone relies on it.",
      },
      {
        number: "03",
        title: "Report and review",
        description:
          "You get the dashboard, the training to read it, and a review of what it is telling you.",
      },
    ],
    relatedWork: [
      {
        name: "Three Mice Computers",
        tag: "E-commerce",
        url: "https://threemice.co.ke",
        domain: "threemice.co.ke",
      },
      {
        name: "Gedo Holdings",
        tag: "Corporate website",
        url: "https://gedoholdings.co.ke",
        domain: "gedoholdings.co.ke",
      },
    ],
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICES);
