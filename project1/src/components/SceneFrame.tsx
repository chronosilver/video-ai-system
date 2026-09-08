import { AbsoluteFill, Sequence } from "remotion";
import { REGISTRY } from "../presets/registry";
import { color } from "../common/design-system";
import type { SceneManifestEntry } from "../videos/types";
import { VIDEO_01 } from "../videos/video-01";

interface Props {
  // Необязателен: Remotion передаёт через defaultProps; фолбэк — VIDEO_01
  manifest?: SceneManifestEntry[];
}

export const MyScene = ({ manifest = VIDEO_01 }: Props) => {
  let from = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: color.bg }}>
      {manifest.map((entry, index) => {
        const Component = REGISTRY[entry.preset as keyof typeof REGISTRY];
        const sequenceFrom = from;
        from += entry.duration;

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
