import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Building2, Clock, CheckCircle2 } from "lucide-react";
import Logo from "../components/Logo";
import AuthLeftPanel from "../components/AuthLeftPanel";

export default function SignupVerifier() {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 2;

  // Step 1 Form fields
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  // Step 2 Form fields
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [reason, setReason] = useState("hiring");

  const handleNextStep = () => {
    if (step === 1) {
      if (!fullName || !companyName || !workEmail) {
        alert("Please fill in Full Name, Company Name, and Work Email.");
        return;
      }
    }
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      fullName,
      companyName,
      workEmail,
      jobTitle,
      companyWebsite,
      reason,
      role: "verifier",
    };
    localStorage.setItem("cc_user", JSON.stringify(userData));
    localStorage.setItem("credchain_role", "verifier");
    setSubmitted(true);
  };

  const stepTitle = step === 1 ? "Professional identity" : "Organization & compliance";

  return (
    <div className="min-h-screen bg-[#05050a] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative select-none">
      {/* Mobile Top Header (< 900px) */}
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
          <AuthLeftPanel role="verifier" currentStep={step} totalSteps={totalSteps} />

          <div className="w-[55%] bg-[#10091d] p-10 lg:p-14 xl:p-16 flex flex-col justify-between text-left relative overflow-y-auto h-full">
            {submitted ? (
              <div className="py-20 text-center space-y-8 animate-fade-in my-auto font-sans">
                <div className="w-20 h-20 bg-purple-500/15 border border-purple-500/40 rounded-full flex items-center justify-center mx-auto text-purple-400 shadow-[0_0_40px_rgba(168,85,247,0.4)]">
                  <Clock className="w-10 h-10 animate-pulse" />
                </div>
                <div className="space-y-3">
                  <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">
                    Organization anchor submitted for audit.
                  </h1>
                  <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
                    We verify all employer query nodes to maintain strict candidate privacy compliance. We will notify <span className="text-cyan-400 font-mono">{workEmail}</span> once approved.
                  </p>
                </div>
                <div className="pt-6 flex justify-center gap-4">
                  <Link
                    to="/"
                    className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base transition-all"
                  >
                    Return Home
                  </Link>
                  <Link
                    to="/verifier"
                    className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm sm:text-base transition-all shadow-lg"
                  >
                    Preview Employer Desk →
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
                <div>
                  {/* Step Progress Header */}
                  <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                    <span className="text-xs font-mono font-semibold text-gray-400">
                      Step {step} of {totalSteps} — <span className="text-purple-400">{stepTitle}</span>
                    </span>
                    <div className="w-40 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 transition-all duration-300 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.6)]"
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Form Header */}
                  <div className="mb-8 space-y-1.5">
                    <h1 className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-white">
                      Register Employer Desk
                    </h1>
                    <p className="text-sm text-gray-400 font-sans">
                      Already verified?{" "}
                      <Link to="/login?role=verifier" className="text-purple-400 font-semibold hover:underline">
                        Sign in
                      </Link>
                    </p>
                  </div>

                  {/* STEP 1 FIELDS */}
                  {step === 1 && (
                    <div className="space-y-5 animate-fade-in font-mono text-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-gray-400 uppercase">Full Name *</label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Sarah Jenkins"
                            className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-gray-400 uppercase">Job Title *</label>
                          <input
                            type="text"
                            required
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            placeholder="Head of Talent Acquisition"
                            className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase block">Company / Organization Name *</label>
                        <input
                          type="text"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Acme Global Technologies Inc."
                          className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase block">Work Email Address *</label>
                        <input
                          type="email"
                          required
                          value={workEmail}
                          onChange={(e) => setWorkEmail(e.target.value)}
                          placeholder="s.jenkins@acmeglobal.com"
                          className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 2 FIELDS */}
                  {step === 2 && (
                    <div className="space-y-5 animate-fade-in font-mono text-sm">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase block">Company Website URL *</label>
                        <input
                          type="url"
                          required
                          value={companyWebsite}
                          onChange={(e) => setCompanyWebsite(e.target.value)}
                          placeholder="https://acmeglobal.com"
                          className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div className="space-y-2 font-sans">
                        <label className="text-xs font-mono font-semibold text-gray-400 uppercase block">Primary Reason for Verifying Credentials</label>
                        <select
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
                        >
                          <option value="hiring">New Applicant Hiring Audit</option>
                          <option value="background_check">Standard Employee Background Audit</option>
                          <option value="academic_transfer">Academic Credit Transfer Verification</option>
                          <option value="compliance_audit">Regulatory Security Compliance Audit</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Navigation Buttons */}
                <div className="flex gap-4 mt-10 pt-6 border-t border-white/5 font-sans">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex-1 py-4 px-6 bg-transparent border border-white/10 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:border-white/25 transition-all cursor-pointer"
                    >
                      Back
                    </button>
                  ) : (
                    <Link
                      to="/role"
                      className="flex-1 py-4 px-6 bg-transparent border border-white/10 rounded-xl text-sm font-semibold text-gray-400 hover:text-white hover:border-white/25 transition-all text-center flex items-center justify-center"
                    >
                      Cancel
                    </Link>
                  )}

                  {step < totalSteps ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-[2] py-4 px-6 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm font-bold text-white transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]"
                    >
                      <span>Continue</span>
                      <span>→</span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex-[2] py-4 px-6 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm font-bold text-white transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]"
                    >
                      <span>Submit Organization Anchor</span>
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>

        {/* =========================================================================
            MOBILE / SINGLE-COLUMN CARD (< 900px)
        ========================================================================= */}
        <div className="block min-[900px]:hidden w-full max-w-md bg-[#111118] border border-white/5 rounded-2xl p-6 sm:p-10 shadow-2xl border-t-[4px] border-t-cyan-500">
          {submitted ? (
            <div className="py-12 text-center space-y-6 animate-fade-in font-sans">
              <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/30 rounded-full flex items-center justify-center mx-auto text-cyan-400">
                <Clock className="w-8 h-8 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  Account under review.
                </h1>
                <p className="text-gray-400 text-sm">
                  We'll notify you once employer node confirms your organization.
                </p>
              </div>
              <div className="pt-4 flex justify-center gap-4">
                <Link to="/" className="px-6 py-3 rounded-xl bg-white/10 text-white font-semibold text-sm">
                  Return Home
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="border-b border-white/5 pb-4 space-y-1">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase">
                  <Building2 className="w-4 h-4" />
                  <span>Employer Query Anchor</span>
                </div>
                <h1 className="font-display text-2xl font-bold text-white">Verifier Sign Up</h1>
                <p className="text-gray-400 text-xs font-sans">
                  Register your company to query cryptographically verified applicant proof.
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="space-y-1">
                  <label className="text-gray-400">FULL NAME *</label>
                  <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Sarah Jenkins" className="w-full bg-[#08080f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600" />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-400">COMPANY NAME *</label>
                  <input type="text" required value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Acme Corp" className="w-full bg-[#08080f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600" />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-400">WORK EMAIL *</label>
                  <input type="email" required value={workEmail} onChange={(e) => setWorkEmail(e.target.value)} placeholder="audit@acme.com" className="w-full bg-[#08080f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600" />
                </div>
              </div>

              <button type="submit" className="w-full py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-all shadow-lg font-sans">
                Register Employer Query Node
              </button>

              <div className="pt-2 text-center text-xs text-gray-400 font-sans">
                Already verified? <Link to="/login?role=verifier" className="text-cyan-400 font-semibold hover:underline">Sign in</Link>
              </div>
            </form>
          )}
        </div>
      </main>

      {/* Mobile Footer (< 900px) */}
      <footer className="max-w-7xl w-full mx-auto pt-6 border-t border-white/5 block min-[900px]:hidden">
        <Link to="/role" className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to role selection</span>
        </Link>
      </footer>
    </div>
  );
}
