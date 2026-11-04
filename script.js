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

// Hero 標題打字效果的計時器；切換語言時要先停掉，否則會繼續打出舊語言的字
const heroTitle = document.getElementById('heroTitle');
let heroTypingTimer = null;

const stopHeroTyping = () => {
  if (heroTypingTimer === null) return;
  clearTimeout(heroTypingTimer);
  heroTypingTimer = null;
  heroTitle.removeAttribute('aria-label');
};

// 版面切換（經典版 ⇄ 終端機版）：頁面載入時套用哪一份由 theme.js 決定，這裡只處理按鈕。
// 按鈕文字顯示「要切換過去的版面」，會跟著語言變，所以不用 data-en，由 updateThemeToggle 處理
const THEME_KEY = 'theme';
const THEME_FILES = {
  classic: { css: 'style.css', icon: 'favicon.svg' },
  terminal: { css: 'style-terminal.css', icon: 'favicon-terminal.svg' },
};
const themeToggle = document.getElementById('themeToggle');
let currentTheme = document.documentElement.dataset.theme === 'terminal' ? 'terminal' : 'classic';

const updateThemeToggle = (lang) => {
  if (!themeToggle) return;
  const toTerminal = currentTheme === 'classic';
  const labels = toTerminal
    ? { zh: '終端機版', en: 'Terminal' }
    : { zh: '經典版', en: 'Classic' };
  themeToggle.textContent = lang === 'en' ? labels.en : labels.zh;
  themeToggle.setAttribute(
    'aria-label',
    lang === 'en'
      ? `Switch to ${toTerminal ? 'terminal' : 'classic'} layout`
      : `切換為${toTerminal ? '終端機' : '經典'}版面`,
  );
};

// 換樣式表時先載入新的、載好才移除舊的，避免中間有一瞬間完全沒有樣式
const applyTheme = (theme, onLoad) => {
  const oldSheet = document.getElementById('themeStylesheet');
  const newSheet = document.createElement('link');
  newSheet.rel = 'stylesheet';
  newSheet.href = THEME_FILES[theme].css;
  newSheet.addEventListener('load', () => {
    oldSheet.remove();
    newSheet.id = 'themeStylesheet';
    if (onLoad) onLoad();
  });
  oldSheet.after(newSheet);
  document.querySelector('link[rel="icon"]').href = THEME_FILES[theme].icon;
  document.documentElement.dataset.theme = theme;
};

// 中英切換：中文寫在 HTML 內文，英文寫在同一個元素的 data-en；
// 屬性類（aria-label）的英文寫在 data-en-aria-label。選擇記在 localStorage，換頁沿用
const LANG_KEY = 'lang';
const i18nTexts = document.querySelectorAll('[data-en]');
const i18nAria = document.querySelectorAll('[data-en-aria-label]');
const langToggle = document.getElementById('langToggle');

// 先把中文原文存起來，切回中文時用
i18nTexts.forEach((el) => {
  el.dataset.zh = el.textContent;
});
i18nAria.forEach((el) => {
  el.dataset.zhAriaLabel = el.getAttribute('aria-label');
});

const applyLang = (lang) => {
  const en = lang === 'en';
  stopHeroTyping();
  document.documentElement.lang = en ? 'en' : 'zh-Hant';
  i18nTexts.forEach((el) => {
    el.textContent = en ? el.dataset.en : el.dataset.zh;
  });
  i18nAria.forEach((el) => {
    el.setAttribute('aria-label', en ? el.dataset.enAriaLabel : el.dataset.zhAriaLabel);
  });
  updateThemeToggle(lang);
};

const readLang = () => {
  try {
    return localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'zh';
  } catch (e) {
    return 'zh'; // 無痕模式或封鎖儲存空間時可能丟例外，當作預設中文
  }
};

let currentLang = readLang();
if (currentLang === 'en') applyLang('en');
updateThemeToggle(currentLang);

// 經典版 → 終端機版時先播一段開機畫面（約 3.5 秒，點一下畫面可略過），再換樣式表；
// 開機畫面的樣式寫在 style.css（播放當下還是經典版樣式表）。減少動態效果時直接切換
// 開機訊息跟著目前語言。[OK] 那幾行由 bootOk 自動補點點對齊：
// 中文每個項目都是 8 個中文字，改字時要維持字數一樣才會對齊
const bootOk = (label, width) => `${label} ${'.'.repeat(Math.max(2, width - label.length))} [OK]`;
const BOOT_LINES = {
  zh: [
    'ECLAB BIOS v1.0 ... 記憶體檢查 OK',
    '主機：國立成功大學 電機工程學系',
    '位置：R96213',
    bootOk('載入倫理運算模組', 16),
    bootOk('載入假訊息偵測器', 16),
    bootOk('載入社群網路分析', 16),
    bootOk('啟動資安防護系統', 16),
    bootOk('連線未來網際網路', 16),
    bootOk('掛載成員資料目錄', 16),
    bootOk('掛載發表著作目錄', 16),
    '歡迎來到 倫理計算實驗室',
    '啟動終端機 tty0 ...',
  ],
  en: [
    'ECLAB BIOS v1.0 ... memory check OK',
    'host: NCKU, Dept. of Electrical Engineering',
    'location: R96213',
    bootOk('loading ethics module', 34),
    bootOk('loading disinformation detector', 34),
    bootOk('loading social network analysis', 34),
    bootOk('starting cyber security shield', 34),
    bootOk('connecting future internet', 34),
    bootOk('mounting ~/members', 34),
    bootOk('mounting ~/publications', 34),
    'welcome to Ethics-aware Computing Lab',
    'starting tty0 ...',
  ],
};
const BOOT_LINE_MS = 240; // 每行出現的間隔
const BOOT_HOLD_MS = 800; // 最後一行出現後再停留多久

