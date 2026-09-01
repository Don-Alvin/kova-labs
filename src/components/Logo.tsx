type LogoProps = {
  variant?: "light" | "dark";
  className?: string;
};

/**
 * KovaLab lockup: the Concept H interlocking blocks mark plus the wordmark.
 * "light" is for light backgrounds, "dark" is for dark backgrounds.
 * Hex values are part of the logo asset, so they stay literal here.
 */
export const Logo = ({ variant = "light", className }: LogoProps) => {
  const blockFill = variant === "light" ? "#141414" : "#FAFAF7";
  const textFill = variant === "light" ? "#141414" : "#FAFAF7";

  return (
    <svg
      width="200"
      height="32"
      viewBox="0 0 200 32"
      className={className}
      role="img"
      aria-label="KovaLab"
    >
      <rect x="0" y="1" width="12" height="30" fill="#FF4D00" />
      <rect x="14" y="1" width="12" height="14" fill={blockFill} />
      <rect x="14" y="17" width="12" height="14" fill={blockFill} />
      <rect x="28" y="8" width="5" height="16" fill="#FF4D00" />
      <text
        x="42"
        y="21"
        fontFamily="Montserrat, sans-serif"
        fontWeight="500"
        fontSize="15"
        fill={textFill}
        letterSpacing="-0.3"
      >
        kovalab
      </text>
    </svg>
  );
};
