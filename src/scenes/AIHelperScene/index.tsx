import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { aiOperationCards } from "../../video-data";
import {
  SceneCornerLogo,
  SceneCornerWebsite,
  SceneText,
  SceneViewport,
  SoftBackground,
} from "../../video-primitives";
import { clamp } from "../../video-theme";
import type { VariantSceneProps } from "../../video-variants";

const AIHelperCard = ({
  card,
  shadow = true,
}: {
  card: {
    src: string;
    x: number;
    y: number;
    width: number;
    delay: number;
  };
  shadow?: boolean;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const intro = spring({
    frame: Math.max(0, frame - card.delay),
    fps,
    config: { damping: 18, stiffness: 118, mass: 0.9 },
  });
  const float = Math.sin((frame + card.delay) / 30) * 4 * intro;
  const cardHeight = (card.width * 1402) / 1122;

  return (
    <div
      style={{
        position: "absolute",
        left: card.x,
        top: card.y,
        width: card.width,
        opacity: intro,
        transform: `translateY(${(1 - intro) * 34 + float}px) scale(${0.92 + intro * 0.08})`,
        filter: shadow
          ? "drop-shadow(0 22px 30px rgba(18,70,170,0.14)) drop-shadow(0 8px 18px rgba(33,110,238,0.16))"
          : undefined,
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

export const AIHelperScene = ({ variant }: VariantSceneProps) => {
  const frame = useCurrentFrame();
  const orbitOpacity = interpolate(frame, [10, 34], [0, 1], clamp);
  const isWide = variant === "wide";

  return (
    <SoftBackground>
      <SceneViewport variant={variant}>
        <SceneCornerLogo variant={variant} />
        <SceneCornerWebsite variant={variant} />
        <SceneText
          x={isWide ? -60 : 88}
          middle
          width={isWide ? 580 : 500}
          title={
            <>
              <span style={{ color: "#216EEE" }}>Respuestas inmediatas</span>
              <span> para una operación</span>
              <br />
              <span>que nunca para.</span>
            </>
          }
        />

        <div
          style={{
            position: "absolute",
            left: isWide ? 735 : 640,
            top: 250,
            width: 600,
            height: 216,
            borderRadius: "50%",
            border: "2px solid rgba(83,165,255,0.58)",
            opacity: orbitOpacity,
            filter: "blur(0.2px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: isWide ? 720 : 626,
            top: 558,
            width: 674,
            height: 234,
            borderRadius: "50%",
            border: "2px solid rgba(83,165,255,0.5)",
            opacity: orbitOpacity * 0.92,
            filter: "blur(0.2px)",
          }}
        />
        {[
          { x: isWide ? 1365 : 1270, y: 100, size: 8 },
          { x: isWide ? 1225 : 1130, y: 142, size: 6 },
          { x: isWide ? 1391 : 1296, y: 618, size: 8 },
          { x: isWide ? 1183 : 1088, y: 744, size: 7 },
          { x: isWide ? 745 : 650, y: 590, size: 9 },
          { x: isWide ? 693 : 598, y: 786, size: 6 },
        ].map((dot, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: dot.x,
              top: dot.y,
              width: dot.size,
              height: dot.size,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.92)",
              boxShadow: "0 0 18px rgba(115,168,255,0.95)",
              opacity: orbitOpacity,
            }}
          />
        ))}

        {aiOperationCards.map((card) => (
          <AIHelperCard
            key={card.src}
            card={{
              ...card,
              x: isWide ? card.x + 95 : card.x,
            }}
          />
        ))}
      </SceneViewport>
    </SoftBackground>
  );
};
