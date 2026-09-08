/**
 * Demo-композиция Grid Layout System.
 * Заполняет каждую именованную зону подписанным блоком, чтобы визуально
 * проверить раскладку. Debug overlay включается через defaultProps.debug.
 */

import { Composition } from "remotion";
import { GridLayout, GridZone } from "../components/Grid";
import { ROW_ZONES, video, color, fontMono, fontWeight, fontSize, type GridZoneName } from "../common";

const CONTENT_ZONES: GridZoneName[] = [
  "title",
  "main",
  "sub-1",
  "sub-1-continuation",
  "sub-2",
  "support",
  "cta",
];

interface GridDemoProps {
  debug?: boolean;
}

const GridDemoScene = ({ debug = true }: GridDemoProps) => {
  return (
    <GridLayout debug={debug} style={{ backgroundColor: color.bg }}>
      {CONTENT_ZONES.map((zone) => {
        const { label } = ROW_ZONES[zone];
        return (
          <GridZone
            key={zone}
            zone={zone}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(204, 255, 0, 0.06)",
              border: "1px solid rgba(204, 255, 0, 0.25)",
              borderRadius: 12,
            }}
          >
            <span
              style={{
                fontFamily: fontMono,
                fontSize: fontSize.caption,
                fontWeight: fontWeight.regular,
                color: color.accent,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {label}
            </span>
          </GridZone>
        );
      })}
    </GridLayout>
  );
};

export const GridSystemDemo = () => (
  <Composition
    id="GridSystemDemo"
    component={GridDemoScene}
    defaultProps={{ debug: true } satisfies GridDemoProps}
    durationInFrames={150}
    fps={video.fps}
    width={video.width}
    height={video.height}
  />
);
