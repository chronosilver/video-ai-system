/**
 * common/ — общие модули.
 *
 *   design-system/  — токены оформления (шрифт, цвет, размеры, тени, motion)
 *   grid.ts         — раскладка (сетка и зоны)
 *   utils.ts        — вспомогательные функции (lerp)
 */

export * from "./design-system";

export { lerp } from "./utils";

export {
  GRID_COLUMNS,
  GRID_ROWS,
  ROW_ZONES,
  COLUMN_ZONES,
  DEFAULT_CONTENT_COLUMN,
  CONTENT_ZONE_ORDER,
} from "./grid";
export type {
  GridZoneName,
  GridColumnName,
  ContentZoneName,
  ContentColumnName,
} from "./grid";
