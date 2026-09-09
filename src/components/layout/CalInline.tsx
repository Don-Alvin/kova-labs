"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { CAL_LINK, EMAIL } from "@/lib/site";

/**
 * The booker loads only on the contact page. Falls back to email when
 * NEXT_PUBLIC_CALCOM_LINK is not configured, since the embed throws on an
 * empty calLink and would otherwise fail the build.
 */
export const CalInline = () => {
  useEffect(() => {
    if (!CAL_LINK) return;
    let cancelled = false;
    void getCalApi().then((cal) => {
      if (cancelled) return;
      const brand = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
      const tokens = {
        "cal-brand": brand,
        "cal-radius": "0px", "cal-radius-sm": "0px", "cal-radius-md": "0px",
        "cal-radius-lg": "0px", "cal-radius-xl": "0px", "cal-radius-full": "0px",
      };
      cal("ui", { layout: "month_view", cssVarsPerTheme: { light: tokens, dark: tokens } });
    }).catch(() => { console.error("Booking could not be initialized."); });
    return () => { cancelled = true; };
  }, []);
  if (!CAL_LINK) {
    return (
      <div className="flex min-h-[320px] flex-col items-start justify-center gap-4 p-8 text-text-light">
        <p className="text-lg font-semibold">Booking is not available here</p>
        <p className="max-w-[42ch] font-light leading-relaxed text-text-light/70">
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
