document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Publication year filter
const pubFilter = document.getElementById('pubFilter');
const pubItems = document.querySelectorAll('.pub-item');

if (pubFilter) {
  pubFilter.addEventListener('click', (e) => {
    const btn = e.target.closest('.pub-filter-btn');
    if (!btn) return;

    pubFilter.querySelectorAll('.pub-filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const year = btn.dataset.year;
    pubItems.forEach((item) => {
      const match = year === 'all' || item.dataset.year === year;
      item.classList.toggle('hidden', !match);
    });
  });
}
