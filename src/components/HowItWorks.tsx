import { Send, Hash, Search } from "lucide-react";
import FadeIn from "./FadeIn";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-[120px] bg-bg-base overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Header Block */}
        <div className="text-left mb-16 max-w-2xl">
          <FadeIn>
            {/* Section Eyebrow */}
            <div className="border-l-2 border-brand-purple pl-3 font-mono text-[11px] tracking-[0.1em] text-txt-muted uppercase mb-4">
              VERIFICATION FLOW
            </div>
            
            <h2 className="font-display text-white scale-2xl font-bold mb-4">
              Three steps. One chain. Full trust.
            </h2>
            <p className="font-sans text-txt-secondary scale-base leading-relaxed">
              The entire credential lifecycle handled end to end.
            </p>
          </FadeIn>
        </div>

        {/* Cards Grid — NOT identical asymmetrical grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1 — Institutions Issue (LARGER, spans full width) */}
          <div className="md:col-span-2">
            <FadeIn delay={100}>
              <div className="bg-bg-surface border border-border-main border-t-[3px] border-t-accent-green rounded-lg p-8 relative overflow-hidden group min-h-[220px] flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all">
                {/* Numeral Watermark */}
                <span className="font-display font-bold text-[120px] leading-none text-white opacity-[0.04] absolute bottom-[-20px] right-4 pointer-events-none select-none">
                  01
                </span>

                {/* Content */}
                <div className="space-y-4 max-w-2xl relative z-10 text-left">
                  {/* Icon */}
                  <Send className="w-6 h-6 text-accent-green flex-shrink-0" />
                  
                  <h3 className="font-display text-white text-[20px] font-semibold">
                    Institutions Issue
                  </h3>
                  
                  <p className="font-sans text-txt-secondary scale-base leading-relaxed">
                    Institutions approve and issue credentials directly to candidate profiles. AI-assisted OCR matching confirms document authenticity before any mint occurs.
                  </p>
                </div>

                {/* Role Tag */}
                <div className="font-mono text-[10px] text-txt-muted tracking-wider uppercase mt-6 relative z-10">
                  // ISSUER ROLE
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Card 2 — CredChain Secures */}
          <div>
            <FadeIn delay={150}>
              <div className="bg-bg-surface border border-border-main border-t-[3px] border-t-brand-purple rounded-lg p-8 relative overflow-hidden group min-h-[280px] flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all">
                {/* Numeral Watermark */}
                <span className="font-display font-bold text-[120px] leading-none text-white opacity-[0.04] absolute bottom-[-20px] right-4 pointer-events-none select-none">
                  02
                </span>

                {/* Content */}
                <div className="space-y-4 relative z-10 text-left">
                  {/* Icon */}
                  <Hash className="w-6 h-6 text-brand-purple flex-shrink-0" />
                  
                  <h3 className="font-display text-white text-[20px] font-semibold">
                    CredChain Secures
                  </h3>
                  
                  <p className="font-sans text-txt-secondary scale-base leading-relaxed">
                    Credential proof is anchored on Solana as a tamper-resistant record. Personal data stays off-chain. The hash is the proof.
                  </p>
                </div>

                {/* Role Tag */}
                <div className="font-mono text-[10px] text-txt-muted tracking-wider uppercase mt-6 relative z-10">
                  // PROTOCOL LAYER
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Card 3 — Employers Verify */}
          <div>
            <FadeIn delay={200}>
              <div className="bg-bg-surface border border-border-main border-t-[3px] border-t-accent-amber rounded-lg p-8 relative overflow-hidden group min-h-[280px] flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all">
                {/* Numeral Watermark */}
                <span className="font-display font-bold text-[120px] leading-none text-white opacity-[0.04] absolute bottom-[-20px] right-4 pointer-events-none select-none">
                  03
                </span>

                {/* Content */}
                <div className="space-y-4 relative z-10 text-left">
                  {/* Icon */}
                  <Search className="w-6 h-6 text-accent-amber flex-shrink-0" />
                  
                  <h3 className="font-display text-white text-[20px] font-semibold">
                    Employers Verify
                  </h3>
                  
                  <p className="font-sans text-txt-secondary scale-base leading-relaxed">
                    Scan a QR code or enter a credential ID. The Solana ledger returns a verified match in under a second. No registration required.
                  </p>
                </div>

                {/* Role Tag */}
                <div className="font-mono text-[10px] text-txt-muted tracking-wider uppercase mt-6 relative z-10">
                  // VERIFIER ROLE
                </div>
              </div>
            </FadeIn>
          </div>

        </div>

      </div>
    </section>
  );
}
