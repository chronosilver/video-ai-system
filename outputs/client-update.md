# Клиентский апдейт

Дата: 2026-09-07
Проект: агентский цикл генерации коротких вертикальных видео (1080×1920) на Remotion.
Основано на: `inputs/notes.md`, `inputs/risks.md` + проверка кодовой базы `project1/`.

## Что сделано

- **Grid-шаблон (CSS Grid) для всех видео готов.**
  Источник: `inputs/notes.md` («сделана grid css шаблон для всех видео»).
  Подтверждение в коде: `project1/src/common/grid.ts`, `project1/src/components/Grid.tsx`,
  демо-композиция `project1/src/compositions/GridDemo.tsx`, универсальный пресет
  `project1/src/presets/GridScene.tsx`.
- Архитектура переведена на декларативные манифесты: новое видео = один файл
  `src/videos/video-XX.ts`. Реестр из 18 пресетов (`src/presets/registry.ts`).
  Источник: `project1/CLAUDE.md`, git-история `project1` (коммит «Refactor to
  declarative manifest-driven architecture»).
- Первый ролик собран: `project1/out/MyFirstVideo.mp4` (~16 сек, тема
  «Больше памяти ≠ умнее», бренд GUIDE DAO). Источник: `brief.md`, манифест
  `project1/src/videos/video-01.ts`.

## Текущий статус проверок (`project1/`)

- `npm run dev` — Remotion Studio собирается без ошибок: `Built in 691ms`.
- `npx tsc --noEmit` — 4 ошибки типов в `src/components/ui/*` (shadcn UI-kit,
  не подключён к видео).
- `npx eslint src` — 3 errors, 1 warning (детали в `outputs/ui-kit-remotion-warnings.md`).

## Следующий шаг

- **Создание design system.**
  Источник: `inputs/notes.md` («сл шаг создание design system»).

## Риски

| Риск | Статус | Источник |
|---|---|---|
| Не решён вопрос, как анимации из UI-kit будут взаимодействовать с Remotion; висят предупреждения | Открыт | `inputs/risks.md`; воспроизведено: `npx eslint src` → `src/components/ui/progress.tsx:23` `@remotion/non-pure-animation` (CSS-анимации shadcn несовместимы с покадровым рендером). Разбор: `outputs/ui-kit-remotion-warnings.md` |

Во входных данных (`inputs/risks.md`) есть второй пункт списка рисков — он пустой,
формулировки нет. Дополнительные риски не добавлялись (нет источника).

## Не-цели (из `brief.md`)

- Не выходить за область работы папки.
- Не устанавливать новые пакеты без вопроса.
