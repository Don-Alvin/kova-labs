"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/animations";
import { WhatsAppCTA } from "@/components/layout/WhatsAppCTA";
import { trackEvent } from "@/lib/analytics";
import { Minus, Plus } from "lucide-react";
import {
  ANALYTICS,
  EXTRA_PAGE_PRICE,
  FEATURES,
  SUPPORT_PLANS,
  WEBSITE_TYPES,
  buildQuoteMessage,
  formatKES,
  type QuoteOption,
} from "@/lib/quote";

const optionClass = (selected: boolean) =>
  `flex w-full cursor-pointer items-center justify-between gap-4 border bg-bg p-4 text-left transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent ${
    selected ? "border-accent" : "border-border hover:border-text"
  }`;

/** Square marker: the system's smallest unit of the logo geometry. */
const Mark = ({ selected }: { selected: boolean }) => (
  <span
    aria-hidden="true"
    className={`h-[9px] w-[9px] shrink-0 border transition-colors ${
      selected ? "border-accent bg-accent" : "border-border"
    }`}
  />
);

type QuoteEstimatorProps = {
  /** Preselects a website type, e.g. from a service page link. */
  initialType?: string;
};

export const QuoteEstimator = ({ initialType }: QuoteEstimatorProps = {}) => {
  const [websiteType, setWebsiteType] = useState<string>(
    WEBSITE_TYPES.some((option) => option.id === initialType) && initialType
      ? initialType
      : WEBSITE_TYPES[0].id
  );
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

  const whatsappMessage = buildQuoteMessage({
    websiteType,
    extraPages,
    features,
    analytics,
    support,
    total: oneOffTotal,
    monthly,
  });

  // Fires once per real change to the estimate, not on the initial mount:
  // the ref starts false and flips true only after this effect has run
  // once, so the first render (nothing chosen yet) never counts as "use".
  const hasInteracted = useRef(false);
  useEffect(() => {
    if (hasInteracted.current) {
      trackEvent("quote_estimator_use", { estimate_kes: oneOffTotal });
    }
    hasInteracted.current = true;
  }, [websiteType, extraPages, features, analytics, support, oneOffTotal]);

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
    <section id="quote" className="scroll-mt-24 border-b border-border bg-bg-warm">
      <div className="shell px-6 py-16 md:px-12 md:py-24">
        <h2 className="text-3xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-4xl lg:text-5xl">
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
                    <span className="flex items-center gap-3 text-sm">
                      <Mark selected={websiteType === option.id} />
                      {option.label}
                    </span>
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
                      className="flex h-11 w-11 items-center justify-center border border-border text-text transition-colors hover:border-accent hover:text-accent-text"
                    >
                      <Minus size={16} strokeWidth={1.5} />
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
                      className="flex h-11 w-11 items-center justify-center border border-border text-text transition-colors hover:border-accent hover:text-accent-text"
                    >
                      <Plus size={16} strokeWidth={1.5} />
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
                    <span className="flex items-center gap-3 text-sm">
                      <Mark selected={features.includes(option.id)} />
                      {option.label}
                    </span>
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
                    <span className="flex items-center gap-3 text-sm">
                      <Mark selected={analytics.includes(option.id)} />
                      {option.label}
                    </span>
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
                    <span className="flex items-center gap-3 text-sm">
                      <Mark selected={support === option.id} />
                      {option.label}
                    </span>
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

            <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
              <p className="max-w-[62ch] text-xs font-light leading-relaxed text-text-muted">
                This is an estimate, not a quote. The final cost depends on the
                scope and needs of your project, and we will confirm it with you
                before any work starts.
              </p>
              <p className="hidden max-w-[62ch] text-xs font-light leading-relaxed text-text-muted lg:block">
                Domain registration and hosting fees are handled separately. We
                can help you choose the right provider.
              </p>
            </div>

            <WhatsAppCTA
              message={whatsappMessage}
              context="quote_estimator"
              className="mt-6 block w-full bg-accent px-6 py-4 text-center text-sm font-medium text-dark transition-transform duration-300 hover:scale-105"
            >
              Send my quote on WhatsApp
            </WhatsAppCTA>
          </aside>
        </div>
      </div>
    </section>
  );
};
