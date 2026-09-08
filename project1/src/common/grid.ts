/**
 * Grid Layout System — единственный source of truth для сетки видео.
 *
 * Экран 1080×1920 делится на CSS Grid: 5 колонок × 9 рядов.
 * Компоненты размещаются по именованным зонам (`zone="title"`), а не по x/y.
 * Менять раскладку — только здесь. Компоненты про grid-line числа не знают.
 */

// ---------------------------------------------------------------------------
// Grid tracks
// ---------------------------------------------------------------------------

export const GRID_COLUMNS = "1fr 1fr 6fr 1fr 1fr";
// Все 9 рядов равные: safe-top/safe-bottom по ~213px (на 1920), 7 контентных
// зон тоже по ~213px. Контент раскладывается на всю высоту, без «дыры» на main.
export const GRID_ROWS = "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr";

// ---------------------------------------------------------------------------
// Именованные зоны по рядам (вертикальная семантика контента)
// ---------------------------------------------------------------------------

export type GridZoneName =
  | "safe-top"
  | "title"
  | "main"
  | "sub-1"
  | "sub-1-continuation"
  | "sub-2"
  | "support"
  | "cta"
  | "safe-bottom";

interface ZoneDef {
  /** grid-row: [start, end] в CSS grid line числах */
  row: [number, number];
  label: string;
  /** true = зона всегда пустая, контент сюда не кладём */
  safe?: boolean;
}

export const ROW_ZONES: Record<GridZoneName, ZoneDef> = {
  "safe-top":           { row: [1, 2], label: "SAFE TOP", safe: true },
  "title":              { row: [2, 3], label: "TITLE" },
  "main":               { row: [3, 4], label: "MAIN" },
  "sub-1":              { row: [4, 5], label: "SUB 1" },
  "sub-1-continuation": { row: [5, 6], label: "SUB 1 CONTINUATION" },
  "sub-2":              { row: [6, 7], label: "SUB 2" },
  "support":            { row: [7, 8], label: "SUPPORT" },
  "cta":                { row: [8, 9], label: "CTA / EXTRA" },
  "safe-bottom":        { row: [9, 10], label: "SAFE BOTTOM", safe: true },
};

// ---------------------------------------------------------------------------
// Именованные зоны по колонкам (горизонтальная семантика / safe margins)
// ---------------------------------------------------------------------------

export type GridColumnName =
  | "safe-left"
  | "content-left"
  | "main"
  | "content-right"
  | "safe-right";

interface ColumnDef {
  /** grid-column: [start, end] в CSS grid line числах */
  column: [number, number];
  label: string;
  safe?: boolean;
}

export const COLUMN_ZONES: Record<GridColumnName, ColumnDef> = {
  "safe-left":     { column: [1, 2], label: "SAFE LEFT", safe: true },
  "content-left":  { column: [2, 3], label: "CONTENT LEFT" },
  "main":          { column: [3, 4], label: "MAIN" },
  "content-right": { column: [4, 5], label: "CONTENT RIGHT" },
  "safe-right":    { column: [5, 6], label: "SAFE RIGHT" },
};

/**
 * Колонки по умолчанию для любой контентной зоны: CONTENT LEFT → CONTENT RIGHT.
 * Так основной контент никогда не заезжает в SAFE LEFT / SAFE RIGHT.
 */
export const DEFAULT_CONTENT_COLUMN: [number, number] = [2, 5];

// ---------------------------------------------------------------------------
// Контентные зоны — подмножество без safe-зон
// ---------------------------------------------------------------------------

/**
 * Зоны, в которые реально можно класть контент (safe-top/safe-bottom исключены
 * на уровне типа — присвоить туда контент через GridScene невозможно даже
 * по ошибке, TypeScript не даст скомпилироваться).
 */
export type ContentZoneName = Exclude<GridZoneName, "safe-top" | "safe-bottom">;

/**
 * Колонки, в которые реально можно класть контент (safe-left/safe-right исключены).
 */
export type ContentColumnName = Exclude<GridColumnName, "safe-left" | "safe-right">;

/**
 * Порядок контентных зон сверху вниз — источник истины для "последовательного"
 * режима заполнения: элемент №0 массива → первая зона, №1 → вторая, и т.д.
 */
export const CONTENT_ZONE_ORDER: ContentZoneName[] = [
  "title",
  "main",
  "sub-1",
  "sub-1-continuation",
  "sub-2",
  "support",
  "cta",
];
