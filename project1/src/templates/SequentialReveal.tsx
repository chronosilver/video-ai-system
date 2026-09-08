/**
 * SequentialReveal — сцена-шаблон.
 *
 * Принимает список элементов (`items`) и раскладывает их по контентным зонам
 * grid сверху вниз (`CONTENT_ZONE_ORDER`): один элемент = одна зона, через
 * `GridZone` (не координатами). Каждый элемент въезжает каскадом
 * (`useReveal`, задержка = index * stagger).
 *
 * Режим кадра (`mode`) задаёт фон и дефолтный цвет по дизайн-манифесту
 * (about.md §2–§3): `paper` — чёрное на белом, `ink` — белое на чёрном.
 *
 * logo/icon пока рендерятся текстовым плейсхолдером (`[logo: name]`) — ждём
 * выбора набора ассетов.
 */

import { GridLayout, GridZone } from "../components/Grid";
import { text, color, CONTENT_ZONE_ORDER, type ContentZoneName } from "../common";
import { useReveal, useStagger } from "../primitives";

export type RevealTextRole = "h1" | "h2" | "body" | "small";

export type RevealItem =
  | { kind: "text"; role: RevealTextRole; value: string; tone?: "default" | "muted" }
  | { kind: "logo"; name: string }
  | { kind: "icon"; name: string };

export interface SequentialRevealProps {
  /** Режим кадра: `paper` (тёмное на светлом) или `ink` (светлое на тёмном) */
  mode?: "paper" | "ink";
  /** Контент по зонам сверху вниз, один элемент = одна зона */
  items: RevealItem[];
  /** Кадров между входами соседних элементов */
  stagger?: number;
}

/**
 * `tone: "muted"` (→ color.gray) по манифесту допустим только на `body`/`small`.
 * На `h1`/`h2` запрос игнорируется — берётся дефолтный цвет режима.
 */
const MUTED_ALLOWED: RevealTextRole[] = ["body", "small"];

const RevealItemView = ({
  item,
  zone,
  fg,
  delay,
}: {
  item: RevealItem;
  zone: ContentZoneName;
  fg: string;
  delay: number;
}) => {
  const { opacity, translateY } = useReveal(delay);

  let style: React.CSSProperties;
  let content: string;

  if (item.kind === "text") {
    const muted = item.tone === "muted" && MUTED_ALLOWED.includes(item.role);
    style = { ...text[item.role], margin: 0, textAlign: "center", color: muted ? color.gray : fg };
    content = item.value;
  } else {
    // Плейсхолдер логотипа/иконки — заменяется на монохромный SVG после выбора набора.
    style = { ...text.small, margin: 0, textAlign: "center", color: fg, opacity: 0.7 };
    content = `[${item.kind}: ${item.name}]`;
  }

  return (
    <GridZone
      zone={zone}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <p style={style}>{content}</p>
    </GridZone>
  );
};

export const SequentialReveal = ({ mode = "paper", items, stagger = 10 }: SequentialRevealProps) => {
  const bg = mode === "paper" ? color.white : color.black;
  const fg = mode === "paper" ? color.black : color.white;
  const delays = useStagger(items.length, stagger);

  return (
    <GridLayout style={{ backgroundColor: bg }}>
      {items.map((item, index) => {
        const zone = CONTENT_ZONE_ORDER[index];
        if (!zone) return null; // элементов больше, чем контентных зон — лишние не рендерим
        return (
          <RevealItemView key={index} item={item} zone={zone} fg={fg} delay={delays[index]} />
        );
      })}
    </GridLayout>
  );
};
