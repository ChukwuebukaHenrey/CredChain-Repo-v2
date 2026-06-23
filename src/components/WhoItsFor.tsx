import { motion } from "motion/react";
import { User, Landmark, Building2, CheckCircle } from "lucide-react";

interface WhoItsForProps {
  onOpenDemo: (role?: 'candidate' | 'issuer' | 'verifier') => void;
}

export default function WhoItsFor({ onOpenDemo }: WhoItsForProps) {
  const roles = [
    {
      id: "candidate",
      badge: "CANDIDATE PORTAL",
      badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      topBorder: "border-t-[4px] border-t-purple-600",
      icon: User,
      title: "Students & Job Seekers",
      desc: "Build your professional profile with verified achievements issued by trusted institutions. Showcase proven qualifications instantly.",
      capabilities: [
        "Request genuine credentials from universities",
        "Build automated AI resumes in seconds",
        "Share custom verification codes on profiles",
        "Verify professional integrity instantly"
      ],
      btnText: "Create Candidate Profile"
    },
    {
      id: "issuer",
      badge: "ISSUER CENTRAL",
      badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      topBorder: "border-t-[4px] border-t-emerald-500",
      icon: Landmark,
      title: "Universities & Academies",
      desc: "Become a trusted credential anchor. Automatically approve request logs, issue electronic qualifications, and eliminate manual registrar verification loops.",
      capabilities: [
        "AI-assisted document structure parser",
        "Approve candidate credential requests",
        "Secure digital credential signatures",
        "Reduce manual verification paperwork"
      ],
      btnText: "Open Issuer Dashboard"
    },
    {
      id: "verifier",
      badge: "VERIFIER INTERFACE",
      badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      topBorder: "border-t-[4px] border-t-cyan-500",
      icon: Building2,
      title: "Employers & Recruiters",
      desc: "Reduce hiring friction. Find premium talent backed strictly by verified competency audits, complete degree checks, and instant QR verification codes.",
      capabilities: [
        "Scan instant QR verification codes",
        "Verify student profiles instantly",
        "Reduce hiring friction & fraud checks",
        "Fast-track verified talent to shortlists"
      ],
      btnText: "Access Verifier Desk"
    }
  ];

  return (
    <section id="who-it-for" className="relative py-20 md:py-32 bg-[#05050a] overflow-hidden">
      {/* Dynamic background glow */}
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-emerald-950/10 rounded-full blur-[110px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left max-w-2xl space-y-4 mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full">
            <span className="font-mono text-[10px] uppercase tracking-wider text-purple-400">Target Ecosystem</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Unified Ecosystem, Specialized UI
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            CredChain connects candidates, institutions, and employers in a unified environment, with distinct workflows designed for clear goals.
          </p>
        </div>

        {/* Roles 3-Column Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {roles.map((role, i) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`flex flex-col bg-[#111118] border border-white/5 rounded-2xl p-8 relative hover:-translate-y-1 transition-all duration-300 shadow-xl ${role.topBorder}`}
              >
                {/* Header Badge */}
                <div className="flex justify-between items-start mb-6">
                  <span className={`font-mono text-[9px] sm:text-[10px] font-semibold border px-3 py-1 rounded-full ${role.badgeColor}`}>
                    {role.badge}
                  </span>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-300">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Info block */}
                <div className="text-left space-y-3 flex-grow">
                  <h3 className="text-xl font-display font-semibold text-white">
                    {role.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm font-sans leading-relaxed min-h-[100px] sm:min-h-[80px]">
                    {role.desc}
                  </p>

                  {/* Capabilities List */}
                  <div className="pt-6 border-t border-white/5 space-y-3">
                    <span className="font-mono text-[10px] tracking-widest text-gray-500 block">
                      CAPABILITIES // FEATURED
                    </span>
                    <ul className="space-y-2.5">
                      {role.capabilities.map((cap, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Direct Demo Trigger CTA */}
                <div className="pt-8 mt-6 border-t border-white/5">
                  <button
                    onClick={() => onOpenDemo(role.id as any)}
                    className="w-full py-3.5 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-medium text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{role.btnText}</span>
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
