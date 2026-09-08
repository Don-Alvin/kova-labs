import Image from "next/image";

type LogoProps = {
  variant?: "light" | "dark";
  /** Rendered height in pixels. The navbar lockup is 32. */
  height?: number;
  priority?: boolean;
  className?: string;
};

/** Source lockups are 2172x724, so the aspect ratio is exactly 3:1. */
const ASPECT_RATIO = 2172 / 724;

const SOURCES = {
  light: "/logos/kovalab-light-bg.png",
  dark: "/logos/kovalab-dark-bg.png",
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
