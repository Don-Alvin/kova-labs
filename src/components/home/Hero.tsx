"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { parallax, prefersReducedMotion } from "@/lib/animations";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { calTrigger } from "@/lib/cal";

const HEADLINE_LINES = [
  ["Websites that make"],
  ["your business"],
  ["impossible", " to ignore"],
];

export const Hero = () => {
  const container = useRef<HTMLElement>(null);
  const image = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(".hero-fade, .hero-line", { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".hero-eyebrow", { opacity: 1, duration: 0.6, delay: 0.2 })
        .to(
          ".hero-line",
          { y: 0, duration: 1.1, stagger: 0.1, ease: "power4.out" },
          "-=0.3"
        )
        .to(".hero-description", { opacity: 1, duration: 0.8 }, "-=0.7")
        .to(".hero-ctas", { opacity: 1, duration: 0.6 }, "-=0.5")
        .to(".hero-image", { opacity: 1, duration: 1 }, "-=0.6");

      if (image.current) parallax(image.current, -12, 1.5);
    },
    { scope: container }
  );

  return (
    <section ref={container} className="border-b border-border">
      <div className="shell grid grid-cols-1 items-center gap-12 px-6 py-16 md:px-12 md:py-24 lg:grid-cols-[55fr_45fr] lg:gap-16">
        <div>
          <SectionEyebrow className="hero-fade hero-eyebrow opacity-0">
            Software studio, Nairobi
          </SectionEyebrow>

          <h1 className="mt-8 text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
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

          <p className="hero-fade hero-description mt-8 max-w-[380px] leading-relaxed text-text-muted opacity-0">
            We help small businesses across East Africa get online with fast,
            professional websites that bring in customers and build trust.
          </p>

          <div className="hero-fade hero-ctas mt-10 flex flex-col items-start gap-4 opacity-0 sm:flex-row sm:items-center sm:gap-6">
            <button
              type="button"
              {...calTrigger()}
              className="w-full bg-accent px-8 py-4 text-sm font-medium text-text-light transition-colors hover:bg-text sm:w-auto"
            >
              Book a free call
            </button>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 text-sm font-medium text-text transition-colors hover:text-accent"
            >
              See our work
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-y-1"
              >
                &#8595;
              </span>
            </a>
          </div>
        </div>

        <div
          ref={image}
          className="hero-fade hero-image min-h-[320px] border-l border-border bg-bg-warm opacity-0 lg:min-h-[500px]"
          aria-hidden="true"
        />
      </div>
    </section>
  );
};
