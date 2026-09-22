# Audit implementation, 22 September 2026

The user approved the audit with one exception: retain the existing phone number. The configured WhatsApp number and default `+254 785 629 612` are unchanged.

## Implemented

- Kisumu positioning in page copy, footer, mobile navigation, metadata, and business schema.
- KSh 15,000 entry website price, using the same pricing data for the calculator, WhatsApp message, and launch article. Existing optional feature prices are retained.
- Website Design, Web Applications, Custom Software, and SEO Setup pages, with matching navigation and service schema.
- Permanent redirects from Data & Analytics to SEO Setup, and the old Web Development and UI/UX URLs to Website Design. Only canonical destinations appear in the sitemap.
- Existing three-project showcase on Work, with challenge/solution copy, expandable project overviews, desktop/tablet/mobile screenshots, and live links. No outcome metrics or unverified technology stacks were added.
- First pricing article, including business-focused pricing examples, recurring cost explanations, FAQ, service links, and one primary quote CTA. The audit's separate draft was not supplied, so this is newly written copy based on the estimator.
- A bundled article supplies initial content; a Sanity post with the same slug takes precedence. New CMS posts remain supported. The first article does not link to an unpublished related article.
- Article author attribution, published/updated dates, BlogPosting and breadcrumb schema, canonical metadata, and a generated 1200 × 630 social image.
- FAQ schema generated from the visible answers, removal of meta keywords and the unsupported “8 out of 10” claim, and homepage section navigation.
- Hero image eager loading and removal of the logo's preload in favor of eager loading. Responsive preloads with `imagesrcset` are valid even without `href`; browser checks only reject preloads with neither source.
- Consent-aware quote, WhatsApp, portfolio, blog CTA, and booking events. Newsletter submission uses `newsletter_signup_requested`, since requesting double opt-in is not a confirmed subscription.
- Newsletter source tagging and distinct messages for pending, subscribed, and inactive contacts.

## External and follow-up work

- Deploy the reviewed code before requesting indexing or checking production Core Web Vitals.
- Search Console: inspect redirect exclusions, confirm all submitted URLs return canonical 200 responses, resubmit the sitemap, and request indexing for the changed pages.
- Google Business Profile and other listings: update location/services/pricing as applicable, retaining the current phone number.
- Mailchimp: the configured audience is reachable (HTTP 200). Its audience-level `double_optin` setting is false; the API explicitly sends `status_if_new: pending`. A controlled inbox confirmation test is still needed. No marketing message or test subscription has been sent.
- Keep CSP in report-only mode until violations from the final production Cal.com, analytics, and Sanity flows have been reviewed. Switching without that evidence could block booking or Studio.
- Confirm project-specific technology and outcomes before expanding the overviews into full technical case studies.
- Continue the audit's weekly editorial sequence and monthly measurement review. The remaining seven articles are future editorial work, not published placeholders.
- Record confirmed newsletter subscriptions from Mailchimp confirmation data rather than counting the initial form request as `newsletter_subscribed`.

## Verification commands

```powershell
npm run typecheck
npm run lint
npm test
npm run build
# Against a running local production server:
$env:BASE_URL = 'http://localhost:3100'
node scripts/check-browser.mjs
node scripts/check-audit.mjs
```

The audit browser check covers 360, 390, 768, and 1440 px widths; public routes; unchanged phone links; quote totals; structured data; invalid image preloads; redirects; the sitemap; and the article social image. Screenshots are stored under the ignored `artifacts/audit/` directory.
