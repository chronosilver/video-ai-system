/**
 * Манифест video-03.
 *
 * Одна сцена GridScene в последовательном режиме: четыре строки текста
 * раскладываются по зонам сетки сверху вниз (title → main → sub-1 →
 * sub-1-continuation). Появление — каскадом (fade + slide-up, stagger).
 *
 * 1 сцена × 300 кадров = 10 сек (30 fps).
 */

import type { SceneManifestEntry } from "./types";
import { color } from "../common";

export const VIDEO_03: SceneManifestEntry[] = [
  {
    preset:   "GridScene",
    duration: 300,
    data: {
      background: color.bg,
      stagger:    14, // кадров между появлением соседних строк
      items: [
        // №0 → зона title (центр, вверху)
        { type: "text", value: "ПЕРВОЕ",    color: color.accent },
        // №1 → зона main
        { type: "text", value: "ВТОРОЕ",    color: color.text },
        // №2 → зона sub-1 (ниже)
        { type: "text", value: "ТРЕТЬЕ",    color: color.text,      variant: "subheading" },
        // №3 → зона sub-1-continuation (ещё ниже)
        { type: "text", value: "четвертое", color: color.textMuted, variant: "title" },
      ],
    },
  },
];

export const TOTAL_FRAMES = VIDEO_03.reduce((sum, s) => sum + s.duration, 0); // 300
