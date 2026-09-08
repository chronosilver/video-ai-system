/**
 * Анимационные примитивы — barrel.
 *
 * Вся математика движения живёт здесь; компоненты вызывают хук и получают
 * готовое значение или объект стилей. Константы движения (SPRING / DURATION /
 * EASE) — в `common/design-system/motion.ts`.
 *
 *   enter.ts       — entrance-хуки: useX(delay, opts?) => CSSProperties
 *                    useFade useRise useDrop useSlideLeft useSlideRight
 *                    useScaleIn useBlurIn useMaskWipe useZoomIn
 *                    + useEntrance(name, delay, opts?) — диспетчер по имени
 *   emphasis.ts    — циклические: usePulse useSpin useFloat useBlink (raw value)
 *   text.ts        — useTypewriter useCountUp
 *   helpers.ts     — useProgress staggerDelays lerp
 *   deprecated.ts  — прежнее поколение (на нём 8 пресетов), удаляется с чисткой
 */

export * from "./enter";
export * from "./emphasis";
export * from "./text";
export * from "./helpers";
export * from "./deprecated";
