"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { revealOnScroll } from "@/lib/animations";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";

const STEPS = [
  {
    number: "01",
    title: "We talk",
    description:
      "A quick call to understand your business, your customers, and what you need. No jargon, no pressure.",
  },
  {
    number: "02",
    title: "We build",
    description:
      "We design and develop your site with your input at every step. You see progress weekly, not just at the end.",
  },
  {
    number: "03",
    title: "You grow",
    description:
      "Your site goes live with SEO, analytics, and training so you can manage it yourself. We're still a call away.",
  },
];

export const Process = () => {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils
        .toArray<HTMLElement>(".process-step")
        .forEach((el, index) => revealOnScroll(el, "up", index * 0.2));
    },
    { scope: container }
  );

  return (
    <section ref={container} className="border-b border-border">
      <div className="shell px-6 py-16 md:px-12 md:py-24">
        <SectionEyebrow>How we work</SectionEyebrow>
        <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Simple process, <em className="text-accent">real</em> results
        </h2>

        <ol className="mt-12 grid grid-cols-1 border border-border md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, index) => (
            <li
              key={step.number}
              className={`process-step reveal p-8 md:p-10 ${
                index < STEPS.length - 1
                  ? "border-b border-border lg:border-b-0 lg:border-r"
                  : ""
              } ${index === 0 ? "md:border-r md:border-border" : ""}`}
            >
              <p className="text-4xl font-extrabold tracking-tight text-accent opacity-20 lg:text-5xl">
                {step.number}
              </p>
              <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 max-w-[380px] text-sm leading-relaxed text-text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
