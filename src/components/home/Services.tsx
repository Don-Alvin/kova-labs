import Link from "next/link";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  { number: "01", title: "Web development", href: "/services/web-development" },
  { number: "02", title: "UI/UX design", href: "/services/ui-ux-design" },
  { number: "03", title: "Data & analytics", href: "/services/data-analytics" },
];

export const Services = () => {
  return (
    <section className="ground-dark relative">
      <div className="shell relative z-10 px-6 py-20 md:px-12 md:py-28">
        <h2 className="max-w-[720px] text-3xl font-bold leading-[1.05] tracking-[-0.04em] text-text-light sm:text-4xl lg:text-5xl">
          Everything you need to get <em className="text-accent">online</em> and
          grow
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <Link
              key={service.number}
              href={service.href}
              className="glass-dark group flex min-h-[260px] flex-col justify-between p-8 transition-transform duration-300 hover:scale-[1.03]"
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
                  <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
