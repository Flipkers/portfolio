let currentLang = localStorage.getItem('portfolio-lang') || 'ru';

let profile = null;
let courses = [];
let testTasks = [];
let cases = [];

const i18n = {
  ru: {
    'brand': 'Леонид Михалев',
    'nav.menu': 'Меню',
    'nav.close': 'Закрыть',
    'nav.about': 'Обо мне',
    'nav.services': 'Что я делаю',
    'nav.cases': 'Исследования',
    'nav.tests': 'Тестовые',
    'nav.learning': 'Я учусь',
    'nav.contacts': 'Контакты',
    'services.title': 'Что я делаю',
    'cases.title': 'Исследования',
    'tests.title': 'Тестовые задания',
    'learning.title': 'Я учусь',
    'contacts.title': 'Контакты',
    'case.back': '← К портфолио',
    'case.loading': 'Загрузка…',
    'case.missing': 'Кейс не найден.',
    'case.noImage': 'Нет изображения',
    'doc.title': 'Леонид Михалев — Исследователь-аналитик'
  },
  en: {
    'brand': 'Leonid Mikhalev',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'nav.about': 'About',
    'nav.services': 'What I do',
    'nav.cases': 'Research',
    'nav.tests': 'Test tasks',
    'nav.learning': 'Studying',
    'nav.contacts': 'Contacts',
    'services.title': 'What I do',
    'cases.title': 'Research',
    'tests.title': 'Test tasks',
    'learning.title': 'Studying',
    'contacts.title': 'Contacts',
    'case.back': '← Back to portfolio',
    'case.loading': 'Loading…',
    'case.missing': 'Case not found.',
    'case.noImage': 'No image',
    'doc.title': 'Leonid Mikhalev — Product Researcher & Analyst'
  }
};

function t(key) {
  return (i18n[currentLang] && i18n[currentLang][key]) || (i18n.ru[key] || key);
}

function applyI18n() {
  document.documentElement.lang = currentLang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    if (el.hasAttribute('data-i18n-attr')) {
      el.setAttribute(el.getAttribute('data-i18n-attr'), t(key));
    } else {
      el.textContent = t(key);
    }
  });
  const pageTitle = document.querySelector('title');
  if (pageTitle && !document.body.classList.contains('case-page')) {
    pageTitle.textContent = t('doc.title');
  }
  syncNavToggle();
}

function setNavOpen(open) {
  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!btn || !nav) return;
  nav.classList.toggle('is-open', open);
  document.documentElement.classList.toggle('nav-open', open);
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  btn.setAttribute('aria-label', open ? t('nav.close') : t('nav.menu'));
  const main = document.querySelector('main');
  if (main) main.toggleAttribute('inert', open);
}

function syncNavToggle() {
  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!btn || !nav) return;
  const open = nav.classList.contains('is-open');
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  btn.setAttribute('aria-label', open ? t('nav.close') : t('nav.menu'));
}

function bindNavToggleOnce() {
  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!btn || !nav || btn.dataset.bound) return;
  btn.dataset.bound = '1';
  btn.addEventListener('click', () => {
    setNavOpen(!nav.classList.contains('is-open'));
  });
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) setNavOpen(false);
  });
}

function mediaBlock(image, title) {
  const label = escapeHtml(t('case.noImage'));
  if (image) {
    return `<img class="card-media" src="${escapeAttr(image)}" alt="${escapeAttr(title)}" loading="lazy" onerror="this.outerHTML='<div class=\\'card-media placeholder\\' aria-hidden=\\'true\\'>${label}</div>'">`;
  }
  return `<div class="card-media placeholder" aria-hidden="true">${label}</div>`;
}

function escapeAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function pick(item, field) {
  return currentLang === 'ru' ? item[`${field}_ru`] : item[`${field}_en`];
}

function renderCourses() {
  const el = document.getElementById('courses');
  if (!el) return;
  el.innerHTML = courses.map((c) => {
    const name = pick(c, 'name');
    return `<div class="course"><div class="course-name">${escapeHtml(name)}</div><div class="progress-bar"><div class="progress-fill" style="width:${c.progress}%"></div></div><div class="progress-text">${c.progress}%</div></div>`;
  }).join('');
}

function metaLine(item) {
  const tags = (item.tags || []).join(', ');
  return item.year ? `${item.year} · ${tags}` : tags;
}

