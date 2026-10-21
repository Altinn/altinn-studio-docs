(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const overview = document.getElementById('overview');
  const position = document.getElementById('position');
  let current = 0;
  let all = false;

  function render(focus = false) {
    slides.forEach((slide, i) => { slide.hidden = !all && i !== current; });
    document.body.classList.toggle('overview', all);
    position.textContent = `${current + 1} / ${slides.length}`;
    prev.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    overview.setAttribute('aria-pressed', String(all));
    overview.textContent = all ? 'Vis ett' : 'Vis alle';
    if (focus && !all) slides[current].focus();
  }
  function go(index) {
    current = Math.max(0, Math.min(slides.length - 1, index));
    history.replaceState(null, '', `#slide-${current + 1}`);
    render(true);
    window.scrollTo(0, 0);
  }
  function fromHash() {
    const value = Number(location.hash.replace('#slide-', ''));
    current = Number.isInteger(value) && value > 0 && value <= slides.length ? value - 1 : 0;
    render();
  }
  prev.onclick = () => go(current - 1);
  next.onclick = () => go(current + 1);
  overview.onclick = () => { all = !all; render(); };
  document.getElementById('fullscreen').onclick = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch { position.textContent = 'Fullskjerm er ikke tilgjengelig i denne nettleseren'; }
  };
  document.addEventListener('keydown', (event) => {
    if (event.target.closest('button,a,input,textarea,select,dialog') || event.altKey || event.ctrlKey || event.metaKey) return;
    const keys = ['ArrowRight', 'PageDown', ' ', 'ArrowLeft', 'PageUp', 'Home', 'End', 'Escape'];
    if (keys.includes(event.key)) event.preventDefault();
    if (['ArrowRight', 'PageDown', ' '].includes(event.key)) go(current + 1);
    if (['ArrowLeft', 'PageUp'].includes(event.key)) go(current - 1);
    if (event.key === 'Home') go(0);
    if (event.key === 'End') go(slides.length - 1);
    if (event.key === 'Escape') { all = !all; render(); }
  });
  // Illustrations change only local demo state; they never call product APIs.
  document.querySelectorAll('[data-preset-toggle]').forEach((input) => {
    input.addEventListener('change', () => {
      const figure = input.closest('figure');
      figure.querySelector('.ui-group').classList.toggle('is-empty', !input.checked);
      figure.querySelectorAll('[data-selection-mark]').forEach((mark) => { mark.textContent = input.checked ? '✓' : '–'; });
      figure.querySelector('[data-preset-status]').textContent = input.checked
        ? 'Hele settet er valgt: 1 tilgangspakke og 1 enkeltrettighet.'
        : 'Ingen av de forhåndsdefinerte tilgangene er valgt.';
    });
  });
  document.querySelectorAll('[data-free-option]').forEach((input) => {
    input.addEventListener('change', () => {
      const figure = input.closest('figure');
      const count = figure.querySelectorAll('[data-free-option]:checked').length;
      figure.querySelector('[data-free-status]').textContent = `${count} ${count === 1 ? 'tilgang' : 'tilganger'} valgt i illustrasjonen.`;
    });
  });
  document.querySelectorAll('[data-demo-dialog]').forEach((button) => {
    button.addEventListener('click', () => button.closest('figure').querySelector('dialog').showModal());
  });
  document.querySelectorAll('[data-close-dialog]').forEach((button) => {
    button.addEventListener('click', () => button.closest('dialog').close());
  });
  document.querySelectorAll('[data-show-demo]').forEach((button) => {
    button.addEventListener('click', () => {
      const target = document.querySelector(`[data-demo="${button.dataset.showDemo}"]`);
      if (target) { all = false; go(slides.indexOf(target.closest('.slide'))); }
    });
  });
  window.addEventListener('hashchange', fromHash);
  fromHash();
})();
