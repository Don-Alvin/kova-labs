import Image from "next/image";

type MarkPanelProps = {
  className?: string;
};

/**
 * A placeholder panel for a photo that doesn't exist yet. Carries the K-mark
 * at full strength, since nothing sits on top of it here to protect the way
 * the hero's background texture does: this panel's whole job is to show the
 * mark clearly rather than let it fade into the ground. Swap for a real
 * image once one exists; nothing else about the layout needs to change
 * since this only fills the space.
 */
export const MarkPanel = ({ className = "" }: MarkPanelProps) => (
  <div
    aria-hidden="true"
    className={`relative flex items-center justify-center overflow-hidden border border-border-dark bg-dark-card ${className}`}
  >
    <Image
      src="/logos/kovalab-mark.webp"
      alt=""
      width={300}
      height={300}
      className="h-auto w-1/2 max-w-[220px]"
    />
  </div>
);
