let currentLang = 'ru';

const profile = {
  meta: { name: "Леонид Михалев", name_en: "Leonid Mikhalev" },
  services_ru: ["Market Research", "Market Sizing (TAM/SAM/SOM)", "Competitor Analysis", "Industry Analysis", "Customer Segmentation", "Product Positioning", "Go-To-Market Research"],
  services_en: ["Market Research", "Market Sizing (TAM/SAM/SOM)", "Competitor Analysis", "Industry Analysis", "Customer Segmentation", "Product Positioning", "Go-To-Market Research"]
};

const courses = [
  { name_ru: "Product Discovery", name_en: "Product Discovery", progress: 70 },
  { name_ru: "Market Research Advanced", name_en: "Market Research Advanced", progress: 45 },
  { name_ru: "JTBD Framework", name_en: "JTBD Framework", progress: 90 }
];

const testTasks = [
  { year: 2025, tags: ["Crypto"], title_ru: "Квартальный Roadmap для B2Broker", title_en: "Quarterly Roadmap for B2Broker", summary_ru: "Квартальный roadmap для B2Broker.", summary_en: "Quarterly roadmap for B2Broker.", image: "" },
  { year: 2025, tags: ["Gaming"], title_ru: "Решение кейсов для Lesta Games", title_en: "Case solutions for Lesta Games", summary_ru: "Решение кейсов для Lesta Games.", summary_en: "Case solutions for Lesta Games.", image: "" },
  { year: 2025, tags: ["AI"], title_ru: "Техническая спецификация для Soul Publishing", title_en: "Technical specification for Soul Publishing", summary_ru: "Техническая спецификация для Soul Publishing.", summary_en: "Technical specification for Soul Publishing.", image: "" },
  { year: 2025, tags: ["AI"], title_ru: "Product Discovery для AI Startup", title_en: "Product Discovery for AI Startup", summary_ru: "Product Discovery для нового продукта в AI-стартапе.", summary_en: "Product Discovery for a new product in an AI startup.", image: "" },
  { year: 2024, tags: ["Fintech"], title_ru: "Designing automatic invoice collection for FINOM", title_en: "Designing automatic invoice collection for FINOM", summary_ru: "Техническая спецификация системы автоматического сбора инвойсов для FINOM.", summary_en: "Created a technical specification for FINOM's automatic invoice collection system.", image: "" },
  { year: 2024, tags: ["Fintech"], title_ru: "Designing mobile onboarding for Salmon Credit Line", title_en: "Designing mobile onboarding for Salmon Credit Line", summary_ru: "Мобильный онбординг для Salmon Credit Line.", summary_en: "Developed a comprehensive mobile onboarding process for Salmon Credit Line.", image: "" }
];

