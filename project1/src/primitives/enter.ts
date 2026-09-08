/**
 * primitives/enter — entrance-хуки.
 *
 * ЕДИНАЯ сигнатура: `useX(delay = 0, opts?) => React.CSSProperties`.
 * Возвращают готовый объект стилей для спреда в `style` элемента:
 *
 *   <div style={{ ...useRise(delay), ...остальные стили }}>
 *
 * opts: `{ spring?: SpringName; duration?: number }` — характер и длительность входа.
 * Все построены поверх общего `useProgress` (helpers.ts).
 *
 * ВНИМАНИЕ: хуки, задающие `transform` (rise, drop, slideLeft, slideRight,
 * scaleIn, zoomIn), перезаписывают `transform` элемента целиком — совмещай
 * трансформации вручную, если нужен ещё и свой.
 */

import { interpolate } from "remotion";
import { DURATION, type SpringName } from "../common/design-system";
import { useProgress } from "./helpers";

export type EntranceName =
  | "fade"
  | "rise"
  | "drop"
  | "slideLeft"
  | "slideRight"
  | "scaleIn"
  | "blurIn"
  | "maskWipe"
  | "zoomIn";

export interface EnterOpts {
  spring?: SpringName;
  duration?: number;
}

// ---------------------------------------------------------------------------
// Чистое отображение имя+прогресс → стили (без хуков, тестируемо)
// ---------------------------------------------------------------------------

const at = (p: number, from: number, to: number): number =>
  interpolate(p, [0, 1], [from, to]);

export const entranceStyle = (name: EntranceName, p: number): React.CSSProperties => {
  switch (name) {
    case "fade":
      return { opacity: p };
    case "rise":
      return { opacity: p, transform: `translateY(${at(p, 28, 0)}px)` };
    case "drop":
      return { opacity: p, transform: `translateY(${at(p, -28, 0)}px)` };
    case "slideLeft":
      // стартует справа (+48), едет к месту — движение влево
      return { opacity: p, transform: `translateX(${at(p, 48, 0)}px)` };
    case "slideRight":
      return { opacity: p, transform: `translateX(${at(p, -48, 0)}px)` };
    case "scaleIn":
      return { opacity: p, transform: `scale(${at(p, 0.9, 1)})` };
    case "blurIn":
      return { opacity: p, filter: `blur(${Math.max(0, at(p, 12, 0))}px)` };
    case "maskWipe":
      // кромка едет слева-направо, элемент виден целиком (opacity 1)
      return { opacity: 1, clipPath: `inset(0 ${Math.max(0, at(p, 100, 0))}% 0 0)` };
    case "zoomIn":
      return { opacity: p, transform: `scale(${at(p, 1.12, 1)})` };
  }
};

// ---------------------------------------------------------------------------
// Диспетчер по имени (для шаблонов: RevealItem.enter) + именные хуки
// ---------------------------------------------------------------------------

/** Entrance по имени — одна пружина прогресса, стиль строится чисто. */
export const useEntrance = (
  name: EntranceName = "rise",
  delay = 0,
  opts: EnterOpts = {}
): React.CSSProperties =>
  entranceStyle(name, useProgress(delay, opts.duration ?? DURATION.base, opts.spring ?? "precise"));

const make =
  (name: EntranceName, defaultDuration: number = DURATION.base) =>
  (delay = 0, opts: EnterOpts = {}): React.CSSProperties =>
    entranceStyle(
      name,
      useProgress(delay, opts.duration ?? defaultDuration, opts.spring ?? "precise")
    );

/** Только opacity 0→1. */
export const useFade = make("fade");
/** opacity + подъём снизу (translateY 28→0). Замена устаревшего useReveal. */
export const useRise = make("rise");
/** opacity + падение сверху (translateY -28→0). */
export const useDrop = make("drop");
/** opacity + въезд справа налево (translateX 48→0). */
export const useSlideLeft = make("slideLeft");
/** opacity + въезд слева направо (translateX -48→0). */
export const useSlideRight = make("slideRight");
/** opacity + масштаб от 0.9. */
export const useScaleIn = make("scaleIn");
/** opacity + расфокус от blur(12px). */
export const useBlurIn = make("blurIn");
/** Раскрытие движущейся кромкой (clipPath слева-направо), opacity 1. */
export const useMaskWipe = make("maskWipe", DURATION.slow);
/** Кино-въезд: масштаб от 1.12 + opacity. */
export const useZoomIn = make("zoomIn", DURATION.slow);
