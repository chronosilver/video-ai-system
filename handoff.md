# Handoff

Дата: 2026-09-08. Ведёт PM-сессия.

## Над чем работаем

Сервис генерации коротких вертикальных роликов (1080×1920) на Remotion.
Ниша уточнена: **обучающие ролики по программированию для Instagram, серийные.**
Этап: **M1** — привести рендер-слой и дизайн-систему к дизайн-манифесту.
Полная структура — `docs/`. Роли сессий — `docs/roles/`.

## Дизайн-манифест — ПРИНЯТ (2026-09-08)

Канон — `project1/src/common/design-system/about.md`. Кратко:
- Строго чёрно-белый, два режима кадра: `paper` (белый/чёрный fg), `ink` (чёрный/белый fg).
  Полутонов и акцента нет (`#CCFF00`, `series.*`, `danger` — удаляются).
- Один шрифт — **Montserrat**, веса Thin/Light/Regular, максимум Regular. SF Pro убирается.
- В кадре только контент: типографика, монохромные логотипы, монохромные иконки, геометрия.
  Ни видео, ни фото, ни людей, ни кода на экране, ни цвета.
- Движение — профессиональный motion-design средствами Remotion.
- Открытые вопросы (референсы, настроение, правило смены режимов, плотность, фирменная
  деталь, язык, нумерация, субтитры, набор иконок) — §8 манифеста, ждут владельца.

## Сделано в этой сессии

- Структура проекта `docs/01..09` + роли `docs/roles/` (`1d98da0`, `4c41947`).
- Дизайн-манифест B&W записан (`8af3e4f`); канон — `project1/src/common/design-system/about.md`.
- **INFRA-1 закрыта** (`e707943`): `project1/.git` был утрачен → `project1/` влит в
  корневой репозиторий как обычная папка. Монорепо. `.gitignore` обновлён.
- **DEL-1** (в `e707943`): удалён shadcn UI-kit, `IntroPanel`, `Video04`, `index.css`,
  Tailwind-обвязка + зависимости; `palette.ts` → placeholder; 8 пресетов.
- **TYPO-1** (в `e707943`): аддитивно `text.h1/h2/body/small` (без цвета) +
  `color.black/white/gray`; демо `TypographyDemo`. `GridScene` — фикс 2 строки (фолбэк).
  ⚠️ Владельцу: `body` 26→32 укрупняет `SlideInList`/`DocumentList` — визуальная проверка.

## Сделано, закоммичено

- `e06e6d8` — PKG-1: `@remotion/{transitions,shapes,paths,motion-blur,layout-utils,animation-utils}@4.0.490`
- `8fffd3b` — TPL-1 (`src/templates/` + `TEMPLATE_REGISTRY` + `SequentialReveal` + `useReveal`
  + `SceneFrame.resolveScene`) и SCRIPT-1 (`video-05.ts` «Вайб-кодинг», 9 сцен, 1545 кадров, `Video05`).
  Направление: **вариант 3 — сцены-шаблоны**.

## В работе (DEV)

- **PRIM-1** — унификация + расширение `src/primitives/` (единая сигнатура entrance-хуков
  `useX(delay, opts) => CSSProperties`; SPRING/DURATION константы; новые: useDrop, useSlideLeft/Right,
  useBlurIn, useMaskWipe, useZoomIn, useFloat, useBlink; `SequentialReveal.items[].enter?`;
  старые хуки → `@deprecated`; демо `MotionDemo`).

## Ждут аппрува владельца (пробелы из video-05)

- **G1** — `layout: "stack"` у `SequentialReveal`: плотный вертикальный поток в одной зоне
  (сейчас 1 элемент = 1 зона, дыра после заголовка в сценах-списках 5, 6).
- **G2** — автоподгонка кегля `h1`/`h2` под ширину (через `@remotion/layout-utils`), сцена 7.
- **G3** — `{ kind: "row", items: [...] }` / шаблон `LogoRow`: горизонтальный ряд логотипов, сцена 8.
- **G4** — переходы между сценами: `transition?` в записи манифеста + `<TransitionSeries>` в `SceneFrame`.

## Ждёт: визуальная приёмка `video-05` владельцем (Studio → `Video05`).

## Состояние project1/

- Пресеты (8): `BlurReveal`, `CounterDuo`, `DocumentList`, `GridScene`, `HeroBadge`,
  `HookScene`, `SlideInList`, `TextTypewriter`. Держат хардкод старых цветов — под манифест не приведены.
- Композиции: `MyFirstVideo` (video-02, 450), `Video03` (300), `GridSystemDemo` (150).
  `video-01.ts` существует, ни к одной композиции не привязан.
- `src/common/design-system/`: `fonts.ts` (Montserrat + SF Pro — SF Pro убрать),
  `palette.ts` (placeholder), `scale.ts`, `tokens.ts`, `motion.ts`, `grid.ts`.
- `src/primitives/index.ts`: `useFadeIn/useBlurReveal/useScaleIn/useSlideX/useSpin/useTypewriter`.
- Remotion 4.0.490; пакеты: `remotion`, `@remotion/cli`, `@remotion/google-fonts`.
- Шрифты SF Pro `.woff2` в `public/fonts/` отсутствуют (станет неактуально после
  перехода на «только Montserrat»).

## Next steps

1. Ревью PKG-1 / TPL-1 / SCRIPT-1 по мере готовности; владелец коммитит.
2. **Чистка старого** (после SCRIPT-1, одной пачкой):
   - удалить `video-01.ts` / `video-02.ts` / `video-03.ts` + композиции `MyFirstVideo`,
     `Video03` (старая тёмная тема, не по манифесту — см. `project1/src/videos/README.md`);
   - удалить/мигрировать 8 старых пресетов;
   - убрать старые токены (`text.display/heading/subheading/title/caption`,
     `color.text/textMuted/textFaint/accent/danger/series`, `tint`, `elevation`).
   Эталон после этого — `video-05` + демо-композиции.
3. **`fonts.ts` → только Montserrat** (убрать SF Pro Display).
4. Ответы владельца на открытые вопросы стиля (`about.md` §8): референсы, настроение,
   правило смены режимов, плотность, фирменная деталь, язык, нумерация, субтитры, набор иконок.
5. Логотип-ассеты (`public/logos/`, монохром SVG): Claude, Cursor, Copilot/GitHub, Apple.
6. Пересобрать backlog M1 под манифест и вариант 3 (эпик DS → шаблоны + атомы + motion).

## Правила

- `inputs/` не менять. Разборы — в `outputs/`. Данные не выдумывать.
- Новые пакеты — только с аппрувом владельца.
- Цвет/размер/шрифт — только через токены, не строками в пресетах. Два цвета, точка.
- Коммитит владелец вручную; PM обновляет этот файл после.
