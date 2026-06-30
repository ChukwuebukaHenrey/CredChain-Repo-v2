import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ShieldCheck, Search, Bookmark, CheckCircle2, ExternalLink, 
  LogOut, Bell, User, X, Clock, SlidersHorizontal, LifeBuoy, 
  Menu, Key, FileText, Check, Sparkles, Copy, RefreshCw, AlertCircle
} from "lucide-react";
import Logo from "../components/Logo";

interface SavedCandidate {
  id: string;
  name: string;
  field: string;
  verifiedCount: number;
}

export default function VerifierDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"verify" | "shortlist" | "logs" | "api" | "settings" | "help">("verify");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Ensure role is stored for verifier actions
  useEffect(() => {
    localStorage.setItem("credchain_role", "verifier");
  }, []);

  const [query, setQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifsRead, setNotifsRead] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const [savedCandidates] = useState<SavedCandidate[]>([
    {
      id: "demo-candidate",
      name: "Emeka Obi",
      field: "Computer Engineering",
      verifiedCount: 1
    },
    {
      id: "cand-102",
      name: "Ada Nwosu",
      field: "Electrical Engineering",
      verifiedCount: 1
    },
    {
      id: "cand-103",
      name: "Alex Chen",
      field: "Computer Science",
      verifiedCount: 2
    }
  ]);

  const [verificationLogs] = useState([
    { id: "log-1", candidate: "Emeka Obi", action: "Merkle Root Verification", status: "Valid On-Chain", time: "10 mins ago", tx: "5xLp...9zQm" },
    { id: "log-2", candidate: "Ada Nwosu", action: "DID Signature Check", status: "Valid On-Chain", time: "2 hours ago", tx: "8vKq...2yRn" },
    { id: "log-3", candidate: "Alex Chen", action: "Solana Account Proof", status: "Valid On-Chain", time: "Yesterday", tx: "3bNz...7wPt" },
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.trim() || "demo-candidate";
    navigate(`/verify/${encodeURIComponent(cleanQuery)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("credchain_role");
    navigate("/login");
  };

  const getInitials = (name: string) => {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0]?.slice(0, 2).toUpperCase() || "";
    return ((parts[0]?.[0] || "") + (parts[parts.length - 1]?.[0] || "")).toUpperCase();
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText("sk_live_solana_verif_99x81726aa109bb4");
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#05050a] text-[#f5f7fa] flex font-sans select-none relative overflow-x-hidden">
      {/* Ambient background glow */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-10 w-[400px] h-[400px] bg-teal-900/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside className={`w-64 bg-[#0d0d16] border-r border-white/10 flex flex-col fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}`}>
        {/* Sidebar Logo */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <Link to="/" className="hover:opacity-90">
            <Logo iconSize={32} wordmarkSize="sm" />
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6 relative z-10">
          {/* Group 1: Verification Desk */}
          <div className="space-y-1">
            <div className="px-3 text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold mb-2">Verification Desk</div>
            
            <button
              onClick={() => { setActiveTab("verify"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "verify" ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-[0_0_20px_rgba(124,58,253,0.15)] font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
            >
              <ShieldCheck className={`w-4 h-4 ${activeTab === "verify" ? "text-purple-400" : "text-gray-400"}`} />
              <span>Search & Verify</span>
            </button>

            <button
              onClick={() => { setActiveTab("shortlist"); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "shortlist" ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-[0_0_20px_rgba(124,58,253,0.15)] font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
            >
              <div className="flex items-center gap-3">
                <Bookmark className={`w-4 h-4 ${activeTab === "shortlist" ? "text-purple-400" : "text-gray-400"}`} />
                <span>Saved Shortlist</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#c9a84c] text-[#05050a] text-[10px] font-bold shadow-[0_0_10px_rgba(201,168,76,0.5)]">
                {savedCandidates.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab("logs"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "logs" ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-[0_0_20px_rgba(124,58,253,0.15)] font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
            >
              <FileText className={`w-4 h-4 ${activeTab === "logs" ? "text-purple-400" : "text-gray-400"}`} />
              <span>Audit & Logs</span>
            </button>
          </div>

          {/* Group 2: Developer API */}
          <div className="space-y-1">
            <div className="px-3 text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold mb-2">Protocol API</div>
            
            <button
              onClick={() => { setActiveTab("api"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "api" ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-[0_0_20px_rgba(124,58,253,0.15)] font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
            >
              <Key className={`w-4 h-4 ${activeTab === "api" ? "text-teal-400" : "text-gray-400"}`} />
              <span>API Keys & Webhooks</span>
            </button>
          </div>

          {/* Group 3: Account */}
          <div className="space-y-1">
            <div className="px-3 text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold mb-2">Account</div>
            
            <button
              onClick={() => { setActiveTab("settings"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "settings" ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-[0_0_20px_rgba(124,58,253,0.15)] font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
            >
              <SlidersHorizontal className={`w-4 h-4 ${activeTab === "settings" ? "text-purple-400" : "text-gray-400"}`} />
              <span>Verifier Settings</span>
            </button>

            <button
              onClick={() => { setActiveTab("help"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "help" ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-[0_0_20px_rgba(124,58,253,0.15)] font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
            >
              <LifeBuoy className={`w-4 h-4 ${activeTab === "help" ? "text-purple-400" : "text-gray-400"}`} />
              <span>Help & Support</span>
            </button>
          </div>
        </nav>

        {/* Sidebar User Profile Bottom */}
        <div className="p-4 border-t border-white/10 bg-[#08080f] flex items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#00f5ff] to-[#7c3aff] text-[#05050a] font-extrabold font-display text-xs flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(0,245,255,0.4)]">
              TB
            </div>
            <div className="min-w-0 text-left">
              <div className="text-xs font-bold text-white truncate">Tunde Bello</div>
              <div className="text-[10px] font-mono text-[#00f5ff] truncate">Paystack Verifier</div>
            </div>
          </div>
          <button 
            onClick={handleLogout} 
            className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors cursor-pointer flex-shrink-0"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-64 min-w-0 relative z-10">
        {/* ── TOP BAR ── */}
        <header className="sticky top-0 z-40 h-16 bg-[#05050a]/85 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden md:block w-72">
              <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search candidate profiles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] font-mono font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Solana Mainnet Node
            </span>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="w-10 h-10 rounded-xl bg-[#0f0f1b] border border-white/10 hover:border-[#00f5ff]/40 hover:bg-white/5 text-gray-400 hover:text-[#00f5ff] flex items-center justify-center transition-all cursor-pointer relative"
                title="Notifications"
              >
                <Bell className="w-4.5 h-4.5" />
                {!notifsRead && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#090913]"></span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute top-[calc(100%+10px)] right-0 w-80 bg-[#0f0f1b] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-50 animate-scale-up">
                  <div className="flex items-center justify-between p-3.5 border-b border-white/10 font-semibold text-sm">
                    <span>Notifications</span>
                    <button
                      onClick={() => { setNotifOpen(false); setNotifsRead(true); }}
                      className="text-xs text-[#00f5ff] hover:underline cursor-pointer"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <div className={`p-3.5 flex gap-3 ${!notifsRead ? "bg-[#00f5ff]/10 border-l-2 border-l-[#00f5ff]" : ""}`}>
                      <div className="w-8 h-8 rounded-lg bg-[#00f5ff]/15 text-[#00f5ff] flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col gap-0.5 leading-snug text-left">
                        <span className="text-xs text-white">
                          Emeka Obi's B.Eng credential was verified on-chain
                        </span>
                        <span className="text-[10px] text-gray-400">2h ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Avatar Circle */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#00f5ff] to-[#7c3aff] text-[#05050a] font-extrabold font-display text-xs flex items-center justify-center flex-shrink-0 shadow-md">
              TB
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto w-full flex-1">
          {activeTab === "verify" && (
            <div className="space-y-8 animate-fade-in">
              {/* STATS BAR */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-5 shadow-xl">
                  <span className="text-[10px] font-mono text-gray-400 block uppercase font-bold">Verifications Run</span>
                  <span className="text-2xl font-display font-bold text-white mt-1 block">42</span>
                </div>
                <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-5 shadow-xl">
                  <span className="text-[10px] font-mono text-[#00f5ff] block uppercase font-bold">Verified Profiles</span>
                  <span className="text-2xl font-display font-bold text-[#00f5ff] mt-1 block">38</span>
                </div>
                <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-5 shadow-xl">
                  <span className="text-[10px] font-mono text-[#c9a84c] block uppercase font-bold">Saved Shortlist</span>
                  <span className="text-2xl font-display font-bold text-[#c9a84c] mt-1 block">{savedCandidates.length}</span>
                </div>
                <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-5 shadow-xl">
                  <span className="text-[10px] font-mono text-emerald-400 block uppercase font-bold">Fraud Flags</span>
                  <span className="text-2xl font-display font-bold text-emerald-400 mt-1 block">0</span>
                </div>
              </div>

              {/* SEARCH / VERIFY BOX */}
              <div className="bg-[#0d0d16] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl text-left relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#00f5ff]/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00f5ff] to-[#7c3aff] text-black flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(0,245,255,0.3)]">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                      Instant Solana Degree Verification
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl leading-relaxed">
                      Enter a candidate's CredChain DID, Solana transaction hash, or student name to query cryptographic proof directly from the FUTO Registrar Merkle Tree.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-[#05050a] border border-white/15 rounded-2xl p-2.5 pl-5 focus-within:border-[#00f5ff] transition-all shadow-xl">
                  <Search className="w-5 h-5 text-[#00f5ff] hidden sm:block flex-shrink-0" />
                  <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Candidate ID, DID, or name (e.g. demo-candidate)…"
                    className="flex-1 bg-transparent border-none py-2 text-sm text-white focus:outline-none placeholder:text-gray-600"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f5ff] to-[#7c3aff] hover:opacity-95 text-[#05050a] font-extrabold text-xs sm:text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition-all shadow-[0_0_15px_rgba(0,245,255,0.3)]"
                  >
                    <ShieldCheck className="w-4 h-4 text-black" />
                    <span>Verify On-Chain</span>
                  </button>
                </form>

                <div className="mt-4 flex items-center gap-2 text-xs text-gray-400 flex-wrap">
                  <Sparkles className="w-3.5 h-3.5 text-[#c9a84c]" />
                  <span>Quick demo query:</span>
                  <button
                    type="button"
                    onClick={() => setQuery("demo-candidate")}
                    className="font-mono text-xs font-bold text-[#00f5ff] bg-[#00f5ff]/10 border border-[#00f5ff]/30 rounded-lg px-2.5 py-1 hover:bg-[#00f5ff]/20 cursor-pointer transition-all"
                  >
                    demo-candidate
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "shortlist" && (
            <div className="space-y-6 text-left animate-fade-in">
              <div>
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">Saved Candidate Shortlist</h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Cryptographically verified applicant profiles shortlisted for engineering roles.</p>
              </div>

              {savedCandidates.filter(c => searchQuery === "" || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.field.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                <div className="text-center py-16 px-6 bg-[#0d0d16] border border-dashed border-white/15 rounded-3xl">
                  <div className="w-14 h-14 rounded-full bg-white/5 text-gray-500 flex items-center justify-center mx-auto mb-4">
                    <User className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-1">No shortlisted candidates match</h3>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto">Verify candidates on the desk tab, then save them to build your verified talent pool.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedCandidates
                    .filter(c => searchQuery === "" || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.field.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(cand => (
                    <div
                      key={cand.id}
                      className="bg-[#0d0d16] border border-white/10 hover:border-[#00f5ff]/50 hover:shadow-2xl rounded-3xl p-6 flex flex-col justify-between gap-6 transition-all shadow-xl text-left relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 group-hover:bg-[#00f5ff]/10 rounded-full blur-2xl transition-all"></div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00f5ff]/20 to-[#7c3aff]/20 text-[#00f5ff] border border-white/15 font-display font-bold text-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {cand.id === "demo-candidate" && localStorage.getItem("credchain_profile_photo") ? (
                              <img src={localStorage.getItem("credchain_profile_photo")!} alt={cand.name} className="w-full h-full object-cover" />
                            ) : (
                              getInitials(cand.name)
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-display font-bold text-lg text-white truncate">{cand.name}</div>
                            <div className="text-xs text-gray-400 truncate mt-0.5">{cand.field}</div>
                          </div>
                        </div>

                        <div className="pt-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {cand.verifiedCount} On-Chain Proof{cand.verifiedCount > 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>

                      <Link
                        to={`/verify/${cand.id}`}
                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-[#00f5ff] hover:to-[#7c3aff] hover:text-black font-bold text-xs transition-all text-white border border-white/10 cursor-pointer shadow-md"
                      >
                        <ExternalLink className="w-4 h-4" /> View Full On-Chain Dossier
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "logs" && (
            <div className="space-y-6 text-left animate-fade-in">
              <div>
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">Verification Audit Logs</h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Real-time cryptographic verification receipts checked against Solana ledger nodes.</p>
              </div>
              <div className="bg-[#0d0d16] border border-white/10 rounded-2xl overflow-x-auto shadow-xl p-2">
                <table className="w-full text-left text-xs min-w-[600px]">
                  <thead className="bg-black/40 text-gray-400 uppercase font-mono text-[10px] border-b border-white/10">
                    <tr>
                      <th className="p-4 pl-5">Candidate</th>
                      <th className="p-4">Verification Type</th>
                      <th className="p-4">Time</th>
                      <th className="p-4">Solana Anchor TX</th>
                      <th className="p-4 text-right pr-5">Proof Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300 font-medium">
                    {verificationLogs.map(log => (
                      <tr key={log.id} className="hover:bg-white/[0.02]">
                        <td className="p-4 pl-5 font-bold text-white">{log.candidate}</td>
                        <td className="p-4">{log.action}</td>
                        <td className="p-4 font-mono text-gray-400">{log.time}</td>
                        <td className="p-4 font-mono text-[#00f5ff] break-all">{log.tx}</td>
                        <td className="p-4 text-right pr-5">
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 text-[10px] uppercase font-mono">
                            <Check className="w-3 h-3" /> {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="space-y-6 text-left animate-fade-in">
              <div className="bg-[#0d0d16] border border-white/10 rounded-3xl p-8 shadow-xl max-w-3xl space-y-6">
                <div className="flex items-center gap-3 text-teal-400">
                  <Key className="w-6 h-6" />
                  <span className="font-mono text-xs uppercase tracking-widest font-bold">Protocol API & SDK Integration</span>
                </div>
                <h2 className="font-display font-extrabold text-2xl text-white">Automate ATS Degree Verification</h2>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Integrate CredChain verification directly into Greenhouse, Lever, or Workday workflows via our REST API or TypeScript SDK.
                </p>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block">Live Secret Verifier Key</label>
                  <div className="flex items-center gap-2 bg-black/60 p-3 rounded-xl border border-white/10 font-mono text-xs text-teal-300">
                    <span className="flex-1 truncate select-all">sk_live_solana_verif_99x81726aa109bb4</span>
                    <button 
                      onClick={copyApiKey}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-black/40 rounded-2xl border border-white/5 font-mono text-xs text-gray-400 overflow-x-auto space-y-1">
                  <div className="text-purple-400">// Install official Solana verification package</div>
                  <div className="text-white select-all">npm install @credchain/solana-verify-sdk</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6 text-left animate-fade-in">
              <div className="bg-[#0d0d16] border border-white/10 rounded-3xl p-8 shadow-xl space-y-6 max-w-2xl">
                <h2 className="font-display font-extrabold text-xl text-white border-b border-white/10 pb-4">Verifier Org Profile</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-medium">Organization Name</label>
                    <input type="text" readOnly value="Paystack Talent Acquisition" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-medium">Verifier Authority Wallet</label>
                    <input type="text" readOnly value="9zQm...2yRn" className="w-full font-mono text-[#00f5ff] bg-black/40 border border-white/10 rounded-xl px-4 py-2.5" />
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 font-mono">Enterprise SLA Tier Active · Unlimited Daily On-Chain RPC Queries</p>
              </div>
            </div>
          )}

          {activeTab === "help" && (
            <div className="space-y-6 text-left animate-fade-in">
              <div className="bg-[#0d0d16] border border-white/10 rounded-3xl p-8 shadow-xl space-y-4 max-w-2xl">
                <h2 className="font-display font-extrabold text-xl text-white">Verifier Support Hotline</h2>
                <p className="text-xs text-gray-300 leading-relaxed">Need help interpreting Merkle proofs or connecting webhooks to your HRIS? Contact our protocol engineers.</p>
                <div className="p-4 bg-[#00f5ff]/10 border border-[#00f5ff]/20 rounded-xl text-xs text-[#00f5ff] font-mono">
                  support@credchain.io · 24/7 Priority Protocol Response
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

