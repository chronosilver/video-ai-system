import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { REGISTRY } from "../presets/registry";
import { TEMPLATE_REGISTRY } from "../templates/registry";
import { color } from "../common/design-system";
import type { SceneManifestEntry } from "../videos/types";
import { VIDEO_01 } from "../videos/video-01";

/**
 * Объединённый резолвер имён сцен: сначала сцены-шаблоны (`TEMPLATE_REGISTRY`),
 * затем пресеты (`REGISTRY`). Типобезопасность обеспечивается на уровне
 * манифеста (`SceneManifestEntry`), здесь имя — уже валидная строка.
 */
const resolveScene = (name: string): React.ComponentType<any> | undefined =>
  (TEMPLATE_REGISTRY as Record<string, React.ComponentType<any>>)[name] ??
  (REGISTRY as Record<string, React.ComponentType<any>>)[name];

interface Props {
  // Необязателен: Remotion передаёт через defaultProps; фолбэк — VIDEO_01
  manifest?: SceneManifestEntry[];
}

export const MyScene = ({ manifest = VIDEO_01 }: Props) => {
  let from = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: color.bg }}>
      {manifest.map((entry, index) => {
        const Component = resolveScene(entry.preset);
        const sequenceFrom = from;
        from += entry.duration;

        if (!Component) return null; // имя не в реестрах — типы манифеста это не пропустят

        return (
          <Sequence
            key={`${entry.preset}-${index}`}
            from={sequenceFrom}
            durationInFrames={entry.duration}
          >
            {/* entry.data as any: TypeScript не сужает K в .map() — см. src/videos/types.ts */}
            <Component {...(entry.data as any)} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
