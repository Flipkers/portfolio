let currentLang = localStorage.getItem('portfolio-lang') || 'ru';

let profile = null;
let testTasks = [];
let cases = [];
let launches = [];

const i18n = {
  ru: {
    'brand': 'Леонид Михалев',
    'nav.menu': 'Меню',
    'nav.close': 'Закрыть',
    'lang.switch': 'Переключить язык',
    'nav.about': 'Обо мне',
    'nav.services': 'Что я делаю',
    'nav.cases': 'Исследования',
    'nav.launches': 'Запуски',
    'nav.tests': 'Тестовые',
    'nav.contacts': 'Контакты',
    'services.title': 'Что я делаю',
    'cases.title': 'Исследования',
    'launches.title': 'Запуски',
    'tests.title': 'Тестовые задания',
    'contacts.title': 'Контакты',
    'contacts.email': 'Почта',
    'contacts.telegram': 'Telegram',
    'contacts.linkedin': 'LinkedIn',
    'doc.description': 'Леонид Михалев — продуктовый исследователь и консультант',
    'case.back': '← К портфолио',
    'case.loading': 'Загрузка…',
    'case.missing': 'Кейс не найден.',
    'case.noImage': 'Нет изображения',
    'hero.role': 'Продуктовый\nисследователь',
    'doc.title': 'Леонид Михалев — Исследователь-аналитик',
    'grid.showAll': 'Показать все',
    'grid.showLess': 'Свернуть'
  },
  en: {
    'brand': 'Leonid Mikhalev',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'lang.switch': 'Switch language',
    'nav.about': 'About',
    'nav.services': 'What I do',
    'nav.cases': 'Research',
    'nav.launches': 'Launches',
    'nav.tests': 'Test tasks',
    'nav.contacts': 'Contacts',
    'services.title': 'What I do',
    'cases.title': 'Research',
    'launches.title': 'Launches',
    'tests.title': 'Test tasks',
    'contacts.title': 'Contacts',
    'contacts.email': 'Email',
    'contacts.telegram': 'Telegram',
    'contacts.linkedin': 'LinkedIn',
    'doc.description': 'Leonid Mikhalev — product researcher and consultant',
    'case.back': '← Back to portfolio',
    'case.loading': 'Loading…',
    'case.missing': 'Case not found.',
    'case.noImage': 'No image',
    'hero.role': 'Product\nResearcher',
    'doc.title': 'Leonid Mikhalev — Product Researcher & Analyst',
    'grid.showAll': 'Show all',
    'grid.showLess': 'Show less'
  }
};

function t(key) {
  return (i18n[currentLang] && i18n[currentLang][key]) || (i18n.ru[key] || key);
}

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function absoluteUrl(src) {
  try {
    return new URL(src, window.location.href).href;
  } catch (_) {
    return src;
  }
}

// Article files live in case/ and test/, so their assets are one level up.
function siteRoot() {
  return (document.body && document.body.getAttribute('data-root')) || '';
}

