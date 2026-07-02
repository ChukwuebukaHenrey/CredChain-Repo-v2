export type Theme = "dark" | "light";

const STORAGE_KEY = "cc_theme";
const DEFAULT_THEME: Theme = "dark";

function readStored(): Theme {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw === "light" ? "light" : "dark";
}

export function getTheme(): Theme {
  return readStored();
}

export function setTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, theme);
  document.documentElement.setAttribute("data-theme", theme);
}

export function toggleTheme(): Theme {
  const next: Theme = getTheme() === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}

export function initTheme() {
  setTheme(getTheme());
}
