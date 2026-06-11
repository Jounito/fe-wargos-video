import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { operationsCards } from "../../video-data";
import { SceneText, SceneViewport, SoftBackground } from "../../video-primitives";
import { clamp } from "../../video-theme";
import type { VariantSceneProps } from "../../video-variants";

const OperationsControlCard = ({
  card,
}: {
  card: (typeof operationsCards)[number];
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const intro = spring({
    frame: Math.max(0, frame - card.delay),
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.88 },
  });
  const cardHeight = (card.width * 1448) / 1086;

  return (
    <div
      style={{
        position: "absolute",
        left: card.x,
        top: card.y,
        width: card.width,
        opacity: intro,
        transform: `translateY(${(1 - intro) * 44}px) scale(${0.9 + intro * 0.1})`,
        filter:
          "drop-shadow(0 30px 34px rgba(16, 58, 148, 0.16)) drop-shadow(0 8px 20px rgba(33,110,238,0.18))",
      }}
    >
      <Img
        src={staticFile(card.src)}
        style={{
          width: "100%",
          height: cardHeight,
          display: "block",
        }}
      />
    </div>
  );
};

export const OperationsControl = ({ variant }: VariantSceneProps) => {
  const frame = useCurrentFrame();
  const glow = interpolate(frame, [12, 46], [0, 1], clamp);

  return (
    <SoftBackground>
      <SceneViewport variant={variant}>
        <SceneText
          center
          y={68}
          title="Control total de tu"
          blue="operación."
          blueInline
          size={38}
        />
        <div
          style={{
            position: "absolute",
            left: 88,
            right: 88,
            bottom: 26,
            height: 84,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(33,110,238,0.22), rgba(115,168,255,0.08) 42%, transparent 76%)",
            filter: "blur(12px)",
            opacity: glow,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 126,
            right: 126,
            bottom: 88,
            height: 36,
            borderRadius: "50%",
            background:
              "linear-gradient(90deg, transparent, rgba(33,110,238,0.16), transparent)",
            filter: "blur(8px)",
            opacity: glow * 0.82,
          }}
        />
        {operationsCards.map((card) => (
          <OperationsControlCard key={card.src} card={card} />
        ))}
      </SceneViewport>
    </SoftBackground>
  );
};
