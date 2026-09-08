/**
 * Анимационные примитивы — хуки над spring() и interpolate().
 * Компоненты вызывают хук и получают готовое значение.
 * Математику анимации знают только примитивы.
 */

import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

// ---------------------------------------------------------------------------
// Fade
// ---------------------------------------------------------------------------

/** Плавное появление: возвращает opacity от 0 до 1 */
export const useFadeIn = (delay = 0, duration = 20): number => {
  const frame = useCurrentFrame();
  return interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

/** Появление с размытием: возвращает { opacity, blur } */
export const useBlurReveal = (
  delay = 0,
  duration = 25,
  maxBlur = 30
): { opacity: number; blur: number } => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blur = interpolate(frame, [delay, delay + duration], [maxBlur, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { opacity, blur };
};

// ---------------------------------------------------------------------------
// Scale
// ---------------------------------------------------------------------------

/** Пружинное появление через масштаб: возвращает scale */
export const useScaleIn = (
  delay = 0,
  config: { damping?: number; mass?: number } = {}
): number => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    frame: frame - delay,
    fps,
    from: 0,
    to: 1,
    config: { damping: config.damping ?? 14, mass: config.mass ?? 0.6 },
  });
};

// ---------------------------------------------------------------------------
// Slide
// ---------------------------------------------------------------------------

/** Пружинный влёт по вертикали: возвращает translateY в px */
export const useSlideY = (
  from: number,
  delay = 0,
  config: { damping?: number; mass?: number } = {}
): number => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    frame: frame - delay,
    fps,
    from,
    to: 0,
    config: { damping: config.damping ?? 12, mass: config.mass ?? 0.7 },
  });
};

/** Пружинный влёт по горизонтали: возвращает translateX в px */
export const useSlideX = (
  from: number,
  delay = 0,
  config: { damping?: number; mass?: number } = {}
): number => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    frame: frame - delay,
    fps,
    from,
    to: 0,
    config: { damping: config.damping ?? 14, mass: config.mass ?? 0.6 },
  });
};

// ---------------------------------------------------------------------------
// Counter
// ---------------------------------------------------------------------------

/** Анимированный счётчик: возвращает число от 0 до target */
export const useCountUp = (
  target: number,
  startFrame = 5,
  endFrame = 40
): number => {
  const frame = useCurrentFrame();
  return Math.round(
    interpolate(frame, [startFrame, endFrame], [0, target], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
};

// ---------------------------------------------------------------------------
// Stagger
// ---------------------------------------------------------------------------

/**
 * Генерирует массив задержек для staggered-анимации.
 * useStagger(3, 15) → [0, 15, 30]
 */
export const useStagger = (count: number, step: number): number[] =>
  Array.from({ length: count }, (_, i) => i * step);

// ---------------------------------------------------------------------------
// Pulse
// ---------------------------------------------------------------------------

/** Пульсирующий масштаб на основе синуса: возвращает scale ~1..1.05 */
export const usePulse = (speed = 0.15, amplitude = 0.05): number => {
  const frame = useCurrentFrame();
  return interpolate(Math.sin(frame * speed), [-1, 1], [1, 1 + amplitude]);
};

// ---------------------------------------------------------------------------
// Spin
// ---------------------------------------------------------------------------

/**
 * Непрерывное вращение от useCurrentFrame(): возвращает угол в градусах.
 * Кадро-синхронная замена CSS `animate-spin` — в Remotion CSS-анимация не
 * совпадает с кадрами рендера.
 */
export const useSpin = (degreesPerSecond = 360, delay = 0): number => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (Math.max(0, frame - delay) / fps) * degreesPerSecond;
};

// ---------------------------------------------------------------------------
// Typewriter
// ---------------------------------------------------------------------------

/**
 * Эффект печати: возвращает уже напечатанную часть строки, флаг завершения
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
