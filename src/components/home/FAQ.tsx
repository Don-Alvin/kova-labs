import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

const QUESTIONS = [
  {
    question: "How long does it take to build a website?",
    answer:
      "Most projects take 2 to 4 weeks from kickoff to launch. Larger projects like e-commerce stores or custom apps may take 4 to 8 weeks.",
  },
  {
    question: "Do I need to provide my own content?",
    answer:
      "We can work with whatever you have. If you have text, photos, and your logo ready, great. If not, we'll guide you on what's needed and can recommend content solutions.",
  },
  {
    question: "What about hosting and domain?",
    answer:
      "You handle your own domain and hosting costs. We'll help you pick the right provider and set everything up. Typical cost: KES 1,000 to 5,000 per year.",
  },
  {
    question: "Can I update the website myself?",
    answer:
      "Yes. We build sites that are easy to manage. We'll walk you through how to make everyday changes like updating text, adding photos, or posting to your blog.",
  },
  {
    question: "What if I need changes after launch?",
    answer:
      "Our maintenance plans cover ongoing updates, bug fixes, and content changes. You can also reach out for one-off changes anytime.",
  },
  {
    question: "Do you work with clients outside Nairobi?",
    answer:
      "Absolutely. We work with businesses across East Africa. Everything from the first call to launch can happen remotely.",
  },
];

export const FAQ = () => (
  <section className="ground-dark relative">
    <div className="shell relative z-10 px-6 py-16 md:px-12 md:py-24">
      <h2 className="max-w-3xl text-3xl font-bold leading-[1.05] tracking-[-0.04em] text-text-light sm:text-4xl lg:text-5xl">Everything you need to know</h2>
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">
        <div className="flex flex-col items-start gap-6 lg:sticky lg:top-32 lg:self-start">
          <p className="max-w-[32ch] font-light leading-relaxed text-text-light/70">We believe good partnerships start with clarity. Here are the questions clients ask us most.</p>
          <Link href="/contact" className="group inline-flex items-center gap-2 border border-border-dark px-6 py-3 text-sm font-medium text-text-light transition-colors hover:border-text-light hover:bg-text-light hover:text-dark">Contact us <ArrowRight size={16} strokeWidth={1.5} /></Link>
        </div>
        <div>
          {QUESTIONS.map((item, index) => (
            <details key={item.question} name="faq" className="faq-item border-b border-border-dark">
              <summary className="cursor-pointer list-none text-text-light transition-colors hover:text-accent">
                <h3 className="flex items-start gap-4 py-6 text-lg font-semibold md:text-xl">
                  <span className="shrink-0 pt-1 text-sm font-light text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <span className="flex-1">{item.question}</span>
                  <Plus size={22} strokeWidth={1.5} aria-hidden="true" className="faq-icon shrink-0 text-accent transition-transform duration-200" />
                </h3>
              </summary>
              <p className="max-w-[58ch] pb-6 pl-9 font-light leading-relaxed text-text-light/70">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  </section>
);
