import type { NextConfig } from "next";

// Report-only for now, per the launch checklist: log violations without
// blocking anything, so it can be tuned against GA, Cal.com, and Sanity in
// production before ever switching to Content-Security-Policy (enforced).
// No report-uri configured yet; violations show in the browser console.
const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://app.cal.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://cdn.sanity.io https://www.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://*.sanity.io https://api.cal.com",
  "frame-src https://app.cal.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  // @sanity/workbench ships raw .ts source, which Turbopack refuses to load in
  // dev ("Unknown module type"). Transpiling it lets /studio compile.
  transpilePackages: ["@sanity/workbench", "@sanity/sdk-react"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Content-Security-Policy-Report-Only",
            value: CSP_REPORT_ONLY,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
