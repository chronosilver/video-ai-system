import { MyComposition } from "./compositions/Composition";
import { GridSystemDemo } from "./compositions/GridDemo";
import { TypographyDemo } from "./compositions/TypographyDemo";
import { Video03 } from "./compositions/Video03";
// import { MyScene } from "./MyScene";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <Video03 />
      <GridSystemDemo />
      <TypographyDemo />
    </>
  );
};
