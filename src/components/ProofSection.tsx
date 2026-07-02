import { Check, X } from "lucide-react";
import FadeIn from "./FadeIn";
import { ProofBlockCard } from "./Hero";

export default function ProofSection() {
  return (
    <section id="ledger" className="py-24 md:py-[120px] bg-bg-base overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column — Explanation + comparison panels */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <FadeIn>
              <div className="border-l-2 border-role-candidate pl-3 font-mono text-[11px] tracking-[0.18em] text-txt-muted uppercase mb-4">
                ANCHORED SECURELY
              </div>

              <h2 className="font-display text-txt-primary scale-2xl font-bold mb-2">
                An Immutable Ledger.
              </h2>
              <h3 className="font-display text-txt-secondary scale-2xl font-bold mb-6">
                Not a proprietary database.
              </h3>

              <p className="font-sans text-txt-secondary scale-base leading-relaxed mb-8">
                Traditional verification relies on editable records and manual email queries. Those systems are slow, opaque, and forgeable.
                <br />
                <br />
                CredChain is structurally different. Every credential is backed by a cryptographic proof on Solana. Personal data stays off-chain. The hash is the proof.
              </p>

              {/* Old vs new comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ComparisonPanel
                  tone="negative"
                  label="OLD: DATABASE RECORDS"
                  items={[
                    "Editable by insiders",
                    "Slow email verification",
                    "Forgery is undetectable",
                  ]}
                />
                <ComparisonPanel
                  tone="positive"
                  label="NEW: CREDCHAIN LEDGER"
                  items={[
                    "Tamper-evident cryptographic proofs",
                    "Sub-second automated checks",
                    "Shared trust, no PII on-chain",
                  ]}
                />
              </div>
            </FadeIn>
          </div>

          {/* Right Column — Proof block card with different credential data */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <FadeIn delay={150}>
              <ProofBlockCard
                txHash="sol_tx_7c99e4bF_s_de81a30"
                blockNumber="#182,901,309"
                credentialType="B.Sc in Computer Science"
                candidate="Alex Chen"
                issuer="Stanford University"
                issuedDate="April 2026"
              />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ComparisonPanelProps {
  tone: "positive" | "negative";
  label: string;
  items: string[];
}

function ComparisonPanel({ tone, label, items }: ComparisonPanelProps) {
  const isPositive = tone === "positive";
  const Icon = isPositive ? Check : X;
  const borderClass = isPositive ? "border-l-hash-green" : "border-l-hash-red";
  const bgClass = isPositive ? "bg-hash-green/5" : "bg-hash-red/5";
  const labelColor = isPositive ? "text-hash-green" : "text-hash-red";
  const iconColor = isPositive ? "text-hash-green" : "text-hash-red";

  return (
    <div className={`border-l-2 ${borderClass} ${bgClass} p-4 rounded-sm`}>
      <div className={`font-mono text-[11px] ${labelColor} font-semibold mb-3 tracking-wider`}>
        {label}
      </div>
      <ul className="space-y-2 font-sans text-[13px] text-txt-secondary">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <Icon className={`w-4 h-4 ${iconColor} flex-shrink-0 mt-0.5`} strokeWidth={2.25} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
