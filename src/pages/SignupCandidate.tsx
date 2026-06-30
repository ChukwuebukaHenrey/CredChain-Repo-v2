import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, CheckCircle2, Plus, X, LogIn } from "lucide-react";
import Logo from "../components/Logo";
import AuthLeftPanel from "../components/AuthLeftPanel";

export default function SignupCandidate() {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  // Step 1 Form Fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Step 2 Form Fields
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [bio, setBio] = useState("");

  // Step 3 Form Fields
  const [institution, setInstitution] = useState("");
  const [studentId, setStudentId] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");

  // Skills tag input
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript", "Solidity"]);

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!fullName || !email || !password) {
        alert("Please fill in Full Name, Email, and Password.");
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
      phone,
      email,
      dob,
      gender,
      nationality,
      bio,
      institution,
      studentId,
      fieldOfStudy,
      graduationYear,
      skills,
      linkedInUrl,
      role: "candidate",
    };
    localStorage.setItem("cc_user", JSON.stringify(userData));
    localStorage.setItem("credchain_role", "candidate");
    setSubmitted(true);
  };

  const stepTitle = step === 1 ? "Basic info" : step === 2 ? "Personal details" : "Academic & skills";

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
          <AuthLeftPanel role="candidate" currentStep={step} totalSteps={totalSteps} />

          <div className="w-[55%] bg-[#10091d] p-10 lg:p-14 xl:p-16 flex flex-col justify-between text-left relative overflow-y-auto h-full">
            {submitted ? (
              <div className="py-20 text-center space-y-8 animate-fade-in my-auto font-sans">
                <div className="w-20 h-20 bg-purple-500/15 border border-purple-500/40 rounded-full flex items-center justify-center mx-auto text-purple-400 shadow-[0_0_40px_rgba(168,85,247,0.4)]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-3">
                  <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">
                    Account created. Welcome to CredChain.
                  </h1>
                  <p className="text-gray-400 text-sm sm:text-base">
                    Your candidate identity structure for <span className="text-cyan-400 font-mono">{fullName || email}</span> is ready.
                  </p>
                </div>
                <div className="pt-6 flex justify-center gap-4">
                  <Link
                    to="/dashboard"
                    className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm sm:text-base transition-all shadow-lg cursor-pointer"
                  >
                    Enter Candidate Vault →
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
                <div>
                  {/* Step Progress Header */}
                  <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                    <span className="text-xs font-mono font-semibold text-gray-400">
                      Step {step} of {totalSteps} — <span className="text-cyan-400">{stepTitle}</span>
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
                      Create account
                    </h1>
                    <p className="text-sm text-gray-400 font-sans">
                      Already have one?{" "}
                      <Link to="/login?role=candidate" className="text-purple-400 font-semibold hover:underline">
                        Sign in
                      </Link>
                    </p>
                  </div>

                  {/* STEP 1 FIELDS */}
                  {step === 1 && (
                    <div className="space-y-4 animate-fade-in font-mono text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-semibold text-gray-400 uppercase">Full name *</label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Emeka Obi"
                            className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-semibold text-gray-400 uppercase">Phone number</label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+234 ···"
                            className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-gray-400 uppercase block">Email address *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-gray-400 uppercase block">Password *</label>
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Min. 8 characters"
                          className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 2 FIELDS */}
                  {step === 2 && (
                    <div className="space-y-4 animate-fade-in font-mono text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-semibold text-gray-400 uppercase">Date of Birth</label>
                          <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-semibold text-gray-400 uppercase">Gender</label>
                          <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="non-binary">Non-binary</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-gray-400 uppercase block">Nationality</label>
                        <input
                          type="text"
                          value={nationality}
                          onChange={(e) => setNationality(e.target.value)}
                          placeholder="e.g. Nigerian, British, Canadian"
                          className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div className="space-y-1.5 font-sans">
                        <label className="text-[10px] font-mono font-semibold text-gray-400 uppercase block">Professional Bio</label>
                        <textarea
                          rows={3}
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          placeholder="Brief summary of your academic or engineering background..."
                          className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 resize-none font-sans"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 3 FIELDS */}
                  {step === 3 && (
                    <div className="space-y-4 animate-fade-in font-mono text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-semibold text-gray-400 uppercase">Institution (Opt)</label>
                          <input
                            type="text"
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            placeholder="e.g. FUTO, MIT, Oxford"
                            className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-semibold text-gray-400 uppercase">Student ID (Opt)</label>
                          <input
                            type="text"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            placeholder="e.g. 2021104523"
                            className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-semibold text-gray-400 uppercase">Field of Study</label>
                          <input
                            type="text"
                            value={fieldOfStudy}
                            onChange={(e) => setFieldOfStudy(e.target.value)}
                            placeholder="Computer Science"
                            className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-semibold text-gray-400 uppercase">Graduation Year</label>
                          <input
                            type="text"
                            value={graduationYear}
                            onChange={(e) => setGraduationYear(e.target.value)}
                            placeholder="2025"
                            className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>

                      {/* Skills Tag Input */}
                      <div className="space-y-1.5 font-sans">
                        <label className="text-[10px] font-mono font-semibold text-gray-400 uppercase block">Skills (Press Enter to add)</label>
                        <div className="w-full bg-[#0a0515] border border-white/10 rounded-xl p-2 focus-within:border-purple-500 flex flex-wrap gap-1.5 min-h-[44px]">
                          {skills.map((s, i) => (
                            <span key={i} className="inline-flex items-center gap-1 bg-purple-500/20 text-purple-300 text-[11px] px-2 py-0.5 rounded-md font-mono border border-purple-500/30">
                              <span>{s}</span>
                              <button type="button" onClick={() => handleRemoveSkill(s)} className="hover:text-white cursor-pointer"><X className="w-3 h-3" /></button>
                            </span>
                          ))}
                          <input
                            type="text"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyDown={handleAddSkill}
                            placeholder={skills.length === 0 ? "Type skill & enter..." : ""}
                            className="bg-transparent border-none outline-none text-xs text-white placeholder-gray-600 flex-1 min-w-[120px] px-1 font-mono"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-gray-400 uppercase block">LinkedIn URL (Opt)</label>
                        <input
                          type="url"
                          value={linkedInUrl}
                          onChange={(e) => setLinkedInUrl(e.target.value)}
                          placeholder="https://linkedin.com/in/username"
                          className="w-full bg-[#0a0515] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
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
                      className="flex-[2] py-3 px-4 bg-purple-600 hover:bg-purple-500 rounded-xl text-xs font-bold text-white transition-all shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Continue</span>
                      <span>→</span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex-[2] py-3 px-4 bg-purple-600 hover:bg-purple-500 rounded-xl text-xs font-bold text-white transition-all shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Complete Registration</span>
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
        <div className="block min-[900px]:hidden w-full max-w-md bg-[#111118] border border-white/5 rounded-2xl p-6 sm:p-10 shadow-2xl border-t-[4px] border-t-purple-600">
          {submitted ? (
            <div className="py-12 text-center space-y-6 animate-fade-in font-sans">
              <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/30 rounded-full flex items-center justify-center mx-auto text-purple-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  Account created.
                </h1>
                <p className="text-gray-400 text-sm">
                  Your candidate vault is ready.
                </p>
              </div>
              <div className="pt-4 flex justify-center gap-4">
                <Link
                  to="/dashboard"
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all shadow-lg"
                >
                  Enter Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="border-b border-white/5 pb-4 space-y-1">
                <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase">
                  <User className="w-4 h-4" />
                  <span>Candidate Identity Anchor</span>
                </div>
                <h1 className="font-display text-2xl font-bold text-white">Candidate Sign Up</h1>
                <p className="text-gray-400 text-xs font-sans">
                  Create your decentralized vault to store academic proof & resumes.
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="space-y-1">
                  <label className="text-gray-400">FULL NAME *</label>
                  <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Emeka Obi" className="w-full bg-[#08080f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600" />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-400">EMAIL ADDRESS *</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="w-full bg-[#08080f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600" />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-400">PASSWORD *</label>
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" className="w-full bg-[#08080f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600" />
                </div>
              </div>

              <button type="submit" className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all shadow-lg font-sans">
                Create Vault Account
              </button>

              <div className="pt-2 text-center text-xs text-gray-400 font-sans">
                Already have an account? <Link to="/login?role=candidate" className="text-purple-400 font-semibold hover:underline">Sign in</Link>
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
