(() => {
  const themeButton = document.querySelector('.theme-toggle');
  const themeIcon = themeButton?.querySelector('.theme-icon');
  const themeLabel = themeButton?.querySelector('.theme-label');
  const themeMeta = document.getElementById('theme-color-meta');
  const applyTheme = theme => {
    document.documentElement.dataset.theme = theme;
    const dark = theme === 'dark';
    if (themeButton) {
      themeButton.setAttribute('aria-pressed', String(dark));
      themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    }
    if (themeIcon) themeIcon.textContent = dark ? '☀' : '☾';
    if (themeLabel) themeLabel.textContent = dark ? 'Light mode' : 'Dark mode';
    if (themeMeta) themeMeta.setAttribute('content', dark ? '#111827' : '#f5f0e8');
  };
  applyTheme(document.documentElement.dataset.theme || 'light');
  themeButton?.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    try { localStorage.setItem('sinclair-theme', nextTheme); } catch (_) { /* Theme still works for this visit. */ }
  });

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      nav.classList.toggle('open', open);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    }));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        nav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
      }
    });
  }

  const filters = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-card');
  filters.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filters.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    projects.forEach(card => { card.hidden = filter !== 'all' && card.dataset.category !== filter; });
  }));

  const year = document.getElementById('year');
  const currentYear = new Date().getFullYear();
  if (year) year.textContent = currentYear;
  const stampYear = document.getElementById('stamp-year');
  if (stampYear) stampYear.textContent = currentYear;

  // Progressive scroll reveals: content remains visible if motion APIs are unavailable.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll(
      '.intro-content, .experience-row, .work-top, .project-card, .cap-intro, .cap-grid article, .education-strip, .contact-kicker, .contact-section h2, .contact-bottom'
    );
    revealTargets.forEach((element, index) => {
      element.dataset.reveal = '';
      if (element.matches('.experience-row, .project-card, .cap-grid article')) {
        element.style.setProperty('--reveal-delay', `${(index % 3) * 85}ms`);
      }
    });
    document.body.classList.add('motion-ready');
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealTargets.forEach(element => observer.observe(element));
  }
})();
