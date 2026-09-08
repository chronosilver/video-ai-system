/**
 * primitives/text — текстовые эффекты.
 */

import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { DURATION } from "../common/design-system";

/**
 * Эффект печати: возвращает напечатанную часть строки, флаг завершения
 * и видимость мигающего курсора.
 */
export const useTypewriter = (
  fullText: string,
  delay = 0,
  charsPerSecond = 22
): { text: string; done: boolean; cursor: boolean } => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const elapsed = Math.max(0, frame - delay);
  const typed = Math.floor((elapsed / fps) * charsPerSecond);
  const count = Math.min(typed, fullText.length);
  return {
    text: fullText.slice(0, count),
    done: count >= fullText.length,
    cursor: Math.floor(frame / 15) % 2 === 0,
  };
};

/**
 * Анимированный счётчик: число от 0 до `target` за `duration` кадров после `delay`.
 * Относительный тайминг (не absolute startFrame/endFrame).
 */
export const useCountUp = (
  target: number,
  delay = 0,
  duration: number = DURATION.slow
): number => {
  const frame = useCurrentFrame();
  return Math.round(
    interpolate(frame, [delay, delay + duration], [0, target], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
};
