import { Composition } from "remotion";
import { MyScene } from "../components/SceneFrame";
import { VIDEO_02, TOTAL_FRAMES } from "../videos/video-02";
import { video } from "../common/design-system";

export const MyComposition = () => {
  return (
    <Composition
      id="MyFirstVideo"
      component={MyScene}
      defaultProps={{ manifest: VIDEO_02 }}
      durationInFrames={TOTAL_FRAMES}
      fps={video.fps}
      width={video.width}
      height={video.height}
    />
  );
};
