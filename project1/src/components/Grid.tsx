/**
 * Reusable Grid Layout System для вертикальных видео 1080×1920.
 *
 * <GridLayout>        — CSS Grid контейнер на весь кадр (5 колонок × 9 рядов).
 * <GridZone zone="…"> — размещает children в именованной зоне, без x/y координат.
 *
 * Зоны и grid-line числа определены в src/common/grid.ts — это единственный
 * source of truth. Компоненты этого файла про конкретные числа не знают.
 */

import React from "react";
import { AbsoluteFill } from "remotion";
import {
  COLUMN_ZONES,
  DEFAULT_CONTENT_COLUMN,
  GRID_COLUMNS,
  GRID_ROWS,
  ROW_ZONES,
  type GridColumnName,
  type GridZoneName,
} from "../common/grid";

// ---------------------------------------------------------------------------
// GridLayout — контейнер
// ---------------------------------------------------------------------------

export interface GridLayoutProps {
  /** Показать debug-overlay с границами и названиями всех зон */
  debug?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const GridLayout = ({ debug = false, children, style }: GridLayoutProps) => (
  <AbsoluteFill
    style={{
      display: "grid",
      gridTemplateColumns: GRID_COLUMNS,
      gridTemplateRows: GRID_ROWS,
      ...style,
    }}
  >
    {children}
    {debug && <GridDebugOverlay />}
  </AbsoluteFill>
);

// ---------------------------------------------------------------------------
// GridZone — semantic placement
// ---------------------------------------------------------------------------

export interface GridZoneProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Именованная вертикальная зона, см. src/common/grid.ts */
  zone: GridZoneName;
  /**
   * Именованная горизонтальная зона или явный диапазон grid-line [start, end].
   * По умолчанию — CONTENT LEFT → CONTENT RIGHT (SAFE LEFT/RIGHT остаются пустыми).
   */
  column?: GridColumnName | [number, number];
  children?: React.ReactNode;
}

export const GridZone = ({ zone, column, style, children, ...rest }: GridZoneProps) => {
  const { row } = ROW_ZONES[zone];
  const columnRange = Array.isArray(column)
    ? column
    : column
    ? COLUMN_ZONES[column].column
    : DEFAULT_CONTENT_COLUMN;

  return (
    <div
      {...rest}
      style={{
        gridRow: `${row[0]} / ${row[1]}`,
        gridColumn: `${columnRange[0]} / ${columnRange[1]}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Debug overlay — визуализация всех зон поверх контента
// ---------------------------------------------------------------------------

const ROW_ZONE_NAMES = Object.keys(ROW_ZONES) as GridZoneName[];
const COLUMN_ZONE_NAMES = Object.keys(COLUMN_ZONES) as GridColumnName[];

export const GridDebugOverlay = () => (
  <>
    {COLUMN_ZONE_NAMES.map((name) => {
      const { column, safe } = COLUMN_ZONES[name];
      return (
        <div
          key={`col-${name}`}
          style={{
            gridColumn: `${column[0]} / ${column[1]}`,
            gridRow: "1 / -1",
            backgroundColor: safe ? "rgba(244, 63, 94, 0.08)" : "transparent",
            borderLeft: "1px dashed rgba(255, 255, 255, 0.25)",
            borderRight: "1px dashed rgba(255, 255, 255, 0.25)",
            pointerEvents: "none",
            boxSizing: "border-box",
          }}
        />
      );
    })}

    {ROW_ZONE_NAMES.map((name) => {
      const { row, label, safe } = ROW_ZONES[name];
      return (
        <div
          key={`row-${name}`}
          style={{
            gridRow: `${row[0]} / ${row[1]}`,
            gridColumn: "1 / -1",
            borderTop: "1px dashed rgba(0, 255, 255, 0.4)",
            borderBottom: "1px dashed rgba(0, 255, 255, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            boxSizing: "border-box",
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: safe ? "#f43f5e" : "#00ffff",
              background: "rgba(0, 0, 0, 0.65)",
              padding: "3px 10px",
              borderRadius: 4,
            }}
          >
            {label}
          </span>
        </div>
      );
    })}
  </>
);
