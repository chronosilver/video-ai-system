# Handoff

Дата: 2026-09-07

## Итоги сессии 2026-09-07

Полный отчёт — `outputs/session-summary.md`. Кратко:

1. Анализ проекта + клиентский апдейт (`outputs/client-update.md`).
2. Разобран риск «UI-kit ↔ Remotion» (`outputs/ui-kit-remotion-warnings.md`);
   добавлен `src/components/ui/README.md`; алиас `@/` в `tsconfig.json`.
3. Чистка legacy: удалён дубль `components-preset/`; удалены `theme.ts` / `colors.ts` /
   `fonts.ts` / `easing.ts` и 10 неиспользуемых legacy-пресетов.
4. Создан модуль **`src/common/design-system/`** — единый источник токенов
   (`text` / `color` / `space` / `radius` / `stroke` / `elevation` / `video` + `fonts`,
   `palette`, `scale`, `motion`). На него мигрированы 9 пресетов, `SceneFrame`,
   4 композиции, 4 манифеста.
5. Гайдлайн **`design-system/about.md`** (senior-дизайнер) — светлый редакционный
   минимализм: белый фон, тонкая почти-чёрная типографика (max Regular), зелёный
   `#CCFF00` только как редкая заливка-маркер.
6. Шрифты применены: SF Pro Display (Thin/Light) + Montserrat (Light/Regular),
   `fontWeight` = `thin/light/regular`, все пресеты на тонких весах.
7. Новые пресеты/композиции: `IntroPanel`+`Video04`, `Video03`; примитивы
   `useSpin` / `useTypewriter`.

**Не сделано (следующий шаг):** флип цветов на светлую тему + пересбор хардкод-цветов
в пресетах. См. «Next steps» ниже и `about.md` §7.

---

## Над чем работаем

Агентский цикл генерации коротких вертикальных видео (1080×1920) на Remotion;
новое видео = один манифест `project1/src/videos/video-XX.ts`. Сейчас — проработка
design system.

## Состояние проекта (`project1/`)

### Design system — единый модуль `src/common/design-system/`
- `fonts.ts` — **SF Pro Display** (заголовки) + **Montserrat** (остальное) + mono;
  `palette.ts` — сырая палитра (тема shadcn dark), `scale.ts` — числовые шкалы,
  `tokens.ts` — **семантика** (правится здесь), `motion.ts` — EASE, `index.ts` — вход. README рядом.
- Шрифты: `fontDisplay` (SF Pro Display) для `text.display/heading/subheading`,
  `fontBody` (Montserrat) для `text.title/body/caption`, `fontMono` для терминальных эффектов.
- **`design-system/about.md`** — гайдлайн по токенам (senior-дизайнер), актуальная
  версия: **светлый редакционный минимализм** — белый / светло-серый фон, тонкая
  почти-чёрная типографика (max Regular), зелёный `#CCFF00` только как редкая
  заливка-маркер (0–1 на кадр, как текст на белом запрещён — есть `accentInk` для
  зелёных пометок). Шкала 150/96/60/36/28/22, tracking 0. §7 файла — таблица
  расхождений с кодом.
- **Частично применено** (шрифты/веса): `fonts.ts` грузит Montserrat 100/300/400 и
  SF Pro Thin/Light/Regular; `scale.ts:fontWeight` = только `thin/light/regular`;
  `text.*` роли и все пресеты переведены на тонкие веса; tracking у display/heading → 0.
- **НЕ применено** (следующий шаг): цвета всё ещё тёмная тема (`palette` = `paletteDark`,
  `color.text` почти-белый). Флип на светлую тему + пересбор хардкод-цветов в пресетах —
  впереди (см. §7 about.md).
  Montserrat — через `@remotion/google-fonts/Montserrat` (пакет уже был). SF Pro Display —
  файлы .woff2 в `public/fonts/` (инструкция — `public/fonts/README.md`, имена обновлены на
  Thin/Light/Regular); пока их нет — системный SF Pro на macOS / Montserrat как fallback.
