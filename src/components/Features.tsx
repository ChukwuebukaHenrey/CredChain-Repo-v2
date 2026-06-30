import { Brain, QrCode, Archive, Sparkles, User, FileSpreadsheet } from "lucide-react";
import FadeIn from "./FadeIn";

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-[120px] bg-bg-base overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-left mb-16 max-w-2xl">
          <FadeIn>
            <div className="border-l-2 border-brand-purple pl-3 font-mono text-[11px] tracking-[0.1em] text-txt-muted uppercase mb-4">
              CORE CAPABILITIES
            </div>
            <h2 className="font-display text-white scale-2xl font-bold">
              Built for the entire credential lifecycle.
            </h2>
          </FadeIn>
        </div>

        {/* Feature Grid — NOT all identical grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1 — Standard */}
          <FadeIn delay={100}>
            <div className="bg-bg-surface border border-border-main rounded-lg p-8 h-full flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all min-h-[220px]">
              <div className="space-y-4 text-left">
                <Brain className="w-6 h-6 text-txt-muted" />
                <h3 className="font-display text-white text-[18px] font-bold">
                  AI Document Processing
                </h3>
                <p className="font-sans text-txt-secondary scale-sm leading-relaxed">
                  Transcripts and diplomas parsed by multi-modal AI. Clean structured output, ready for approval.
                </p>
              </div>
              <div className="font-mono text-[10px] text-txt-muted mt-6 uppercase tracking-wider">
                // VISION AI
              </div>
            </div>
          </FadeIn>

          {/* Card 2 — Standard */}
          <FadeIn delay={150}>
            <div className="bg-bg-surface border border-border-main rounded-lg p-8 h-full flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all min-h-[220px]">
              <div className="space-y-4 text-left">
                <QrCode className="w-6 h-6 text-txt-muted" />
                <h3 className="font-display text-white text-[18px] font-bold">
                  QR Verification
                </h3>
                <p className="font-sans text-txt-secondary scale-sm leading-relaxed">
                  Scan any CredChain QR code for instant on-chain confirmation. Zero registration required.
                </p>
              </div>
              <div className="font-mono text-[10px] text-txt-muted mt-6 uppercase tracking-wider">
                // LIGHTNING RESPONSE
              </div>
            </div>
          </FadeIn>

          {/* Card 3 — Standard */}
          <FadeIn delay={200}>
            <div className="bg-bg-surface border border-border-main rounded-lg p-8 h-full flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all min-h-[220px]">
              <div className="space-y-4 text-left">
                <Archive className="w-6 h-6 text-txt-muted" />
                <h3 className="font-display text-white text-[18px] font-bold">
                  Credential Vault
                </h3>
                <p className="font-sans text-txt-secondary scale-sm leading-relaxed">
                  Every verified credential in one place. Owned by the candidate, not the institution.
                </p>
              </div>
              <div className="font-mono text-[10px] text-txt-muted mt-6 uppercase tracking-wider">
                // CANDIDATE PORTFOLIO
              </div>
            </div>
          </FadeIn>

          {/* Row 2 - Wide Card 4 (AI Resume Builder) */}
          <div className="lg:col-span-2 lg:row-span-2">
            <FadeIn delay={250}>
              <div className="bg-bg-surface border border-border-main rounded-lg p-8 h-full flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all min-h-[300px] lg:min-h-0">
                <div className="space-y-6 text-left">
                  <div className="flex items-center gap-4">
                    <Sparkles className="w-8 h-8 text-txt-muted flex-shrink-0" />
                    <div>
                      <h3 className="font-display text-white text-[24px] font-bold">
                        AI Resume Builder
                      </h3>
                      <div className="font-mono text-[10px] text-txt-muted uppercase tracking-wider mt-1">
                        // PROVEN COMPETENCY
                      </div>
                    </div>
                  </div>
                  <p className="font-sans text-txt-secondary scale-base leading-relaxed max-w-xl">
                    Build a verified resume directly from your on-chain credentials. Every claim backed by institutional proof. Share with a link or export as PDF.
                  </p>
                </div>
                <div className="border-t border-border-subtle pt-6 mt-6 flex items-center justify-between text-txt-muted text-[11px] font-mono">
                  <span>SECURED CREDENTIAL MAPPING SYSTEM</span>
                  <span className="text-accent-cyan">STABLE MINT V1.0</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Card 5 — Narrow (Public Profiles) */}
          <FadeIn delay={300}>
            <div className="bg-bg-surface border border-border-main rounded-lg p-8 h-full flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all min-h-[200px]">
              <div className="space-y-4 text-left">
                <User className="w-6 h-6 text-txt-muted" />
                <h3 className="font-display text-white text-[18px] font-bold">
                  Public Profiles
                </h3>
                <p className="font-sans text-txt-secondary scale-sm leading-relaxed">
                  A candidate-facing profile page showing all verified credentials with shareable QR links.
                </p>
              </div>
              <div className="font-mono text-[10px] text-txt-muted mt-6 uppercase tracking-wider">
                // GLOBAL OPPORTUNITIES
              </div>
            </div>
          </FadeIn>

          {/* Card 6 — Narrow (Employer Verification) */}
          <FadeIn delay={350}>
            <div className="bg-bg-surface border border-border-main rounded-lg p-8 h-full flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all min-h-[200px]">
              <div className="space-y-4 text-left">
                <FileSpreadsheet className="w-6 h-6 text-txt-muted" />
                <h3 className="font-display text-white text-[18px] font-bold">
                  Employer Verification
                </h3>
                <p className="font-sans text-txt-secondary scale-sm leading-relaxed">
                  Bulk verify candidate pools via CSV upload. Instant results against the Solana ledger.
                </p>
              </div>
              <div className="font-mono text-[10px] text-txt-muted mt-6 uppercase tracking-wider">
                // REDUCED FRICTION
              </div>
            </div>
          </FadeIn>

        </div>

      </div>
    </section>
  );
}
