# CLAUDE.md — Remotion Vibe Starter

> ## ⚠️ ТЕКУЩИЙ ФОКУС (читать первым)
>
> Полная структура проекта — в `docs/` (`docs/README.md` — карта). Там описана вся
> целевая система, но **строим её по порядку и не всю сразу:**
>
> 1. **Сейчас — дизайн-система и рендер-слой** («станок» ещё не готов): флип токенов
>    на светлую тему, чистка хардкод-цветов в пресетах, `DesignSystemDemo`,
>    актуализация этого файла. Это эпик **DS** в `docs/08-backlog.md`, майлстоун
>    **M1** в `docs/07-roadmap.md`. Начинать с задачи **DS-1**.
> 2. **Потом — Planner** (сценарий + короткие комментарии → манифест сцен),
>    майлстоун **M2**, вход из локального файла.
>
> **Notion-интеграция, Ingest, Delivery, оркестрация-как-сервис, мультибренд,
> масштаб (майлстоуны M3–M5, документы `docs/03`–`docs/04`) — заморожены.** Это
> продуманная наперёд цель, а не задачи к исполнению. Не создавать папку `service/`,
> не подключать Notion API, не ставить новые пакеты под это — пока пользователь явно
> не решит перейти к M3.

Правила:

    не менять inputs/;
    результаты писать в outputs/;
    не придумывать отсутствующие данные;
    в конце обновлять handoff.md.



---

## Манифест создания новых сцен
любая сцена строится только из готовых компонентов, использует дизайн-токены (единые переменные для всех дизайн-решений), анимации только из библиотеки (presets), никакого кастомного хаоса. Claude следует этим правилам, а не придумывает свои.

## Архитектура

```
src/
  videos/          # Манифесты видео — ЗДЕСЬ СОЗДАЁТСЯ НОВОЕ ВИДЕО
    video-01.ts    # Декларативный массив сцен { preset, duration, data }
    types.ts       # Тип SceneManifestEntry (дискриминантный union)

  presets/         # Библиотека визуальных блоков — ВСЕ КОМПОНЕНТЫ ЗДЕСЬ
    registry.ts    # Реестр всех пресетов (17 компонентов)
    HookScene.tsx, CounterDuo.tsx, SlideInList.tsx, BlurReveal.tsx ...

  primitives/      # Анимационные хуки: useFadeIn, useScaleIn, useSlideX ...
  common/          # Токены: theme.ts, colors.ts, easing.ts, fonts.ts, utils.ts, grid.ts
  components/      # SceneFrame.tsx — рендерер манифеста, Grid.tsx — grid layout system
  compositions/    # Composition.tsx — конфигурация Remotion, GridDemo.tsx — демо сетки
```

Папок `animations/`, `scenes/`, файла `scenario.ts` больше нет.
Все данные живут прямо в манифесте. Все компоненты — в `presets/`.

---

## Как создать новое видео

1. Скопировать `src/videos/video-01.ts` → `src/videos/video-02.ts`
2. Выбрать пресеты из реестра (`src/presets/registry.ts`). Для сцен с текстом/картинками без
   особого визуального эффекта — бери `GridScene` (см. «Как размещать контент по зонам через
   `GridScene`» ниже), это стандартный способ
3. Заполнить `data` для каждой сцены — TypeScript подскажет нужные поля
4. В `Composition.tsx` заменить импорт на новый манифест
5. `npm run dev` — проверить в Remotion Studio

---

## Два слоя настройки

| Файл | Что менять |
|---|---|
| `src/videos/video-XX.ts` | Пресеты, порядок, длительность, тексты, данные |
| `src/common/theme.ts` | Цвета, шрифты, отступы, параметры видео (fps, размер) |

---

## Реестр пресетов (`src/presets/registry.ts`)

Все 18 компонентов доступны в манифесте по имени:

