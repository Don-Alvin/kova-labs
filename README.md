# KovaLab

Marketing site for KovaLab, built with Next.js App Router, React, TypeScript,
Tailwind CSS, and Sanity. The homepage includes a curated project showcase and
WhatsApp quote estimator. Blog posts and detailed case studies are managed in Sanity.

## Local setup

Use Node.js 22.18+ (Node 24 is used for development) and npm.

```sh
npm ci
```

On a fresh checkout, copy `.env.example` to `.env.local` and fill in the integrations
you use. Keep existing `.env.local` values when updating a working checkout.
The blank example values intentionally disable optional integrations.

```sh
npm run dev
```

Open http://localhost:3000. Next.js may choose the next available port if 3000 is busy.
Public environment values are embedded at build time; restart development or rebuild
a deployment after changing them. Never commit `.env.local` or API tokens.

## Configuration

| Variable | Purpose / behavior when absent |
| --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | International number without `+`; defaults to KovaLab's number. |
| `NEXT_PUBLIC_CALCOM_LINK` | Path after `cal.com/`; contact page shows email fallback when absent. |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Public Sanity project; blog/work lists show empty states when absent. |
| `NEXT_PUBLIC_SANITY_DATASET` | Defaults to `production`. |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID; analytics loads only after consent. |
| `MAILCHIMP_API_KEY`, `MAILCHIMP_AUDIENCE_ID`, `MAILCHIMP_SERVER_PREFIX` | Required together for newsletter subscriptions; absent configuration returns 503. |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Required together to share newsletter rate limits across server instances. |
| `TRUST_PROXY` | Set `true` only if your proxy overwrites `X-Forwarded-For` and the origin cannot be reached directly. Vercel is detected automatically. |

Sanity reads published content from a public dataset without a read token. The Studio
at `/studio` uses Sanity's own login and project permissions. Add your development and
production origins in the project's CORS configuration. Configure the project ID
before opening the Studio.

## Content workflow

- Use `/studio` to publish blog posts, categories, authors, and case studies.
- `/blog` and `/work` revalidate every 60 seconds. The newest case study gets the
  larger card on `/work`.
- The homepage's four device mockups are curated in `src/components/home/Work.tsx`,
  with screenshots in `public/work`. Sanity case studies are a separate collection;
  there is no homepage-feature toggle in the Studio.
- A missing document produces a 404. A failed CMS request is logged and throws,
  allowing Next.js to retain an existing successful ISR page. When no cached page
  is available, the error boundary offers a retry. A configured CMS outage during
  a fresh build fails the build rather than silently publishing empty content.
- The sitemap uses `_updatedAt` for CMS content. Static routes omit modification
  dates because there is no reliable per-page date in the source.

## Newsletter rate limiting

The endpoint allows five attempts per minute. The local fallback sweeps expired keys
and caps its map at 10,000 entries; it is process-local and resets on restart.
Without a trusted proxy, requests intentionally share an `unknown` bucket.

For multiple server instances, configure an Upstash Redis REST URL and token in the
hosting environment. The adapter uses an atomic expiring counter and hashed keys.
If a configured shared limiter fails, subscriptions return 503 rather than bypassing
the limit. Throttled responses return 429 with `Retry-After`. These tests use service
doubles and do not send emails or write to a live Redis database.

Provider references: [Upstash REST API](https://upstash.com/docs/redis/features/restapi)
and [Vercel request headers](https://vercel.com/docs/headers/request-headers).

## Validation

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

With a development or production server running:

```sh
npm run check:browser
```

The browser check uses `puppeteer-core` with an installed Chrome/Chromium/Edge,
without downloading another browser. Set `BROWSER_EXECUTABLE_PATH` if auto-detection
fails, and `BASE_URL` if the server uses another port. Set these variables in the
shell running the check; the script does not load `.env.local`.

Checks cover mobile menu focus/resize/reduced motion, FAQ interaction, the four
project layouts, no site-wide Cal requests, and readable content with JavaScript
disabled or its bundles blocked. They do not submit newsletter forms or contact leads.

## Deployment

Run `npm run build`, then `npm start`, or deploy through the Next.js integration on
Vercel. Set the production integrations in the hosting environment before building.
The build reads the configured public Sanity dataset. Google font access is needed
for `next/font` at build time. Keep the shared limiter configured on every instance
when scaling beyond a single process.

## Assets and design

Use the existing paper, dark, and orange tokens from `src/app/globals.css`. The
project mockups use flat square frames, with no panel shadows or extra palette.
Logos and screenshots are WebP: the logo lockups are 600 x 200, the mark is
1000 x 1000, and screenshots keep their original aspect ratios. Next Image handles
responsive delivery. The original tracked PNG versions remain available in Git history.

Before changing framework APIs, read the installed guides in
`node_modules/next/dist/docs`; this Next.js version differs from older releases.
