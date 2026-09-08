/**
 * Манифест video-01 — «Больше памяти ≠ умнее» (GUIDE DAO).
 *
 * Чтобы изменить видео: отредактируй этот массив.
 * Чтобы создать новое видео: скопируй файл → video-05.ts.
 * Доступные пресеты: src/presets/registry.ts
 */

import type { SceneManifestEntry } from "./types";
import { color, tint } from "../common";

export const VIDEO_01: SceneManifestEntry[] = [
  {
    preset:   "HookScene",
    duration: 60,
    data: {
      brand:      "GUIDE DAO",
      category:   "AI / MEMORY",
      titleLine1: "Больше",
      titleLine2: "памяти",
      pill:       "не равно",
      accent:     "умнее",
    },
  },
  {
    preset:   "CounterDuo",
    duration: 120,
    data: {
      left: {
        value:      300,
        label:      "токенов",
        color:      color.series.teal,
        labelColor: color.textMuted,
      },
      right: {
        value:      113_000,
        label:      "истории",
        color:      color.textMuted,
        labelColor: color.textFaint,
      },
      separator: ">",
    },
  },
  {
    preset:   "DocumentList",
    duration: 90,
    data: {
      title:    "Больше документов",
      subtitle: "≠ быстрее найти нужный",
      noise: [
        "Договор аренды 2021",
        "Отчет_финал_v2.pdf",
        "Смета_выгрузка.xlsx",
        "Презентация_правки.key",
      ],
      target: "Нужный договор!",
    },
  },
  {
    preset:   "SlideInList",
    duration: 90,
    data: {
      title: "Мой рабочий процесс:",
      items: [
        { id: 1, num: "01", text: "Найти источники", bg: tint(color.series.indigo, 0.12), border: color.series.indigo, delay: 0  },
        { id: 2, num: "02", text: "Чистый тред",     bg: tint(color.series.rose,   0.12), border: color.series.rose,   delay: 15 },
        { id: 3, num: "03", text: "Сделать вывод",   bg: tint(color.series.teal,   0.12), border: color.series.teal,   delay: 30 },
      ],
    },
  },
  {
    preset:   "BlurReveal",
    duration: 60,
    data: {
      lines: [
        { text: "Меньше шума.",              color: color.text,   delay: 0,  duration: 25 },
        { text: "Меньше уверенных выдумок.", color: color.danger, delay: 20, duration: 25 },
      ],
    },
  },
  {
    preset:   "HeroBadge",
    duration: 80,
    data: {
      title:        "Guide DAO",
      tagline:      "AI и crypto на практике",
      gradient:     `linear-gradient(135deg, ${color.series.indigo} 0%, ${color.series.teal} 100%)`,
      shadow:       "0 25px 50px -12px rgba(79, 70, 229, 0.5)",
      taglineColor: color.textMuted,
    },
  },
];

export const TOTAL_FRAMES = VIDEO_01.reduce((sum, s) => sum + s.duration, 0);