function renderTests() {
  const grid = document.getElementById('tests-grid');
  if (!grid) return;
  grid.innerHTML = testTasks.map((item) => {
    const title = pick(item, 'title');
    const summary = pick(item, 'summary');
    const tags = (item.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('');
    const year = item.year ? `<div class="year">${escapeHtml(String(item.year))}</div>` : '';
    return `<a class="card" href="test.html?id=${encodeURIComponent(item.id)}">${mediaBlock(item.image, title)}<div class="card-body">${year}<h3>${escapeHtml(title)}</h3><p>${escapeHtml(summary)}</p></div><div class="tags">${tags}</div></a>`;
  }).join('');
}

function renderCases() {
  const grid = document.getElementById('cases-grid');
  if (!grid) return;
  grid.innerHTML = cases.map((cs) => {
    const title = pick(cs, 'title');
    const summary = pick(cs, 'summary');
    const tags = (cs.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('');
    return `<a class="card" href="case.html?id=${encodeURIComponent(cs.id)}">${mediaBlock(cs.image, title)}<div class="card-body"><div class="year">${cs.year}</div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(summary)}</p></div><div class="tags">${tags}</div></a>`;
  }).join('');
}

function renderHome() {
  if (!profile) return;

  const nameEl = document.getElementById('name');
  const bioEl = document.getElementById('bio');
  if (nameEl) nameEl.textContent = currentLang === 'ru' ? profile.meta.name : profile.meta.name_en;
  if (bioEl) bioEl.textContent = currentLang === 'ru' ? profile.meta.bio_ru : profile.meta.bio_en;

  const servicesEl = document.getElementById('services-list');
  if (servicesEl) {
    const services = currentLang === 'ru' ? profile.services_ru : profile.services_en;
    servicesEl.innerHTML = services.map((s) => `<span>${escapeHtml(s)}</span>`).join('');
  }

  const tg = document.getElementById('telegram-link');
  if (tg && profile.meta.telegram) tg.href = profile.meta.telegram;
  const li = document.getElementById('linkedin-link');
  if (li && profile.meta.linkedin) li.href = profile.meta.linkedin;

  applyI18n();
  renderCourses();
  renderTests();
  renderCases();

  const toggle = document.getElementById('lang-toggle');
  if (toggle) toggle.textContent = currentLang === 'ru' ? 'EN' : 'RU';
}

function openModal(item) {
  const modal = document.getElementById('modal');
  const body = document.getElementById('modal-body');
  if (!modal || !body || !item) return;

  const title = pick(item, 'title');
  const summary = pick(item, 'summary');
  const full = currentLang === 'ru'
    ? (item.full_ru || summary)
    : (item.full_en || summary);

  body.innerHTML = `
    <h2 id="modal-title">${escapeHtml(title)}</h2>
    <p class="modal-body-meta">${escapeHtml(String(item.year))} · ${escapeHtml((item.tags || []).join(', '))}</p>
    ${item.image ? `<img class="modal-body-image" src="${escapeAttr(item.image)}" alt="">` : `<div class="card-media placeholder" style="margin-bottom:16px">${t('case.noImage')}</div>`}
    <div class="modal-body-text">${full}</div>
  `;

  modal.hidden = false;
  modal.classList.add('open');
  const closeBtn = document.getElementById('modal-close');
  if (closeBtn) closeBtn.focus();
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.hidden = true;
}

function findById(list, id) {
  return list.find((item) => item.id === id);
}

function bindHomeEventsOnce() {
  const toggle = document.getElementById('lang-toggle');
  if (toggle && !toggle.dataset.bound) {
    toggle.dataset.bound = '1';
    toggle.addEventListener('click', () => {
      currentLang = currentLang === 'ru' ? 'en' : 'ru';
      localStorage.setItem('portfolio-lang', currentLang);
      renderHome();
    });
  }

  const testsGrid = document.getElementById('tests-grid');
  if (testsGrid && !testsGrid.dataset.bound) {
    testsGrid.dataset.bound = '1';
    const openFromCard = (card) => {
      if (!card || card.dataset.type !== 'test') return;
      const item = findById(testTasks, card.dataset.id);
      openModal(item);
    };
    testsGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      openFromCard(card);
    });
    testsGrid.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const card = e.target.closest('.card');
      if (!card) return;
      e.preventDefault();
      openFromCard(card);
    });
  }

  const modalClose = document.getElementById('modal-close');
  if (modalClose && !modalClose.dataset.bound) {
    modalClose.dataset.bound = '1';
    modalClose.addEventListener('click', closeModal);
  }

  const modal = document.getElementById('modal');
  if (modal && !modal.dataset.bound) {
    modal.dataset.bound = '1';
    modal.addEventListener('click', (e) => {
      if (e.target.id === 'modal') closeModal();
    });
  }

  if (!document.body.dataset.escapeBound) {
    document.body.dataset.escapeBound = '1';
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      const nav = document.getElementById('site-nav');
      if (nav && nav.classList.contains('is-open')) {
        setNavOpen(false);
        document.querySelector('.nav-toggle')?.focus();
        return;
      }
      closeModal();
    });
  }

  bindNavToggleOnce();
}

