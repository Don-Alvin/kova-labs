import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ProjectShowcases } from "@/components/work/ProjectShowcases";

export const Work = ({ detailed = false }: { detailed?: boolean } = {}) => (
  <section id="work" className="scroll-mt-24 border-b border-border">
    <div className="shell px-6 py-16 md:px-12 md:py-24">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 className="max-w-[560px] text-4xl font-bold leading-[0.98] tracking-[-0.05em] sm:text-5xl lg:text-6xl">Proof is in<br />the product.</h2>
        <div className="max-w-[340px]">
          <p className="text-sm font-light leading-relaxed text-text-muted">Real businesses. Thoughtful websites. Explore our work, from the big picture to the smallest screen.</p>
          {!detailed && <Link href="/work" className="mt-4 inline-flex items-center gap-2 border-b border-text pb-1 text-sm font-medium">All projects <ArrowUpRight size={16} aria-hidden="true" /></Link>}
        </div>
      </div>
      <ProjectShowcases detailed={detailed} />
    </div>
  </section>
);
