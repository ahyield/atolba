// Dark is the default. The button opts into light and remembers the choice.
// Loaded blocking in <head> so the stored theme is applied before first paint.
(function () {
  var KEY = "theme";
  var root = document.documentElement;

  function read() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null; // private mode, blocked storage
    }
  }

  function save(value) {
    try {
      localStorage.setItem(KEY, value);
    } catch (e) {}
  }

  var stored = read();
  if (stored === "light") root.setAttribute("data-theme", "light");

  function label(theme) {
    return theme === "light" ? "Switch to dark mode" : "Switch to light mode";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".theme-toggle");
    if (!button) return;

    var current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
    button.setAttribute("aria-label", label(current));

    button.addEventListener("click", function () {
      current = current === "light" ? "dark" : "light";
      if (current === "light") {
        root.setAttribute("data-theme", "light");
      } else {
        root.removeAttribute("data-theme");
      }
      button.setAttribute("aria-label", label(current));
      save(current);
    });
  });
})();
