import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#05050a] border-t border-white/5 py-12 overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Logo iconSize={30} showWordmark={true} wordmarkSize="sm" />
          </a>

          {/* Copyright description */}
          <div className="text-xs text-gray-500 font-mono">
            &copy; {currentYear} CredChain Inc. All rights reserved. Secured by Solana.
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-400 font-medium">
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#who-its-for" className="hover:text-white transition-colors">Who it's for</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Principles</a>
          </div>

        </div>
      </div>
    </footer>
  );
}
