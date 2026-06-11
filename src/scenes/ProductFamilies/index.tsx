import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { productFamilyCards } from "../../video-data";
import { SoftBackground } from "../../video-primitives";
import { brand, clamp } from "../../video-theme";

const ProductFamilyCard = ({
  card,
}: {
  card: (typeof productFamilyCards)[number];
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const intro = spring({
    frame: Math.max(0, frame - card.delay),
    fps,
    config: { damping: 18, stiffness: 118, mass: 0.9 },
  });
  const float = Math.sin((frame + card.delay) / 30) * 5 * intro;
  const cardHeight = (card.width * 1086) / 1448;

  return (
    <div
      style={{
        position: "absolute",
        left: card.x,
        top: card.y,
        width: card.width,
        opacity: intro,
        transform: `translateY(${(1 - intro) * 34 + float}px) scale(${0.92 + intro * 0.08})`,
        filter:
          "drop-shadow(0 22px 28px rgba(18, 70, 170, 0.14)) drop-shadow(0 8px 18px rgba(33,110,238,0.16))",
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

export const ProductFamilies = () => {
  const frame = useCurrentFrame();
  const glow = interpolate(frame, [10, 44], [0, 1], clamp);
  const { fps } = useVideoConfig();
  const intro = spring({
    frame,
    fps,
    config: { damping: 22, stiffness: 120, mass: 0.9 },
  });

  return (
    <SoftBackground>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 78,
          textAlign: "center",
          opacity: intro,
          transform: `translateY(${(1 - intro) * 22}px)`,
        }}
      >
        <div
          style={{
            fontSize: 36,
            lineHeight: 1.08,
            fontWeight: 900,
            color: brand.ink,
          }}
        >
          Gestión completa para <span style={{ color: brand.primary }}>cada área</span> de tu casino.
        </div>
        <div
          style={{
            width: 40,
            height: 4,
            borderRadius: 999,
            margin: "18px auto 0",
            background: brand.primary,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          bottom: 28,
          height: 82,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(33,110,238,0.2), rgba(115,168,255,0.08) 42%, transparent 76%)",
          filter: "blur(12px)",
          opacity: glow,
        }}
      />
      {productFamilyCards.map((card) => (
        <ProductFamilyCard key={card.src} card={card} />
      ))}
    </SoftBackground>
  );
};
