"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/animations";

const STATS = [
  { value: 15, suffix: "+", label: "Projects shipped" },
  { value: 100, suffix: "%", label: "Client retention" },
  { value: 3, suffix: "yr", label: "In business" },
  { value: 48, suffix: "hr", label: "Avg. response time" },
];

export const Stats = () => {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cells = gsap.utils.toArray<HTMLElement>(".stat-value");

      cells.forEach((cell) => {
        const target = Number(cell.dataset.value ?? 0);

        if (prefersReducedMotion()) {
          cell.textContent = String(target);
          return;
        }

        const counter = { current: 0 };
        gsap.to(counter, {
          current: target,
          duration: 1.8,
          ease: "power2.out",
          snap: { current: 1 },
          scrollTrigger: { trigger: cell, start: "top 92%", once: true },
          onUpdate: () => {
            cell.textContent = String(Math.round(counter.current));
          },
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="border-b border-border">
      <dl className="shell grid grid-cols-2 md:grid-cols-4">
        {STATS.map((stat, index) => (
          <div
            key={stat.label}
            className={`px-6 py-8 md:px-8 md:py-10 ${
              index < STATS.length - 1 ? "md:border-r md:border-border" : ""
            } ${index % 2 === 0 ? "border-r border-border md:border-r" : ""} ${
              index < 2 ? "border-b border-border md:border-b-0" : ""
            }`}
          >
            <dd className="text-3xl font-extrabold leading-none tracking-tight lg:text-5xl">
              <span className="stat-value" data-value={stat.value}>
                0
              </span>
              <span className="text-accent">{stat.suffix}</span>
            </dd>
            <dt className="mt-3 text-xs font-light tracking-wide text-text-muted">
              {stat.label}
            </dt>
          </div>
        ))}
      </dl>
    </section>
  );
};
