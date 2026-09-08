/**
 * primitives/helpers — общая основа для остальных примитивов.
 *
 *   useProgress   — нормализованный прогресс входа 0..1 (пружина), база entrance-хуков
 *   staggerDelays — чистая функция задержек для каскада (бывш. useStagger)
 *   lerp          — реэкспорт из common/utils (clamped interpolate)
 */

import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRING, DURATION, type SpringName } from "../common/design-system";

export { lerp } from "../common/utils";

/**
 * Прогресс входа 0..1 на пружине. Единая математическая основа entrance-хуков
 * (`enter.ts`). `spring` — характер (см. SPRING), `duration` — длительность в кадрах.
 */
export const useProgress = (
  delay = 0,
  duration: number = DURATION.base,
  spring_: SpringName = "precise"
): number => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    frame: frame - delay,
    fps,
    config: SPRING[spring_],
    durationInFrames: duration,
  });
};

/**
 * Массив задержек для каскадной анимации. Чистая функция (не хук).
 * staggerDelays(3, 12) → [0, 12, 24]
 */
export const staggerDelays = (count: number, step: number): number[] =>
  Array.from({ length: count }, (_, i) => i * step);
