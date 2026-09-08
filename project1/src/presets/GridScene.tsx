/**
 * GridScene — универсальный пресет поверх Grid Layout System.
 *
 * Вместо кастомной вёрстки под каждую сцену принимает список контента
 * (`items`) и раскладывает его по зонам сетки (`src/common/grid.ts`):
 *
 * 1. Последовательный режим (по умолчанию) — просто перечисляешь контент
 *    по порядку, элемент №0 уходит в первую зону (title), №1 — во вторую
 *    (main), и так далее по `CONTENT_ZONE_ORDER`.
 * 2. Явный режим — на элементе можно указать `zone`, чтобы разместить его
 *    в конкретной зоне вне очереди.
 *
 * Safe-зоны (`safe-top`/`safe-bottom`/`safe-left`/`safe-right`) недостижимы
 * даже по ошибке — тип `ContentZoneName`/`ContentColumnName` их исключает.
 */

import { GridLayout, GridZone } from "../components/Grid";
import { text, color, CONTENT_ZONE_ORDER, type TextRole, type ContentZoneName, type ContentColumnName } from "../common";
import { useFadeIn, useSlideY, useStagger } from "../primitives";

// ---------------------------------------------------------------------------
// Дефолтная типографическая роль по зоне — если у элемента не указан свой variant
// ---------------------------------------------------------------------------

const DEFAULT_VARIANT: Record<ContentZoneName, TextRole> = {
  "title":              "heading",
  "main":               "subheading",
  "sub-1":              "body",
  "sub-1-continuation": "body",
  "sub-2":              "body",
  "support":            "body",
  "cta":                "title",
};

// ---------------------------------------------------------------------------
// Типы
// ---------------------------------------------------------------------------

export interface GridSceneItem {
  /** Зона размещения. Не указана — берётся по порядку из CONTENT_ZONE_ORDER */
  zone?: ContentZoneName;
  /** Горизонтальный диапазон. По умолчанию — CONTENT LEFT → CONTENT RIGHT */
  column?: ContentColumnName | [number, number];
  type: "text" | "image";
  /** Текст или URL картинки */
  value: string;
  /** Типографическая роль из design-system `text`. По умолчанию берётся по зоне */
  variant?: TextRole;
  /** Цвет текста — передавай токен из `color.*`, не строку "#xxxxxx" */
  color?: string;
  align?: "left" | "center" | "right";
}

export interface GridSceneProps {
  items: GridSceneItem[];
  /** Фон сцены — токен из `color.*` или CSS-градиент на его основе */
  background?: string;
  /** Кадров задержки между появлением соседних элементов */
  stagger?: number;
  /** Показать debug overlay сетки */
  debug?: boolean;
}

// ---------------------------------------------------------------------------
// Один элемент контента внутри зоны
// ---------------------------------------------------------------------------

const GridSceneItemView = ({
  item,
  zone,
  delay,
}: {
  item: GridSceneItem;
  zone: ContentZoneName;
  delay: number;
}) => {
  const opacity = useFadeIn(delay, 15);
  const offsetY = useSlideY(30, delay);
  const variant = item.variant ?? DEFAULT_VARIANT[zone];
  const variantStyle = text[variant];
  // новые роли (h1/h2/body/small, задача TYPO-1) не несут цвета в объекте —
  // цвет задаётся отдельно; для старых ролей сохраняем прежний дефолтный цвет
  const variantColor: string = "color" in variantStyle ? variantStyle.color : color.text;
  const align = item.align ?? "center";
  const justify = align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center";

  return (
    <GridZone
      zone={zone}
      column={item.column}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: justify,
        opacity,
        transform: `translateY(${offsetY}px)`,
      }}
    >
      {item.type === "text" ? (
        <p
          style={{
            ...variantStyle,
            margin: 0,
            color: item.color ?? variantColor,
            textAlign: align,
          }}
        >
          {item.value}
        </p>
      ) : (
        <img
          src={item.value}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
        />
      )}
    </GridZone>
  );
};

// ---------------------------------------------------------------------------
// Сцена
// ---------------------------------------------------------------------------

export const GridScene = ({ items, background = color.bg, stagger = 6, debug = false }: GridSceneProps) => {
  const delays = useStagger(items.length, stagger);

  return (
    <GridLayout debug={debug} style={{ backgroundColor: background }}>
      {items.map((item, index) => {
        const zone = item.zone ?? CONTENT_ZONE_ORDER[index];
        if (!zone) return null; // элементов больше, чем зон в CONTENT_ZONE_ORDER — лишние не рендерим
        return <GridSceneItemView key={index} item={item} zone={zone} delay={delays[index]} />;
      })}
    </GridLayout>
  );
};
