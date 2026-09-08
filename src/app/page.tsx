import { Hero } from "@/components/home/Hero";
import { Work } from "@/components/home/Work";
import { Capabilities } from "@/components/home/Capabilities";
import { QuoteEstimator } from "@/components/home/QuoteEstimator";
import { FAQ } from "@/components/home/FAQ";
import { Process } from "@/components/home/Process";
import { CtaBanner } from "@/components/home/CtaBanner";
import { jsonLd, organizationSchema } from "@/lib/structuredData";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(organizationSchema())}
      />
      <Hero />
      <Work />
      <Capabilities />
      <QuoteEstimator />
      <FAQ />
      <Process />
      <CtaBanner />
    </>
  );
}
