/**
 * Design system — единая точка входа.
 *
 *   design-system/
 *     fonts.ts    — загрузка шрифта                    ┐
 *     palette.ts  — сырая палитра (ВРЕМЕННЫЙ placeholder) ├─ примитивы, напрямую не трогать
 *     scale.ts    — числовые шкалы                     ┘
 *     tokens.ts   — СЕМАНТИКА: text / color / space / radius / stroke / elevation / video
 *     motion.ts   — EASE-кривые
 *
 * Пресеты и манифесты импортируют только семантику (`text`, `color`, ...) —
 * через этот индекс или через `../common`.
 */

// Семантика
export {
  text,
  color,
  tint,
  space,
  radius,
  stroke,
  elevation,
  video,
  type TextRole,
} from "./tokens";

// Шрифты
export { fontDisplay, fontBody, fontMono } from "./fonts";

// Motion
export { EASE } from "./motion";

// Примитивы (на случай нестандартных сцен)
export { fontSize, fontWeight, lineHeight } from "./scale";