const cases = [
  {
    id: "peopledo", year: 2025, tags: ["gigeconomy"],
    title_ru: "PeopleDo Discovery", title_en: "PeopleDo Discovery",
    summary_ru: "Исследование комиссий и выплат фрилансерам на платформах.",
    summary_en: "Research on platform fees and freelancer payouts.",
    full_ru: `<h3>1. Где сидит комиссия?</h3>
<ul>
<li>Изучение комиссии, которую платит клиент</li>
<li>Сравнение с комиссией, которую платит фрилансер</li>
<li>Реальные примеры платформ. Плюсы и минусы с учётом регулирования в ОАЭ, Великобритании, ЕС и США</li>
</ul>
<p><strong>Definition of Done:</strong> продуктовые рекомендации с примерами реальных платформ и best practices.</p>

<h3>2. Выплаты фрилансерам</h3>
<ul>
<li>Хранение денег для фрилансеров и клиентов</li>
<li>Решение споров, отправка денег на банковские счета и т.д.</li>
<li>Реальные примеры платформ. Плюсы и минусы</li>
<li>Опросник для внешних исследователей + оценка результатов</li>
</ul>
<p><strong>Definition of Done:</strong> примеры реальных платформ, best practices и user flow диаграммы.</p>

<h3>3. Подписочная модель</h3>
<ul>
<li>Воронка списания с фрилансеров/клиентов</li>
<li>Реальные примеры платформ. Плюсы и минусы</li>
<li>UX-практики, value proposition и т.д.</li>
</ul>
<p><strong>Definition of Done:</strong> UX-референсы и best practices по разработке.</p>`,
    full_en: `<h3>1. Where does the fee sit?</h3>
<ul>
<li>Exploring client-paid commission</li>
<li>Comparing it to freelancer-paid commission</li>
<li>Actual examples of the platforms. Pros and cons, considering possible regulations in the UAE, UK, EU, and US.</li>
</ul>
<p><strong>Definition of Done:</strong> product recommendations with examples of real platforms and best practices.</p>

<h3>2. Paying money to freelancers</h3>
<ul>
<li>Holding money for freelancers and clients</li>
<li>Solving disputes, sending money to bank accounts, etc.</li>
<li>Actual examples of the platforms. Pros, cons.</li>
</ul>
<p><strong>Definition of Done:</strong> examples of real platforms, best practices and user flow diagrams.</p>

<h3>3. Charging for subscription</h3>
<ul>
<li>Funnel for charging freelancers/clients</li>
<li>Actual examples of the platforms. Pros, cons.</li>
<li>UX practices, value proposition, etc.</li>
</ul>
<p><strong>Definition of Done:</strong> UX references and best development practices.</p>`,
    image: "https://flipkers.notion.site/image/attachment%3Aece38885-1fda-4990-beff-3de443d19c69%3Aimage.png?table=block&id=32244bc3-f6b4-803b-a75d-d1bfa94d2e41&spaceId=cdb9f7bf-c81f-428c-a5e7-4faf15b9204e&width=800&userId=&cache=v2"
  },
  {
    id: "gtm-crypto", year: 2024, tags: ["Crypto"],
    title_ru: "GTM Strategy for Crypto Investment Fund", title_en: "GTM Strategy for Crypto Investment Fund",
    summary_ru: "Комплексная go-to-market стратегия для криптоинвестфонда на основе лучших мировых практик.",
    summary_en: "Developed a comprehensive go-to-market strategy for a crypto investment fund by researching global best practices.",
    image: "https://flipkers.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fcdb9f7bf-c81f-428c-a5e7-4faf15b9204e%2F1c4baffc-50b8-41c7-be21-c295fdcbc2dc%2F9.png?table=block&id=32244bc3-f6b4-81cf-aaa6-fa0e31cbf870&spaceId=cdb9f7bf-c81f-428c-a5e7-4faf15b9204e&width=800&userId=&cache=v2"
  },
  {
    id: "latam", year: 2024, tags: ["Fintech"],
    title_ru: "Market Discovery: экспансия в Латинскую Америку", title_en: "Market Discovery for a Tech Startup Expansion in Latin America",
    summary_ru: "Анализ 5 стран Латинской Америки для запуска финтех-стартапа. Рекомендация — Аргентина.",
    summary_en: "Conducted market research on five Latin American countries for a fintech expansion. Identified Argentina as the best opportunity.",
    image: "https://flipkers.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fcdb9f7bf-c81f-428c-a5e7-4faf15b9204e%2F6816d81d-51f7-4085-8ccf-6032f5c94a6e%2FProduct_cases_presentation.png?table=block&id=32244bc3-f6b4-81a0-8d8c-f76164c8c300&spaceId=cdb9f7bf-c81f-428c-a5e7-4faf15b9204e&width=800&userId=&cache=v2"
  },
  {
    id: "dao", year: 2023, tags: ["Crypto"],
    title_ru: "Что такое DAO и как запустить", title_en: "What is DAO and how to launch one",
    summary_ru: "Исследование DAO-платформ и инвестиционных DAO для запуска фонда.",
    summary_en: "Conducted comprehensive research on DAO platforms and investment-focused DAOs for a founder exploring a DAO-based fund.",
    image: "https://flipkers.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fcdb9f7bf-c81f-428c-a5e7-4faf15b9204e%2F382ac706-0bf4-4ac2-aadc-4cc522841fbb%2F10.png?table=block&id=32244bc3-f6b4-8108-aba3-fdd24c91d6c5&spaceId=cdb9f7bf-c81f-428c-a5e7-4faf15b9204e&width=800&userId=&cache=v2"
  },
  {
    id: "philippines", year: 2024, tags: ["Fintech"],
    title_ru: "Регулирование платёжных провайдеров на Филиппинах", title_en: "Market Research on Payment Provider Regulations in the Philippines",
    summary_ru: "Анализ регулирования платёжных провайдеров и лицензирования на Филиппинах.",
    summary_en: "In-depth analysis of the Philippine market focusing on central bank regulations concerning payment provider licenses.",
    image: ""
  },
  {
    id: "merchant-onboarding", year: 2023, tags: ["Fintech"],
    title_ru: "Designing merchant onboarding", title_en: "Designing merchant onboarding",
    summary_ru: "Переработка процесса онбординга мерчантов для ускорения KYB.",
    summary_en: "Revamped the merchant onboarding process to expedite Know Your Business (KYB) procedures.",
    image: ""
  }
].sort((a, b) => b.year - a.year);

function renderCourses() {
  const el = document.getElementById('courses');
  const titleEl = document.getElementById('learning-title');
  if (titleEl) titleEl.textContent = currentLang === 'ru' ? 'Я учусь' : 'Studying';
  if (!el) return;
  el.innerHTML = courses.map(c => {
    const name = currentLang === 'ru' ? c.name_ru : c.name_en;
    return `<div class="course"><div class="course-name">${name}</div><div class="progress-bar"><div class="progress-fill" style="width:${c.progress}%"></div></div><div class="progress-text">${c.progress}%</div></div>`;
  }).join('');
}

