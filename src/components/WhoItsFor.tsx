import { useNavigate } from "react-router-dom";
import { User, GraduationCap, Briefcase, Check } from "lucide-react";
import FadeIn from "./FadeIn";

export default function WhoItsFor() {
  const navigate = useNavigate();

  const cards = [
    {
      id: "candidate",
      topBorder: "border-t-[3px] border-t-brand-purple",
      tag: "CANDIDATE PORTAL",
      tagStyle: "bg-[#7C3AED]/15 text-brand-purple",
      icon: <User className="w-5 h-5 text-txt-muted" />,
      title: "Students & Job Seekers",
      body: "Request verified credentials from your institution. Build AI-powered resumes. Share a verified public profile with employers.",
      colorClass: "text-brand-purple",
      btnBorder: "border-brand-purple hover:bg-[#7C3AED]/5",
      btnText: "Create Candidate Account",
      route: "/signup/candidate",
      capabilities: [
        "Request & store academic credentials",
        "Build verifiable interactive resumes",
        "Share tamper-proof public profile links",
        "No-fee blockchain anchor verification"
      ]
    },
    {
      id: "issuer",
      topBorder: "border-t-[3px] border-t-accent-green",
      tag: "ISSUER CENTRAL",
      tagStyle: "bg-[#10B981]/15 text-accent-green",
      icon: <GraduationCap className="w-5 h-5 text-txt-muted" />,
      title: "Universities & Academies",
      body: "Become a trusted credential anchor. Approve student requests. Issue electronic qualifications backed by blockchain proof.",
      colorClass: "text-accent-green",
      btnBorder: "border-accent-green hover:bg-[#10B981]/5",
      btnText: "Register as Issuer",
      route: "/signup/issuer",
      capabilities: [
        "Establish digital signature authority",
        "Batch upload student transcripts",
        "Approve and mint secure records",
        "Direct candidate credential sync"
      ]
    },
    {
      id: "verifier",
      topBorder: "border-t-[3px] border-t-accent-amber",
      tag: "VERIFIER INTERFACE",
      tagStyle: "bg-[#F59E0B]/15 text-accent-amber",
      icon: <Briefcase className="w-5 h-5 text-txt-muted" />,
      title: "Employers & Recruiters",
      body: "Verify any credential instantly. No back-and-forth. No waiting. One query returns a cryptographic confirmation from the Solana ledger.",
      colorClass: "text-accent-amber",
      btnBorder: "border-accent-amber hover:bg-[#F59E0B]/5",
      btnText: "Register as Verifier",
      route: "/signup/verifier",
      capabilities: [
        "Instant QR-based verification scan",
        "Bulk candidate pool CSV checking",
        "Full Solana ledger state lookup",
        "Verify without system registration"
      ]
    }
  ];

  return (
    <section id="who-its-for" className="py-24 md:py-[120px] bg-bg-base overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <FadeIn>
            {/* Section Eyebrow (Centered but keeps the left-border rule style as required) */}
            <div className="inline-flex items-center">
              <div className="border-l-2 border-brand-purple pl-3 font-mono text-[11px] tracking-[0.1em] text-txt-muted uppercase mb-4 text-left">
                TARGET ECOSYSTEM
              </div>
            </div>
            
            <h2 className="font-display text-white scale-2xl font-bold">
              Unified Ecosystem. Specialized Access.
            </h2>
          </FadeIn>
        </div>

        {/* Roles 3-Column Display - aligned stretch for equal height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {cards.map((card, idx) => (
            <div key={card.id} className="flex h-full">
              <FadeIn delay={100 + idx * 50}>
                <div className={`bg-bg-surface border border-border-main ${card.topBorder} rounded-lg p-8 flex flex-col justify-between h-full shadow-[0_1px_3px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:translate-y-[-2px] transition-all`}>
                  
                  {/* Tag & Icon Row */}
                  <div className="flex justify-between items-center mb-6">
                    <span className={`font-mono text-[10px] font-semibold tracking-wider rounded-sm px-2.5 py-1 ${card.tagStyle}`}>
                      {card.tag}
                    </span>
                    {card.icon}
                  </div>

                  {/* Title & Body */}
                  <div className="text-left flex-grow">
                    <h3 className="font-display text-white text-[20px] font-bold mb-3">
                      {card.title}
                    </h3>
                    <p className="font-sans text-txt-secondary scale-sm leading-relaxed mb-6">
                      {card.body}
                    </p>

                    {/* Checkmark capability points */}
                    <ul className="space-y-3 pt-6 border-t border-border-subtle mb-8">
                      {card.capabilities.map((cap, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-3 text-[13px] text-txt-secondary">
                          <Check className={`w-4 h-4 ${card.colorClass} flex-shrink-0 mt-0.5`} />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-6 border-t border-border-subtle w-full">
                    <button
                      onClick={() => navigate(card.route)}
                      className={`w-full py-3 px-4 bg-transparent border ${card.btnBorder} text-txt-primary rounded-md font-semibold text-sm transition-colors cursor-pointer text-center`}
                    >
                      {card.btnText}
                    </button>
                  </div>

                </div>
              </FadeIn>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
