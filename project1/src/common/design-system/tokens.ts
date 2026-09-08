/**
 * Семантические токены design system — ЕДИНСТВЕННОЕ, что трогают пресеты и манифесты.
 *
 * Слои:
 *   fonts.ts / palette.ts / scale.ts  — сырые примитивы (не использовать напрямую)
 *   tokens.ts (этот файл)             — роли: text.*, color.*, space.*, ...
 *
 * Хочешь поменять размер/шрифт/цвет заголовков и подзаголовков — правь `text` ниже.
 */

import { fontDisplay, fontBody } from "./fonts";
import { palette } from "./palette";
import { fontSize, fontWeight, lineHeight, spacePx, radiusPx } from "./scale";

// ─── ЦВЕТ ────────────────────────────────────────────────────────────────────
// Семантические роли поверх сырой палитры (palette.ts — ВРЕМЕННЫЙ placeholder).

/** Прозрачный оттенок цвета (CSS relative color, работает в Chrome/Remotion). */
export const tint = (c: string, alpha: number): string =>
  `oklch(from ${c} l c h / ${alpha})`;

export const color = {
  text:         palette.ink,          // основной текст
  textMuted:    palette.inkMuted,     // подписи, второстепенный текст
  textFaint:    palette.inkFaint,     // едва различимый

  bg:           palette.surface,      // фон кадра
  surface:      palette.surfaceRaised, // карточки / панели поверх фона

  border:       palette.line,
  borderStrong: palette.lineStrong,

  accent:       palette.accent,       // ← бренд-акцент, поменяй под свой бренд
  onAccent:     palette.ink,          // текст поверх accent
  danger:       palette.danger,

  // ─── Дизайн-манифест (about.md §3), задача TYPO-1 ────────────────────────────
  // Ровно три значения. Цвет задаётся отдельно от типографической роли:
  //   <span style={{ ...text.h1, color: color.black }}>…</span>
  black: "#000000", // текст/графика на светлом; фон в режиме `ink`
  white: "#FFFFFF", // фон в режиме `paper`; текст/графика на тёмном
  gray:  "#8A8A8A", // только служебный / второстепенный текст (`small`, приглушённый `body`)

  /** Палитра для перечислений / шагов / сравнений. */
  series: {
    indigo: palette.series.indigo,
    teal:   palette.series.teal,
    amber:  palette.series.amber,
    violet: palette.series.violet,
    rose:   palette.series.rose,
  },
} as const;

// ─── ТИПОГРАФИКА ─────────────────────────────────────────────────────────────
// Роль = готовый объект инлайн-стилей. В пресете: <h1 style={text.heading}>…</h1>
// (можно расширить: style={{ ...text.heading, color: color.accent }}).
//
// Шрифты: display/heading → SF Pro Display, остальное → Montserrat (см. fonts.ts).

export const text = {
  /** Огромный акцент — одно слово на весь экран. */
  display: {
    fontFamily:    fontDisplay,
    fontSize:      fontSize.display,
    fontWeight:    fontWeight.thin,
    lineHeight:    lineHeight.tight,
    letterSpacing: "0em",
    color:         color.text,
  },
  /** Заголовок сцены. */
  heading: {
    fontFamily:    fontDisplay,
    fontSize:      fontSize.heading,
    fontWeight:    fontWeight.light,
    lineHeight:    lineHeight.snug,
    letterSpacing: "0em",
    color:         color.text,
  },
  /** Подзаголовок / вторичный заголовок. */
  subheading: {
    fontFamily:    fontDisplay,
    fontSize:      fontSize.subheading,
    fontWeight:    fontWeight.light,
    lineHeight:    lineHeight.snug,
    letterSpacing: "0em",
    color:         color.textMuted,
  },
  /** Некрупный заголовок, метка секции. */
  title: {
    fontFamily:    fontBody,
    fontSize:      fontSize.title,
    fontWeight:    fontWeight.regular,
    lineHeight:    lineHeight.snug,
    letterSpacing: "0em",
    color:         color.text,
  },
  /** Подписи, служебный текст. */
  caption: {
    fontFamily:    fontBody,
    fontSize:      fontSize.caption,
    fontWeight:    fontWeight.regular,
    lineHeight:    lineHeight.snug,
    letterSpacing: "0.08em",
    color:         color.textMuted,
  },

  // ─── Дизайн-манифест (about.md §4), задача TYPO-1 ────────────────────────────
  // Только Montserrat. Объекты БЕЗ ключа `color` — цвет задаётся отдельно:
  //   <span style={{ ...text.h1, color: color.black }}>…</span>

  /** Главное сообщение сцены, 2–4 слова. */
  h1: {
    fontFamily:    fontBody,
    fontSize:      fontSize.h1,
    fontWeight:    fontWeight.light,
    lineHeight:    1.08,
    letterSpacing: "0",
  },
  /** Вторичный заголовок, подводка. */
  h2: {
    fontFamily:    fontBody,
    fontSize:      fontSize.h2,
    fontWeight:    fontWeight.light,
    lineHeight:    1.16,
    letterSpacing: "0",
  },
  /** Абзац, короткий список. */
  body: {
    fontFamily:    fontBody,
    fontSize:      fontSize.body,
    fontWeight:    fontWeight.regular,
    lineHeight:    1.5,
    letterSpacing: "0",
  },
  /** Подпись, номер выпуска, метка (часто КАПС). */
  small: {
    fontFamily:    fontBody,
    fontSize:      fontSize.small,
    fontWeight:    fontWeight.regular,
    lineHeight:    1.4,
    letterSpacing: "0.04em",
  },
} as const;

export type TextRole = keyof typeof text;

// ─── ПРОЧЕЕ ──────────────────────────────────────────────────────────────────

export const space = {
  xs:      spacePx.xs,
  sm:      spacePx.sm,
  md:      spacePx.md,
  lg:      spacePx.lg,
  xl:      spacePx.xl,
  section: 40, // паддинг сцены
  page:    60, // внешний отступ страницы
} as const;

export const radius = radiusPx;

/** Толщина обводки (px). */
export const stroke = {
  hairline: 1,
  regular:  2,
  accent:   4,
} as const;

/** Тени — язык подъёма над фоном. */
export const elevation = {
  xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  sm: "0 1px 3px 0 rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.10)",
  md: "0 20px 40px rgba(0, 0, 0, 0.50)",
  lg: "0 25px 50px -12px rgba(0, 0, 0, 0.40)",
} as const;

/** Параметры кадра. */
export const video = {
  fps:    30,
  width:  1080,
  height: 1920,
} as const;
