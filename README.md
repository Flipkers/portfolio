# Portfolio

Минималистичное портфолио (static HTML/CSS/JS, GitHub Pages).

## Структура

- `index.html` — главная
- `case/<slug>.html` — страница кейса или запуска. В файле сразу стоят заголовок, описание и обложка этого материала, чтобы превью ссылки не брало главную. `case.html?id=<slug>` открывает ту же страницу.
- `test/<slug>.html` — тестовое задание, с тем же заголовком в файле. `test.html?id=<slug>` открывает ту же страницу.
- `style.css`, `main.js`, `favicon.svg`
- `data/` — каталог для сетки и прочего (`cases.json`, `profile.json`, `courses.json`, `tests.json`)
- `cases/<slug>/` — **текст и картинки кейса** (Markdown workflow)

### Конвенция кейса

```
cases/<slug>/
  meta.json
  index.md          # EN / основной язык
  index.ru.md       # RU (опционально)
  images/           # локальные ассеты из Notion Export
  SOURCE.md
```

Шаблон: `cases/_template/`. Новый кейс = копия шаблона + строка в `data/cases.json`, затем `python3 scripts/build-article-pages.py` (то же после правок заголовка, описания или обложки в `data/cases.json`, `data/launches.json`, `data/tests.json`).

## Локально

```bash
python3 -m http.server 8765
# http://127.0.0.1:8765/
```

Нужен HTTP (не `file://`), потому что данные грузятся через `fetch`.

## Деплой

GitHub Pages из корня репозитория.
