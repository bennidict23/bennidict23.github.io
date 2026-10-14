(() => {
  const key = "chubin-homepage-theme";
  let theme = "light";

  try {
    const saved = localStorage.getItem(key);
    if (saved === "light" || saved === "dark") theme = saved;
  } catch {
    // Storage can be unavailable in private or embedded browsers.
  }

  const applyTheme = (value) => {
    theme = value;
    document.documentElement.dataset.theme = theme;
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute(
        "content",
        theme === "dark" ? "#171b1a" : "#ffffff",
      );
    }
    const button = document.getElementById("theme-toggle");
    if (!button) return;

    const dark = theme === "dark";
    button.setAttribute("aria-pressed", String(dark));
    button.setAttribute(
      "aria-label",
      dark ? "Switch to light mode" : "Switch to dark mode",
    );
    button.dataset.tooltip = dark ? "Light mode" : "Dark mode";
    button.querySelector("i").className = dark
      ? "fa-solid fa-sun"
      : "fa-solid fa-moon";
  };

  applyTheme(theme);

  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(theme);
    document.getElementById("theme-toggle").addEventListener("click", () => {
      applyTheme(theme === "dark" ? "light" : "dark");
      try {
        localStorage.setItem(key, theme);
      } catch {
        // Switching still works when the preference cannot be persisted.
      }
    });
  });
})();
