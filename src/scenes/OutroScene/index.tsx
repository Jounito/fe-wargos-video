import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { clamp, easeOut } from "../../video-theme";
import { getVariantStageScale, type VariantSceneProps } from "../../video-variants";

export const OutroScene = ({ variant }: VariantSceneProps) => {
  const frame = useCurrentFrame();
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
  const isotypeCenteredX = (finalGroupWidth - isotypeWidth) / 2;
  const wordmarkX = 106.48 * scale;
  const wordmarkY = 20.5 * scale;
  const technologiesX = 120.88 * scale;
  const technologiesY = 56.5 * scale;
  const logoSrc = staticFile("logo-light-theme.svg");
  const overallOpacity = interpolate(frame, [0, 8, 118, 120], [0, 1, 1, 0], clamp);
  const technologiesOpacity = interpolate(frame, [10, 30], [1, 0], {
    ...clamp,
    easing: easeOut,
  });
  const wordmarkOpacity = interpolate(frame, [24, 48], [1, 0], {
    ...clamp,
    easing: easeOut,
  });
  const groupShiftX = interpolate(frame, [48, 76], [0, isotypeCenteredX], {
    ...clamp,
    easing: easeOut,
  });
  const finalLogoOpacity = interpolate(frame, [0, 12], [1, 0], clamp);
  const isotypeScale = interpolate(frame, [76, 120], [1, 15], {
    ...clamp,
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const isotypeOpacity = interpolate(frame, [76, 102, 120], [1, 1, 0], clamp);
  const glowScale = interpolate(frame, [0, 120], [1, 1.45], clamp);
  const glowOpacity = interpolate(frame, [0, 20, 100, 120], [0.28, 0.18, 0.12, 0], clamp);

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
          left: "50%",
          top: "50%",
          width: 620,
          height: 620,
          transform: `translate(-50%, -50%) scale(${glowScale})`,
          borderRadius: 999,
          background:
            "radial-gradient(circle, rgba(33,110,238,0.18), rgba(115,168,255,0.08) 42%, transparent 70%)",
          filter: "blur(22px)",
          opacity: glowOpacity,
        }}
      />
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: overallOpacity,
        }}
      >
        <div
          style={{
            position: "relative",
            width: finalGroupWidth,
            height: finalGroupHeight,
            transform: `translateX(${groupShiftX}px)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: isotypeWidth,
              height: isotypeHeight,
              overflow: "hidden",
              filter: "drop-shadow(0 16px 28px rgba(33,110,238,0.18))",
              transform: `scale(${isotypeScale})`,
              transformOrigin: "center center",
              opacity: isotypeOpacity,
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
          <div
            style={{
              position: "absolute",
              left: wordmarkX,
              top: wordmarkY,
              width: 183 * scale,
              height: wordmarkHeight,
              overflow: "hidden",
              opacity: wordmarkOpacity,
            }}
          >
            <Img
              src={logoSrc}
              style={{
                position: "absolute",
                left: -wordmarkX,
                top: -wordmarkY,
                width: finalGroupWidth,
                height: "auto",
                display: "block",
                maxWidth: "none",
                maxHeight: "none",
              }}
            />
          </div>
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
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
