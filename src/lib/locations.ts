export const LOCATIONS = ["Kenya", "Nairobi", "Kisumu", "Nakuru"] as const;
export type Location = (typeof LOCATIONS)[number];

export const LOCATION_COPY: Record<Location, { intro: string; heading: string; context: string }> = {
  Nairobi: {
    intro: "KovaLab designs and builds websites, online shops and web applications for SMEs and professionals in Nairobi. Give customers a place to explore your services, browse products, request a quote or make a booking.",
    heading: "A clear online journey for your Nairobi customers",
    context: "Whether customers need a professional service, a property enquiry or products delivered within Nairobi, they should be able to find the relevant information quickly. We agree how your website explains your service coverage, handles enquiries and passes orders to your team before design begins.",
  },
  Kisumu: {
    intro: "KovaLab designs and builds websites, online shops and web applications for businesses and professionals in Kisumu. Present your services, show your work and give customers a clear way to enquire, order or book.",
    heading: "Website design around your Kisumu business",
    context: "Your website can help customers prepare before they call or visit: checking services, viewing products, finding opening hours or asking about availability. We plan the information and contact routes around how your business works, whether you serve customers at your premises, at their location or online.",
  },
  Nakuru: {
    intro: "KovaLab designs and builds websites, online shops and web applications for SMEs and professionals in Nakuru. Help customers understand what you offer, explore your products or projects and take the next step with your team.",
    heading: "Help Nakuru customers move from browsing to an enquiry",
    context: "For a service business, shop or professional practice in Nakuru, a useful website answers practical questions before customers get in touch. We define how to present your services, product availability, delivery coverage or appointment requirements, then build the enquiry or ordering journey around those decisions.",
  },
  Kenya: {
    intro: "KovaLab designs and builds websites, online shops and web applications for businesses across Kenya. From a first business website to a customer portal, we help you give customers a clear place to explore, enquire, order or book.",
    heading: "Website design for the way your business serves Kenya",
    context: "A business serving one city needs a different customer journey from a shop delivering across Kenya. We agree the service areas, delivery information, contact routes and payment requirements your customers need. Shared previews and scheduled online reviews keep your team involved wherever you work.",
  },
};

export const LOCATION_FAQS = [
  ["How long does it take to build a website?", "Most business website projects take two to four weeks once the scope, content and feedback arrangements are ready. Online shops and custom applications may take four to eight weeks or longer, depending on their complexity. We agree a timeline for your project before starting."],
  ["Do I need to provide the text and photos?", "Share your logo, service information, product details, photos and any existing copy. We review what is available and agree what needs to be prepared. Writing, photography or large content-upload requirements should be included in the scope if needed."],
  ["Do your prices include a domain and hosting?", "No. Domain registration and hosting fees are billed separately from development. We help you choose a suitable setup and explain the initial and renewal costs before you commit to a provider."],
  ["Can my customers order through WhatsApp or pay with M-Pesa?", "Yes. We can scope a product catalogue with WhatsApp ordering or a shop with integrated payments. They involve different features and costs, so we agree how orders, payments and confirmations should work before building."],
  ["Can I update the website myself?", "We agree which sections need to be editable before development starts. These may include text, images, products or blog posts. The handover explains how to use the editing tools included in your project."],
  ["Who owns the website and accounts after launch?", "Ownership, account access and handover are set out in the project agreement. Your business should control its domain and relevant owner accounts. The agreement also identifies any third-party platforms, software licences and subscriptions, including their costs and conditions."],
  ["What happens if I need help after launch?", "Ongoing maintenance and support are available separately. We agree what the arrangement covers, such as updates, fixes and content changes. You can also request a quotation for one-off changes."],
] as const;
