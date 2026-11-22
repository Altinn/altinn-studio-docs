// Markerer overskriften brukeren leser i «På denne siden», se layouts/partials/designsystemet/docs/toc.html.
// En overskrift regnes som lest når den har passert den øverste tredjedelen av skjermen.
export function initDocsToc(toc = document.querySelector('[data-docs-toc]')) {
  if (!toc || !('IntersectionObserver' in window)) return;

  const links = new Map();
  for (const link of toc.querySelectorAll('a[href^="#"]')) {
    const heading = document.getElementById(decodeURIComponent(link.hash.slice(1)));
    if (heading) links.set(heading, link);
  }
  if (links.size === 0) return;

  const setCurrent = (link) => {
    for (const other of links.values()) other.removeAttribute('aria-current');
    link.setAttribute('aria-current', 'location');
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (visible.length > 0) setCurrent(links.get(visible[0].target));
    },
    { rootMargin: '0px 0px -66% 0px' },
  );
  for (const heading of links.keys()) observer.observe(heading);
}
