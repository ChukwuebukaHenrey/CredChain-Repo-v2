import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import FadeIn from "./FadeIn";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 md:py-[120px] bg-bg-base overflow-hidden">
      <div className="max-w-[760px] mx-auto px-6 text-center">
        <FadeIn>
          <h2 className="font-display font-bold text-txt-primary text-[32px] md:text-[48px] leading-tight mb-2">
            Your credentials,
          </h2>
          <h3 className="font-display font-bold text-role-candidate text-[32px] md:text-[48px] leading-tight mb-6">
            permanently verified.
          </h3>

          <p className="font-sans text-txt-secondary scale-base max-w-xl mx-auto mb-10 leading-relaxed">
            Join as a candidate, institution, or employer. The ledger is open.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => navigate("/role")}
              className="w-full sm:w-auto bg-brand-purple hover:bg-brand-purple-dim text-white rounded-md px-6 py-3 font-semibold text-sm transition-colors cursor-pointer text-center"
            >
              Create your account
            </button>
            <button
              onClick={() => navigate("/login?demo=true")}
              className="w-full sm:w-auto bg-transparent border border-border-main hover:border-border-strong text-txt-primary rounded-md px-6 py-3 font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4" />
              <span>Try a demo account</span>
            </button>
          </div>

          <div className="flex justify-center items-center gap-6 text-[11px] font-mono text-txt-muted uppercase tracking-wider">
            <div>// NO FEES</div>
            <div className="h-3 w-[1px] bg-border-main" />
            <div>// NO PII ON-CHAIN</div>
            <div className="h-3 w-[1px] bg-border-main" />
            <div>// SUB-SECOND VERIFY</div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
