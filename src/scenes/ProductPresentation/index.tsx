import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { FloatingImageMockup, SceneText, SoftBackground } from "../../video-primitives";
import { clamp } from "../../video-theme";

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

export const ProductPresentation = () => (
  <SoftBackground>
    <SceneText
      x={90}
      y={136}
      width={480}
      title="CRM para"
      blue="casinos y tragamonedas"
      subtitle="Una plataforma completa para gestionar toda tu operacion."
      size={60}
    />
    <ProductConnectionLines />
    <FloatingImageMockup
      src="escena02/scene02-card-vip.png"
      x={650}
      y={24}
      width={407}
      delay={18}
      lift={2}
    />
    <FloatingImageMockup
      src="escena02/scene02-card-promo.png"
      x={615}
      y={244}
      width={428}
      delay={26}
    />
    <FloatingImageMockup
      src="escena02/scene02-card-points.png"
      x={957}
      y={144}
      width={351}
      delay={30}
      lift={6}
    />
    <FloatingImageMockup
      src="escena02/scene02-card-ranking.png"
      x={830}
      y={356}
      width={500}
      delay={34}
    />
  </SoftBackground>
);
