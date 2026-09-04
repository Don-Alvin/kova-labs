"use client";

import Cal from "@calcom/embed-react";
import { CAL_LINK, EMAIL } from "@/lib/site";

/**
 * The embedded booker used on the contact page, as opposed to the popup
 * that every CTA opens. Falls back to the direct contact routes when
 * NEXT_PUBLIC_CALCOM_LINK is not configured, since the embed throws on an
 * empty calLink and would otherwise fail the build.
 */
export const CalInline = () => {
  if (!CAL_LINK) {
    return (
      <div className="flex min-h-[320px] flex-col items-start justify-center gap-4 p-8">
        <p className="text-lg font-semibold">Booking is not available here</p>
        <p className="max-w-[42ch] font-light leading-relaxed text-text-muted">
          Email us and we will find a time that works.
        </p>
        <a
          href={`mailto:${EMAIL}`}
          className="bg-accent px-8 py-4 text-sm font-medium text-dark transition-transform duration-300 hover:scale-105"
        >
          {EMAIL}
        </a>
      </div>
    );
  }

  return (
    <Cal
      calLink={CAL_LINK}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  );
};
