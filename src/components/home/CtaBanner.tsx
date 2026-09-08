import { WhatsAppCTA } from "@/components/layout/WhatsAppCTA";

export const CtaBanner = () => (
  <section className="ground-dark relative">
    <div className="shell relative z-10 flex flex-col gap-8 px-6 py-20 md:px-12 md:py-24 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
      <div>
        <h2 className="max-w-[42ch] text-3xl font-bold leading-[1.05] tracking-[-0.04em] text-text-light sm:text-4xl">
          Let&apos;s put your business{" "}
          <em className="text-accent">online</em>
        </h2>
        <p className="mt-4 max-w-[42ch] font-light leading-relaxed text-text-light/60">
          Free consultation. No commitment. Just a conversation about what you
          need.
        </p>
      </div>

      <WhatsAppCTA
        message="Hi KovaLab, I'd like to ask about a website for my business."
        context="cta_banner"
        className="block w-full shrink-0 bg-accent px-8 py-4 text-center text-sm font-medium text-dark transition-transform duration-300 hover:scale-105 lg:w-auto"
      >
        Get a quote on WhatsApp
      </WhatsAppCTA>
    </div>
  </section>
);
