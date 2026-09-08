import { MyComposition } from "./compositions/Composition";
import { GridSystemDemo } from "./compositions/GridDemo";
import { SequentialRevealDemo } from "./compositions/SequentialRevealDemo";
import { TypographyDemo } from "./compositions/TypographyDemo";
import { Video03 } from "./compositions/Video03";
import { Video05 } from "./compositions/Video05";
// import { MyScene } from "./MyScene";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <Video03 />
      <Video05 />
      <GridSystemDemo />
      <TypographyDemo />
      <SequentialRevealDemo />
    </>
  );
};
