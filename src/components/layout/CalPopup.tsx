"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

const SQUARE_MARKER = "data-kovalab-square";

/**
 * Cal renders its modal inside a shadow root, so the global corner reset in
 * globals.css never reaches it. Inject the reset into each shadow root as it
 * appears, which keeps the popup on the zero radius rule.
 */
const squareOffShadowRoots = () => {
  const hosts = document.querySelectorAll<HTMLElement>(
    "cal-modal-box, cal-inline, cal-floating-button"
  );

  hosts.forEach((host) => {
    const root = host.shadowRoot;
    if (!root || root.querySelector(`style[${SQUARE_MARKER}]`)) return;

    const style = document.createElement("style");
    style.setAttribute(SQUARE_MARKER, "");
    style.textContent = "*, *::before, *::after { border-radius: 0 !important; }";
    root.appendChild(style);
  });
};

/**
 * Initializes the Cal.com embed once for the whole app. Any control carrying
 * the attributes from calTrigger() opens the popup, so CTAs anywhere in the
 * tree work without threading a handler through them.
 */
export const CalPopup = () => {
  useEffect(() => {
    const readToken = (name: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim();

    const brand = readToken("--accent");
    const squareRadii = {
      "cal-radius": "0px",
      "cal-radius-sm": "0px",
      "cal-radius-md": "0px",
      "cal-radius-lg": "0px",
      "cal-radius-xl": "0px",
      "cal-radius-full": "0px",
    };

    const init = async () => {
      const cal = await getCalApi();
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: { "cal-brand": brand, ...squareRadii },
          dark: { "cal-brand": brand, ...squareRadii },
        },
      });
    };

    void init();

    squareOffShadowRoots();
    const observer = new MutationObserver(squareOffShadowRoots);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
};

