import { Check, X, RefreshCw } from "lucide-react";
import FadeIn from "./FadeIn";

export default function ProofSection() {
  return (
    <section id="ledger" className="py-24 md:py-[120px] bg-bg-base overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (50% / 6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <FadeIn>
              {/* Section Eyebrow */}
              <div className="border-l-2 border-accent-cyan pl-3 font-mono text-[11px] tracking-[0.1em] text-txt-muted uppercase mb-4">
                ANCHORED SECURELY
              </div>

              {/* Headings */}
              <h2 className="font-display text-white scale-2xl font-bold mb-2">
                An Immutable Ledger.
              </h2>
              <h3 className="font-display text-txt-secondary scale-2xl font-bold mb-6">
                Not a proprietary database.
              </h3>

              {/* Body Text */}
              <p className="font-sans text-txt-secondary scale-base leading-relaxed mb-8">
                Traditional verification relies on editable records and manual email queries. Those systems are slow, opaque, and forgeable.<br /><br />
                CredChain is structurally different. Every credential is backed by a cryptographic proof on Solana. Personal data stays off-chain.
              </p>

              {/* Comparison block — two side-by-side panels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Panel 1 - Old Database Servers */}
                <div className="border-l-2 border-hash-red bg-hash-red/5 p-4 rounded-sm">
                  <div className="font-mono text-[11px] text-hash-red font-semibold mb-3 tracking-wider">
                    OLD DATABASE SERVERS
                  </div>
                  <ul className="space-y-2 font-sans text-[13px] text-txt-secondary">
                    <li className="flex items-center gap-2">
                      <X className="w-4 h-4 text-hash-red flex-shrink-0" />
                      <span>Editable records</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <X className="w-4 h-4 text-hash-red flex-shrink-0" />
                      <span>Internal control hazards</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <X className="w-4 h-4 text-hash-red flex-shrink-0" />
                      <span>Slow email processes</span>
                    </li>
                  </ul>
                </div>

                {/* Panel 2 - CredChain Ledger */}
                <div className="border-l-2 border-hash-green bg-hash-green/5 p-4 rounded-sm">
                  <div className="font-mono text-[11px] text-hash-green font-semibold mb-3 tracking-wider">
                    CREDCHAIN LEDGER
                  </div>
                  <ul className="space-y-2 font-sans text-[13px] text-txt-secondary">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-hash-green flex-shrink-0" />
                      <span>Tamper-resistant proofs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-hash-green flex-shrink-0" />
                      <span>Shared trust framework</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-hash-green flex-shrink-0" />
                      <span>Instant automated checks</span>
                    </li>
                  </ul>
                </div>

              </div>
            </FadeIn>
          </div>

          {/* Right Column (50% / 6 cols) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
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
                      sol_tx_7c99e4bF_s_de81a30
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
                      #182,901,309
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-1 items-start">
                    <div className="col-span-5 font-mono text-[10px] text-txt-muted uppercase tracking-wider">
                      CREDENTIAL TYPE
                    </div>
                    <div className="col-span-7 font-sans text-[13px] text-txt-primary font-medium">
                      B.Sc in Computer Science
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-1 items-start">
                    <div className="col-span-5 font-mono text-[10px] text-txt-muted uppercase tracking-wider">
                      CANDIDATE
                    </div>
                    <div className="col-span-7 font-sans text-[13px] text-txt-primary font-medium">
                      Alex Chen
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-1 items-start">
                    <div className="col-span-5 font-mono text-[10px] text-txt-muted uppercase tracking-wider">
                      AUTHORIZED ISSUER
                    </div>
                    <div className="col-span-7 font-sans text-[13px] text-txt-primary font-medium">
                      Stanford University
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-1 items-start">
                    <div className="col-span-5 font-mono text-[10px] text-txt-muted uppercase tracking-wider">
                      ISSUED DATE
                    </div>
                    <div className="col-span-7 font-sans text-[13px] text-txt-primary font-medium">
                      April 2026
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
