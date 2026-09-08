/**
 * Demo-композиция шаблона SequentialReveal.
 * Два примера подряд (Series): режим `paper` (h2 + body + small) и режим `ink`
 * (h1 + body). Виден каскадный вход элементов (stagger).
 */

import { Composition, Series } from "remotion";
import { SequentialReveal } from "../templates/SequentialReveal";
import { video } from "../common";

const SEGMENT = 120;

const SequentialRevealDemoScene = () => (
  <Series>
    <Series.Sequence durationInFrames={SEGMENT}>
      <SequentialReveal
        mode="paper"
        stagger={12}
        items={[
          { kind: "text", role: "h2", value: "Навык сместился" },
          { kind: "text", role: "body", value: "теперь — точно сформулировать и проверить" },
          { kind: "text", role: "small", value: "СЕРИЯ · ВЫПУСК 01", tone: "muted" },
        ]}
      />
    </Series.Sequence>
    <Series.Sequence durationInFrames={SEGMENT}>
      <SequentialReveal
        mode="ink"
        stagger={12}
        items={[
          { kind: "text", role: "h1", value: "Держи контроль" },
          { kind: "text", role: "body", value: "учишься вайб-кодингу — учись держать контроль" },
        ]}
      />
    </Series.Sequence>
  </Series>
);

export const SequentialRevealDemo = () => (
  <Composition
    id="SequentialRevealDemo"
    component={SequentialRevealDemoScene}
    durationInFrames={SEGMENT * 2}
    fps={video.fps}
    width={video.width}
    height={video.height}
  />
);
