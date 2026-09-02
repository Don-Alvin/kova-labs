"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/animations";
import { COOKIE_CONSENT_KEY } from "@/lib/site";

export type ConsentValue = "accepted" | "declined";

export const readConsent = (): ConsentValue | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    return stored === "accepted" || stored === "declined" ? stored : null;
  } catch {
    return null;
  }
};

const subscribeToConsent = (onChange: () => void) => {
  window.addEventListener("kovalab:consent", onChange);
  return () => window.removeEventListener("kovalab:consent", onChange);
};

/**
 * Reads the stored decision without a state-setting effect, so the banner
 * never renders on the server and never triggers a cascading render.
 */
export const useConsent = (): ConsentValue | null =>
  useSyncExternalStore(subscribeToConsent, readConsent, () => null);

export const CookieConsent = () => {
  const consent = useConsent();
  const [dismissed, setDismissed] = useState(false);
  const banner = useRef<HTMLDivElement>(null);

  const visible = consent === null && !dismissed;

  useGSAP(
    () => {
      if (!visible || !banner.current) return;

      if (prefersReducedMotion()) {
        gsap.set(banner.current, { yPercent: 0 });
        return;
      }

      gsap.fromTo(
        banner.current,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.5, ease: "power3.out", delay: 0.8 }
      );
    },
    { dependencies: [visible] }
  );

  const decide = useCallback((value: ConsentValue) => {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
    } catch {
      // Storage unavailable. The banner still dismisses for this session.
    }
    setDismissed(true);
    window.dispatchEvent(new CustomEvent("kovalab:consent", { detail: value }));
  }, []);

  if (!visible) return null;

  // translate-y-full keeps the banner offscreen in the first paint, so a
  // returning visitor who already decided never sees it flash.
  return (
    <div
      ref={banner}
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 z-50 w-full translate-y-full border-t border-border-dark bg-dark px-6 py-5 md:px-12"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-[560px] text-sm leading-relaxed text-text-muted-dark">
          We use cookies to understand how you use our site and improve your
          experience.
        </p>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="bg-accent px-6 py-3 text-sm font-medium text-text-light transition-colors hover:bg-text-light hover:text-dark"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => decide("declined")}
            className="border border-border-dark px-6 py-3 text-sm font-medium text-text-muted-dark transition-colors hover:border-text-light hover:text-text-light"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};
