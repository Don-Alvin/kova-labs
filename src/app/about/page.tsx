import type { Metadata } from "next";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { CtaBanner } from "@/components/home/CtaBanner";

export const metadata: Metadata = {
  title: "About",
  description:
    "KovaLab is a software solutions studio in Nairobi. Analytical thinking and technical skill, applied to websites that bring in customers.",
};

const VALUES = [
  {
    title: "We explain what we build",
    description:
      "No jargon and no black boxes. You will understand what you are paying for, why it matters, and how it works before we write a line of code.",
  },
  {
    title: "We build to ship",
    description:
      "Most projects launch in 2 to 4 weeks. We scope tightly, show progress weekly, and get you live rather than polishing forever.",
  },
  {
    title: "We stay after launch",
    description:
      "Handover is not goodbye. Maintenance plans, training, and a real response time mean you are never stuck with a site nobody can update.",
  },
];

const STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Sanity",
  "Vercel",
  "Figma",
  "M-Pesa",
  "Paystack",
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="shell grid grid-cols-1 items-center gap-12 px-6 py-16 md:px-12 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              The studio behind the work
            </h1>
            <p className="mt-8 max-w-[58ch] font-light leading-relaxed text-text-muted">
              KovaLab is a small studio in Nairobi building websites, web
              applications, and data tools for businesses across East Africa.
            </p>
          </div>
          <div
            className="min-h-[280px] border border-border bg-bg-warm lg:min-h-[440px]"
            aria-hidden="true"
          />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="shell px-6 py-16 md:px-12 md:py-24">
          <AnimateOnScroll>
            <h2 className="max-w-[720px] text-3xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-4xl">
              Analytical thinking, applied to the web
            </h2>
            <div className="mt-8 flex max-w-[58ch] flex-col gap-5 font-light leading-relaxed text-text-muted">
              <p>
                KovaLab started with a background in industrial chemistry at
                JKUAT, then data science at ExploreAI Academy, then development
                learned the long way: by building.
              </p>
              <p>
                That path matters more than it sounds. Chemistry teaches you to
                break a system down until you understand every part. Data
                science teaches you to ask what the numbers actually say rather
                than what you hoped they would. Both habits carry directly into
                building software that has to work for a real business.
              </p>
              <p>
                The result is a studio that treats a website as a commercial
                tool rather than a design exercise. We ask what the site is
                supposed to do for you, then build the smallest thing that does
                it well.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="border-b border-border bg-bg-warm">
        <div className="shell px-6 py-16 md:px-12 md:py-24">
          <h2 className="text-3xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-4xl">
            How we work with you
          </h2>

          <div className="mt-12 grid grid-cols-1 border border-border md:grid-cols-3">
            {VALUES.map((value, index) => (
              <AnimateOnScroll
                key={value.title}
                delay={index * 0.15}
                className={`bg-bg p-8 md:p-10 ${
                  index < VALUES.length - 1
                    ? "border-b border-border md:border-b-0 md:border-r"
                    : ""
                }`}
              >
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-text-muted">
                  {value.description}
                </p>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="shell px-6 py-16 md:px-12 md:py-24">
          <h2 className="text-3xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-4xl">
            The tools behind the work
          </h2>

          <ul className="mt-12 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-4">
            {STACK.map((tool) => (
              <li
                key={tool}
                className="flex items-center gap-3 bg-bg px-6 py-5 text-sm"
              >
                <span aria-hidden="true" className="h-[5px] w-[5px] bg-accent" />
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
