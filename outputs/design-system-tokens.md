# Design system — итог

Дата: 2026-09-07
Область: `project1/`

> **Статус на конец сессии:** этот файл описывает создание модуля. Актуальный
> общий отчёт — `outputs/session-summary.md`. Целевой дизайн-язык (светлая тема,
> тонкие шрифты) и таблица «что ещё применить» — в `project1/src/common/design-system/about.md`.
> После этого файла в модуль добавлены: `fonts.ts` (SF Pro Display + Montserrat вместо
> Inter), `about.md`, ограничение весов до `thin/light/regular`.

## Что сделано

### Единый модуль — `src/common/design-system/`
| Файл | Роль |
|---|---|
| `fonts.ts` | загрузка Inter (веса 400–900, latin+cyrillic) |
| `palette.ts` | сырая палитра — дефолтная тема shadcn/ui (Tailwind v4, OKLCH, dark) |
| `scale.ts` | числовые шкалы (fontSize, fontWeight, lineHeight, space, radius) в px |
| `tokens.ts` | **семантика** — `text`, `color`, `space`, `radius`, `stroke`, `elevation`, `video`, `tint()` |
| `motion.ts` | `EASE` — кривые Безье |
| `index.ts` | точка входа (реэкспорт) |
| `README.md` | описание слоёв и токенов |

### Типографические роли (`text`)
`display` (104) · `heading` (80) · `subheading` (52) · `title` (34) · `body` (26) ·
`caption` (20, моно). Каждая роль — готовый объект стилей
`{ fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, color }`.
Размеры правятся в `scale.ts:fontSize`, шрифт — в `fonts.ts`, всё остальное — в `tokens.ts:text`.

### Цветовые роли (`color`)
`text`, `textMuted`, `textFaint`, `bg`, `surface`, `border`, `borderStrong`,
`accent` (`#ccff00` — единственный хардкод, под бренд), `onAccent`, `danger`,
`series.{indigo,teal,amber,violet,rose}`. `tint(c, alpha)` — прозрачный оттенок.

## Удалено (старая тема — по запросу)
- `src/common/theme.ts`, `colors.ts`, `fonts.ts`, `easing.ts` — заменены модулем DS.
- 10 неиспользуемых legacy-пресетов (`BackgroundGrid`, `CinematicSciFi`, `GlitchHook`,
  `LayoutOffGrid`, `ListHeroWithList`, `ListMinimalLeft`, `RollerTypewriter`,
  `TransitionDiagonalSlice/Flash/ZoomBlur`) — off-contract, ни в одном манифесте.
  Убраны из `registry.ts`.

## Мигрировано на токены DS
9 пресетов (`BlurReveal`, `CounterDuo`, `DocumentList`, `GridScene`, `HeroBadge`,
`HookScene`, `IntroPanel`, `SlideInList`, `TextTypewriter`), `SceneFrame`,
4 композиции, 4 манифеста (`video-01..04`).

⚠️ video-01/02 при миграции получили ближайшие токены — цвета/размеры слегка
сдвинулись относительно старой темы (её не сохраняем). Визуальная проверка — за пользователем.

## Проверки
- `npx tsc --noEmit` — 0 ошибок.
- `npx eslint src` — 3 errors + 1 warning, все пред-существующие (не из этой правки).
- `npm run dev` — студия собирается (`Built in 878ms`).
- `grep` по старым ссылкам (`common/theme`, `colors.`, `typography.`, `videoConfig`,
  ` C.`) — пусто. safe-зоны чисто.

## CSS-зеркало
`src/index.css` (`:root` / `.dark`) — те же значения палитры для Tailwind-классов и
`src/components/ui/*`. Пока — дефолт shadcn; синхронизировать с финальным `palette.ts`.

## Next steps
1. Настроить `text` / `color` под бренд — `src/common/design-system/tokens.ts`
   (размеры → `scale.ts`, шрифт → `fonts.ts`).
2. Демо-композиция `DesignSystemDemo` — свотчи палитры, роли `text`, радиусы/тени.
3. Синхронизировать `src/index.css` с финальной палитрой.
4. Визуально проверить video-01/02 после сдвига токенов.
