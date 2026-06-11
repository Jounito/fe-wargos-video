import { Easing } from "remotion";

export const brand = {
  primary: "#216EEE",
  primarySoft: "#73A8FF",
  primaryPale: "#E5F0FF",
  deep: "#0A1533",
  ink: "#101114",
  muted: "#60708E",
  line: "#98BEFF",
  success: "#18B877",
  amber: "#F6A300",
};

export const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const easeOut = Easing.bezier(0.22, 1, 0.36, 1);
