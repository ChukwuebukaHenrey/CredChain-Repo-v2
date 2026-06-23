import { motion } from "motion/react";
import { Sparkles, ArrowRight, Boxes } from "lucide-react";

interface CTASectionProps {
  onOpenDemo: (role?: 'candidate' | 'issuer' | 'verifier') => void;
}

export default function CTASection({ onOpenDemo }: CTASectionProps) {
  return (
    <section className="relative py-24 md:py-36 bg-[#05050a] overflow-hidden">
      {/* Immersive backing radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-[200px] h-[200px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        {/* Decorative Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-600/15 border border-purple-500/25 cursor-pointer"
          onClick={() => onOpenDemo('candidate')}
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-purple-300">
            LAUNCH CREDENTIAL WALLET
          </span>
        </motion.div>

        {/* Headline */}
        <div className="space-y-4">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Your credentials,<br />
            <span className="bg-gradient-to-r from-purple-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              permanently verified.
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
            Eliminate operational delays, forge trust instantly, and join the secure Decentralized Identity network. Set up your digital achievement vault or issue proofs as an authorized institution.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onOpenDemo('candidate')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all duration-200 hover:shadow-[0_0_30px_rgba(124,58,253,0.3)] hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Create your account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onOpenDemo('verifier')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
          >
            <Boxes className="w-4 h-4 text-emerald-400" />
            <span>Try a demo account</span>
          </button>
        </div>

        {/* Tech specifics info lines */}
        <div className="pt-8 border-t border-white/5 max-w-md mx-auto grid grid-cols-3 gap-4 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
          <div>// NO SLOP</div>
          <div>// NO FEES</div>
          <div>// SECURE-PII</div>
        </div>

      </div>
    </section>
  );
}
