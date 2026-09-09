import Image from "next/image";

type LogoProps = {
  variant?: "light" | "dark";
  /** Rendered height in pixels. The navbar lockup is 32. */
  height?: number;
  priority?: boolean;
  className?: string;
};

/** Optimized lockups are 600 x 200, preserving the original 3:1 ratio. */
const ASPECT_RATIO = 3;

const SOURCES = {
  light: "/logos/kovalab-light-bg.webp",
  dark: "/logos/kovalab-dark-bg.webp",
} as const;

/**
 * KovaLab lockup. "light" sits on light backgrounds, "dark" on dark ones.
 */
export const Logo = ({
  variant = "light",
  height = 32,
  priority = false,
  className,
}: LogoProps) => (
  <Image
    src={SOURCES[variant]}
    alt="KovaLab"
    width={Math.round(height * ASPECT_RATIO)}
    height={height}
    priority={priority}
    className={className}
  />
);
