# Разбор папки `components-preset/` (корень репозитория)

Дата: 2026-09-07

## Что это было

9 файлов пресетов в корне репозитория (вне `project1/`), дата 17 июля, untracked:
`BackgroundGrid`, `CinematicSciFi`, `LayoutOffGrid`, `ListHeroWithList`,
`ListMinimalLeft`, `RollerTypewriter`, `TransitionDiagonalSlice`,
`TransitionFlash`, `TransitionZoomBlur`.

## Вывод: устаревший дубль

Каждый файл **побайтово совпадает** с одноимённым в `project1/src/presets/`,
единственная разница — путь импорта:

| `components-preset/` | `project1/src/presets/` |
|---|---|
| `from "../../common"` | `from "../common"` |

Все 9 уже:
- лежат в `project1/src/presets/` (рабочая версия, с корректным путём);
- импортированы и зарегистрированы в `project1/src/presets/registry.ts`;
- проходят `npx tsc --noEmit` в составе проекта.

Ни один из 9 не используется в манифестах (video-01/02/03), но доступен по имени
через реестр.

## Действие

`components-preset/` удалена из корня. Потери нет — содержимое полностью
сохранено в `project1/src/presets/` (идентично). В `project1/` изменений не
потребовалось.

## Не сделано (отдельная задача, требует решения)

Сами 9 пресетов (в `project1/src/presets/`) не следуют текущему контракту
CLAUDE.md:
- вызывают `spring()` / `interpolate()` напрямую вместо хуков из `primitives/`;
- берут цвет из `C` (`colors.ts`), а не `colors.*` / `palette.*`;
- хардкодят текст («NEXUS», «BUILD BETTER») вместо `data`-пропсов.

Привести их к манифест-driven виду или пометить demo-only — по решению.
