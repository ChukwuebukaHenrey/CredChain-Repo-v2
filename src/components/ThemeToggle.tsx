import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { getTheme, toggleTheme, Theme } from "../services/theme";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    setThemeState(getTheme());
  }, []);

  const handleClick = () => {
    setThemeState(toggleTheme());
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-md border border-border-main bg-bg-surface text-txt-secondary hover:text-txt-primary hover:border-brand-purple transition-colors duration-200 ${className}`}
    >
      {isDark ? <Sun className="w-4 h-4" strokeWidth={1.75} /> : <Moon className="w-4 h-4" strokeWidth={1.75} />}
    </button>
  );
}
