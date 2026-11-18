(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const themeIcon = themeButton?.querySelector('.theme-icon');
  const themeLabel = themeButton?.querySelector('.theme-label');
  const themeMeta = document.getElementById('theme-color-meta');
  const validModes = ['auto', 'light', 'dark'];
  let themeMode = validModes.includes(root.dataset.themeMode) ? root.dataset.themeMode : 'auto';

  const getTimeTheme = () => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18 ? 'light' : 'dark';
  };

  const applyTheme = () => {
    const theme = themeMode === 'auto' ? getTimeTheme() : themeMode;
    const dark = theme === 'dark';
    root.dataset.themeMode = themeMode;
    root.dataset.theme = theme;
    if (themeButton) {
      const label = themeMode === 'auto' ? `Auto · ${dark ? 'Dark' : 'Light'}` : `${dark ? 'Dark' : 'Light'} mode`;
      themeButton.setAttribute('aria-label', `Theme mode: ${themeMode === 'auto' ? `automatic, currently ${theme}` : themeMode}. Activate to change theme preference.`);
      themeButton.setAttribute('aria-pressed', String(themeMode !== 'auto'));
      if (themeIcon) themeIcon.textContent = themeMode === 'auto' ? '◐' : (dark ? '☀' : '☾');
      if (themeLabel) themeLabel.textContent = label;
    }
    if (themeMeta) themeMeta.setAttribute('content', dark ? '#111827' : '#f5f0e8');
  };

  applyTheme();
  themeButton?.addEventListener('click', () => {
    // Cycle through automatic, manual light, and manual dark preferences.
    themeMode = themeMode === 'auto' ? 'light' : themeMode === 'light' ? 'dark' : 'auto';
    try { localStorage.setItem('sinclair-theme', themeMode); } catch (_) { /* The selection still works for this visit. */ }
    applyTheme();
  });

  // Keep automatic mode aligned with the visitor's local clock if the page stays open.
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && themeMode === 'auto') applyTheme();
  });
  window.setInterval(() => {
    if (themeMode === 'auto') applyTheme();
  }, 60_000);

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

  const currentYear = new Date().getFullYear();
  const year = document.getElementById('year');
  const stampYear = document.getElementById('stamp-year');
  if (year) year.textContent = currentYear;
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
