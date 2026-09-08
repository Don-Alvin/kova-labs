import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { QuoteEstimator } from "@/components/home/QuoteEstimator";
import { CtaBanner } from "@/components/home/CtaBanner";

export const metadata: Metadata = pageMetadata({
  path: "/quote",
  title: "Get a quote",
  description:
    "Estimate what your website or web application will cost, in Kenyan shillings, before you talk to anyone.",
});

type Props = {
  searchParams: Promise<{ type?: string }>;
};

export default async function QuotePage({ searchParams }: Props) {
  const { type } = await searchParams;

  return (
    <>
      <section className="border-b border-border bg-bg">
        <div className="shell px-6 py-16 md:px-12 md:py-24">
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
            Get a quote
          </h1>
          <p className="mt-4 max-w-[58ch] font-light leading-relaxed text-text-muted">
            Answer a few questions about what you need and see an instant
            estimate, no calls required.
          </p>
        </div>
      </section>

      <QuoteEstimator initialType={type} />
      <CtaBanner />
    </>
  );
}
