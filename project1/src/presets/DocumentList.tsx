// CardStack-эффект: падающие карточки, одна выделяется анимированной рамкой.
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { text, color, space, fontWeight, lerp } from "../common";
import { useScaleInValue } from "../primitives";

export interface DocumentListProps {
  title:    string;
  subtitle: string;
  noise:    readonly string[];
  target:   string;
}

const ROTATIONS = [-6, 8, -3, 5];
const OFFSETS   = [{ x: -30, y: -150 }, { x: 40, y: -50 }, { x: -20, y: 50 }, { x: 15, y: 130 }];

const NoiseCard = ({ text: label, rot, x, y, delay }: { text: string; rot: number; x: number; y: number; delay: number }) => {
  const scale = useScaleInValue(delay, { damping: 15, mass: 0.5 });
  return (
    <div style={{ position: "absolute", left: "50%", top: "50%", width: 320, height: 100, marginLeft: -160, marginTop: -50 + y, backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, display: "flex", alignItems: "center", padding: "0 20px", color: color.textFaint, fontSize: text.caption.fontSize, fontFamily: text.body.fontFamily, transform: `scale(${scale}) rotate(${rot}deg) translate(${x}px)`, transformOrigin: "center" }}>
      📄 {label}
    </div>
  );
};

const TargetCard = ({ text: label, strokeProgress, entrance }: { text: string; strokeProgress: number; entrance: number }) => (
  <div style={{ position: "absolute", left: "50%", top: "50%", width: 340, height: 120, marginLeft: -170, marginTop: -60, backgroundColor: "#1e1b4b", borderRadius: 20, display: "flex", alignItems: "center", padding: "0 25px", color: color.text, fontSize: text.body.fontSize, fontFamily: text.body.fontFamily, fontWeight: fontWeight.regular, boxShadow: "0 20px 40px rgba(0,0,0,0.5)", transform: `scale(${entrance}) translateY(-30px)`, zIndex: 10 }}>
    <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
      <rect x="3" y="3" width="334" height="114" rx="17" fill="none" stroke={color.series.indigo} strokeWidth="4" strokeDasharray="2000" strokeDashoffset={strokeProgress} />
    </svg>
    <span style={{ marginRight: 15, fontSize: 32 }}>✨</span>
    {label}
  </div>
);

export const DocumentList = ({ title, subtitle, noise, target }: DocumentListProps) => {
  const frame          = useCurrentFrame();
  const finalEntrance  = useScaleInValue(45, { damping: 12, mass: 0.8 });
  const strokeProgress = lerp(frame, [55, 80], [2000, 0]);

  const dummyDocs = noise.map((label, i) => ({
    id: i + 1, text: label,
    rot: ROTATIONS[i] ?? 0,
    x:   OFFSETS[i]?.x ?? 0,
    y:   OFFSETS[i]?.y ?? 0,
    delay: i * 10,
  }));

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: space.section, fontFamily: text.body.fontFamily }}>
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <div style={{ textAlign: "center", fontSize: 42, fontWeight: fontWeight.regular, color: color.textMuted, marginTop: 80, lineHeight: 1.3 }}>
          {title} <br />
          <span style={{ color: color.text }}>{subtitle}</span>
        </div>
        {dummyDocs.map((doc) => <NoiseCard key={doc.id} {...doc} />)}
        {frame >= 45 && <TargetCard text={target} strokeProgress={strokeProgress} entrance={finalEntrance} />}
      </div>
    </AbsoluteFill>
  );
};
