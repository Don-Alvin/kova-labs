import type { Post, PostCard } from "./sanity/types";
import type { PortableTextBlock } from "next-sanity";
import { WEBSITE_TYPES, FEATURES, EXTRA_PAGE_PRICE, SUPPORT_PLANS, formatKES } from "./quote";

const blocks: PortableTextBlock[] = [];
const block = (text: string, style = "normal", href?: string) => blocks.push({
  _type: "block", _key: `block-${blocks.length}`, style,
  markDefs: href ? [{ _type: "link", _key: "link", href }] : [],
  children: [{ _type: "span", _key: "text", text, marks: href ? ["link"] : [] }],
});

block("A useful website budget starts with what your customers need to do. A small site that explains your services and opens a WhatsApp conversation has a different scope from a store, booking system, or customer portal. KovaLab websites start from KSh 15,000. This guide explains our published estimator, not an average price for every provider in Kenya.");
block("KovaLab’s starting prices in 2026", "h2");
for (const option of WEBSITE_TYPES) block(`${option.label}: from ${formatKES(option.price)}.`);
block("These are starting estimates for the stated scope. A final quote confirms the pages, integrations, content responsibilities, delivery schedule, and support. More complex projects need a scope discussion before a price can be confirmed.");
block("What the website type changes", "h2");
block("A static website suits a business that needs a clear introduction, service information, and an enquiry route. Our entry option covers up to three pages with a WhatsApp or email form. Choose a business website when you need five to eight pages and dynamic content. An online store adds a product catalogue and shopping journey; the basic estimator option uses WhatsApp checkout. A custom web application is appropriate when visitors need to complete a workflow such as signing in, booking, or managing records.");
block("See our website design service for the approach to structure, mobile layouts, and launch.", "normal", "/services/website-design");
block("What can add to the cost?", "h2");
block(`Additional pages are ${formatKES(EXTRA_PAGE_PRICE)} each in the estimator. Features are selected separately, so you can see how each one changes the total:`);
for (const feature of FEATURES) block(`${feature.label}: ${formatKES(feature.price)}.`);
block("Integrations may also have provider charges or requirements outside the development fee. Confirm those with the selected provider before committing to a payment or booking setup. Custom workflows, data migration, and unusually complex content need individual scoping.");
block("A worked example", "h2");
const business = WEBSITE_TYPES.find(option => option.id === "business")!;
const blog = FEATURES.find(option => option.id === "blog")!;
block(`A business website at ${formatKES(business.price)}, with a blog at ${formatKES(blog.price)} and two extra pages at ${formatKES(2 * EXTRA_PAGE_PRICE)}, has an estimated build total of ${formatKES(business.price + blog.price + 2 * EXTRA_PAGE_PRICE)}. Hosting, domain registration, and optional monthly support are separate. This example uses the same figures as the quote calculator.`);
block("Plan for costs after launch", "h2");
block("Domain registration and hosting are arranged separately from the build. Compare the renewal price as well as the introductory price, and confirm who owns the domain and controls the hosting account. Content writing, photography, paid software, and payment processing can also affect the overall budget; ask what is included in your particular quote.");
block(`The estimator offers handover without a monthly support plan, basic maintenance at ${formatKES(SUPPORT_PLANS[1].price)} per month, or full support at ${formatKES(SUPPORT_PLANS[2].price)} per month. Agree the work covered by a support plan and how additional requests will be quoted.`);
block("How to compare website quotes", "h2");
block("Compare the same scope: page count, content editing, mobile layouts, forms, integrations, SEO setup, and handover. Ask which costs recur, who supplies the content, how revisions are handled, and what happens after launch. A clear written scope makes a price easier to judge than a long list of technical terms.");
block("SEO setup is a separate service for reviewing search foundations, business information, and measurement.", "normal", "/services/seo-setup");
block("Common questions", "h2");
block("Does the starting price include hosting?", "h3");
block("No. Domain and hosting costs are separate. We can help you choose and configure them, with fees confirmed for the provider you select.");
block("Can I start small and add features later?", "h3");
block("Yes. Explain your likely next step before the build so the initial structure can support it. Additional work is scoped and quoted when you are ready.");
block("Is the calculator a final quote?", "h3");
block("No. It is a transparent estimate using the options you choose. We confirm the scope and final price before work starts.");
block("Do I need to be in Kisumu?", "h3");
block("No. KovaLab is based in Kisumu and works remotely with businesses across Kenya and East Africa.");
block("Build your estimate", "h2");
block("Choose your website type and the features you actually need. The calculator prepares a WhatsApp message with your selections so we can discuss a concrete scope.");
block("Use the quote estimator", "normal", "/quote");

export const launchPost: Post = {
  _id: "launch-website-cost-2026",
  slug: "how-much-does-a-website-cost-in-kenya-2026",
  title: "How Much Does a Website Cost in Kenya in 2026?",
  excerpt: "KovaLab websites start from KSh 15,000. Compare website types, optional features, and ongoing costs before you plan your budget.",
  publishedAt: "2026-09-22T09:00:00+03:00",
  _updatedAt: "2026-09-22T09:00:00+03:00",
  readTime: 5,
  category: { name: "Website planning", slug: "website-planning" },
  body: blocks,
};

export const mergeLaunchPost = (posts: PostCard[]): PostCard[] => {
  if (posts.some(post => post.slug === launchPost.slug)) return posts;
  // The interactive blog grid only needs card metadata, not the article body.
  const card: PostCard = {
    _id: launchPost._id,
    slug: launchPost.slug,
    title: launchPost.title,
    excerpt: launchPost.excerpt,
    publishedAt: launchPost.publishedAt,
    _updatedAt: launchPost._updatedAt,
    readTime: launchPost.readTime,
    category: launchPost.category,
  };
  return [...posts, card];
};