`BackgroundGrid`, `BlurReveal`, `CinematicSciFi`, `CounterDuo`, `DocumentList`, `GlitchHook`, `GridScene`, `HeroBadge`, `HookScene`, `LayoutOffGrid`, `ListHeroWithList`, `ListMinimalLeft`, `RollerTypewriter`, `SlideInList`, `TextTypewriter`, `TransitionDiagonalSlice`, `TransitionFlash`, `TransitionZoomBlur`

`GridScene` — универсальный пресет поверх Grid Layout System: принимает `items` (список текста/картинок) и раскладывает их по зонам сетки либо последовательно (элемент №0 → первая зона, №1 → вторая и т.д.), либо явно через `zone` на элементе. См. `src/presets/GridScene.tsx`.

Чтобы добавить новый пресет: написать компонент в `presets/` → добавить одну строку в `registry.ts`.

---

## Формат манифеста

```ts
import type { SceneManifestEntry } from "./types";
import { colors } from "../common/theme";

export const VIDEO_02: SceneManifestEntry[] = [
  {
    preset:   "HookScene",       // имя из registry.ts
    duration: 60,                // кадры (30fps: 30=1сек, 60=2сек, 90=3сек)
    data: {                      // props компонента — TypeScript подскажет
      brand: "GUIDE DAO",
      titleLine1: "Меньше",
      titleLine2: "промптов",
      pill: "не равно",
      accent: "хуже",
      category: "AI / TOOLS",
    },
  },
  {
    preset:   "HeroBadge",
    duration: 80,
    data: {
      title:    "Guide DAO",
      tagline:  "AI на практике",
      gradient: `linear-gradient(135deg, ${colors.accent.indigo} 0%, ${colors.accent.cyan} 100%)`,
    },
  },
];

export const TOTAL_FRAMES = VIDEO_02.reduce((sum, s) => sum + s.duration, 0);
```

---

## Как размещать контент по зонам через `GridScene` (стандартный способ)

Для новой сцены, у которой нет готового специфичного пресета (`HookScene`, `HeroBadge` и т.п.
со своей уникальной вёрсткой) — используй `GridScene`. Это стандартный путь размещения
контента для новых видео: даёшь список текста/картинок, `GridScene` сам раскладывает их
по зонам сетки (`src/common/grid.ts`).

**Последовательный режим** — просто перечисляешь контент по порядку, зона берётся автоматически
(элемент №0 → `title`, №1 → `main`, №2 → `sub-1`, ...):

```ts
{
  preset:   "GridScene",
  duration: 90,
  data: {
    items: [
      { type: "text", value: "Больше памяти" },   // → title
      { type: "text", value: "≠ умнее" },          // → main
      { type: "text", value: "Меньше промптов" },  // → sub-1
    ],
  },
},
```

**Явный режим** — указываешь `zone` на элементе, если нужно разместить контент вне очереди
или пропустить зону:

```ts
{
  preset:   "GridScene",
  duration: 90,
  data: {
    background: colors.bg.primary,
    items: [
      { zone: "title", type: "text",  value: "Guide DAO" },
      { zone: "main",  type: "image", value: "https://.../diagram.png" },
      { zone: "cta",   type: "text",  value: "Подпишись", color: colors.brand.accent },
    ],
  },
},
```

Доступные зоны (порядок в последовательном режиме): `title`, `main`, `sub-1`,
`sub-1-continuation`, `sub-2`, `support`, `cta`. `safe-top`/`safe-bottom`/`safe-left`/`safe-right`
недоступны для `zone`/`column` даже технически — TypeScript не даст указать safe-зону в `items`.

Полный набор полей элемента (`type`, `value`, `zone`, `column`, `variant`, `color`, `align`) и
пресета (`items`, `background`, `stagger`, `debug`) — в `src/presets/GridScene.tsx`.

