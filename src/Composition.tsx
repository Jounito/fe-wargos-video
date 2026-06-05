import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const brand = {
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

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const easeOut = Easing.bezier(0.22, 1, 0.36, 1);

const ecosystemCards = [
  { src: "ecosystem-promociones.png", x: 170, y: 170, width: 185, rotate: -6, rotateY: 14, delay: 18 },
  { src: "ecosystem-cupones.png", x: 384, y: 132, width: 198, rotate: -2, rotateY: 7, delay: 24 },
  { src: "ecosystem-puntos.png", x: 610, y: 118, width: 205, rotate: 2, rotateY: -5, delay: 30 },
  { src: "ecosystem-rankings.png", x: 838, y: 154, width: 196, rotate: 6, rotateY: -13, delay: 36 },
  { src: "ecosystem-player-tracking.png", x: 222, y: 356, width: 205, rotate: 5, rotateY: 11, delay: 42 },
  { src: "ecosystem-cashless.png", x: 470, y: 332, width: 218, rotate: 1, rotateY: 3, delay: 48 },
  { src: "ecosystem-tickets.png", x: 715, y: 344, width: 205, rotate: -3, rotateY: -7, delay: 54 },
  { src: "ecosystem-crm.png", x: 952, y: 348, width: 205, rotate: -7, rotateY: -14, delay: 60 },
];

const operationsSlices = [
  { x: 28, y: 111, width: 75, height: 212, delay: 12, rotate: -1.4 },
  { x: 108, y: 111, width: 92, height: 212, delay: 18, rotate: -0.7 },
  { x: 203, y: 111, width: 94, height: 212, delay: 24, rotate: 0 },
  { x: 301, y: 111, width: 79, height: 212, delay: 30, rotate: 0.7 },
  { x: 383, y: 111, width: 92, height: 212, delay: 36, rotate: 1.4 },
];

const integralSlices = [
  { x: 34, y: 116, width: 116, height: 105, delay: 12 },
  { x: 156, y: 116, width: 119, height: 105, delay: 18 },
  { x: 280, y: 116, width: 184, height: 105, delay: 24 },
  { x: 34, y: 231, width: 116, height: 104, delay: 30 },
  { x: 156, y: 231, width: 119, height: 104, delay: 36 },
  { x: 280, y: 231, width: 184, height: 104, delay: 42 },
];

const SoftBackground = ({ children }: { children: React.ReactNode }) => {
  const frame = useCurrentFrame();
  const sweep = interpolate(frame, [0, 130], [-95, 112], {
    ...clamp,
    easing: easeOut,
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 78% 18%, rgba(33,110,238,0.12), transparent 28%), radial-gradient(circle at 22% 84%, rgba(115,168,255,0.18), transparent 30%), linear-gradient(135deg, #ffffff 0%, #f8fbff 48%, #eef5ff 100%)",
        color: brand.ink,
        overflow: "hidden",
        fontFamily:
          '"Space Grotesk", "Aptos", "Segoe UI", ui-sans-serif, sans-serif',
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          bottom: 50,
          height: 90,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(33,110,238,0.18), rgba(33,110,238,0.05) 44%, transparent 72%)",
          filter: "blur(8px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: -140,
          background:
            "linear-gradient(116deg, transparent 36%, rgba(255,255,255,0.92) 49%, transparent 62%)",
          transform: `translateX(${sweep}%) rotate(9deg)`,
          opacity: 0.74,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

const SceneText = ({
  eyebrow,
  title,
  blue,
  subtitle,
  x,
  y,
  width,
  size = 58,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  blue?: string;
  subtitle?: string;
  x?: number;
  y?: number;
  width?: number;
  size?: number;
  center?: boolean;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const intro = spring({
    frame,
    fps,
    config: { damping: 22, stiffness: 120, mass: 0.9 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: center ? 0 : x,
        right: center ? 0 : undefined,
        top: y,
        width: center ? undefined : width,
        textAlign: center ? "center" : "left",
        opacity: intro,
        transform: `translateY(${(1 - intro) * 22}px)`,
      }}
    >
      {eyebrow ? (
        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: brand.primary,
            textTransform: "uppercase",
            marginBottom: 22,
          }}
        >
          {eyebrow}
        </div>
      ) : null}
      <div
        style={{
          fontSize: size,
          lineHeight: 1.04,
          fontWeight: 900,
          color: brand.ink,
        }}
      >
        {title}
        {blue ? (
          <>
            <br />
            <span style={{ color: brand.primary }}>{blue}</span>
          </>
        ) : null}
      </div>
      <div
        style={{
          width: center ? 40 : 50,
          height: 4,
          borderRadius: 999,
          margin: center ? "18px auto 0" : "20px 0 0",
          background: brand.primary,
        }}
      />
      {subtitle ? (
        <div
          style={{
            marginTop: 22,
            fontSize: 23,
            lineHeight: 1.36,
            fontWeight: 500,
            color: brand.muted,
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
};

const FloatingImageMockup = ({
  src,
  x,
  y,
  width,
  delay,
  rotate = 0,
  rotateY = 0,
  lift = 0,
}: {
  src: string;
  x: number;
  y: number;
  width: number;
  delay: number;
  rotate?: number;
  rotateY?: number;
  lift?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const intro = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 21, stiffness: 135, mass: 0.9 },
  });
  const float = Math.sin((frame + delay) / 26) * 6 * intro;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        filter:
          "drop-shadow(0 30px 34px rgba(15, 74, 170, 0.22)) drop-shadow(0 8px 18px rgba(33, 110, 238, 0.18))",
        opacity: intro,
        transform: `perspective(950px) rotateY(${rotateY * intro}deg) rotate(${rotate * intro}deg) translateY(${(1 - intro) * 44 + float - lift}px) scale(${0.9 + intro * 0.1})`,
        transformStyle: "preserve-3d",
        willChange: "opacity, transform, filter",
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />
    </div>
  );
};

const ReferenceScenePanel = ({
  src,
  width,
  height,
  x,
  y,
  delay = 0,
  rotate = 0,
  rotateY = 0,
  shadow = "0 36px 90px rgba(33,110,238,0.2)",
}: {
  src: string;
  width: number;
  height: number;
  x: number;
  y: number;
  delay?: number;
  rotate?: number;
  rotateY?: number;
  shadow?: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const intro = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 20, stiffness: 118, mass: 0.95 },
  });
  const float = Math.sin((frame + delay) / 28) * 4 * intro;
  const shineX = interpolate(frame, [delay + 10, delay + 55], [-32, 118], {
    ...clamp,
    easing: easeOut,
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        borderRadius: 28,
        overflow: "hidden",
        opacity: intro,
        boxShadow: shadow,
        transform: `perspective(1400px) rotateY(${rotateY * (1 - intro)}deg) rotate(${rotate * (1 - intro)}deg) translateY(${(1 - intro) * 34 + float}px) scale(${0.94 + intro * 0.06})`,
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: -120,
          background:
            "linear-gradient(112deg, transparent 36%, rgba(255,255,255,0.74) 50%, transparent 64%)",
          transform: `translateX(${shineX}%) rotate(10deg)`,
          opacity: 0.82 * intro,
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
};

const ReferenceSliceCard = ({
  src,
  slice,
  index,
  sourceWidth,
  sourceHeight,
  sceneX,
  sceneY,
  sceneScale,
}: {
  src: string;
  slice: {
    x: number;
    y: number;
    width: number;
    height: number;
    delay: number;
    rotate?: number;
  };
  index: number;
  sourceWidth: number;
  sourceHeight: number;
  sceneX: number;
  sceneY: number;
  sceneScale: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const intro = spring({
    frame: Math.max(0, frame - slice.delay),
    fps,
    config: { damping: 19, stiffness: 135, mass: 0.9 },
  });
  const float = Math.sin((frame + index * 11) / 26) * 5 * intro;
  const left = sceneX + slice.x * sceneScale;
  const top = sceneY + slice.y * sceneScale;
  const width = slice.width * sceneScale;
  const height = slice.height * sceneScale;
  const imageWidth = sourceWidth * sceneScale;
  const imageHeight = sourceHeight * sceneScale;

  return (
    <>
      <div
        style={{
          position: "absolute",
          left,
          top: top + height - 3,
          width,
          height: height * 0.4,
          overflow: "hidden",
          opacity: intro * 0.22,
          transform: `scaleY(-0.35) translateY(${-10 + float * 0.2}px)`,
          transformOrigin: "top center",
          filter: "blur(1.4px)",
          WebkitMaskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 30%, transparent 84%)",
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 30%, transparent 84%)",
        }}
      >
        <Img
          src={staticFile(src)}
          style={{
            position: "absolute",
            left: -slice.x * sceneScale,
            top: -slice.y * sceneScale,
            width: imageWidth,
            height: imageHeight,
            display: "block",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left,
          top,
          width,
          height,
          borderRadius: 18,
          overflow: "hidden",
          opacity: intro,
          boxShadow: "0 28px 68px rgba(33,110,238,0.16)",
          transform: `perspective(1200px) rotate(${(slice.rotate ?? 0) * intro}deg) translateY(${(1 - intro) * 48 + float}px) scale(${0.9 + intro * 0.1})`,
        }}
      >
        <Img
          src={staticFile(src)}
          style={{
            position: "absolute",
            left: -slice.x * sceneScale,
            top: -slice.y * sceneScale,
            width: imageWidth,
            height: imageHeight,
            display: "block",
          }}
        />
      </div>
    </>
  );
};

const SceneZero = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = 2.1;
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
        fontFamily:
          '"Space Grotesk", "Aptos", "Segoe UI", ui-sans-serif, sans-serif',
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

const ProductPresentation = () => {
  return (
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
        src="mockup-vip-card.png"
        x={700}
        y={6}
        width={342}
        delay={18}
        rotate={-0.6}
        rotateY={-4}
        lift={2}
      />
      <FloatingImageMockup
        src="mockup-promociones-card.png"
        x={650}
        y={216}
        width={402}
        delay={26}
        rotate={0.8}
        rotateY={4}
      />
      <FloatingImageMockup
        src="mockup-puntos-card.png"
        x={1010}
        y={110}
        width={235}
        delay={30}
        rotate={0.9}
        rotateY={-5}
        lift={6}
      />
      <FloatingImageMockup
        src="mockup-ranking-card.png"
        x={930}
        y={350}
        width={285}
        delay={34}
        rotate={1.2}
        rotateY={-5}
      />
    </SoftBackground>
  );
};

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
  const breathe = Math.sin((frame + index * 19) / 42) * 1.2 * enter;
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
          transform: `perspective(900px) rotateY(${card.rotateY * 0.55}deg) rotate(${card.rotate * 0.55}deg) scaleY(-0.42) translateY(${10 - drift * 0.4}px)`,
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
          transform: `perspective(1100px) translate3d(${(1 - enter) * (index < 4 ? -28 : 28)}px, ${(1 - enter) * 80 + drift}px, 0) rotateY(${card.rotateY * enter + breathe}deg) rotate(${card.rotate * enter}deg) scale(${0.82 + enter * 0.18})`,
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
        <EcosystemGalleryCard
          key={card.src}
          card={card}
          index={index}
        />
      ))}
    </>
  );
};

