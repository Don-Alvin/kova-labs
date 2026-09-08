export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** cubic-bezier(0.16, 1, 0.3, 1): a long, soft settle rather than a snap. */
export const ENTRY_EASE = "expo.out";
