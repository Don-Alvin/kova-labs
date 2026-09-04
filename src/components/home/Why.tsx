"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Zap, PenLine, Settings } from "lucide-react";
import { parallax, revealOnScroll } from "@/lib/animations";

const POINTS = [
  {
    Icon: Zap,
    title: "Built for speed",
    description: "loads in under 2 seconds",
  },
  {
    Icon: PenLine,
    title: "Designed to convert",
    description: "turns browsers into buyers",
  },
  {
    Icon: Settings,
    title: "Easy to manage",
    description: "update without a developer",
  },
];

export const Why = () => {
  const container = useRef<HTMLElement>(null);
  const image = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (image.current) {
        parallax(image.current, 18, 1.5);
        revealOnScroll(image.current, "left");
      }

      const copy = container.current?.querySelector<HTMLElement>(".why-copy");
      if (copy) revealOnScroll(copy, "right");

      gsap.utils
        .toArray<HTMLElement>(".why-point")
        .forEach((el, index) => revealOnScroll(el, "up", 0.2 + index * 0.12));
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="grid grid-cols-1 border-b border-border lg:grid-cols-2"
    >
      <div
        ref={image}
        className="reveal min-h-[280px] bg-bg-warm lg:min-h-[480px]"
        aria-hidden="true"
      />

      <div className="why-copy reveal px-6 py-16 md:px-12 md:py-20 lg:p-20">

        <h2 className="max-w-[42ch] text-3xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-4xl">
          Your customers are <em className="text-accent">searching</em> for you
          online
        </h2>

        <p className="mt-6 max-w-[58ch] font-light leading-relaxed text-text-muted">
          8 out of 10 customers look up a business online before calling,
          visiting, or buying. If your website is slow, outdated, or missing
          entirely, you&apos;re losing them to competitors who showed up first.
        </p>

        <ul className="mt-10">
          {POINTS.map((point) => (
            <li
              key={point.title}
              className="why-point reveal flex items-center gap-4 border-b border-border py-5"
            >
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center border border-border text-accent-text"
              >
                <point.Icon size={16} strokeWidth={1.5} />
              </span>
              <p className="text-sm">
                <span className="font-semibold">{point.title}</span>
                <span className="text-text-muted">, {point.description}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