const EcosystemMosaic = () => (
  <SoftBackground>
    <SceneText
      center
      y={62}
      title="Todo lo que necesitas,"
      blue="en un solo lugar."
      size={34}
    />
    <EcosystemGallery />
  </SoftBackground>
);

const DashboardMock = () => {
  const frame = useCurrentFrame();
  const pulse = interpolate(frame, [18, 42, 66], [0.82, 1, 0.9], clamp);

  return (
    <>
      <ReferenceScenePanel
        src="ref-scene-04-dashboard.png"
        x={70}
        y={78}
        width={1140}
        height={641}
        delay={8}
        rotate={-0.4}
        rotateY={-5}
      />
      <div
        style={{
          position: "absolute",
          left: 88,
          right: 88,
          bottom: 14,
          height: 74,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(33,110,238,0.3), rgba(33,110,238,0.08) 45%, transparent 75%)",
          filter: "blur(10px)",
          opacity: pulse,
        }}
      />
    </>
  );
};

const DashboardHero = () => (
  <SoftBackground>
    <DashboardMock />
  </SoftBackground>
);

const OperationsControl = () => (
  <SoftBackground>
    {operationsSlices.map((slice, index) => (
      <ReferenceSliceCard
        key={`${slice.x}-${slice.y}`}
        src="ref-scene-05-operations.png"
        slice={slice}
        index={index}
        sourceWidth={501}
        sourceHeight={373}
        sceneX={157}
        sceneY={0}
        sceneScale={720 / 373}
      />
    ))}
  </SoftBackground>
);

