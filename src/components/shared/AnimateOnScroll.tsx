"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { revealOnScroll, type RevealDirection } from "@/lib/animations";

type AnimateOnScrollProps = {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Wraps a block and reveals it once as it enters the viewport.
 * The hidden start state lives in globals.css so there is no flash before
 * GSAP takes over, and reduced motion resolves it to a plain reveal.
 */
export const AnimateOnScroll = ({
  children,
  direction = "up",
  delay = 0,
  as: Tag = "div",
  className = "",
}: AnimateOnScrollProps) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (ref.current) revealOnScroll(ref.current, direction, delay);
  }, [direction, delay]);

  return (
    <Tag ref={ref} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
};
