(function () {
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // ---- "chaos": squash-and-stretch on hover (mouse) or tap (touch) ----
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)');
  Array.prototype.forEach.call(document.querySelectorAll('.chaos'), function (word) {
    var letters = word.querySelectorAll(':scope > span');
    var inners = word.querySelectorAll(':scope > span > span');
    var settling = word.classList.contains('settles');

    function finishSettle() { word.classList.add('done'); settling = false; }
    if (settling) {
      if (calm.matches) finishSettle();
      else {
        letters[letters.length - 1].addEventListener('animationend', function once(e) {
          if (e.animationName !== 'settle') return;
          e.currentTarget.removeEventListener('animationend', once);
          finishSettle();
        });
        setTimeout(function () { if (settling) finishSettle(); }, 2500);
      }
    }

    function bounce() {
      if (calm.matches || settling || word.classList.contains('is-bouncing')) return;
      var left = inners.length;
      word.classList.add('is-bouncing');
      Array.prototype.forEach.call(inners, function (l) {
        l.addEventListener('animationend', function end() {
          l.removeEventListener('animationend', end);
          if (--left === 0) word.classList.remove('is-bouncing');
        });
      });
    }

    word.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') bounce(); });
    word.addEventListener('click', bounce);
  });

  // ---- Active nav: highlight the section you're reading. Colour only, no animation. ----
  var links = Array.prototype.slice.call(document.querySelectorAll('.top nav a[href^="#"]'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var visible = new Map();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible.set(e.target.id, e.isIntersecting); });
      var current = null;
      sections.forEach(function (s) { if (visible.get(s.id) && !current) current = s.id; });
      links.forEach(function (a) {
        if (a.getAttribute('href') === '#' + current) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }

  // ---- Recommendations: full text in a modal, with previous / next ----
  var dlg = document.getElementById('rec-dialog');
  if (!dlg) return;
  var recs = Array.prototype.slice.call(document.querySelectorAll('.rec'));
  var nameEl = document.getElementById('rd-name');
  var content = document.getElementById('rd-content');
  var count = document.getElementById('rd-count');
  var prev = document.getElementById('rd-prev');
  var next = document.getElementById('rd-next');
  var current = 0;
  var opener = null;

  // Swapping content is instant: it's often keyboard-driven and repeated, so it shouldn't animate.
  function show(i) {
    current = (i + recs.length) % recs.length;
    var rec = recs[current];
    nameEl.textContent = rec.querySelector('.who .strong').textContent;
    content.replaceChildren(rec.querySelector('template').content.cloneNode(true));
    count.textContent = (current + 1) + ' of ' + recs.length;
    dlg.querySelector('.rd-inner').scrollTop = 0;
  }

  recs.forEach(function (rec, i) {
    rec.querySelector('.read').addEventListener('click', function (e) {
      opener = e.currentTarget;
      show(i);
      if (typeof dlg.showModal === 'function') dlg.showModal();
      else dlg.setAttribute('open', '');
    });
  });

  function close() { if (typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open'); }

  document.getElementById('rd-close').addEventListener('click', close);
  prev.addEventListener('click', function () { show(current - 1); });
  next.addEventListener('click', function () { show(current + 1); });

  // Backdrop click closes (the dialog element itself is the backdrop hit area).
  dlg.addEventListener('click', function (e) { if (e.target === dlg) close(); });

  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
  });

  // Return focus to the button that opened it.
  dlg.addEventListener('close', function () { if (opener) opener.focus(); });
})();
