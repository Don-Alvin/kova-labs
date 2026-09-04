import { Hero } from "@/components/home/Hero";
import { Work } from "@/components/home/Work";
import { Why } from "@/components/home/Why";
import { Services } from "@/components/home/Services";
import { QuoteEstimator } from "@/components/home/QuoteEstimator";
import { FAQ } from "@/components/home/FAQ";
import { Process } from "@/components/home/Process";
import { CtaBanner } from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <Why />
      <Services />
      <QuoteEstimator />
      <FAQ />
      <Process />
      <CtaBanner />
    </>
  );
}
