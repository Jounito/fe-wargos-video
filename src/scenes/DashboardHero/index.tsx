import { Img, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneText, SoftBackground } from "../../video-primitives";

const DashboardMock = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const intro = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 20, stiffness: 112, mass: 0.96 },
  });
  const float = Math.sin((frame + 10) / 34) * 8 * intro;
  const wiggleZ = Math.sin((frame + 6) / 32) * 1.2 * intro;

  return (
    <>
      <SceneText
        center
        y={65}
        title="Información en"
        width={340}
        blue="tiempo real"
        blueInline
        afterBlue="para decisiones más inteligentes."
        subtitle="Visualiza actividad, alertas y rendimiento al instante."
        size={32}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 160,
          height: 540,
          aspectRatio: "1448 / 1086",
          opacity: intro,
          overflow: "visible",
          transform: `translateX(-50%) translateY(${(1 - intro) * 18 + float}px) rotate(${wiggleZ}deg) scale(${0.96 + intro * 0.04})`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={staticFile("escena04/scene04-dashboard-counters.png")}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 40,
            right: 40,
            bottom: 8,
            height: 18,
            borderRadius: 999,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(115,168,255,0.12) 18%, rgba(61,135,255,0.9) 48%, rgba(129,240,255,0.8) 64%, transparent 100%)",
            filter: "blur(4px)",
            opacity: 0.58 * intro,
          }}
        />
      </div>
    </>
  );
};

export const DashboardHero = () => (
  <SoftBackground>
    <DashboardMock />
  </SoftBackground>
);
