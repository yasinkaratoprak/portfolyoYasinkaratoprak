/* Applies the saved theme before first paint. Loaded synchronously in <head>. */
try {
  var savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || savedTheme === "light") document.documentElement.dataset.theme = savedTheme;
} catch (e) {}
