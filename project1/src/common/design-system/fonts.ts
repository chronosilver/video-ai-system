/**
 * Шрифты design system — примитив (слой ниже семантики `tokens.ts`).
 *
 *   fontDisplay — заголовки:  SF Pro Display  (файлы в public/fonts/, см. README там)
 *   fontBody    — остальное:  Montserrat      (через @remotion/google-fonts)
 *   fontMono    — терминальные эффекты
 */

import { continueRender, delayRender, staticFile } from "remotion";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";

// ─── Montserrat — основной текст ─────────────────────────────────────────────

// Только тонкие начертания — максимум Regular (см. about.md §2).
const { fontFamily: montserrat } = loadMontserrat("normal", {
  weights: ["100", "300", "400"],
  subsets: ["latin", "cyrillic"],
});

export const fontBody = montserrat;

// ─── SF Pro Display — заголовки ──────────────────────────────────────────────
// Файлы шрифта проприетарные (Apple) и в репозиторий не входят. Положи .woff2
// в public/fonts/ (имена — в SF_SOURCES ниже, инструкция — public/fonts/README.md).
// Пока файлов нет: на macOS подхватывается системный SF Pro, иначе — Montserrat
// (см. fallback-стек в fontDisplay).

const SF_FAMILY = "SF Pro Display";

// Только тонкие начертания — максимум Regular (см. about.md §2).
const SF_SOURCES: { file: string; weight: string }[] = [
  { file: "SFProDisplay-Thin.woff2",    weight: "100" },
  { file: "SFProDisplay-Light.woff2",   weight: "300" },
  { file: "SFProDisplay-Regular.woff2", weight: "400" },
];

if (typeof FontFace !== "undefined") {
  const handle = delayRender("Loading SF Pro Display", { timeoutInMilliseconds: 30000 });

  Promise.allSettled(
    SF_SOURCES.map(async ({ file, weight }) => {
      const face = new FontFace(
        SF_FAMILY,
        `url(${staticFile(`fonts/${file}`)}) format("woff2")`,
        { weight, style: "normal", display: "swap" },
      );
      await face.load();
      document.fonts.add(face);
    }),
  ).finally(() => continueRender(handle));
}

/** Стек для заголовков: подгруженный / системный SF Pro, затем Montserrat. */
export const fontDisplay =
  `"${SF_FAMILY}", -apple-system, BlinkMacSystemFont, ${montserrat}, "Helvetica Neue", Arial, sans-serif`;

// ─── Моно — для терминальных эффектов ───────────────────────────────────────

export const fontMono =
  "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";
