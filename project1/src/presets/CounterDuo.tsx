/**
 * CounterDuo — два анимированных счётчика с подписями.
 * Используй для сравнения двух чисел.
 */

import { AbsoluteFill } from "remotion";
import { useCountUp, useFadeIn, useScaleIn } from "../primitives";
import { text, color, fontWeight } from "../common/design-system";

export interface CounterDuoProps {
  left:  { value: number; label: string; color: string; labelColor: string };
  right: { value: number; label: string; color: string; labelColor: string };
  separator?: string;
}

export const CounterDuo = ({ left, right, separator = ">" }: CounterDuoProps) => {
  const leftCount  = useCountUp(left.value,  5, 35);
  const rightCount = useCountUp(right.value, 10, 40);
  const scale      = useScaleIn(0, { damping: 15, mass: 0.5 });
  const opacity    = useFadeIn(0, 20);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        fontFamily: text.body.fontFamily,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 15,
          width: "100%",
          transform: `scale(${scale})`,
          opacity,
        }}
      >
        {/* Левое число */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <span style={{ ...text.subheading, fontWeight: fontWeight.regular, color: left.color, lineHeight: 1 }}>
            {leftCount.toLocaleString()}
          </span>
          <span style={{ ...text.caption, color: left.labelColor, fontWeight: fontWeight.regular, marginTop: 4 }}>
            {left.label}
          </span>
        </div>

        {/* Разделитель */}
        <div style={{ fontSize: 48, color: color.text, fontWeight: fontWeight.regular, padding: "0 10px", lineHeight: 1 }}>
          {separator}
        </div>

        {/* Правое число */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <span style={{ ...text.subheading, fontWeight: fontWeight.regular, color: right.color, lineHeight: 1 }}>
            {rightCount.toLocaleString()}
          </span>
          <span style={{ ...text.caption, color: right.labelColor, fontWeight: fontWeight.regular, marginTop: 4 }}>
            {right.label}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
