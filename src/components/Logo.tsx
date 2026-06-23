import React from "react";

interface LogoProps {
  className?: string;
  iconSize?: number;
  showWordmark?: boolean;
  wordmarkSize?: "sm" | "md" | "lg";
}

export default function Logo({
  className = "",
  iconSize = 32,
  showWordmark = true,
  wordmarkSize = "md",
}: LogoProps) {
  // SVG viewport size defined as 120 x 120
  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Dynamic Hexagon Checkmark Logo Icon */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 drop-shadow-[0_4px_12px_rgba(124,58,253,0.3)] hover:scale-105 transition-transform duration-300"
      >
        <defs>
          {/* Top segment gradient - Cyan/Blue */}
          <linearGradient id="hex-top-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00f5ff" />
            <stop offset="100%" stopColor="#0072ff" />
          </linearGradient>

          {/* Bottom segment gradient - Violet/Purple/Pink */}
          <linearGradient id="hex-bottom-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0072ff" />
            <stop offset="60%" stopColor="#7c3aff" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>

          {/* Checkmark gradient - Neon Cyan-Blue */}
          <linearGradient id="check-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00f5ff" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>

          {/* Glowing backdrop filter properties inside SVG elements if supported */}
          <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer segmented 3D hexagon */}
        {/* Top-part of the hexagon C clamp */}
        <path
          d="M 60,10 
             L 98,32 
             C 103,35 106,40 106,46 
             L 106,60 
             C 106,63 104,65 101,65 
             C 98,65 96,63 96,60 
             L 96,48 
             L 60,27 
             L 24,48 
             L 24,60 
             C 24,63 22,65 19,65 
             C 16,65 14,63 14,60 
             L 14,46 
             C 14,40 17,35 22,32 
             Z"
          fill="url(#hex-top-gradient)"
        />

        {/* Bottom part of the hexagon C clamp */}
        <path
          d="M 14,60 
             C 14,57 16,55 19,55 
             C 22,55 24,57 24,60 
             L 24,72 
             L 60,93 
             L 96,72 
             L 96,60 
             C 96,57 98,55 101,55 
             C 104,55 106,57 106,60 
             L 106,74 
             C 106,80 103,85 98,88 
             L 60,110 
             L 22,88 
             C 17,85 14,80 14,74 
             Z"
          fill="url(#hex-bottom-gradient)"
        />

        {/* Internal glossy checkmark with deep anchor point */}
        <path
          d="M 42,60 
             L 53,71 
             C 54.5,72.5 56.5,72.5 58,71 
             L 82,47 
             C 84,45 84,42 82,40 
             C 80,38 77,38 75,40 
             L 55.5,59.5 
             L 49,53 
             C 47,51 44,51 42,53 
             C 40,55 40,58 42,60 
             Z"
          fill="url(#check-gradient)"
          filter="url(#neon-glow)"
        />
      </svg>

      {/* Styled Wordmark matching the prompt requirements exactly */}
      {showWordmark && (
        <span
          className={`font-sans tracking-tight font-extrabold flex flex-col justify-center`}
        >
          <div className="flex items-baseline leading-none">
            <span
              className={`text-white font-semibold ${
                wordmarkSize === "sm"
                  ? "text-lg"
                  : wordmarkSize === "lg"
                  ? "text-3xl sm:text-4xl"
                  : "text-2xl"
              }`}
            >
              Cred
            </span>
            <span
              className={`bg-gradient-to-r from-[#00f5ff] to-[#7c3aff] bg-clip-text text-transparent font-black ${
                wordmarkSize === "sm"
                  ? "text-lg"
                  : wordmarkSize === "lg"
                  ? "text-3xl sm:text-4xl"
                  : "text-2xl"
              }`}
            >
              Chain
            </span>
          </div>
          {wordmarkSize === "lg" && (
            <span className="font-mono text-[8px] sm:text-[9.5px] uppercase tracking-[0.22em] text-[#8888aa] mt-1.5 font-bold leading-none">
              Verified Credentials. Trusted Talent.
            </span>
          )}
        </span>
      )}
    </div>
  );
}
