import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 border-b border-border-main flex items-center ${
        scrolled
          ? "bg-bg-base/90 backdrop-blur-[12px]"
          : "bg-bg-base"
      }`}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* Left: Logo */}
        <a href="#" className="flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="28" rx="6" fill="#7C3AED" />
            <path d="M14 6L20 9.5V15.5L14 19L8 15.5V9.5L14 6Z" stroke="#00D4FF" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M11 12.5L13 14.5L17 10.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-display font-semibold text-lg text-txt-primary">
            CredChain
          </span>
        </a>

        {/* Center: Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[14px] font-sans text-txt-secondary hover:text-txt-primary transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right: CTAs */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => navigate("/login")}
            className="text-[14px] font-sans text-txt-secondary hover:text-txt-primary transition-colors duration-200 cursor-pointer"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/role")}
            className="bg-brand-purple hover:bg-[#6D28D9] text-white rounded-md px-6 py-3 font-semibold text-sm transition-colors cursor-pointer"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-txt-secondary hover:text-txt-primary focus:outline-none p-1.5 rounded-md cursor-pointer"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-bg-base border-b border-border-main px-6 py-6 flex flex-col gap-6 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-[14px] font-sans text-txt-secondary hover:text-txt-primary py-1 border-b border-border-subtle"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-2">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/login");
              }}
              className="w-full text-center text-[14px] font-sans text-txt-secondary hover:text-txt-primary py-2.5 rounded-md transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/role");
              }}
              className="w-full text-center bg-brand-purple hover:bg-[#6D28D9] text-white rounded-md py-3 font-semibold text-sm transition-colors cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
