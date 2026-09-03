import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { calTrigger } from "@/lib/cal";

export const CtaBanner = () => (
  <section className="bg-dark">
    <AnimateOnScroll className="shell flex flex-col gap-8 px-6 py-16 md:px-12 md:py-20 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
      <div>
        <h2 className="max-w-[560px] text-3xl font-bold tracking-tight text-text-light sm:text-4xl">
          Let&apos;s put your business{" "}
          <em className="text-accent">online</em>
        </h2>
        <p className="mt-4 max-w-[480px] leading-relaxed text-text-muted-dark">
          Free consultation. No commitment. Just a conversation about what you
          need.
        </p>
      </div>

      <button
        type="button"
        {...calTrigger()}
        className="w-full shrink-0 bg-accent px-8 py-4 text-sm font-medium text-dark transition-colors hover:bg-text-light hover:text-dark lg:w-auto"
      >
        Book a free call
      </button>
    </AnimateOnScroll>
  </section>
);
