import { motion } from "motion/react";
import { Sparkles, ShieldCheck, ArrowRight, Play, Cpu, Globe } from "lucide-react";
import { Credential } from "../types";

interface HeroProps {
  onOpenDemo: (role?: 'candidate' | 'issuer' | 'verifier') => void;
  latestCredential?: Credential;
}

export default function Hero({ onOpenDemo, latestCredential }: HeroProps) {
  // A beautiful default credential if no live one is generated yet
  const defaultCred: Credential = {
    id: "cred-889",
    candidateName: "Elena Rostova",
    institution: "Federal Institute of Engineering",
    credentialTitle: "B.Eng in Computer Engineering",
    gpaOrHonors: "4.0 GPA (First Class)",
    issueDate: "June 2026",
    txHash: "sol_tx_92Kx3...z8Pq7w",
    blockNumber: 182901321,
    status: "VERIFIED",
    network: "Solana Proof Anchor"
  };

  const currentCred = latestCredential || defaultCred;

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden">
      {/* Subtle Grid Lines Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.45] z-0">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
        {/* Fade grid lines out on top, bottom, and edges so it blends beautifully */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-transparent to-[#05050a] opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#05050a] via-transparent to-[#05050a] opacity-80"></div>
      </div>

      {/* Background Radial Purple Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[500px] md:w-[700px] h-[300px] sm:h-[400px] md:h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      {/* Green glow accent */}
      <div className="absolute top-10 right-[10%] w-[250px] h-[250px] bg-emerald-900/5 rounded-full blur-[90px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-8">
            {/* Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20"
            >
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-purple-300">
                Verified Credential Verification Platform
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                Verified Credentials.<br />
                <span className="bg-gradient-to-r from-purple-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                  Trusted Talent.
                </span><br />
                Global Opportunities.
              </h1>
              <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-xl font-sans font-normal leading-relaxed">
                CredChain helps institutions issue trusted credentials and enables employers to verify them instantly through QR codes and public profiles.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                onClick={() => onOpenDemo('candidate')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,253,0.4)] hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-3 group"
              >
                <span>Create Candidate Profile</span>
                <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => onOpenDemo()}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer flex items-center justify-center gap-3"
              >
                <Play className="w-4 h-4 text-purple-400 fill-purple-400/40" />
                <span>Try Demo</span>
              </button>
            </motion.div>

            {/* Trust Logos Banner (Mini) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pt-6 border-t border-white/5 max-w-lg"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-mono text-gray-500">
                <span className="uppercase tracking-widest text-[10px]">Security:</span>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div> SECURED BY SOLANA
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div> VERIFIED CORRELATION
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hero Right Visuals - Pulsing live card */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            
            {/* Animated Backdrop light */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 via-emerald-600/5 to-transparent rounded-3xl blur-2xl"></div>

            {/* Simulated Blockchain Node Graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-sm sm:max-w-md bg-[#0d0d16] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative"
            >
              {/* Header card banner */}
              <div className="bg-gradient-to-r from-purple-900/40 to-[#0d0d16] px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-mono text-xs text-gray-400 font-semibold uppercase tracking-wider">
                    Live Transaction Feed
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-purple-300">
                  <Cpu className="w-3 h-3 text-emerald-300" />
                  <span>Solana Proof Anchor</span>
                </div>
              </div>

              {/* Shimmer overlay effect */}
              <div className="absolute inset-x-0 h-40 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none skew-y-12"></div>

              {/* Card Main Body */}
              <div className="p-6 space-y-6">
                
                {/* Visual Certificate Stamp */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold">
                      Verified Credential Portfolio
                    </div>
                    <h3 className="text-xl font-display font-bold text-white leading-tight">
                      {currentCred.credentialTitle}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/35 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                </div>

                {/* Candidate Info */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Candidate Name</div>
                      <div className="text-sm font-medium text-white font-sans">{currentCred.candidateName}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Institution</div>
                      <div className="text-sm font-medium text-white font-sans">{currentCred.institution}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Status</div>
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400">
                        <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                        {currentCred.status}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Network Anchor</div>
                      <div className="text-xs font-mono text-purple-400">{currentCred.network}</div>
                    </div>
                  </div>
                </div>

                {/* Tech specifications of credential anchor */}
                <div className="pt-4 border-t border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-gray-500">TRANSACTION HASH</span>
                    <span className="text-gray-300 font-bold tracking-tight select-all">
                      {currentCred.txHash}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-gray-500">MINTED BLOCK</span>
                    <span className="text-gray-300">#{currentCred.blockNumber.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-gray-500">VERIFICATION TIME</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Globe className="w-3 h-3 animate-spin duration-10000" /> 0.38 Seconds
                    </span>
                  </div>
                </div>

                {/* Instant Verification QR Box */}
                <div className="bg-[#11111d] rounded-xl p-3 border border-white/5 flex items-center gap-3">
                  <div className="p-1 px-1.5 bg-white rounded-lg flex-shrink-0">
                    {/* Simulated QR block code */}
                    <div className="grid grid-cols-4 gap-0.5 w-10 h-10 bg-white">
                      <div className="bg-black"></div><div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div>
                      <div className="bg-black"></div><div className="bg-white"></div><div className="bg-purple-900"></div><div className="bg-black"></div>
                      <div className="bg-white"></div><div className="bg-black"></div><div className="bg-black"></div><div className="bg-white"></div>
                      <div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div><div className="bg-black"></div>
                    </div>
                  </div>
                  <div className="text-left space-y-0.5">
                    <div className="text-[10px] font-mono text-gray-400">PUBLIC VERIFIER LINK</div>
                    <div className="text-xs text-white">Scan QR to instantly confirm cryptographic ledger state</div>
                  </div>
                </div>

              </div>

              {/* Sparkle banner at the bottom */}
              <div className="bg-[#11111d] px-5 py-3 border-t border-white/5 text-[10px] font-mono text-gray-500 flex items-center justify-between">
                <span>SECURED BY SOLANA PROOF TECHNOLOGY</span>
                <span className="text-emerald-400 font-bold">DESIGNED TO REDUCE CREDENTIAL FRAUD</span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
