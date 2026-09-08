/**
 * Язык движения — единые константы для хуков `src/primitives/`.
 *
 *   EASE     — bezier-кривые для interpolate()
 *   SPRING   — конфиги пружины для spring() (по характеру входа)
 *   DURATION — длительности входов в кадрах (30 fps)
 *
 * Длительность ролика и сцен живёт в манифесте через `duration`, не здесь —
 * DURATION задаёт только «скорость жеста» отдельного элемента.
 */

import { Easing } from "remotion";

export const EASE = {
  out:       Easing.bezier(0.16, 1, 0.3, 1),
  in:        Easing.bezier(0.7, 0, 0.84, 0),
  inOut:     Easing.bezier(0.87, 0, 0.13, 1),
  overshoot: Easing.bezier(0.34, 1.56, 0.64, 1),
  smooth:    Easing.bezier(0.4, 0, 0.2, 1),
} as const;

/** Характеры пружины для spring(). `precise` — дефолт входов (без раскачки). */
export const SPRING = {
  precise: { damping: 200, mass: 0.5 },
  snappy:  { damping: 26,  mass: 0.7 },
  soft:    { damping: 14,  mass: 0.6 },
  bouncy:  { damping: 9,   mass: 0.8 },
} as const;

export type SpringName = keyof typeof SPRING;

/** Длительность входа элемента в кадрах. */
export const DURATION = {
  quick: 10,
  base:  16,
  slow:  24,
  xslow: 36,
} as const;
