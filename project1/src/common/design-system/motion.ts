/**
 * Кривые плавности для interpolate() и хуков анимации.
 * Тайминги (в кадрах) живут в манифесте через `duration`, не здесь.
 */

import { Easing } from "remotion";

export const EASE = {
  out:       Easing.bezier(0.16, 1, 0.3, 1),
  in:        Easing.bezier(0.7, 0, 0.84, 0),
  inOut:     Easing.bezier(0.87, 0, 0.13, 1),
  overshoot: Easing.bezier(0.34, 1.56, 0.64, 1),
  smooth:    Easing.bezier(0.4, 0, 0.2, 1),
} as const;
