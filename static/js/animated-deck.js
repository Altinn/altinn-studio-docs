// Player for layouts/animated-deck: scaling, navigation, build animations, magic move,
// connectors, icons and live embeds for 1920x1080 inline-styled <section> slides.
(function () {
  const stage = document.getElementById('stage');
  const viewport = document.getElementById('stage-viewport');
  const slides = Array.from(stage.querySelectorAll(':scope > section'));
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const position = document.getElementById('position');
  const fullscreen = document.getElementById('fullscreen');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SVG = 'http://www.w3.org/2000/svg';
  let current = -1;
  let timers = [];
  let scale = 1;

  const icons = {
    Check: 'M5 12.5l4.5 4.5L19 7.5',
    CheckCircle: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM8 12.5l3 3 5-6',
    Clock: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM12 7v5l3 2',
    Code: 'M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12',
    Lightbulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z',
    Chart: 'M4 20h16M7 16v-5M12 16V7M17 16v-8',
    Home: 'M4 11l8-7 8 7M6 9.5V20h12V9.5',
    Warning: 'M12 4l9 16H3zM12 10v4M12 17v.5',
    Chat: 'M4 5h16v11H9l-5 4z'
  };

  function drawIcons() {
    stage.querySelectorAll('x-icon').forEach(function (el) {
      const d = icons[el.getAttribute('name')];
      if (!d) return;
      el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d + '"/></svg>';
    });
  }

  function drawConnectors() {
    const hosts = new Map();
    stage.querySelectorAll('x-connector').forEach(function (c) {
      const host = c.parentElement;
      if (!hosts.has(host)) {
        const svg = document.createElementNS(SVG, 'svg');
        svg.setAttribute('class', 'deck-lines');
        svg.setAttribute('width', host.offsetWidth || 1920);
        svg.setAttribute('height', host.offsetHeight || 1080);
        svg.setAttribute('aria-hidden', 'true');
        host.insertBefore(svg, host.querySelector(':scope > x-connector'));
        hosts.set(host, svg);
      }
      const svg = hosts.get(host);
      const n = function (k) { return parseFloat(c.getAttribute(k)); };
      const x1 = n('x1'), y1 = n('y1'), x2 = n('x2'), y2 = n('y2');
      const route = c.getAttribute('route') || 'straight';
      let pts = [[x1, y1], [x2, y2]];
      if (route === 'hv') pts = [[x1, y1], [x2, y1], [x2, y2]];
      if (route === 'vh') pts = [[x1, y1], [x1, y2], [x2, y2]];
      const color = c.style.color || '#000';
      const width = parseFloat(c.style.borderWidth) || 2;
      const g = document.createElementNS(SVG, 'g');
      const line = document.createElementNS(SVG, 'polyline');
      line.setAttribute('points', pts.map(function (p) { return p.join(','); }).join(' '));
      line.setAttribute('fill', 'none');
      line.setAttribute('stroke', color);
      line.setAttribute('stroke-width', width);
      line.setAttribute('stroke-linecap', 'round');
      line.setAttribute('stroke-linejoin', 'round');
      if (c.style.borderStyle === 'dashed') line.setAttribute('stroke-dasharray', (width * 4) + ' ' + (width * 3));
      g.appendChild(line);
      if ((c.getAttribute('head') || 'end') !== 'none') {
        const a = pts[pts.length - 2], b = pts[pts.length - 1];
        const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
        const len = 4 * width + 4;
        const head = document.createElementNS(SVG, 'polygon');
        head.setAttribute('points', [b, [b[0] - len * Math.cos(ang - 0.45), b[1] - len * Math.sin(ang - 0.45)], [b[0] - len * Math.cos(ang + 0.45), b[1] - len * Math.sin(ang + 0.45)]].map(function (p) { return p.join(','); }).join(' '));
        head.setAttribute('fill', color);
        g.appendChild(head);
      }
      ['data-build-in', 'data-build-out'].forEach(function (a) { if (c.hasAttribute(a)) g.setAttribute(a, c.getAttribute(a)); });
      svg.appendChild(g);
    });
  }

  function prepareEmbeds() {
    stage.querySelectorAll('template.deck-embed-src').forEach(function (t) {
      const frame = document.createElement('iframe');
      frame.className = 'deck-embed';
      frame.setAttribute('style', t.dataset.style || '');
      frame.setAttribute('title', t.dataset.title || 'Animasjon');
      frame.setAttribute('sandbox', 'allow-scripts');
      frame.dataset.srcdoc = '<!doctype html><html lang="nb"><head><meta charset="utf-8"></head><body class="' + (t.dataset.bodyClass || '') + '">' + t.innerHTML + '</body></html>';
      t.replaceWith(frame);
    });
  }

  function parseBuild(value) {
    const parts = (value || '').trim().split(/\s+/);
    const order = parseInt(parts[1], 10);
    return { kind: parts[0] || 'fade', order: isNaN(order) ? 1 : order };
  }

  function playBuilds(slide) {
    timers.forEach(clearTimeout);
    timers = [];
    const ins = Array.from(slide.querySelectorAll('[data-build-in]'));
    const outs = Array.from(slide.querySelectorAll('[data-build-out]'));
    ins.forEach(function (el) {
      el.classList.add('build-wait', 'b-' + parseBuild(el.getAttribute('data-build-in')).kind);
    });
    outs.forEach(function (el) { el.classList.remove('build-gone'); });
    const steps = Array.from(new Set(ins.map(function (el) { return parseBuild(el.getAttribute('data-build-in')).order; })
      .concat(outs.map(function (el) { return parseBuild(el.getAttribute('data-build-out')).order; })))).sort(function (a, b) { return a - b; });
    function apply(step) {
      ins.forEach(function (el) { if (parseBuild(el.getAttribute('data-build-in')).order === step) el.classList.remove('build-wait'); });
      outs.forEach(function (el) { if (parseBuild(el.getAttribute('data-build-out')).order === step) el.classList.add('build-gone'); });
    }
    if (reduced) { steps.forEach(apply); return; }
    steps.forEach(function (step, i) { timers.push(setTimeout(function () { apply(step); }, 350 + i * 450)); });
  }

  function magicMove(from, to) {
    const moves = [];
    to.querySelectorAll(':scope > [id]').forEach(function (el) {
      const match = from.querySelector(':scope > #' + CSS.escape(el.id));
      if (!match) return;
      const a = match.getBoundingClientRect(), b = el.getBoundingClientRect();
      moves.push({ el: el, match: match, dx: (a.left - b.left) / scale, dy: (a.top - b.top) / scale });
    });
    moves.forEach(function (m) {
      m.match.style.visibility = 'hidden';
      m.el.style.transition = 'none';
      m.el.style.transform = 'translate(' + m.dx + 'px,' + m.dy + 'px)';
    });
    void to.offsetWidth;
    moves.forEach(function (m) {
      m.el.style.transition = '';
      m.el.classList.add('magic');
      m.el.style.transform = '';
    });
    timers.push(setTimeout(function () {
      moves.forEach(function (m) { m.el.classList.remove('magic'); m.match.style.visibility = ''; });
    }, 800));
  }

  function show(index) {
    index = Math.max(0, Math.min(slides.length - 1, index));
    if (index === current) return;
    const from = slides[current];
    const to = slides[index];
    const magic = from && !reduced && index === current + 1 && from.dataset.transition === 'magic';
    slides.forEach(function (s, i) {
      s.classList.toggle('current', i === index);
      s.setAttribute('aria-hidden', i === index ? 'false' : 'true');
    });
    to.querySelectorAll('iframe.deck-embed').forEach(function (f) { f.srcdoc = f.dataset.srcdoc; });
    if (from) from.querySelectorAll('iframe.deck-embed').forEach(function (f) { f.removeAttribute('srcdoc'); });
    playBuilds(to);
    if (magic) magicMove(from, to);
    current = index;
    position.textContent = (index + 1) + ' / ' + slides.length;
    prev.disabled = index === 0;
    next.disabled = index === slides.length - 1;
    history.replaceState(null, '', '#slide-' + (index + 1));
  }

  function fit() {
    const w = viewport.clientWidth, h = viewport.clientHeight;
    scale = Math.min(w / 1920, h / 1080);
    stage.style.left = ((w - 1920 * scale) / 2) + 'px';
    stage.style.top = ((h - 1080 * scale) / 2) + 'px';
    stage.style.transform = 'scale(' + scale + ')';
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
  }

  slides.forEach(function (s, i) {
    s.setAttribute('role', 'group');
    s.setAttribute('aria-roledescription', 'lysbilde');
    s.setAttribute('aria-label', 'Lysbilde ' + (i + 1) + ' av ' + slides.length);
  });
  drawIcons();
  drawConnectors();
  prepareEmbeds();
  fit();
  window.addEventListener('resize', fit);
  document.addEventListener('fullscreenchange', fit);

  prev.addEventListener('click', function () { show(current - 1); });
  next.addEventListener('click', function () { show(current + 1); });
  fullscreen.addEventListener('click', toggleFullscreen);
  document.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.target.closest && e.target.closest('button, a') && (e.key === ' ' || e.key === 'Enter')) return;
    if (['ArrowRight', 'PageDown', ' '].indexOf(e.key) >= 0) { e.preventDefault(); show(current + 1); }
    else if (['ArrowLeft', 'PageUp'].indexOf(e.key) >= 0) { e.preventDefault(); show(current - 1); }
    else if (e.key === 'Home') { e.preventDefault(); show(0); }
    else if (e.key === 'End') { e.preventDefault(); show(slides.length - 1); }
    else if (e.key === 'f' || e.key === 'F') toggleFullscreen();
  });
  let touchX = null;
  viewport.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  viewport.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });
  window.addEventListener('beforeprint', function () {
    timers.forEach(clearTimeout);
    stage.querySelectorAll('.build-wait').forEach(function (el) { el.classList.remove('build-wait'); });
  });

  function slideFromHash() {
    const m = /^#slide-(\d+)$/.exec(location.hash);
    return m ? parseInt(m[1], 10) - 1 : 0;
  }
  window.addEventListener('hashchange', function () { show(slideFromHash()); });
  show(slideFromHash());
})();
