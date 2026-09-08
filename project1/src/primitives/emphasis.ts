/**
 * primitives/emphasis — циклические / акцентные хуки.
 * Возвращают СЫРОЕ значение (число или bool), не объект стилей —
 * элемент сам решает, куда его применить.
 */

import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

/** Пульсация масштабом на синусе: возвращает scale ~1..1+amplitude. */
export const usePulse = (speed = 0.15, amplitude = 0.05): number => {
  const frame = useCurrentFrame();
  return interpolate(Math.sin(frame * speed), [-1, 1], [1, 1 + amplitude]);
};

/**
 * Непрерывное вращение от кадра: возвращает угол в градусах.
 * Кадро-синхронная замена CSS `animate-spin`.
 */
export const useSpin = (degreesPerSecond = 360, delay = 0): number => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (Math.max(0, frame - delay) / fps) * degreesPerSecond;
};

/** Медленный вертикальный дрейф на синусе: возвращает translateY в px. */
export const useFloat = (amplitude = 8, speed = 0.05): number => {
  const frame = useCurrentFrame();
  return Math.sin(frame * speed) * amplitude;
};

/** Мигание (курсор, маркер): true/false с периодом `period` кадров на фазу. */
export const useBlink = (period = 15): boolean => {
  const frame = useCurrentFrame();
  return Math.floor(frame / period) % 2 === 0;
};