const ProductFamilies = () => (
  <SoftBackground>
    {integralSlices.map((slice, index) => (
      <ReferenceSliceCard
        key={`${slice.x}-${slice.y}`}
        src="ref-scene-06-integral.png"
        slice={slice}
        index={index}
        sourceWidth={499}
        sourceHeight={373}
        sceneX={158}
        sceneY={0}
        sceneScale={720 / 373}
      />
    ))}
  </SoftBackground>
);

const OutroScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 22, stiffness: 115 },
  });
  const particleFade = interpolate(frame, [0, 40, 92], [0, 1, 0.36], clamp);
  const zoom = interpolate(frame, [0, 120], [1.03, 1], clamp);

  return (
    <SoftBackground>
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: logo,
          transform: `scale(${zoom})`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={staticFile("ref-scene-07-outro.png")}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />
      </div>
      {[...Array(58)].map((_, index) => {
        const side = index % 2 === 0 ? -1 : 1;
        const depth = 1 + (index % 7) * 0.12;
        const progress = interpolate(frame, [0, 82], [0, 1], {
          ...clamp,
          easing: easeOut,
        });
        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: 640 + side * (520 - progress * 350) * depth + Math.sin(index) * 40,
              top: 120 + (index % 11) * 48,
              width: 12 + (index % 4) * 10,
              height: 8 + (index % 3) * 7,
              borderRadius: 3,
              background:
                index % 5 === 0
                  ? "rgba(33,110,238,0.42)"
                  : "rgba(115,168,255,0.26)",
              opacity: particleFade,
              boxShadow: "0 12px 28px rgba(33,110,238,0.12)",
            }}
          />
        );
      })}
    </SoftBackground>
  );
};

export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={90}>
        <SceneZero />
      </Sequence>
      <Sequence from={90} durationInFrames={90}>
        <ProductPresentation />
      </Sequence>
      <Sequence from={180} durationInFrames={150}>
        <EcosystemMosaic />
      </Sequence>
      <Sequence from={330} durationInFrames={150}>
        <DashboardHero />
      </Sequence>
      <Sequence from={480} durationInFrames={150}>
        <OperationsControl />
      </Sequence>
      <Sequence from={630} durationInFrames={150}>
        <ProductFamilies />
      </Sequence>
      <Sequence from={780} durationInFrames={120}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
