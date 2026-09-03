"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { revealOnScroll } from "@/lib/animations";

const SERVICES = [
  { number: "01", title: "Web development", href: "/services/web-development" },
  { number: "02", title: "UI/UX design", href: "/services/ui-ux-design" },
  { number: "03", title: "Data & analytics", href: "/services/data-analytics" },
];

export const Services = () => {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils
        .toArray<HTMLElement>(".service-card")
        .forEach((el, index) => revealOnScroll(el, "up", index * 0.15));
    },
    { scope: container }
  );

  return (
    <section ref={container} className="bg-dark">
      <div className="shell px-6 py-16 md:px-12 md:py-24">
        <h2 className="max-w-[720px] text-3xl font-bold tracking-tight text-text-light sm:text-4xl lg:text-5xl">
          Everything you need to get <em className="text-accent">online</em> and
          grow
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-px bg-border-dark md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <Link
              key={service.number}
              href={service.href}
              className="service-card reveal group flex min-h-[240px] flex-col justify-between bg-dark-card p-8 transition-colors hover:bg-dark-card-hover"
            >
              <span className="text-xs font-light tracking-wide text-accent">
                {service.number}
              </span>
              <div>
                <h3 className="text-xl font-semibold text-text-light md:text-2xl">
                  {service.title}
                </h3>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-text-muted-dark transition-all group-hover:gap-4 group-hover:text-accent">
                  Learn more
                  <span aria-hidden="true">&#8594;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
