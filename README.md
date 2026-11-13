# Portfolio

Минималистичное портфолио (static HTML/CSS/JS, GitHub Pages).

## Структура

- `index.html` — главная
- `case.html?id=<slug>` — страница кейса (читает Markdown)
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

Шаблон: `cases/_template/`. Новый кейс = копия шаблона + строка в `data/cases.json`.

## Локально

```bash
python3 -m http.server 8765
# http://127.0.0.1:8765/
```

Нужен HTTP (не `file://`), потому что данные грузятся через `fetch`.

## Деплой

GitHub Pages из корня репозитория.
