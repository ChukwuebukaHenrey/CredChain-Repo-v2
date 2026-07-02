import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthScreen from "../components/AuthScreen";
import { StepHeader, StepNav, Field, SelectField, SuccessPanel } from "./SignupVerifier";

export default function SignupIssuer() {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  // Step 1
  const [instName, setInstName] = useState("");
  const [website, setWebsite] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [instType, setInstType] = useState("university");

  // Step 2
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactTitle, setContactTitle] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  // Step 3
  const [accreditationNum, setAccreditationNum] = useState("");
  const [supportingNote, setSupportingNote] = useState("");

  const handleNextStep = () => {
    if (step === 1 && (!instName || !website || !emailDomain)) {
      alert("Please fill in Institution Name, Website, and Email Domain.");
      return;
    }
    if (step === 2 && (!country || !contactName || !contactEmail)) {
      alert("Please fill in Country, Contact Name, and Contact Email.");
      return;
    }
    if (step < totalSteps) setStep(step + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(
      "cc_user",
      JSON.stringify({
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
      })
    );
    localStorage.setItem("credchain_role", "issuer");
    setSubmitted(true);
  };

  const stepTitle =
    step === 1 ? "Institution info" : step === 2 ? "Location & contact" : "Accreditation proof";

  if (submitted) {
    return (
      <AuthScreen role="issuer" currentStep={step} totalSteps={totalSteps}>
        <SuccessPanel
          email={contactEmail}
          headline="Anchor submitted. Under review."
          body={`Governance validators are verifying ${instName} against official registry public keys.`}
          ctaTo="/issuer"
          ctaLabel="Preview Issuer Desk"
        />
      </AuthScreen>
    );
  }

  return (
    <AuthScreen role="issuer" currentStep={step} totalSteps={totalSteps}>
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
        <div>
          <StepHeader step={step} totalSteps={totalSteps} stepTitle={stepTitle} />

          <div className="mb-8 space-y-2">
            <h1 className="font-display text-2xl lg:text-3xl font-bold tracking-tight text-txt-primary">
              Register institution.
            </h1>
            <p className="text-sm text-txt-secondary font-sans">
              Already onboarded?{" "}
              <Link to="/login?role=issuer" className="text-brand-purple font-semibold hover:text-txt-primary">
                Sign in
              </Link>
            </p>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <Field label="INSTITUTION NAME *" value={instName} onChange={setInstName} placeholder="Federal University of Technology, Owerri" required />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="WEBSITE *" type="url" value={website} onChange={setWebsite} placeholder="https://futo.edu.ng" required />
                <Field label="EMAIL DOMAIN *" value={emailDomain} onChange={setEmailDomain} placeholder="futo.edu.ng" required />
              </div>
              <SelectField
                label="INSTITUTION TYPE"
                value={instType}
                onChange={setInstType}
                options={[
                  { value: "university", label: "University" },
                  { value: "polytechnic", label: "Polytechnic / Technical College" },
                  { value: "bootcamp", label: "Bootcamp / Certifying Body" },
                  { value: "corporate", label: "Corporate Academy" },
                ]}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="COUNTRY *" value={country} onChange={setCountry} placeholder="Nigeria" required />
                <Field label="STATE / REGION" value={state} onChange={setState} placeholder="Imo" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="REGISTRAR NAME *" value={contactName} onChange={setContactName} placeholder="Prof. Adaeze Okeke" required />
                <Field label="CONTACT TITLE" value={contactTitle} onChange={setContactTitle} placeholder="Vice Chancellor" />
              </div>
              <Field
                label="CONTACT EMAIL *"
                type="email"
                value={contactEmail}
                onChange={setContactEmail}
                placeholder="registrar@futo.edu.ng"
                required
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Field
                label="ACCREDITATION NUMBER"
                value={accreditationNum}
                onChange={setAccreditationNum}
                placeholder="NUC/A/123456"
              />
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-semibold text-txt-muted uppercase tracking-wider block">
                  SUPPORTING NOTE
                </label>
                <textarea
                  rows={4}
                  value={supportingNote}
                  onChange={(e) => setSupportingNote(e.target.value)}
                  placeholder="Briefly describe the institution and any documentation you can provide."
                  className="w-full bg-bg-sunken border border-border-main rounded-md px-4 py-3 text-sm text-txt-primary placeholder:text-txt-muted focus:outline-none focus:border-brand-purple transition-colors font-sans"
                />
              </div>
              <div className="bg-bg-sunken border border-border-main rounded-md p-3 text-[11px] font-mono text-txt-secondary">
                {"// Governance validators review every issuer within 3 business days"}
              </div>
            </div>
          )}
        </div>

        <StepNav
          step={step}
          totalSteps={totalSteps}
          onBack={() => setStep(step - 1)}
          onNext={handleNextStep}
          submitLabel="Submit institution anchor"
        />
      </form>
    </AuthScreen>
  );
}
