import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Landmark, Clock, CheckCircle2 } from "lucide-react";
import Logo from "../components/Logo";
import AuthLeftPanel from "../components/AuthLeftPanel";

export default function SignupIssuer() {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  // Step 1 Form fields
  const [instName, setInstName] = useState("");
  const [website, setWebsite] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [instType, setInstType] = useState("university");

  // Step 2 Form fields
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactTitle, setContactTitle] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  // Step 3 Form fields
  const [accreditationNum, setAccreditationNum] = useState("");
  const [supportingNote, setSupportingNote] = useState("");

  const handleNextStep = () => {
    if (step === 1) {
      if (!instName || !website || !emailDomain) {
        alert("Please fill in Institution Name, Website, and Email Domain.");
        return;
      }
    } else if (step === 2) {
      if (!country || !contactName || !contactEmail) {
        alert("Please fill in Country, Contact Name, and Contact Email.");
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
      instName,
      website,
      emailDomain,
      instType,
      country,
      state,
      contactName,
      contactTitle,
      contactEmail,
      accreditationNum,
      supportingNote,
      role: "issuer",
    };
    localStorage.setItem("cc_user", JSON.stringify(userData));
    localStorage.setItem("credchain_role", "issuer");
    setSubmitted(true);
  };

  const stepTitle = step === 1 ? "Institution info" : step === 2 ? "Location & contact" : "Accreditation proof";

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
          <AuthLeftPanel role="issuer" currentStep={step} totalSteps={totalSteps} />

          <div className="w-[55%] bg-[#10091d] p-10 lg:p-14 xl:p-16 flex flex-col justify-between text-left relative overflow-y-auto h-full">
            {submitted ? (
              <div className="py-20 text-center space-y-8 animate-fade-in my-auto font-sans">
                <div className="w-20 h-20 bg-emerald-500/15 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                  <Clock className="w-10 h-10 animate-pulse" />
                </div>
                <div className="space-y-3">
                  <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">
                    Anchor submitted. Under verification review.
                  </h1>
                  <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
                    Governance validators are verifying <span className="text-emerald-400 font-mono">{instName}</span> against official registry public keys. We will email <span className="text-white font-mono">{contactEmail}</span> upon ledger activation.
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
                    to="/issuer"
                    className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base transition-all shadow-lg"
                  >
                    Preview Institution Desk →
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
                <div>
                  {/* Step Progress Header */}
                  <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                    <span className="text-xs font-mono font-semibold text-gray-400">
                      Step {step} of {totalSteps} — <span className="text-emerald-400">{stepTitle}</span>
                    </span>
                    <div className="w-40 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 transition-all duration-300 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.6)]"
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Form Header */}
                  <div className="mb-8 space-y-1.5">
                    <h1 className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-white">
                      Register Institution
                    </h1>
                    <p className="text-sm text-gray-400 font-sans">
                      Already registered?{" "}
                      <Link to="/login?role=issuer" className="text-emerald-400 font-semibold hover:underline">
                        Sign in
                      </Link>
                    </p>
                  </div>

                  {/* STEP 1 FIELDS */}
                  {step === 1 && (
                    <div className="space-y-4 animate-fade-in font-mono text-xs">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-gray-400 uppercase block">Institution Name *</label>
                        <input
                          type="text"
                          required
                          value={instName}
                          onChange={(e) => setInstName(e.target.value)}
                          placeholder="Federal University of Technology Owerri"
                          className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-semibold text-gray-400 uppercase">Official Website *</label>
                          <input
                            type="url"
                            required
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            placeholder="https://futo.edu.ng"
                            className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-semibold text-gray-400 uppercase">Email Domain *</label>
                          <input
                            type="text"
                            required
                            value={emailDomain}
                            onChange={(e) => setEmailDomain(e.target.value)}
                            placeholder="futo.edu.ng"
                            className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-gray-400 uppercase block">Institution Type</label>
                        <select
                          value={instType}
                          onChange={(e) => setInstType(e.target.value)}
                          className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                        >
                          <option value="university">University / Higher Education</option>
                          <option value="college">College / Technical Institute</option>
                          <option value="bootcamp">Coding Bootcamp / Academy</option>
                          <option value="certification_body">Professional Certification Body</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* STEP 2 FIELDS */}
                  {step === 2 && (
                    <div className="space-y-4 animate-fade-in font-mono text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-semibold text-gray-400 uppercase">Country *</label>
                          <input
                            type="text"
                            required
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Nigeria"
                            className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-semibold text-gray-400 uppercase">State / Province</label>
                          <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="Imo"
                            className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-semibold text-gray-400 uppercase">Contact Name *</label>
                          <input
                            type="text"
                            required
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder="Prof. Chinedu Eze"
                            className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-semibold text-gray-400 uppercase">Contact Title</label>
                          <input
                            type="text"
                            value={contactTitle}
                            onChange={(e) => setContactTitle(e.target.value)}
                            placeholder="University Registrar"
                            className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-gray-400 uppercase block">Work Email Address *</label>
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="registrar@futo.edu.ng"
                          className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 3 FIELDS */}
                  {step === 3 && (
                    <div className="space-y-4 animate-fade-in font-mono text-xs">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-gray-400 uppercase block">Accreditation Number *</label>
                        <input
                          type="text"
                          required
                          value={accreditationNum}
                          onChange={(e) => setAccreditationNum(e.target.value)}
                          placeholder="e.g. NUC/2021/ENG/0042"
                          className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="space-y-1.5 font-sans">
                        <label className="text-[10px] font-mono font-semibold text-gray-400 uppercase block">Supporting Note (Opt)</label>
                        <textarea
                          rows={4}
                          value={supportingNote}
                          onChange={(e) => setSupportingNote(e.target.value)}
                          placeholder="Provide any additional verifiable public anchor links or ministerial charter details..."
                          className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 resize-none font-sans"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Navigation Buttons */}
                <div className="flex gap-3 mt-8 pt-4 border-t border-white/5 font-sans">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex-1 py-3 px-4 bg-transparent border border-white/10 rounded-xl text-xs font-semibold text-gray-300 hover:text-white hover:border-white/25 transition-all cursor-pointer"
                    >
                      Back
                    </button>
                  ) : (
                    <Link
                      to="/role"
                      className="flex-1 py-3 px-4 bg-transparent border border-white/10 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:border-white/25 transition-all text-center flex items-center justify-center"
                    >
                      Cancel
                    </Link>
                  )}

                  {step < totalSteps ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-[2] py-3 px-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white transition-all shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Continue</span>
                      <span>→</span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex-[2] py-3 px-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white transition-all shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Submit Anchor for Review</span>
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
        <div className="block min-[900px]:hidden w-full max-w-md bg-[#111118] border border-white/5 rounded-2xl p-6 sm:p-10 shadow-2xl border-t-[4px] border-t-emerald-500">
          {submitted ? (
            <div className="py-12 text-center space-y-6 animate-fade-in font-sans">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <Clock className="w-8 h-8 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  Account under review.
                </h1>
                <p className="text-gray-400 text-sm">
                  We'll notify you once governance node confirms your institutional key.
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
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase">
                  <Landmark className="w-4 h-4" />
                  <span>Institution Desk Anchor</span>
                </div>
                <h1 className="font-display text-2xl font-bold text-white">Issuer Sign Up</h1>
                <p className="text-gray-400 text-xs font-sans">
                  Register your institution to sign cryptographically verified academic proof.
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="space-y-1">
                  <label className="text-gray-400">INSTITUTION NAME *</label>
                  <input type="text" required value={instName} onChange={(e) => setInstName(e.target.value)} placeholder="FUTO" className="w-full bg-[#08080f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600" />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-400">OFFICIAL WEBSITE *</label>
                  <input type="url" required value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://futo.edu.ng" className="w-full bg-[#08080f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600" />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-400">CONTACT EMAIL *</label>
                  <input type="email" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="registrar@futo.edu.ng" className="w-full bg-[#08080f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600" />
                </div>
              </div>

              <button type="submit" className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg font-sans">
                Register Institutional Anchor
              </button>

              <div className="pt-2 text-center text-xs text-gray-400 font-sans">
                Already registered? <Link to="/login?role=issuer" className="text-emerald-400 font-semibold hover:underline">Sign in</Link>
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
