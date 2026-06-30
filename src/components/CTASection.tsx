import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import FadeIn from "./FadeIn";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 md:py-[120px] bg-bg-base overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <FadeIn>
          {/* Headings */}
          <h2 className="font-display font-bold text-white text-[32px] md:text-[48px] leading-tight mb-2">
            Your credentials,
          </h2>
          <h3 className="font-display font-bold text-accent-cyan text-[32px] md:text-[48px] leading-tight mb-6">
            permanently verified.
          </h3>

          {/* Subheading */}
          <p className="font-sans text-txt-secondary scale-base max-w-xl mx-auto mb-10 leading-relaxed">
            Join as a candidate, institution, or employer.
          </p>

          {/* Buttons Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => navigate("/role")}
              className="w-full sm:w-auto bg-brand-purple hover:bg-[#6D28D9] text-white rounded-md px-6 py-3.5 font-semibold text-sm transition-colors cursor-pointer text-center"
            >
              Create your account
            </button>
            <button
              onClick={() => navigate("/login?demo=true")}
              className="w-full sm:w-auto bg-transparent border border-border-main text-white rounded-md px-6 py-3.5 font-semibold text-sm transition-colors hover:bg-bg-elevated/50 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 text-white fill-white" />
              <span>Try a demo account</span>
            </button>
          </div>

          {/* Inline Trust Indicators */}
          <div className="flex justify-center items-center gap-6 text-[11px] font-mono text-txt-muted uppercase tracking-wider">
            <div>// NO SLOP</div>
            <div className="h-3 w-[1px] bg-border-main"></div>
            <div>// NO FEES</div>
            <div className="h-3 w-[1px] bg-border-main"></div>
            <div>// SECURE PII</div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
