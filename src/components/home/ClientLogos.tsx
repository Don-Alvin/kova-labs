import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";

const CLIENTS = ["Gedo Holdings", "Raicha Electrical"];

export const ClientLogos = () => (
  <section
    aria-label="Clients we have worked with"
    className="border-b border-border bg-bg-warm"
  >
    <AnimateOnScroll className="shell px-6 py-12 md:px-12">
      <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {CLIENTS.map((client) => (
          <li
            key={client}
            className="text-lg font-semibold text-text-muted grayscale transition-all hover:text-text hover:grayscale-0"
          >
            {client}
          </li>
        ))}
      </ul>
    </AnimateOnScroll>
  </section>
);
