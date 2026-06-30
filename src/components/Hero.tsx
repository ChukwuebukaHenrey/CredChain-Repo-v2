import { useNavigate } from "react-router-dom";
import { Play, RefreshCw, Check } from "lucide-react";
import FadeIn from "./FadeIn";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] bg-bg-base pt-32 pb-16 flex items-center overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (55% / 7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <FadeIn>
              {/* Section Eyebrow (Left border rule) */}
              <div className="border-l-2 border-brand-purple pl-3 font-mono text-[11px] tracking-[0.1em] text-txt-muted uppercase mb-6">
                CREDENTIAL VERIFICATION PLATFORM
              </div>

              {/* Title Header */}
              <h1 className="font-display text-white tracking-tight scale-3xl md:scale-4xl font-bold leading-none mb-6">
                Verified Credentials.<br />
                <span className="text-accent-cyan">Instant Trust.</span><br />
                Zero Fraud.
              </h1>

              {/* Subheading Description */}
              <p className="font-sans text-txt-secondary scale-base max-w-[480px] mb-8 leading-relaxed">
                CredChain connects institutions, candidates, and employers on a single blockchain-anchored verification layer. No email chains. No waiting rooms. No forgery.
              </p>

              {/* CTA Row */}
              <div className="flex flex-wrap items-center gap-4 mb-12">
                <button
                  onClick={() => navigate("/role")}
                  className="bg-brand-purple hover:bg-[#6D28D9] text-white rounded-md px-6 py-3.5 font-semibold text-sm transition-colors cursor-pointer"
                >
                  Get Started
                </button>
                <a
                  href="#how-it-works"
                  className="bg-transparent border border-border-main text-white rounded-md px-6 py-3.5 font-semibold text-sm transition-colors hover:bg-bg-elevated/50 flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 text-white fill-white" />
                  <span>See How It Works</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 border-t border-border-subtle pt-6 text-[12px] font-mono text-txt-muted">
                <div className="flex items-center">// SECURED BY SOLANA</div>
                <div className="h-4 w-[1px] bg-border-main hidden sm:block"></div>
                <div className="flex items-center">// ZERO PII ON-CHAIN</div>
                <div className="h-4 w-[1px] bg-border-main hidden sm:block"></div>
                <div className="flex items-center">// 0.38s VERIFICATION</div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column (45% / 5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <FadeIn delay={150}>
              {/* Signature Explorer Terminal Card */}
              <div className="bg-bg-surface border border-border-main rounded-lg p-6 w-full max-w-[480px] shadow-[0_1px_3px_rgba(0,0,0,0.4)] transition-all hover:translate-y-[-2px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                
                {/* Card Header Row */}
                <div className="flex items-center justify-between pb-5 border-b border-border-main mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-hash-green animate-pulse-custom" />
                    <span className="font-mono text-[11px] text-txt-muted uppercase tracking-wider font-semibold">
                      LIVE TRANSACTION FEED
                    </span>
                  </div>
                  <div className="border border-border-main rounded-sm px-2 py-1 text-[11px] font-mono text-accent-cyan">
                    Solana Proof Anchor
                  </div>
                </div>

                {/* Card Body - Grid */}
                <div className="space-y-4">
                  <div className="grid grid-cols-12 gap-1 items-start">
                    <div className="col-span-5 font-mono text-[10px] text-txt-muted uppercase tracking-wider">
                      TRANSACTION HASH
                    </div>
                    <div className="col-span-7 font-mono text-[13px] text-txt-primary select-all break-all">
                      sol_tx_92Kx3dE8_v_z8Pq7w
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-1 items-start">
                    <div className="col-span-5 font-mono text-[10px] text-txt-muted uppercase tracking-wider">
                      BLOCKCHAIN NETWORK
                    </div>
                    <div className="col-span-7 font-sans text-[13px] text-txt-primary font-medium">
                      Solana Proof Anchor
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-1 items-start">
                    <div className="col-span-5 font-mono text-[10px] text-txt-muted uppercase tracking-wider">
                      BLOCK NUMBER
                    </div>
                    <div className="col-span-7 font-sans text-[13px] text-txt-primary font-medium">
                      #182,901,321
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-1 items-start">
                    <div className="col-span-5 font-mono text-[10px] text-txt-muted uppercase tracking-wider">
                      CREDENTIAL TYPE
                    </div>
                    <div className="col-span-7 font-sans text-[13px] text-txt-primary font-medium">
                      B.Eng in Computer Engineering
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-1 items-start">
                    <div className="col-span-5 font-mono text-[10px] text-txt-muted uppercase tracking-wider">
                      CANDIDATE
                    </div>
                    <div className="col-span-7 font-sans text-[13px] text-txt-primary font-medium">
                      Emeka Obi
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-1 items-start">
                    <div className="col-span-5 font-mono text-[10px] text-txt-muted uppercase tracking-wider">
                      AUTHORIZED ISSUER
                    </div>
                    <div className="col-span-7 font-sans text-[13px] text-txt-primary font-medium">
                      Federal University of Technology, Owerri
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-1 items-start">
                    <div className="col-span-5 font-mono text-[10px] text-txt-muted uppercase tracking-wider">
                      ISSUED DATE
                    </div>
                    <div className="col-span-7 font-sans text-[13px] text-txt-primary font-medium">
                      June 2026
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-1 items-center pt-2">
                    <div className="col-span-5 font-mono text-[10px] text-txt-muted uppercase tracking-wider">
                      AUTHENTICITY RESULT
                    </div>
                    <div className="col-span-7 font-sans text-[13px] text-hash-green font-bold flex items-center gap-1">
                      <Check className="w-4 h-4 text-hash-green" />
                      <span>VERIFIED MATCH</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Row */}
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
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}
