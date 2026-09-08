/**
 * primitives/deprecated — хуки прежнего поколения.
 *
 * Оставлены рабочими: на них держатся 8 пресетов в `src/presets/`.
 * УДАЛЯЮТСЯ вместе с чисткой пресетов. В новом коде — `enter.ts` / `helpers.ts`.
 */

import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type SpringConfig = { damping?: number; mass?: number };

/** @deprecated используй `useFade` из `enter.ts`. Удаляется с чисткой пресетов. */
export const useFadeIn = (delay = 0, duration = 20): number => {
  const frame = useCurrentFrame();
  return interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

/** @deprecated используй `useBlurIn` из `enter.ts`. Удаляется с чисткой пресетов. */
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

/** @deprecated используй `useScaleIn` из `enter.ts` (возвращает стиль). Удаляется с чисткой пресетов. */
export const useScaleInValue = (delay = 0, config: SpringConfig = {}): number => {
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

/** @deprecated используй `useDrop` из `enter.ts`. Удаляется с чисткой пресетов. */
export const useSlideY = (from: number, delay = 0, config: SpringConfig = {}): number => {
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

/** @deprecated используй `useSlideLeft` / `useSlideRight` из `enter.ts`. Удаляется с чисткой пресетов. */
export const useSlideX = (from: number, delay = 0, config: SpringConfig = {}): number => {
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

/** @deprecated используй `useRise` из `enter.ts`. Удаляется с чисткой пресетов. */
export const useReveal = (delay = 0): { opacity: number; translateY: number } => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, mass: 0.5 },
    durationInFrames: 14,
  });
  return {
    opacity: progress,
    translateY: interpolate(progress, [0, 1], [28, 0]),
  };
};

/** @deprecated используй `staggerDelays` из `helpers.ts` (та же чистая функция). Удаляется с чисткой пресетов. */
export const useStagger = (count: number, step: number): number[] =>
  Array.from({ length: count }, (_, i) => i * step);
