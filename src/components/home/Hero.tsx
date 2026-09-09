"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import { ENTRY_EASE, prefersReducedMotion } from "@/lib/animations";
import { EMAIL } from "@/lib/site";
import { ArrowDown, ArrowRight } from "lucide-react";

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

      tl.from(".hero-line", {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.1,
        delay: 0.2,
      })
        .from(".hero-description", { opacity: 0, y: 20, duration: 0.8 }, "-=0.7")
        .from(".hero-ctas", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(
          ".hero-stat",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.08,
            onComplete: () => {
              container.current
                ?.querySelectorAll(".hero-stat")
                .forEach((el) => el.classList.add("glass-blurred"));
            },
          },
          "-=0.6"
        )
        .from(".hero-contact-card", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".hero-badge", { opacity: 0, duration: 0.8 }, "-=0.4");

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
      className="ground-dark relative -mt-24 flex items-center overflow-hidden lg:min-h-[680px]"
    >
      {/* The mark, blown up as texture behind the content, not a framed
          object sitting on top of it. Same treatment as the wordmark used to
          get: huge, faint, blurred, ignored by hit-testing. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] max-w-none -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.06] blur-[1px]"
      >
        <Image
          src="/logos/kovalab-mark.webp"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <div className="shell relative z-10 flex w-full flex-col items-center gap-10 px-6 pb-16 pt-32 md:px-12 lg:pt-28">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-[1fr_300px] lg:items-start lg:gap-10">
          {/* Left: the claim, the call to action, the numbers. Stretched to
              cover the space that used to be a separate middle column. */}
          <div className="flex flex-col items-start text-left">
            <h1 className="text-3xl font-extrabold leading-[1.05] tracking-[-0.04em] text-text-light sm:text-4xl lg:text-5xl xl:text-6xl">
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

            <p className="hero-fade hero-description mt-6 max-w-[42ch] font-light leading-relaxed text-text-light/70">
              We help small businesses across East Africa get online with
              fast, professional websites that bring in customers and build
              trust.
            </p>

            <div className="hero-fade hero-ctas mt-8">
              <Link
                href="#quote"
                className="group inline-flex items-center gap-3 bg-accent py-4 pl-8 pr-4 text-sm font-medium text-dark transition-transform duration-300 hover:scale-105"
              >
                Get a quote
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center bg-dark text-text-light transition-transform duration-300 group-hover:translate-x-1"
                >
                  <ArrowRight size={14} strokeWidth={1.5} />
                </span>
              </Link>
            </div>

            <dl className="mt-10 grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-defer hero-stat flex flex-col gap-1 p-4"
                >
                  <dd className="text-2xl font-semibold tracking-[-0.04em] text-text-light">
                    <span className="stat-value" data-value={stat.value}>
                      {stat.value}
                    </span>
                    <span className="text-accent">{stat.suffix}</span>
                  </dd>
                  <dt className="text-xs font-light text-text-light/60">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          {/* Right: the contact card, untouched, pinned to the same 300px
              column it always had. Paper on the dark ground, so it reads as a
              distinct object rather than blending into the hero's material. */}
          <div className="hero-fade hero-contact-card hidden w-full flex-col gap-4 bg-bg p-5 text-left shadow-[var(--shadow-lift)] lg:flex">
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 animate-pulse bg-accent"
              />
              <span className="text-xs font-light tracking-wide text-text-muted">
                Available for new projects
              </span>
            </div>
            <a
              href={`mailto:${EMAIL}`}
              className="text-sm text-text transition-colors duration-300 hover:text-accent-text"
            >
              {EMAIL}
            </a>
            <Link
              href="/contact"
              className="group inline-flex w-full items-center justify-between gap-2 self-start bg-dark px-4 py-3 text-xs font-medium text-text-light transition-all duration-300 hover:scale-105 hover:bg-accent hover:text-dark"
            >
              Get in touch
              <ArrowRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        <a
          href="#work"
          aria-label="Scroll to see our work"
          className="hero-badge relative hidden h-24 w-24 items-center justify-center text-text-light/70 transition-colors duration-300 hover:text-text-light lg:flex"
        >
          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
            className="hero-badge-ring absolute inset-0 h-full w-full"
          >
            <defs>
              <path
                id="hero-badge-path"
                d="M50,50 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0"
              />
            </defs>
            <text fontSize="7.6" letterSpacing="0.3" fill="currentColor">
              <textPath href="#hero-badge-path">
                Scroll to explore &middot; Scroll to explore &middot;
              </textPath>
            </text>
          </svg>
          <ArrowDown size={18} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};
