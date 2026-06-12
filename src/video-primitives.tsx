import type { ReactNode } from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { brand, clamp, easeOut } from "./video-theme";
import {
  BASE_CANVAS,
  getVariantStageScale,
  type CompositionVariant,
} from "./video-variants";

export const SoftBackground = ({ children }: { children: ReactNode }) => {
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
        fontFamily: '"Inter", "Segoe UI", ui-sans-serif, sans-serif',
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

type SceneTextProps = {
  eyebrow?: string;
  title: string;
  blue?: string;
  blueInline?: boolean;
  afterBlue?: string;
  subtitle?: string;
  x?: number;
  y?: number;
  width?: number;
  size?: number;
  center?: boolean;
  middle?: boolean;
};

export const SceneText = ({
  eyebrow,
  title,
  blue,
  blueInline = false,
  afterBlue,
  x,
  y,
  width,
  size = 64,
  center = false,
  middle = false,
}: SceneTextProps) => {
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
        top: middle ? "47%" : y,
        width: center ? undefined : width,
        textAlign: center ? "center" : "left",
        opacity: intro,
        transform: middle
          ? `translateY(calc(-50% + ${(1 - intro) * 22}px))`
          : `translateY(${(1 - intro) * 22}px)`,
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
          blueInline ? (
            <>
              {" "}
              <span style={{ color: brand.primary }}>{blue}</span>
              {afterBlue ? ` ${afterBlue}` : null}
            </>
          ) : (
            <>
              <br />
              <span style={{ color: brand.primary }}>{blue}</span>
              {afterBlue ? ` ${afterBlue}` : null}
            </>
          )
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
      {/*
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
      */}
    </div>
  );
};

type FloatingImageMockupProps = {
  src: string;
  x: number;
  y: number;
  width: number;
  delay: number;
  rotate?: number;
  rotateY?: number;
  lift?: number;
};

export const FloatingImageMockup = ({
  src,
  x,
  y,
  width,
  delay,
  rotate = 0,
  rotateY = 0,
  lift = 0,
}: FloatingImageMockupProps) => {
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

export const SceneViewport = ({
  children,
  variant,
}: {
  children: ReactNode;
  variant: CompositionVariant;
}) => {
  const scale = getVariantStageScale(variant);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: BASE_CANVAS.width,
        height: BASE_CANVAS.height,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      {children}
    </div>
  );
};

export const SceneCornerLogo = ({
  variant,
}: {
  variant: CompositionVariant;
}) => {
  const isWide = variant === "wide";

  return (
    <Img
      src={staticFile("logo-light-theme.svg")}
      style={{
        position: "absolute",
        top: 64,
        left: isWide ? -60 : 40,
        width: isWide ? 208 : 184,
        height: "auto",
        opacity: 0.98,
        filter: "drop-shadow(0 10px 20px rgba(18, 70, 170, 0.16))",
      }}
    />
  );
};

export const SceneCornerWebsite = ({
  variant,
}: {
  variant: CompositionVariant;
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: -60,
        bottom: 36,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Img
        src={staticFile("qr_wgt_pe.svg")}
        style={{
          width: 110,
          height: 110,
          filter: "drop-shadow(0 8px 18px rgba(18, 70, 170, 0.12))",
        }}
      />
      <div
        style={{
          fontSize: 16,
          lineHeight: 1,
          fontWeight: 800,
          letterSpacing: 0.2,
          color: "#0e3067",
          whiteSpace: "nowrap",
          background: "rgba(255, 255, 255, 0.92)",
          padding: "6px 12px",
          borderRadius: 16,
          filter: "drop-shadow(0 4px 12px rgba(18, 70, 170, 0.12))",
        }}
      >
        wgt.pe
      </div>
    </div>
  );
};
