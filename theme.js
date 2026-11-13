// Light / dark theme.
// Runs in <head> so the saved theme is applied before the page paints (no flash).
// With nothing saved, the site follows the visitor's OS setting, including live changes.
(function () {
  var root = document.documentElement;
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}

  function resolved() {
    return saved === 'dark' || saved === 'light' ? saved : (mq.matches ? 'dark' : 'light');
  }

  function apply() {
    var theme = resolved();
    root.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#1d1916' : '#faf6f0');
    var btn = document.getElementById('themeToggle');
    if (btn) btn.setAttribute('aria-pressed', String(theme === 'dark'));
  }

  apply();

  mq.addEventListener('change', function () { if (!saved) apply(); });

  document.addEventListener('DOMContentLoaded', function () {
    apply();
    var btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      saved = resolved() === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('theme', saved); } catch (e) {}
      apply();
    });
  });
})();
