/**
 * Композиция Video03 — рендерит манифест VIDEO_03 через общий SceneFrame.
 */

import { Composition } from "remotion";
import { MyScene } from "../components/SceneFrame";
import { VIDEO_03, TOTAL_FRAMES } from "../videos/video-03";
import { video } from "../common/design-system";

export const Video03 = () => {
  return (
    <Composition
      id="Video03"
      component={MyScene}
      defaultProps={{ manifest: VIDEO_03 }}
      durationInFrames={TOTAL_FRAMES}
      fps={video.fps}
      width={video.width}
      height={video.height}
    />
  );
};
