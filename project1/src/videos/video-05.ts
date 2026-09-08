/**
 * Манифест video-05 — «Вайб-кодинг: держи контроль» (обучающая серия).
 *
 * Все 9 сцен — на сцене-шаблоне SequentialReveal (см. src/templates/).
 * Режим кадра чередуется ink / paper по смыслу (акцентные тезисы — ink).
 * Каждому элементу задан явный `enter` — по ролику прогоняются все 9
 * entrance-типов.
 *
 * 9 сцен, TOTAL_FRAMES = 735 (30 fps → 24.5 сек).
 */

import type { SceneManifestEntry } from "./types";

export const VIDEO_05: SceneManifestEntry[] = [
  {
    preset: "SequentialReveal",
    duration: 75,
    data: {
      mode: "ink",
      items: [
        { kind: "text", role: "h1", value: "Вайб-кодинг", enter: "zoomIn" },
        { kind: "text", role: "body", value: "не конец программирования. другой навык.", enter: "fade" },
      ],
    },
  },
  {
    preset: "SequentialReveal",
    duration: 75,
    data: {
      mode: "paper",
      items: [
        { kind: "text", role: "h2", value: "Суть", enter: "maskWipe" },
        { kind: "text", role: "body", value: "ты описываешь задачу словами — код пишет модель", enter: "rise" },
      ],
    },
  },
  {
    preset: "SequentialReveal",
    duration: 75,
    data: {
      mode: "paper",
      items: [
        { kind: "text", role: "h2", value: "Ловушка", enter: "drop" },
        { kind: "text", role: "body", value: "принял первый ответ, не разобрался, поехал дальше", enter: "slideLeft" },
      ],
    },
  },
  {
    preset: "SequentialReveal",
    duration: 75,
    data: {
      mode: "ink",
      items: [
        { kind: "text", role: "h1", value: "Чёрный ящик", enter: "blurIn" },
        { kind: "text", role: "body", value: "через неделю ни ты, ни модель не помните, как проект устроен", enter: "slideRight" },
      ],
    },
  },
  {
    preset: "SequentialReveal",
    duration: 90,
    data: {
      mode: "paper",
      items: [
        { kind: "text", role: "h2", value: "Навык сместился", enter: "scaleIn" },
        { kind: "text", role: "body", value: "раньше — быстро написать", enter: "rise" },
        { kind: "text", role: "body", value: "теперь — точно сформулировать и проверить", enter: "drop" },
      ],
    },
  },
  {
    preset: "SequentialReveal",
    duration: 90,
    data: {
      mode: "paper",
      items: [
        { kind: "text", role: "h2", value: "Что тренировать", enter: "maskWipe" },
        { kind: "text", role: "body", value: "дробить задачу на маленькие шаги", enter: "slideLeft" },
        { kind: "text", role: "body", value: "читать дифф, а не только результат", enter: "slideRight" },
        { kind: "text", role: "body", value: "просить объяснить до того, как принял", enter: "fade" },
      ],
    },
  },
  {
    preset: "SequentialReveal",
    duration: 75,
    data: {
      mode: "ink",
      items: [
        { kind: "text", role: "h1", value: "Один шаг — один вопрос — один коммит", enter: "zoomIn" },
        { kind: "text", role: "body", value: "понял — дальше. не понял — стоп.", enter: "rise" },
      ],
    },
  },
  {
    preset: "SequentialReveal",
    duration: 90,
    data: {
      mode: "paper",
      items: [
        { kind: "logo", name: "claude", enter: "slideRight" },
        { kind: "logo", name: "cursor", enter: "rise" },
        { kind: "logo", name: "githubcopilot", enter: "slideLeft" },
        { kind: "text", role: "body", value: "инструмент вторичен. ведёшь ты.", enter: "fade" },
      ],
    },
  },
  {
    preset: "SequentialReveal",
    duration: 90,
    data: {
      mode: "ink",
      items: [
        { kind: "text", role: "h1", value: "Держи контроль", enter: "maskWipe" },
        { kind: "text", role: "body", value: "учишься вайб-кодингу — учись держать контроль", enter: "rise" },
        { kind: "text", role: "small", value: "серия · выпуск", enter: "fade" },
      ],
    },
  },
];

export const TOTAL_FRAMES = VIDEO_05.reduce((sum, s) => sum + s.duration, 0); // 735
