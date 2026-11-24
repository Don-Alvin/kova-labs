export type ServiceContent = {
  slug: string;
  name: string;
  title: string;
  intro: string;
  description: string;
  seoTitle: string;
  overview: { heading: string; body: string };
  scope: { heading: string; body: string; link?: { href: string; label: string } };
  faqs: { question: string; answer: string }[];
  quoteHint: string;
  cta: { heading: string; body: string; label: string };
  included: { heading: string; body: string }[];
  process: { number: string; title: string; description: string }[];
  relatedWork: string[];
};

export const SERVICES: Record<string, ServiceContent> = {
  "website-design": {
    slug: "website-design",
    name: "Website design",
    title: "Business website design from KSh 15,000",
    intro: "We design and build websites for Kenyan businesses. Help customers find what you offer, see examples of your work, and enquire from a phone or desktop.",
    seoTitle: "Website Design in Kenya from KSh 15,000",
    description: "Mobile-friendly website design in Kenya from KSh 15,000 for up to three pages, with a WhatsApp or email enquiry route. Get an estimate from KovaLab.",
    quoteHint: "static",
    overview: {
      heading: "Give customers the information they need to enquire",
      body: "A customer might want to know whether you serve their area, see work similar to theirs, or ask for a quote. We use those questions to plan the site. For a small service business, three pages might cover an overview, your services, and contact details. For a redesign, we review which existing pages and links are worth keeping.",
    },
    included: [
      { heading: "Page structure and navigation", body: "We agree how to group your services, examples of work, and contact details so visitors can get to the right page quickly." },
      { heading: "Mobile-friendly design", body: "We design for small screens and desktops, with readable text, clear navigation, and images sized for the page." },
      { heading: "Enquiry links and forms", body: "We set up the agreed WhatsApp, email, or contact form route and check where each enquiry goes. For forms, we agree what information your team needs to respond." },
      { heading: "Search basics for launch", body: "We give each page a descriptive title, a search description, and links that search engines can follow." },
    ],
    scope: {
      heading: "What the starting price covers",
      body: "The KSh 15,000 starting option covers a static site of up to three pages with a WhatsApp or email enquiry route. Extra pages, a blog, or a content editor can be priced into your quote. Domain registration, hosting, and ongoing support are separate costs.",
    },
    process: [
      { number: "01", title: "Agree on pages and content", description: "We discuss what visitors need to find, confirm the page list, and agree who will prepare the copy, photos, and brand assets." },
      { number: "02", title: "Review a working preview", description: "Try the site on a phone and desktop. We use your feedback to refine the agreed pages before launch." },
      { number: "03", title: "Connect your domain and hand over", description: "We test the enquiry routes, publish the site on the agreed domain, and share the access and guidance your team needs to manage it." },
    ],
    faqs: [
      { question: "Can I keep my current domain and page links?", answer: "You can keep an existing domain you control. If pages move in a redesign, we review the old addresses and scope redirects so those links can take customers to the right pages." },
      { question: "Do I need to supply the text and photographs?", answer: "Share what you already have, such as service details, a company profile, a logo, or photos you have permission to use. If you need copywriting or help sourcing images, we agree on that work before the build." },
      { question: "Will I be able to update the website myself?", answer: "Tell us what you need to update, such as services, photos, or blog posts. We can quote for a content editor and show your team how to use it. The starting static site is updated through its source files." },
      { question: "Can you set up Google Search Console for my website?", answer: "Yes. We offer SEO setup for businesses that want help submitting a sitemap, requesting indexing for key pages, and checking their status after launch. We confirm that work in the quote." },
      { question: "How long will the website take?", answer: "We agree a schedule once we know the page count, features, and when copy and photos will be ready. The schedule includes time for you to review the preview before launch." },
    ],
    cta: { heading: "Estimate the cost of your website", body: "Choose your website type, page count, and extras to see a starting estimate in Kenyan shillings.", label: "Estimate my website" },
    relatedWork: [
      "https://gedoholdings.co.ke",
      "https://lamonarealtors.co.ke",
      "https://threemice.co.ke",
    ],
  },
  "web-applications": {
    slug: "web-applications",
    name: "Web applications",
    title: "Web applications for bookings, orders, and customer accounts",
    intro: "We build booking systems, online stores, and customer portals for Kenyan businesses. Customers can complete a task in their browser, and your team can manage the booking, order, or request from one place.",
    seoTitle: "Web Application Development in Kenya",
    description: "Web application development in Kenya for booking systems, online stores, and customer portals, with payment integrations and staff tools scoped to your project.",
    quoteHint: "custom",
    overview: {
      heading: "Plan what happens before and after a customer submits",
      body: "In a booking app, a customer picks an available time and receives a confirmation. A staff member may need to reschedule that booking, and the customer needs to know what changed. We plan those steps together so both sides can complete their part of the task.",
    },
    included: [
      { heading: "Booking, ordering, or request flows", body: "We design the screens customers use to submit a request, see a confirmation, and recover if a required detail is missing or a slot is no longer available." },
      { heading: "Customer accounts and permissions", body: "Where the app needs sign-in, we agree which records customers, staff, and administrators can view or update. A customer portal might show past orders or the status of an open request." },
      { heading: "Checkout and payment status", body: "For a store, we agree how customers will place orders. If integrated payments are in scope, we connect the agreed provider and show how confirmed, pending, or failed payments affect each order." },
      { heading: "Staff tools", body: "We build the agreed screens your team needs to do things like update availability, review orders, or respond to customer requests." },
    ],
    scope: {
      heading: "Price the first release around one complete task",
      body: "The quote depends on what customers and staff need to do, the roles involved, and any integrations. A basic online store can start with a product catalogue and WhatsApp checkout. Integrated payments, bookings, and customer accounts are scoped separately. Hosting, payment provider fees, and ongoing maintenance are separate costs.",
      link: { href: "/quote?type=ecommerce", label: "Estimate a basic online store" },
    },
    process: [
      { number: "01", title: "Map the customer and staff steps", description: "We define what users submit, who can act on it, and which notifications or outside services are needed. We identify provider accounts your team needs to set up early." },
      { number: "02", title: "Try a working version", description: "Review the flow as a customer and as a staff member. We use your feedback to refine screens, status updates, and what happens when someone needs help." },
      { number: "03", title: "Test, launch, and train staff", description: "We test submissions, permissions, and any payment or notification outcomes included in scope. At handover, we show your team how to manage the live app." },
    ],
    faqs: [
      { question: "Do I need a website or a web application?", answer: "If visitors mainly need to learn about you and make an enquiry, a business website may be enough. If they need to book a slot, place an order, log in, or track a request, we can scope the application features that support those tasks." },
      { question: "How do WhatsApp ordering and integrated payments work?", answer: "With WhatsApp ordering, your team receives the order in chat and confirms payment separately. With an M-Pesa or card integration, the app can receive a payment confirmation from the provider and update the order status. We check provider requirements and costs before quoting the integration." },
      { question: "Can we launch with a smaller set of features?", answer: "Yes. A booking app might start with availability, reservations, and a staff calendar. Features such as online deposits or reminders can follow once the core booking process is working." },
      { question: "Can the application work with our current website?", answer: "Yes, depending on the platform and hosting. We review the current site and determine whether to integrate the app directly or link to it from the existing site." },
      { question: "What will our team need to manage after launch?", answer: "We document who handles routine tasks such as updating availability, reviewing orders, or managing user access. We also confirm who owns any provider accounts and who to contact for technical support." },
    ],
    cta: { heading: "Estimate your web application", body: "Start with the customer task you want to support and select the features it needs, such as bookings, accounts, or integrated payments.", label: "Estimate my web app" },
    relatedWork: ["https://threemice.co.ke"],
  },
  "custom-software": {
    slug: "custom-software",
    name: "Custom software",
    title: "Custom software for your team's daily work",
    intro: "We build internal systems for Kenyan businesses that need to track requests, handle approvals, automate routine tasks, or report across teams. We start with one process your staff need to run reliably.",
    seoTitle: "Custom Software Development in Kenya",
    description: "Custom software development in Kenya for internal tools, approvals, reporting, and integrations. Discuss your workflow and what your team needs to deliver it.",
    quoteHint: "",
    overview: {
      heading: "Follow a real task from request to completion",
      body: "Take a purchase request that starts in a spreadsheet and gets approved in a chat. An internal tool could give staff one place to submit the request, send it to the right approver, and record the decision. We walk through a real example from your business to see where a tool would save time or make responsibility clearer.",
    },
    included: [
      { heading: "Shared records and clear permissions", body: "We define what staff need to record, who can view or change it, and who owns the next step. For approvals, we agree which decisions the team needs to be able to trace." },
      { heading: "Automation with a clear fallback", body: "We automate agreed tasks such as routing approvals or copying records between systems. We also decide where an exception goes when a rule cannot handle it." },
      { heading: "Reports your team can act on", body: "Start with the questions staff need to answer, such as which requests are overdue or where approvals get held up. We agree the source and meaning of each measure before building the report." },
      { heading: "Data imports and integrations", body: "We review existing records, export options, and what connected systems let us read or update. The quote sets out which records move, which systems connect, and how we'll check the results." },
    ],
    scope: {
      heading: "Agree what the first version needs to handle",
      body: "We review whether configuring an existing tool can meet your needs. For a custom build, we quote after agreeing on the workflow, staff roles, integrations, and any data to migrate. We also agree which real scenarios the system must pass before launch. Hosting, ongoing support, and later changes are scoped separately.",
    },
    process: [
      { number: "01", title: "Map the current process", description: "We talk to the people doing the work and review the forms, spreadsheets, or tools they use. We identify where requests get stuck, work gets repeated, and staff need to step in." },
      { number: "02", title: "Review the build with staff", description: "Staff try working screens with representative cases, including exceptions. We use their feedback to refine fields, permissions, and automation rules." },
      { number: "03", title: "Test the switch and train users", description: "We check the agreed workflows and any data import, plan when staff will switch over, and hand over access and operating guidance." },
    ],
    faqs: [
      { question: "When is custom software worth considering?", answer: "It's worth discussing when an important process regularly gets delayed, creates duplicate work, or depends on one person knowing how everything fits together. A concrete example helps us assess how much work a better system could save." },
      { question: "Can you replace a process we run in spreadsheets?", answer: "Yes. We review the calculations and decisions the spreadsheets support. If records need to move, we agree how to handle blank fields and duplicates, where the data goes, and what your team will verify before the switch." },
      { question: "Can you connect to tools we already use?", answer: "Where those tools provide an API or another supported way to share data, we can scope the connection. We check what data is available, which permissions are required, and whether the provider charges for access." },
      { question: "What should we bring to the first call?", answer: "Bring one workflow you want to improve, a sample form or spreadsheet with sensitive details removed, and an example of where the process breaks down. If possible, include someone who does the work day to day." },
      { question: "How are changes and maintenance handled?", answer: "At handover, we confirm who manages user access and routine operation. If you'd like help with maintenance or future features, we agree on support responsibilities and costs separately." },
    ],
    cta: { heading: "Discuss a workflow you want to improve", body: "Tell us who does the work, what tools they use, and where delays or errors happen. We'll use the first call to understand what the project needs to cover.", label: "Discuss my software project" },
    relatedWork: [],
  },
  "seo-setup": {
    slug: "seo-setup",
    name: "SEO setup",
    title: "Make your website easier to find and understand",
    intro: "We start with the basics in Google Search Console so Google can discover the pages that matter to your business. Then we improve how those pages describe what you offer and show you where to track their progress.",
    seoTitle: "Technical & On-Page SEO Services in Kenya",
    description: "SEO setup in Kenya with Google Search Console, sitemap submission, indexing requests for key pages, and on-page improvements for your business.",
    quoteHint: "",
    overview: {
      heading: "Start with the pages customers need to find",
      body: "For a new site, we begin with the homepage and the main service or product pages. For an existing site, Google Search Console shows which priority pages are already indexed and which ones need attention. Once we know where those pages stand, we can focus on making each one clear and useful for the customers it serves.",
    },
    included: [
      { heading: "Google Search Console setup", body: "We verify your site in Google Search Console or review the setup you already have. We check and submit your XML sitemap, which gives Google a list of the pages you want it to discover. For individual priority pages, we use URL Inspection to check their status and request indexing where needed." },
      { heading: "Clearer titles and page content", body: "Review page titles, descriptions, headings, and internal links against what each page offers. We agree which pages need changes and how their content can better answer customers' questions." },
      { heading: "Consistent business details", body: "Check the business name, contact information, and location details used across your website and any local listings included in the scope. Customers should be able to recognise and contact the same business wherever they find it." },
      { heading: "A way to follow progress", body: "We show you where to check which pages Google has indexed and how often people click through from search. We also set up or review any analytics included in the project." },
    ],
    scope: {
      heading: "Know what the setup covers",
      body: "We start with your website address, priority services, target customers, and any existing search data. The quote identifies the pages and technical fixes included. A setup project is a defined piece of work; continuing content production, link outreach, and ongoing SEO management need their own scope. Search visibility takes more than a one-time change, and rankings or indexing cannot be guaranteed.",
    },
    process: [
      { number: "01", title: "Check and submit key pages", description: "Start in Google Search Console. We submit the sitemap, inspect the pages you want customers to find first, and request indexing for new or updated pages that are ready. Pages with technical issues go on the list of fixes." },
      { number: "02", title: "Fix issues and improve pages", description: "We fix agreed issues that prevent Google from indexing the right pages, such as a crawl block, an unintended redirect, or a setting that tells Google to skip a page. We also update titles, descriptions, headings, or internal links as agreed." },
      { number: "03", title: "Verify changes and hand over", description: "We recheck pages after fixes and request indexing where needed. You get a record of what we changed and which pages to follow up on in Search Console." },
    ],
    faqs: [
      { question: "How long does Google take to index a page?", answer: "Google says crawling can take a few days to a few weeks. Google decides whether to add a page to its index. You can check a specific page's latest reported status with URL Inspection in Search Console." },
      { question: "Can you work on a website you didn't build?", answer: "Yes. We'll review the platform and the access available before quoting. Some changes depend on your content management system or hosting, so we'll explain what can be changed directly and what may require help from your existing provider." },
      { question: "Does this include rewriting all my website content?", answer: "Only the content work listed in the agreed scope. Titles, descriptions, and heading improvements differ from a full page rewrite. We'll identify which pages need deeper work and price that clearly before starting." },
      { question: "Can you guarantee a first-page Google ranking?", answer: "No. Search engines decide which pages to index and where to rank them. This work improves the agreed technical and content foundations; results also depend on competition, the usefulness of your content, and other factors outside a setup project." },
      { question: "What access do you need?", answer: "Usually we start with your website address and a description of your priority services. Implementation may require website or hosting access, while reviewing search performance requires Search Console access. We'll specify what is needed for the agreed work." },
      { question: "Is SEO setup a monthly service?", answer: "This service is scoped as a defined setup or improvement project. If you need ongoing review, new content, or further technical work, that can be discussed separately. The handover makes clear what was completed and what remains to monitor." },
    ],
    cta: { heading: "Let's see what's holding your website back", body: "Share your website address and the services you want customers to find. We'll review the starting point and help you prioritise the next steps.", label: "Discuss my SEO setup" },
    relatedWork: [],
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICES);
