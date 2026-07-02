import React, { useState } from "react";
import { Link } from "react-router-dom";
import { X, CheckCircle2 } from "lucide-react";
import AuthScreen from "../components/AuthScreen";
import { StepHeader, StepNav, Field, SelectField } from "./SignupVerifier";

export default function SignupCandidate() {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  // Step 1
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Step 2
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [bio, setBio] = useState("");

  // Step 3
  const [institution, setInstitution] = useState("");
  const [studentId, setStudentId] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");

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

  const handleRemoveSkill = (s: string) => setSkills(skills.filter((x) => x !== s));

  const handleNextStep = () => {
    if (step === 1 && (!fullName || !email || !password)) {
      alert("Please fill in Full Name, Email, and Password.");
      return;
    }
    if (step < totalSteps) setStep(step + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(
      "cc_user",
      JSON.stringify({
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
      })
    );
    localStorage.setItem("credchain_role", "candidate");
    setSubmitted(true);
  };

  const stepTitle = step === 1 ? "Basic info" : step === 2 ? "Personal details" : "Academic & skills";

  if (submitted) {
    return (
      <AuthScreen role="candidate" currentStep={step} totalSteps={totalSteps}>
        <div className="py-12 text-center space-y-6 my-auto">
          <div className="w-14 h-14 rounded-md bg-role-candidate-soft border border-border-main text-role-candidate flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" strokeWidth={1.75} />
          </div>
          <div className="space-y-3">
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-txt-primary">
              Welcome to CredChain.
            </h1>
            <p className="text-txt-secondary text-sm max-w-md mx-auto">
              Your candidate vault is live. We've sent a confirmation to{" "}
              <span className="text-txt-primary font-mono">{email}</span>.
            </p>
          </div>
          <div className="pt-4 flex justify-center gap-3">
            <Link
              to="/"
              className="px-5 py-2.5 rounded-md border border-border-main hover:border-border-strong text-txt-primary font-semibold text-sm transition-colors"
            >
              Return Home
            </Link>
            <Link
              to="/dashboard"
              className="px-5 py-2.5 rounded-md bg-brand-purple hover:bg-brand-purple-dim text-white font-semibold text-sm transition-colors"
            >
              Enter my vault
            </Link>
          </div>
        </div>
      </AuthScreen>
    );
  }

  return (
    <AuthScreen role="candidate" currentStep={step} totalSteps={totalSteps}>
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
        <div>
          <StepHeader step={step} totalSteps={totalSteps} stepTitle={stepTitle} />

          <div className="mb-8 space-y-2">
            <h1 className="font-display text-2xl lg:text-3xl font-bold tracking-tight text-txt-primary">
              Create candidate account.
            </h1>
            <p className="text-sm text-txt-secondary font-sans">
              Already a candidate?{" "}
              <Link
                to="/login?role=candidate"
                className="text-brand-purple font-semibold hover:text-txt-primary"
              >
                Sign in
              </Link>
            </p>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <Field label="FULL NAME *" value={fullName} onChange={setFullName} placeholder="Emeka Obi" required />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="PHONE" value={phone} onChange={setPhone} placeholder="+234 802 …" />
                <Field label="EMAIL *" type="email" value={email} onChange={setEmail} placeholder="emeka@example.com" required />
              </div>
              <Field label="PASSWORD *" type="password" value={password} onChange={setPassword} placeholder="••••••••" required />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="DATE OF BIRTH" type="date" value={dob} onChange={setDob} />
                <SelectField
                  label="GENDER"
                  value={gender}
                  onChange={setGender}
                  options={[
                    { value: "", label: "Prefer not to say" },
                    { value: "female", label: "Female" },
                    { value: "male", label: "Male" },
                    { value: "non-binary", label: "Non-binary" },
                  ]}
                />
              </div>
              <Field label="NATIONALITY" value={nationality} onChange={setNationality} placeholder="Nigerian" />
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-semibold text-txt-muted uppercase tracking-wider block">
                  SHORT BIO
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Frontend-leaning Software Engineering student passionate about verifiable web apps…"
                  className="w-full bg-bg-sunken border border-border-main rounded-md px-4 py-3 text-sm text-txt-primary placeholder:text-txt-muted focus:outline-none focus:border-brand-purple transition-colors font-sans"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Field label="INSTITUTION" value={institution} onChange={setInstitution} placeholder="Federal University of Technology, Owerri" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="STUDENT ID / MATRIC" value={studentId} onChange={setStudentId} placeholder="2021/104256" />
                <Field label="GRADUATION YEAR" value={graduationYear} onChange={setGraduationYear} placeholder="2026" />
              </div>
              <Field label="FIELD OF STUDY" value={fieldOfStudy} onChange={setFieldOfStudy} placeholder="B.Eng Computer Engineering" />
              <Field label="LINKEDIN URL" type="url" value={linkedInUrl} onChange={setLinkedInUrl} placeholder="https://linkedin.com/in/yourname" />

              <div className="space-y-2">
                <label className="text-[11px] font-mono font-semibold text-txt-muted uppercase tracking-wider block">
                  SKILLS
                </label>
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleAddSkill}
                  placeholder="Type a skill and press Enter"
                  className="w-full bg-bg-sunken border border-border-main rounded-md px-4 py-3 text-sm text-txt-primary placeholder:text-txt-muted focus:outline-none focus:border-brand-purple transition-colors font-mono"
                />
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {skills.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-sm border border-border-main bg-bg-surface text-role-candidate text-xs font-mono"
                    >
                      {s}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(s)}
                        className="text-txt-muted hover:text-hash-red"
                        aria-label={`Remove ${s}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <StepNav
          step={step}
          totalSteps={totalSteps}
          onBack={() => setStep(step - 1)}
          onNext={handleNextStep}
          submitLabel="Create my vault"
        />
      </form>
    </AuthScreen>
  );
}
