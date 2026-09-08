/**
 * Манифест video-05 — «Вайб-кодинг: держи контроль» (обучающая серия, выпуск #01).
 *
 * Все 9 сцен — на сцене-шаблоне SequentialReveal. Плотные сцены: по 6 элементов,
 * после G1 они равномерно ложатся в 6 из 7 контентных зон
 * (title, main, sub-1, sub-2, support, cta — пропускается sub-1-continuation).
 * Режим кадра чередуется ink / paper; каждому элементу задан явный `enter`.
 *
 * 9 сцен, TOTAL_FRAMES = 940 (30 fps → 31.33 сек).
 */

import type { SceneManifestEntry } from "./types";

export const VIDEO_05: SceneManifestEntry[] = [
  {
    preset: "SequentialReveal",
    duration: 100,
    data: {
      mode: "ink",
      items: [
        { kind: "text", role: "small", value: "ВАЙБ-КОДИНГ · #01", enter: "fade" },
        { kind: "text", role: "h1", value: "Другой навык", enter: "zoomIn" },
        { kind: "text", role: "body", value: "это не «программирование кончилось»", enter: "rise" },
        { kind: "text", role: "body", value: "ты описываешь задачу — модель пишет код", enter: "slideLeft" },
        { kind: "text", role: "body", value: "ты решаешь, что верно, и проверяешь", enter: "slideRight" },
        { kind: "text", role: "small", value: "ЛИСТАЙ →", enter: "fade" },
      ],
    },
  },
  {
    preset: "SequentialReveal",
    duration: 100,
    data: {
      mode: "paper",
      items: [
        { kind: "text", role: "small", value: "КАК ЭТО РАБОТАЕТ", enter: "fade" },
        { kind: "text", role: "h2", value: "Диалог, не редактор", enter: "maskWipe" },
        { kind: "text", role: "body", value: "просишь словами", enter: "rise" },
        { kind: "text", role: "body", value: "получаешь дифф", enter: "rise" },
        { kind: "text", role: "body", value: "принимаешь или уточняешь", enter: "rise" },
        { kind: "text", role: "body", value: "повторяешь маленькими шагами", enter: "drop" },
      ],
    },
  },
  {
    preset: "SequentialReveal",
    duration: 100,
    data: {
      mode: "paper",
      items: [
        { kind: "text", role: "small", value: "ГЛАВНАЯ ОШИБКА", enter: "fade" },
        { kind: "text", role: "h2", value: "Принял, не понял", enter: "drop" },
        { kind: "text", role: "body", value: "первый ответ выглядит рабочим", enter: "rise" },
        { kind: "text", role: "body", value: "ты не разобрался и поехал дальше", enter: "slideLeft" },
        { kind: "text", role: "body", value: "долг копится молча", enter: "slideRight" },
        { kind: "text", role: "body", value: "через неделю не помнишь, как всё связано", enter: "rise" },
      ],
    },
  },
  {
    preset: "SequentialReveal",
    duration: 100,
    data: {
      mode: "ink",
      items: [
        { kind: "text", role: "small", value: "ЧЕМ КОНЧАЕТСЯ", enter: "fade" },
        { kind: "text", role: "h1", value: "Чёрный ящик", enter: "blurIn" },
        { kind: "text", role: "body", value: "проект работает, но никто не знает как", enter: "rise" },
        { kind: "text", role: "body", value: "ни ты", enter: "slideLeft" },
        { kind: "text", role: "body", value: "ни модель — контекст уехал", enter: "slideRight" },
        { kind: "text", role: "body", value: "правка ломает три других места", enter: "rise" },
      ],
    },
  },
  {
    preset: "SequentialReveal",
    duration: 110,
    data: {
      mode: "paper",
      items: [
        { kind: "text", role: "small", value: "ЧТО ИЗМЕНИЛОСЬ", enter: "fade" },
        { kind: "text", role: "h2", value: "Навык сместился", enter: "scaleIn" },
        { kind: "text", role: "body", value: "раньше ценили — быстро написать", enter: "rise" },
        { kind: "text", role: "body", value: "теперь — точно сформулировать", enter: "rise" },
        { kind: "text", role: "body", value: "и проверить чужой код", enter: "rise" },
        { kind: "text", role: "body", value: "читать важнее, чем печатать", enter: "maskWipe" },
      ],
    },
  },
  {
    preset: "SequentialReveal",
    duration: 120,
    data: {
      mode: "paper",
      items: [
        { kind: "text", role: "small", value: "ЧТО ТРЕНИРОВАТЬ", enter: "fade" },
        { kind: "text", role: "h2", value: "Три привычки", enter: "maskWipe" },
        { kind: "text", role: "body", value: "1 — дробить задачу на шаги в один коммит", enter: "slideLeft" },
        { kind: "text", role: "body", value: "2 — читать дифф целиком, не только результат", enter: "slideLeft" },
        { kind: "text", role: "body", value: "3 — просить объяснить до того, как принял", enter: "slideLeft" },
        { kind: "text", role: "body", value: "не понял объяснение — не принимай", enter: "rise" },
      ],
    },
  },
  {
    preset: "SequentialReveal",
    duration: 100,
    data: {
      mode: "ink",
      items: [
        { kind: "text", role: "small", value: "ПРАВИЛО", enter: "fade" },
        { kind: "text", role: "h1", value: "Шаг — вопрос — коммит", enter: "zoomIn" },
        { kind: "text", role: "body", value: "один вопрос за раз", enter: "rise" },
        { kind: "text", role: "body", value: "один коммит за шаг", enter: "rise" },
        { kind: "text", role: "body", value: "понял — дальше", enter: "slideLeft" },
        { kind: "text", role: "body", value: "не понял — стоп, разбираешься", enter: "slideRight" },
      ],
    },
  },
  {
    preset: "SequentialReveal",
    duration: 110,
    data: {
      mode: "paper",
      items: [
        { kind: "text", role: "small", value: "ПРО ИНСТРУМЕНТЫ", enter: "fade" },
        { kind: "text", role: "h2", value: "Не в этом суть", enter: "maskWipe" },
        { kind: "logo", name: "claude", enter: "scaleIn" },
        { kind: "logo", name: "cursor", enter: "scaleIn" },
        { kind: "logo", name: "githubcopilot", enter: "scaleIn" },
        { kind: "text", role: "body", value: "любой. важно, что ведёшь ты", enter: "rise" },
      ],
    },
  },
  {
    preset: "SequentialReveal",
    duration: 100,
    data: {
      mode: "ink",
      items: [
        { kind: "text", role: "small", value: "ИТОГ · #01", enter: "fade" },
        { kind: "text", role: "h1", value: "Держи контроль", enter: "maskWipe" },
        { kind: "text", role: "body", value: "ускоряет — если понимаешь код", enter: "slideLeft" },
        { kind: "text", role: "body", value: "превращает в кашу — если нет", enter: "slideRight" },
        { kind: "text", role: "body", value: "учись вести, а не догонять", enter: "rise" },
        { kind: "text", role: "small", value: "СЛЕДУЮЩИЙ ВЫПУСК — ПРО КОНТЕКСТ", enter: "fade" },
      ],
    },
  },
];

export const TOTAL_FRAMES = VIDEO_05.reduce((sum, s) => sum + s.duration, 0); // 940
