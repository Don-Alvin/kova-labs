/**
 * Fires a GA4 event via the global gtag function Analytics.tsx installs.
 * A no-op before consent is accepted or if gtag never loaded: Analytics.tsx
 * doesn't even render the script tag until consent is "accepted", so this
 * silently does nothing rather than throwing in every other case.
 */
export const trackEvent = (
  name: string,
  params?: Record<string, string | number | boolean>
): void => {
  if (typeof window === "undefined") return;

  const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", name, params);
};