function asset(path) {
  if (!path || /^(https?:|data:|mailto:|#)/i.test(path)) return path;
  return siteRoot() + String(path).replace(/^\.\//, '');
}

function articleId() {
  const fromQuery = new URLSearchParams(window.location.search).get('id');
  if (fromQuery) return fromQuery;
  return (document.body && document.body.getAttribute('data-article-id')) || '';
}

function setPageMeta({ title, description, image }) {
  if (title) document.title = title;
  if (description) upsertMeta('name', 'description', description);
  upsertMeta('property', 'og:title', title || document.title);
  if (description) upsertMeta('property', 'og:description', description);
  if (image) upsertMeta('property', 'og:image', absoluteUrl(image));
  upsertMeta('property', 'og:type', document.body.classList.contains('case-page') ? 'article' : 'website');
  upsertMeta('property', 'og:locale', currentLang === 'ru' ? 'ru_RU' : 'en_US');
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
  if (!document.body.classList.contains('case-page')) {
    const portrait = document.querySelector('.hero-photo img');
    setPageMeta({
      title: t('doc.title'),
      description: t('doc.description'),
      image: portrait ? portrait.getAttribute('src') : ''
    });
  }
  syncNavToggle();
}

let navScrollY = 0;
let navScrollLocked = false;

function menuIsOverlay() {
  return window.matchMedia('(max-width: 720px)').matches;
}

function lockNavScroll() {
  if (navScrollLocked || !menuIsOverlay()) return;
  navScrollLocked = true;
  navScrollY = window.scrollY || 0;
  const body = document.body;
  body.style.position = 'fixed';
  body.style.top = `-${navScrollY}px`;
  body.style.left = '0';
  body.style.right = '0';
  body.style.width = '100%';
}

function unlockNavScroll() {
  if (!navScrollLocked) return;
  const y = navScrollY;
  navScrollLocked = false;
  const body = document.body;
  body.style.position = '';
  body.style.top = '';
  body.style.left = '';
  body.style.right = '';
  body.style.width = '';
  window.scrollTo(0, y);
}

function navFocusable() {
  const header = document.querySelector('header');
  if (!header) return [];
  return [...header.querySelectorAll('a[href], button:not([disabled])')].filter((el) => {
    return el.getClientRects().length > 0;
  });
}

function syncMenuAria(open) {
  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!btn || !nav) return;
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  btn.setAttribute('aria-label', open ? t('nav.close') : t('nav.menu'));
  if (!menuIsOverlay()) {
    nav.removeAttribute('role');
    nav.removeAttribute('aria-modal');
    nav.removeAttribute('aria-hidden');
    return;
  }
  if (open) {
    nav.setAttribute('role', 'dialog');
    nav.setAttribute('aria-modal', 'true');
    nav.removeAttribute('aria-hidden');
  } else {
    nav.removeAttribute('role');
    nav.removeAttribute('aria-modal');
    nav.setAttribute('aria-hidden', 'true');
  }
}

function setMenuInert(nav, open) {
  if (!menuIsOverlay() || open) nav.removeAttribute('inert');
  else nav.setAttribute('inert', '');
}

function setNavOpen(open) {
  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!btn || !nav) return;
  const wasOpen = nav.classList.contains('is-open');
  if (open) setMenuInert(nav, true);
  nav.classList.toggle('is-open', open);
  document.documentElement.classList.toggle('nav-open', open);
  syncMenuAria(open);
  if (!open) setMenuInert(nav, false);
  const main = document.querySelector('main');
  if (main) main.toggleAttribute('inert', open);
  if (open && !wasOpen) {
    lockNavScroll();
    const first = nav.querySelector('.nav-links a');
    if (first) first.focus({ preventScroll: true });
  }
  if (!open && wasOpen) unlockNavScroll();
}

function syncNavToggle() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  syncMenuAria(nav.classList.contains('is-open'));
}

function bindNavToggleOnce() {
  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!btn || !nav || btn.dataset.bound) return;
  btn.dataset.bound = '1';
  syncMenuAria(false);
  setMenuInert(nav, false);
  btn.addEventListener('click', () => {
    setNavOpen(!nav.classList.contains('is-open'));
  });
  nav.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    setNavOpen(false);
    if (!href.startsWith('#')) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
  window.matchMedia('(min-width: 721px)').addEventListener('change', (event) => {
    if (event.matches) setNavOpen(false);
    else syncNavToggle();
  });
}

