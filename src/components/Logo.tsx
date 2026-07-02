interface LogoProps {
  className?: string;
  iconSize?: number;
  showWordmark?: boolean;
  wordmarkSize?: "sm" | "md" | "lg";
  /** Deprecated. Tagline is no longer shown per design spec. */
  tagline?: string;
}

export default function Logo({
  className = "",
  iconSize = 28,
  showWordmark = true,
  wordmarkSize = "md",
}: LogoProps) {
  const boxSize = wordmarkSize === "sm" ? 24 : wordmarkSize === "lg" ? 36 : iconSize;
  const textClass =
    wordmarkSize === "sm" ? "text-[15px]" : wordmarkSize === "lg" ? "text-[22px]" : "text-[18px]";

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg
        width={boxSize}
        height={boxSize}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <rect width="28" height="28" rx="6" fill="var(--brand-purple)" />
        <path
          d="M14 6L20 9.5V15.5L14 19L8 15.5V9.5L14 6Z"
          stroke="var(--role-candidate)"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M11 12.5L13 14.5L17 10.5"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showWordmark && (
        <span
          className={`font-display font-semibold tracking-tight leading-none text-txt-primary ${textClass}`}
        >
          CredChain
        </span>
      )}
    </div>
  );
}