- Семантика: `text` (роли display / heading / subheading / title / body / caption —
  каждая = готовый объект стилей с fontFamily+size+weight+lineHeight+color),
  `color` (text/textMuted/textFaint/bg/surface/border/accent/danger/series.*),
  `space`, `radius`, `stroke`, `elevation`, `video`, `tint()`.
  Целевые значения — в `about.md`; часть ещё не применена (см. ниже).
- CSS-зеркало палитры — `src/index.css` (`:root`/`.dark`), синхронить при правке `palette.ts`.

### Удалено (старая тема)
- `src/common/theme.ts`, `colors.ts`, `fonts.ts`, `easing.ts` — заменены модулем DS.
- 10 неиспользуемых legacy-пресетов (`BackgroundGrid`, `CinematicSciFi`, `GlitchHook`,
  `LayoutOffGrid`, `ListHeroWithList`, `ListMinimalLeft`, `RollerTypewriter`,
  `Transition*`) — были off-contract, ни в одном манифесте. Убраны из `registry.ts`.
- Ранее: `components-preset/` из корня (дубль).

### Пресеты (9 в реестре)
`BlurReveal`, `CounterDuo`, `DocumentList`, `GridScene`, `HeroBadge`, `HookScene`,
`IntroPanel`, `SlideInList`, `TextTypewriter` — все переведены на токены DS.

### Композиции / манифесты
- `MyFirstVideo` (video-01), `Video03` (video-03, 10с), `Video04` (video-04, 12с),
  `GridSystemDemo`. Все манифесты мигрированы на `color.*` / `text.*`.
- ⚠️ video-01/02 при миграции получили ближайшие токены — палитра/размеры слегка
  сдвинулись относительно старых (ожидаемо, старую тему не сохраняем).

### UI-kit
`src/components/ui/*` (14 shadcn-компонентов) — жив, типизируется (алиас `@/` в
tsconfig), README рядом. CSS-анимации в Remotion не работают — движение только
через `src/primitives/`.

### Примитивы (`src/primitives/index.ts`)
Добавлены `useSpin`, `useTypewriter` (для IntroPanel).

## Проверки

- `npx tsc --noEmit` — **0 ошибок**.
- `npx eslint src` — 3 errors + 1 warning, все пред-существующие (SceneFrame `any` —
  намеренно; GridScene native `<img>`; registry `any`; progress.tsx non-pure-animation).
- `npm run dev` — студия собирается (`Built in 878ms`), :3000.
- safe-зоны чисто; `grep` по старым ссылкам (`common/theme`, `colors.`, `typography.`,
  `videoConfig`) — пусто.
- Арифметика: video-01 TOTAL=500, video-02=450, video-03=300, video-04=360 — совпадает
  с суммой `duration`.

## Next steps

1. **Флип на светлую тему** (по `about.md` §7): `palette.ts` → базовая `paletteLight`;
   `tokens.ts` `color.*` (bg белый, text `#141414`, серая лестница, `accent` только
   заливка, + `accentInk`, `textInverse`); `scale.ts` `fontSize` 150/96/60/36/28/22,
   `spacePx`/`radiusPx`; `elevation` без glow.
2. **Пересбор хардкод-цветов в пресетах** под светлый фон — `HookScene`, `DocumentList`,
   `SlideInList` и др. держат тёмные `rgba(255,255,255,…)`, `#1e1b4b`, тёмные градиенты;
   зелёные слова (`color.accent` как текст) → `color.text` / `accentInk`.
3. **`src/index.css`** синхронизировать с `paletteLight`; затем **`DesignSystemDemo`**
   (по образцу `GridSystemDemo`) — свотчи, все роли `text`, тени — визуальная проверка.

Также: положить файлы SF Pro Display в `public/fonts/` (Thin/Light/Regular) — без них
заголовки = системный SF Pro (macOS) / Montserrat.

## Правила

- `inputs/` не менять. Результаты — в `outputs/`. Данные не выдумывать.
- Новые пакеты не ставить без вопроса.
- Цвета/размеры/шрифт — только через токены DS, не строками в пресетах.
