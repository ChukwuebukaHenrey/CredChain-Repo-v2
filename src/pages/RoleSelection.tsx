import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Landmark, Building2, ArrowLeft } from "lucide-react";
import Logo from "../components/Logo";

export default function RoleSelection() {
  const navigate = useNavigate();

  const roles = [
    {
      id: "candidate",
      title: "Candidate",
      topBorder: "border-t-[4px] border-t-purple-600",
      badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      icon: User,
      desc: "Request verified credentials from your institution, build AI-powered resumes, and share a verified public profile.",
      btnText: "Join as Candidate",
      route: "/signup/candidate"
    },
    {
      id: "issuer",
      title: "Institution (Issuer)",
      topBorder: "border-t-[4px] border-t-emerald-500",
      badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      icon: Landmark,
      desc: "Become a trusted credential anchor. Issue electronic qualifications and eliminate manual registrar verification loops.",
      btnText: "Join as Issuer",
      route: "/signup/issuer"
    },
    {
      id: "verifier",
      title: "Employer (Verifier)",
      topBorder: "border-t-[4px] border-t-cyan-500",
      badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      icon: Building2,
      desc: "Reduce hiring friction. Find premium talent backed strictly by verified competency audits and instant QR verification codes.",
      btnText: "Join as Verifier",
      route: "/signup/verifier"
    }
  ];

  return (
    <div className="min-h-screen bg-[#05050a] text-white flex flex-col justify-between p-6 sm:p-10 relative">
      {/* Top Header */}
      <header className="max-w-7xl w-full mx-auto flex items-center justify-between">
        <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
          <Logo iconSize={36} showWordmark={true} wordmarkSize="md" />
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl w-full mx-auto my-12 flex-1 flex flex-col justify-center">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Who are you joining as?
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Select your track to begin building trust on the decentralized identity network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.id}
                className={`flex flex-col bg-[#111118] border border-white/5 rounded-2xl p-8 relative hover:-translate-y-1 transition-all duration-300 shadow-xl ${role.topBorder}`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`font-mono text-[10px] font-semibold border px-3 py-1 rounded-full ${role.badgeColor}`}>
                    {role.id.toUpperCase()}
                  </span>
                </div>

                <div className="text-left space-y-3 flex-grow">
                  <h2 className="text-xl font-display font-semibold text-white">
                    {role.title}
                  </h2>
                  <p className="text-gray-400 text-xs sm:text-sm font-sans leading-relaxed">
                    {role.desc}
                  </p>
                </div>

                <div className="pt-8 mt-6 border-t border-white/5">
                  <button
                    onClick={() => navigate(role.route)}
                    className="w-full py-3.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center shadow-lg hover:shadow-[0_0_20px_rgba(124,58,253,0.3)]"
                  >
                    <span>{role.btnText}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Bottom Footer Back Link */}
      <footer className="max-w-7xl w-full mx-auto pt-6 border-t border-white/5">
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
