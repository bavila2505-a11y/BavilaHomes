/* ============================================================
   Bavila Homes — shared behaviour
   Loaded on every page. Each block exits quietly if the
   elements it needs aren't on the page.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- mobile menu ---------- */
  (function () {
    var b = document.getElementById('burger'),
        m = document.getElementById('mobile');
    if (!b || !m) return;
    b.addEventListener('click', function () {
      var open = m.classList.toggle('open');
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    /* close when a link inside is followed */
    m.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        m.classList.remove('open');
        b.setAttribute('aria-expanded', 'false');
      }
    });
  })();

  /* ---------- desktop dropdowns: keyboard + touch ---------- */
  (function () {
    var items = [].slice.call(document.querySelectorAll('.navitem'));
    if (!items.length) return;

    items.forEach(function (item) {
      var link = item.querySelector('.navlink'),
          drop = item.querySelector('.drop');
      if (!link || !drop) return;

      /* touch devices: first tap opens the menu, second follows the link */
      link.addEventListener('click', function (e) {
        if (!window.matchMedia('(hover: none)').matches) return;
        if (!item.classList.contains('open')) {
          e.preventDefault();
          items.forEach(function (o) { o.classList.remove('open'); });
          item.classList.add('open');
        }
      });
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.navitem')) {
        items.forEach(function (o) { o.classList.remove('open'); });
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') items.forEach(function (o) { o.classList.remove('open'); });
    });
  })();

  /* ---------- rot & trim: drag-to-expose ---------- */
  (function () {
    var scrub = document.getElementById('scrub');
    if (!scrub) return;
    var clip = document.getElementById('clipRect'),
        div = document.getElementById('divider'),
        W = 560;
    if (!clip || !div) return;

    function draw(p) {
      var x = W * (1 - p / 100);
      clip.setAttribute('x', x);
      clip.setAttribute('width', W - x);
      div.setAttribute('transform', 'translate(' + (x - 280) + ',0)');
    }
    scrub.addEventListener('input', function () { draw(+scrub.value); });
    draw(+scrub.value);

    var target = document.querySelector('.reveal');
    if (!target || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var played = false;
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting || played) return;
        played = true;
        var t0 = null;
        function step(ts) {
          if (!t0) t0 = ts;
          var k = Math.min((ts - t0) / 900, 1),
              v = 50 + 32 * (1 - Math.pow(1 - k, 3));
          scrub.value = v; draw(v);
          if (k < 1) requestAnimationFrame(step);
        }
        setTimeout(function () { requestAnimationFrame(step); }, 550);
      });
    }, { threshold: .4 }).observe(target);
  })();

  /* ---------- home: scope ladder ---------- */
  (function () {
    var btns = [].slice.call(document.querySelectorAll('.lbtn'));
    if (!btns.length) return;
    function set(n) {
      btns.forEach(function (b) {
        b.setAttribute('aria-selected', b.dataset.state === n ? 'true' : 'false');
      });
      document.querySelectorAll('[data-layer]').forEach(function (g) {
        g.style.opacity = (+g.dataset.layer <= +n) ? '1' : '0';
      });
      document.querySelectorAll('.lpane').forEach(function (p) {
        p.hidden = p.dataset.pane !== n;
      });
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () { set(b.dataset.state); });
    });
    set('1');
  })();

  /* ---------- work: category filter ---------- */
  (function () {
    var fs = [].slice.call(document.querySelectorAll('.fbtn'));
    if (!fs.length) return;
    fs.forEach(function (f) {
      f.addEventListener('click', function () {
        var cat = f.dataset.cat;
        fs.forEach(function (x) { x.setAttribute('aria-pressed', x === f ? 'true' : 'false'); });
        document.querySelectorAll('.job').forEach(function (j) {
          j.hidden = !(cat === 'all' || (j.dataset.cat || '').split(' ').indexOf(cat) > -1);
        });
      });
    });
  })();

  /* ---------- photo slots: load what exists, fall back cleanly ---------- */
  (function () {
    document.querySelectorAll('.shot').forEach(function (sh) {
      var imgs = [].slice.call(sh.querySelectorAll('img')),
          btns = [].slice.call(sh.querySelectorAll('.shot-toggle button')),
          ok = {};
      function select(role) {
        imgs.forEach(function (i) {
          i.classList.toggle('on', i.dataset.role === role && !!ok[i.dataset.role]);
        });
        btns.forEach(function (b) {
          b.setAttribute('aria-pressed', b.dataset.role === role ? 'true' : 'false');
        });
      }
      function refresh() {
        sh.classList.toggle('has-both', !!(ok.before && ok.after));
        var show = ok.after ? 'after' : (ok.before ? 'before' : null);
        sh.classList.toggle('loaded', !!show);
        if (show) select(show);
      }
      imgs.forEach(function (i) {
        if (i.complete && i.naturalWidth > 0) ok[i.dataset.role] = true;
        i.addEventListener('load', function () { ok[i.dataset.role] = true; refresh(); });
        i.addEventListener('error', function () { ok[i.dataset.role] = false; refresh(); });
      });
      btns.forEach(function (b) {
        b.addEventListener('click', function () { select(b.dataset.role); });
      });
      refresh();
    });
  })();

  /* ---------- contact: preselect service from ?service= ---------- */
  (function () {
    var sel = document.getElementById('service');
    if (!sel) return;
    var v = new URLSearchParams(location.search).get('service');
    if (!v) return;
    for (var i = 0; i < sel.options.length; i++) {
      if (sel.options[i].value === v) { sel.selectedIndex = i; break; }
    }
  })();

})();
