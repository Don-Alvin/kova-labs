"use client";

import Cal from "@calcom/embed-react";
import { CAL_LINK } from "@/lib/site";

/**
 * The embedded booker used on the contact page, as opposed to the popup
 * that every CTA opens.
 */
export const CalInline = () => (
  <Cal
    calLink={CAL_LINK}
    style={{ width: "100%", height: "100%", overflow: "scroll" }}
    config={{ layout: "month_view" }}
  />
);
