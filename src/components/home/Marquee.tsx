const ITEMS = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Vercel",
  "Figma",
  "Analytics",
];

const Row = () => (
  <ul className="flex shrink-0 items-center">
    {ITEMS.map((item) => (
      <li
        key={item}
        className="flex shrink-0 items-center gap-3 px-6 text-sm text-text-muted"
      >
        <span aria-hidden="true" className="h-[5px] w-[5px] bg-accent" />
        {item}
      </li>
    ))}
  </ul>
);

export const Marquee = () => (
  <section
    aria-label="Technologies we work with"
    className="overflow-hidden border-b border-border py-5"
  >
    <div className="marquee-track">
      <Row />
      {/* Duplicate for the seamless loop, hidden from assistive tech. */}
      <div aria-hidden="true" className="flex shrink-0">
        <Row />
      </div>
    </div>
  </section>
);
