import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { aiOperationCards } from "../../video-data";
import { SoftBackground } from "../../video-primitives";
import { brand, clamp } from "../../video-theme";

const AIHelperCard = ({
  card,
  shadow = true,
}: {
  card: (typeof aiOperationCards)[number];
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

export const AIHelperScene = () => {
  const frame = useCurrentFrame();
  const orbitOpacity = interpolate(frame, [10, 34], [0, 1], clamp);

  return (
    <SoftBackground>
      <div
        style={{
          position: "absolute",
          left: 88,
          top: 150,
          width: 470,
        }}
      >
        <div
          style={{
            fontSize: 72,
            lineHeight: 0.94,
            fontWeight: 900,
            color: brand.ink,
          }}
        >
          IA que
          <br />
          <span style={{ color: brand.primary }}>responde</span>
          <br />
          sobre tu
          <br />
          <span style={{ color: brand.primary }}>operación</span>
        </div>
        <div
          style={{
            width: 66,
            height: 6,
            borderRadius: 999,
            marginTop: 24,
            background: brand.primary,
          }}
        />
        <div
          style={{
            marginTop: 34,
            fontSize: 26,
            lineHeight: 1.22,
            fontWeight: 500,
            color: "#163C86",
          }}
        >
          Consulta producción, funcionalidades y
          <br />
          estados del sistema en segundos.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 640,
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
          left: 626,
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
        { x: 1270, y: 100, size: 8 },
        { x: 1130, y: 142, size: 6 },
        { x: 1296, y: 618, size: 8 },
        { x: 1088, y: 744, size: 7 },
        { x: 650, y: 590, size: 9 },
        { x: 598, y: 786, size: 6 },
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
        <AIHelperCard key={card.src} card={card} />
      ))}
    </SoftBackground>
  );
};
