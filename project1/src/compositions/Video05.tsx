/**
 * Композиция Video05 — рендерит манифест VIDEO_05 через общий SceneFrame.
 */

import { Composition } from "remotion";
import { MyScene } from "../components/SceneFrame";
import { VIDEO_05, TOTAL_FRAMES } from "../videos/video-05";
import { video } from "../common/design-system";

export const Video05 = () => {
  return (
    <Composition
      id="Video05"
      component={MyScene}
      defaultProps={{ manifest: VIDEO_05 }}
      durationInFrames={TOTAL_FRAMES}
      fps={video.fps}
      width={video.width}
      height={video.height}
    />
  );
};
