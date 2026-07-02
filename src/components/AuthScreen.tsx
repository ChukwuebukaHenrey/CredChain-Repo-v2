import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import AuthLeftPanel from "./AuthLeftPanel";

interface AuthScreenProps {
  role: "candidate" | "issuer" | "verifier";
  currentStep?: number;
  totalSteps?: number;
  /** Content rendered on the right desktop panel and as the mobile card body. */
  children: ReactNode;
  /** Optional footer link (e.g. "Back to role selection"). */
  backHref?: string;
  backLabel?: string;
}

export default function AuthScreen({
  role,
  currentStep,
  totalSteps,
  children,
  backHref = "/role",
  backLabel = "Back to role selection",
}: AuthScreenProps) {
  return (
    <div className="min-h-screen bg-bg-base text-txt-primary flex flex-col p-4 sm:p-6 lg:p-8 relative select-none">
      {/* Mobile top header */}
      <header className="max-w-7xl w-full mx-auto flex items-center justify-between min-[900px]:hidden">
        <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
          <Logo wordmarkSize="md" />
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex-1 flex items-center justify-center my-6 w-full">
        {/* Desktop two-panel */}
        <div className="hidden min-[900px]:flex w-[88vw] max-w-[1400px] h-[86vh] max-h-[840px] min-h-[600px] bg-bg-surface border border-border-main rounded-lg overflow-hidden">
          <AuthLeftPanel role={role} currentStep={currentStep} totalSteps={totalSteps} />

          <div className="w-[55%] bg-bg-base p-10 lg:p-14 xl:p-16 flex flex-col text-left relative overflow-y-auto h-full">
            <div className="absolute top-6 right-6 z-10">
              <ThemeToggle />
            </div>
            {children}
          </div>
        </div>

        {/* Mobile single column */}
        <div className="block min-[900px]:hidden w-full max-w-md bg-bg-surface border border-border-main rounded-lg p-6 sm:p-8">
          {children}
        </div>
      </main>

      <footer className="max-w-7xl w-full mx-auto pt-6 border-t border-border-subtle block min-[900px]:hidden">
        <Link
          to={backHref}
          className="inline-flex items-center gap-2 text-xs font-mono text-txt-muted hover:text-txt-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{backLabel}</span>
        </Link>
      </footer>
    </div>
  );
}
