# DemoQA — Playwright + TypeScript

Автотесты UI и API для [demoqa.com](https://demoqa.com) на Playwright.

## Архитектура

- `src/pages` — Page Object для UI;
- `src/api` — API-клиенты;
- `src/core` — базовые классы для UI и API;
- `src/fixtures` — типизированные Playwright fixtures;
- `src/data` — тестовые данные;
- `tests` — бизнес-сценарии и проверки.

Тесты используют fixtures из `src/fixtures/app.fixtures.ts`, поэтому тестовый слой не зависит напрямую от создания Page Object или API-клиентов.

## Запуск

```bash
npm install

# Все тесты
npm test

# Только API
npx playwright test tests/api

# Только UI
npx playwright test tests/ui

# Конкретный тест
npx playwright test -g "Should add Book to User"

# UI mode
npm run test:ui
```

Отчёт Playwright сохраняется в `playwright-report`.

## Технические решения

- данные пользователя генерируются динамически через `Date.now()`;
- тестовые пользователи удаляются через Playwright hooks;
- для надёжности тесты запускаются одним worker — DemoQA является общим внешним стендом и нестабилен при параллельных изменениях состояния.

Для локального запуска используются демонстрационные credentials публичного стенда. В рабочем проекте их следует получать из переменных окружения:

```ts
process.env.TEST_USERNAME
process.env.TEST_PASSWORD
```

## Требования

- Node.js;
- npm;
- Chromium устанавливается Playwright при необходимости:

```bash
npx playwright install chromium
```