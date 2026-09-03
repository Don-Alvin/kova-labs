import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const REVEAL_START = "top 85%";

export type RevealDirection = "up" | "left" | "right" | "fade";

const OFFSETS: Record<RevealDirection, { x?: number; y?: number }> = {
  up: { y: 40 },
  left: { x: -60 },
  right: { x: 60 },
  fade: {},
};

/**
 * Reveals a target on scroll. Returns a cleanup function, or undefined when
 * reduced motion is preferred and the element is simply shown.
 */
export const revealOnScroll = (
  target: HTMLElement,
  direction: RevealDirection = "up",
  delay = 0
): void => {
  if (prefersReducedMotion()) {
    gsap.set(target, { opacity: 1, x: 0, y: 0 });
    return;
  }

  // Below the tablet breakpoint the layout is a single column, so a sideways
  // reveal has nothing to reveal from and its 60px offset pushes the element
  // past the right edge while it animates. Fall back to the vertical reveal.
  const stacked = window.innerWidth < 768;
  const resolved: RevealDirection =
    stacked && (direction === "left" || direction === "right")
      ? "up"
      : direction;

  gsap.fromTo(
    target,
    { opacity: 0, ...OFFSETS[resolved] },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.9,
      delay,
      ease: "power3.out",
      scrollTrigger: { trigger: target, start: REVEAL_START, once: true },
    }
  );
};

/**
 * Vertical parallax on scroll, scrubbed against the scroll position.
 */
export const parallax = (
  target: HTMLElement,
  yPercent: number,
  scrub: number
): void => {
  if (prefersReducedMotion()) return;

  gsap.to(target, {
    yPercent,
    ease: "none",
    scrollTrigger: {
      trigger: target,
      start: "top bottom",
      end: "bottom top",
      scrub,
    },
  });
};

export { gsap, ScrollTrigger };
