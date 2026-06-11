import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { clamp, easeOut } from "../../video-theme";
import { getVariantStageScale, type VariantSceneProps } from "../../video-variants";

export const SceneZero = ({ variant }: VariantSceneProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = 2.1 * getVariantStageScale(variant);
  const logoWidth = 291 * scale;
  const logoHeight = 91 * scale;
  const isotypeWidth = 90 * scale;
  const isotypeHeight = 91 * scale;
  const wordmarkHeight = 30 * scale;
  const technologiesWidth = 164 * scale;
  const technologiesHeight = 15 * scale;
  const finalGroupWidth = logoWidth;
  const finalGroupHeight = logoHeight;
  const isotypeStartX = (finalGroupWidth - isotypeWidth) / 2;
  const wordmarkX = 106.48 * scale;
  const wordmarkY = 20.5 * scale;
  const technologiesX = 120.88 * scale;
  const technologiesY = 56.5 * scale;
  const logoSrc = staticFile("logo-light-theme.svg");
  const wordmarkLetters = [
    { x: 0, width: 41 },
    { x: 39, width: 29 },
    { x: 68, width: 27 },
    { x: 95, width: 31 },
    { x: 126, width: 33 },
    { x: 159, width: 24 },
  ];

  const intro = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 120, mass: 0.9 },
  });

  const fadeIn = interpolate(frame, [0, 8], [0, 1], clamp);
  const fadeOut = interpolate(frame, [78, 90], [1, 0], clamp);
  const fade = fadeIn * fadeOut;

  const glowScale = interpolate(frame, [0, fps * 2.5], [0.86, 1.06], clamp);
  const shineX = interpolate(frame, [0, fps * 3], [-35, 105], {
    ...clamp,
    easing: easeOut,
  });

  const logoSettle = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.95 },
  });

  const isotypeScale = interpolate(intro, [0, 1], [9, 1], clamp);
  const isotypeX = interpolate(logoSettle, [0, 1], [isotypeStartX, 0], {
    ...clamp,
    easing: easeOut,
  });
  const wordmarkProgress = interpolate(frame, [14, 34], [0, 1], {
    ...clamp,
    easing: easeOut,
  });
  const technologiesOpacity = interpolate(frame, [34, 44], [0, 1], clamp);
  const finalLogoOpacity = interpolate(frame, [40, 48], [0, 1], clamp);

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #ffffff 0%, #f7faff 46%, #eef5ff 100%)",
        overflow: "hidden",
        fontFamily: '"Inter", "Segoe UI", ui-sans-serif, sans-serif',
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -120,
          background:
            "linear-gradient(115deg, transparent 38%, rgba(255,255,255,0.96) 50%, transparent 62%)",
          transform: `translateX(${shineX}%) rotate(10deg)`,
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 620,
          height: 620,
          transform: `translate(-50%, -50%) scale(${glowScale})`,
          borderRadius: 999,
          background:
            "radial-gradient(circle, rgba(33,110,238,0.18), rgba(115,168,255,0.08) 42%, transparent 70%)",
          filter: "blur(22px)",
          opacity: fade,
        }}
      />
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: fade,
        }}
      >
        <div
          style={{
            transform: `translateY(${(1 - intro) * 24}px)`,
          }}
        >
          <div
            style={{
              position: "relative",
              width: finalGroupWidth,
              height: finalGroupHeight,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: isotypeX,
                top: 0,
                width: isotypeWidth,
                height: isotypeHeight,
                overflow: "hidden",
                filter: "drop-shadow(0 16px 28px rgba(33,110,238,0.18))",
                transform: `scale(${isotypeScale})`,
                transformOrigin: "center center",
              }}
            >
              <Img
                src={logoSrc}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: finalGroupWidth,
                  height: "auto",
                  display: "block",
                  maxWidth: "none",
                  maxHeight: "none",
                }}
              />
            </div>
            {wordmarkLetters.map((letter, index) => {
              const letterStart = index / wordmarkLetters.length;
              const letterProgress = interpolate(
                wordmarkProgress,
                [letterStart, Math.min(1, letterStart + 0.24)],
                [0, 1],
                {
                  ...clamp,
                  easing: Easing.bezier(0.2, 0.9, 0.32, 1),
                },
              );

              return (
                <div
                  key={`${letter.x}-${letter.width}`}
                  style={{
                    position: "absolute",
                    left: wordmarkX + letter.x * scale,
                    top: wordmarkY,
                    width: letter.width * scale,
                    height: wordmarkHeight,
                    overflow: "hidden",
                    opacity: letterProgress,
                    transform: `translateY(${(1 - letterProgress) * 10}px)`,
                  }}
                >
                  <Img
                    src={logoSrc}
                    style={{
                      position: "absolute",
                      left: -(wordmarkX + letter.x * scale),
                      top: -wordmarkY,
                      width: finalGroupWidth,
                      height: "auto",
                      display: "block",
                      maxWidth: "none",
                      maxHeight: "none",
                    }}
                  />
                </div>
              );
            })}
            <div
              style={{
                position: "absolute",
                left: technologiesX,
                top: technologiesY,
                width: technologiesWidth,
                height: technologiesHeight,
                overflow: "hidden",
                opacity: technologiesOpacity,
              }}
            >
              <Img
                src={logoSrc}
                style={{
                  position: "absolute",
                  left: -technologiesX,
                  top: -technologiesY,
                  width: finalGroupWidth,
                  height: "auto",
                  display: "block",
                  maxWidth: "none",
                  maxHeight: "none",
                }}
              />
            </div>
            <Img
              src={logoSrc}
              style={{
                position: "absolute",
                inset: 0,
                width: finalGroupWidth,
                height: "auto",
                display: "block",
                opacity: finalLogoOpacity,
              }}
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
