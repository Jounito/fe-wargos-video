import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        defaultProps={{ variant: "default" }}
        durationInFrames={600}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="MyCompWide"
        component={MyComposition}
        defaultProps={{ variant: "wide" }}
        durationInFrames={600}
        fps={30}
        width={2016}
        height={840}
      />
    </>
  );
};
