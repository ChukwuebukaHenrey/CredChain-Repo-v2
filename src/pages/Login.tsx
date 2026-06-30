import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Mail, Lock, LogIn, Sparkles, User, Landmark, Building2, ArrowRight } from "lucide-react";
import Logo from "../components/Logo";
import AuthLeftPanel from "../components/AuthLeftPanel";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleParam = (searchParams.get("role") || "candidate") as "candidate" | "issuer" | "verifier";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const lower = email.toLowerCase();
    let role = "candidate";
    let route = "/dashboard";
    if (lower.includes("registrar") || lower.includes("issuer") || lower.includes("futo")) {
      role = "issuer";
      route = "/issuer";
    } else if (lower.includes("recruiter") || lower.includes("verifier") || lower.includes("employer") || lower.includes("acme")) {
      role = "verifier";
      route = "/verifier";
    }
    localStorage.setItem("credchain_role", role);
    localStorage.setItem("cc_user", JSON.stringify({ email, role, fullName: email.split("@")[0] }));
    navigate(route);
  };

  const handleOneTapAuth = (route: string, role: string) => {
    localStorage.setItem("credchain_role", role);
    const mockUsers: Record<string, any> = {
      candidate: { fullName: "Emeka Obi", email: "emeka@demo.io", role: "candidate", skills: ["React", "Solidity", "Rust"] },
      issuer: { instName: "Federal University of Technology Owerri", email: "registrar@futo.ng", role: "issuer", verified: true },
      verifier: { fullName: "Audit Desk", companyName: "Acme Corp", workEmail: "audit@acme.com", role: "verifier" },
    };
    localStorage.setItem("cc_user", JSON.stringify(mockUsers[role] || mockUsers.candidate));
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-[#05050a] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative select-none">
      {/* Mobile / Small screen Top Header (< 900px) */}
      <header className="max-w-7xl w-full mx-auto block min-[900px]:hidden">
        <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
          <Logo iconSize={36} showWordmark={true} wordmarkSize="md" />
        </Link>
      </header>

      {/* Centered Main Content Area */}
      <main className="flex-1 flex items-center justify-center my-6 w-full">
        {/* =========================================================================
            DESKTOP TWO-PANEL SAAS CONTAINER (min-width: 900px)
        ========================================================================= */}
        <div className="hidden min-[900px]:flex w-[88vw] max-w-[1580px] h-[86vh] max-h-[940px] min-h-[660px] bg-[#0d0718] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)]">
          <AuthLeftPanel role={roleParam} />

          <div className="w-[55%] bg-[#10091d] p-10 lg:p-14 xl:p-16 flex flex-col justify-between text-left relative overflow-y-auto h-full">
            <div>
              <div className="mb-8 space-y-1.5">
                <h1 className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-white">
                  Sign in
                </h1>
                <p className="text-sm text-gray-400 font-sans">
                  Access your CredChain identity or portal desk.
                </p>
              </div>

              {/* Demo Sandbox Block */}
              <div className="bg-[#0b0517] border border-purple-500/20 rounded-2xl p-5 lg:p-6 mb-8 space-y-3 shadow-inner">
                <div className="text-[11px] font-mono font-bold text-purple-300 tracking-wider flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span>ONE-TAP INSTANT DEMO AUTH</span>
                </div>
                <div className="space-y-2.5 font-sans">
                  <div
                    onClick={() => handleOneTapAuth("/dashboard", "candidate")}
                    className="flex items-center justify-between p-3 bg-[#130b24] hover:bg-cyan-500/15 border border-white/5 hover:border-cyan-500/40 rounded-xl cursor-pointer transition-all group shadow-sm"
                  >
                    <div className="flex items-center gap-3 text-sm font-semibold text-gray-200">
                      <span className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono text-xs font-bold">
                        C
                      </span>
                      <span className="group-hover:text-white transition-colors">Candidate Vault</span>
                    </div>
                    <span className="font-mono text-xs text-gray-400 group-hover:text-cyan-400 transition-colors">
                      emeka@demo.io →
                    </span>
                  </div>

                  <div
                    onClick={() => handleOneTapAuth("/issuer", "issuer")}
                    className="flex items-center justify-between p-3 bg-[#130b24] hover:bg-emerald-500/15 border border-white/5 hover:border-emerald-500/40 rounded-xl cursor-pointer transition-all group shadow-sm"
                  >
                    <div className="flex items-center gap-3 text-sm font-semibold text-gray-200">
                      <span className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold">
                        I
                      </span>
                      <span className="group-hover:text-white transition-colors">Institution Desk</span>
                    </div>
                    <span className="font-mono text-xs text-gray-400 group-hover:text-emerald-400 transition-colors">
                      registrar@futo.ng →
                    </span>
                  </div>

                  <div
                    onClick={() => handleOneTapAuth("/verifier", "verifier")}
                    className="flex items-center justify-between p-3 bg-[#130b24] hover:bg-purple-500/15 border border-white/5 hover:border-purple-500/40 rounded-xl cursor-pointer transition-all group shadow-sm"
                  >
                    <div className="flex items-center gap-3 text-sm font-semibold text-gray-200">
                      <span className="w-6 h-6 rounded-md bg-purple-500/20 text-purple-400 flex items-center justify-center font-mono text-xs font-bold">
                        V
                      </span>
                      <span className="group-hover:text-white transition-colors">Employer Desk</span>
                    </div>
                    <span className="font-mono text-xs text-gray-400 group-hover:text-purple-400 transition-colors">
                      audit@acme.com →
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs font-mono font-semibold text-gray-500 tracking-wider">
                  OR MANUAL LOGIN
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <form onSubmit={handleSignIn} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider block">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-[#0a0515] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider block">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#0a0515] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 shadow-lg hover:shadow-[0_0_25px_rgba(124,58,253,0.4)] mt-4"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign in</span>
                </button>
              </form>
            </div>

            <div className="pt-6 text-center text-sm text-gray-400 mt-8 border-t border-white/5 font-sans">
              Don't have an account?{" "}
              <Link
                to={roleParam ? `/signup/${roleParam}` : "/role"}
                className="text-purple-400 font-semibold hover:underline"
              >
                Create one here
              </Link>
            </div>
          </div>
        </div>

        {/* =========================================================================
            MOBILE / SINGLE-COLUMN CARD (< 900px)
        ========================================================================= */}
        <div className="block min-[900px]:hidden w-full max-w-md bg-[#111118] border border-white/5 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Sign In
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 font-sans">
              Access your CredChain identity or portal desk.
            </p>
          </div>

          <div className="p-4 bg-gradient-to-br from-purple-500/10 via-emerald-500/5 to-cyan-500/10 border border-purple-500/20 rounded-xl space-y-3">
            <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-semibold text-purple-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>ONE-TAP INSTANT DEMO AUTH</span>
            </div>
            <p className="text-[11px] text-gray-400 text-center leading-relaxed font-sans">
              Tap any role below to instantly authenticate and test live dashboards.
            </p>

            <div className="space-y-2 pt-1 font-sans">
              <button
                type="button"
                onClick={() => handleOneTapAuth("/dashboard", "candidate")}
                className="w-full py-2.5 px-3.5 bg-[#161622] hover:bg-purple-600/20 border border-purple-500/30 hover:border-purple-500 rounded-xl text-xs font-medium text-white transition-all cursor-pointer flex justify-between items-center group shadow-md"
              >
                <div className="flex items-center gap-2.5 text-purple-300">
                  <User className="w-4 h-4 text-purple-400" />
                  <span className="font-semibold text-white">Candidate Vault</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-purple-400 group-hover:text-white">
                  <span>emeka@demo.io</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleOneTapAuth("/issuer", "issuer")}
                className="w-full py-2.5 px-3.5 bg-[#161622] hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500 rounded-xl text-xs font-medium text-white transition-all cursor-pointer flex justify-between items-center group shadow-md"
              >
                <div className="flex items-center gap-2.5 text-emerald-300">
                  <Landmark className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-white">Institution Desk</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 group-hover:text-white">
                  <span>registrar@futo.ng</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleOneTapAuth("/verifier", "verifier")}
                className="w-full py-2.5 px-3.5 bg-[#161622] hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500 rounded-xl text-xs font-medium text-white transition-all cursor-pointer flex justify-between items-center group shadow-md"
              >
                <div className="flex items-center gap-2.5 text-cyan-300">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold text-white">Employer Desk</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-cyan-400 group-hover:text-white">
                  <span>audit@acme.com</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-4 text-[10px] font-mono text-gray-500 uppercase">
              Or manual login
            </span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-mono text-gray-400">EMAIL ADDRESS</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#08080f] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-600 font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-xs font-mono text-gray-400">PASSWORD</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#08080f] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-600 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_20px_rgba(124,58,253,0.3)] font-sans"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          </form>

          <div className="pt-4 border-t border-white/5 text-center text-xs text-gray-400 font-sans">
            Don't have an account?{" "}
            <Link to="/role" className="text-purple-400 font-semibold hover:underline">
              Create one here
            </Link>
          </div>
        </div>
      </main>

      {/* Bottom Footer Back Link (< 900px) */}
      <footer className="max-w-7xl w-full mx-auto pt-6 border-t border-white/5 block min-[900px]:hidden">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to home</span>
        </Link>
      </footer>
    </div>
  );
}
