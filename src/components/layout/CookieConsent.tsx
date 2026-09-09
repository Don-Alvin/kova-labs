"use client";

import { useConsent, saveConsent } from "@/lib/consent";

export const CookieConsent = () => {
  const consent = useConsent();
  if (consent !== null) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="consent-banner ground-dark fixed bottom-0 left-0 z-50 w-full border-t border-border-dark px-6 py-5 md:px-12"
    >
      <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-[42ch] text-sm leading-relaxed text-text-light">
          We use cookies to understand how you use our site and improve your
          experience.
        </p>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => saveConsent("accepted")}
            className="bg-accent px-6 py-3 text-sm font-medium text-dark transition-colors hover:bg-text-light hover:text-dark"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => saveConsent("declined")}
            className="border border-border-dark px-6 py-3 text-sm font-medium text-text-muted-dark transition-colors hover:border-text-light hover:text-text-light"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};
