/**
 * SlideInList — список карточек, влетающих слева с задержкой.
 * Используй для шагов, инструкций, любых перечислений.
 */

import { AbsoluteFill } from "remotion";
import { useSlideX, useFadeIn } from "../primitives";
import { text, color, space, radius, fontWeight } from "../common/design-system";

export interface SlideInListItem {
  id:     number;
  num:    string;
  text:   string;
  bg:     string;
  border: string;
  delay:  number;
}

export interface SlideInListProps {
  title?: string;
  items:  SlideInListItem[];
}

const ListItem = ({ item }: { item: SlideInListItem }) => {
  const slide   = useSlideX(-600, item.delay, { damping: 14, mass: 0.6 });
  const opacity = useFadeIn(item.delay, 15);

  return (
    <div
      style={{
        backgroundColor: item.bg,
        border: `2px solid ${item.border}`,
        borderRadius: radius.md,
        padding: "25px 30px",
        display: "flex",
        alignItems: "center",
        gap: space.sm,
        transform: `translateX(${slide}px)`,
        opacity,
      }}
    >
      <div
        style={{
          ...text.body,
          fontWeight: fontWeight.regular,
          color: item.border,
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          padding: "5px 12px",
          borderRadius: radius.sm,
        }}
      >
        {item.num}
      </div>
      <div
        style={{
          ...text.title,
          fontWeight: fontWeight.regular,
          color: color.text,
        }}
      >
        {item.text}
      </div>
    </div>
  );
};

export const SlideInList = ({ title, items }: SlideInListProps) => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: space.section,
        fontFamily: text.body.fontFamily,
      }}
    >
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: space.md }}>
        {title && (
          <div
            style={{
              ...text.title,
              fontWeight: fontWeight.regular,
              color: color.textMuted,
              textAlign: "center",
              marginBottom: 20,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            {title}
          </div>
        )}
        {items.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
