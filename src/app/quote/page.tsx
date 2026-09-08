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
      <QuoteEstimator initialType={type} />
      <CtaBanner />
    </>
  );
}