function mediaBlock(image, title, width, height) {
  const label = escapeHtml(t('case.noImage'));
  const w = Number(width);
  const h = Number(height);
  const dims = w > 0 && h > 0 ? ` width="${w}" height="${h}"` : '';
  if (image) {
    return `<img class="card-media" src="${escapeAttr(image)}" alt="${escapeAttr(title)}"${dims} loading="lazy" onerror="this.outerHTML='<div class=\\'card-media placeholder\\' aria-hidden=\\'true\\'>${label}</div>'">`;
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

function metaLine(item) {
  const tags = (item.tags || []).join(', ');
  return item.year ? `${item.year} · ${tags}` : tags;
}

function cardImage(item) {
  return asset((item && (item.thumb || item.image)) || '');
}

function cardMarkup(item, href) {
  const title = pick(item, 'title');
  const summary = pick(item, 'summary');
  const tags = (item.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('');
  const year = item.year ? `<div class="year">${escapeHtml(String(item.year))}</div>` : '';
  const tagBlock = tags ? `<div class="tags">${tags}</div>` : '';
  return `<a class="card" href="${href}">${mediaBlock(cardImage(item), title, item.thumb_width, item.thumb_height)}<div class="card-body">${year}<h3>${escapeHtml(title)}</h3><p>${escapeHtml(summary)}</p>${tagBlock}</div></a>`;
}

function renderTests() {
  const grid = document.getElementById('tests-grid');
  if (!grid) return;
  grid.innerHTML = testTasks.map((item) => cardMarkup(item, `test/${encodeURIComponent(item.id)}.html`)).join('');
}

function renderCases() {
  const grid = document.getElementById('cases-grid');
  if (!grid) return;
  grid.innerHTML = cases.map((item) => cardMarkup(item, `case/${encodeURIComponent(item.id)}.html`)).join('');
}

function renderLaunches() {
  const grid = document.getElementById('launches-grid');
  if (!grid) return;
  grid.innerHTML = launches.map((item) => cardMarkup(item, `case/${encodeURIComponent(item.id)}.html`)).join('');
}

const FOLD_GRIDS = ['cases-grid', 'launches-grid', 'tests-grid'];
const FOLD_LIMIT = 2;

function syncCardFolds() {
  FOLD_GRIDS.forEach((id) => {
    const grid = document.getElementById(id);
    const section = grid && grid.parentElement;
    if (!grid || !section) return;
    const extra = grid.querySelectorAll(':scope > .card').length > FOLD_LIMIT;
    let btn = section.querySelector(':scope > .grid-toggle');
    if (!extra) {
      if (btn) btn.remove();
      section.classList.remove('is-expanded');
      return;
    }
    if (!btn) {
      btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'grid-toggle';
      btn.setAttribute('aria-controls', id);
      grid.insertAdjacentElement('afterend', btn);
      btn.addEventListener('click', () => {
        const open = section.classList.toggle('is-expanded');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.textContent = t(open ? 'grid.showLess' : 'grid.showAll');
        if (!open && btn.getBoundingClientRect().top < 80) {
          btn.scrollIntoView({ block: 'end' });
        }
      });
    }
    const open = section.classList.contains('is-expanded');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.textContent = t(open ? 'grid.showLess' : 'grid.showAll');
  });
}

function setContact(id, href) {
  const link = document.getElementById(id);
  if (!link || !href) return;
  link.href = href;
}

function renderHome() {
  if (!profile) return;

  const bioEl = document.getElementById('bio');
  if (bioEl) bioEl.textContent = currentLang === 'ru' ? profile.meta.bio_ru : profile.meta.bio_en;

  const servicesEl = document.getElementById('services-list');
  if (servicesEl) {
    const columns = currentLang === 'ru' ? profile.services_ru : profile.services_en;
    servicesEl.innerHTML = columns.map((col) => `
      <div class="service-col">
        <h3>${escapeHtml(col.title)}</h3>
        <ul>
          ${col.items.map((name) => `<li>${escapeHtml(name)}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  if (profile.meta.email) setContact('email-link', `mailto:${profile.meta.email}`);
  if (profile.meta.telegram) setContact('telegram-link', profile.meta.telegram);
  if (profile.meta.linkedin) setContact('linkedin-link', profile.meta.linkedin);

  applyI18n();
  renderTests();
  renderCases();
  renderLaunches();
  syncCardFolds();

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
    ${item.image ? `<img class="modal-body-image" src="${escapeAttr(asset(item.image))}" alt="">` : `<div class="card-media placeholder" style="margin-bottom:16px">${t('case.noImage')}</div>`}
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
      const nav = document.getElementById('site-nav');
      const menuOpen = nav && nav.classList.contains('is-open');
      if (e.key === 'Tab' && menuOpen) {
        const items = navFocusable();
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        const index = items.indexOf(document.activeElement);
        if (e.shiftKey) {
          if (index <= 0) {
            e.preventDefault();
            last.focus();
          }
        } else if (index < 0 || index === items.length - 1) {
          e.preventDefault();
          first.focus();
        }
        return;
      }
      if (menuOpen && ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
        const scrollingNav = nav.scrollHeight > nav.clientHeight + 1;
        const inNav = nav.contains(document.activeElement);
        if (!(scrollingNav && inNav && e.key !== ' ' && e.key !== 'Home' && e.key !== 'End')) {
          if (!(e.key === ' ' && document.activeElement && document.activeElement.closest('button'))) {
            e.preventDefault();
          }
        }
      }
      if (e.key !== 'Escape') return;
      if (menuOpen) {
        setNavOpen(false);
        document.querySelector('.nav-toggle')?.focus({ preventScroll: true });
        return;
      }
      closeModal();
    });
    document.addEventListener('touchmove', (event) => {
      const nav = document.getElementById('site-nav');
      if (!nav || !nav.classList.contains('is-open')) return;
      const canScrollNav = nav.scrollHeight > nav.clientHeight + 1
        && event.target instanceof Node
        && nav.contains(event.target);
      if (canScrollNav) return;
      event.preventDefault();
    }, { capture: true, passive: false });
    document.addEventListener('wheel', (event) => {
      const nav = document.getElementById('site-nav');
      if (!nav || !nav.classList.contains('is-open')) return;
      if (nav.scrollHeight > nav.clientHeight + 1 && event.target instanceof Node && nav.contains(event.target)) {
        nav.scrollTop += event.deltaY;
      }
      event.preventDefault();
    }, { capture: true, passive: false });
  }

  bindNavToggleOnce();
}

/** Minimal Markdown → HTML (headings, lists, tables, paragraphs, bold, images, links). */
function renderMarkdown(md, basePath) {
  const lines = String(md || '').replace(/\r\n/g, '\n').split('\n');
  const html = [];
  const structure = !document.body.classList.contains('test-page');
  let listIndents = [];
  let liOpen = false;
  let paragraph = [];

  const isRule = (value) => /^([-*_])\1{2,}$/.test(value);
  const isTableRow = (value) => value.startsWith('|') && value.endsWith('|');
  const isTableRule = (value) => /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(value);
  const tableCells = (value) => value.replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim());
  const wordCount = (value) => value.trim().split(/\s+/).filter(Boolean).length;

  const numberedTitle = (text) => {
    const match = text.match(/^(\d+)\.\s+(\S[\s\S]*)$/);
    if (!match) return null;
    const title = match[2].trim();
    if (title.length > 90 || wordCount(title) > 12 || /\.\s+\S/.test(title)) return null;
    return title;
  };

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const text = paragraph.join(' ').trim();
    paragraph = [];
    if (!text) return;
    if (structure && numberedTitle(text)) {
      html.push(`<p class="step">${inlineMarkdown(text, basePath)}</p>`);
      return;
    }
    if (structure && /^\d+\.\s+\S/.test(text)) {
      html.push(`<p class="step-line">${inlineMarkdown(text, basePath)}</p>`);
      return;
    }
    html.push(`<p>${inlineMarkdown(text, basePath)}</p>`);
  };

  const closeLi = () => {
    if (!liOpen) return;
    html.push('</li>');
    liOpen = false;
  };

  const closeList = () => {
    closeLi();
    while (listIndents.length) {
      html.push('</ul>');
      listIndents.pop();
      closeLi();
    }
  };

  const openLi = (text) => {
    html.push(`<li>${inlineMarkdown(text, basePath)}`);
    liOpen = true;
  };

  const isCaption = (value, alt) => {
    if (!value || isRule(value) || value.startsWith('|') || value.startsWith('![')) return false;
    if (/^(#{1,3}\s|[-*]\s|\d+\.\s)/.test(value) || value.endsWith(':')) return false;
    const same = alt && value.replace(/\s+/g, ' ').trim().toLowerCase() === alt.replace(/\s+/g, ' ').trim().toLowerCase();
    if (same) return true;
    return value.length <= 80 && wordCount(value) <= 14;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trimEnd();
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('<!--') || trimmed === '<aside>' || trimmed === '</aside>' || isRule(trimmed)) {
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
        const headers = rows[0];
        const head = headers.map((cell) => `<th>${inlineMarkdown(cell, basePath)}</th>`).join('');
        const body = rows.slice(1).map((row) => {
          const cells = headers.map((header, index) => {
            const label = header ? ` data-label="${escapeAttr(header)}"` : '';
            return `<td${label}>${inlineMarkdown(row[index] || '', basePath)}</td>`;
          }).join('');
          return `<tr>${cells}</tr>`;
        }).join('');
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

    const imageLine = structure && trimmed.match(/^!\[([^\]]*)\]\((.+?)\)$/);
    if (imageLine) {
      flushParagraph();
      closeList();
      let caption = '';
      let j = i + 1;
      while (j < lines.length && !lines[j].trim()) j += 1;
      if (j < lines.length && isCaption(lines[j].trim(), imageLine[1])) {
        caption = lines[j].trim();
        i = j;
      }
      const url = resolveCaseAsset(imageLine[2], basePath);
      const cap = caption ? `<figcaption>${inlineMarkdown(caption, basePath)}</figcaption>` : '';
      html.push(`<figure><img src="${escapeAttr(url)}" alt="${escapeAttr(imageLine[1])}" loading="lazy">${cap}</figure>`);
      continue;
    }

    const bullet = line.match(/^(\s*)[-*]\s+(.+)$/);
    if (bullet && structure) {
      flushParagraph();
      const indent = bullet[1].replace(/\t/g, '    ').length;
      const text = bullet[2].trim();
      if (!listIndents.length) {
        html.push('<ul>');
        listIndents.push(indent);
        openLi(text);
      } else if (indent > listIndents[listIndents.length - 1]) {
        html.push('<ul>');
        listIndents.push(indent);
        openLi(text);
      } else {
        closeLi();
        while (listIndents.length > 1 && indent < listIndents[listIndents.length - 1]) {
          html.push('</ul>');
          listIndents.pop();
          closeLi();
        }
        openLi(text);
      }
      continue;
    }

    const flatBullet = trimmed.match(/^[-*]\s+(.+)$/);
    if (flatBullet) {
      flushParagraph();
      if (!listIndents.length) {
        html.push('<ul>');
        listIndents.push(0);
      } else {
        closeLi();
      }
      openLi(flatBullet[1]);
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
  const basePath = asset(item.path || `cases/${item.id}`);
  const candidates = currentLang === 'ru'
    ? [`${basePath}/index.ru.md`, `${basePath}/index.md`]
    : [`${basePath}/index.md`, `${basePath}/index.ru.md`];

  for (const url of candidates) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
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
  const id = articleId();
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
    setPageMeta({ title: t('case.missing'), description: t('case.missing') });
    return;
  }

  const title = pick(item, 'title');
  const person = currentLang === 'ru' ? profile.meta.name : profile.meta.name_en;
  const coverSrc = item.image ? asset(item.image) : '';
  setPageMeta({
    title: `${title} — ${person}`,
    description: pick(item, 'summary') || title,
    image: coverSrc
  });

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

  const cover = coverSrc
    ? `<img class="case-cover" src="${escapeAttr(coverSrc)}" alt="" onerror="this.outerHTML='<div class=\\'case-cover placeholder\\'>${escapeHtml(t('case.noImage'))}</div>'">`
    : `<div class="case-cover placeholder">${t('case.noImage')}</div>`;

  article.innerHTML = `
    <h1>${escapeHtml(title)}</h1>
    <p class="case-meta">${escapeHtml(metaLine(item))}</p>
    ${cover}
    <div class="case-body">${bodyHtml}</div>
  `;
  fitArticleTables(article);
}

function fitArticleTables(root) {
  if (!root) return;
  const wraps = [...root.querySelectorAll('.table-wrap')];
  wraps.forEach((wrap) => wrap.classList.remove('is-stacked'));
  wraps.forEach((wrap) => {
    const table = wrap.querySelector('table');
    if (table && table.scrollWidth > wrap.clientWidth + 8) wrap.classList.add('is-stacked');
  });
}

function bindTableFitOnce() {
  if (document.body.dataset.tableFit) return;
  document.body.dataset.tableFit = '1';
  let frame = 0;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => fitArticleTables(document.getElementById('case-article')));
  });
}

async function loadData() {
  const [profileRes, casesRes, launchesRes, testsRes] = await Promise.all([
    fetch(asset('data/profile.json'), { cache: 'no-store' }),
    fetch(asset('data/cases.json'), { cache: 'no-store' }),
    fetch(asset('data/launches.json'), { cache: 'no-store' }),
    fetch(asset('data/tests.json'), { cache: 'no-store' })
  ]);

  if (!profileRes.ok || !casesRes.ok || !launchesRes.ok || !testsRes.ok) {
    throw new Error('Failed to load data/*.json');
  }

  profile = await profileRes.json();
  cases = (await casesRes.json()).slice().sort((a, b) => b.year - a.year);
  launches = await launchesRes.json();
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
    bindTableFitOnce();
    await renderDetailPage(testTasks);
  } else if (document.body.classList.contains('case-page')) {
    bindTableFitOnce();
    await renderDetailPage(cases.concat(launches));
  } else {
    bindHomeEventsOnce();
    renderHome();
  }
});
