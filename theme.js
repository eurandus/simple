// Light / dark theme toggle.
// Loaded in <head> so a saved choice applies before the page paints (no flash of the wrong theme).
// With nothing saved, the site follows the visitor's OS setting, including if it changes while the page is open.
(function () {
  var root = document.documentElement;
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  var COLORS = { light: '#e4e6fa', dark: '#16172e' };
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}

  function resolved() {
    return saved === 'dark' || saved === 'light' ? saved : (mq.matches ? 'dark' : 'light');
  }

  function apply() {
    var theme = resolved();
    root.setAttribute('data-theme', theme);
    // Browser UI colour (address bar on mobile): match the chosen theme
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) {
      m.setAttribute('content', COLORS[theme]);
    });
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.setAttribute('aria-pressed', String(theme === 'dark'));
  }

  apply();
  mq.addEventListener('change', function () { if (!saved) apply(); });

  document.addEventListener('DOMContentLoaded', function () {
    apply();
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      saved = resolved() === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('theme', saved); } catch (e) {}
      apply();
    });
  });
})();
