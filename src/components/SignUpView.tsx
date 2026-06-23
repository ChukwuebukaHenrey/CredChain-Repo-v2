import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, 
  Landmark, 
  Building2, 
  ArrowLeft, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles, 
  QrCode, 
  Cpu, 
  Mail, 
  BookOpen, 
  Lock 
} from "lucide-react";
import Logo from "./Logo";

interface SignUpViewProps {
  onBack: () => void;
  initialRole?: "candidate" | "issuer" | "verifier";
}

export default function SignUpView({ onBack, initialRole = "candidate" }: SignUpViewProps) {
  const [selectedRole, setSelectedRole] = useState<"candidate" | "issuer" | "verifier">(initialRole);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [orgName, setOrgName] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    {
      id: "candidate" as const,
      icon: User,
      title: "Candidate Profile",
      subtitle: "For Students & Professionals",
      desc: "Build your professional profile with verified achievements issued by trusted institutions.",
      features: [
        "Aggregate validated degrees, courses, and honors.",
        "Generate automated, fraud-proof resumes from verified proofs.",
        "Share a public profile with verified badges or a scan-ready QR code."
      ],
      color: "border-purple-500/30 hover:border-purple-500 bg-purple-500/5",
      iconColor: "text-purple-400",
      accentBg: "bg-purple-600 hover:bg-purple-500"
    },
    {
      id: "issuer" as const,
      icon: Landmark,
      title: "Institution Account",
      subtitle: "For Universities & Academies",
      desc: "Become a trusted milestone anchor. Issue digital, tamper-resistant credentials to graduates.",
      features: [
        "Process diplomas and records instantly using Vision AI parser.",
        "Securely approve candidate qualification logs.",
        "Anchor tamper-proof records to Solana without exposing private candidate data."
      ],
      color: "border-emerald-500/30 hover:border-emerald-500 bg-emerald-500/5",
      iconColor: "text-emerald-400",
      accentBg: "bg-emerald-600 hover:bg-emerald-500"
    },
    {
      id: "verifier" as const,
      icon: Building2,
      title: "Verifier Console",
      subtitle: "For Employers & Recruiters",
      desc: "Instantly audit applicant profiles, eliminate background fraud, and fast-track hiring.",
      features: [
        "Scan QR credentials to verify true academic origins instantly.",
        "Read verified digital transcripts without administrative delay.",
        "Direct background checks built purely on tamper-resistant Solana proofs."
      ],
      color: "border-cyan-500/30 hover:border-cyan-500 bg-cyan-500/5",
      iconColor: "text-cyan-400",
      accentBg: "bg-cyan-600 hover:bg-cyan-500"
    }
  ];

  const activeRoleConfig = roles.find((r) => r.id === selectedRole)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;
    
    setIsLoading(true);
    // Mimic secure account provisioning
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#05050a] flex flex-col relative overflow-hidden">
      {/* Visual background pattern grids matching our system instructions */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.25] z-0">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <pattern id="signup-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#signup-grid)" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-transparent to-[#05050a] opacity-90"></div>
      </div>

      {/* Floating purple & cyan glow spheres */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-emerald-950/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-mono uppercase text-gray-400 hover:text-white transition-colors py-1.5 px-3 rounded-lg bg-white/5 border border-white/5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        </div>
        <Logo iconSize={34} showWordmark={true} wordmarkSize="md" />
        <div className="w-20 sm:block hidden"></div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center relative z-10 py-10 px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="signup-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full max-w-5xl bg-[#111118]/85 border border-white/5 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 gap-10"
            >
              {/* Left Column: Role Picker & Features Highlights */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full mb-3 border border-white/5">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    <span className="font-mono text-[9px] uppercase tracking-wider text-purple-300">
                      Trust Network Registration
                    </span>
                  </div>
                  <h1 className="text-3xl font-display font-medium text-white tracking-tight leading-tight">
                    Join CredChain
                  </h1>
                  <p className="text-gray-400 text-sm mt-2 font-light">
                    Select your platform role to discover custom-tailored capabilities and configure your credentials portal.
                  </p>
                </div>

                {/* Role Switcher */}
                <div className="space-y-3">
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block font-bold">
                    Select your registration track:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {roles.map((role) => {
                      const IconComponent = role.icon;
                      const isSelected = selectedRole === role.id;
                      return (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => setSelectedRole(role.id)}
                          className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-300 flex flex-col gap-2 ${
                            isSelected
                              ? "bg-white/5 border-white/30 shadow-[0_4px_20px_rgba(255,255,255,0.02)]"
                              : "bg-transparent border-white/5 hover:border-white/15"
                          }`}
                        >
                          <IconComponent
                            className={`w-5 h-5 ${
                              isSelected ? role.iconColor : "text-gray-500"
                            } transition-colors`}
                          />
                          <div>
                            <div className="text-xs font-semibold text-white leading-tight">
                              {role.title.split(" ")[0]}
                            </div>
                            <div className="text-[10px] text-gray-400 mt-0.5 leading-none">
                              {role.id === "candidate"
                                ? "Personal"
                                : role.id === "issuer"
                                ? "Institutions"
                                : "Employers"}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Role Feature Explanation */}
                <div className="space-y-4 pt-6 border-t border-white/5 bg-white/[0.01] p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="p-1 px-2 rounded font-mono text-[9px] bg-white/5 text-gray-400 uppercase tracking-wider">
                      FEATURES INDEX
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">
                    {activeRoleConfig.desc}
                  </p>
                  <ul className="space-y-2.5">
                    {activeRoleConfig.features.map((feat, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-xs text-gray-400 leading-relaxed">
                        <CheckCircle className={`w-3.5 h-3.5 ${activeRoleConfig.iconColor} flex-shrink-0 mt-0.5`} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Beautiful Placeholder Sign Up Form */}
              <div className="lg:col-span-6 bg-[#161622]/50 border border-white/5 rounded-xl p-5 sm:p-7 flex flex-col justify-center">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-0.5">
                    <h2 className="text-sm font-semibold uppercase font-mono tracking-widest text-gray-300">
                      Sign Up Details
                    </h2>
                    <p className="text-xs text-gray-500">
                      Standard sandbox test registry on Solana Proof Anchor.
                    </p>
                  </div>

                  {/* Complete form elements with realistic styling */}
                  <div className="space-y-4">
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="fullName" className="text-xs font-mono text-gray-400">
                        {selectedRole === "candidate" ? "FULL LEGAL NAME" : "ACCOUNT REPRESENTATIVE NAME"}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                        <input
                          id="fullName"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder={
                            selectedRole === "candidate"
                              ? "e.g. Elena Rostova"
                              : "e.g. Dr. Thomas Vance"
                          }
                          className="w-full bg-[#0d0d14] border border-white/5 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400 text-white placeholder-gray-600"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label htmlFor="email" className="text-xs font-mono text-gray-400">
                        WORK EMAIL ADDRESS
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                        <input
                          id="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. registrar@institute.edu"
                          className="w-full bg-[#0d0d14] border border-white/5 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400 text-white placeholder-gray-600"
                        />
                      </div>
                    </div>

                    {selectedRole !== "candidate" && (
                      <div className="space-y-1.5 text-left">
                        <label htmlFor="orgName" className="text-xs font-mono text-gray-400 font-bold">
                          {selectedRole === "issuer" ? "UNIVERSITY / INSTITUTION NAME" : "EMPLOYER / COMPANY NAME"}
                        </label>
                        <div className="relative">
                          <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                          <input
                            id="orgName"
                            type="text"
                            required
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                            placeholder={
                              selectedRole === "issuer"
                                ? "e.g. Stanford University"
                                : "e.g. Acme Corporation"
                            }
                            className="w-full bg-[#0d0d14] border border-white/5 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400 text-white placeholder-gray-600"
                          />
                        </div>
                      </div>
                    )}

                    <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl text-[11px] text-gray-400 text-left flex gap-2.5">
                      <Cpu className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                      <div>
                        Your account credentials are securely linked. Proof anchors are generated on Solana with <span className="font-semibold text-white">0% administrative fees</span>.
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3.5 rounded-xl font-semibold text-sm cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 ${
                      isLoading
                        ? "bg-purple-800/40 text-purple-400 cursor-not-allowed"
                        : "bg-purple-600 text-white hover:bg-purple-500 hover:shadow-[0_0_20px_rgba(124,58,253,0.3)]"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Provisioning Domain Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Configure My Profile</span>
                      </>
                    )}
                  </button>

                  <div className="text-[10px] text-gray-500 font-mono text-center">
                    🔒 Security Standard GDPR Compliant // Secured by Solana
                  </div>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#111118]/90 border border-white/5 rounded-2xl p-8 text-center space-y-6 shadow-2xl backdrop-blur-md"
            >
              <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/20 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                <ShieldCheck className="w-8 h-8 text-purple-400" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-display font-medium text-white tracking-tight">
                  Registration Initialized
                </h2>
                <p className="text-xs text-purple-300 font-mono tracking-wider">
                  SOLANA PROOF ANCHOR PORTAL COMPLETED
                </p>
                <p className="text-gray-400 text-sm font-light mt-3 leading-relaxed">
                  Excellent! Your digital registry account has been structured. The next phase redirects to the production identity portal once configured.
                </p>
              </div>

              <div className="p-4 bg-[#161622]/50 border border-white/5 rounded-xl text-left font-mono text-xs text-gray-500 space-y-1">
                <div>REGISTRY: <span className="text-white">CredChain Core</span></div>
                <div>ACCOUNT: <span className="text-white">{fullName}</span></div>
                <div>ROLE: <span className="text-white uppercase">{selectedRole}</span></div>
                <div>STATE: <span className="text-emerald-400">ACTIVE PROOF GENERATED</span></div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={onBack}
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm cursor-pointer transition-all hover:shadow-[0_0_15px_rgba(124,58,253,0.3)]"
                >
                  Return to Home screen
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
