"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ENTRY_EASE, prefersReducedMotion } from "@/lib/animations";
import { calTrigger } from "@/lib/cal";
import { ArrowDown } from "lucide-react";

const HEADLINE_LINES = [
  ["Websites that make"],
  ["your business"],
  ["impossible", " to ignore"],
];

const STATS = [
  { value: 4, suffix: "+", label: "Projects shipped" },
  { value: 100, suffix: "%", label: "Client retention" },
  { value: 2, suffix: "yr", label: "In business" },
  { value: 12, suffix: "hr", label: "Avg. response time" },
];

export const Hero = () => {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const counters = gsap.utils.toArray<HTMLElement>(".stat-value");

      if (prefersReducedMotion()) {
        gsap.set(".hero-fade, .hero-line", { opacity: 1, x: 0, y: 0 });
        container.current
          ?.querySelectorAll(".hero-stat")
          .forEach((el) => el.classList.add("glass-blurred"));
        counters.forEach((cell) => {
          cell.textContent = String(cell.dataset.value ?? 0);
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: ENTRY_EASE } });

      tl.to(".hero-line", {
        y: 0,
        duration: 1.1,
        stagger: 0.1,
        delay: 0.2,
      })
        .to(".hero-description", { opacity: 1, y: 0, duration: 0.8 }, "-=0.7")
        .to(".hero-ctas", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(
          ".hero-stat",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            onComplete: () => {
              container.current
                ?.querySelectorAll(".hero-stat")
                .forEach((el) => el.classList.add("glass-blurred"));
            },
          },
          "-=0.6"
        );

      counters.forEach((cell) => {
        const target = Number(cell.dataset.value ?? 0);
        const counter = { current: 0 };
        gsap.to(counter, {
          current: target,
          duration: 1.8,
          delay: 1.1,
          ease: "power2.out",
          snap: { current: 1 },
          onUpdate: () => {
            cell.textContent = String(Math.round(counter.current));
          },
        });
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="ground-dark relative -mt-24 flex min-h-[92vh] items-center overflow-hidden md:-mt-28"
    >
      {/* The wordmark blown up as texture. Lowercase, because the brand is. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[22vw] font-extrabold leading-none tracking-tight text-text-light opacity-[0.03] blur-[2px]"
      >
        kova
      </span>

      <div className="shell relative z-10 grid w-full grid-cols-1 gap-16 px-6 pb-20 pt-36 md:px-12 lg:grid-cols-[1fr_360px] lg:items-center lg:gap-20">
        <div>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-text-light sm:text-5xl lg:text-6xl xl:text-7xl">
            {HEADLINE_LINES.map((line, index) => (
              <span key={index} className="hero-line-mask block">
                <span className="hero-line">
                  {line.map((part) =>
                    part === "impossible" ? (
                      <em key={part} className="text-accent">
                        {part}
                      </em>
                    ) : (
                      part
                    )
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-fade hero-description mt-8 max-w-[40ch] font-light leading-relaxed text-text-light/70">
            We help small businesses across East Africa get online with fast,
            professional websites that bring in customers and build trust.
          </p>

          <div className="hero-fade hero-ctas mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <button
              type="button"
              {...calTrigger()}
              className="w-full bg-accent px-8 py-4 text-sm font-medium text-dark transition-transform duration-300 hover:scale-105 sm:w-auto"
            >
              Book a free call
            </button>
            <a
              href="#work"
              className="glass-dark group inline-flex w-full items-center justify-center gap-2 px-8 py-4 text-sm font-medium text-text-light transition-transform duration-300 hover:scale-105 sm:w-auto"
            >
              See our work
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-y-1"
              >
                <ArrowDown size={16} strokeWidth={1.5} />
              </span>
            </a>
          </div>
        </div>

        <dl className="flex flex-col gap-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="glass-defer hero-stat flex items-baseline justify-between gap-4 p-5"
            >
              <dd className="text-3xl font-semibold tracking-[-0.04em] text-text-light">
                <span className="stat-value" data-value={stat.value}>
                  0
                </span>
                <span className="text-accent">{stat.suffix}</span>
              </dd>
              <dt className="text-sm font-light text-text-light/60">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
