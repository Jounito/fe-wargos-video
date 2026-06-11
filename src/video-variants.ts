export type CompositionVariant = "default" | "wide";

export type VariantSceneProps = {
  variant: CompositionVariant;
};

export const BASE_CANVAS = {
  width: 1280,
  height: 720,
} as const;

export const getVariantStageScale = (variant: CompositionVariant) => {
  return variant === "wide" ? 1.14 : 1;
};
