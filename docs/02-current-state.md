# 02 — Текущее состояние

Дата снимка: 2026-09-08. Обновлять при каждом изменении охвата.
Оперативные итоги сессий — в `../handoff.md`.

## TL;DR

Построен **рендер-слой**: из декларативного манифеста сцен Remotion собирает
вертикальный ролик. Есть дизайн-система токенов и grid-система зон. **Не построено
ядро продукта:** нет Notion, нет автогенерации «сценарий → манифест», нет доставки
результата. Сейчас манифест пишется руками (человеком или агентом по брифу).

> **Фокус этапа:** «станок» (рендер-слой) ещё не доведён — сначала дизайн-система
> (M1), затем Planner (M2). Notion и оркестрация — заморожены, см.
> [07-roadmap.md](07-roadmap.md).

## Что работает

### Рендер-слой (`project1/`)
- Remotion 4.0.490, React 19, TypeScript strict, Tailwind v4 (через `@remotion/tailwind-v4`).
- `src/components/SceneFrame.tsx` — рендерер: проходит манифест, для каждой записи
  берёт пресет из `registry.ts`, оборачивает в `<Sequence>` с накопительным `from`.
- 4 композиции в `Root.tsx`: `MyFirstVideo` (video-02 в defaultProps), `Video03`,
  `Video04`, `GridSystemDemo`.
- Первый готовый ролик: `project1/out/MyFirstVideo.mp4` (~16 сек).

### Манифест-система
- `src/videos/video-01..04.ts` — массивы `{ preset, duration, data }` + `TOTAL_FRAMES`.
- `src/videos/types.ts` — `SceneManifestEntry`: дискриминантный union по ключам
  `registry.ts`. Ошибка в `data` → ошибка компиляции. (Одно намеренное `as any` в
  `SceneFrame` — TS не сужает union в `.map()`, объяснено в `types.ts`.)

### Пресеты (9 в реестре)
`BlurReveal`, `CounterDuo`, `DocumentList`, `GridScene`, `HeroBadge`, `HookScene`,
`IntroPanel`, `SlideInList`, `TextTypewriter`. Все переведены на токены DS.
`GridScene` — универсальный: принимает `items` (текст/картинки) и раскладывает по
зонам grid последовательно или явно.

### Примитивы (`src/primitives/index.ts`)
`useFadeIn`, `useBlurReveal`, `useScaleIn`, `useSlideX`, `useSpin`, `useTypewriter`
и др. — вся анимационная математика (`spring`, `interpolate`) изолирована здесь.

### Дизайн-система (`src/common/design-system/`)
- Слои: `fonts.ts` / `palette.ts` / `scale.ts` (примитивы) → `tokens.ts` (семантика:
  `text`, `color`, `space`, `radius`, `stroke`, `elevation`, `video`, `tint()`) →
  `motion.ts` (`EASE`) → `index.ts` (вход).
- `about.md` — гайдлайн senior-дизайнера: **светлый редакционный минимализм**, тонкая
  типографика (max Regular), SF Pro Display + Montserrat, зелёный `#CCFF00` только
  как заливка-маркер (0–1 на кадр).

### Grid-система (`src/common/grid.ts`, `src/components/Grid.tsx`)
CSS Grid 5×9 на кадр 1080×1920. Именованные зоны по рядам (`title`, `main`, `sub-1`,
… `cta`) и колонкам. Safe-зоны (`safe-top/bottom/left/right`) исключены на уровне
типа — контент туда не поставить даже по ошибке. Демо: `GridSystemDemo`.

### Агентский каркас (`vibe-starter/`)
`brief.md` (цель), `inputs/` (не менять), `outputs/` (отчёты), `handoff.md` (катящееся
состояние), `CLAUDE.md` (правила манифеста и конвенции для агента).

## Что НЕ построено (ядро продукта)

| Блок | Статус | Где должно жить |
|---|---|---|
| **Notion-интеграция** (Ingest + Delivery) | нет кода | новый модуль, см. [03](03-architecture.md), [04](04-notion-workspace.md) |
| **Planner** — сценарий + комментарии → manifest | нет кода | новый модуль, см. [05](05-generation-pipeline.md) |
| **Оркестрация рендера** (headless render → файл → хостинг) | нет кода | новый модуль |
| **Итеративная правка** (комментарий → точечный перерендер) | нет | Planner + Ingest |
| `openai` в зависимостях | установлен, **не используется** | подключить в Planner |
| Флип токенов на светлую тему | не сделан | `palette.ts`, `tokens.ts`, `scale.ts` |
| Пересбор хардкод-цветов в пресетах под белый фон | не сделан | `src/presets/*` |
| Файлы шрифта SF Pro Display (`.woff2`) | нет в `public/fonts/` | сейчас fallback на системный SF Pro / Montserrat |
| `DesignSystemDemo` (визуальная проверка токенов) | не создан | `src/compositions/` |
| Бренд-пресеты (несколько наборов токенов) | не спроектировано | бэклог, M4 |

## Техдолг и расхождения

1. **Документация врёт про число пресетов.** `CLAUDE.md` местами говорит «17–18
   компонентов» и перечисляет удалённые (`BackgroundGrid`, `CinematicSciFi`,
   `GlitchHook`, `Transition*` …). Реально в `registry.ts` — **9**. Нужно
   синхронизировать `CLAUDE.md` с `registry.ts` (или сделать `registry.ts` источником
   генерации списка в доке).
2. **Тёмная тема в коде vs светлый гайдлайн.** `tokens.ts` импортирует `paletteDark`,
   `color.text` почти белый. `about.md` §7 — таблица расхождений. До флипа новые
   пресеты рискуют закрепить тёмные хардкоды.
3. **Хардкод-цвета в пресетах.** `HookScene`, `DocumentList`, `SlideInList` держат
   `rgba(255,255,255,…)`, `#1e1b4b`, тёмные градиенты — мимо токенов.
4. **Вложенные git-репозитории.** `vibe-starter/.git` (commit «initial starter») и
   `project1/.git` — отдельные, без remote. Определиться: монорепо / submodule /
   один репозиторий. Сейчас `git status` в корне показывает `project1/` как
   untracked-папку.
5. **`video-02` не имеет собственного файла-описания** — используется как defaultProps
   `MyFirstVideo`, но в `handoff.md` фигурирует как «сдвинут при миграции токенов».
6. **`src/components/ui/*`** (14 shadcn-компонентов) — подключены типами, но CSS-анимации
   shadcn в покадровом рендере Remotion не работают. Движение — только через
   `primitives/`. Риск: соблазн использовать их «как есть».
7. **ESLint:** 3 error + 1 warning, все пред-существующие и осознанные (см. `handoff.md`).

## Проверки на момент снимка

- `npx tsc --noEmit` — 0 ошибок.
- `npm run dev` — Remotion Studio собирается, `:3000`.
- Арифметика: `video-01` TOTAL=500, `video-02`=450, `video-03`=300, `video-04`=360 —
  совпадает с суммой `duration`.
- safe-зоны — чисто (`grep` по `zone="safe-*"` в пресетах/манифестах пуст).
