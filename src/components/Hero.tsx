import { useNavigate } from "react-router-dom";
import { Play, RefreshCw, Check } from "lucide-react";
import FadeIn from "./FadeIn";
import NetworkTopologyBg from "./NetworkTopologyBg";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] bg-bg-base pt-32 pb-16 flex items-center overflow-hidden">
      {/* Network topology infrastructure texture (4% opacity, no glow) */}
      <NetworkTopologyBg />

      <div className="relative w-full max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <FadeIn>
              {/* Section eyebrow — left border rule, mono uppercase */}
              <div className="border-l-2 border-brand-purple pl-3 font-mono text-[11px] tracking-[0.18em] text-txt-muted uppercase mb-6">
                CREDENTIAL VERIFICATION PLATFORM
              </div>

              <h1 className="font-display text-txt-primary tracking-tight scale-3xl md:scale-4xl font-bold leading-none mb-6">
                Verified Credentials.
                <br />
                <span className="text-role-candidate">Instant Trust.</span>
                <br />
                Zero Fraud.
              </h1>

              <p className="font-sans text-txt-secondary scale-base max-w-[480px] mb-8 leading-relaxed">
                CredChain connects institutions, candidates, and employers on a single blockchain-anchored verification layer. No email chains. No waiting rooms. No forgery.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-12">
                <button
                  onClick={() => navigate("/role")}
                  className="bg-brand-purple hover:bg-brand-purple-dim text-white rounded-md px-6 py-3 font-semibold text-sm transition-colors cursor-pointer"
                >
                  Get Started
                </button>
                <a
                  href="#how-it-works"
                  className="bg-transparent border border-border-main hover:border-border-strong text-txt-primary rounded-md px-6 py-3 font-semibold text-sm transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4" />
                  <span>See How It Works</span>
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 border-t border-border-subtle pt-6 text-[11px] font-mono text-txt-muted uppercase tracking-wider">
                <div>// SECURED BY SOLANA</div>
                <div className="h-3 w-[1px] bg-border-main hidden sm:block" />
                <div>// ZERO PII ON-CHAIN</div>
                <div className="h-3 w-[1px] bg-border-main hidden sm:block" />
                <div>// 0.38s VERIFICATION</div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column — Proof block card centerpiece */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <FadeIn delay={150}>
              <ProofBlockCard
                txHash="sol_tx_92Kx3dE8_v_z8Pq7w"
                blockNumber="#182,901,321"
                credentialType="B.Eng in Computer Engineering"
                candidate="Emeka Obi"
                issuer="Federal University of Technology, Owerri"
                issuedDate="June 2026"
              />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProofBlockCardProps {
  txHash: string;
  blockNumber: string;
  credentialType: string;
  candidate: string;
  issuer: string;
  issuedDate: string;
}

function ProofBlockCard({
  txHash,
  blockNumber,
  credentialType,
  candidate,
  issuer,
  issuedDate,
}: ProofBlockCardProps) {
  const rows: Array<[string, React.ReactNode, boolean]> = [
    ["TRANSACTION HASH", <span className="font-mono text-[13px] text-txt-primary select-all break-all">{txHash}</span>, true],
    ["BLOCKCHAIN NETWORK", <span className="font-sans text-[13px] text-txt-primary font-medium">Solana Proof Anchor</span>, false],
    ["BLOCK NUMBER", <span className="font-mono text-[13px] text-txt-primary font-medium">{blockNumber}</span>, false],
    ["CREDENTIAL TYPE", <span className="font-sans text-[13px] text-txt-primary font-medium">{credentialType}</span>, false],
    ["CANDIDATE", <span className="font-sans text-[13px] text-txt-primary font-medium">{candidate}</span>, false],
    ["AUTHORIZED ISSUER", <span className="font-sans text-[13px] text-txt-primary font-medium">{issuer}</span>, false],
    ["ISSUED DATE", <span className="font-sans text-[13px] text-txt-primary font-medium">{issuedDate}</span>, false],
  ];

  return (
    <div className="bg-bg-surface border border-border-main rounded-lg p-6 w-full max-w-[480px] transition-all duration-200 hover:border-border-strong">
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-border-main mb-5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-hash-green animate-pulse-custom" aria-hidden />
          <span className="font-mono text-[11px] text-txt-muted uppercase tracking-wider font-semibold">
            LIVE TRANSACTION FEED
          </span>
        </div>
        <div className="border border-border-main rounded-sm px-2 py-1 text-[11px] font-mono text-role-candidate">
          Solana Proof Anchor
        </div>
      </div>

      {/* Body */}
      <div className="space-y-4">
        {rows.map(([label, value], i) => (
          <div key={i} className="grid grid-cols-12 gap-2 items-start">
            <div className="col-span-5 font-mono text-[10px] text-txt-muted uppercase tracking-wider pt-0.5">
              {label}
            </div>
            <div className="col-span-7">{value}</div>
          </div>
        ))}

        {/* Authenticity Result */}
        <div className="grid grid-cols-12 gap-2 items-center pt-2">
          <div className="col-span-5 font-mono text-[10px] text-txt-muted uppercase tracking-wider">
            AUTHENTICITY RESULT
          </div>
          <div className="col-span-7 font-sans text-[13px] text-hash-green font-bold flex items-center gap-1.5">
            <Check className="w-4 h-4" strokeWidth={2.5} />
            <span>VERIFIED MATCH</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6 pt-5 border-t border-border-main">
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-txt-muted">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Live Syncing</span>
        </div>
        <div className="font-mono text-[11px] text-hash-green">
          STAMP: SHA256CRYPT // OK
        </div>
      </div>
    </div>
  );
}

export { ProofBlockCard };
