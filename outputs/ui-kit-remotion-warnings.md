# UI-kit ↔ Remotion: фактический разбор предупреждений

Дата: 2026-09-07
Область: `project1/`
Источник риска: `inputs/risks.md` — «Не решен вопрос как анимации из ui kit будут
взаимодействовать с remotion, пока висят предупреждения».

## Что проверено

| Проверка | Команда | Результат |
|---|---|---|
| Сборка студии | `npm run dev` | `Built in 691ms`, предупреждений в бандле нет |
| Типы | `npx tsc --noEmit` | 4 ошибки TS2307 (см. ниже) |
| Линт | `npx eslint src` | 3 errors, 1 warning |

## Ключевой факт

UI-kit (`src/components/ui/*` — shadcn-компоненты, 15 файлов, в git пока untracked)
**не импортируется ни одной сценой или пресетом**:

```
grep -rn "components/ui" src --include=*.tsx --include=*.ts | grep -v "src/components/ui/"
# → пусто
```

Поэтому студия собирается чисто. Предупреждения появляются только при статических
проверках (`tsc`, `eslint`), а не в рантайме рендера.

## Предупреждение про анимации (ядро риска)

`npx eslint src`:

```
src/components/ui/progress.tsx
  23:52  warning  This animation does not run purely off useCurrentFrame()
                  and will lead to flickering.
                  See: https://www.remotion.dev/docs/flickering
                  @remotion/non-pure-animation
```

Причина: shadcn-компоненты анимируются через CSS (`transition-*`, `animate-spin`,
`transition-[color,box-shadow]` и т.п.). Remotion рендерит покадрово и требует, чтобы
анимация была функцией от `useCurrentFrame()`; CSS-переходы во время рендера дают
рассинхрон/флик. Класс `animate-spin` есть также в `src/components/ui/spinner.tsx`,
CSS-`transition-*` — в `button.tsx`, `badge.tsx`, `input.tsx`, `input-group.tsx`,
`tabs.tsx`, `textarea.tsx`, `progress.tsx` (линтер отметил `progress.tsx`, т.к. там
инлайновый стиль на прогрессе).

Вывод: UI-kit в текущем виде — это React-компоненты для **интерактивного UI**, а не
для покадрового видео. Их CSS-анимации в Remotion работать корректно не будут.

## Ошибки типов (TS2307)

```
src/components/ui/attachment.tsx(6,24):  Cannot find module '@/components/ui/button'
src/components/ui/input-group.tsx(7,24): Cannot find module '@/components/ui/button'
src/components/ui/input-group.tsx(8,23): Cannot find module '@/components/ui/input'
src/components/ui/input-group.tsx(9,26): Cannot find module '@/components/ui/textarea'
```

Причина: shadcn использует алиас `@/`, а в `project1/tsconfig.json` секции
`compilerOptions.paths` нет. Алиас не настроен.

## Прочий шум линта (не связано с UI-kit напрямую)

```
src/presets/GridScene.tsx:109  error  Prefer the <Img /> tag from 'remotion'  @remotion/warn-native-media-tag
src/components/SceneFrame.tsx:29  error  Unexpected any            (намеренно, см. src/videos/types.ts)
src/presets/registry.ts:47       error  Unexpected any
```

## Варианты решения (на выбор, не реализовано)

1. **Не тащить shadcn UI-kit в видео.** Держать анимации только в `primitives/`
   (хуки от `useCurrentFrame()`), как требует манифест проекта. UI-kit удалить или
   вынести из области рендера.
2. Если визуальный язык shadcn нужен — переносить **только статические стили**
   (классы Tailwind, токены), без CSS-transition/animate-классов; движение делать
   через `primitives/`.
3. Если UI-kit всё же оставляют в репозитории — прописать `paths` в `tsconfig.json`
   (`"@/*": ["./src/*"]`), чтобы убрать TS2307, и не импортировать эти компоненты
   в composition.

Это вход для задачи «создание design system» (`inputs/notes.md`).
