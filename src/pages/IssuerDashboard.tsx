import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Bell, LogOut, Clock, FileCheck, Search, Shield, Check, X, 
  CheckCircle2, XCircle, Landmark, Cpu, Link as LinkIcon, AlertTriangle,
  LayoutDashboard, GraduationCap, Send, Sparkles, UserCircle, QrCode, 
  SlidersHorizontal, LifeBuoy, Menu, Building2, ExternalLink, Plus, Copy, UploadCloud, Wand2
} from "lucide-react";
import Logo from "../components/Logo";

interface RequestItem {
  id: string;
  candidate: string;
  matric: string;
  credential: string;
  status: "pending" | "approved" | "denied";
  txHash?: string;
  denyReason?: string;
}

export default function IssuerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"requests" | "history" | "batch" | "qr" | "settings" | "help">("requests");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<"all" | "pending" | "approved" | "denied">("all");

  // Ensure role is stored for persistent portal identity
  useEffect(() => {
    localStorage.setItem("credchain_role", "issuer");
  }, []);

  const [issuedHistory, setIssuedHistory] = useState([
    { id: 1, candidate: "Emeka Obi", credential: "B.Eng Computer Engineering", date: "2026-06-10", txHash: "5f2a9c1d...e8b3", status: "verified" },
    { id: 2, candidate: "Ada Nwosu", credential: "B.Eng Electrical Engineering", date: "2026-06-08", txHash: "3d7b2e4a...f1c9", status: "verified" }
  ]);

  const [requests, setRequests] = useState<RequestItem[]>([
    {
      id: "req-101",
      candidate: "Emeka Obi",
      matric: "2021/104256",
      credential: "B.Eng Computer Engineering",
      status: "pending"
    },
    {
      id: "req-102",
      candidate: "Ada Nwosu",
      matric: "2021/108912",
      credential: "B.Eng Electrical Engineering",
      status: "pending"
    },
    {
      id: "req-103",
      candidate: "Chidi Okafor",
      matric: "2020/994103",
      credential: "B.Sc Information Technology",
      status: "approved",
      txHash: "5xK9f8a21b...991a"
    }
  ]);

  // Notifications state
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifsRead, setNotifsRead] = useState(false);

  // Review Modal state
  const [reviewModal, setReviewModal] = useState<RequestItem | null>(null);

  // Confirm Modal state
  const [confirmModal, setConfirmModal] = useState<RequestItem | null>(null);
  const [issuing, setIssuing] = useState(false);
  const [issuedResult, setIssuedResult] = useState<{ txHash: string; status: string } | null>(null);

  // Inline Deny state
  const [denyingId, setDenyingId] = useState<string | null>(null);
  const [denyReasonInput, setDenyReasonInput] = useState("");

  // Toast state
  const [toast, setToast] = useState<{ message: string; variant: "success" | "danger" } | null>(null);

  const showToast = (message: string, variant: "success" | "danger") => {
    setToast({ message, variant });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  const getInitials = (name: string) => {
    if (!name) return "?";
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(w => w[0]?.toUpperCase() || "")
      .join("");
  };

  const handleLogout = () => {
    localStorage.removeItem("credchain_role");
    navigate("/login");
  };

  const triggerConfirmDeny = (id: string, reason: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: "denied", denyReason: reason || "Denied by issuer" } : r));
    setDenyingId(null);
    setDenyReasonInput("");
    showToast("Request denied.", "danger");
  };

  const triggerIssue = (req: RequestItem) => {
    setIssuing(true);
    setIssuedResult(null);

    // Simulate blockchain transaction
    const fakeHash = `${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 8)}Sol`;
    setTimeout(() => {
      setIssuing(false);
      setIssuedResult({ txHash: fakeHash, status: "confirmed" });
    }, 1800);
  };

  const finishIssue = (id: string, txHash: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: "approved", txHash } : r));
    setConfirmModal(null);
    setIssuedResult(null);
    showToast("Credential issued on-chain.", "success");
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
          {/* Group 1: Registrar Desk */}
          <div className="space-y-1">
            <div className="px-3 text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold mb-2">Registrar Desk</div>
            
            <button
              onClick={() => { setActiveTab("requests"); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "requests" ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-[0_0_20px_rgba(124,58,253,0.15)] font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
            >
              <div className="flex items-center gap-3">
                <FileCheck className={`w-4 h-4 ${activeTab === "requests" ? "text-purple-400" : "text-gray-400"}`} />
                <span>Incoming Requests</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#00f5ff] text-[#05050a] text-[10px] font-bold shadow-[0_0_10px_rgba(0,245,255,0.5)]">
                {requests.filter(r => r.status === "pending").length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab("history"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "history" ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-[0_0_20px_rgba(124,58,253,0.15)] font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
            >
              <Clock className={`w-4 h-4 ${activeTab === "history" ? "text-purple-400" : "text-gray-400"}`} />
              <span>Issued History</span>
            </button>

            <button
              onClick={() => { setActiveTab("batch"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "batch" ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-[0_0_20px_rgba(124,58,253,0.15)] font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
            >
              <Wand2 className="w-4 h-4 text-teal-400" />
              <span>Batch Signer Desk</span>
            </button>
          </div>

          {/* Group 2: Institutional */}
          <div className="space-y-1">
            <div className="px-3 text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold mb-2">Institutional</div>
            
            <button
              onClick={() => { setActiveTab("qr"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "qr" ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-[0_0_20px_rgba(124,58,253,0.15)] font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
            >
              <QrCode className={`w-4 h-4 ${activeTab === "qr" ? "text-purple-400" : "text-gray-400"}`} />
              <span>Institutional QR</span>
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
              <span>Settings</span>
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
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#c9a84c] to-[#7c3aff] text-[#05050a] font-extrabold font-display text-xs flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(201,168,76,0.4)]">
              FU
            </div>
            <div className="min-w-0 text-left">
              <div className="text-xs font-bold text-white truncate">FUTO Registrar</div>
              <div className="text-[10px] font-mono text-[#00f5ff] truncate">Whitelisted Issuer</div>
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
                placeholder="Search matric or records..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] font-mono font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Solana Mainnet
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

              {/* Notifications Dropdown */}
              {notifOpen && (
                <div className="absolute top-[calc(100%+10px)] right-0 w-80 bg-[#0f0f1b] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-50 animate-scale-up">
                  <div className="flex items-center justify-between p-3.5 border-b border-white/10 font-semibold text-sm">
                    <span>Notifications</span>
                    <button
                      onClick={() => setNotifsRead(true)}
                      className="text-xs text-[#00f5ff] hover:underline cursor-pointer"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
                    <div className={`p-3.5 flex gap-3 ${!notifsRead ? "bg-[#00f5ff]/10 border-l-2 border-l-[#00f5ff]" : ""}`}>
                      <div className="w-8 h-8 rounded-lg bg-[#00f5ff]/15 text-[#00f5ff] flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col gap-0.5 leading-snug text-left">
                        <span className="text-xs text-white">
                          <strong>Emeka Obi</strong> requested B.Eng Computer Engineering
                        </span>
                        <span className="text-[10px] text-gray-400">2h ago</span>
                      </div>
                    </div>
                    <div className={`p-3.5 flex gap-3 ${!notifsRead ? "bg-[#00f5ff]/10 border-l-2 border-l-[#00f5ff]" : ""}`}>
                      <div className="w-8 h-8 rounded-lg bg-[#00f5ff]/15 text-[#00f5ff] flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col gap-0.5 leading-snug text-left">
                        <span className="text-xs text-white">
                          <strong>Ada Nwosu</strong> requested B.Eng Electrical Engineering
                        </span>
                        <span className="text-[10px] text-gray-400">5h ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Avatar Circle */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#c9a84c] to-[#7c3aff] text-[#05050a] font-extrabold font-display text-xs flex items-center justify-center flex-shrink-0 shadow-md">
              FU
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto w-full flex-1">
          {activeTab === "requests" && (
            <div className="space-y-8 animate-fade-in">
              {/* STATS BAR */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-5 shadow-xl">
                  <span className="text-[10px] font-mono text-gray-400 block uppercase font-bold">Total Requests</span>
                  <span className="text-2xl font-display font-bold text-white mt-1 block">24</span>
                </div>
                <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-5 shadow-xl">
                  <span className="text-[10px] font-mono text-[#00f5ff] block uppercase font-bold">Pending Review</span>
                  <span className="text-2xl font-display font-bold text-[#00f5ff] mt-1 block">{requests.filter(r => r.status === "pending").length}</span>
                </div>
                <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-5 shadow-xl">
                  <span className="text-[10px] font-mono text-emerald-400 block uppercase font-bold">Approved Month</span>
                  <span className="text-2xl font-display font-bold text-emerald-400 mt-1 block">14</span>
                </div>
                <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-5 shadow-xl">
                  <span className="text-[10px] font-mono text-red-400 block uppercase font-bold">Denied Month</span>
                  <span className="text-2xl font-display font-bold text-red-400 mt-1 block">4</span>
                </div>
              </div>

              <div className="text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h1 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white mb-1">
                    Incoming credential requests
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Review requests against registrar records before issuing on Solana Mainnet.
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-[#090913] p-1 rounded-xl border border-white/10 text-xs">
                  {(["all", "pending", "approved", "denied"] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setFilterTab(tab)}
                      className={`px-3 py-1.5 rounded-lg capitalize font-medium cursor-pointer transition-colors ${
                        filterTab === tab ? "bg-white/10 text-white font-bold" : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Requests List */}
              <div className="space-y-3.5">
                {requests.filter(r => (filterTab === "all" || r.status === filterTab) && (searchQuery === "" || r.candidate.toLowerCase().includes(searchQuery.toLowerCase()) || r.matric.includes(searchQuery))).length === 0 ? (
                  <div className="text-center py-16 px-6 bg-[#0d0d16] border border-dashed border-white/15 rounded-2xl">
                    <div className="w-14 h-14 rounded-full bg-white/5 text-gray-500 flex items-center justify-center mx-auto mb-4">
                      <FileCheck className="w-7 h-7" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-white mb-1">No requests match</h3>
                    <p className="text-xs text-gray-400">No incoming requests match your search or filter state.</p>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {requests
                      .filter(r => (filterTab === "all" || r.status === filterTab) && (searchQuery === "" || r.candidate.toLowerCase().includes(searchQuery.toLowerCase()) || r.matric.includes(searchQuery)))
                      .map(req => (
                      <div
                        key={req.id}
                        className="bg-[#0d0d16] border border-white/10 hover:border-white/20 rounded-2xl p-5 sm:p-6 transition-all shadow-xl flex flex-col gap-3 text-left"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4 text-left">
                            <div className="w-11 h-11 rounded-full bg-[#00f5ff]/15 text-[#00f5ff] font-display font-bold text-base flex items-center justify-center flex-shrink-0">
                              {getInitials(req.candidate)}
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="font-bold text-base text-white font-display">{req.candidate}</span>
                              <span className="font-mono text-xs text-[#00f5ff] tracking-wider">{req.matric}</span>
                              <span className="text-xs text-gray-300 font-medium">{req.credential}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5 self-end sm:self-center">
                            {req.status === "approved" && (
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Issued On-Chain
                              </span>
                            )}
                            {req.status === "denied" && (
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30">
                                <XCircle className="w-3.5 h-3.5" /> Denied
                              </span>
                            )}
                            {req.status === "pending" && (
                              <button
                                onClick={() => setReviewModal(req)}
                                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00f5ff] to-[#7c3aff] hover:opacity-90 text-[#05050a] font-bold text-xs inline-flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,245,255,0.2)]"
                              >
                                <Search className="w-4 h-4 text-black" /> Review & sign
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Inline Deny Reason Input */}
                        {denyingId === req.id && req.status === "pending" && (
                          <div className="w-full pt-3.5 mt-1 border-t border-white/10 flex items-center gap-2.5 flex-wrap animate-fade-in">
                            <input
                              type="text"
                              placeholder="Optional: reason for denial (e.g. ID mismatch)"
                              value={denyReasonInput}
                              onChange={e => setDenyReasonInput(e.target.value)}
                              className="flex-1 min-w-[220px] bg-[#05050a] border border-white/15 focus:border-[#00f5ff] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition-colors"
                              autoFocus
                            />
                            <button
                              onClick={() => triggerConfirmDeny(req.id, denyReasonInput)}
                              className="px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold text-xs cursor-pointer transition-all"
                            >
                              Confirm deny
                            </button>
                            <button
                              onClick={() => {
                                setDenyingId(null);
                                setDenyReasonInput("");
                              }}
                              className="px-3 py-2.5 text-xs text-gray-400 hover:text-white cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-6 text-left animate-fade-in">
              <div>
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">Issued Credentials History</h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">All academic qualifications permanently anchored to Solana Mainnet ledger.</p>
              </div>
              <div className="bg-[#0d0d16] border border-white/10 rounded-2xl overflow-x-auto shadow-xl p-2">
                <table className="w-full text-left text-xs min-w-[600px]">
                  <thead className="bg-black/40 text-gray-400 uppercase font-mono text-[10px] border-b border-white/10">
                    <tr>
                      <th className="p-4 pl-5">Candidate</th>
                      <th className="p-4">Credential</th>
                      <th className="p-4">Issue Date</th>
                      <th className="p-4">Solana TX</th>
                      <th className="p-4 text-right pr-5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300 font-medium">
                    {issuedHistory.map(item => (
                      <tr key={item.id} className="hover:bg-white/[0.02]">
                        <td className="p-4 pl-5 font-bold text-white">{item.candidate}</td>
                        <td className="p-4">{item.credential}</td>
                        <td className="p-4 font-mono text-gray-400">{item.date}</td>
                        <td className="p-4 font-mono text-[#00f5ff] break-all">{item.txHash}</td>
                        <td className="p-4 text-right pr-5">
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 text-[10px] uppercase font-mono">
                            <Check className="w-3 h-3" /> Verified On-Chain
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "batch" && (
            <div className="space-y-6 text-left animate-fade-in">
              <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="flex items-center gap-3 text-teal-400 mb-4">
                  <Wand2 className="w-6 h-6" />
                  <span className="font-mono text-xs uppercase tracking-widest font-bold">Batch Signing Desk</span>
                </div>
                <h2 className="font-display font-extrabold text-2xl text-white mb-2">Sign Multiple Credentials via CSV</h2>
                <p className="text-xs sm:text-sm text-gray-400 max-w-xl mb-6 leading-relaxed">
                  Upload an institutional CSV or JSON export of graduating students. The registrar desk will batch-merkle sign and submit transaction bundles to Solana Mainnet.
                </p>
                <div className="border-2 border-dashed border-white/15 rounded-2xl p-10 text-center hover:border-teal-400/50 transition-colors bg-black/20 cursor-pointer flex flex-col items-center justify-center gap-3">
                  <UploadCloud className="w-10 h-10 text-teal-400" />
                  <div className="text-sm font-bold text-white">Drag & drop degree roster file</div>
                  <div className="text-xs text-gray-500">Supports .CSV, .XLSX, or .JSON up to 500 candidates per batch</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "qr" && (
            <div className="space-y-6 text-left animate-fade-in">
              <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-8 shadow-xl max-w-lg mx-auto text-center space-y-6">
                <h2 className="font-display font-extrabold text-xl text-white">Institutional Verification QR</h2>
                <p className="text-xs text-gray-400">Display this QR code in the registrar office or graduation brochure so employers can instantly verify FUTO degrees.</p>
                <div className="p-6 bg-white rounded-2xl inline-block shadow-2xl">
                  <QrCode className="w-48 h-48 text-black mx-auto" />
                </div>
                <div className="font-mono text-xs text-[#00f5ff] bg-black/40 p-3 rounded-xl border border-white/10 select-all break-all">
                  https://solana.credchain.io/issuer/did:sol:futo_mainnet_registrar_99a
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6 text-left animate-fade-in">
              <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-8 shadow-xl space-y-6 max-w-2xl">
                <h2 className="font-display font-extrabold text-xl text-white border-b border-white/10 pb-4">Institution Settings</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-medium">Institution Name</label>
                    <input type="text" readOnly value="Federal University of Technology Owerri (FUTO)" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-medium">Registrar Solana Authority</label>
                    <input type="text" readOnly value="7xKp9W...3mEq1Z" className="w-full font-mono text-teal-400 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5" />
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 font-mono">Accreditation verified by National Universities Commission (NUC).</p>
              </div>
            </div>
          )}

          {activeTab === "help" && (
            <div className="space-y-6 text-left animate-fade-in">
              <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-8 shadow-xl space-y-4 max-w-2xl">
                <h2 className="font-display font-extrabold text-xl text-white">Issuer Support Hotline</h2>
                <p className="text-xs text-gray-300 leading-relaxed">For key rotation, gas refill requests, or adding department sub-signers, contact the CredChain Protocol Ops desk.</p>
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl text-xs text-purple-300 font-mono">
                  ops@credchain.io · Dedicated Solana Priority Fee Queue Active
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Review & Match Modal */}
      {reviewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-[580px] w-full bg-[#0f0f1b] border border-white/15 rounded-3xl p-6 sm:p-8 text-left space-y-6 relative shadow-2xl animate-scale-up">
            <button
              onClick={() => setReviewModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h2 className="font-display font-extrabold text-xl text-white">Review & match</h2>
              <p className="text-xs text-gray-400 mt-1">
                Confirm the candidate's details against your records before issuing on-chain.
              </p>
            </div>

            {/* Match Banner */}
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-3.5 text-emerald-400">
              <Shield className="w-6 h-6 flex-shrink-0" />
              <div>
                <div className="font-display font-extrabold text-base sm:text-lg">100% match</div>
                <div className="text-xs text-emerald-300">AI document check found no discrepancies</div>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="border border-white/10 rounded-2xl overflow-hidden text-xs">
              <div className="bg-black/40 px-4 py-2.5 grid grid-cols-12 gap-2 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                <div className="col-span-4">Field</div>
                <div className="col-span-4">Candidate submitted</div>
                <div className="col-span-3">Your record</div>
                <div className="col-span-1 text-center"></div>
              </div>
              <div className="px-4 py-3 border-b border-white/10 grid grid-cols-12 gap-2 items-center bg-white/[0.02]">
                <div className="col-span-4 font-semibold text-gray-300">Name</div>
                <div className="col-span-4 text-white font-medium break-all">{reviewModal.candidate}</div>
                <div className="col-span-3 text-white font-medium break-all">{reviewModal.candidate}</div>
                <div className="col-span-1 flex justify-center"><Check className="w-4 h-4 text-emerald-400" /></div>
              </div>
              <div className="px-4 py-3 border-b border-white/10 grid grid-cols-12 gap-2 items-center">
                <div className="col-span-4 font-semibold text-gray-300">Matric / ID no.</div>
                <div className="col-span-4 text-white font-mono">{reviewModal.matric}</div>
                <div className="col-span-3 text-white font-mono">{reviewModal.matric}</div>
                <div className="col-span-1 flex justify-center"><Check className="w-4 h-4 text-emerald-400" /></div>
              </div>
              <div className="px-4 py-3 border-b border-white/10 grid grid-cols-12 gap-2 items-center bg-white/[0.02]">
                <div className="col-span-4 font-semibold text-gray-300">Course</div>
                <div className="col-span-4 text-white break-all">{reviewModal.credential}</div>
                <div className="col-span-3 text-white break-all">{reviewModal.credential}</div>
                <div className="col-span-1 flex justify-center"><Check className="w-4 h-4 text-emerald-400" /></div>
              </div>
              <div className="px-4 py-3 border-b border-white/10 grid grid-cols-12 gap-2 items-center">
                <div className="col-span-4 font-semibold text-gray-300">Enrollment status</div>
                <div className="col-span-4 text-gray-400">—</div>
                <div className="col-span-3 text-white">Graduated</div>
                <div className="col-span-1 flex justify-center"><Check className="w-4 h-4 text-emerald-400" /></div>
              </div>
              <div className="px-4 py-3 grid grid-cols-12 gap-2 items-center bg-white/[0.02]">
                <div className="col-span-4 font-semibold text-gray-300">Graduation year</div>
                <div className="col-span-4 text-gray-400">—</div>
                <div className="col-span-3 text-white font-mono">2026</div>
                <div className="col-span-1 flex justify-center"><Check className="w-4 h-4 text-emerald-400" /></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  const targetReq = reviewModal;
                  setReviewModal(null);
                  setDenyingId(targetReq.id);
                }}
                className="px-5 py-2.5 rounded-xl border border-white/15 hover:border-red-500 hover:text-red-400 hover:bg-red-500/10 text-gray-300 font-semibold text-xs transition-all cursor-pointer text-center"
              >
                Deny
              </button>
              <button
                onClick={() => {
                  const targetReq = reviewModal;
                  setReviewModal(null);
                  setConfirmModal(targetReq);
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs inline-flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
              >
                <CheckCircle2 className="w-4 h-4" /> Approve & Issue on Blockchain
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Issue Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-[460px] w-full bg-[#0f0f1b] border border-white/15 rounded-3xl p-7 text-center space-y-5 shadow-2xl animate-scale-up">
            {issuing ? (
              <div className="py-8 space-y-4">
                <Cpu className="w-12 h-12 text-[#00f5ff] mx-auto animate-spin" />
                <h2 className="font-display font-extrabold text-xl text-white">Writing to Solana…</h2>
                <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
                  Minting the credential on-chain. This can take a few seconds — please don't close this window.
                </p>
              </div>
            ) : issuedResult ? (
              <div className="py-4 space-y-4 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="font-display font-extrabold text-xl text-white">Credential issued</h2>
                <p className="text-xs text-gray-300">
                  <strong className="text-white">{confirmModal.credential}</strong> is now permanently recorded on-chain.
                </p>
                <div className="p-4 bg-[#05050a] border border-white/10 rounded-xl space-y-2 text-left font-mono">
                  <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Transaction</div>
                  <div className="text-xs text-[#00f5ff] break-all">{issuedResult.txHash}</div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase mt-1">
                    {issuedResult.status}
                  </div>
                </div>
                <button
                  onClick={() => finishIssue(confirmModal.id, issuedResult.txHash)}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs cursor-pointer transition-all shadow-lg"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="py-2 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#00f5ff]/15 border border-[#00f5ff]/30 text-[#00f5ff] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(0,245,255,0.2)]">
                  <LinkIcon className="w-7 h-7" />
                </div>
                <h2 className="font-display font-extrabold text-xl text-white">Issue on Solana?</h2>
                <p className="text-xs text-gray-300 leading-relaxed max-w-sm mx-auto">
                  This writes a <strong>permanent record to the Solana blockchain</strong>. It mints <strong>{confirmModal.credential}</strong> for <strong>{confirmModal.candidate}</strong> and cannot be undone.
                </p>
                <div className="flex gap-3 justify-center pt-3">
                  <button
                    onClick={() => setConfirmModal(null)}
                    className="flex-1 py-3 rounded-xl border border-white/15 hover:bg-white/5 text-gray-300 font-semibold text-xs cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => triggerIssue(confirmModal)}
                    className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-lg transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Confirm & issue
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl bg-[#0f0f1b] border border-white/15 border-l-4 shadow-2xl text-xs font-semibold text-white animate-fade-in ${toast.variant === "success" ? "border-l-emerald-500" : "border-l-red-500"}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
