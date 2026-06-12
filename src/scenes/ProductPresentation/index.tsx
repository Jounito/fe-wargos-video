import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import {
  FloatingImageMockup,
  SceneCornerLogo,
  SceneCornerWebsite,
  SceneText,
  SceneViewport,
  SoftBackground,
} from "../../video-primitives";
import { clamp } from "../../video-theme";
import type { VariantSceneProps } from "../../video-variants";

const ProductConnectionLines = () => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [18, 64], [0, 1], clamp);
  const opacity = interpolate(frame, [14, 24], [0, 1], clamp);
  const lineWidth = 900;
  const lineHeight = (lineWidth * 1086) / 1448;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: `${reveal * 100}%`,
          overflow: "hidden",
          WebkitMaskImage:
            "linear-gradient(90deg, #000 0%, #000 calc(100% - 82px), transparent 100%)",
          maskImage:
            "linear-gradient(90deg, #000 0%, #000 calc(100% - 82px), transparent 100%)",
        }}
      >
        <Img
          src={staticFile("presentation-connection-lines.png")}
          style={{
            position: "absolute",
            left: 360,
            top: 12,
            width: lineWidth,
            height: lineHeight,
            display: "block",
            maxWidth: "none",
            filter: "drop-shadow(0 8px 18px rgba(33, 110, 238, 0.18))",
          }}
        />
      </div>
    </div>
  );
};

export const ProductPresentation = ({ variant }: VariantSceneProps) => (
  <SoftBackground>
    <SceneViewport variant={variant}>
      {(() => {
        const isWide = variant === "wide";

        return (
          <>
            <SceneCornerLogo variant={variant} />
            <SceneCornerWebsite variant={variant} />
            <SceneText
              x={isWide ? -60 : 90}
              middle
              width={isWide ? 520 : 480}
              title={
                <>
                  <span style={{ color: "#216EEE" }}>Software inteligente</span> para casinos.
                </>
              }
              // subtitle="Una plataforma completa para gestionar toda tu operacion."
            />
            <ProductConnectionLines />
            <FloatingImageMockup
              src="escena02/scene02-card-vip.png"
              x={isWide ? 720 : 650}
              y={54}
              width={447}
              delay={18}
              lift={2}
            />
            <FloatingImageMockup
              src="escena02/scene02-card-promo.png"
              x={isWide ? 645 : 615}
              y={324}
              width={468}
              delay={26}
            />
            <FloatingImageMockup
              src="escena02/scene02-card-points.png"
              x={isWide ? 1080 : 957}
              y={144}
              width={351}
              delay={30}
              lift={6}
            />
            <FloatingImageMockup
              src="escena02/scene02-card-ranking.png"
              x={isWide ? 948 : 830}
              y={356}
              width={500}
              delay={34}
            />
          </>
        );
      })()}
    </SceneViewport>
  </SoftBackground>
);
