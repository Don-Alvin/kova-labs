import { Zap, PenLine, Settings } from "lucide-react";

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
  return (
    <section className="grid grid-cols-1 border-b border-border lg:grid-cols-2">
      <div className="relative min-h-[280px] overflow-hidden bg-bg-warm lg:min-h-[480px]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/media/why.mp4"
          poster="/media/why-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      </div>

      <div className="px-6 py-16 md:px-12 md:py-20 lg:p-20">
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
              className="flex items-center gap-4 border-b border-border py-5"
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
