# TimeSeriesForecasting

Интерактивный шаблон frontend для приложения по прогнозированию временных рядов

[Демо на Vercel](https://time-series-forecasting-sooty.vercel.app/)

---

## Описание

Современный frontend-шаблон для веб-приложения прогнозирования временных рядов на **React** + **Vite** + **Tailwind CSS**. Готов к интеграции с backend ([пример](https://github.com/mihnin/my_time_series_app)).

---

## Возможности
- Загрузка и просмотр данных (CSV, Excel)
- Интерактивная настройка параметров моделей
- Визуализация результатов (графики, таблицы)
- Экспорт (CSV, Excel)
- Анализ данных: пропуски, аномалии, сезонность, корреляции
- Современный UI (React + Tailwind CSS)
- Готовность к интеграции с backend через API

Подробнее — [mihnin/my_time_series_app](https://github.com/mihnin/my_time_series_app)

---

## Быстрый старт: локальный запуск

### 1. Клонирование репозитория
```bash
# Windows, Linux, MacOS:
git clone https://github.com/ВАШ_РЕПОЗИТОРИЙ.git
cd TimeSeriesForecasting
```

### 2. Установка Node.js
- [Скачать Node.js (LTS)](https://nodejs.org/)
- Windows: .msi, MacOS: .pkg/Homebrew, Linux: пакетный менеджер

Проверьте:
```bash
node -v
npm -v
```

### 3. Менеджеры пакетов: npm, yarn, pnpm
- **npm** — стандартный, идёт с Node.js
- **yarn** — быстрее, кэширует зависимости
- **pnpm** — экономит место, очень быстрый

> Используйте только один менеджер в проекте!

Установка (опционально):
```bash
npm install -g pnpm # или
npm install -g yarn
```

### 4. Установка зависимостей
```bash
pnpm install   # или
npm install    # или
yarn install
```

### 5. Основные команды
- `dev` — запуск в режиме разработки (автообновление)
- `build` — production-сборка (оптимизация, папка dist)
- `preview` — локальный просмотр production-сборки

```bash
pnpm dev      # или npm run dev, yarn dev
pnpm build    # или npm run build, yarn build
pnpm preview  # или npm run preview, yarn preview
```

> Команды одинаковы для Windows, MacOS, Linux

---

## Как менять стили: шрифты, отступы, иконки, размеры

### Tailwind CSS
- Все стили задаются через классы прямо в JSX: [Tailwind Docs](https://tailwindcss.com/docs/utility-first)

#### Шрифты
- Глобально: `src/index.css` или через Tailwind `fontFamily` в `tailwind.config.js`
- В компоненте: `<div className="font-sans font-bold">Text</div>`

#### Отступы
- Margin: `m-4`, `mt-2`, `mb-2`, `mx-2`, `my-2`
- Padding: `p-4`, `px-2`, `py-2`

#### Размеры
- Ширина: `w-8`, `w-full`, `max-w-md`
- Высота: `h-8`, `min-h-screen`

#### Иконки
- Используйте, например, [lucide-react](https://lucide.dev/icons/):
  ```jsx
  import { User } from 'lucide-react';
  <User size={32} color="gray" />
  ```
- Размер и цвет задаются через props или Tailwind (`text-gray-500 w-8 h-8`)

#### Пример
```jsx
<div className="p-4 m-2 w-64 h-32 font-sans">
  <User className="w-8 h-8 text-blue-500" />
  <span>Профиль</span>
</div>
```

---

## Структура проекта
- `src/` — компоненты, стили, хуки
- `public/` — статические файлы
- `index.html` — точка входа
- `vite.config.js` — конфиг Vite

---

## Интеграция с backend
Рекомендуется backend на Python (FastAPI + AutoGluon): [mihnin/my_time_series_app](https://github.com/mihnin/my_time_series_app)

---

## Лицензия
MIT