/**
 * Demo-композиция библиотеки движения (`src/primitives/`).
 * Три секции подряд (Series):
 *   1. Все entrance-хуки — сетка подписанных ячеек, вход играет разом.
 *   2. Loop/emphasis-хуки — usePulse / useSpin / useFloat / useBlink.
 *   3. Сцена SequentialReveal с четырьмя разными `enter` на элементах.
 */

import { AbsoluteFill, Composition, Series } from "remotion";
import { text, color, video } from "../common";
import {
  useEntrance,
  usePulse,
  useSpin,
  useFloat,
  useBlink,
  type EntranceName,
} from "../primitives";
import { SequentialReveal } from "../templates/SequentialReveal";

const PAGE: React.CSSProperties = {
  backgroundColor: color.surface,
  color: color.black,
  padding: 72,
  fontFamily: text.body.fontFamily,
};

const LABEL: React.CSSProperties = { ...text.small, color: color.gray, marginTop: 16 };

const CHIP: React.CSSProperties = {
  width: 200,
  height: 120,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color.black,
  color: color.white,
  borderRadius: 12,
  ...text.small,
};

// ─── 1. Entrance ────────────────────────────────────────────────────────────

const ENTRANCES: EntranceName[] = [
  "fade",
  "rise",
  "drop",
  "slideLeft",
  "slideRight",
  "scaleIn",
  "blurIn",
  "maskWipe",
  "zoomIn",
];

const EntranceCell = ({ name }: { name: EntranceName }) => {
  const style = useEntrance(name, 6);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ ...CHIP, ...style }}>{name}</div>
      <span style={LABEL}>{`use${name[0].toUpperCase()}${name.slice(1)}`}</span>
    </div>
  );
};

const EntranceSection = () => (
  <AbsoluteFill style={PAGE}>
    <h2 style={{ ...text.h2, color: color.black, margin: "0 0 48px" }}>entrance</h2>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 48 }}>
      {ENTRANCES.map((n) => (
        <EntranceCell key={n} name={n} />
      ))}
    </div>
  </AbsoluteFill>
);

// ─── 2. Loop / emphasis ────────────────────────────────────────────────────

const LoopSection = () => {
  const pulse = usePulse();
  const spin = useSpin(120);
  const floatY = useFloat(18, 0.06);
  const blink = useBlink(12);

  return (
    <AbsoluteFill style={PAGE}>
      <h2 style={{ ...text.h2, color: color.black, margin: "0 0 48px" }}>loop</h2>
      <div style={{ display: "flex", gap: 64, alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ ...CHIP, transform: `scale(${pulse})` }}>pulse</div>
          <span style={LABEL}>usePulse</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ ...CHIP, transform: `rotate(${spin}deg)` }}>spin</div>
          <span style={LABEL}>useSpin</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ ...CHIP, transform: `translateY(${floatY}px)` }}>float</div>
          <span style={LABEL}>useFloat</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ ...CHIP, opacity: blink ? 1 : 0.15 }}>blink</div>
          <span style={LABEL}>useBlink</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── 3. SequentialReveal с разными enter ────────────────────────────────────

const RevealSection = () => (
  <SequentialReveal
    mode="paper"
    stagger={14}
    items={[
      { kind: "text", role: "h2", value: "fade", enter: "fade" },
      { kind: "text", role: "body", value: "slideLeft", enter: "slideLeft" },
      { kind: "text", role: "body", value: "scaleIn", enter: "scaleIn" },
      { kind: "text", role: "body", value: "blurIn", enter: "blurIn" },
    ]}
  />
);

// ─── Композиция ────────────────────────────────────────────────────────────

const MotionDemoScene = () => (
  <Series>
    <Series.Sequence durationInFrames={150}>
      <EntranceSection />
    </Series.Sequence>
    <Series.Sequence durationInFrames={120}>
      <LoopSection />
    </Series.Sequence>
    <Series.Sequence durationInFrames={150}>
      <RevealSection />
    </Series.Sequence>
  </Series>
);

export const MotionDemo = () => (
  <Composition
    id="MotionDemo"
    component={MotionDemoScene}
    durationInFrames={420}
    fps={video.fps}
    width={video.width}
    height={video.height}
  />
);
