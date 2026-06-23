import { motion } from "motion/react";
import { ShieldCheck, Cpu, Database, Server, RefreshCw } from "lucide-react";
import { Credential } from "../types";

interface ProofSectionProps {
  latestCredential?: Credential;
}

export default function ProofSection({ latestCredential }: ProofSectionProps) {
  // A beautiful default verified ledger card
  const sampleProof: Credential = latestCredential || {
    id: "cred-77a",
    candidateName: "Alex Chen",
    institution: "Stanford University",
    credentialTitle: "B.Sc in Computer Science",
    gpaOrHonors: "3.98 GPA / Highest Honors",
    issueDate: "June 2026",
    txHash: "sol_tx_7c99e4bF...de81a30",
    blockNumber: 182901309,
    status: "VERIFIED",
    network: "Solana Proof Anchor"
  };

  return (
    <section id="ledger" className="relative py-20 md:py-32 bg-[#08080f] overflow-hidden">
      {/* Absolute glow highlights */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-900/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side Info Grid */}
          <div className="lg:col-span-6 text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full">
              <span className="font-mono text-[10px] uppercase tracking-wider text-purple-400">Anchored Securely</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              An Immutable Ledger<br />
              <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                Not a Proprietary Database.
              </span>
            </h2>

            <div className="space-y-4 text-gray-400 text-sm sm:text-base leading-relaxed">
              <p>
                Traditional verification processes rely on easily editable data or slow manual email queries. These old records are easily forged, altered, or lost.
              </p>
              <p className="font-semibold text-white">
                CredChain is fundamentally different.
              </p>
              <p>
                Each credential is backed by a tamper-resistant proof stored securely on Solana. The actual candidate’s personal details remain safely off-chain, ensuring high privacy compliance.
              </p>
            </div>

            {/* Graphic Comparison */}
            <div className="grid grid-cols-2 gap-4 pt-4 font-mono text-xs">
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-2">
                <div className="flex items-center gap-1.5 text-red-400">
                  <Database className="w-4 h-4" />
                  <span>OLD DATABASE SERVERS</span>
                </div>
                <div className="text-gray-500 text-[10px] space-y-1">
                  <div>• Editable records</div>
                  <div>• Internal control hazards</div>
                  <div>• Slow email processes</div>
                </div>
              </div>

              <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-xl space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <Server className="w-4 h-4" />
                  <span>CREDCHAIN LEDGER</span>
                </div>
                <div className="text-gray-400 text-[10px] space-y-1">
                  <div>• Tamper-resistant proofs</div>
                  <div>• Shared trust framework</div>
                  <div>• Instant automated checks</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Transaction Proof Viewer */}
          <div className="lg:col-span-6 flex justify-center">
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-md bg-[#0d0d16] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative"
            >
              {/* Card Title Header */}
              <div className="bg-gradient-to-r from-purple-950/30 to-black/25 px-5 py-4 border-b border-white/5 flex items-center justify-between font-mono text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <span className="uppercase tracking-widest text-[10px]">Verification Proof Block</span>
                </div>
                <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] text-emerald-400">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>IMMUTABLE WRITE</span>
                </div>
              </div>

              {/* Shimmer Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-transparent pointer-events-none"></div>

              {/* Central Ledger Data Structure */}
              <div className="p-6 space-y-4 text-left">
                
                <div className="space-y-3.5">
                  <div className="border-b border-white/5 pb-3">
                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">TRANSACTION HASH</div>
                    <div className="text-sm font-mono text-white select-all font-bold tracking-tight truncate">
                      {sampleProof.txHash}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-b border-white/5 pb-3">
                    <div>
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">BLOCKCHAIN NETWORK</div>
                      <div className="text-sm font-sans text-purple-300 font-semibold">{sampleProof.network}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">BLOCK NUMBER</div>
                      <div className="text-sm font-mono text-white">#{sampleProof.blockNumber.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="border-b border-white/5 pb-3">
                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">CREDENTIAL SIGNATURE TYPE</div>
                    <div className="text-sm font-sans text-white font-medium">{sampleProof.credentialTitle}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-b border-white/5 pb-3">
                    <div>
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">CANDIDATE / BENEFICIARY</div>
                      <div className="text-sm font-sans text-white">{sampleProof.candidateName}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">AUTHORIZED ISSUER</div>
                      <div className="text-sm font-sans text-white">{sampleProof.institution}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">ISSUED DATE</div>
                      <div className="text-sm font-sans text-white">{sampleProof.issueDate}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">AUTHENTICITY RESULT</div>
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>VERIFIED MATCH</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Verification Stamp Footer */}
                <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl flex items-center justify-between text-[11px] font-mono text-gray-400 mt-6">
                  <span className="flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 text-emerald-400 animate-spin" /> Live Syncing
                  </span>
                  <span>STAMP: SHA256CRYPT // OK</span>
                </div>

              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
