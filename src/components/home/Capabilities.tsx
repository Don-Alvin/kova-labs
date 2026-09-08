import Link from "next/link";
import { ArrowRight, PenLine, Settings, Zap } from "lucide-react";

const SERVICES = [
  {
    number: "01",
    title: "Web development",
    href: "/services/web-development",
  },
  { number: "02", title: "UI/UX design", href: "/services/ui-ux-design" },
  {
    number: "03",
    title: "Data & analytics",
    href: "/services/data-analytics",
  },
];

const POINTS = [
  {
    Icon: Zap,
    title: "Built for speed",
    description: "Loads in under 2 seconds.",
  },
  {
    Icon: PenLine,
    title: "Designed to convert",
    description: "Turns browsers into buyers.",
  },
  {
    Icon: Settings,
    title: "Easy to manage",
    description: "Update the site yourself, without a developer.",
  },
];

/**
 * Merges what used to be two sections (Services, Why) into one bento-style
 * grid: mixed card sizes instead of a uniform row or list, in the studio's
 * own flat, sharp, dark-glass system rather than the rounded reference it
 * borrows the layout idea from.
 */
export const Capabilities = () => {
  const [builtForSpeed, designedToConvert, easyToManage] = POINTS;
  const [webDevelopment, uiUxDesign, dataAnalytics] = SERVICES;

  return (
    <section className="ground-dark relative">
      <div className="shell relative z-10 px-6 py-20 md:px-12 md:py-28">
        <h2 className="max-w-[720px] text-3xl font-bold leading-[1.05] tracking-[-0.04em] text-text-light sm:text-4xl lg:text-5xl">
          Everything you need to get <em className="text-accent">online</em>{" "}
          and grow
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-3 lg:grid-cols-3">
          {/* Row 1: the "why it matters" case, told over video, plus one
              service card alongside it at the same height. */}
          <div className="glass-dark relative col-span-1 flex min-h-[360px] flex-col justify-end overflow-hidden p-8 lg:col-span-2 lg:min-h-[420px] lg:p-10">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/media/why.mp4"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
            {/* A real background-color on the text's own wrapper, not just a
                gradient sibling, so the copy stays legible over any footage. */}
            <div className="absolute inset-0 bg-dark/60" aria-hidden="true" />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-dark/90 to-transparent"
            />
            <div className="relative z-10 flex flex-col gap-4">
              <h3 className="max-w-[26ch] text-2xl font-bold leading-[1.05] tracking-[-0.04em] text-text-light lg:text-3xl">
                Your customers are{" "}
                <em className="text-accent">searching</em> for you online
              </h3>
              <p className="max-w-[42ch] font-light leading-relaxed text-text-light/80">
                8 out of 10 customers look up a business online before
                calling, visiting, or buying. If your website is slow,
                outdated, or missing entirely, you&apos;re losing them to
                competitors who showed up first.
              </p>
            </div>
          </div>

          <Link
            href={uiUxDesign.href}
            className="glass-dark group flex flex-col justify-between p-6 text-text-light transition-transform duration-300 hover:scale-[1.03] lg:p-8"
          >
            <span className="text-xs font-light tracking-wide text-accent">
              {uiUxDesign.number}
            </span>
            <span className="inline-flex items-center gap-2 text-lg font-semibold">
              {uiUxDesign.title}
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </Link>

          {/* Row 2: the flagship service, filled in Ember, plus a second
              service card matching its height. */}
          <Link
            href={webDevelopment.href}
            className="group flex min-h-[180px] flex-col justify-between bg-accent p-6 text-dark transition-transform duration-300 hover:scale-[1.02] lg:col-span-2 lg:p-8"
          >
            <span className="text-xs font-light tracking-wide">
              {webDevelopment.number}
            </span>
            <span className="inline-flex items-center gap-2 text-xl font-semibold md:text-2xl">
              {webDevelopment.title}
              <ArrowRight
                size={20}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </Link>

          <Link
            href={dataAnalytics.href}
            className="glass-dark group flex flex-col justify-between p-6 text-text-light transition-transform duration-300 hover:scale-[1.03] lg:p-8"
          >
            <span className="text-xs font-light tracking-wide text-accent">
              {dataAnalytics.number}
            </span>
            <span className="inline-flex items-center gap-2 text-lg font-semibold">
              {dataAnalytics.title}
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </Link>

          {/* Row 3: the three reasons the work matters, as equal cards. */}
          {[builtForSpeed, designedToConvert, easyToManage].map((point) => (
            <div
              key={point.title}
              className="glass-dark flex min-h-[160px] flex-col justify-between p-6 text-text-light lg:p-8"
            >
              <point.Icon
                size={20}
                strokeWidth={1.5}
                className="text-accent"
                aria-hidden="true"
              />
              <div>
                <p className="font-semibold">{point.title}</p>
                <p className="mt-1 text-sm font-light text-text-light/60">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
