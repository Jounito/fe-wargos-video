import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ecosystemCards } from "../../video-data";
import {
  SceneCornerLogo,
  SceneCornerWebsite,
  SceneText,
  SceneViewport,
  SoftBackground,
} from "../../video-primitives";
import { clamp, easeOut } from "../../video-theme";
import type { VariantSceneProps } from "../../video-variants";

const EcosystemGalleryCard = ({
  card,
  index,
}: {
  card: (typeof ecosystemCards)[number];
  index: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame: Math.max(0, frame - card.delay),
    fps,
    config: { damping: 18, stiffness: 118, mass: 0.86 },
  });
  const drift = Math.sin((frame + index * 13) / 30) * 7 * enter;
  const parallax = interpolate(frame, [0, 150], [-10, 10], {
    ...clamp,
    easing: easeOut,
  });
  const cardHeight = (card.width * 1448) / 1086;
  const reflectionTop = card.y + cardHeight - 4;

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: card.x + parallax * (index < 4 ? 0.24 : -0.18),
          top: reflectionTop,
          width: card.width,
          height: cardHeight * 0.48,
          opacity: enter * 0.34,
          transform: `scaleY(-0.42) translateY(${10 - drift * 0.4}px)`,
          transformOrigin: "top center",
          filter: "blur(1.2px) saturate(0.95)",
          WebkitMaskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.22) 32%, transparent 86%)",
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.22) 32%, transparent 86%)",
          overflow: "hidden",
          zIndex: index,
        }}
      >
        <Img
          src={staticFile(card.src)}
          style={{
            width: card.width,
            height: cardHeight,
            display: "block",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: card.x + parallax * (index < 4 ? 0.24 : -0.18),
          top: card.y,
          width: card.width,
          opacity: enter,
          transform: `translate3d(${(1 - enter) * (index < 4 ? -42 : 42)}px, ${(1 - enter) * 104 + drift}px, 0) scale(${0.8 + enter * 0.2})`,
          transformStyle: "preserve-3d",
          transformOrigin: "center bottom",
          filter:
            "drop-shadow(0 34px 38px rgba(7, 31, 86, 0.23)) drop-shadow(0 11px 26px rgba(33, 110, 238, 0.18))",
          willChange: "opacity, transform, filter",
          zIndex: 20 + index,
        }}
      >
        <Img
          src={staticFile(card.src)}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </div>
    </>
  );
};

const EcosystemGallery = () => {
  const frame = useCurrentFrame();
  const floorGlow = interpolate(frame, [10, 50], [0, 1], clamp);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          bottom: 34,
          height: 210,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(33,110,238,0.22), rgba(115,168,255,0.1) 36%, transparent 72%)",
          filter: "blur(18px)",
          opacity: floorGlow,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 120,
          right: 120,
          bottom: 82,
          height: 44,
          borderRadius: "50%",
          background:
            "linear-gradient(90deg, transparent, rgba(33,110,238,0.18), transparent)",
          filter: "blur(10px)",
          opacity: floorGlow * 0.8,
        }}
      />
      {ecosystemCards.map((card, index) => (
        <EcosystemGalleryCard key={card.src} card={card} index={index} />
      ))}
    </>
  );
};

export const EcosystemMosaic = ({ variant }: VariantSceneProps) => {
  const isWide = variant === "wide";

  return (
    <SoftBackground>
      <SceneViewport variant={variant}>
        <SceneCornerLogo variant={variant} />
        <SceneCornerWebsite variant={variant} />
        <div
          style={{
            transform: isWide ? "translateX(110px)" : undefined,
            transformOrigin: "center center",
          }}
        >
          <EcosystemGallery />
        </div>
        <SceneText
          x={isWide ? -60 : 60}
          middle
          width={isWide ? 500 : 340}
          title={
            <>
              <span style={{ color: "#216EEE" }}>Desarrollo e innovación</span> que se adapta a
              <br />
              tu empresa.
            </>
          }
          // subtitle="Gestion, control y seguimiento desde un solo lugar."
        />
      </SceneViewport>
    </SoftBackground>
  );
};
