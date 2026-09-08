/**
 * Demo-композиция вендоренного набора SVG (ICON-1).
 * Верхняя половина кадра — на белом фоне, нижняя — на чёрном.
 * В каждой: все логотипы (цветные, `LOGO_REGISTRY`) и все иконки
 * (моно, наследуют `color`, `ICON_REGISTRY`) с подписями. Статично.
 */

import { AbsoluteFill, Composition } from "remotion";
import { text, color, video } from "../common";
import { Logo } from "../logos/Logo";
import { Icon } from "../icons/Icon";
import { LOGO_REGISTRY } from "../logos/registry";
import { ICON_REGISTRY } from "../icons/registry";

const LOGO_NAMES = Object.keys(LOGO_REGISTRY) as (keyof typeof LOGO_REGISTRY)[];
const ICON_NAMES = Object.keys(ICON_REGISTRY) as (keyof typeof ICON_REGISTRY)[];

const Cell = ({ label, glyph, fg }: { label: string; glyph: React.ReactNode; fg: string }) => (
  <div
    style={{
      width: 150,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
    }}
  >
    <div style={{ height: 64, display: "flex", alignItems: "center" }}>{glyph}</div>
    <span style={{ ...text.small, color: fg, opacity: 0.65, textAlign: "center" }}>{label}</span>
  </div>
);

const Half = ({ mode }: { mode: "paper" | "ink" }) => {
  const bg = mode === "paper" ? color.white : color.black;
  const fg = mode === "paper" ? color.black : color.white;

  return (
    <div style={{ flex: 1, backgroundColor: bg, color: fg, padding: 56, overflow: "hidden" }}>
      <div style={{ ...text.small, color: color.gray, textTransform: "uppercase", marginBottom: 24 }}>
        {`logos · ${mode}`}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginBottom: 40 }}>
        {LOGO_NAMES.map((n) => (
          <Cell key={n} label={n} fg={fg} glyph={<Logo name={n} size={56} />} />
        ))}
      </div>

      <div style={{ ...text.small, color: color.gray, textTransform: "uppercase", marginBottom: 24 }}>
        {`icons · ${mode}`}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {ICON_NAMES.map((n) => (
          <Cell key={n} label={n} fg={fg} glyph={<Icon name={n} size={40} />} />
        ))}
      </div>
    </div>
  );
};

const IconDemoScene = () => (
  <AbsoluteFill style={{ flexDirection: "column" }}>
    <Half mode="paper" />
    <Half mode="ink" />
  </AbsoluteFill>
);

export const IconDemo = () => (
  <Composition
    id="IconDemo"
    component={IconDemoScene}
    durationInFrames={150}
    fps={video.fps}
    width={video.width}
    height={video.height}
  />
);