/** Minimal Markdown → HTML (headings, lists, tables, paragraphs, bold, images, links). */
function renderMarkdown(md, basePath) {
  const lines = String(md || '').replace(/\r\n/g, '\n').split('\n');
  const html = [];
  let inList = false;
  let paragraph = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const text = paragraph.join(' ').trim();
    if (text) html.push(`<p>${inlineMarkdown(text, basePath)}</p>`);
    paragraph = [];
  };

  const closeList = () => {
    if (!inList) return;
    html.push('</ul>');
    inList = false;
  };

  const isTableRow = (value) => value.startsWith('|') && value.endsWith('|');
  const isTableRule = (value) => /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(value);
  const tableCells = (value) => value.replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim());

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trimEnd();
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('<!--') || trimmed === '<aside>' || trimmed === '</aside>') {
      flushParagraph();
      closeList();
      continue;
    }

    if (isTableRow(trimmed)) {
      flushParagraph();
      closeList();
      const rows = [];
      while (i < lines.length && isTableRow(lines[i].trim())) {
        const row = lines[i].trim();
        if (!isTableRule(row)) rows.push(tableCells(row));
        i += 1;
      }
      i -= 1;
      if (rows.length) {
        const head = rows[0].map((cell) => `<th>${inlineMarkdown(cell, basePath)}</th>`).join('');
        const body = rows.slice(1).map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell, basePath)}</td>`).join('')}</tr>`).join('');
        html.push(`<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`);
      }
      continue;
    }

    const heading = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      closeList();
      const level = heading[1].length;
      html.push(`<h${level}>${inlineMarkdown(heading[2], basePath)}</h${level}>`);
      continue;
    }

    const bullet = trimmed.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      flushParagraph();
      if (!inList) {
        html.push('<ul>');
        inList = true;
      }
      html.push(`<li>${inlineMarkdown(bullet[1], basePath)}</li>`);
      continue;
    }

    closeList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  closeList();
  return html.join('\n');
}

