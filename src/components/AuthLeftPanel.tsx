import React from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import Logo from "./Logo";
import authSidebarImg from "../assets/images/credchain_auth_sidebar_1782708558420.jpg";

export interface RoleInfo {
  id: "candidate" | "issuer" | "verifier";
  badge: string;
  dotColor: string;
  badgeBg: string;
  badgeBorder: string;
  textColor: string;
  heading: string;
  perks: string[];
}

export const ROLE_SPECS: Record<string, RoleInfo> = {
  candidate: {
    id: "candidate",
    badge: "CANDIDATE",
    dotColor: "bg-[#00f5ff]",
    badgeBg: "bg-[#00f5ff]/10",
    badgeBorder: "border-[#00f5ff]/25",
    textColor: "text-[#00f5ff]",
    heading: "Build your verified identity",
    perks: [
      "Request credentials from your institution",
      "Generate AI-powered resumes",
      "Share a verified public profile",
      "QR code for instant verification",
    ],
  },
  issuer: {
    id: "issuer",
    badge: "INSTITUTION",
    dotColor: "bg-[#10b981]",
    badgeBg: "bg-[#10b981]/10",
    badgeBorder: "border-[#10b981]/25",
    textColor: "text-[#10b981]",
    heading: "Issue tamper-evident credentials",
    perks: [
      "Cryptographically sign academic records",
      "Instant verification portal for employers",
      "Batch issuance via secure CSV upload",
      "Revocation & status ledger management",
    ],
  },
  verifier: {
    id: "verifier",
    badge: "EMPLOYER",
    dotColor: "bg-[#a855f7]",
    badgeBg: "bg-[#a855f7]/10",
    badgeBorder: "border-[#a855f7]/25",
    textColor: "text-[#c084fc]",
    heading: "Verify credentials instantly",
    perks: [
      "Zero-fraud cryptographic proof check",
      "One-click applicant background audit",
      "Direct institutional verification ledger",
      "Download verified candidate dossiers",
    ],
  },
};

interface AuthLeftPanelProps {
  role: "candidate" | "issuer" | "verifier";
  currentStep?: number;
  totalSteps?: number;
}

export default function AuthLeftPanel({
  role,
  currentStep,
  totalSteps,
}: AuthLeftPanelProps) {
  const spec = ROLE_SPECS[role] || ROLE_SPECS.candidate;

  return (
    <div className="w-[45%] flex-shrink-0 bg-[#090516] p-10 lg:p-14 xl:p-16 flex flex-col justify-between relative overflow-hidden border-r border-white/5 select-none">
      {/* Background Generated Illustration */}
      <img
        src={authSidebarImg}
        alt="Network nodes background"
        className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none mix-blend-luminosity"
      />
      <div className="absolute -top-12 -right-12 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />

      {/* Top Logo */}
      <div className="relative z-10 flex items-center">
        <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
          <Logo iconSize={38} showWordmark={true} wordmarkSize="lg" />
        </Link>
      </div>

      {/* Middle Content */}
      <div className="relative z-10 my-auto py-10 space-y-6 max-w-xl">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase ${spec.badgeBg} ${spec.badgeBorder} ${spec.textColor} border shadow-sm`}
        >
          <span className={`w-2 h-2 rounded-full ${spec.dotColor}`} />
          <span>{spec.badge}</span>
        </div>

        <h2 className="font-display text-2xl lg:text-3xl xl:text-4xl font-bold text-white tracking-tight leading-snug">
          {spec.heading}
        </h2>

        <ul className="space-y-4 pt-4">
          {spec.perks.map((perk, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm lg:text-base text-gray-200 leading-relaxed font-sans">
              <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center flex-shrink-0 mt-0.5 text-cyan-400 shadow-[0_0_12px_rgba(0,212,255,0.2)]">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span>{perk}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Navigation & Step Indicators */}
      <div className="relative z-10 pt-6 space-y-4 border-t border-white/5">
        {typeof currentStep === "number" && typeof totalSteps === "number" && totalSteps > 0 && (
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentStep === i + 1
                    ? "w-8 bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.6)]"
                    : "w-2 bg-white/15"
                }`}
              />
            ))}
          </div>
        )}

        <Link
          to="/role"
          className="text-xs font-mono text-gray-400 hover:text-white transition-colors flex items-center gap-2 group pt-1"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>Choose a different role</span>
        </Link>
      </div>
    </div>
  );
}
