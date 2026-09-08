export type QuoteOption = {
  id: string;
  label: string;
  price: number;
};

export const WEBSITE_TYPES: QuoteOption[] = [
  {
    id: "static",
    label: "Static website (up to 4 pages, WhatsApp/email form)",
    price: 10000,
  },
  {
    id: "business",
    label: "Business website (5-8 pages, dynamic content)",
    price: 20000,
  },
  {
    id: "ecommerce",
    label: "E-commerce store (basic platform, WhatsApp checkout)",
    price: 30000,
  },
  { id: "custom", label: "Custom web application", price: 50000 },
];

export const EXTRA_PAGE_PRICE = 2000;

export const FEATURES: QuoteOption[] = [
  { id: "blog", label: "Blog / news section", price: 8000 },
  { id: "mpesa", label: "M-Pesa integration", price: 10000 },
  { id: "paystack", label: "Paystack checkout", price: 5000 },
  { id: "accounts", label: "User accounts / login system", price: 12000 },
  { id: "booking", label: "Booking / appointment system", price: 10000 },
  { id: "chat", label: "Live chat widget", price: 3000 },
  { id: "i18n", label: "Multi-language support (EN/SW)", price: 8000 },
];

export const ANALYTICS: QuoteOption[] = [
  { id: "ga", label: "Google Analytics setup", price: 3000 },
  { id: "dashboard", label: "Custom analytics dashboard", price: 35000 },
];

export const SUPPORT_PLANS: QuoteOption[] = [
  { id: "none", label: "None (handover only)", price: 0 },
  {
    id: "basic",
    label: "Basic maintenance (updates, bug fixes)",
    price: 3000,
  },
  {
    id: "full",
    label:
      "Full support (maintenance, content updates, priority response)",
    price: 7000,
  },
];

export const formatKES = (value: number): string =>
  `KES ${value.toLocaleString("en-KE")}`;

/**
 * Builds the WhatsApp message from the estimator's selections, so the
 * visitor arrives in chat with their quote already spelled out instead of
 * a back-and-forth over what they need.
 */
export const buildQuoteMessage = (input: {
  websiteType: string;
  extraPages: number;
  features: string[];
  analytics: string[];
  support: string;
  total: number;
  monthly: number;
}): string => {
  const type = WEBSITE_TYPES.find((option) => option.id === input.websiteType);
  const selectedFeatures = FEATURES.filter((option) =>
    input.features.includes(option.id)
  );
  const selectedAnalytics = ANALYTICS.filter((option) =>
    input.analytics.includes(option.id)
  );
  const support = SUPPORT_PLANS.find((option) => option.id === input.support);

  const lines = ["Hi KovaLab, I'd like a quote for:"];

  if (type) {
    lines.push(`- Website type: ${type.label} (${formatKES(type.price)})`);
  }
  if (input.extraPages > 0) {
    lines.push(
      `- Extra pages: ${input.extraPages} (${formatKES(
        input.extraPages * EXTRA_PAGE_PRICE
      )})`
    );
  }
  if (selectedFeatures.length > 0) {
    lines.push(
      `- Features: ${selectedFeatures
        .map((option) => `${option.label} (${formatKES(option.price)})`)
        .join(", ")}`
    );
  }
  if (selectedAnalytics.length > 0) {
    lines.push(
      `- Analytics: ${selectedAnalytics
        .map((option) => `${option.label} (${formatKES(option.price)})`)
        .join(", ")}`
    );
  }
  if (support && support.price > 0) {
    lines.push(`- Support: ${support.label} (${formatKES(support.price)}/mo)`);
  }

  lines.push(
    `Estimated total: ${formatKES(input.total)}${
      input.monthly > 0 ? ` + ${formatKES(input.monthly)}/mo` : ""
    }`
  );

  return lines.join("\n");
};
