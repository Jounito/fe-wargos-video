import { AbsoluteFill, Sequence } from "remotion";
import {
  AIHelperScene,
  EcosystemMosaic,
  OperationsControl,
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
      <Sequence from={90} durationInFrames={120}>
        <ProductPresentation variant={variant} />
      </Sequence>
      <Sequence from={210} durationInFrames={210}>
        <EcosystemMosaic variant={variant} />
      </Sequence>
      {/*
      <Sequence from={420} durationInFrames={180}>
        <DashboardHero variant={variant} />
      </Sequence>
      */}
      {/*
      <Sequence from={420} durationInFrames={180}>
        <OperationsControl variant={variant} />
      </Sequence>
      */}
      {/*
      <Sequence from={420} durationInFrames={180}>
        <ProductFamilies variant={variant} />
      </Sequence>
      */}
      <Sequence from={420} durationInFrames={180}>
        <AIHelperScene variant={variant} />
      </Sequence>
      {/*
      <Sequence from={510} durationInFrames={90}>
        <OutroScene variant={variant} />
      </Sequence>
      */}
    </AbsoluteFill>
  );
};
