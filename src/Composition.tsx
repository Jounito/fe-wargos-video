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
import type { VariantSceneProps } from "./video-variants";

void OperationsControl;
void ProductFamilies;

export const MyComposition = ({ variant }: VariantSceneProps) => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={90}>
        <SceneZero variant={variant} />
      </Sequence>
      <Sequence from={90} durationInFrames={90}>
        <ProductPresentation variant={variant} />
      </Sequence>
      <Sequence from={180} durationInFrames={120}>
        <EcosystemMosaic variant={variant} />
      </Sequence>
      <Sequence from={300} durationInFrames={90}>
        <DashboardHero variant={variant} />
      </Sequence>
      {/*
      <Sequence from={390} durationInFrames={120}>
        <OperationsControl variant={variant} />
      </Sequence>
      */}
      {/*
      <Sequence from={390} durationInFrames={120}>
        <ProductFamilies variant={variant} />
      </Sequence>
      */}
      <Sequence from={390} durationInFrames={120}>
        <AIHelperScene variant={variant} />
      </Sequence>
      <Sequence from={510} durationInFrames={90}>
        <OutroScene variant={variant} />
      </Sequence>
    </AbsoluteFill>
  );
};