function resolveCaseAsset(src, basePath) {
  if (!src || /^(https?:|data:|mailto:|#)/i.test(src)) return src;
  const clean = src.replace(/^\.\//, '');
  return `${basePath.replace(/\/$/, '')}/${clean}`;
}

function inlineMarkdown(text, basePath) {
  let out = escapeHtml(text);
  // Allow ')' inside filenames (Notion exports sometimes use _(3).png).
  out = out.replace(/!\[([^\]]*)\]\((.+?)\)(?=\s|$)/g, (_, alt, src) => {
    const url = resolveCaseAsset(src, basePath);
    return `<img src="${escapeAttr(url)}" alt="${escapeAttr(alt)}" loading="lazy">`;
  });
  out = out.replace(/(^|[^!])\[([^\]]+)\]\((.+?)\)(?=\s|$)/g, (_, pre, label, href) => {
    const url = resolveCaseAsset(href, basePath);
    return `${pre}<a href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  });
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return out;
}

/** Drop Notion fields already shown in the case header (year/tags + cover). */
function preprocessCaseMarkdown(md, item) {
  let text = String(md || '').replace(/\r\n/g, '\n');
  // Leading H1 duplicates the page title.
  text = text.replace(/^#\s+.+\n+/, '');
  // Industry / End Date (and RU labels) — already in case-meta.
  text = text.replace(/^(?:Industry|Индустрия)\s*:\s*.+\n+/im, '');
  text = text.replace(/^(?:End Date|Дата окончания)\s*:\s*.+\n+/im, '');
  text = text.replace(/^\s*\n+/, '');

  const coverName = (item.image || item.cover || '')
    .split('/')
    .pop()
    .split('?')[0]
    .toLowerCase();
  if (coverName) {
    const imgRe = new RegExp(
      `^!\\[[^\\]]*\\]\\((?:\\.\\/)?(?:images\\/)?${coverName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)\\s*\\n+`,
      'i'
    );
    text = text.replace(imgRe, '');
  }
  // Common Notion cover filename when catalog cover is the same file.
  text = text.replace(/^!\[[^\]]*\]\((?:\.\/)?(?:images\/)?image\.png\)\s*\n+/i, '');

  return text.trimStart();
}

async function loadCaseMarkdown(item) {
  const basePath = item.path || `cases/${item.id}`;
  const candidates = currentLang === 'ru'
    ? [`${basePath}/index.ru.md`, `${basePath}/index.md`]
    : [`${basePath}/index.md`, `${basePath}/index.ru.md`];

  for (const url of candidates) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const md = preprocessCaseMarkdown(await res.text(), item);
      return { html: renderMarkdown(md, basePath), basePath };
    } catch (_) {
      /* try next */
    }
  }

  const summary = pick(item, 'summary');
  return { html: `<p>${escapeHtml(summary)}</p>`, basePath };
}

async function renderDetailPage(list) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const article = document.getElementById('case-article');
  if (!article) return;

  const toggle = document.getElementById('lang-toggle');
  if (toggle && !toggle.dataset.bound) {
    toggle.dataset.bound = '1';
    toggle.addEventListener('click', () => {
      currentLang = currentLang === 'ru' ? 'en' : 'ru';
      localStorage.setItem('portfolio-lang', currentLang);
      renderDetailPage(list);
    });
  }

  applyI18n();
  if (toggle) toggle.textContent = currentLang === 'ru' ? 'EN' : 'RU';

  const item = findById(list, id);
  if (!item) {
    article.innerHTML = `<p class="case-error">${t('case.missing')}</p>`;
    document.title = t('case.missing');
    return;
  }

  const title = pick(item, 'title');
  const loaded = await loadCaseMarkdown(item);
  let bodyHtml = loaded.html
    .replace(/^<h1>[\s\S]*?<\/h1>\s*/i, '');

  // Safety: if body still starts with the same cover file as the header image, drop it.
  if (item.image) {
    const coverFile = item.image.split('/').pop().split('?')[0];
    const dupImg = new RegExp(
      `^<p>?<img[^>]+src=["'][^"']*${coverFile.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>\\s*</p>\\s*`,
      'i'
    );
    bodyHtml = bodyHtml.replace(dupImg, '');
  }

  const cover = item.image
    ? `<img class="case-cover" src="${escapeAttr(item.image)}" alt="" onerror="this.outerHTML='<div class=\\'case-cover placeholder\\'>${escapeHtml(t('case.noImage'))}</div>'">`
    : `<div class="case-cover placeholder">${t('case.noImage')}</div>`;

  article.innerHTML = `
    <h1>${escapeHtml(title)}</h1>
    <p class="case-meta">${escapeHtml(metaLine(item))}</p>
    ${cover}
    <div class="case-body">${bodyHtml}</div>
  `;
  document.title = `${title} — ${currentLang === 'ru' ? profile.meta.name : profile.meta.name_en}`;
}

async function loadData() {
  const [profileRes, coursesRes, casesRes, testsRes] = await Promise.all([
    fetch('data/profile.json'),
    fetch('data/courses.json'),
    fetch('data/cases.json'),
    fetch('data/tests.json')
  ]);

  if (!profileRes.ok || !coursesRes.ok || !casesRes.ok || !testsRes.ok) {
    throw new Error('Failed to load data/*.json');
  }

  profile = await profileRes.json();
  courses = await coursesRes.json();
  cases = (await casesRes.json()).slice().sort((a, b) => b.year - a.year);
  testTasks = await testsRes.json();
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadData();
  } catch (err) {
    console.error(err);
    const main = document.querySelector('main');
    if (main) {
      main.insertAdjacentHTML('afterbegin', '<p class="case-error">Could not load data/. Serve the site over HTTP (not file://).</p>');
    }
    return;
  }

  if (document.body.classList.contains('test-page')) {
    await renderDetailPage(testTasks);
  } else if (document.body.classList.contains('case-page')) {
    await renderDetailPage(cases);
  } else {
    bindHomeEventsOnce();
    renderHome();
  }
});
