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
