/**
 * SequentialReveal — сцена-шаблон.
 *
 * Принимает список элементов (`items`) и раскладывает их по контентным зонам
 * grid, один элемент = одна зона, через `GridZone` (не координатами):
 *   • items.length >= 7 — первые 7 элементов в зоны по порядку, лишние не рендерим;
 *   • items.length < 7  — элементы РАВНОМЕРНО распределяются по 7 зонам
 *     (не кластерятся у верха), см. `zoneIndices`.
 * Каждый элемент въезжает каскадом (entrance-хук по `item.enter`, дефолт
 * `"rise"`; задержка = index * stagger).
 *
 * Режим кадра (`mode`) задаёт фон и дефолтный цвет по дизайн-манифесту
 * (about.md §2–§3): `paper` — чёрное на белом, `ink` — белое на чёрном.
 *
 * kind `logo` → <Logo> (цветной SVG бренда), `icon` → <Icon> (моно, наследует цвет).
 */

import { GridLayout, GridZone } from "../components/Grid";
import { text, color, CONTENT_ZONE_ORDER, type ContentZoneName } from "../common";
import { useEntrance, staggerDelays, type EntranceName } from "../primitives";
import { Logo, type LogoName } from "../logos/Logo";
import { Icon, type IconName } from "../icons/Icon";

export type RevealTextRole = "h1" | "h2" | "body" | "small";

type RevealBase = { enter?: EntranceName };

export type RevealItem = RevealBase &
  (
    | { kind: "text"; role: RevealTextRole; value: string; tone?: "default" | "muted" }
    | { kind: "logo"; name: LogoName }
    | { kind: "icon"; name: IconName }
  );

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

/** Размер логотипа/иконки по высоте контентной зоны кадра 1080×1920. */
const GLYPH_SIZE = 120;

/**
 * Индексы контентных зон (0..6) для n элементов.
 *   n >= 7 → [0..6] (первые 7; элементы сверх — вернут undefined → не рендерим);
 *   n === 1 → середина;
 *   1 < n < 7 → равномерная выборка из [0..6] с включёнными краями.
 */
const zoneIndices = (n: number): number[] => {
  const last = CONTENT_ZONE_ORDER.length - 1; // 6
  if (n >= CONTENT_ZONE_ORDER.length) return CONTENT_ZONE_ORDER.map((_, i) => i);
  if (n <= 1) return [Math.round(last / 2)];
  return Array.from({ length: n }, (_, i) => Math.round((i * last) / (n - 1)));
};

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
  const enterStyle = useEntrance(item.enter ?? "rise", delay);

  let inner: React.ReactNode;

  if (item.kind === "text") {
    const muted = item.tone === "muted" && MUTED_ALLOWED.includes(item.role);
    inner = (
      <p style={{ ...text[item.role], margin: 0, textAlign: "center", color: muted ? color.gray : fg }}>
        {item.value}
      </p>
    );
  } else if (item.kind === "logo") {
    inner = <Logo name={item.name} size={GLYPH_SIZE} />;
  } else {
    inner = (
      <span style={{ color: fg, display: "inline-flex" }}>
        <Icon name={item.name} size={GLYPH_SIZE} />
      </span>
    );
  }

  return (
    <GridZone
      zone={zone}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...enterStyle,
      }}
    >
      {inner}
    </GridZone>
  );
};

export const SequentialReveal = ({ mode = "paper", items, stagger = 10 }: SequentialRevealProps) => {
  const bg = mode === "paper" ? color.white : color.black;
  const fg = mode === "paper" ? color.black : color.white;
  const delays = staggerDelays(items.length, stagger);
  const indices = zoneIndices(items.length);

  return (
    <GridLayout style={{ backgroundColor: bg }}>
      {items.map((item, index) => {
        const zoneIndex = indices[index];
        if (zoneIndex === undefined) return null; // элементов больше 7 — лишние не рендерим
        return (
          <RevealItemView
            key={index}
            item={item}
            zone={CONTENT_ZONE_ORDER[zoneIndex]}
            fg={fg}
            delay={delays[index]}
          />
        );
      })}
    </GridLayout>
  );
};
