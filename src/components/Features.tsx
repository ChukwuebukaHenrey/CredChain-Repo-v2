import { motion } from "motion/react";
import { Brain, Link, Wallet, QrCode, Sparkles, Search } from "lucide-react";

export default function Features() {
  const features = [
    {
      id: "feat-1",
      icon: Brain,
      label: "VISION AI INTERACTIVE CORE",
      title: "AI Document Processing",
      desc: "Instantly parse transcripts and diplomas with our multi-modal model. It maps complex text structures and outputs clean schemas for approval.",
      badge: "Gemini Engine Supported"
    },
    {
      id: "feat-2",
      icon: QrCode,
      label: "LIGHTNING RESPONSE",
      title: "QR Verification",
      desc: "Scan a QR code to fetch immediate verification of authenticity stored on Solana. Zero registration required.",
      badge: "Instant Access"
    },
    {
      id: "feat-3",
      icon: Wallet,
      label: "CANDIDATE PORTFOLIO",
      title: "Credential Portfolio",
      desc: "Own your verified achievements. A digital portfolio where candidates collect and display certified credentials issued by trusted academies.",
      badge: "Verified Profile"
    },
    {
      id: "feat-4",
      icon: Link,
      label: "GLOBAL OPPORTUNITIES",
      title: "Public Profiles",
      desc: "Share a beautiful, public-facing professional page displaying all verified credentials with custom secure review links.",
      badge: "Verified Showcase"
    },
    {
      id: "feat-5",
      icon: Sparkles,
      label: "PROVEN COMPETENCY",
      title: "AI Resume Builder",
      desc: "Build verified resumes directly from credentials issued by authorized schools. Let your background tell a credible story.",
      badge: "100% Genuine Output"
    },
    {
      id: "feat-6",
      icon: Search,
      label: "REDUCED FRICTION",
      title: "Employer Verification",
      desc: "Employers instantly check credentials down to the block depth without tedious paperwork, emails, or waiting queues.",
      badge: "Fast Recruit Funnel"
    }
  ];

  return (
    <section id="features" className="relative py-20 md:py-32 bg-[#08080f] overflow-hidden">
      {/* Visual neon light strip */}
      <div className="absolute top-0 right-0 w-[500px] h-[1px] bg-gradient-to-l from-purple-500/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left max-w-2xl space-y-4 mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full">
            <span className="font-mono text-[10px] uppercase tracking-wider text-purple-400">Core Capabilities</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Forged for Modern Credential Trust
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Eliminate tedious manual inspection. CredChain operates a fully automated, cryptographically secure verification pipeline with high-end developer primitives.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="group relative bg-[#111118]/60 hover:bg-[#111118] border border-white/5 hover:border-purple-500/15 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(124,58,253,0.06)] flex flex-col items-start justify-between min-h-[280px]"
              >
                {/* Visual side highlights */}
                <div className="absolute top-6 left-0 w-1 h-12 bg-purple-500 rounded-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="space-y-4 w-full text-left">
                  {/* Icon Panel */}
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl inline-flex group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-colors">
                    <Icon className="w-5 h-5 text-gray-300 group-hover:text-purple-400 transition-colors" />
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-mono text-[9px] sm:text-[10px] text-gray-400 tracking-widest block uppercase">
                      {feature.label}
                    </span>
                    <h3 className="text-lg font-display font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {feature.title}
                    </h3>
                  </div>

                  <p className="text-gray-400 text-xs sm:text-sm font-sans leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 w-full flex items-center justify-between">
                  <span className="font-mono text-[10px] text-gray-500">
                    // PLATFORM PRÉCIS
                  </span>
                  <span className="font-mono text-[10px] text-teal-400 bg-teal-400/5 px-2.5 py-0.5 border border-teal-500/10 rounded-full">
                    {feature.badge}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
