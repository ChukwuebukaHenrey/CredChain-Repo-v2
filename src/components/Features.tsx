import { Brain, QrCode, Archive, Sparkles, FileSpreadsheet } from "lucide-react";
import FadeIn from "./FadeIn";

interface Feature {
  icon: React.ReactNode;
  title: string;
  body: string;
  tag: string;
  /** Column span at lg breakpoint. 1 = standard, 2 = wide. */
  span?: 1 | 2;
}

const features: Feature[] = [
  {
    icon: <Brain className="w-6 h-6 text-txt-muted" strokeWidth={1.75} />,
    title: "AI Document Processing",
    body: "Transcripts and diplomas parsed by multi-modal AI. Clean structured output, ready for institutional approval.",
    tag: "// VISION AI",
  },
  {
    icon: <QrCode className="w-6 h-6 text-txt-muted" strokeWidth={1.75} />,
    title: "QR Verification",
    body: "Scan any CredChain QR code for instant on-chain confirmation. Zero registration required.",
    tag: "// LIGHTNING RESPONSE",
  },
  {
    icon: <Archive className="w-6 h-6 text-txt-muted" strokeWidth={1.75} />,
    title: "Credential Vault",
    body: "Every verified credential in one place. Owned by the candidate, not the institution.",
    tag: "// CANDIDATE PORTFOLIO",
  },
  {
    icon: <Sparkles className="w-7 h-7 text-txt-muted" strokeWidth={1.5} />,
    title: "AI Resume Builder",
    body: "Build a verified resume directly from your on-chain credentials. Every claim backed by institutional proof. Share with a link or export to PDF.",
    tag: "// PROVEN COMPETENCY",
    span: 2,
  },
  {
    icon: <FileSpreadsheet className="w-6 h-6 text-txt-muted" strokeWidth={1.75} />,
    title: "Employer Verification",
    body: "Bulk verify candidate pools via CSV upload. Instant results against the Solana ledger.",
    tag: "// REDUCED FRICTION",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-[120px] bg-bg-base overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section header */}
        <div className="text-left mb-16 max-w-2xl">
          <FadeIn>
            <div className="border-l-2 border-brand-purple pl-3 font-mono text-[11px] tracking-[0.18em] text-txt-muted uppercase mb-4">
              CORE CAPABILITIES
            </div>
            <h2 className="font-display text-txt-primary scale-2xl font-bold">
              Built for the entire credential lifecycle.
            </h2>
          </FadeIn>
        </div>

        {/* 3x2 grid — row 2 has one wide card spanning two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FadeIn key={i} delay={100 + i * 50}>
              <FeatureCard feature={f} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const spanClass = feature.span === 2 ? "lg:col-span-2" : "";
  return (
    <div
      className={`${spanClass} bg-bg-surface border border-border-main rounded-lg p-8 h-full flex flex-col justify-between min-h-[220px] transition-colors duration-200 hover:border-border-strong`}
    >
      <div className="space-y-4 text-left">
        {feature.icon}
        <h3 className="font-display text-txt-primary text-[18px] font-bold">
          {feature.title}
        </h3>
        <p className="font-sans text-txt-secondary scale-sm leading-relaxed max-w-xl">
          {feature.body}
        </p>
      </div>
      <div className="font-mono text-[10px] text-txt-muted mt-6 uppercase tracking-wider">
        {feature.tag}
      </div>
    </div>
  );
}
