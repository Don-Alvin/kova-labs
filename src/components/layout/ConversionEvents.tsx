"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/** Capture navigation events without turning static content into client components. */
export const ConversionEvents = () => {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link) return;
      if (link.closest(".project-showcase")) {
        trackEvent("portfolio_project_clicked", { destination: link.href });
      }
      if (location.pathname.startsWith("/blog/") && link.getAttribute("href") === "/quote") {
        trackEvent("blog_cta_clicked", { article: location.pathname });
      }
      if (location.pathname === "/contact" && link.href.startsWith("https://wa.me/") && link.textContent?.trim() === "Chat with us") {
        trackEvent("contact_whatsapp_clicked", { context: "contact_page" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
};
