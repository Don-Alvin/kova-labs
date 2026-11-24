import Image from "next/image";
import Link from "next/link";
import { LOCATION_COPY, LOCATION_FAQS, type Location } from "@/lib/locations";
import { WEBSITE_TYPES, formatKES } from "@/lib/quote";
import { waLink } from "@/lib/site";
import { LocationDetails } from "./LocationDetails";

const section = "shell px-6 py-16 md:px-12 md:py-24";
const heading = "max-w-[850px] text-3xl font-bold leading-tight tracking-[-0.04em] sm:text-4xl";
const body = "mt-5 max-w-[70ch] font-light leading-relaxed text-text-muted";
const link = "inline-block font-medium text-accent-text underline underline-offset-4";
const button = "inline-block bg-accent px-7 py-4 text-sm font-semibold text-dark transition-colors hover:bg-accent/90";

const services = [
  { title: "A business website that explains your services", text: "Show customers what you do, who you work with and how to get in touch. We build service pages, project galleries and enquiry routes for businesses such as consultants, contractors and property firms. Customers can call, email or start a WhatsApp conversation from their phone.", href: "/services/website-design", action: "Explore website design" },
  { title: "An online shop with a suitable ordering process", text: "Let customers browse products, check details and put together an order. A shop can send orders to WhatsApp for your team to confirm, or include integrated payments where required. We agree on products, stock handling, delivery information and payment options before building.", href: "/services/web-applications", action: "Explore web applications", note: "M-Pesa and card payment integrations are scoped separately. Sending an order to WhatsApp does not automatically confirm payment." },
  { title: "A booking system, customer portal or internal tool", text: "If customers need to book, log in, submit information or track a request, your project may need more than standard website pages. We also build custom tools for business workflows, with user roles, records and integrations defined around the task your team needs to complete.", href: "/services/custom-software", action: "Explore custom software" },
];
const projects = [
  { name: "Gedo Holdings", image: "gedoholdings", url: "https://gedoholdings.co.ke", description: "A corporate website presenting the company's construction and infrastructure work, with a project showcase to help visitors explore its services and experience." },
  { name: "Lamona Realtors", image: "lamonarealtors", url: "https://lamonarealtors.co.ke", description: "A responsive real estate website designed to present the business and its property information clearly across desktop and mobile screens." },
  { name: "Three Mice Computers", image: "threemicecomputers", url: "https://threemice.co.ke", description: "An online storefront focused on product discovery, helping visitors browse a technology catalogue and explore product information." },
];
const scopes = [
  ["Pages and content", "the services, products, projects and business information visitors need."],
  ["Mobile use", "readable layouts, accessible navigation and forms that work across screen sizes."],
  ["Enquiries or transactions", "the agreed contact, ordering, booking or payment journey."],
  ["Search foundations", "page titles, descriptions and crawlable pages, with additional SEO work agreed where needed."],
  ["Editing and handover", "which parts you can update and how your team will manage them after launch."],
];
const pricing = [
  { name: "Static website", scope: "Up to 3 pages, with a WhatsApp or email enquiry route" },
  { name: "Business website", scope: "5 to 8 pages, with dynamic content requirements agreed during scoping" },
  { name: "Basic online shop", scope: "Product catalogue, cart and WhatsApp checkout" },
  { name: "Custom web application", scope: "A scoped application built around the required customer or staff workflow" },
];
const steps = [
  ["Agree on the project", "We discuss your business, audience, required pages and features. You receive a scope covering the price, responsibilities, review stages and expected timeline."],
  ["Review the design and build", "Shared previews and scheduled reviews let you see progress and give feedback. We agree who approves content and decisions so the project can move forward."],
  ["Test and launch", "We check the agreed pages, mobile layouts, forms and features before launch. Domain and hosting setup is coordinated with the relevant provider."],
  ["Learn how to manage it", "We hand over the agreed access and explain how to use the editing tools included in your project. You can choose ongoing support or request separately scoped changes later."],
];

