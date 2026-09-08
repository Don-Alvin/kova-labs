import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { CtaBanner } from "@/components/home/CtaBanner";
import { MarkPanel } from "@/components/shared/MarkPanel";

export const metadata: Metadata = pageMetadata({
  path: "/about",
  title: "About",
  description:
    "KovaLab is a software solutions studio in Nairobi. Analytical thinking and technical skill, applied to websites that bring in customers.",
});

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
      <section className="ground-dark relative -mt-24">
        <div className="shell relative z-10 grid grid-cols-1 items-center gap-12 px-6 pb-16 pt-40 md:px-12 md:pb-24 md:pt-48 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-text-light sm:text-5xl lg:text-6xl">
              The studio behind the work
            </h1>
            <p className="mt-8 max-w-[58ch] font-light leading-relaxed text-text-light/70">
              KovaLab is a small studio in Nairobi building websites, web
              applications, and data tools for businesses across East Africa.
            </p>
          </div>
          <MarkPanel className="min-h-[280px] lg:min-h-[440px]" />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="shell px-6 py-16 md:px-12 md:py-24">
          <div>
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
          </div>
        </div>
      </section>

      <section className="ground-dark relative">
        <div className="shell relative z-10 px-6 py-16 md:px-12 md:py-24">
          <h2 className="text-3xl font-bold leading-[1.05] tracking-[-0.04em] text-text-light sm:text-4xl">
            How we work with you
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="glass-dark p-8 text-text-light md:p-10"
              >
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-text-light/60">
                  {value.description}
                </p>
              </div>
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
