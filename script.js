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

// Graduates cohort filter
const gradFilter = document.getElementById('gradFilter');
const gradItems = document.querySelectorAll('#gradList .member-card');

if (gradFilter) {
  gradFilter.addEventListener('click', (e) => {
    const btn = e.target.closest('.pub-filter-btn');
    if (!btn) return;

    gradFilter.querySelectorAll('.pub-filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const cohort = btn.dataset.cohort;
    gradItems.forEach((item) => {
      const match = cohort === 'all' || item.dataset.cohort === cohort;
      item.classList.toggle('hidden', !match);
    });
  });
}

// Scroll reveal：捲到才進場，首頁 Hero 與各頁標題區不參與（避免一進站就有東西在動）
const revealTargets = [];

document.querySelectorAll('main > section').forEach((section) => {
  if (section.classList.contains('hero') || section.classList.contains('page-header')) return;

  // 有成員卡片的區塊：改成卡片各自依序進場，而不是整塊一起淡入
  if (section.querySelector('.member-card')) {
    section
      .querySelectorAll('.group-heading, .pub-filter, .member-card')
      .forEach((el) => revealTargets.push(el));
  } else {
    revealTargets.push(section);
  }
});

if (revealTargets.length > 0) {
  const reduceMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    // 不播動畫，直接顯示
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  } else {
    revealTargets.forEach((el) => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target); // 只播一次
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );

    revealTargets.forEach((el) => revealObserver.observe(el));
  }
}
