import { Github } from "lucide-react";

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M9.6 0h1.9l-4.2 4.8L12.1 12H8.3L5.3 8.1 1.9 12H0l4.5-5.1L0 0h3.9l2.7 3.6L9.6 0zm-.7 10.1h1L3.9 1h-1.1l6.1 9.1z"/>
  </svg>
);

export default function Footer() {
  const navLinks = [
    { name: "How it works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Who it's for", href: "#who-its-for" },
    { name: "Verification", href: "#ledger" }
  ];

  return (
    <footer className="bg-bg-base border-t border-border-main py-12 relative">
      <div className="max-w-[1200px] mx-auto px-6 space-y-8">
        
        {/* Row 1: Logo left / Nav links center / GitHub and X social icons right */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-border-subtle">
          {/* Logo Left */}
          <a href="#" className="flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="28" height="28" rx="6" fill="#7C3AED" />
              <path d="M14 6L20 9.5V15.5L14 19L8 15.5V9.5L14 6Z" stroke="#00D4FF" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M11 12.5L13 14.5L17 10.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-display font-semibold text-base text-txt-primary">
              CredChain
            </span>
          </a>

          {/* Nav Links Center */}
          <div className="flex flex-wrap justify-center gap-6 text-[13px] text-txt-secondary">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-txt-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Social Icons Right */}
          <div className="flex items-center gap-4 text-txt-muted">
            <a
              href="https://github.com"
              target="_blank"
              referrerPolicy="no-referrer"
              className="hover:text-txt-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              referrerPolicy="no-referrer"
              className="hover:text-txt-primary transition-colors p-1 bg-transparent flex items-center justify-center"
              aria-label="X (formerly Twitter)"
            >
              <XIcon />
            </a>
          </div>
        </div>

        {/* Row 2: "2026 CredChain. Secured by Solana." left / "Privacy Principles" right */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-txt-muted font-sans">
          <div>
            2026 CredChain. Secured by Solana.
          </div>
          <div>
            <a href="#" className="hover:text-txt-primary transition-colors">
              Privacy Principles
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
