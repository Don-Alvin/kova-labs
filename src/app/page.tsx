import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { Marquee } from "@/components/home/Marquee";
import { ClientLogos } from "@/components/home/ClientLogos";
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
      <Stats />
      <Marquee />
      <ClientLogos />
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
