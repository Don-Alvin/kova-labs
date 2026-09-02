"use client";

import { useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/animations";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { calTrigger } from "@/lib/cal";
import {
  ANALYTICS,
  EXTRA_PAGE_PRICE,
  FEATURES,
  SUPPORT_PLANS,
  WEBSITE_TYPES,
  formatKES,
  type QuoteOption,
} from "@/lib/quote";

const optionClass = (selected: boolean) =>
  `flex w-full cursor-pointer items-center justify-between gap-4 border border-l-4 bg-bg p-4 text-left transition-colors ${
    selected
      ? "border-border border-l-accent"
      : "border-border border-l-transparent hover:border-text hover:border-l-transparent"
  }`;

export const QuoteEstimator = () => {
  const [websiteType, setWebsiteType] = useState<string>(WEBSITE_TYPES[0].id);
  const [extraPages, setExtraPages] = useState(0);
  const [features, setFeatures] = useState<string[]>([]);
  const [analytics, setAnalytics] = useState<string[]>([]);
  const [support, setSupport] = useState<string>(SUPPORT_PLANS[0].id);

  const totalRef = useRef<HTMLSpanElement>(null);
  const shown = useRef(0);

  const toggle = (
    list: string[],
    setList: (next: string[]) => void,
    id: string
  ) => {
    setList(
      list.includes(id) ? list.filter((item) => item !== id) : [...list, id]
    );
  };

  const sumSelected = (options: QuoteOption[], ids: string[]) =>
    options
      .filter((option) => ids.includes(option.id))
      .reduce((total, option) => total + option.price, 0);

  const oneOffTotal = useMemo(() => {
    const base =
      WEBSITE_TYPES.find((option) => option.id === websiteType)?.price ?? 0;
    return (
      base +
      extraPages * EXTRA_PAGE_PRICE +
      sumSelected(FEATURES, features) +
      sumSelected(ANALYTICS, analytics)
    );
  }, [websiteType, extraPages, features, analytics]);

  const monthly =
    SUPPORT_PLANS.find((plan) => plan.id === support)?.price ?? 0;

  useGSAP(
    () => {
      if (!totalRef.current) return;

      if (prefersReducedMotion()) {
        totalRef.current.textContent = formatKES(oneOffTotal);
        shown.current = oneOffTotal;
        return;
      }

      const counter = { current: shown.current };
      gsap.to(counter, {
        current: oneOffTotal,
        duration: 0.6,
        ease: "power2.out",
        snap: { current: 1 },
        onUpdate: () => {
          if (totalRef.current) {
            totalRef.current.textContent = formatKES(
              Math.round(counter.current)
            );
          }
        },
        onComplete: () => {
          shown.current = oneOffTotal;
        },
      });
    },
    { dependencies: [oneOffTotal] }
  );

  return (
    <section className="border-b border-border bg-bg-warm">
      <div className="shell px-6 py-16 md:px-12 md:py-24">
        <SectionEyebrow>Get a quote</SectionEyebrow>
        <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          See what your project will cost
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="flex flex-col gap-10">
            <fieldset>
              <legend className="text-xs font-light tracking-wide text-text-muted">
                Website type
              </legend>
              <div className="mt-4 flex flex-col gap-3">
                {WEBSITE_TYPES.map((option) => (
                  <label
                    key={option.id}
                    className={optionClass(websiteType === option.id)}
                  >
                    <input
                      type="radio"
                      name="website-type"
                      value={option.id}
                      checked={websiteType === option.id}
                      onChange={() => setWebsiteType(option.id)}
                      className="sr-only"
                    />
                    <span className="text-sm">{option.label}</span>
                    <span className="shrink-0 text-sm font-medium">
                      {formatKES(option.price)}
                      {option.id === "custom" ? "+" : ""}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-xs font-light tracking-wide text-text-muted">
                Features
              </legend>
              <div className="mt-4 flex flex-col gap-3">
                <div className={optionClass(extraPages > 0)}>
                  <span className="text-sm">
                    Extra page (per page)
                    <span className="ml-2 text-text-muted">
                      {formatKES(EXTRA_PAGE_PRICE)}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setExtraPages((count) => Math.max(0, count - 1))
                      }
                      aria-label="Remove a page"
                      className="flex h-8 w-8 items-center justify-center border border-border text-text transition-colors hover:border-accent hover:text-accent"
                    >
                      &minus;
                    </button>
                    <span
                      aria-live="polite"
                      className="w-6 text-center text-sm font-medium"
                    >
                      {extraPages}
                    </span>
                    <button
                      type="button"
                      onClick={() => setExtraPages((count) => count + 1)}
                      aria-label="Add a page"
                      className="flex h-8 w-8 items-center justify-center border border-border text-text transition-colors hover:border-accent hover:text-accent"
                    >
                      +
                    </button>
                  </span>
                </div>

                {FEATURES.map((option) => (
                  <label
                    key={option.id}
                    className={optionClass(features.includes(option.id))}
                  >
                    <input
                      type="checkbox"
                      checked={features.includes(option.id)}
                      onChange={() => toggle(features, setFeatures, option.id)}
                      className="sr-only"
                    />
                    <span className="text-sm">{option.label}</span>
                    <span className="shrink-0 text-sm font-medium">
                      {formatKES(option.price)}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-xs font-light tracking-wide text-text-muted">
                Data and analytics
              </legend>
              <div className="mt-4 flex flex-col gap-3">
                {ANALYTICS.map((option) => (
                  <label
                    key={option.id}
                    className={optionClass(analytics.includes(option.id))}
                  >
                    <input
                      type="checkbox"
                      checked={analytics.includes(option.id)}
                      onChange={() =>
                        toggle(analytics, setAnalytics, option.id)
                      }
                      className="sr-only"
                    />
                    <span className="text-sm">{option.label}</span>
                    <span className="shrink-0 text-sm font-medium">
                      {formatKES(option.price)}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-xs font-light tracking-wide text-text-muted">
                Ongoing support
              </legend>
              <div className="mt-4 flex flex-col gap-3">
                {SUPPORT_PLANS.map((option) => (
                  <label
                    key={option.id}
                    className={optionClass(support === option.id)}
                  >
                    <input
                      type="radio"
                      name="support"
                      value={option.id}
                      checked={support === option.id}
                      onChange={() => setSupport(option.id)}
                      className="sr-only"
                    />
                    <span className="text-sm">{option.label}</span>
                    <span className="shrink-0 text-sm font-medium">
                      {option.price === 0
                        ? formatKES(0)
                        : `${formatKES(option.price)}/mo`}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <aside className="sticky bottom-0 z-30 -mx-6 border-t border-border bg-bg px-6 py-6 lg:bottom-auto lg:top-24 lg:mx-0 lg:border lg:p-8">
            <p className="text-xs font-light tracking-wide text-text-muted">
              Estimated project cost
            </p>
            <p className="mt-2 text-2xl font-extrabold tracking-tight lg:text-3xl">
              <span ref={totalRef}>{formatKES(oneOffTotal)}</span>
            </p>
            {monthly > 0 ? (
              <p className="mt-2 text-sm text-text-muted">
                plus {formatKES(monthly)} per month
              </p>
            ) : null}

            <p className="mt-6 hidden text-xs leading-relaxed text-text-muted lg:block">
              Domain registration and hosting fees are handled separately. We
              can help you choose the right provider.
            </p>

            <button
              type="button"
              {...calTrigger()}
              className="mt-6 w-full bg-accent px-6 py-4 text-sm font-medium text-text-light transition-colors hover:bg-text"
            >
              Discuss your quote
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
};
