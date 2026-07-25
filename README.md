# 📊 Калькулятор Трудомісткості Програмного Забезпечення

> Інтерактивний React + TypeScript застосунок для розрахунків метрик програмної інженерії

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9_strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-8-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Tests](https://img.shields.io/badge/tests-111_passing-brightgreen?logo=vitest)](#тестування)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-Free_AI-8B5CF6?logo=openai&logoColor=white)](https://openrouter.ai/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Deploy](https://img.shields.io/badge/GitHub_Pages-Live-brightgreen?logo=github)](https://vscrm.github.io/Lab-system/)

## 🌐 Live Demo

> **👉 [vscrm.github.io/Lab-system](https://vscrm.github.io/Lab-system/)** — розгорнута версія на GitHub Pages

Комплексний веб-застосунок для автоматизації розрахунків з 6 лабораторних робіт з курсу **"Оцінка вартості програмних систем"**: динамічні обчислення за моделями COCOMO (Basic, Detailed, II Post-Architecture), методом функціональних точок (FPA, з AI-аналізом зображень), оцінка чисельності персоналу та розміру програмної частини ІС.

Продакшн-орієнтована архітектура: строга типізація без `any`, Zod-валідація всіх полів, 111 автотестів, UK/EN-переклад, моніторинг помилок і бюджет розміру бандла.

---

## 🎯 Призначення

Кожна з 6 лабораторних робіт реалізована як окремий інтерактивний, лениво завантажуваний модуль із покроковими розрахунками, формулами в реальному часі та валідацією введення.

**Автор:** Кручкевич Б.В., група ІП-23-1
**Університет:** Івано-Франківський національний технічний університет нафти і газу (ІФНТУНГ)
**Рік:** 2026

---

## Зміст

- [Основні можливості](#-основні-можливості)
- [Лабораторні роботи](#-лабораторні-роботи)
- [Швидкий старт](#-швидкий-старт)
- [Технологічний стек](#️-технологічний-стек)
- [Архітектура](#️-архітектура)
- [Валідація введених даних](#-валідація-введених-даних)
- [Інтернаціоналізація (i18n)](#-інтернаціоналізація-i18n)
- [Тестування](#-тестування)
- [Безпека](#-безпека)
- [Повна структура проекту](#-повна-структура-проекту)
- [AI-аналіз зображень у ЛР №4](#-ai-аналіз-зображень-у-лр-4)
- [Дизайн-система](#-дизайн-система)
- [Змінні середовища](#-змінні-середовища)
- [Розгортання на GitHub Pages](#-розгортання-на-github-pages)
- [Відомі обмеження й що можна покращити далі](#-відомі-обмеження-й-що-можна-покращити-далі)
- [Ліцензія та автор](#-ліцензія-та-автор)
- [Корисні посилання](#-корисні-посилання)

---

## ✨ Основні можливості

- ✅ **Динамічні розрахунки** — усі формули перераховуються в реальному часі при зміні будь-якого поля
- ✅ **Покрокова візуалізація** — кожна лабораторна розбита на логічні кроки з проміжними обчисленнями
- ✅ **Математичні формули** — відображення підстановок значень у формулу, а не лише кінцевого результату
- ✅ **Zod-валідація** — усі числові поля (включно з 22 факторами/драйверами COCOMO II у ЛР №5/6), інлайн-помилки
- ✅ **Адаптивний дизайн** — комп'ютери, планшети, телефони
- ✅ **UK/EN локалізація** — перемикач мови в шапці, повний переклад усіх 6 лабораторних
- ✅ **AI-аналіз зображень** — автоматичне визначення DET/RET/FTR з фото (ЛР №4)
- ✅ **111 автотестів**, строгий TypeScript, моніторинг помилок

---

## 🔢 Лабораторні роботи

| Лабораторна | Назва                              | Ключові метрики                                                  |
| ----------- | ---------------------------------- | ---------------------------------------------------------------- |
| **ЛР №1**   | Трудомісткість розробки ПП         | ФР, РК, E, Z, T (COCOMO II + Функціональні точки)                |
| **ЛР №2**   | Чисельність виконавців проекту     | V₃, Tₕ, Kc, Kт, Kₕ, T₃                                           |
| **ЛР №3**   | Оцінка вартості за COCOMO          | E, TDEV, SS, P (базовий/деталізований рівні)                     |
| **ЛР №4**   | Метод функціональних точок + 🤖 AI | ILF, EQ, DET, RET, FTR, UFT, AFT                                 |
| **ЛР №5**   | Засоби оцінки вартості ПЗ          | COCOMO II Post-Architecture (5 факторів масштабу + 17 драйверів) |
| **ЛР №6**   | Розмір програмної частини ІС       | KSLOC, DM, CM, IM, ESLOC                                         |

Кожна лаба — окремий React-компонент з код-сплітингом (`React.lazy`), доступний за прямим посиланням `/Lab-system/lab/<slug>` і коректно обробляється при F5 (детальніше — фолбек `dist/404.html`, `scripts/copy-404.mjs`).

---

## 🚀 Швидкий старт

Потрібен Node.js `^20.19.0` або `>=22.12.0` (вимога Vite 7).

```bash
git clone https://github.com/VSCRM/Lab-system.git
cd Lab-system
npm install
npm run dev
```

`npm run dev` сам відкриє браузер на `http://localhost:5173/Lab-system/`.

### Усі команди

| Команда                | Що робить                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| `npm run dev`          | Dev-сервер із hot reload, автовідкриттям браузера                                             |
| `npm run build`        | `tsc -b && vite build`, потім автоматично копіює `index.html` → `404.html` (для GitHub Pages) |
| `npm run preview`      | Локальний перегляд production-збірки                                                          |
| `npm run typecheck`    | Перевірка типів без збірки (`tsc -b --noEmit`)                                                |
| `npm run lint`         | ESLint (strict, `no-explicit-any` заборонено)                                                 |
| `npm run format`       | Prettier `--write` на весь проект                                                             |
| `npm run format:check` | Prettier `--check`, без змін файлів                                                           |
| `npm run test`         | Vitest, один прогін (111 тестів)                                                              |
| `npm run test:watch`   | Vitest у watch-режимі                                                                         |
| `npm run coverage`     | Vitest з покриттям коду                                                                       |
| `npm run size`         | Збірка + перевірка бюджету розміру бандла (`size-limit`)                                      |
| `npm run audit:check`  | `npm audit` лише по production-залежностях                                                    |
| `npm run deploy`       | Публікація `dist/` на GitHub Pages (`gh-pages`)                                               |

---

## 🛠️ Технологічний стек

```
Frontend:            React 19 (function components, hooks)
Мова:                TypeScript 5.9, strict mode, без `any` (ESLint no-explicit-any: error)
Валідація:           Zod — усі числові поля форм, без винятків
Маршрутизація:       React Router 8 (уніфікований пакет `react-router`, глибокі посилання /lab/:slug, 404-сторінка)
Стилі:               Tailwind CSS 3 (JIT), єдина система utility-класів
Іконки:              Lucide React
Інтернаціоналізація: i18next + react-i18next (UK за замовчуванням, EN — повна підтримка)
Build:               Vite 7 + @vitejs/plugin-react
Тести:               Vitest 4 (jsdom) + Testing Library (React, jest-dom, user-event)
Лінт/формат:         ESLint 9 (typescript-eslint strict) + Prettier + eslint-config-prettier
Моніторинг помилок:  Sentry (@sentry/react), опційно, lazy-loaded, вимкнено за замовчуванням
Бюджет бандла:       size-limit (@size-limit/file)
Деплой:              вручну через `npm run deploy` (gh-pages)
AI-інтеграція:       OpenRouter API (безкоштовні vision-моделі з failover та таймаутом) — лише ЛР №4
```

---

## 🏗️ Архітектура

Проєкт побудований за принципами SOLID з чіткою декомпозицією за відповідальністю:

```
lib/calculations/*   — чисті функції-формули. Без React, без DOM, без i18n.
                       Мовонезалежні (напр. рівні складності FPA повертають
                       "low"/"medium"/"high", а не готовий текст мовою).
                       Тестуються ізольовано (69 з 111 тестів — саме тут).
lib/validation/*     — Zod-схеми полів, одна фабрика (`numberField`) для всіх лаб.
lib/services/*       — зовнішні API (OpenRouter), з таймаутом і failover.
lib/config.ts        — конфігурація (URL, ліміти, таймаути) в одному місці.
lib/monitoring.ts    — обгортка над Sentry, lazy-loaded, safe no-op без DSN.

hooks/*              — стан форм і повторна логіка (валідоване число, таблиця персоналу,
                       фактори COCOMO, завантаження/аналіз зображень).

components/ui/*      — переюзабельні примітиви (NumberField, SelectField, Button, Alert...).
components/cocomo/*  — спільні блоки для ЛР №5 і №6 (ScaleFactorGrid, CostDriverGrid,
                       StaffAllocationTable, FinalMetricsPanel) — усувають дублювання
                       між двома дуже схожими лабораторними.
components/layout/*  — каркас застосунку, ErrorBoundary (на двох рівнях: навколо
                       всього App і навколо кожної окремої лаби), перемикач мови.
components/labs/*    — картки/навігація списку лаб.

features/labN/       — кожна лаба: LabN.tsx — це ЛИШЕ оркестратор (стан через хуки,
                       результат через lib/calculations), уся розмітка — в
                       components/*Step.tsx. Жодна лаба не є одним великим файлом.

pages/*              — маршрути (Home, Lab, NotFound), код-сплітинг лаб через React.lazy.
constants/*          — єдине джерело метаданих лаб (slug/ікона/колір) і коефіцієнтів COCOMO.
i18n/*               — переклади (детальніше нижче).
```

---

## ✅ Валідація введених даних

Кожне числове поле в кожній лабораторній — включно з 5 факторами масштабу та 17 драйверами витрат COCOMO II у ЛР №5/6 — проходить через Zod-схему з `lib/validation/schemas.ts`, а не голий `Number(e.target.value)`. Помилка показується інлайн під полем (`aria-invalid`, `aria-describedby`, `role="alert"`), розрахунок при цьому не падає — використовується безпечне значення-заглушка, поки користувач не виправить ввід.

API-ключ OpenRouter (ЛР №4) також валідується окремою Zod-схемою (формат, довжина, відсутність пробілів) до відправки запиту.

---

## 🌍 Інтернаціоналізація (i18n)

Повна підтримка **української (за замовчуванням) та англійської** мов — перемикач у шапці сайту. Реалізовано на `i18next` + `react-i18next`:

- 8 неймспейсів перекладу: `common`, `lab1`–`lab6`, `cocomo` (спільні блоки ЛР №5/6) — 16 JSON-файлів (`src/i18n/locales/{uk,en}/*.json`).
- Мова визначається автоматично (`i18next-browser-languagedetector`) і зберігається в `localStorage`.
- **Обчислювальні модулі мовонезалежні.** Наприклад, рівні складності FPA (`ilfComplexity`/`eqComplexity` у ЛР №4) повертають нейтральні значення `"low" | "medium" | "high"`, а не рядки конкретною мовою — переклад відбувається лише в UI-шарі. Це свідоме архітектурне рішення: логіка розрахунків ніколи не повинна знати, якою мовою говорить користувач.
- Промпти до AI-моделі в ЛР №4 також перекладаються разом з інтерфейсом.

---

## 🧪 Тестування

**111 автотестів** (Vitest + Testing Library), усі проходять чисто:

```
npm run test

 Test Files  20 passed (20)
      Tests  111 passed (111)
```

Розподіл:

- **Чисті функції** (`lib/calculations/*`, `lib/validation/*`, `lib/format.ts`) — формули COCOMO, IFPUG-таблиці складності, парсинг JSON з відповіді AI, Zod-схеми.
- **Хуки** (`useValidatedNumber`, `useStaffAllocation`, `useCocomoDrivers`, `useVisionAnalysis`) — через `renderHook`, включно з edge-кейсами (порожнє поле, вихід за межі діапазону, race condition при зміні зображення в ЛР №4).
- **Компоненти** (`NumberField`, `Button`, `Alert`, `SelectField`, `LabCard`, `ErrorBoundary`) — рендер, доступність (`role`, `aria-*`), взаємодія користувача через `user-event`.
- **Smoke-тест повного user-flow** (`Lab1.test.tsx`) — рендер реальної форми, введення значення, перевірка, що результат перерахувався, і що некоректне значення показує помилку, а не ламає сторінку.

---

## 🔒 Безпека

- **Content-Security-Policy** (мета-тег в `index.html`): `script-src 'self'` (без CDN, без inline-скриптів), `connect-src` обмежено `self` + `openrouter.ai` + Sentry ingest-домени, `object-src 'none'`. `frame-ancestors` навмисно **не** заданий у мета-тегу — браузери тихо ігнорують цю директиву, якщо CSP доставлено через `<meta>` (працює лише через справжній HTTP-заголовок); тримати її там — це лише помилка в консолі без жодного реального захисту. Для захисту від clickjacking потрібен хостинг з підтримкою кастомних заголовків (GitHub Pages — ні; Cloudflare Pages/Netlify — так).
- **Referrer-Policy: strict-origin-when-cross-origin.**
- **Таймаут 30с з `AbortController`** на кожному запиті до OpenRouter API — зависла відповідь не блокує інтерфейс назавжди.
- **Валідація завантажених зображень**: дозволені лише PNG/JPEG/WEBP/GIF, ліміт 8 МБ — до читання файлу в пам'ять браузера.
- **API-ключ ніде не зберігається** (ні `localStorage`, ні бекенд — бекенда немає) і надсилається лише напряму з браузера користувача до `openrouter.ai`; про це прямо попереджено у формі вводу ключа.
- **`rel="noopener noreferrer"`** на всіх зовнішніх посиланнях.
- **`npm audit`: 0 вразливостей.** Застосунок на React 19 і уніфікованому `react-router@8` (замість `react-router-dom@7`), що закриває GHSA-qwww-vcr4-c8h2. Ланцюжок `brace-expansion`/`minimatch` через ESLint закрито через `overrides` (`minimatch@^10.2.5`) у `package.json`, без мажорного апгрейду ESLint. Vite навмисно лишено на 7-й гілці (стабільна), а не experimental Vite 8/rolldown.
- **Моніторинг помилок**: `ErrorBoundary` (на рівні застосунку й на рівні кожної лаби) реально відправляє помилки в Sentry, якщо заданий `VITE_SENTRY_DSN`; без DSN — безпечний no-op, і сам SDK Sentry довантажується лише за потреби (`await import(...)`), тобто **0 байт** у бандлі, коли моніторинг не налаштований.

---

## 📁 Повна структура проекту

```
Lab-system/
├── public/
│   ├── manifest.json
│   └── vite.svg
├── scripts/
│   └── copy-404.mjs
├── src/
│   ├── components/
│   │   ├── cocomo/
│   │   │   ├── CostDriverGrid.tsx
│   │   │   ├── FinalMetricsPanel.tsx
│   │   │   ├── ScaleFactorGrid.tsx
│   │   │   └── StaffAllocationTable.tsx
│   │   ├── labs/
│   │   │   ├── BackButton.tsx
│   │   │   ├── LabCard.test.tsx
│   │   │   ├── LabCard.tsx
│   │   │   ├── LabGrid.tsx
│   │   │   └── LabHeader.tsx
│   │   ├── layout/
│   │   │   ├── AppShell.tsx
│   │   │   ├── ErrorBoundary.test.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── LanguageSwitcher.tsx
│   │   └── ui/
│   │       ├── Alert.test.tsx
│   │       ├── Alert.tsx
│   │       ├── Button.test.tsx
│   │       ├── Button.tsx
│   │       ├── FormulaBlock.tsx
│   │       ├── NumberField.test.tsx
│   │       ├── NumberField.tsx
│   │       ├── ResultStat.tsx
│   │       ├── Section.tsx
│   │       ├── SelectField.test.tsx
│   │       ├── SelectField.tsx
│   │       └── StepIndicator.tsx
│   ├── constants/
│   │   ├── cocomo.ts
│   │   └── labs.ts
│   ├── features/
│   │   ├── lab1/
│   │   │   ├── components/
│   │   │   │   ├── ClassifiersStep.tsx
│   │   │   │   ├── CostFactorAndResult.tsx
│   │   │   │   ├── RatingsGrid.tsx
│   │   │   │   ├── RatingsStep.tsx
│   │   │   │   └── SizeSteps.tsx
│   │   │   ├── Lab1.test.tsx
│   │   │   └── Lab1.tsx
│   │   ├── lab2/
│   │   │   ├── components/
│   │   │   │   ├── CatalogStep.tsx
│   │   │   │   ├── CorrectionFactorsStep.tsx
│   │   │   │   ├── FunctionCatalogList.tsx
│   │   │   │   ├── NormativeLaborStep.tsx
│   │   │   │   ├── ResultSummary.tsx
│   │   │   │   └── StaffCountStep.tsx
│   │   │   └── Lab2.tsx
│   │   ├── lab3/
│   │   │   ├── components/
│   │   │   │   ├── CostDriversStep.tsx
│   │   │   │   ├── ModeAndSizeStep.tsx
│   │   │   │   ├── ModeExplanation.tsx
│   │   │   │   └── ResultsSection.tsx
│   │   │   └── Lab3.tsx
│   │   ├── lab4/
│   │   │   ├── components/
│   │   │   │   ├── ApiKeySetup.tsx
│   │   │   │   ├── ComplexityAnalysisStep.tsx
│   │   │   │   └── SummaryStep.tsx
│   │   │   └── Lab4.tsx
│   │   ├── lab5/
│   │   │   └── Lab5.tsx
│   │   └── lab6/
│   │       ├── components/
│   │       │   ├── EffortDurationSteps.tsx
│   │       │   ├── ModificationAndEslocStep.tsx
│   │       │   ├── ProjectSummaryFooter.tsx
│   │       │   ├── VolumeStep.tsx
│   │       │   └── VolumeSummary.tsx
│   │       └── Lab6.tsx
│   ├── hooks/
│   │   ├── useCocomoDrivers.test.ts
│   │   ├── useCocomoDrivers.ts
│   │   ├── useStaffAllocation.test.ts
│   │   ├── useStaffAllocation.ts
│   │   ├── useValidatedNumber.test.tsx
│   │   ├── useValidatedNumber.ts
│   │   ├── useVisionAnalysis.test.tsx
│   │   └── useVisionAnalysis.ts
│   ├── i18n/
│   │   ├── locales/
│   │   │   ├── en/
│   │   │   │   ├── cocomo.json
│   │   │   │   ├── common.json
│   │   │   │   ├── lab1.json
│   │   │   │   ├── lab2.json
│   │   │   │   ├── lab3.json
│   │   │   │   ├── lab4.json
│   │   │   │   ├── lab5.json
│   │   │   │   └── lab6.json
│   │   │   └── uk/
│   │   │       ├── cocomo.json
│   │   │       ├── common.json
│   │   │       ├── lab1.json
│   │   │       ├── lab2.json
│   │   │       ├── lab3.json
│   │   │       ├── lab4.json
│   │   │       ├── lab5.json
│   │   │       └── lab6.json
│   │   └── index.ts
│   ├── lib/
│   │   ├── calculations/
│   │   │   ├── cocomoII.test.ts
│   │   │   ├── cocomoII.ts
│   │   │   ├── lab1.test.ts
│   │   │   ├── lab1.ts
│   │   │   ├── lab2.test.ts
│   │   │   ├── lab2.ts
│   │   │   ├── lab3.test.ts
│   │   │   ├── lab3.ts
│   │   │   ├── lab4.test.ts
│   │   │   ├── lab4.ts
│   │   │   ├── lab5.test.ts
│   │   │   ├── lab5.ts
│   │   │   ├── lab6.test.ts
│   │   │   └── lab6.ts
│   │   ├── services/
│   │   │   └── openRouterVision.ts
│   │   ├── validation/
│   │   │   ├── common.test.ts
│   │   │   ├── common.ts
│   │   │   └── schemas.ts
│   │   ├── config.ts
│   │   ├── format.test.ts
│   │   ├── format.ts
│   │   └── monitoring.ts
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── LabPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── test/
│   │   └── setup.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env.example
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── LICENSE
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── vitest.config.ts
```

_(`node_modules/`, `dist/`, `coverage/`, `package-lock.json` не показані — стандартні, генеровані)_

---

### Що є що (коротко)

| Шлях                     | Призначення                                                              |
| ------------------------ | ------------------------------------------------------------------------ |
| `src/main.tsx`           | Точка входу: ініціалізує i18n і моніторинг помилок, монтує `<App/>`      |
| `src/App.tsx`            | Маршрутизація (React Router) + top-level `ErrorBoundary`                 |
| `src/constants/`         | Метадані лаб (slug/ікона/колір) і коефіцієнти COCOMO — мовонезалежні     |
| `src/i18n/`              | Ініціалізація i18next + 16 JSON-файлів перекладу (uk/en × 8 неймспейсів) |
| `src/lib/calculations/`  | Чисті формули розрахунків + тести — серце застосунку                     |
| `src/lib/validation/`    | Zod-схеми валідації полів                                                |
| `src/lib/services/`      | Клієнт OpenRouter API (AI-аналіз зображень)                              |
| `src/lib/config.ts`      | Централізована конфігурація (URL, ліміти, таймаути)                      |
| `src/lib/monitoring.ts`  | Обгортка над Sentry (lazy-loaded, safe no-op)                            |
| `src/hooks/`             | Повторно використовувана логіка стану форм                               |
| `src/components/ui/`     | Дрібні переюзабельні примітиви форм                                      |
| `src/components/cocomo/` | Спільні блоки для ЛР №5/6                                                |
| `src/components/layout/` | Каркас застосунку, ErrorBoundary, перемикач мови                         |
| `src/components/labs/`   | Картки й навігація списку лаб                                            |
| `src/features/labN/`     | Кожна лаба: оркестратор + власні `components/*Step.tsx`                  |
| `src/pages/`             | Маршрути (Home, Lab з код-сплітингом, NotFound)                          |
| `scripts/copy-404.mjs`   | Postbuild-скрипт: SPA-фолбек для GitHub Pages                            |

---

## 🤖 AI-аналіз зображень у ЛР №4

Лабораторна №4 містить покроковий AI-асистент для автоматичного аналізу зображень на базі **OpenRouter API**.

### ЛР №4 — покрокова інструкція

1. **Крок 0 — API ключ**
   - Отримай ключ на [openrouter.ai/settings/keys](https://openrouter.ai/settings/keys)
   - Введи вручну або завантаж `.txt` файл з ключем
   - Натисни **"Почати аналіз"**

2. **Крок 1 — ILF**
   - Завантаж рис.1 (таблиця або ER-діаграма «Студент»)
   - Натисни **"Аналізувати рис.1"** — AI визначить DET і RET
   - Перевір і за потреби скоригуй значення вручну
   - Натисни **"Далі → Крок 2"**

3. **Крок 2 — EQ**
   - Завантаж рис.2 (скріншот діалогового вікна)
   - Натисни **"Аналізувати рис.2"** — AI визначить DET і FTR
   - Перевір значення
   - Натисни **"Об'єднати розрахунок"**

4. **Крок 3 — Підсумок**
   - Переглянь зведену таблицю ILF + EQ
   - Введи VAF (фактор вирівнювання, 0.65–1.35)
   - Отримай фінальний результат **AFT**

---

### Введення API ключа

Підтримуються два способи введення ключа:

**Варіант А — вручну:**

1. Перейди на [openrouter.ai/settings/keys](https://openrouter.ai/settings/keys)
2. Зареєструйся (безкоштовно, без картки)
3. Натисни **"Create Key"**
4. Скопіюй ключ (`sk-or-v1-...`) і встав у поле в програмі

**Варіант Б — з файлу:**

1. Збережи ключ у текстовий файл `key.txt` (лише один рядок з ключем)
2. Натисни **"Вибрати файл з ключем"** і обери файл
3. Ключ зчитається автоматично

> ⚠️ Ключ не зберігається між сесіями — після перезавантаження сторінки потрібно ввести знову.

### Failover-система моделей

Якщо одна модель недоступна — програма автоматично переходить до наступної:

| #   | Модель                                          | Провайдер  |
| --- | ----------------------------------------------- | ---------- |
| 1   | `nvidia/nemotron-nano-12b-v2-vl:free`           | NVIDIA     |
| 2   | `mistralai/mistral-small-3.1-24b-instruct:free` | Mistral AI |
| 3   | `google/gemma-3-27b-it:free`                    | Google     |
| 4   | `google/gemma-3-4b-it:free`                     | Google     |
| 5   | `google/gemma-3-12b-it:free`                    | Google     |

Всі моделі безкоштовні та підтримують аналіз зображень (vision).

---

## 🎨 Дизайн-система

```css
Primary (Синій):    #0057B7
Secondary (Жовтий): #FFD700
AI-секція:          purple-900/30
Фон:                slate-900 → blue-900 (градієнт)
```

---

## 🔧 Змінні середовища

Жодна змінна середовища не є обов'язковою — застосунок повністю працює "з коробки". Дивись `.env.example`:

```bash
# VITE_SENTRY_DSN=https://examplePublicKey@o0.ingest.sentry.io/0
```

---

## 🚢 Розгортання на GitHub Pages

```bash
npm run build    # створює dist/, включно з dist/404.html
npm run deploy   # публікує dist/ через gh-pages
```

---

## 📄 Ліцензія та автор

MIT License — [LICENSE](LICENSE)

**Кручкевич Богдан Вікторович**,
GitHub: [github.com/VSCRM](https://github.com/VSCRM)

---

## 📚 Корисні посилання

- [OpenRouter — Free Models](https://openrouter.ai/models?q=free)
- [OpenRouter — API Keys](https://openrouter.ai/settings/keys)
- [COCOMO II Model](http://csse.usc.edu/csse/research/COCOMOII/cocomo_main.html)
- [Function Point Analysis (IFPUG)](https://www.ifpug.org/)
- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Vitest Guide](https://vitest.dev/guide/)
- [Zod Documentation](https://zod.dev/)
- [i18next Documentation](https://www.i18next.com/)
