export function getTheme(): string {
  return localStorage.getItem("cc_theme") || "v2";
}

export function setTheme(theme: string) {
  localStorage.setItem("cc_theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
}

export function initTheme() {
  setTheme(getTheme());
}
