/**
 * HeroBadge — градиентная плашка с заголовком и подписью, влетает сверху.
 * Используй для финального CTA, бренд-слайда, анонса.
 */

import { AbsoluteFill } from "remotion";
import { useSlideY, useFadeIn } from "../primitives";
import { text, color, space, radius, fontWeight } from "../common/design-system";

export interface HeroBadgeProps {
  title:       string;
  tagline:     string;
  gradient:    string; // CSS gradient string
  shadow?:     string;
  titleColor?: string;
  taglineColor?: string;
}

export const HeroBadge = ({
  title,
  tagline,
  gradient,
  shadow = "0 25px 50px -12px rgba(0,0,0,0.4)",
  titleColor = color.onAccent,
  taglineColor = color.textMuted,
}: HeroBadgeProps) => {
  const drop           = useSlideY(-1000, 0, { damping: 12, mass: 0.7 });
  const taglineOpacity = useFadeIn(25, 20);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: space.section,
        fontFamily: text.heading.fontFamily,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 35,
          width: "100%",
        }}
      >
        {/* Плашка */}
        <div
          style={{
            transform: `translateY(${drop}px)`,
            background: gradient,
            borderRadius: radius.lg,
            padding: `${space.lg}px ${space.xl}px`,
            boxShadow: shadow,
            textAlign: "center",
            width: "80%",
          }}
        >
          <h1
            style={{
              ...text.heading,
              color: titleColor,
              margin: 0,
            }}
          >
            {title}
          </h1>
        </div>

        {/* Подпись */}
        <div
          style={{
            opacity: taglineOpacity,
            transform: `scale(${taglineOpacity})`,
            textAlign: "center",
          }}
        >
          <p
            style={{
              ...text.title,
              color: taglineColor,
              fontWeight: fontWeight.regular,
              margin: 0,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {tagline}
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
