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

- Написана структура проекта `docs/01..09` + роли `docs/roles/`. Закоммичено
  (`1d98da0`, `4c41947`).
- **DEL-1** (DEV, НЕ закоммичено): удалён shadcn UI-kit `src/components/ui/**`,
  `IntroPanel`, `Video04`, `video-04.ts`, `src/index.css`; убрана Tailwind-обвязка
  и её зависимости; `palette.ts` → плоский placeholder (`#000/#fff`-нейтраль);
  `tokens.ts` переключён на него; 8 пресетов в реестре. tsc 0, bundle ok.
  DEV попутно поправил `design-system/README.md` и `about.md §7` (я переписал
  `about.md` целиком под манифест).

## ⚠️ Блокер: git

- `project1/.git` **исчез** (был отдельный репозиторий с историей — `Refactor to
  declarative manifest-driven architecture`). История `project1/` потеряна.
- Корневой `.gitignore` содержит `project1/` → рабочий репозиторий `project1/`
  **не видит**. Значит **изменения DEL-1 не закоммитить.**
- Нужно решение INFRA-1: убрать `project1/` из `.gitignore`, `git add project1/`,
  сделать монорепо. Ждёт владельца.

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

1. **INFRA-1** (владелец): решить git-структуру, чтобы можно было закоммитить DEL-1.
2. **Аппрув пакетов Remotion** под motion-design: `@remotion/transitions`, `@remotion/shapes`,
   `@remotion/paths`, `@remotion/motion-blur`, `@remotion/layout-utils`, `@remotion/animation-utils`
   (+ возможно `@remotion/lottie`). См. предложение PM по реализации.
3. **DS-1** (DEV): `palette.ts` → `#000/#fff`; `tokens.ts` `color` → `ink/paper/fg/bg`,
   убрать `accent/danger/series/textMuted/textFaint`; `fonts.ts` → только Montserrat;
   `text.*` → Montserrat; убрать `elevation`. Прогнать `video-01..03` визуально (владелец).
4. Пересобрать backlog M1 под манифест (эпик DS переписать: DS-1 новый смысл, добавить
   движок сцены с режимом `paper/ink`, motion-паки, логотип/иконка-атомы).

## Правила

- `inputs/` не менять. Разборы — в `outputs/`. Данные не выдумывать.
- Новые пакеты — только с аппрувом владельца.
- Цвет/размер/шрифт — только через токены, не строками в пресетах. Два цвета, точка.
- Коммитит владелец вручную; PM обновляет этот файл после.
