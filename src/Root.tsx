import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import {
  AIHelperScene,
  EcosystemMosaic,
  ProductPresentation,
  SceneZero,
} from "./scenes";

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
      <Composition
        id="Scene01IntroWide"
        component={SceneZero}
        defaultProps={{ variant: "wide" }}
        durationInFrames={90}
        fps={30}
        width={2016}
        height={840}
      />
      <Composition
        id="Scene02ProductWide"
        component={ProductPresentation}
        defaultProps={{ variant: "wide" }}
        durationInFrames={120}
        fps={30}
        width={2016}
        height={840}
      />
      <Composition
        id="Scene03EcosystemWide"
        component={EcosystemMosaic}
        defaultProps={{ variant: "wide" }}
        durationInFrames={210}
        fps={30}
        width={2016}
        height={840}
      />
      <Composition
        id="Scene04AIHelperWide"
        component={AIHelperScene}
        defaultProps={{ variant: "wide" }}
        durationInFrames={180}
        fps={30}
        width={2016}
        height={840}
      />
    </>
  );
};
