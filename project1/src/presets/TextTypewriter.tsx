/**
 * TextTypewriter — терминальный эффект печати текста с курсором.
 */

import { AbsoluteFill, useCurrentFrame } from "remotion";
import { color, text, fontBody, fontMono, lerp } from "../common";

export const TextTypewriter = ({ text: value = "TYPING EFFECT...", startDelay = 0 }: {
  text?: string;
  startDelay?: number;
}) => {
  const frame = useCurrentFrame();

  const charsToShow  = Math.floor(lerp(frame, [startDelay, startDelay + value.length * 3], [0, value.length]));
  const displayText  = value.slice(0, charsToShow);
  const cursorVisible = Math.floor((frame - startDelay) / 15) % 2 === 0;

  return (
    <AbsoluteFill style={{ background: color.bg }}>
      <div style={{ position: "absolute", left: 100, top: 150, width: 1000, background: color.surface, borderRadius: 12, padding: 24, border: `1px solid ${color.border}` }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#27ca40" }} />
        </div>
        <div style={{ fontFamily: fontMono, fontSize: 36, color: color.text }}>
          <span style={{ color: color.accent }}>$ </span>
          {displayText}
          <span style={{ display: "inline-block", width: 20, height: 36, background: color.accent, marginLeft: 4, opacity: cursorVisible ? 1 : 0 }} />
        </div>
      </div>
      <div style={{ position: "absolute", right: 100, bottom: 100, fontFamily: fontBody, fontSize: text.caption.fontSize, color: color.textMuted, textAlign: "right", opacity: lerp(frame, [startDelay + 30, startDelay + 50], [0, 1]) }}>
        <div>TERMINAL</div>
        <div>v2.0.1</div>
      </div>
    </AbsoluteFill>
  );
};
