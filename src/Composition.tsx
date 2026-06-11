import { AbsoluteFill, Sequence } from "remotion";
import {
  AIHelperScene,
  DashboardHero,
  EcosystemMosaic,
  OperationsControl,
  OutroScene,
  ProductFamilies,
  ProductPresentation,
  SceneZero,
} from "./scenes";

void OperationsControl;
void ProductFamilies;

export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={90}>
        <SceneZero />
      </Sequence>
      <Sequence from={90} durationInFrames={90}>
        <ProductPresentation />
      </Sequence>
      <Sequence from={180} durationInFrames={120}>
        <EcosystemMosaic />
      </Sequence>
      <Sequence from={300} durationInFrames={90}>
        <DashboardHero />
      </Sequence>
      {/*
      <Sequence from={390} durationInFrames={120}>
        <OperationsControl />
      </Sequence>
      */}
      {/*
      <Sequence from={390} durationInFrames={120}>
        <ProductFamilies />
      </Sequence>
      */}
      <Sequence from={390} durationInFrames={120}>
        <AIHelperScene />
      </Sequence>
      <Sequence from={510} durationInFrames={90}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
