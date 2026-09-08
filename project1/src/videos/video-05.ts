/**
 * Манифест video-05 — «Вайб-кодинг: держи контроль» (обучающая серия).
 *
 * Все 9 сцен — на сцене-шаблоне SequentialReveal (см. src/templates/).
 * Режим кадра чередуется ink / paper по смыслу (акцентные тезисы — ink).
 *
 * 9 сцен, TOTAL_FRAMES = 1545 (30 fps → 51.5 сек).
 */

import type { SceneManifestEntry } from "./types";

export const VIDEO_05: SceneManifestEntry[] = [
  {
    preset: "SequentialReveal",
    duration: 150,
    data: {
      mode: "ink",
      items: [
        { kind: "text", role: "h1", value: "Вайб-кодинг" },
        { kind: "text", role: "body", value: "не конец программирования. другой навык." },
      ],
    },
  },
  {
    preset: "SequentialReveal",
    duration: 165,
    data: {
      mode: "paper",
      items: [
        { kind: "text", role: "h2", value: "Суть" },
        { kind: "text", role: "body", value: "ты описываешь задачу словами — код пишет модель" },
      ],
    },
  },
  {
    preset: "SequentialReveal",
    duration: 165,
    data: {
      mode: "paper",
      items: [
        { kind: "text", role: "h2", value: "Ловушка" },
        { kind: "text", role: "body", value: "принял первый ответ, не разобрался, поехал дальше" },
      ],
    },
  },
  {
    preset: "SequentialReveal",
    duration: 150,
    data: {
      mode: "ink",
      items: [
        { kind: "text", role: "h1", value: "Чёрный ящик" },
        { kind: "text", role: "body", value: "через неделю ни ты, ни модель не помните, как проект устроен" },
      ],
    },
  },
  {
    preset: "SequentialReveal",
    duration: 180,
    data: {
      mode: "paper",
      items: [
        { kind: "text", role: "h2", value: "Навык сместился" },
        { kind: "text", role: "body", value: "раньше — быстро написать" },
        { kind: "text", role: "body", value: "теперь — точно сформулировать и проверить" },
      ],
    },
  },
  {
    preset: "SequentialReveal",
    duration: 240,
    data: {
      mode: "paper",
      items: [
        { kind: "text", role: "h2", value: "Что тренировать" },
        { kind: "text", role: "body", value: "дробить задачу на маленькие шаги" },
        { kind: "text", role: "body", value: "читать дифф, а не только результат" },
        { kind: "text", role: "body", value: "просить объяснить до того, как принял" },
      ],
    },
  },
  {
    preset: "SequentialReveal",
    duration: 165,
    data: {
      mode: "ink",
      items: [
        { kind: "text", role: "h1", value: "Один шаг — один вопрос — один коммит" },
        { kind: "text", role: "body", value: "понял — дальше. не понял — стоп." },
      ],
    },
  },
  {
    preset: "SequentialReveal",
    duration: 165,
    data: {
      mode: "paper",
      items: [
        { kind: "logo", name: "claude" },
        { kind: "logo", name: "cursor" },
        { kind: "logo", name: "copilot" },
        { kind: "text", role: "body", value: "инструмент вторичен. ведёшь ты." },
      ],
    },
  },
  {
    preset: "SequentialReveal",
    duration: 165,
    data: {
      mode: "ink",
      items: [
        { kind: "text", role: "h1", value: "Держи контроль" },
        { kind: "text", role: "body", value: "учишься вайб-кодингу — учись держать контроль" },
        { kind: "text", role: "small", value: "серия · выпуск" },
      ],
    },
  },
];

export const TOTAL_FRAMES = VIDEO_05.reduce((sum, s) => sum + s.duration, 0); // 1545
