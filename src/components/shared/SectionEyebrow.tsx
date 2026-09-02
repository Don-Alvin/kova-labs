type SectionEyebrowProps = {
  children: string;
  className?: string;
};

/**
 * The section opener: a 40px accent rule followed by a weight 300 label.
 * Reads the same on light and inverted grounds, since both use the accent.
 */
export const SectionEyebrow = ({
  children,
  className = "",
}: SectionEyebrowProps) => (
  <p
    className={`flex items-center gap-3 text-xs font-light tracking-wide text-accent ${className}`}
  >
    <span aria-hidden="true" className="h-px w-10 bg-accent" />
    {children}
  </p>
);
