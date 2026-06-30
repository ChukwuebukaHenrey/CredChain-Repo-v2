import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, GraduationCap, Send, Sparkles, UserCircle, QrCode, 
  SlidersHorizontal, LifeBuoy, Bell, Search, LogOut, Copy, ExternalLink, 
  Plus, CheckCircle2, Clock, AlertCircle, Eye, Pencil, FolderKanban, 
  Link as LinkIcon, Paperclip, UploadCloud, Wand2, Download, Share2, 
  ChevronRight, ChevronDown, Check, X, Lock, ArrowRight, ArrowLeft, 
  Building2, Briefcase, Trophy, FileText, ScrollText, FileClock, FileX,
  Menu, CheckSquare, ShieldCheck, Camera
} from "lucide-react";
import Logo from "../components/Logo";
import { getCandidate, getCredentials, getNotifications, getQRCode, buildResume } from "../services/api";
import { setTheme, getTheme } from "../services/theme";

type TabType = "dashboard" | "credentials" | "request" | "resume" | "portfolio" | "qr" | "settings" | "help";

export default function CandidateDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Data State
  const [candidate, setCandidate] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [qrUrl, setQrUrl] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // UI State
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileBannerOpen, setProfileBannerOpen] = useState(true);
  const [walletCopied, setWalletCopied] = useState(false);
  const [credFilter, setCredFilter] = useState<"all" | "verified" | "pending" | "rejected">("all");
  
  // Request Credential State
  const [reqInst, setReqInst] = useState("futo");
  const [reqType, setReqType] = useState("Transcript / Degree");
  const [reqMatric, setReqMatric] = useState("");
  const [reqProgram, setReqProgram] = useState("");
  const [reqGradYear, setReqGradYear] = useState("");
  const [reqSuccess, setReqSuccess] = useState(false);
  
  // AI Resume State
  const [resumePrompt, setResumePrompt] = useState("Emphasise frontend work and Solana protocols, applying for a Web3 engineering role.");
  const [generatingResume, setGeneratingResume] = useState(false);
  const [generatedResumeHtml, setGeneratedResumeHtml] = useState<string | null>(null);
  const [refFiles, setRefFiles] = useState<{ id: number; name: string; status: "processing" | "ready" }[]>([
    { id: 1, name: "Academic_Transcript_Unofficial.pdf", status: "ready" },
    { id: 2, name: "Solana_Bootcamp_Certificate.jpg", status: "ready" }
  ]);

  // Portfolio State
  const [profilePhoto, setProfilePhoto] = useState<string | null>(() => localStorage.getItem("credchain_profile_photo"));
  const [viewAsPublic, setViewAsPublic] = useState(false);
  const [portfolioName, setPortfolioName] = useState("Emeka Obi");
  const [portfolioHeadline, setPortfolioHeadline] = useState("Frontend-leaning Software Engineering student · FUTO");
  const [portfolioBio, setPortfolioBio] = useState("Frontend-leaning software engineering student passionate about building clean, verifiable web apps. Currently exploring blockchain credentialing.");
  const [portfolioSkills, setPortfolioSkills] = useState(["JavaScript", "React", "HTML/CSS", "Solidity", "TypeScript"]);
  const [newSkill, setNewSkill] = useState("");
  const [projects, setProjects] = useState([
    { id: 1, title: "CredChain Frontend", desc: "Static marketing + dashboard for a blockchain credential product.", tags: ["React", "Tailwind CSS"], published: true },
    { id: 2, title: "Wallet Explorer (draft)", desc: "", tags: ["JavaScript"], published: false }
  ]);

  // QR Code State
  const [qrScope, setQrScope] = useState<"portfolio" | "projects" | "credentials">("portfolio");
  const [qrCopied, setQrCopied] = useState(false);

  // Settings State
  const [openToOpps, setOpenToOpps] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [themeSetting, setThemeSetting] = useState(() => getTheme());
  const [advSettingsOpen, setAdvancedSettingsOpen] = useState(false);

  // Help State
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketCategory, setTicketCategory] = useState("Account & Profile");
  const [ticketMsg, setTicketMsg] = useState("");
  const [ticketConfirm, setTicketConfirm] = useState<string | null>(null);

  // Onboarding Wizard State
  const [onboardingOpen, setOnboardingOpen] = useState(() => localStorage.getItem("credchain_onboarded") !== "true");
  const [onboardingStep, setOnboardingStep] = useState(1);

  // Load Initial Context
  useEffect(() => {
    async function loadContext() {
      const cand = await getCandidate("demo-candidate");
      const notifs = await getNotifications("demo-candidate");
      const qr = await getQRCode("demo-candidate", "public");
      
      setCandidate(cand);
      setPortfolioName(cand?.name || "Emeka Obi");
      setNotifications(notifs || []);
      setQrUrl(qr?.qr_image_url || `https://api.qrserver.com/v1/create-qr-code/?data=https://credchain.io/verify/demo-candidate&size=200x200`);
    }
    loadContext();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("credchain_token");
    localStorage.removeItem("credchain_role");
    navigate("/login");
  };

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const newItem = { id: Date.now(), name: file.name, status: "processing" as const };
    setRefFiles(prev => [...prev, newItem]);
    
    setTimeout(() => {
      setRefFiles(prev => prev.map(f => f.id === newItem.id ? { ...f, status: "ready" } : f));
    }, 1500);
  };

  const handleGenerateResumeSubmit = async () => {
    setGeneratingResume(true);
    try {
      const res = await buildResume("demo-candidate", resumePrompt);
      setGeneratedResumeHtml(res.resume_html);
    } catch (err) {
      setGeneratedResumeHtml("<div class='space-y-3'><h3 class='text-lg font-bold text-white'>Emeka Obi</h3><p class='text-xs text-purple-300 font-mono'>B.Eng Computer Engineering • Verified on Solana</p><p class='text-sm text-gray-300'>Blockchain-verified Computer Engineering graduate with verified core competencies in smart contract development, frontend engineering, and cryptographic verification loops.</p></div>");
    } finally {
      setGeneratingResume(false);
    }
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReqSuccess(true);
    setTimeout(() => {
      setReqSuccess(false);
      setActiveTab("credentials");
    }, 1500);
  };

  const handleProjectPublishToggle = (id: number, currentPublished: boolean, desc: string) => {
    if (!currentPublished && !desc.trim()) {
      alert("Add a description to publish this project.");
      return;
    }
    setProjects(prev => prev.map(p => p.id === id ? { ...p, published: !currentPublished } : p));
  };

  const getSearchPlaceholder = () => {
    switch (activeTab) {
      case "dashboard": return "Search overview...";
      case "credentials": return "Search credentials...";
      case "request": return "Search institutions...";
      case "resume": return "Search credentials to include...";
      case "portfolio": return "Search profile sections...";
      case "settings": return "Search settings...";
      case "help": return "Search help articles...";
      default: return "Search...";
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case "dashboard": return "Dashboard";
      case "credentials": return "My Credentials";
      case "request": return "Request Credential";
      case "resume": return "AI Resume Builder";
      case "portfolio": return "My Portfolio";
      case "qr": return "Share QR Code";
      case "settings": return "Settings";
      case "help": return "Help & Support";
    }
  };

  // Sample Credentials Data
  const sampleCreds = [
    { id: "cred-1", title: "B.Eng. Software Engineering", issuer: "Federal University of Technology, Owerri", status: "verified", hash: "0x7f3a9b2c4d1e...", date: "May 2026" },
    { id: "cred-2", title: "Microsoft AI-900 Certification", issuer: "Microsoft · DSN Elevate Program", status: "verified", hash: "0x2c8f1a7e3b0d...", date: "Mar 2026" },
    { id: "cred-3", title: "Hackathon — 2nd Place Finalist", issuer: "TRI AI Saturdays · June 2026", status: "verified", hash: "0x9a1d4c7f2e8b...", date: "Jun 2026" },
    { id: "cred-4", title: "Internship Letter — Frontend Dev", issuer: "Accenture Nigeria · 2025", status: "pending", hash: "Awaiting institution signature", date: "Nov 2025" },
    { id: "cred-5", title: "100 Level Academic Transcript", issuer: "Federal University of Technology, Owerri", status: "verified", hash: "0x5e2b0f9c3d7a...", date: "Feb 2026" },
    { id: "cred-6", title: "NYSC Discharge Certificate", issuer: "National Youth Service Corps", status: "rejected", hash: "Verification declined", date: "Jan 2026", reason: "Matric/service number did not exactly match official institution records." }
  ];

  const filteredCreds = sampleCreds.filter(c => {
    if (credFilter === "all") return true;
    if (credFilter === "verified") return c.status === "verified";
    if (credFilter === "pending") return c.status === "pending";
    if (credFilter === "rejected") return c.status === "rejected";
    return true;
  });

  const sampleActivities = [
    { title: "AI-900 Certification", issuer: "Microsoft", action: "Credential issued", date: "Jun 3, 2026", status: "Verified" },
    { title: "Internship Letter", issuer: "Accenture", action: "Requested from issuer", date: "Jun 1, 2026", status: "Pending" },
    { title: "Hackathon Award", issuer: "TRI AI Saturdays", action: "Credential issued", date: "May 28, 2026", status: "Verified" },
    { title: "Resume Generated", issuer: "CredChain AI", action: "AI resume created", date: "May 25, 2026", status: "Done" }
  ];

  const faqs = [
    { id: 1, q: "Why is my credential request still pending?", a: "Requests move Requested → In Review → Issued/Rejected. The institution registrar reviews and cryptographically signs each one, which can take 1-3 business days." },
    { id: 2, q: "My institution isn't in the directory — what do I do?", a: "Only whitelisted accredited institutions can issue on-chain. Send us their official name via the contact form below and our partnerships team will reach out to onboard them." },
    { id: 3, q: "What does 'Verified On-Chain' mean?", a: "The issuing institution cryptographically signed your academic record and anchored its Merkle root hash on Solana Mainnet. Anyone can independently verify authenticity without contacting registrars." },
    { id: 4, q: "Can I edit a verified credential?", a: "No. Verified credentials are strictly immutable by design — that is what makes them tamper-proof and trusted by employers. You can control public visibility toggles in My Portfolio." },
    { id: 5, q: "How do I control what's visible on my portfolio?", a: "In My Portfolio, every credential, bio section, and project has a personal visibility toggle. Clicking 'View as Public' lets you preview the exact read-only desk employers see." }
  ];

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
          
          {/* Group 1: Main */}
          <div className="space-y-1">
            <div className="px-3 text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold mb-2">Main</div>
            
            <button
              onClick={() => { setActiveTab("dashboard"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "dashboard" ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-[0_0_20px_rgba(124,58,253,0.15)] font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
            >
              <LayoutDashboard className={`w-4 h-4 ${activeTab === "dashboard" ? "text-purple-400" : "text-gray-400"}`} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => { setActiveTab("credentials"); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "credentials" ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-[0_0_20px_rgba(124,58,253,0.15)] font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
            >
              <div className="flex items-center gap-3">
                <GraduationCap className={`w-4 h-4 ${activeTab === "credentials" ? "text-purple-400" : "text-gray-400"}`} />
                <span>My Credentials</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-bold shadow-[0_0_10px_rgba(124,58,253,0.5)]">1</span>
            </button>

            <button
              onClick={() => { setActiveTab("request"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "request" ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-[0_0_20px_rgba(124,58,253,0.15)] font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
            >
              <Send className={`w-4 h-4 ${activeTab === "request" ? "text-purple-400" : "text-gray-400"}`} />
              <span>Request Credential</span>
            </button>

            <button
              onClick={() => { setActiveTab("resume"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "resume" ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-[0_0_20px_rgba(124,58,253,0.15)] font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
            >
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>AI Resume Builder</span>
            </button>
          </div>

          {/* Group 2: Profile */}
          <div className="space-y-1">
            <div className="px-3 text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold mb-2">Profile</div>
            
            <button
              onClick={() => { setActiveTab("portfolio"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "portfolio" ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-[0_0_20px_rgba(124,58,253,0.15)] font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
            >
              <UserCircle className={`w-4 h-4 ${activeTab === "portfolio" ? "text-purple-400" : "text-gray-400"}`} />
              <span>My Portfolio</span>
            </button>

            <button
              onClick={() => { setActiveTab("qr"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "qr" ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-[0_0_20px_rgba(124,58,253,0.15)] font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
            >
              <QrCode className={`w-4 h-4 ${activeTab === "qr" ? "text-purple-400" : "text-gray-400"}`} />
              <span>Share QR Code</span>
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
              <span>Help &amp; Support</span>
            </button>
          </div>

        </nav>

        {/* Sidebar User Profile Bottom */}
        <div className="p-4 border-t border-white/10 bg-[#08080f] flex items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#00f5ff] to-[#7c3aff] text-[#05050a] font-extrabold font-display text-xs flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(124,58,253,0.4)]">
              EO
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">{portfolioName}</div>
              <div className="text-[10px] font-mono text-gray-400 truncate">Candidate · FUTO</div>
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
            <h2 className="text-base sm:text-lg font-bold font-display text-white truncate">{getPageTitle()}</h2>
          </div>

          {/* Contextual Search */}
          <div className="hidden md:flex flex-1 max-w-sm relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={getSearchPlaceholder()}
              className="w-full bg-[#0d0d16] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all"
            />
          </div>

          {/* Topbar Right Actions */}
          <div className="flex items-center gap-3">
            
            {/* Notifications Bell Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setNotifOpen(!notifOpen)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer relative ${notifOpen ? "bg-purple-600/20 border-purple-500 text-purple-300 shadow-[0_0_15px_rgba(124,58,253,0.3)]" : "bg-[#0d0d16] border-white/10 text-gray-300 hover:text-white hover:border-white/20"}`}
              >
                <Bell className="w-4 h-4" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_6px_#a855f7]" />
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#0d0d16] border border-white/15 rounded-2xl shadow-2xl py-3 z-50 animate-scale-up">
                  <div className="px-4 pb-2.5 border-b border-white/10 flex items-center justify-between">
                    <span className="text-xs font-bold font-display text-white">Notifications ({notifications.length})</span>
                    <button onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))} className="text-[11px] font-mono text-purple-400 hover:underline cursor-pointer">
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
                    {notifications.map(n => (
                      <div key={n.id} onClick={() => { setActiveTab("credentials"); setNotifOpen(false); }} className={`p-3.5 hover:bg-white/5 transition-colors cursor-pointer flex gap-3 items-start ${n.read ? "opacity-60" : "bg-purple-500/5"}`}>
                        <div className="mt-0.5">
                          {n.type === "approved" ? <CheckCircle2 className="w-4 h-4 text-teal-400" /> : <AlertCircle className="w-4 h-4 text-purple-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-200 leading-relaxed">{n.message}</p>
                          <span className="text-[10px] font-mono text-gray-500 mt-1 block">{n.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Jump to Settings Shortcut */}
            <button 
              onClick={() => setActiveTab("settings")}
              className="p-2.5 rounded-xl bg-[#0d0d16] border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all cursor-pointer hidden sm:block"
              title="Settings"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Avatar Initials Pill */}
            <div onClick={() => setActiveTab("portfolio")} className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#00f5ff] to-[#7c3aff] text-[#05050a] font-extrabold font-display text-xs flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-purple-400 transition-all shadow-[0_0_15px_rgba(124,58,253,0.3)]">
              EO
            </div>

          </div>
        </header>

        {/* ── DASHBOARD BODY CONTAINER ── */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          
          {/* ════════════════════════════════════════════════════════
             VIEW 1: DASHBOARD OVERVIEW
             ════════════════════════════════════════════════════════ */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Profile Banner */}
              {profileBannerOpen && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-purple-900/40 via-[#0d0d16] to-transparent border border-purple-500/30 rounded-2xl p-5 text-sm shadow-[0_0_30px_rgba(124,58,253,0.15)]">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-purple-500/20 text-purple-300 flex-shrink-0"><UserCircle className="w-6 h-6 text-purple-400" /></div>
                    <div>
                      <strong className="block text-white font-display text-base">Complete your profile desk</strong>
                      <span className="text-xs text-gray-300">Add verified skills and bio summary so inquiring employers see the full tamper-proof picture.</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <button onClick={() => setActiveTab("portfolio")} className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer transition-all shadow-[0_0_20px_rgba(124,58,253,0.4)]">Complete now</button>
                    <button onClick={() => setProfileBannerOpen(false)} className="text-gray-400 hover:text-white p-1.5 cursor-pointer"><X className="w-4 h-4" /></button>
                  </div>
                </div>
              )}

              {/* Page Greeting & Wallet Address Chip */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white">Welcome back, {portfolioName.split(" ")[0]} 👋</h1>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">Here is a real-time cryptographic overview of your identity vault.</p>
                </div>
                <button 
                  onClick={() => { navigator.clipboard.writeText("0x4f3a9b2c8e1d7a6f5b4c3d2e1f0a9b8c7d6e5f4a"); setWalletCopied(true); setTimeout(() => setWalletCopied(false), 2000); }} 
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 font-mono text-xs font-semibold cursor-pointer transition-all self-start md:self-center shadow-[0_0_20px_rgba(124,58,253,0.15)]"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse shadow-[0_0_8px_#2dd4bf]" />
                  <span>{walletCopied ? "Solana Address Copied!" : "0x4f3a...b92c"}</span>
                  <Copy className="w-3.5 h-3.5 ml-1 text-purple-400" />
                </button>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden group hover:border-purple-500/40 hover:shadow-[0_0_25px_rgba(124,58,253,0.1)] transition-all shadow-xl">
                  <div className="p-3.5 rounded-xl bg-purple-500/15 text-purple-400"><GraduationCap className="w-6 h-6" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-2xl font-extrabold font-display text-white">7</div>
                    <div className="text-xs text-gray-400 truncate">Total Credentials</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-bold text-[10px] font-mono">+2</span>
                </div>

                <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden group hover:border-teal-500/40 hover:shadow-[0_0_25px_rgba(45,212,191,0.1)] transition-all shadow-xl">
                  <div className="p-3.5 rounded-xl bg-teal-500/15 text-teal-400"><CheckCircle2 className="w-6 h-6" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-2xl font-extrabold font-display text-white">5</div>
                    <div className="text-xs text-gray-400 truncate">Verified On-Chain</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-bold text-[10px] font-mono">+1</span>
                </div>

                <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden group hover:border-purple-400/40 hover:shadow-[0_0_25px_rgba(168,85,247,0.1)] transition-all shadow-xl">
                  <div className="p-3.5 rounded-xl bg-purple-500/15 text-purple-300"><Eye className="w-6 h-6" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-2xl font-extrabold font-display text-white">142</div>
                    <div className="text-xs text-gray-400 truncate">Profile Views</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-bold text-[10px] font-mono">+18</span>
                </div>

                <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden group hover:border-purple-500/40 hover:shadow-[0_0_25px_rgba(124,58,253,0.1)] transition-all shadow-xl">
                  <div className="p-3.5 rounded-xl bg-purple-500/15 text-purple-400"><FileText className="w-6 h-6" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-2xl font-extrabold font-display text-white">3</div>
                    <div className="text-xs text-gray-400 truncate">Resumes Generated</div>
                  </div>
                </div>
              </div>

              {/* My Credential Wallet Grid (first 5 + Request tile) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold font-display text-white">My Credential Wallet</h3>
                  <button onClick={() => setActiveTab("credentials")} className="text-xs font-semibold text-purple-400 hover:text-purple-300 hover:underline flex items-center gap-1 cursor-pointer">
                    View all <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sampleCreds.slice(0, 5).map((c, idx) => (
                    <div key={c.id || idx} className="bg-[#0d0d16] border border-white/10 hover:border-purple-500/40 rounded-2xl p-5 transition-all shadow-xl hover:shadow-[0_0_25px_rgba(124,58,253,0.12)] flex flex-col justify-between gap-4 relative overflow-hidden group">
                      <div className={`absolute top-0 left-0 right-0 h-1 ${c.status === "verified" ? "bg-teal-400 shadow-[0_0_10px_#2dd4bf]" : c.status === "pending" ? "bg-purple-500" : "bg-red-500"}`} />
                      
                      <div className="flex items-start justify-between gap-3 pt-1">
                        <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                          {idx === 0 ? <GraduationCap className="w-5 h-5" /> : idx === 1 ? <Trophy className="w-5 h-5 text-teal-400" /> : <ScrollText className="w-5 h-5" />}
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono uppercase ${c.status === "verified" ? "bg-teal-500/15 text-teal-300 border border-teal-500/30" : "bg-purple-500/15 text-purple-300 border border-purple-500/30 animate-pulse"}`}>
                          {c.status}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-white font-display leading-snug">{c.title}</h4>
                        <p className="text-xs text-gray-400 mt-1 truncate">{c.issuer}</p>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500">
                        <span className="truncate max-w-[130px]" title={c.hash}>{c.hash}</span>
                        <span>{c.date}</span>
                      </div>

                      <div className="flex gap-2 pt-1">
                        <button onClick={() => setActiveTab("qr")} className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-semibold text-xs transition-colors cursor-pointer">Share QR</button>
                        <button onClick={() => alert(`Viewing Merkle proof for ${c.title} on Solana Explorer.`)} className="flex-1 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 font-semibold text-xs transition-colors cursor-pointer">View On-Chain</button>
                      </div>
                    </div>
                  ))}

                  {/* Request Credential Dashed Tile */}
                  <button onClick={() => setActiveTab("request")} className="border-2 border-dashed border-white/15 hover:border-purple-500 hover:bg-purple-500/5 rounded-2xl p-6 transition-all flex flex-col items-center justify-center text-center gap-3 min-h-[220px] cursor-pointer group">
                    <div className="p-3.5 rounded-full bg-white/5 group-hover:bg-purple-500/15 text-gray-400 group-hover:text-purple-400 transition-all shadow-md">
                      <Send className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold font-display text-sm text-gray-200 group-hover:text-white">Request Credential</div>
                      <div className="text-xs text-gray-500 mt-1">Degree · Certificate · Award</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Recent Activity Table */}
              <div className="bg-[#0d0d16] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-5 border-b border-white/10 flex items-center justify-between">
                  <h3 className="font-bold font-display text-base text-white">Recent Activity Ledger</h3>
                  <button onClick={() => setActiveTab("credentials")} className="text-xs text-purple-400 hover:underline cursor-pointer">View all</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-black/25 text-gray-400 font-mono uppercase text-[10px] border-b border-white/10">
                        <th className="p-4">Credential</th>
                        <th className="p-4 hidden sm:table-cell">Issuer</th>
                        <th className="p-4">Action</th>
                        <th className="p-4 hidden md:table-cell">Date</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-gray-300">
                      {sampleActivities.map((act, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 font-semibold text-white flex items-center gap-2.5">
                            <div className="p-1.5 rounded-lg bg-purple-500/15 text-purple-400"><CheckSquare className="w-3.5 h-3.5" /></div>
                            <span>{act.title}</span>
                          </td>
                          <td className="p-4 text-gray-400 hidden sm:table-cell">{act.issuer}</td>
                          <td className="p-4">{act.action}</td>
                          <td className="p-4 font-mono text-gray-500 hidden md:table-cell">{act.date}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold uppercase ${act.status === "Verified" || act.status === "Done" ? "bg-teal-500/15 text-teal-300 border border-teal-500/30" : "bg-purple-500/15 text-purple-300 border border-purple-500/30 animate-pulse"}`}>
                              {act.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* End of Section CTA Strip */}
              <div onClick={() => setActiveTab("qr")} className="bg-gradient-to-r from-[#0d0d16] via-[#151125] to-[#0d0d16] border border-white/15 hover:border-purple-500/50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all cursor-pointer shadow-2xl group hover:shadow-[0_0_30px_rgba(124,58,253,0.15)]">
                <div>
                  <strong className="block text-white font-display text-base group-hover:text-purple-400 transition-colors">Share your public proof profile</strong>
                  <span className="text-xs text-gray-400 mt-1 block">Generate a tamper-proof QR code verifiers and background checking employers can scan instantly.</span>
                </div>
                <button className="px-5 py-2.5 rounded-xl bg-purple-600 group-hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 flex-shrink-0 shadow-[0_0_20px_rgba(124,58,253,0.4)] transition-all">
                  <QrCode className="w-4 h-4" />
                  <span>Share portfolio desk</span>
                </button>
              </div>

            </div>
          )}

          {/* ════════════════════════════════════════════════════════
             VIEW 2: MY CREDENTIALS
             ════════════════════════════════════════════════════════ */}
          {activeTab === "credentials" && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-white/10 pb-5">
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">My Credentials Vault</h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Your cryptographic credential wallet — track every requested, pending, and anchored proof.</p>
              </div>

              {/* Status Pill Filters */}
              <div className="flex gap-2 flex-wrap">
                {(["all", "verified", "pending", "rejected"] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setCredFilter(f)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold uppercase font-mono transition-all cursor-pointer capitalize ${credFilter === f ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(124,58,253,0.4)]" : "bg-[#0d0d16] border border-white/10 text-gray-400 hover:text-white hover:border-white/20"}`}
                  >
                    {f} ({f === "all" ? sampleCreds.length : sampleCreds.filter(c => c.status === f).length})
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCreds.map((c, idx) => (
                  <div key={c.id} className={`bg-[#0d0d16] border hover:border-purple-500/40 rounded-2xl p-6 transition-all shadow-xl hover:shadow-[0_0_25px_rgba(124,58,253,0.1)] flex flex-col justify-between gap-5 relative overflow-hidden ${c.status === "rejected" ? "border-red-500/30" : "border-white/10"}`}>
                    <div className={`absolute top-0 left-0 right-0 h-1.5 ${c.status === "verified" ? "bg-teal-400 shadow-[0_0_10px_#2dd4bf]" : c.status === "pending" ? "bg-purple-500" : "bg-red-500"}`} />
                    
                    <div className="flex items-start justify-between gap-3">
                      <div className="p-3 rounded-xl bg-white/5 text-purple-400">
                        {c.status === "verified" ? <GraduationCap className="w-6 h-6 text-teal-400" /> : c.status === "pending" ? <Clock className="w-6 h-6 text-purple-400" /> : <FileX className="w-6 h-6 text-red-400" />}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono uppercase ${c.status === "verified" ? "bg-teal-500/15 text-teal-300 border border-teal-500/30" : c.status === "pending" ? "bg-purple-500/15 text-purple-300 border border-purple-500/30 animate-pulse" : "bg-red-500/15 text-red-400 border border-red-500/30"}`}>
                        {c.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-base text-white font-display leading-snug">{c.title}</h3>
                      <p className="text-xs text-gray-400 mt-1">{c.issuer}</p>
                    </div>

                    {c.reason && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-[11px] text-red-300 leading-relaxed">
                        ⚠️ <strong>Flagged:</strong> {c.reason}
                      </div>
                    )}

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-500">
                      <span className="truncate max-w-[150px]">{c.hash}</span>
                      <span>{c.date}</span>
                    </div>

                    <div className="flex gap-2">
                      {c.status === "rejected" ? (
                        <button onClick={() => setActiveTab("request")} className="w-full py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold text-xs cursor-pointer shadow-lg transition-all">Resubmit Issuance Request</button>
                      ) : (
                        <>
                          <button onClick={() => setActiveTab("qr")} className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 font-semibold text-xs transition-colors cursor-pointer">Share QR</button>
                          <button onClick={() => alert(`Viewing cryptographic signature on Solana for ${c.title}`)} className="flex-1 py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 font-semibold text-xs transition-colors cursor-pointer">View On-Chain</button>
                        </>
                      )}
                    </div>
                  </div>
                ))}

                {/* Request Tile */}
                <button onClick={() => setActiveTab("request")} className="border-2 border-dashed border-white/15 hover:border-purple-500 hover:bg-purple-500/5 rounded-2xl p-8 transition-all flex flex-col items-center justify-center text-center gap-3 cursor-pointer group">
                  <Plus className="w-8 h-8 text-gray-500 group-hover:text-purple-400 transition-all" />
                  <div className="font-bold font-display text-base text-gray-300 group-hover:text-white">Request New Credential</div>
                  <p className="text-xs text-gray-500">Submit matric details to accredited institution registrars.</p>
                </button>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════
             VIEW 3: REQUEST CREDENTIAL
             ════════════════════════════════════════════════════════ */}
          {activeTab === "request" && (
            <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
              <div className="border-b border-white/10 pb-5">
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">Request Credential Issuance</h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Request official records directly from accredited universities and certification authorities. You never upload proofs — registrars anchor Merkle roots.</p>
              </div>

              {reqSuccess && (
                <div className="p-4 bg-teal-500/15 border border-teal-500/30 rounded-2xl text-teal-300 text-xs font-mono flex items-center gap-3 animate-bounce">
                  <CheckCircle2 className="w-5 h-5 text-teal-400" />
                  <span>Issuance request successfully placed in registrar queue! Redirecting to vault...</span>
                </div>
              )}

              <form onSubmit={handleRequestSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                
                {/* Step 1: Choose Institution */}
                <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-3 font-display font-bold text-sm text-white">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-mono border border-purple-500/30">1</span>
                    <span>Choose Issuing Institution</span>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      { id: "futo", name: "Federal University of Technology, Owerri (FUTO)", type: "University · Whitelisted Root" },
                      { id: "ms", name: "Microsoft (DSN Elevate Bootcamp)", type: "Certifying Body · Whitelisted Root" },
                      { id: "acc", name: "Accenture Talent Academy Nigeria", type: "Corporate Employer · Whitelisted Root" }
                    ].map(inst => (
                      <div
                        key={inst.id}
                        onClick={() => setReqInst(inst.id)}
                        className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${reqInst === inst.id ? "bg-purple-600/20 border-purple-500 text-white shadow-[0_0_15px_rgba(124,58,253,0.2)]" : "bg-[#05050a] border-white/10 text-gray-400 hover:border-white/20"}`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Building2 className={`w-5 h-5 flex-shrink-0 ${reqInst === inst.id ? "text-purple-400" : "text-gray-500"}`} />
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-gray-100 truncate">{inst.name}</div>
                            <div className="text-[10px] font-mono text-gray-500 truncate">{inst.type}</div>
                          </div>
                        </div>
                        {reqInst === inst.id && <Check className="w-4 h-4 text-purple-400 flex-shrink-0 ml-2" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 2: Credential Details */}
                <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-6 space-y-5 shadow-xl">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-3 font-display font-bold text-sm text-white">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-mono border border-purple-500/30">2</span>
                    <span>Credential Type &amp; Details</span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">Credential Type</label>
                    <select
                      value={reqType}
                      onChange={(e) => setReqType(e.target.value)}
                      className="w-full bg-[#05050a] border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500"
                    >
                      <option>Transcript / Degree</option>
                      <option>Certificate</option>
                      <option>Internship Letter</option>
                      <option>Award</option>
                    </select>
                  </div>

                  {/* Dynamic Fields */}
                  {reqType === "Transcript / Degree" ? (
                    <>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-300">Matriculation Number</label>
                        <input required type="text" placeholder="e.g. 2021110045" value={reqMatric} onChange={e => setReqMatric(e.target.value)} className="w-full bg-[#05050a] border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 font-mono" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-300">Program / Major</label>
                        <input required type="text" placeholder="e.g. B.Eng Computer Engineering" value={reqProgram} onChange={e => setReqProgram(e.target.value)} className="w-full bg-[#05050a] border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-300">Graduation Year / Session</label>
                        <input required type="text" placeholder="e.g. 2025/2026" value={reqGradYear} onChange={e => setReqGradYear(e.target.value)} className="w-full bg-[#05050a] border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 font-mono" />
                      </div>
                    </>
                  ) : (
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-300">Reference / Cohort Identifier</label>
                      <input required type="text" placeholder="e.g. Cohort 4 Solana Bootcamp" className="w-full bg-[#05050a] border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500" />
                    </div>
                  )}

                  <div className="p-3.5 bg-purple-500/10 border border-purple-500/20 rounded-xl text-[11px] text-purple-300 font-mono">
                    ℹ️ Institutional fee ($0.00 Gas Free) covered by CredChain Grant.
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-[0_0_25px_rgba(124,58,253,0.4)]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmit Issuance Request</span>
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════
             VIEW 4: AI RESUME BUILDER
             ════════════════════════════════════════════════════════ */}
          {activeTab === "resume" && (
            <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
              <div className="border-b border-white/10 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">AI Verified Resume Builder</h1>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">Generate dynamic, cryptographically verifiable resumes tailored for any role using Gemini AI + Solana Merkle proofs.</p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-mono font-bold self-start sm:self-auto">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" /> Powered by Gemini
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Controls (Left 5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Verified Blocks Selector */}
                  <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-5 space-y-4 shadow-xl">
                    <h3 className="font-bold text-sm text-white font-display flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-400" />
                      <span>Select Verified On-Chain Blocks</span>
                    </h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {sampleCreds.filter(c => c.status === "verified").map(c => (
                        <label key={c.id} className="flex items-center gap-3 p-3 rounded-xl bg-[#05050a] border border-white/10 hover:border-purple-500/40 cursor-pointer text-xs text-gray-200 transition-colors">
                          <input defaultChecked type="checkbox" className="rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-900" />
                          <span className="truncate flex-1">{c.title}</span>
                          <span className="text-gray-500 text-[10px] font-mono ml-auto truncate max-w-[100px]">{c.issuer}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Upload Reference Documents */}
                  <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-5 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-white font-display flex items-center gap-2">
                        <Paperclip className="w-4 h-4 text-purple-400" />
                        <span>Reference Documents (PDF / JPG)</span>
                      </h3>
                      <span className="text-[10px] font-mono text-gray-500">Max 10MB</span>
                    </div>

                    <label className="border-2 border-dashed border-white/15 hover:border-purple-500 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer group bg-[#05050a] transition-all">
                      <UploadCloud className="w-6 h-6 text-gray-500 group-hover:text-purple-400 transition-all mb-2" />
                      <span className="text-xs font-semibold text-gray-300 group-hover:text-white">Click to attach transcript or certificates</span>
                      <span className="text-[10px] text-gray-500 mt-1">AI extracts coursework &amp; GPA for prompt grounding</span>
                      <input type="file" onChange={handleFileUpload} className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                    </label>

                    {refFiles.length > 0 && (
                      <div className="space-y-2 pt-2">
                        {refFiles.map(f => (
                          <div key={f.id} className="p-3 rounded-xl bg-[#05050a] border border-white/10 flex items-center justify-between text-xs">
                            <span className="truncate max-w-[200px] text-gray-300">{f.name}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${f.status === "ready" ? "bg-teal-500/15 text-teal-300" : "bg-purple-500/15 text-purple-300 animate-pulse"}`}>
                              {f.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Target Role & Prompt */}
                  <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-5 space-y-3 shadow-xl">
                    <h3 className="font-bold text-sm text-white font-display flex items-center gap-2">
                      <Wand2 className="w-4 h-4 text-purple-400" />
                      <span>Target Role &amp; Prompt Instructions</span>
                    </h3>
                    <textarea rows={3} value={resumePrompt} onChange={e => setResumePrompt(e.target.value)} className="w-full bg-[#05050a] border border-white/15 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-purple-500" />
                    
                    <button
                      onClick={handleGenerateResumeSubmit}
                      disabled={generatingResume}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-500 hover:to-teal-400 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(124,58,253,0.4)] transition-all touch-manipulation active:scale-[0.98]"
                    >
                      {generatingResume ? (
                        <>
                          <Sparkles className="w-4 h-4 animate-spin text-white" />
                          <span>Gemini Synthesising Verified Resume...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-white" />
                          <span>Generate Verifiable AI Resume</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>

                {/* Preview Paper Desk (Right 7 Cols) */}
                <div className="lg:col-span-7 bg-[#0d0d16] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 sticky top-20 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Live Output Preview</span>
                    {generatedResumeHtml && (
                      <div className="flex items-center gap-2">
                        <button onClick={() => navigator.clipboard.writeText(generatedResumeHtml)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs flex items-center gap-1 cursor-pointer">
                          <Copy className="w-3.5 h-3.5" /> Copy HTML
                        </button>
                        <button onClick={() => alert("Downloading tamper-proof PDF embedded with Solana verification signatures.")} className="px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(124,58,253,0.4)]">
                          <Download className="w-3.5 h-3.5" /> Export Verifiable PDF
                        </button>
                      </div>
                    )}
                  </div>

                  {!generatedResumeHtml ? (
                    <div className="min-h-[420px] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-center p-8 space-y-4 bg-[#05050a]/40">
                      <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-inner">
                        <FileText className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-300 font-display">Your verified resume desk appears here</h4>
                        <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">Select verified blocks and uploaded references on the left, then click Generate.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6 animate-fade-in">
                      <div className="resume-preview p-6 sm:p-8 rounded-2xl bg-[#05050a] border border-white/10 shadow-inner min-h-[420px] max-w-full overflow-x-hidden">
                        <div className="prose prose-invert max-w-none text-xs text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: generatedResumeHtml }} />
                      </div>

                      {/* Footer Badge on Exported Desk */}
                      <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-between text-[11px] font-mono text-purple-300">
                        <span className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-teal-400" />
                          <span>Cryptographic Anchor: Solana Mainnet (#88f9a1)</span>
                        </span>
                        <a href="#" className="text-teal-400 hover:underline flex items-center gap-1">
                          Verify Proof <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════
             VIEW 5: MY PORTFOLIO
             ════════════════════════════════════════════════════════ */}
          {activeTab === "portfolio" && (
            <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">My Portfolio Desk</h1>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">Control your public student identity. Toggle individual credentials and projects verifiers can inspect.</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setViewAsPublic(!viewAsPublic)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${viewAsPublic ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(124,58,253,0.4)]" : "bg-white/10 text-gray-200 hover:bg-white/15"}`}
                  >
                    <Eye className="w-4 h-4" />
                    <span>{viewAsPublic ? "Exit Public Preview" : "View as Public Desk"}</span>
                  </button>
                  <Link to={`/verify/demo-candidate`} target="_blank" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 transition-colors" title="Open public URL">
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {viewAsPublic && (
                <div className="p-3 bg-purple-500/15 border border-purple-500/30 rounded-xl text-purple-300 text-xs font-mono text-center shadow-md">
                  👁️ <strong>Public Preview Mode:</strong> This is the exact read-only view prospective employers and background checkers see.
                </div>
              )}

              {/* Profile Header Edit Card */}
              <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-start shadow-xl">
                <div className="relative group flex-shrink-0">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#00f5ff] to-[#7c3aff] text-[#05050a] font-black font-display text-3xl flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(124,58,253,0.4)] border border-white/15">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt={portfolioName} className="w-full h-full object-cover" />
                    ) : (
                      "EO"
                    )}
                  </div>
                  {!viewAsPublic && (
                    <label className="absolute inset-0 rounded-2xl bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 text-white text-[11px] font-mono font-bold cursor-pointer transition-opacity backdrop-blur-xs z-10">
                      <Camera className="w-5 h-5 text-[#00f5ff]" />
                      <span>Change Pic</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              const res = ev.target?.result as string;
                              setProfilePhoto(res);
                              localStorage.setItem("credchain_profile_photo", res);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  )}
                </div>
                <div className="flex-1 space-y-3 w-full">
                  <input readOnly={viewAsPublic} type="text" value={portfolioName} onChange={e => setPortfolioName(e.target.value)} className={`w-full text-xl font-extrabold font-display text-white bg-transparent rounded px-2 py-1 ${viewAsPublic ? "border-transparent pointer-events-none" : "border border-white/10 focus:border-purple-500 bg-[#05050a]"}`} />
                  <input readOnly={viewAsPublic} type="text" value={portfolioHeadline} onChange={e => setPortfolioHeadline(e.target.value)} className={`w-full text-xs text-gray-400 font-mono bg-transparent rounded px-2 py-1 ${viewAsPublic ? "border-transparent pointer-events-none" : "border border-white/10 focus:border-purple-500 bg-[#05050a]"}`} />
                  
                  <div className="flex items-center gap-3 pt-1 text-xs">
                    <span className="flex items-center gap-1.5 text-teal-400 font-mono"><ShieldCheck className="w-4 h-4" /> Verified Student</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-400">Federal University of Technology, Owerri</span>
                  </div>

                  {!viewAsPublic && (
                    <div className="pt-2 flex gap-2">
                      <button onClick={() => alert("Add social link modal")} className="px-3 py-1 rounded-full border border-dashed border-purple-500/40 text-purple-400 text-xs font-mono hover:bg-purple-500/10 cursor-pointer">+ Add link</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Bio & Skills */}
              <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
                <h3 className="font-bold font-display text-base text-white">About &amp; Verified Competencies</h3>
                <textarea readOnly={viewAsPublic} rows={3} value={portfolioBio} onChange={e => setPortfolioBio(e.target.value)} className={`w-full text-xs text-gray-300 leading-relaxed rounded p-3 ${viewAsPublic ? "border-transparent pointer-events-none bg-transparent pl-0" : "border border-white/10 focus:border-purple-500 bg-[#05050a]"}`} />
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {portfolioSkills.map(s => (
                    <span key={s} className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-mono font-semibold flex items-center gap-1.5 shadow-sm">
                      <Check className="w-3 h-3 text-teal-400" /> {s}
                      {!viewAsPublic && <X onClick={() => setPortfolioSkills(portfolioSkills.filter(sk => sk !== s))} className="w-3 h-3 text-gray-500 hover:text-red-400 ml-1 cursor-pointer" />}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects Section */}
              <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold font-display text-base text-white">Projects &amp; Verifiable Proofs</h3>
                  {!viewAsPublic && (
                    <button onClick={() => setProjects([...projects, { id: Date.now(), title: "New Verifiable Project", desc: "Project summary description...", tags: ["Solidity"], published: false }])} className="text-xs font-semibold text-purple-400 hover:underline cursor-pointer">+ Add project</button>
                  )}
                </div>

                <div className="space-y-3">
                  {projects.filter(p => !viewAsPublic || p.published).map(p => (
                    <div key={p.id} className="p-4 rounded-xl bg-[#05050a] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-white">{p.title}</h4>
                        <p className="text-xs text-gray-400">{p.desc || "No description added yet."}</p>
                        <div className="flex gap-1.5 pt-1">
                          {p.tags.map(t => <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-gray-300">{t}</span>)}
                        </div>
                      </div>

                      {!viewAsPublic && (
                        <div className="flex items-center gap-3 self-end sm:self-center">
                          <button
                            onClick={() => handleProjectPublishToggle(p.id, p.published, p.desc)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${p.published ? "bg-teal-500/15 text-teal-300 border border-teal-500/30" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}
                          >
                            {p.published ? "● Published" : "○ Hidden"}
                          </button>
                          <button onClick={() => setProjects(projects.filter(pr => pr.id !== p.id))} className="text-gray-500 hover:text-red-400 p-1"><X className="w-4 h-4" /></button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ════════════════════════════════════════════════════════
             VIEW 6: SHARE QR CODE
             ════════════════════════════════════════════════════════ */}
          {activeTab === "qr" && (
            <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
              <div className="border-b border-white/10 pb-5 text-center">
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">Share Verifier Proof QR</h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Generate a scoped cryptographic QR code. Verifiers scan to audit proof authenticity directly on Solana Mainnet.</p>
              </div>

              <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-6 space-y-6 shadow-xl text-center">
                <div className="flex bg-[#05050a] p-1 rounded-xl border border-white/10 max-w-md mx-auto">
                  {(["portfolio", "projects", "credentials"] as const).map(sc => (
                    <button
                      key={sc}
                      onClick={() => setQrScope(sc)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold font-mono uppercase capitalize transition-all cursor-pointer ${qrScope === sc ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(124,58,253,0.4)]" : "text-gray-400 hover:text-white"}`}
                    >
                      {sc}
                    </button>
                  ))}
                </div>

                <div className="p-6 bg-white rounded-3xl inline-block shadow-[0_0_50px_rgba(124,58,253,0.25)] mx-auto border-4 border-purple-500/20">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?data=https://credchain.io/verify/demo-candidate?scope=${qrScope}&size=220x220`}
                    alt="Scoped QR"
                    className="w-48 h-48 sm:w-56 sm:h-56 mx-auto"
                  />
                </div>

                <div className="max-w-md mx-auto space-y-3">
                  <div className="flex items-center gap-2 bg-[#05050a] border border-white/10 rounded-xl p-2 pl-3">
                    <input readOnly type="text" value={`https://credchain.io/verify/demo?scope=${qrScope}`} className="bg-transparent text-xs text-gray-300 font-mono flex-1 focus:outline-none truncate" />
                    <button onClick={() => { navigator.clipboard.writeText(`https://credchain.io/verify/demo?scope=${qrScope}`); setQrCopied(true); setTimeout(() => setQrCopied(false), 2000); }} className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer flex items-center gap-1.5 shadow-md">
                      {qrCopied ? <Check className="w-3.5 h-3.5 text-teal-300" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{qrCopied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => alert("Downloading High-Res PNG")} className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs cursor-pointer flex items-center justify-center gap-2 border border-white/10">
                      <Download className="w-4 h-4" /> Download QR
                    </button>
                    <button onClick={() => { if (navigator.share) navigator.share({ url: window.location.href }); }} className="flex-1 py-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 font-bold text-xs cursor-pointer flex items-center justify-center gap-2">
                      <Share2 className="w-4 h-4" /> Native Share
                    </button>
                  </div>
                </div>
              </div>

              {/* Verified Identity Card Preview */}
              <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-6 space-y-5 shadow-xl text-center">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Card Preview Verifiers See</span>
                
                <div className="max-w-sm mx-auto bg-gradient-to-b from-[#151125] to-[#0d0d16] border border-purple-500/30 rounded-2xl p-6 text-left shadow-2xl relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00f5ff] to-[#7c3aff] text-[#05050a] font-black flex items-center justify-center text-xs overflow-hidden">
                      {profilePhoto ? <img src={profilePhoto} alt={portfolioName} className="w-full h-full object-cover" /> : "EO"}
                    </div>
                    <div>
                      <h3 className="font-bold font-display text-lg text-white">{portfolioName}</h3>
                      <span className="text-[10px] font-mono text-teal-400">● Verified Solana Anchor</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 line-clamp-2">{portfolioHeadline}</p>
                  <div className="mt-4 pt-3 border-t border-white/10 flex justify-between text-[10px] font-mono text-gray-500">
                    <span>Scope: {qrScope}</span>
                    <span>credchain.io</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════
             VIEW 7: SETTINGS
             ════════════════════════════════════════════════════════ */}
          {activeTab === "settings" && (
            <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
              <div className="border-b border-white/10 pb-5">
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">Settings</h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Manage your identity vault preferences, notifications, and public desk access.</p>
              </div>

              <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-6 space-y-6 shadow-xl">
                <h3 className="font-bold font-display text-base text-white border-b border-white/10 pb-3">Quick Settings</h3>

                <div className="space-y-5 divide-y divide-white/5">
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <strong className="block text-sm text-white font-display">Open to Opportunities Badge</strong>
                      <span className="text-xs text-gray-400">Display verified 'Open to Work' indicator on your public desk.</span>
                    </div>
                    <button onClick={() => setOpenToOpps(!openToOpps)} className={`w-12 h-6 rounded-full transition-colors relative p-1 cursor-pointer ${openToOpps ? "bg-purple-600 shadow-[0_0_10px_rgba(124,58,253,0.5)]" : "bg-gray-800"}`}>
                      <span className={`w-4 h-4 rounded-full bg-white block transition-transform ${openToOpps ? "translate-x-6" : "translate-x-0"}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-5">
                    <div>
                      <strong className="block text-sm text-white font-display">Email Notifications</strong>
                      <span className="text-xs text-gray-400">Receive alerts when registrars approve or sign new credentials.</span>
                    </div>
                    <button onClick={() => setEmailNotifs(!emailNotifs)} className={`w-12 h-6 rounded-full transition-colors relative p-1 cursor-pointer ${emailNotifs ? "bg-purple-600 shadow-[0_0_10px_rgba(124,58,253,0.5)]" : "bg-gray-800"}`}>
                      <span className={`w-4 h-4 rounded-full bg-white block transition-transform ${emailNotifs ? "translate-x-6" : "translate-x-0"}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-5 flex-wrap gap-3">
                    <div>
                      <strong className="block text-sm text-white font-display">Theme Preference</strong>
                      <span className="text-xs text-gray-400">Select interface appearance scheme.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => { setTheme("v2"); setThemeSetting("v2"); }}
                        className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-semibold cursor-pointer transition-all ${
                          themeSetting === "v2" ? "bg-purple-600 border-purple-400 text-white shadow-[0_0_12px_rgba(124,58,253,0.5)]" : "bg-[#05050a] border-white/10 text-gray-400 hover:text-white"
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full bg-[#7c3aed]"></span> Purple
                      </button>
                      <button
                        type="button"
                        onClick={() => { setTheme("v1"); setThemeSetting("v1"); }}
                        className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-semibold cursor-pointer transition-all ${
                          themeSetting === "v1" ? "bg-[#00d4ff]/20 border-[#00d4ff] text-white shadow-[0_0_12px_rgba(0,212,255,0.4)]" : "bg-[#05050a] border-white/10 text-gray-400 hover:text-white"
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full bg-[#00d4ff]"></span> Cyan/Navy
                      </button>
                      <button
                        type="button"
                        onClick={() => { setTheme("light"); setThemeSetting("light"); }}
                        className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-semibold cursor-pointer transition-all ${
                          themeSetting === "light" ? "bg-white text-black border-white shadow-[0_0_12px_rgba(255,255,255,0.4)] font-bold" : "bg-[#05050a] border-white/10 text-gray-400 hover:text-white"
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full bg-white border border-gray-400"></span> Light
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Settings Accordion */}
              <div className="bg-[#0d0d16] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                <button
                  onClick={() => setAdvancedSettingsOpen(!advSettingsOpen)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div>
                    <strong className="block text-sm text-white font-display">Advanced Identity Settings</strong>
                    <span className="text-xs text-gray-400">Solana wallet delegation, DID export, account deletion.</span>
                  </div>
                  {advSettingsOpen ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
                </button>

                {advSettingsOpen && (
                  <div className="p-6 border-t border-white/10 bg-[#05050a]/50 space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                      <div>
                        <div className="text-xs font-bold text-white">Export W3C Verifiable DID Document</div>
                        <div className="text-[10px] font-mono text-gray-400">Download JSON-LD identity anchor keys</div>
                      </div>
                      <button onClick={() => alert("Downloading DID Document")} className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white cursor-pointer">Export JSON</button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                      <div>
                        <div className="text-xs font-bold text-red-400">Revoke Identity &amp; Erase Vault</div>
                        <div className="text-[10px] text-red-300/80">Disassociates your candidate profile desk permanently</div>
                      </div>
                      <button onClick={() => { if(confirm("Are you sure? This cannot be undone.")) handleLogout(); }} className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-xs font-bold text-white cursor-pointer shadow-md">Erase Account</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════
             VIEW 8: HELP & SUPPORT
             ════════════════════════════════════════════════════════ */}
          {activeTab === "help" && (
            <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
              <div className="border-b border-white/10 pb-5">
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">Help &amp; Protocol Support</h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Got questions about on-chain verification or registrar signatures? We are here to help.</p>
              </div>

              {/* FAQ Section */}
              <div className="space-y-4">
                <h3 className="font-bold font-display text-base text-white border-b border-white/10 pb-3">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  {faqs.map(f => (
                    <div key={f.id} className="bg-[#0d0d16] border border-white/10 rounded-2xl overflow-hidden transition-all">
                      <button
                        onClick={() => setOpenFaqId(openFaqId === f.id ? null : f.id)}
                        className="w-full p-5 text-left font-bold text-xs sm:text-sm text-gray-200 hover:text-white flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <span>{f.q}</span>
                        {openFaqId === f.id ? <ChevronDown className="w-4 h-4 text-purple-400 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />}
                      </button>
                      {openFaqId === f.id && (
                        <div className="px-5 pb-5 pt-1 text-xs text-gray-400 leading-relaxed border-t border-white/5 bg-[#05050a]/30 animate-fade-in">
                          {f.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact / Ticket Form */}
              <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div>
                  <h3 className="font-bold font-display text-base text-white">Contact Protocol Maintainers</h3>
                  <p className="text-xs text-gray-400 mt-1">Need your institution whitelisted or having credential sync issues? Open a priority support ticket.</p>
                </div>

                {ticketConfirm ? (
                  <div className="p-4 rounded-2xl bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-mono">
                    {ticketConfirm}
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setTicketConfirm("Support ticket #CC-8819 created. Maintainers will reply via registered candidate email within 24 hours."); }} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-300">Subject</label>
                        <input required type="text" placeholder="Brief summary" value={ticketSubject} onChange={e => setTicketSubject(e.target.value)} className="w-full bg-[#05050a] border border-white/15 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-purple-500" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-300">Category</label>
                        <select value={ticketCategory} onChange={e => setTicketCategory(e.target.value)} className="w-full bg-[#05050a] border border-white/15 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-purple-500">
                          <option>Account &amp; Profile</option>
                          <option>Credential Issuance Delay</option>
                          <option>Institution Onboarding</option>
                          <option>Solana Verification Error</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-300">Message</label>
                      <textarea required rows={4} placeholder="How can we help?" value={ticketMsg} onChange={e => setTicketMsg(e.target.value)} className="w-full bg-[#05050a] border border-white/15 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-purple-500" />
                    </div>
                    <button type="submit" className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer shadow-[0_0_20px_rgba(124,58,253,0.3)] transition-all flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      <span>Submit Priority Ticket</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ════════════════════════════════════════════════════════
         ONBOARDING WIZARD MODAL (First Time Candidates)
         ════════════════════════════════════════════════════════ */}
      {onboardingOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#0d0d16] border border-purple-500/30 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-[0_0_50px_rgba(124,58,253,0.25)] space-y-6 animate-scale-up">
            <button onClick={() => { setOnboardingOpen(false); localStorage.setItem("credchain_onboarded", "true"); }} className="absolute top-6 right-6 text-xs font-semibold text-gray-500 hover:text-white cursor-pointer">
              Skip
            </button>

            {/* Wizard Progress Dots */}
            <div className="flex gap-1.5 justify-center">
              {[1, 2, 3].map(d => (
                <span key={d} className={`h-1.5 rounded-full transition-all duration-300 ${onboardingStep >= d ? "w-6 bg-purple-500 shadow-[0_0_8px_#a855f7]" : "w-3 bg-white/15"}`} />
              ))}
            </div>

            {onboardingStep === 1 && (
              <div className="space-y-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center mx-auto border border-purple-500/30"><UserCircle className="w-8 h-8" /></div>
                <h3 className="text-xl font-bold font-display text-white">Welcome to CredChain 👋</h3>
                <p className="text-xs text-gray-400 leading-relaxed">Let's set up your verifiable student identity desk in 60 seconds.</p>
                <div className="space-y-3 text-left pt-2">
                  <input type="text" placeholder="e.g. Software Engineering student" className="w-full bg-[#05050a] border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500" />
                  <input type="text" placeholder="e.g. Owerri, Nigeria" className="w-full bg-[#05050a] border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500" />
                </div>
              </div>
            )}

            {onboardingStep === 2 && (
              <div className="space-y-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/15 text-teal-400 flex items-center justify-center mx-auto border border-teal-500/30"><Trophy className="w-8 h-8" /></div>
                <h3 className="text-xl font-bold font-display text-white">Your Skills Vault</h3>
                <p className="text-xs text-gray-400">Add core engineering skills. Registrars and bootcamps will endorse them on-chain.</p>
                <input type="text" placeholder="Type a skill and press Enter" className="w-full bg-[#05050a] border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500" />
                <div className="flex flex-wrap gap-1.5 justify-center pt-1">
                  {portfolioSkills.map(s => <span key={s} className="px-2.5 py-1 rounded-md bg-purple-500/15 text-purple-300 text-xs font-mono border border-purple-500/25">{s}</span>)}
                </div>
              </div>
            )}

            {onboardingStep === 3 && (
              <div className="space-y-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center mx-auto border border-purple-500/30"><LinkIcon className="w-8 h-8" /></div>
                <h3 className="text-xl font-bold font-display text-white">Social Anchors</h3>
                <p className="text-xs text-gray-400">Attach GitHub or LinkedIn profiles.</p>
                <input type="text" placeholder="e.g. github.com/yourname" className="w-full bg-[#05050a] border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500" />
                <textarea rows={2} placeholder="e.g. Seeking Web3 smart contract engineering internship" className="w-full bg-[#05050a] border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500" />
              </div>
            )}

            <div className="pt-4 border-t border-white/10 flex gap-3">
              {onboardingStep > 1 && (
                <button onClick={() => setOnboardingStep(onboardingStep - 1)} className="px-4 py-2.5 rounded-xl border border-white/15 hover:border-white text-xs font-semibold cursor-pointer text-gray-300">Back</button>
              )}
              <button
                onClick={() => {
                  if (onboardingStep < 3) setOnboardingStep(onboardingStep + 1);
                  else { setOnboardingOpen(false); localStorage.setItem("credchain_onboarded", "true"); }
                }}
                className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer shadow-[0_0_20px_rgba(124,58,253,0.4)] transition-all"
              >
                {onboardingStep < 3 ? "Continue" : "Launch My Vault"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
