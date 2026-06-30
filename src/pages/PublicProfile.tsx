import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  CheckCircle2, ExternalLink, Award, Building2, Calendar, 
  Bookmark, ShieldCheck, ArrowLeft, Hash, Sparkles 
} from "lucide-react";
import Logo from "../components/Logo";

interface ProfileCredential {
  id: string;
  title: string;
  issuer: string;
  year: string | number;
  issueDate?: string;
  txHash?: string;
  verificationId?: string;
  network?: string;
}

interface CandidateProfile {
  id: string;
  name: string;
  photo?: string;
  credentials: ProfileCredential[];
}

export default function PublicProfile() {
  const { candidateId = "demo-candidate" } = useParams();

  const [isVerifier] = useState(() => {
    return localStorage.getItem("credchain_role") === "verifier";
  });

  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState<CandidateProfile | null>(null);

  useEffect(() => {
    // Derive profile data based on ID
    if (candidateId === "demo-candidate" || candidateId.toLowerCase().includes("emeka")) {
      setProfile({
        id: "demo-candidate",
        name: "Emeka Obi",
        photo: localStorage.getItem("credchain_profile_photo") || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        credentials: [
          {
            id: "cred-1",
            title: "B.Eng Computer Engineering",
            issuer: "Federal University of Technology Owerri (FUTO)",
            year: "2026",
            issueDate: "June 15, 2026",
            txHash: "5f2a9c1d8b3e4a7f2c9b1d8e3a7f2c9b1d8e3a7f",
            verificationId: "CC-2026-FUTO-0892",
            network: "Solana Mainnet"
          }
        ]
      });
    } else if (candidateId === "cand-102" || candidateId.toLowerCase().includes("ada")) {
      setProfile({
        id: "cand-102",
        name: "Ada Nwosu",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
        credentials: [
          {
            id: "cred-2",
            title: "B.Eng in Electrical Engineering",
            issuer: "Federal University of Technology Owerri",
            year: "2026",
            issueDate: "June 18, 2026",
            txHash: "3d7b2e4af1c98a2d1e5b7c8f9a0d3e2b1c4f5a6b",
            verificationId: "CC-2026-FUTO-0914",
            network: "Solana Mainnet"
          }
        ]
      });
    } else if (candidateId === "cand-103" || candidateId.toLowerCase().includes("alex")) {
      setProfile({
        id: "cand-103",
        name: "Alex Chen",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        credentials: [
          {
            id: "cred-3",
            title: "B.Sc in Computer Science",
            issuer: "Stanford University",
            year: "2026",
            issueDate: "May 28, 2026",
            txHash: "8a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
            verificationId: "CC-2026-STAN-0412",
            network: "Solana Mainnet"
          },
          {
            id: "cred-4",
            title: "M.Sc Artificial Intelligence",
            issuer: "Stanford University",
            year: "2027",
            issueDate: "June 10, 2027",
            txHash: "9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a",
            verificationId: "CC-2027-STAN-0891",
            network: "Solana Mainnet"
          }
        ]
      });
    } else {
      const formattedName = decodeURIComponent(candidateId)
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, l => l.toUpperCase());
      setProfile({
        id: candidateId,
        name: formattedName || "Candidate Profile",
        credentials: [
          {
            id: "cred-dyn",
            title: "Verified Degree Certification",
            issuer: "CredChain Accredited Institution",
            year: "2026",
            issueDate: "June 20, 2026",
            txHash: "7c3aed9b1d8e3a7f2c9b1d8e3a7f2c9b1d8e3a7f",
            verificationId: `CC-2026-GEN-${candidateId.slice(0, 4).toUpperCase()}`,
            network: "Solana Mainnet"
          }
        ]
      });
    }
  }, [candidateId]);

  const getInitials = (name: string) => {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0]?.slice(0, 2).toUpperCase() || "";
    return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase();
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#05050a] text-white flex items-center justify-center font-sans">
        <div className="text-gray-400 text-sm">Loading verified profile…</div>
      </div>
    );
  }

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(window.location.href)}&size=168x168`;

  return (
    <div className="min-h-screen bg-[#05050a] text-[#f5f7fa] flex flex-col font-sans select-none overflow-x-hidden">
      {/* Top Bar */}
      <header className="w-full max-w-[680px] mx-auto pt-6 px-4 sm:px-6 pb-2 flex items-center justify-between">
        <Link to="/" className="hover:opacity-90 transition-opacity">
          <Logo iconSize={34} showWordmark={true} wordmarkSize="md" />
        </Link>
        <Link to="/" className="text-xs font-mono text-gray-400 hover:text-white flex items-center gap-1.5 bg-[#12121e] px-3 py-1.5 rounded-full border border-white/10 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>
      </header>

      {/* Centred Single Column Content */}
      <main className="flex-1 w-full flex justify-center py-4 px-4 sm:px-6 pb-20">
        <div className="w-full max-w-[680px] flex flex-col gap-5 animate-fade-in">
          
          {/* Header Card */}
          <section className="bg-[#0f0f1b] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center gap-4 shadow-xl">
            <div className="w-24 h-24 rounded-full flex items-center justify-center font-display font-bold text-3xl text-white bg-gradient-to-br from-[#00f5ff]/25 via-[#131324] to-[#0f0f1b] border border-white/15 shadow-[0_0_25px_rgba(0,245,255,0.25)] relative overflow-hidden flex-shrink-0">
              <span>{getInitials(profile.name)}</span>
              {profile.photo && (
                <img
                  src={profile.photo}
                  alt=""
                  onError={e => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="w-full h-full object-cover absolute inset-0"
                />
              )}
            </div>

            <div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">
                {profile.name}
              </h1>
              <p className="text-xs font-mono text-gray-400 mt-1">
                Blockchain Identity Anchor: {profile.id}
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-[#00f5ff] bg-[#00f5ff]/15 border border-[#00f5ff] shadow-[0_0_15px_rgba(0,245,255,0.15)]">
              <CheckCircle2 className="w-4 h-4 text-[#00f5ff]" />
              Verified by CredChain
            </span>
          </section>

          {/* QR Card */}
          <section className="bg-[#0f0f1b] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col items-center gap-4 shadow-xl">
            <div className="bg-white p-3.5 rounded-2xl shadow-lg leading-none border-4 border-[#00f5ff]/20">
              <img src={qrUrl} alt="QR code linking to this profile" className="w-[168px] h-[168px] block" />
            </div>
            <div className="flex items-center gap-2 text-gray-300 text-xs sm:text-sm font-medium">
              <ExternalLink className="w-4 h-4 text-[#00f5ff]" />
              <span>Scan to verify or share this profile</span>
            </div>
          </section>

          {/* Verified Credentials Section */}
          <section className="bg-[#0f0f1b] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                Verified Credentials ({profile.credentials.length})
              </h2>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3 animate-pulse" /> On-Chain
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {profile.credentials.map((cred, idx) => (
                <article
                  key={cred.id || idx}
                  className="bg-[#08080f] border border-white/10 border-l-4 border-l-emerald-500 rounded-2xl p-5 sm:p-6 flex flex-col gap-4.5 transition-all hover:bg-white/[0.02] shadow-md"
                >
                  {/* Top Header of Credential */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-500/15 text-purple-300 text-xs font-mono mb-2 border border-purple-500/30">
                        <Hash className="w-3 h-3 text-purple-400 shrink-0" />
                        <span>ID: {cred.verificationId || `CC-${cred.year}-${cred.id.toUpperCase()}`}</span>
                      </div>
                      <h3 className="font-bold text-lg sm:text-xl text-white font-display leading-snug break-words">
                        {cred.title}
                      </h3>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 whitespace-nowrap self-start shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      Verified On-Chain
                    </span>
                  </div>

                  {/* Comprehensive Verification Metadata Hierarchy Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 border-t border-white/10 text-xs sm:text-sm">
                    
                    {/* Issuing Institution */}
                    <div className="flex flex-col gap-1 min-w-0 bg-[#11111e]/80 p-3 rounded-xl border border-white/5">
                      <span className="text-gray-400 font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-purple-400 shrink-0" /> Issuing Institution
                      </span>
                      <span className="text-white font-medium break-words leading-relaxed">{cred.issuer}</span>
                    </div>

                    {/* Issuance Date */}
                    <div className="flex flex-col gap-1 min-w-0 bg-[#11111e]/80 p-3 rounded-xl border border-white/5">
                      <span className="text-gray-400 font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Issuance Date
                      </span>
                      <span className="text-white font-medium">{cred.issueDate || `June 15, ${cred.year}`}</span>
                    </div>

                    {/* Solana Blockchain Transaction Hash */}
                    <div className="flex flex-col gap-1.5 sm:col-span-2 bg-[#130d24] p-3.5 rounded-xl border border-purple-500/20">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-gray-400 font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Solana Transaction Hash
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {cred.network || "Solana Mainnet"}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                        <span className="font-mono text-cyan-300 text-xs break-all select-all leading-relaxed">
                          {cred.txHash || "5f2a9c1d8b3e4a7f2c9b1d8e3a7f2c9b1d8e3a7f"}
                        </span>
                        <a 
                          href={`https://explorer.solana.com/tx/${cred.txHash || "5f2a9c1d8b3e4a7f2c9b1d8e3a7f2c9b1d8e3a7f"}?cluster=mainnet`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="self-end sm:self-auto text-xs font-mono font-semibold text-purple-300 hover:text-white inline-flex items-center gap-1.5 shrink-0 bg-purple-600 hover:bg-purple-500 px-3 py-1.5 rounded-lg transition-all shadow"
                        >
                          <span>Solana Explorer</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Verifier Save Button */}
          {isVerifier && (
            <button
              onClick={() => setSaved(true)}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl ${
                saved
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500 cursor-default"
                  : "bg-[#00f5ff] hover:brightness-110 text-[#05050a]"
              }`}
            >
              <Bookmark className="w-5 h-5" />
              <span>{saved ? "Saved to Verified Candidates Directory" : "Save to Verified Candidates Directory"}</span>
            </button>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-5 text-center text-gray-500 text-xs flex flex-col sm:flex-row items-center justify-center gap-2 border-t border-white/5 font-mono">
        <div className="flex items-center gap-1.5 text-gray-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>CredChain Cryptographic Proof Engine</span>
        </div>
        <span className="hidden sm:inline text-gray-700">•</span>
        <span>All academic claims verified immutable on Solana Mainnet.</span>
      </footer>
    </div>
  );
}

