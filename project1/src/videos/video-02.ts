/**
 * Манифест video-02 — навайбкодила.
 * 5 сцен × 3 сек = 15 сек
 */

import type { SceneManifestEntry } from "./types";
import { color, text } from "../common";

export const VIDEO_02: SceneManifestEntry[] = [
  {
    // "привет я это навайбкодила"
    preset:   "BlurReveal",
    duration: 90,
    data: {
      lines: [
        {
          text:     "привет",
          color:    color.text,
          fontSize: text.heading.fontSize,
          delay:    0,
          duration: 20,
        },
        {
          text:     "я это навайбкодила",
          color:    color.accent,
          fontSize: text.title.fontSize,
          delay:    20,
          duration: 25,
        },
      ],
    },
  },
  {
    // "мне лень писать сценарий поэтому посмотрите на эти цифры"
    preset:   "BlurReveal",
    duration: 90,
    data: {
      lines: [
        {
          text:     "мне лень писать сценарий",
          color:    color.textMuted,
          fontSize: text.subheading.fontSize,
          delay:    0,
          duration: 20,
        },
        {
          text:     "посмотрите на эти цифры",
          color:    color.text,
          fontSize: text.subheading.fontSize,
          delay:    20,
          duration: 25,
        },
      ],
    },
  },
  {
    // "11001 10101010"
    preset:   "TextTypewriter",
    duration: 90,
    data: {
      text:       "11001 10101010",
      startDelay: 5,
    },
  },
  {
    // "спасибо за внимание"
    preset:   "BlurReveal",
    duration: 90,
    data: {
      lines: [
        {
          text:     "спасибо за внимание",
          color:    color.text,
          fontSize: text.heading.fontSize,
          delay:    0,
          duration: 25,
        },
      ],
    },
  },
  {
    // "тут могла быть ваша реклама"
    preset:   "HeroBadge",
    duration: 90,
    data: {
      title:        "тут могла быть",
      tagline:      "ваша реклама",
      gradient:     `linear-gradient(135deg, ${color.series.indigo} 0%, ${color.series.teal} 100%)`,
      shadow:       "0 25px 50px -12px rgba(79, 70, 229, 0.5)",
      taglineColor: color.textMuted,
    },
  },
];

export const TOTAL_FRAMES = VIDEO_02.reduce((sum, s) => sum + s.duration, 0); // 450
