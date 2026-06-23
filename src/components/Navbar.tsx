import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Logo from "./Logo";

interface NavbarProps {
  onOpenDemo: (role?: 'candidate' | 'issuer' | 'verifier') => void;
}

export default function Navbar({ onOpenDemo }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "How it works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Who it's for", href: "#who-its-for" },
    { name: "Verification", href: "#ledger" }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#05050a]/80 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <Logo iconSize={36} showWordmark={true} wordmarkSize="md" />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => onOpenDemo('candidate')}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => onOpenDemo('candidate')}
              className="relative group overflow-hidden bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,253,0.3)] shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Get Started</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 p-1.5 rounded-lg bg-white/5 border border-white/5 cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-[#07070f] border-b border-white/10 px-4 pt-4 pb-6 space-y-4 shadow-xl"
        >
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-gray-400 hover:text-white py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenDemo('candidate');
              }}
              className="w-full text-center text-sm font-medium text-gray-400 hover:text-white py-2.5 rounded-lg hover:bg-white/5 transition-all duration-250 cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenDemo('candidate');
              }}
              className="w-full text-center bg-purple-600 text-white text-sm font-medium py-3 rounded-lg hover:bg-purple-500 transition-all duration-250 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Get Started</span>
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