Правило выбора: если контенту достаточно текста/картинок в стандартных зонах — бери `GridScene`.
Кастомный пресет со своей вёрсткой (как `HookScene`) пиши только когда нужен визуальный эффект,
которого `GridScene` дать не может (счётчики, кастомная графика, специфичная анимация).

---

## Grid Layout System (`src/common/grid.ts`, `src/components/Grid.tsx`)

Фундамент раскладки для будущих пресетов: CSS Grid 5 колонок × 9 рядов на весь кадр 1080×1920.
Зоны и их grid-line числа — только в `common/grid.ts` (source of truth).

- `<GridLayout debug={true}>` — контейнер сетки. `debug` включает overlay с границами и подписями зон.
- `<GridZone zone="title">…</GridZone>` — размещает контент по имени зоны, без x/y координат.
  Зоны по рядам: `safe-top`, `title`, `main`, `sub-1`, `sub-1-continuation`, `sub-2`, `support`, `cta`, `safe-bottom`.
  По умолчанию колонки — CONTENT LEFT → CONTENT RIGHT; `safe-top`/`safe-bottom`/`safe-left`/`safe-right` всегда оставляем пустыми.
- Демо всех зон: композиция `GridSystemDemo` (`src/compositions/GridDemo.tsx`, зарегистрирована в `Root.tsx`).

Будущие пресеты должны собирать раскладку через `GridZone`, а не через ручные `position`/`top`/`left`.

---

## Соглашения

- **Данные и тексты** — только в манифесте (`videos/video-XX.ts`)
- **Цвета** — только через `colors.*` из `theme.ts`, не строками `"#xxxxxx"`
- **Тайминги** — только через `duration` в манифесте
- **Анимационная математика** — только в `primitives/`. Пресеты не пишут `spring()` напрямую
- **`as any` в SceneFrame** — намеренно. TypeScript не сужает union в `.map()`. Безопасность обеспечивается на уровне манифеста. Подробнее: `src/videos/types.ts`

---

## Запуск

```bash
cd project1
npm install
npm run dev          # Remotion Studio → http://localhost:3000
npx remotion render  # Рендер в out/MyFirstVideo.mp4
npm run lint         # ESLint + TypeScript
```

## Проверка

**Визуальную проверку (как выглядит сцена/видео) делает пользователь, не Claude.**
Claude не рендерит стоп-кадры и не использует `npx remotion still`/`npx remotion render`
для самопроверки внешнего вида. Вместо этого — запустить `npm run dev` (Remotion Studio на
`http://localhost:3000`) и оставить студию поднятой; пользователь сам открывает нужную
композицию и смотрит результат. `npx remotion render` уместен только когда пользователь
явно просит собрать финальный `.mp4`, а не как способ проверки правок.

1. `npx tsc --noEmit` — ноль ошибок
2. `npm run dev` — студия запускается без ошибок сборки/бандла (по логу, без рендера кадра)
3. `TOTAL_FRAMES` совпадает с суммой `duration` в манифесте (арифметическая проверка, без запуска студии)
4. **Обязательная статическая проверка safe-зон.** Safe-зоны (`safe-top`, `safe-bottom`, `safe-left`, `safe-right`) всегда должны оставаться пустыми — в них нельзя размещать контент. Перед тем как считать любую задачу с `GridZone`/`GridLayout` завершённой, выполни:
   ```bash
   grep -rn 'zone="safe-top"\|zone="safe-bottom"\|column="safe-left"\|column="safe-right"' src/presets src/videos
   ```
   Ожидаемый результат — **пусто** (кроме `src/components/Grid.tsx` и `src/common/grid.ts`, где эти имена определены как источник истины, и `src/compositions/GridDemo.tsx`, где safe-зоны используются только для подписи/визуализации, а не как контейнер для контента). Если grep нашёл совпадение в пресете или манифесте видео — это баг, контент нужно перенести в соседнюю контентную зону (`title`, `main`, `sub-1`, `sub-1-continuation`, `sub-2`, `support`, `cta`).
