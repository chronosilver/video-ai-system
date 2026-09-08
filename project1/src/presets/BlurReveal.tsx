/**
 * BlurReveal — строки текста появляются через blur с задержкой.
 * Используй для выводов, тезисов, ключевых мыслей.
 */

import { AbsoluteFill } from "remotion";
import { useBlurReveal } from "../primitives";
import { text, space, fontWeight } from "../common/design-system";

export interface BlurRevealLine {
  text:      string;
  color:     string;
  fontSize?: number;
  delay?:    number;
  duration?: number;
}

export interface BlurRevealProps {
  lines: BlurRevealLine[];
  gap?:  number;
}

const RevealLine = ({ line }: { line: BlurRevealLine }) => {
  const { opacity, blur } = useBlurReveal(line.delay ?? 0, line.duration ?? 25);

  return (
    <h2
      style={{
        ...text.subheading,
        fontSize:      line.fontSize ?? text.subheading.fontSize,
        fontWeight:    fontWeight.regular,
        color:         line.color,
        margin:        0,
        filter:        `blur(${blur}px)`,
        opacity,
        letterSpacing: "-1px",
        lineHeight:    1.2,
      }}
    >
      {line.text}
    </h2>
  );
};

export const BlurReveal = ({ lines, gap = space.lg }: BlurRevealProps) => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: space.section,
        fontFamily: text.subheading.fontFamily,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap, textAlign: "center" }}>
        {lines.map((line, i) => (
          <RevealLine key={i} line={line} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
