import React from "react";
import { ShieldCheck } from "lucide-react";

interface LogoProps {
  className?: string;
  iconSize?: number;
  showWordmark?: boolean;
  wordmarkSize?: "sm" | "md" | "lg";
  tagline?: string;
}

export default function Logo({
  className = "",
  iconSize = 38,
  showWordmark = true,
  wordmarkSize = "md",
  tagline = "Verified Credentials on Solana",
}: LogoProps) {
  const boxSize = wordmarkSize === "sm" ? 30 : wordmarkSize === "lg" ? 46 : iconSize || 38;

  return (
    <div className={`inline-flex items-center gap-3 select-none font-display ${className}`}>
      <div
        style={{ width: boxSize, height: boxSize }}
        className="rounded-xl bg-gradient-to-tr from-[#00f5ff] via-[#7c3aed] to-[#ff00a0] p-[2px] shadow-[0_0_20px_rgba(124,58,253,0.5)] flex-shrink-0 transition-transform hover:scale-105"
      >
        <div className="w-full h-full bg-[#05050a] rounded-[10px] flex items-center justify-center">
          <ShieldCheck className="w-3/5 h-3/5 text-[#00f5ff]" />
        </div>
      </div>
      {showWordmark && (
        <div className="flex flex-col justify-center text-left">
          <span
            className={`font-extrabold tracking-tight text-white leading-none ${
              wordmarkSize === "sm" ? "text-[18px]" : wordmarkSize === "lg" ? "text-3xl" : "text-[23px]"
            }`}
          >
            Cred<span className="text-[#00f5ff]">Chain</span>
          </span>
          {tagline && wordmarkSize !== "sm" && (
            <span className="text-[10px] font-mono tracking-wider uppercase text-[#00f5ff] font-semibold mt-1 block">
              {tagline}
            </span>
          )}
        </div>
      )}
    </div>
  );
}