function renderTests() {
  const grid = document.getElementById('tests-grid');
  if (!grid) return;
  grid.innerHTML = testTasks.map(t => {
    const title = currentLang === 'ru' ? t.title_ru : t.title_en;
    const summary = currentLang === 'ru' ? t.summary_ru : t.summary_en;
    const tags = t.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    const img = t.image ? `<img src="${t.image}" alt="${title}" loading="lazy" onerror="this.style.display='none'">` : '';
    return `<div class="card">${img}<div class="year">${t.year}</div><h3>${title}</h3><p>${summary}</p><div class="tags">${tags}</div></div>`;
  }).join('');
}

function render() {
  const nameEl = document.getElementById('name');
  const bioEl = document.getElementById('bio');
  if (nameEl) nameEl.textContent = currentLang === 'ru' ? profile.meta.name : profile.meta.name_en;
  if (bioEl) {
    bioEl.textContent = currentLang === 'ru'
      ? "Я продуктовый исследователь и консультант с опытом в разных доменах, от финтеха до healthtech. Помогаю компаниям принимать стратегические решения через анализ рынка, исследование конкурентов и разработку продуктового позиционирования."
      : "I am a product researcher and consultant with experience across domains from fintech to healthtech. I help companies make strategic decisions through market analysis, competitor research, and product positioning.";
  }

  const navLinks = document.querySelectorAll('header nav a');
  const navTexts = currentLang === 'ru'
    ? ['Обо мне', 'Что я делаю', 'Исследования', 'Тестовые', 'Я учусь', 'Контакты']
    : ['About', 'What I do', 'Research', 'Test tasks', 'Studying', 'Contacts'];
  navLinks.forEach((a, i) => { if (navTexts[i]) a.textContent = navTexts[i]; });

  const servicesHeading = document.querySelector('#services h2');
  if (servicesHeading) servicesHeading.textContent = currentLang === 'ru' ? 'Что я делаю' : 'What I do';

  const testsTitle = document.getElementById('tests-title');
  if (testsTitle) testsTitle.textContent = currentLang === 'ru' ? 'Тестовые задания' : 'Test tasks';

  const servicesEl = document.getElementById('services-list');
  if (servicesEl) {
    const services = currentLang === 'ru' ? profile.services_ru : profile.services_en;
    servicesEl.innerHTML = services.map(s => `<span>${s}</span>`).join('');
  }

  renderCourses();
  renderTests();

  const grid = document.getElementById('cases-grid');
  if (grid) {
    grid.innerHTML = cases.map((cs, idx) => {
      const title = currentLang === 'ru' ? cs.title_ru : cs.title_en;
      const summary = currentLang === 'ru' ? cs.summary_ru : cs.summary_en;
      const tags = (cs.tags || []).map(t => `<span class="tag">${t}</span>`).join('');
      const img = cs.image ? `<img src="${cs.image}" alt="${title}" loading="lazy" onerror="this.style.display='none'">` : '';
      return `<div class="card" data-idx="${idx}">${img}<div class="year">${cs.year}</div><h3>${title}</h3><p>${summary}</p><div class="tags">${tags}</div></div>`;
    }).join('');

    document.querySelectorAll('.card[data-idx]').forEach(card => {
      card.addEventListener('click', () => {
        const cs = cases[card.dataset.idx];
        const title = currentLang === 'ru' ? cs.title_ru : cs.title_en;
        const full = currentLang === 'ru' ? (cs.full_ru || summary) : (cs.full_en || summary);
        document.getElementById('modal-body').innerHTML = `
          <h2>${title}</h2>
          <p style="color:#666;margin:8px 0 16px">${cs.year} · ${cs.tags.join(', ')}</p>
          ${cs.image ? `<img src="${cs.image}" style="width:100%;border-radius:8px;margin-bottom:16px">` : ''}
          <div style="line-height:1.6">${full}</div>
        `;
        document.getElementById('modal').classList.add('open');
      });
    });
  }

  const toggle = document.getElementById('lang-toggle');
  if (toggle) toggle.textContent = currentLang === 'ru' ? 'EN' : 'RU';
}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('lang-toggle');
  if (toggle) toggle.addEventListener('click', () => { currentLang = currentLang === 'ru' ? 'en' : 'ru'; render(); });
  const modalClose = document.getElementById('modal-close');
  if (modalClose) modalClose.addEventListener('click', () => document.getElementById('modal').classList.remove('open'));
  const modal = document.getElementById('modal');
  if (modal) modal.addEventListener('click', (e) => { if (e.target.id === 'modal') modal.classList.remove('open'); });
  render();
});
