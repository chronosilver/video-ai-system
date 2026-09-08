import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { text, color, space, fontWeight, fontMono, lerp } from "../common";
import { useFadeIn, useScaleIn, usePulse } from "../primitives";

export interface HookSceneProps {
  brand:      string;
  category:   string;
  titleLine1: string;
  titleLine2: string;
  pill:       string;
  accent:     string;
}

export const HookScene = ({ brand, category, titleLine1, titleLine2, pill, accent }: HookSceneProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerY       = lerp(frame, [0, 15], [-50, 0]);
  const headerOpacity = useFadeIn(0, 15);
  const titleScale    = useScaleIn(0, { damping: 14, mass: 0.6 });
  const titleOpacity  = useFadeIn(0, 20);
  const pillScale     = useScaleIn(20, { damping: 10, mass: 0.5 });
  const wordScale     = useScaleIn(30, { damping: 8, mass: 0.4 });
  const wordOpacity   = useFadeIn(30, 15);
  const pulseScale    = usePulse(0.15, 0.05);

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle, rgba(204,255,0,0.06) 0%, rgba(8,11,3,1) 80%)",
        fontFamily: text.body.fontFamily,
        padding: `${space.page}px 40px`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: color.text,
      }}
    >
      {/* Верхний хедер */}
      <div style={{ display: "flex", flexDirection: "column", transform: `translateY(${headerY}px)`, opacity: headerOpacity }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: text.caption.fontSize, fontWeight: fontWeight.regular, letterSpacing: "1px", textTransform: "uppercase", fontFamily: fontMono, paddingBottom: 15 }}>
          <span style={{ color: color.accent }}>{brand}</span>
          <span style={{ color: color.textFaint }}>{category}</span>
        </div>
        <div style={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
      </div>

      {/* Центральный блок */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40, flexGrow: 1, justifyContent: "center" }}>
        <div style={{ textAlign: "center", transform: `scale(${titleScale})`, opacity: titleOpacity }}>
          <h1 style={{ ...text.heading, textTransform: "uppercase", letterSpacing: "-2px", lineHeight: 0.85, margin: 0 }}>
            {titleLine1}<br />{titleLine2}
          </h1>
        </div>

        <div style={{ transform: `scale(${pillScale})` }}>
          <div style={{ backgroundColor: color.accent, color: color.onAccent, padding: "16px 42px", borderRadius: "20px", fontSize: 26, fontWeight: fontWeight.regular, letterSpacing: "1.5px", textTransform: "uppercase" }}>
            {pill}
          </div>
        </div>

        <div style={{ transform: `scale(${wordScale})`, opacity: wordOpacity }}>
          <h2 style={{ ...text.display, color: color.accent, textTransform: "uppercase", letterSpacing: "1px", margin: 0, textShadow: "0 0 40px rgba(204, 255, 0, 0.3)" }}>
            {accent}
          </h2>
        </div>
      </div>

      {/* Сетка слотов памяти */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", marginBottom: 40 }}>
        {[0, 1].map((row) => (
          <div key={row} style={{ display: "flex", gap: 12 }}>
            {Array.from({ length: 7 }).map((_, col) => {
              const isCenter  = col === 3;
              const slotScale = spring({ frame: frame - 45 - col * 2.5, fps, from: 0, to: 1, config: { damping: 12, mass: 0.6 } });
              return (
                <div key={col} style={{ width: 54, height: 34, borderRadius: "10px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 3, transform: `scale(${slotScale})`, backgroundColor: isCenter ? color.accent : "rgba(255, 255, 255, 0.05)", border: isCenter ? "none" : "1px solid rgba(255, 255, 255, 0.12)", boxShadow: isCenter ? `0 0 20px rgba(204, 255, 0, ${0.2 * pulseScale})` : "none" }}>
                  {isCenter ? (
                    <>
                      <div style={{ width: 20, height: 3, backgroundColor: color.onAccent, borderRadius: 2 }} />
                      <div style={{ width: 20, height: 3, backgroundColor: color.onAccent, borderRadius: 2 }} />
                    </>
                  ) : (
                    <div style={{ width: 20, height: 2, backgroundColor: "rgba(255, 255, 255, 0.25)", borderRadius: 1 }} />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
