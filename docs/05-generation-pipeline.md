# 05 — Конвейер генерации

Как `Script + Comments` превращаются в отрендеренный ролик.

> ⚠️ **Порядок:** этот конвейер — цель майлстоуна **M2**, и приступать к нему только
> после того, как закрыт **M1** (дизайн-система + чистка, эпик DS).
>
> В M2 делаем **только ядро**: Planner (шаги A и B), лёгкий Validator, headless
> Render, запуск локальной командой из текстового файла. Вход берём из файла
> `inputs/script-XX.md`, **не из Notion**. Блоки «Notion row», Ingest и Delivery на
> схеме ниже — контекст будущего (M3), не задачи M2.

## Обзор

```
Notion row
   │  Ingest
   ▼
{ scriptBlocks[], comments[], brandPreset, targetDuration?, prevManifest? }
   │  Planner: шаг A (LLM) → шаг B (детерминированная сборка)
   ▼
manifest: SceneManifestEntry[]  +  TOTAL_FRAMES
   │  Validator
   ▼
[ tsc ok · frames ok · safe-zones ok · studio builds ]
   │  Render (headless Remotion)
   ▼
video.mp4 (1080×1920)
   │  Delivery
   ▼
Notion row: Video URL, Preview, Manifest JSON, Render log, Status=Done
```

## Контракт входа

```ts
interface GenerationRequest {
  pageId:          string;              // id строки Notion
  scriptBlocks:    string[];            // сценарий, разбитый по пустой строке / ---
  comments:        string[];            // по одному императиву на строку
  brandPreset:     "default";           // пока единственный
  targetDuration?: 10 | 15 | 20 | 30;   // секунды, подсказка
  prevManifest?:   SceneManifestEntry[]; // при Re-generate
}
```

## Planner — шаг A: раскладка смысла (LLM)

**Задача:** для каждого `scriptBlock` выбрать пресет и назначить длительность.
**Модель:** `openai` (уже в зависимостях). Позже — сравнить с Claude через API.

**Промпт получает:**
- список блоков сценария;
- **меню пресетов** — сгенерированное из `registry.ts`: имя, назначение, форма `data`,
  когда уместен (одно-два предложения на пресет, ведётся вручную рядом с пресетом);
- правила выбора из `CLAUDE.md` («GridScene по умолчанию; специфичный пресет только
  под визуальный эффект, которого GridScene не даёт»);
- комментарии пользователя;
- эвристики тайминга (ниже);
- при `Re-generate` — предыдущий манифест и какие сцены пользователь не просил менять.

**Модель возвращает строгий JSON** (structured output), не код:

```json
{
  "scenes": [
    { "block": 0, "preset": "HookScene", "durationSec": 2.0,
      "data": { "brand": "GUIDE DAO", "titleLine1": "Больше", "titleLine2": "памяти",
                "pill": "не равно", "accent": "умнее", "category": "AI / MEMORY" },
      "rationale": "крючок, одно противопоставление" },
    { "block": 1, "preset": "CounterDuo", "durationSec": 4.0,
      "data": { "left": {"value": 300, "label": "токенов"},
                "right": {"value": 113000, "label": "истории"}, "separator": ">" },
      "rationale": "два числа в противопоставлении — комментарий «счётчиком»" }
  ],
  "unmappable": []
}
```

- `unmappable` не пуст → планировщик останавливается, пишет `Needs fix` + объяснение.
- Цвета/веса/отступы модель **не задаёт** — только структуру и тексты.

## Planner — шаг B: детерминированная сборка

Чистый TypeScript, без LLM. Здесь гарантируется корректность.

1. **Токены.** Подставить `color.*` / `text.*` в места `data`, где пресет ждёт цвет.
   Модель прислала роль («danger», «muted») — код подставляет значение из `tokens.ts`.
2. **Кадры.** `durationInFrames = round(durationSec * video.fps)` (fps=30).
3. **Комментарии-патчи.** Применить распознанные императивы (`убери блок N`,
   `держи дольше`, `preset X вместо Y`) к списку сцен.
4. **Re-generate.** Слить: новые сцены из шага A поверх `prevManifest`, сцены вне
   области комментария — как были.
5. **Клампы.** `duration` в диапазон `[MIN_SCENE, MAX_SCENE]`; суммарная длина к
   `targetDuration` ± допуск (ужать/растянуть пропорционально).
6. **Сериализация.** Собрать модуль `src/videos/video-<id>.ts`:
   импорты токенов, `export const VIDEO_... : SceneManifestEntry[] = [...]`,
   `export const TOTAL_FRAMES = ...`. Либо — держать в памяти и передавать в рендер
   как `inputProps` без файла (см. открытый вопрос в `03-architecture.md`).

## Эвристики тайминга

| Тип блока | Базовая длительность | Правило |
|---|---|---|
| Хук / заголовок | 2.0 сек (60 к) | +0.5 сек, если 2 строки |
| Число / счётчик | 3.5–4.0 сек | нужно время «дочитать» анимацию счётчика |
| Список 3 пункта | 3.0 сек (90 к) | +0.5 сек за каждый пункт сверх 3 |
| Короткая фраза / вывод | 2.0 сек (60 к) | — |
| CTA / бренд-плашка | 2.5–3.0 сек | последняя сцена, дать «зависнуть» |
| Текст на чтение (>12 слов) | 0.35 сек/слово | но не длиннее `MAX_SCENE` |

Константы (в `service/planner/config.ts`): `MIN_SCENE = 45`, `MAX_SCENE = 150` кадров,
`TARGET_TOLERANCE = ±15%`.

## Validator

Прогон чек-листа из `CLAUDE.md` (§ «Проверка»), в порядке дешевизны:

1. **Арифметика:** `TOTAL_FRAMES === Σ duration`. (без сборки)
2. **safe-зоны:**
   `grep -rn 'zone="safe-top"\|zone="safe-bottom"\|column="safe-left"\|column="safe-right"' src/presets src/videos`
   → пусто.
3. **Типы:** `npx tsc --noEmit` → 0 ошибок. Ловит невалидный `data` для пресета.
4. **Сборка:** `npm run dev` (или `remotion bundle`) собирается без ошибок бандла.
   Кадр не рендерим.

Любой провал → `Status = Error`, лог в Notion, рендер не запускается.

## Render

- **Node API, не CLI** (`remotion.config.ts` в Node-режиме не применяется — опции
  передаём явно: `imageFormat: "jpeg"`, `overwrite: true`, tailwind через webpack override).
- `selectComposition` + `renderMedia` с `inputProps: { manifest }`.
- Выход: `out/video-<id>.mp4`, H.264, 1080×1920, 30 fps.
- Логировать длительность рендера (метрика стоимости).
- Позже: кеш по `sha256(JSON.stringify(manifest))`.

## QA — что проверяет человек

Автоматика гарантирует корректность (типы, кадры, зоны, сборка). **Визуальную
приёмку делает пользователь** в Notion: смотрит `Video URL`, пишет `Comments` или
переводит в `Done`. Агент стоп-кадры для самопроверки не рендерит (`CLAUDE.md`).

## Оценка планировщика (offline)

Держать набор эталонов: `Script` → ожидаемая структура манифеста.
`video-01` — первый эталон (6 блоков → 6 конкретных пресетов). Добавлять по мере
роста. Метрика: доля блоков с угаданным пресетом, отклонение по длительности.
Прогонять при каждом изменении промпта планировщика.
