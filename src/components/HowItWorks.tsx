import { motion } from "motion/react";
import { Send, Hash, HeartHandshake } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: "step-1",
      num: "01",
      icon: Send,
      title: "Institutions Issue",
      desc: "Institutions approve and issue credentials directly to candidate profiles, ready for verification.",
      color: "from-purple-500/20 to-purple-600/5",
      borderGlow: "group-hover:border-purple-500/30"
    },
    {
      id: "step-2",
      num: "02",
      icon: Hash,
      title: "CredChain Secures",
      desc: "Credential proofs are anchored securely on Solana as tamper-resistant proofs while personal information remains strictly off-chain.",
      color: "from-teal-500/20 to-teal-600/5",
      borderGlow: "group-hover:border-teal-500/30"
    },
    {
      id: "step-3",
      num: "03",
      icon: HeartHandshake,
      title: "Employers Verify",
      desc: "Employers sweep or scan the QR code or visit a candidate's public profile to confirm credentials instantly.",
      color: "from-emerald-500/20 to-emerald-600/5",
      borderGlow: "group-hover:border-emerald-500/30"
    }
  ];

  return (
    <section id="how-it-works" className="relative py-20 md:py-32 bg-[#05050a] overflow-hidden">
      {/* Decorative vertical glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] bg-purple-900/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-left max-w-2xl space-y-4 mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full">
            <span className="font-mono text-[10px] uppercase tracking-wider text-purple-400">Simplified Trust Workflow</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Trust Unleashed in Three Steps
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Discover how CredChain enables institutions to issue trusted credentials and helps employers verify them in under a second with absolute confidence.
          </p>
        </div>

        {/* 3-Column Steps Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          
          {/* Connecting dashed line - desktop only */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-purple-500/20 via-teal-500/20 to-emerald-500/20 -translate-y-8 pointer-events-none"></div>

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group relative flex flex-col space-y-6"
              >
                {/* Numeric Index */}
                <span className="font-mono text-xs font-semibold text-purple-500/60 uppercase tracking-widest bg-purple-500/5 border border-purple-500/10 px-2.5 py-1 rounded self-start">
                  Index // {step.num}
                </span>

                {/* Main Card Element */}
                <div className={`p-8 bg-[#0f0f18]/95 border border-white/5 rounded-2xl relative transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#11111d] ${step.borderGlow} shadow-lg flex flex-col items-start space-y-6 overflow-hidden`}>
                  
                  {/* Backdrop glowing background gradient */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${step.color} rounded-full blur-2xl opacity-50 group-hover:scale-125 transition-transform duration-500`}></div>

                  {/* Icon Block */}
                  <div className="relative p-4 rounded-xl bg-white/[0.02] border border-white/10 group-hover:border-white/20 transition-colors flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white group-hover:text-emerald-400 transition-colors duration-300" />
                  </div>

                  <div className="space-y-3 relative z-10 text-left">
                    <h3 className="text-lg font-display font-bold text-white group-hover:text-purple-300 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm font-sans leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
