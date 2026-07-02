import { Link, useNavigate } from "react-router-dom";
import { User, GraduationCap, Briefcase, ArrowLeft, Check } from "lucide-react";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";

interface RoleCard {
  id: "candidate" | "issuer" | "verifier";
  title: string;
  desc: string;
  icon: React.ReactNode;
  btnText: string;
  route: string;
  borderClass: string;
  labelClass: string;
  perks: string[];
}

const roles: RoleCard[] = [
  {
    id: "candidate",
    title: "Candidate",
    desc: "Request verified credentials from your institution, build AI-powered resumes, and share a verified public profile.",
    icon: <User className="w-5 h-5" strokeWidth={1.75} />,
    btnText: "Join as Candidate",
    route: "/signup/candidate",
    borderClass: "border-t-role-candidate",
    labelClass: "text-role-candidate",
    perks: ["Vault for academic & professional proofs", "AI-built verified resumes", "Public QR identity profile"],
  },
  {
    id: "issuer",
    title: "Institution",
    desc: "Become a trusted credential anchor. Issue electronic qualifications and eliminate manual registrar verification loops.",
    icon: <GraduationCap className="w-5 h-5" strokeWidth={1.75} />,
    btnText: "Join as Issuer",
    route: "/signup/issuer",
    borderClass: "border-t-role-issuer",
    labelClass: "text-role-issuer",
    perks: ["Cryptographic signing authority", "Batch CSV issuance", "Revocation & ledger control"],
  },
  {
    id: "verifier",
    title: "Employer",
    desc: "Reduce hiring friction. Find premium talent backed by verified competency audits and instant QR verification.",
    icon: <Briefcase className="w-5 h-5" strokeWidth={1.75} />,
    btnText: "Join as Verifier",
    route: "/signup/verifier",
    borderClass: "border-t-role-verifier",
    labelClass: "text-role-verifier",
    perks: ["Instant cryptographic verification", "Saved talent pool dossiers", "REST API + webhooks"],
  },
];

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-base text-txt-primary flex flex-col p-6 sm:p-8 relative">
      {/* Header */}
      <header className="max-w-7xl w-full mx-auto flex items-center justify-between">
        <Link to="/" aria-label="Home" className="inline-block hover:opacity-90 transition-opacity">
          <Logo wordmarkSize="md" />
        </Link>
        <ThemeToggle />
      </header>

      {/* Main */}
      <main className="max-w-6xl w-full mx-auto my-12 flex-1 flex flex-col justify-center">
        <div className="text-left max-w-3xl mb-12">
          <div className="border-l-2 border-brand-purple pl-3 font-mono text-[11px] tracking-[0.18em] text-txt-muted uppercase mb-4">
            CHOOSE YOUR TRACK
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-txt-primary leading-tight">
            Who are you joining as?
          </h1>
          <p className="text-txt-secondary text-sm sm:text-base mt-3 max-w-2xl">
            Select your track to begin building trust on the decentralized identity network. Each role has a tailored console.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div
              key={role.id}
              className={`flex flex-col bg-bg-surface border border-border-main border-t-[3px] ${role.borderClass} rounded-lg p-7 transition-colors duration-200 hover:border-border-strong`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-2.5 rounded-md border border-border-main bg-bg-sunken text-txt-secondary">
                  {role.icon}
                </div>
                <span className={`font-mono text-[10px] tracking-wider font-semibold ${role.labelClass}`}>
                  // {role.id.toUpperCase()}
                </span>
              </div>

              <div className="text-left space-y-3 flex-grow">
                <h2 className="text-[20px] font-display font-bold text-txt-primary">{role.title}</h2>
                <p className="text-txt-secondary text-sm leading-relaxed">{role.desc}</p>

                <ul className="space-y-2 pt-3 border-t border-border-subtle">
                  {role.perks.map((p, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px] text-txt-secondary">
                      <Check className={`w-3.5 h-3.5 ${role.labelClass} flex-shrink-0 mt-0.5`} strokeWidth={2.5} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-border-subtle">
                <button
                  onClick={() => navigate(role.route)}
                  className="w-full py-2.5 px-4 rounded-md bg-brand-purple hover:bg-brand-purple-dim text-white font-semibold text-sm transition-colors cursor-pointer"
                >
                  {role.btnText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl w-full mx-auto pt-6 border-t border-border-subtle">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-txt-muted hover:text-txt-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to home</span>
        </Link>
      </footer>
    </div>
  );
}