const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let themeSwitching = false;

const switchTheme = () => {
  if (themeSwitching) return;
  const next = currentTheme === 'classic' ? 'terminal' : 'classic';
  // 回傳是否存成功：存不了（無痕模式等）時下一頁會回到經典版
  const finish = () => {
    currentTheme = next;
    // 重新套用語言：會停掉打字效果並把 Hero 標題補回完整文字，也會更新按鈕文字
    applyLang(currentLang);
    try {
      localStorage.setItem(THEME_KEY, next);
      return true;
    } catch (e) {
      return false; // 存不了就只對這一頁有效，不影響切換本身
    }
  };

  if (next === 'classic' || prefersReducedMotion()) {
    applyTheme(next);
    finish();
    return;
  }

  themeSwitching = true;
  const boot = document.createElement('div');
  boot.className = 'boot-screen';
  boot.setAttribute('aria-hidden', 'true');
  document.body.append(boot);

  const bootLines = BOOT_LINES[currentLang === 'en' ? 'en' : 'zh'];
  const timers = bootLines.map((line, i) =>
    setTimeout(() => {
      const row = document.createElement('p');
      row.textContent = line;
      boot.append(row);
    }, 150 + i * BOOT_LINE_MS),
  );

  let booted = false;
  const endBoot = () => {
    if (booted) return;
    booted = true;
    timers.forEach(clearTimeout);
    clearTimeout(holdTimer);
    // 開機完回到首頁最上面：新頁面由 theme.js 直接套用終端機版，Hero 標題也會重新打字。
    // 開機畫面留著蓋住舊頁，直到瀏覽器換頁
    if (finish()) {
      window.location.assign('index.html');
      return;
    }
    // 設定存不了就帶不到下一頁，改成原地切換並捲回最上面
    applyTheme(next, () => {
      boot.remove();
      themeSwitching = false;
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  const holdTimer = setTimeout(endBoot, 150 + (bootLines.length - 1) * BOOT_LINE_MS + BOOT_HOLD_MS);
  boot.addEventListener('click', endBoot); // 不想等可以點一下略過
};

if (themeToggle) {
  themeToggle.hidden = false;
  themeToggle.addEventListener('click', switchTheme);
}

// 彩蛋入口：經典版頁尾角落的小小「>_」，終端機版由頁首的 [經典版] 按鈕切回
const terminalEgg = document.getElementById('terminalEgg');
if (terminalEgg) {
  terminalEgg.hidden = false;
  terminalEgg.addEventListener('click', switchTheme);
}

// 鍵盤彩蛋：按 `（像遊戲裡叫出主控台）切換版面；正在輸入文字時不觸發
document.addEventListener('keydown', (e) => {
  if (e.key !== '`' || e.ctrlKey || e.metaKey || e.altKey) return;
  const el = document.activeElement;
  if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
  switchTheme();
});

if (langToggle) {
  langToggle.hidden = false;
  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    applyLang(currentLang);
    try {
      localStorage.setItem(LANG_KEY, currentLang);
    } catch (e) {
      // 存不了就只對這一頁有效，不影響切換本身
    }
  });
}

// Hero 標題逐字打出（僅 index.html、僅終端機版）。文字原本就寫在 HTML 裡，
// 沒有 JS 或開了「減少動態效果」時直接完整顯示，不會變成空白標題
if (heroTitle && currentTheme === 'terminal') {
  const reduceMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduceMotion) {
    const fullText = heroTitle.textContent; // 上面已套用過語言，這裡拿到的是目前語言的標題
    const delay = currentLang === 'en' ? 60 : 120; // 英文字數多，打快一點
    heroTitle.setAttribute('aria-label', fullText); // 打字過程中螢幕閱讀器仍讀到完整標題
    heroTitle.textContent = '';

    let i = 0;
    const typeNext = () => {
      i += 1;
      heroTitle.textContent = fullText.slice(0, i);
      if (i < fullText.length) {
        heroTypingTimer = setTimeout(typeNext, delay);
      } else {
        heroTypingTimer = null;
        heroTitle.removeAttribute('aria-label');
      }
    };
    heroTypingTimer = setTimeout(typeNext, 300);
  }
}

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
const gradEmpty = document.getElementById('gradEmpty');

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

    // 篩選結果為 0 人時顯示提示，避免畫面一片空白像是壞掉
    if (gradEmpty) {
      gradEmpty.hidden = [...gradItems].some((item) => !item.classList.contains('hidden'));
    }
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