export function LocationPage({ location }: { location: Location }) {
  const copy = LOCATION_COPY[location];
  const audience = location === "Kenya" ? "businesses across Kenya" : `businesses in ${location}`;
  const quoteUrl = waLink(`Hi KovaLab, I'd like a quote for a website for my business in ${location}.`);
  return <>
    <section className="ground-dark relative -mt-24">
      <div className={`${section} relative z-10 !pt-40 md:!pt-48`}>
        <p className="text-sm font-medium tracking-wide text-accent">Serving {audience}</p>
        <h1 className="mt-5 max-w-[950px] text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-text-light sm:text-5xl lg:text-6xl">Web developers in {location} for business websites and online shops</h1>
        <p className="mt-8 max-w-[70ch] font-light leading-relaxed text-text-light/80">{copy.intro}</p>
        <p className="mt-5 max-w-[70ch] font-light leading-relaxed text-text-light/80">Business websites start from KSh 15,000, with the pages, features and final price agreed before work begins. Domain registration and hosting are billed separately.</p>
        <div className="mt-10 flex flex-wrap items-center gap-6"><Link href="/quote" className={button}>Estimate your project</Link><Link href="/work" className="font-medium text-text-light underline underline-offset-4">View our work</Link></div>
      </div>
    </section>
    <section className="border-b border-border bg-bg-warm"><div className={section}>
      <h2 className={heading}>What does your business need online?</h2>
      <div className="mt-10 grid gap-4 lg:grid-cols-3">{services.map(service => <article key={service.href} className="flex flex-col border border-border bg-bg p-6 md:p-8">
        <h3 className="text-xl font-semibold leading-snug">{service.title}</h3><p className={`${body} text-sm`}>{service.text}</p>{service.note && <p className="mt-4 text-sm leading-relaxed text-text-muted">{service.note}</p>}<Link href={service.href} className={`${link} mt-6 text-sm`}>{service.action}</Link>
      </article>)}</div>
      <div className="mt-12 border-t border-border pt-10"><h2 className="text-2xl font-bold tracking-tight">{copy.heading}</h2><p className={body}>{copy.context}</p></div>
    </div></section>
    <section className="border-b border-border"><div className={section}>
      <h2 className={heading}>Explore websites we have built</h2>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">{projects.map(project => <article key={project.url} className="overflow-hidden border border-border">
        <div className="relative aspect-[4/3] overflow-hidden bg-bg-warm"><Image src={`/work/${project.image}.webp`} alt={`${project.name} website`} fill sizes="(max-width: 1023px) 90vw, 33vw" className="object-cover object-top" /></div>
        <div className="p-6"><h3 className="text-xl font-semibold">{project.name}</h3><p className={`${body} text-sm`}>{project.description}</p><p className="mt-4 text-sm text-text-muted">Our role: website design and development.</p><a href={project.url} target="_blank" rel="noopener noreferrer" className={`${link} mt-6 text-sm`} aria-label={`Visit ${project.name} (opens in a new tab)`}>Visit {project.name}</a></div>
      </article>)}</div>
      <Link href="/work" className={`${link} mt-8`}>See more of our work</Link>
    </div></section>
    <section className="border-b border-border bg-bg-warm"><div className={section}>
      <h2 className={heading}>Designed for the way customers use your website</h2>
      <p className={body}>Your website should be easy to read and use on a phone, tablet or laptop. We plan the navigation, page content and contact options around the action a visitor needs to take.</p>
      <p className={body}>The project scope covers:</p><ul className="mt-6 grid gap-5 md:grid-cols-2">{scopes.map(([title, text]) => <li key={title} className="border-l-2 border-accent pl-5 leading-relaxed text-text-muted"><strong className="font-semibold text-text">{title}:</strong> {text}</li>)}</ul>
      <Link href="/services/seo-setup" className={`${link} mt-8`}>Explore our SEO setup service</Link>
    </div></section>
    <section id="pricing" className="border-b border-border"><div className={section}>
      <h2 className={heading}>Website design prices for {location === "Kenya" ? "businesses in Kenya" : `${location} businesses`}</h2>
      <p className={body}>Use these starting prices to plan your budget. The final quote depends on the agreed content, features and responsibilities.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{pricing.map((tier, index) => <article key={tier.name} className="border border-border bg-bg-warm p-6"><h3 className="text-lg font-semibold">{tier.name}</h3><p className="mt-5 text-sm text-text-muted">Starting price</p><p className="mt-1 text-2xl font-bold">{formatKES(WEBSITE_TYPES[index].price)}{index === 3 ? "+" : ""}</p><p className="mt-5 text-sm leading-relaxed text-text-muted">{tier.scope}</p></article>)}</div>
      <p className={body}>Domain registration and hosting fees are separate. Payment integrations, booking features, additional pages and ongoing support may add to the cost. The quotation will explain what is included and any separate charges.</p>
      <p className={body}>For the full cost of getting online, budget for the build, the domain, the hosting plan and any ongoing services you choose. Check renewal prices as well as introductory offers.</p>
      <Link href="/quote" className={`${button} mt-8`}>Estimate your project</Link>
    </div></section>
    <section className="border-b border-border bg-bg-warm"><div className={section}>
      <h2 className={heading}>Building your first website or replacing an existing one?</h2>
      <p className={body}>For a first website, start with your services, audience and the action you want customers to take. We can help define the pages and features before preparing the quotation.</p>
      <p className={body}>For a redesign, share your existing website and explain what needs to improve. We review the content and features you want to keep, where visitors encounter difficulties and whether any page addresses need to change. Content migration and redirects are included in the scope where required.</p>
    </div></section>
    <section className="border-b border-border"><div className={section}>
      <h2 className={heading}>From the first conversation to handover</h2>
      <ol className="mt-10 grid gap-6 md:grid-cols-2">{steps.map(([title, text], index) => <li key={title} className="border border-border p-6"><p className="text-sm font-medium text-accent-text">0{index + 1}</p><h3 className="mt-3 text-xl font-semibold">{title}</h3><p className={`${body} text-sm`}>{text}</p></li>)}</ol>
      <p className={body}>Consultations and project reviews can take place online. In-person meetings can be arranged where needed.</p>
    </div></section>
    <section className="border-b border-border bg-bg-warm"><div className={section}>
      <h2 className={heading}>Questions about working with KovaLab</h2>
      <div className="mt-10 max-w-[900px]">{LOCATION_FAQS.map(([question, answer]) => <details key={question} name="location-faq" className="border-b border-border py-5"><summary className="cursor-pointer text-lg font-semibold">{question}</summary><p className={body}>{answer}</p></details>)}</div>
    </div></section>
    <section className="ground-dark"><div className={section}>
      <h2 className={`${heading} text-text-light`}>Tell us what your website needs to do</h2>
      <p className="mt-6 max-w-[65ch] font-light leading-relaxed text-text-light/80">Share your business, the pages or features you need, your budget and preferred launch date. If you already have a website, include its address and what you want to improve.</p>
      <a href={quoteUrl} target="_blank" rel="noopener noreferrer" className={`${button} mt-8`}>Get a quote on WhatsApp</a>
      <p className="mt-6 max-w-[65ch] leading-relaxed text-text-light/80">Or use the <Link href="/quote" className="text-text-light underline underline-offset-4">project estimator</Link> to get an initial figure before we confirm the scope.</p>
    </div></section>
    <LocationDetails location={location} />
  </>;
}
